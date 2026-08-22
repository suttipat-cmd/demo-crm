# Scheduled reminder delivery

This Edge Function is deployed separately from the static frontend. It needs three secrets:

- `REMINDER_CRON_SECRET` — sent by the scheduler that invokes this function.
- `APPS_SCRIPT_SCHEDULER_SECRET` — a distinct shared secret that the Apps Script gateway validates.
- Supabase-managed `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

The migration already provides `queue_due_reminder_emails()` and the repository's `apps-script/Code.gs` accepts either a verified user JWT (interactive sending) or the scheduler secret (background sending). The function synchronizes statuses, queues only idempotent records, and never marks a message as sent; the gateway marks delivery only after MailApp succeeds.

Set `verify_jwt=false` only because the function validates `x-reminder-cron-secret` itself. Never expose either scheduler secret in the static frontend.
