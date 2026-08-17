// Scheduler entry point. Deploy only after the existing Apps Script gateway has
// been updated to accept the APPS_SCRIPT_SCHEDULER_SECRET contract documented
// below. This avoids placing a service-role key in the browser.
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = { 'content-type': 'application/json' };

Deno.serve(async (request) => {
  const expectedSecret = Deno.env.get('REMINDER_CRON_SECRET');
  if (!expectedSecret || request.headers.get('x-reminder-cron-secret') !== expectedSecret) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
  }

  const url = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const gatewaySecret = Deno.env.get('APPS_SCRIPT_SCHEDULER_SECRET');
  if (!url || !serviceRole || !gatewaySecret) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing function secrets' }), { status: 500, headers: corsHeaders });
  }

  const supabase = createClient(url, serviceRole, { auth: { persistSession: false } });
  const { data: settings, error: settingsError } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'apps_script_url')
    .maybeSingle();
  if (settingsError) throw settingsError;

  const endpoint = String(settings?.value || '').trim();
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(endpoint)) {
    return new Response(JSON.stringify({ ok: false, error: 'Apps Script endpoint is not configured' }), { status: 409, headers: corsHeaders });
  }

  // The database function will be added with the gateway migration. It creates
  // only idempotent queued logs; it never marks a message as sent.
  const { data: queued, error: queueError } = await supabase.rpc('queue_due_reminder_emails');
  if (queueError) throw queueError;

  const results = await Promise.allSettled((queued || []).map(async (emailLogId: string) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email_log_id: emailLogId, scheduler_secret: gatewaySecret, app_version: '1.6.0' })
    });
    if (!response.ok) throw new Error(`Apps Script HTTP ${response.status}`);
  }));

  return new Response(JSON.stringify({
    ok: true,
    queued: queued?.length || 0,
    dispatched: results.filter((result) => result.status === 'fulfilled').length,
    failed: results.filter((result) => result.status === 'rejected').length
  }), { headers: corsHeaders });
});
