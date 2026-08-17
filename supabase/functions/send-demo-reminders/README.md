# Scheduled reminder delivery

This Edge Function is intentionally not deployed by the static frontend. It needs three secrets:

- `REMINDER_CRON_SECRET` — sent by the scheduler that invokes this function.
- `APPS_SCRIPT_SCHEDULER_SECRET` — a distinct shared secret that the Apps Script gateway validates.
- Supabase-managed `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

Before deployment, add a `queue_due_reminder_emails()` RPC that creates idempotent `email_logs` entries for rounds with three days remaining. Do not mark a round as sent until the gateway confirms delivery. Update Apps Script so it accepts either a verified user JWT (interactive sending) or the scheduler secret (background sending). The Apps Script source was not present in this repository, so that compatibility change cannot be safely authored here.
