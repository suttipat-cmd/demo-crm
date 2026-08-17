-- RLS expressions in this project repeatedly call auth helpers per scanned row.
-- Replacing only row-independent calls with SELECT lets PostgreSQL evaluate them
-- once per statement without changing the authorization rule.

alter policy profiles_insert_self_or_admin on public.profiles
  with check ((select public.is_admin()) or ((select auth.uid()) = id and role = 'user' and is_active = true));

alter policy profiles_update_self_or_admin on public.profiles
  using ((select public.is_admin()) or id = (select auth.uid()))
  with check ((select public.is_admin()) or id = (select auth.uid()));

alter policy companies_insert_authenticated on public.companies
  with check (created_by = (select auth.uid()) or (select public.is_admin()));

alter policy companies_delete_admin_only on public.companies
  using ((select public.is_admin()));

alter policy modules_insert_admin on public.modules
  with check ((select public.is_admin()));
alter policy modules_update_admin on public.modules
  using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy modules_delete_admin on public.modules
  using ((select public.is_admin()));

alter policy notification_states_select_own on public.notification_states
  using (user_id = (select auth.uid()));
alter policy notification_states_insert_own on public.notification_states
  with check (user_id = (select auth.uid()));
alter policy notification_states_update_own on public.notification_states
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
alter policy notification_states_delete_own on public.notification_states
  using (user_id = (select auth.uid()));

-- Keep these indexes: Advisor's "unused" status can simply mean the project has
-- low traffic. Re-evaluate after production traffic has accumulated.
