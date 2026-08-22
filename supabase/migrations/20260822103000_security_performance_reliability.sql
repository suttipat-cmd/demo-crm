-- v1.9.0: harden RPC exposure, fix permissive-policy overlap, and remove
-- unnecessary client-side status writes. This migration intentionally does not
-- update or delete business records.

-- SECURITY DEFINER helpers are used only by RLS, triggers, or other functions;
-- they are not browser APIs. Remove the explicit authenticated grant left by
-- older migrations and make their search path deterministic.
revoke all on function public.activity_log_can_mutate(uuid) from authenticated;
revoke all on function public.can_delete_old_closed_round_log(uuid) from authenticated;
revoke all on function public.can_update_latest_activity_log(uuid) from authenticated;
revoke all on function public.current_user_role() from authenticated;
revoke all on function public.guard_activity_log_update() from authenticated;
revoke all on function public.guard_company_soft_delete() from authenticated;
revoke all on function public.guard_demo_round_soft_delete() from authenticated;
revoke all on function public.guard_profile_update() from authenticated;
revoke all on function public.handle_new_user() from authenticated;
revoke all on function public.is_activity_log_admin() from authenticated;
revoke all on function public.is_admin() from authenticated;
revoke all on function public.is_latest_manual_activity_log(uuid) from authenticated;
revoke all on function public.rls_auto_enable() from authenticated;
revoke all on function public.set_updated_at() from authenticated;

alter function public.activity_log_can_mutate(uuid) set search_path = public, pg_temp;
alter function public.can_delete_old_closed_round_log(uuid) set search_path = public, pg_temp;
alter function public.can_update_latest_activity_log(uuid) set search_path = public, pg_temp;
alter function public.current_user_role() set search_path = public, pg_temp;
alter function public.guard_activity_log_update() set search_path = public, pg_temp;
alter function public.guard_company_soft_delete() set search_path = public, pg_temp;
alter function public.guard_demo_round_soft_delete() set search_path = public, pg_temp;
alter function public.guard_profile_update() set search_path = public, pg_temp;
alter function public.handle_new_user() set search_path = public, pg_temp;
alter function public.is_activity_log_admin() set search_path = public, pg_temp;
alter function public.is_admin() set search_path = public, pg_temp;
alter function public.is_latest_manual_activity_log(uuid) set search_path = public, pg_temp;
alter function public.rls_auto_enable() set search_path = pg_catalog, pg_temp;
alter function public.soft_delete_latest_activity_log(uuid) set search_path = public, pg_temp;
alter function public.sync_demo_statuses() set search_path = public, pg_temp;
alter function public.update_latest_activity_log_message(uuid, text) set search_path = public, pg_temp;

-- The application explicitly permits all active internal users to view demo
-- credentials. Keep that policy, but make each privileged reveal auditable.
create table if not exists public.sensitive_account_access_logs (
  id uuid primary key default gen_random_uuid(),
  demo_round_id uuid not null references public.demo_rounds(id) on delete cascade,
  accessed_by uuid not null references public.profiles(id),
  accessed_at timestamptz not null default now()
);
alter table public.sensitive_account_access_logs enable row level security;
revoke all on table public.sensitive_account_access_logs from public, anon, authenticated;
create index if not exists sensitive_account_access_logs_round_accessed_idx
  on public.sensitive_account_access_logs (demo_round_id, accessed_at desc);

create or replace function public.get_demo_accounts_sensitive(p_round_id uuid)
returns table(
  id uuid,
  demo_round_id uuid,
  login_email text,
  password text,
  note text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null or not exists (
    select 1 from public.profiles p where p.id = v_user_id and p.is_active = true
  ) then
    raise exception using errcode = 'P0001', message = 'ACTIVE_PROFILE_REQUIRED';
  end if;

  if not exists (
    select 1 from public.demo_rounds r where r.id = p_round_id and r.deleted_at is null
  ) then
    raise exception using errcode = 'P0001', message = 'DEMO_ROUND_NOT_FOUND';
  end if;

  insert into public.sensitive_account_access_logs (demo_round_id, accessed_by)
  values (p_round_id, v_user_id);

  return query
  select a.id, a.demo_round_id, a.login_email, a.password, a.note, a.created_at
  from public.demo_accounts a
  where a.demo_round_id = p_round_id
  order by a.created_at, a.id;
end;
$$;
revoke all on function public.get_demo_accounts_sensitive(uuid) from public, anon;
grant execute on function public.get_demo_accounts_sensitive(uuid) to authenticated;

-- RLS policies are permissive (OR). Keep only the restrictive variants so an
-- admin cannot delete master data that is still referenced by a demo round.
drop policy if exists modules_delete_admin on public.modules;
drop policy if exists responsible_people_delete_admin on public.responsible_people;
drop policy if exists responsible_people_insert_admin on public.responsible_people;
drop policy if exists responsible_people_update_admin on public.responsible_people;

alter policy modules_admin_delete_unused on public.modules
  using (
    (select public.is_admin())
    and not exists (select 1 from public.demo_round_modules drm where drm.module_id = modules.id)
  );
alter policy responsible_people_admin_insert on public.responsible_people
  with check ((select public.is_admin()));
alter policy responsible_people_admin_update on public.responsible_people
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy responsible_people_admin_delete_unused on public.responsible_people
  using (
    (select public.is_admin())
    and not exists (
      select 1 from public.demo_rounds dr
      where dr.responsible_person_id = responsible_people.id and dr.deleted_at is null
    )
  );

-- Evaluate auth helpers once per statement rather than once per candidate row.
alter policy demo_rounds_insert_authenticated on public.demo_rounds
  with check ((created_by = (select auth.uid())) and (deleted_at is null));
alter policy activity_logs_insert_authenticated on public.activity_logs
  with check ((created_by = (select auth.uid())) and (deleted_at is null));
alter policy activity_logs_update_latest_owner_or_admin on public.activity_logs
  with check (
    coalesce(source, 'manual') = 'manual'
    and ((created_by = (select auth.uid())) or (select public.is_activity_log_admin()))
  );
alter policy email_logs_insert_authenticated on public.email_logs
  with check (sent_by = (select auth.uid()));
alter policy email_logs_update_sender_or_admin on public.email_logs
  using ((select public.is_admin()) or (sent_by = (select auth.uid())))
  with check ((select public.is_admin()) or (sent_by = (select auth.uid())));
alter policy demo_statuses_admin_insert on public.demo_statuses
  with check ((select public.is_admin()));
alter policy demo_statuses_admin_update on public.demo_statuses
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy demo_statuses_admin_delete on public.demo_statuses
  using ((select public.is_admin()));

-- A daily service job updates stored status. The UI still derives date status
-- locally, so it remains accurate if the scheduler is temporarily unavailable.
create or replace function public.sync_demo_statuses()
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_pending_id uuid;
  v_active_id uuid;
  v_expired_id uuid;
begin
  select id into v_pending_id from public.demo_statuses where system_key = 'pending' limit 1;
  select id into v_active_id from public.demo_statuses where system_key = 'active' limit 1;
  select id into v_expired_id from public.demo_statuses where system_key = 'expired' limit 1;
  if v_pending_id is null or v_active_id is null or v_expired_id is null then return; end if;

  with target as (
    select dr.id,
      case when current_date < dr.start_date then v_pending_id
           when current_date > dr.end_date then v_expired_id
           else v_active_id end as target_status_id
    from public.demo_rounds dr
    left join public.demo_statuses current_status on current_status.id = dr.status_id
    where dr.deleted_at is null
      and coalesce(current_status.is_final, dr.status = any (array['ปิดรายการ','เป็นลูกค้าแล้ว'])) = false
      and (dr.status_id is null or current_status.system_key in ('pending','active','expired')
           or dr.status = any (array['รอดำเนินการ','เปิดใช้งาน','หมดอายุ']))
  )
  update public.demo_rounds dr
  set status_id = target.target_status_id, status = ds.name, updated_at = now()
  from target join public.demo_statuses ds on ds.id = target.target_status_id
  where dr.id = target.id
    and (dr.status_id is distinct from target.target_status_id or dr.status is distinct from ds.name);
end;
$$;
revoke all on function public.sync_demo_statuses() from public, anon, authenticated;
grant execute on function public.sync_demo_statuses() to service_role;

-- Cover foreign keys used by cleanup, joins, and RLS checks.
create index if not exists activity_logs_created_by_idx on public.activity_logs(created_by);
create index if not exists demo_round_modules_module_id_idx on public.demo_round_modules(module_id);
create index if not exists demo_rounds_created_by_idx on public.demo_rounds(created_by);
create index if not exists demo_rounds_renewed_from_round_id_idx on public.demo_rounds(renewed_from_round_id);
create index if not exists email_logs_sent_by_idx on public.email_logs(sent_by);
create index if not exists email_templates_updated_by_idx on public.email_templates(updated_by);
create index if not exists responsible_people_created_by_idx on public.responsible_people(created_by);
create index if not exists responsible_people_updated_by_idx on public.responsible_people(updated_by);
create index if not exists settings_updated_by_idx on public.settings(updated_by);
