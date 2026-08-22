// Scheduler entry point. Deploy only after the existing Apps Script gateway has
// been updated to accept the APPS_SCRIPT_SCHEDULER_SECRET contract documented
// below. This avoids placing a service-role key in the browser.
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = { 'content-type': 'application/json' };

Deno.serve(async (request) => {
  try {
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

    const { error: syncError } = await supabase.rpc('sync_demo_statuses');
    if (syncError) throw syncError;
    const { data: queued, error: queueError } = await supabase.rpc('queue_due_reminder_emails');
    if (queueError) throw queueError;

    const emailLogIds = (queued || [])
      .map((item: { email_log_id?: string } | string) => typeof item === 'string' ? item : item.email_log_id)
      .filter((id): id is string => Boolean(id));
    const results = await Promise.allSettled(emailLogIds.map(async (emailLogId) => {
      const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email_log_id: emailLogId, scheduler_secret: gatewaySecret, app_version: '1.9.0' })
    });
    if (!response.ok) throw new Error(`Apps Script HTTP ${response.status}`);
    }));

    return new Response(JSON.stringify({
      ok: true,
      queued: emailLogIds.length,
      dispatched: results.filter((result) => result.status === 'fulfilled').length,
      failed: results.filter((result) => result.status === 'rejected').length
    }), { headers: corsHeaders });
  } catch (error) {
    console.error('send-demo-reminders failed', error);
    return new Response(JSON.stringify({ ok: false, error: 'Reminder dispatch failed' }), { status: 500, headers: corsHeaders });
  }
});
