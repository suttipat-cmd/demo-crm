-- RLS expressions execute with the caller's role, so helpers referenced by
-- active policies require EXECUTE for authenticated. Their bodies enforce the
-- authorization decision; they are not privileged mutation endpoints.
grant execute on function public.activity_log_can_mutate(uuid) to authenticated;
grant execute on function public.can_delete_old_closed_round_log(uuid) to authenticated;
grant execute on function public.can_update_latest_activity_log(uuid) to authenticated;
grant execute on function public.is_activity_log_admin() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_latest_manual_activity_log(uuid) to authenticated;
