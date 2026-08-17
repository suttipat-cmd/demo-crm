-- Make scheduled reminders use the same CC policy as interactive sends and
-- make failed/queued work retryable without creating duplicate email logs.
create or replace function public.queue_due_reminder_emails()
returns table(email_log_id uuid)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  return query
  with due_rounds as (
    select
      dr.id as round_id,
      c.company_name,
      c.contact_name,
      c.contact_emails,
      dr.start_date,
      dr.end_date,
      rp.name as responsible_name,
      rp.email as responsible_email,
      coalesce(array_agg(distinct m.name) filter (where m.id is not null), '{}') as module_names,
      coalesce(string_agg(
        a.ordinality::text || '. อีเมล: ' || a.login_email || E'\n   รหัสผ่าน: ' || a.password
          || case when a.note is null then '' else E'\n   หมายเหตุ: ' || a.note end,
        E'\n\n' order by a.ordinality
      ), '') as demo_accounts,
      coalesce((
        select al.message from public.activity_logs al
        where al.demo_round_id = dr.id and al.deleted_at is null
        order by al.created_at desc, al.id desc limit 1
      ), '-') as latest_note
    from public.demo_rounds dr
    join public.companies c on c.id = dr.company_id and c.deleted_at is null
    left join public.demo_statuses ds on ds.id = dr.status_id
    left join public.responsible_people rp on rp.id = dr.responsible_person_id
    left join public.demo_round_modules drm on drm.demo_round_id = dr.id
    left join public.modules m on m.id = drm.module_id
    left join lateral (
      select da.login_email, da.password, da.note,
        row_number() over (order by da.created_at, da.id) as ordinality
      from public.demo_accounts da where da.demo_round_id = dr.id
    ) a on true
    where dr.deleted_at is null
      and dr.reminder_email_sent_at is null
      and dr.end_date = current_date + 3
      and coalesce(ds.is_final, false) = false
    group by dr.id, c.id, rp.id
  ), template as (
    select subject, body from public.email_templates
    where template_key = 'expiry_reminder_email' and is_active = true limit 1
  ), fixed_cc as (
    select coalesce(array_agg(value), '{}') as emails
    from jsonb_array_elements_text(coalesce(
      (select value from public.settings where key = 'fixed_cc_emails'), '[]'::jsonb
    ))
  ), payload as (
    select
      d.round_id,
      d.contact_emails,
      array(
        select distinct trim(email)
        from unnest(array_cat(array[d.responsible_email], f.emails)) as email
        where trim(coalesce(email, '')) <> ''
      ) as cc_emails,
      replace(replace(replace(replace(replace(replace(replace(replace(replace(
        t.subject, '{{company_name}}', d.company_name), '{{contact_name}}', d.contact_name),
        '{{modules}}', array_to_string(d.module_names, ', ')), '{{start_date}}', to_char(d.start_date, 'DD/MM/YYYY')),
        '{{end_date}}', to_char(d.end_date, 'DD/MM/YYYY')), '{{remaining_days}}', '3'),
        '{{responsible_name}}', coalesce(d.responsible_name, '')), '{{responsible_email}}', coalesce(d.responsible_email, '')),
        '{{note}}', d.latest_note) as subject,
      replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(
        t.body, '{{company_name}}', d.company_name), '{{contact_name}}', d.contact_name),
        '{{modules}}', array_to_string(d.module_names, ', ')), '{{start_date}}', to_char(d.start_date, 'DD/MM/YYYY')),
        '{{end_date}}', to_char(d.end_date, 'DD/MM/YYYY')), '{{remaining_days}}', '3'),
        '{{demo_accounts}}', d.demo_accounts), '{{responsible_name}}', coalesce(d.responsible_name, '')),
        '{{responsible_email}}', coalesce(d.responsible_email, '')), '{{note}}', d.latest_note) as body
    from due_rounds d cross join template t cross join fixed_cc f
  ), upserted as (
    insert into public.email_logs (
      demo_round_id, email_type, to_emails, cc_emails, subject, body,
      sent_status, sent_by, idempotency_key, error_message
    )
    select p.round_id, 'expiry_reminder_email', p.contact_emails, p.cc_emails, p.subject, p.body,
      'queued', null, 'demo-crm:' || p.round_id::text || ':expiry_reminder_email', null
    from payload p
    on conflict (idempotency_key) where idempotency_key is not null do update
      set to_emails = excluded.to_emails,
          cc_emails = excluded.cc_emails,
          subject = excluded.subject,
          body = excluded.body,
          sent_status = case when public.email_logs.sent_at is null then 'queued' else public.email_logs.sent_status end,
          error_message = case when public.email_logs.sent_at is null then null else public.email_logs.error_message end
      where public.email_logs.sent_at is null
    returning id
  )
  select id from upserted;
end;
$$;

revoke all on function public.queue_due_reminder_emails() from public;
grant execute on function public.queue_due_reminder_emails() to service_role;
