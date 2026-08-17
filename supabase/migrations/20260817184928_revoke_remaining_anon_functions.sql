-- Older direct grants survive REVOKE ... FROM PUBLIC, so remove them explicitly.
revoke execute on function public.can_delete_old_closed_round_log(uuid) from anon;
revoke execute on function public.current_user_role() from anon;
revoke execute on function public.enforce_final_status_end_date() from anon;
revoke execute on function public.is_admin() from anon;
revoke execute on function public.set_demo_round_status_from_master() from anon;
