-- No anonymous caller needs an RPC in this internal application.
revoke execute on all functions in schema public from anon;

-- sync_demo_statuses modifies shared rows, so permit only an active internal user.
create or replace function public.sync_demo_statuses()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_pending_id uuid;
  v_active_id uuid;
  v_expired_id uuid;
begin
  if auth.uid() is null or not exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.is_active = true
  ) then
    raise exception using errcode = '42501', message = 'ACTIVE_PROFILE_REQUIRED';
  end if;

  select id into v_pending_id from public.demo_statuses where system_key = 'pending' limit 1;
  select id into v_active_id from public.demo_statuses where system_key = 'active' limit 1;
  select id into v_expired_id from public.demo_statuses where system_key = 'expired' limit 1;

  if v_pending_id is null or v_active_id is null or v_expired_id is null then
    return;
  end if;

  with target as (
    select
      dr.id,
      case
        when current_date < dr.start_date then v_pending_id
        when current_date > dr.end_date then v_expired_id
        else v_active_id
      end as target_status_id
    from public.demo_rounds dr
    left join public.demo_statuses current_status on current_status.id = dr.status_id
    where dr.deleted_at is null
      and coalesce(current_status.is_final, dr.status = any (array['ปิดรายการ','เป็นลูกค้าแล้ว'])) = false
      and (
        dr.status_id is null
        or current_status.system_key in ('pending','active','expired')
        or dr.status = any (array['รอดำเนินการ','เปิดใช้งาน','หมดอายุ'])
      )
  )
  update public.demo_rounds dr
  set status_id = target.target_status_id,
      status = ds.name,
      updated_at = now()
  from target
  join public.demo_statuses ds on ds.id = target.target_status_id
  where dr.id = target.id
    and (dr.status_id is distinct from target.target_status_id or dr.status is distinct from ds.name);
end;
$$;

grant execute on function public.sync_demo_statuses() to authenticated;
