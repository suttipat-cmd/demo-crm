-- Security hardening only: this migration does not alter application records.
-- It removes the legacy text overload because the frontend always has UUID IDs.

drop function if exists public.hard_delete_demo_round(text);

-- Public schema functions are exposed through PostgREST.  Only grant direct RPC
-- access to functions the browser actually calls; helpers and triggers stay private.
revoke all on function public.sync_demo_statuses() from public;
revoke all on function public.get_demo_accounts_sensitive(uuid) from public;
revoke all on function public.hard_delete_demo_round(uuid) from public;
revoke all on function public.close_demo_round_transaction(uuid, timestamp with time zone) from public;
revoke all on function public.save_demo_round_transaction(
  text, uuid, uuid, uuid, text, text, text[], uuid, uuid, date, date, integer,
  uuid[], jsonb, timestamp with time zone, timestamp with time zone
) from public;
revoke all on function public.update_latest_activity_log_message(uuid, text) from public;
revoke all on function public.soft_delete_latest_activity_log(uuid) from public;

grant execute on function public.sync_demo_statuses() to authenticated;
grant execute on function public.get_demo_accounts_sensitive(uuid) to authenticated;
grant execute on function public.hard_delete_demo_round(uuid) to authenticated;
grant execute on function public.close_demo_round_transaction(uuid, timestamp with time zone) to authenticated;
grant execute on function public.save_demo_round_transaction(
  text, uuid, uuid, uuid, text, text, text[], uuid, uuid, date, date, integer,
  uuid[], jsonb, timestamp with time zone, timestamp with time zone
) to authenticated;
grant execute on function public.update_latest_activity_log_message(uuid, text) to authenticated;
grant execute on function public.soft_delete_latest_activity_log(uuid) to authenticated;

-- Trigger and RLS helper functions must not be direct RPC endpoints.
revoke all on function public.handle_new_user() from public;
revoke all on function public.guard_activity_log_update() from public;
revoke all on function public.guard_company_soft_delete() from public;
revoke all on function public.guard_demo_round_soft_delete() from public;
revoke all on function public.guard_profile_update() from public;
revoke all on function public.rls_auto_enable() from public;
revoke all on function public.set_updated_at() from public;

-- Fix the one mutable search_path warning reported by Supabase Advisor.
alter function public.set_updated_at() set search_path = public, pg_temp;
