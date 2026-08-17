-- These helpers retained PostgreSQL's default PUBLIC grant from their creation.
revoke execute on function public.can_delete_old_closed_round_log(uuid) from public;
revoke execute on function public.current_user_role() from public;
revoke execute on function public.enforce_final_status_end_date() from public;
revoke execute on function public.is_admin() from public;
revoke execute on function public.set_demo_round_status_from_master() from public;

-- RLS and triggers still invoke the helper functions inside database statements.
grant execute on function public.can_delete_old_closed_round_log(uuid) to authenticated;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_admin() to authenticated;
