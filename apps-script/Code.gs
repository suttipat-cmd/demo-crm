/**
 * DEMO CRM email gateway (v1.6.0)
 *
 * Script properties:
 * - SUPABASE_URL               e.g. https://<project-ref>.supabase.co
 * - SUPABASE_SERVICE_ROLE_KEY  server-only key; never put this in the frontend
 * - SCHEDULER_SECRET           long random value shared only with the scheduler
 * - SENDER_NAME                optional display name
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var input = JSON.parse((e.postData && e.postData.contents) || '{}');
    var properties = PropertiesService.getScriptProperties();
    var serviceRole = properties.getProperty('SUPABASE_SERVICE_ROLE_KEY');
    var expectedSecret = properties.getProperty('SCHEDULER_SECRET');
    var isScheduler = input.scheduler_secret && expectedSecret
      && safeEqual_(String(input.scheduler_secret), String(expectedSecret));
    var userToken = String(input.access_token || '');

    if (!input.email_log_id || (!isScheduler && !userToken)) {
      return json_({ ok: false, error: 'Unauthorized' });
    }
    if (!serviceRole) return json_({ ok: false, error: 'Missing service configuration' });

    var log = supabase_('GET', '/rest/v1/email_logs?id=eq.' + encodeURIComponent(input.email_log_id)
      + '&select=id,demo_round_id,email_type,to_emails,cc_emails,subject,body,sent_status,sent_at', null, serviceRole)[0];
    if (!log) return json_({ ok: false, error: 'Email log not found' });
    if (log.sent_at || log.sent_status === 'sent') return json_({ ok: true, sent: true, duplicate: true });
    if (!Array.isArray(log.to_emails) || !log.to_emails.length || !log.subject || !log.body) {
      return json_({ ok: false, error: 'Email log is incomplete' });
    }

    // Interactive requests still require a valid active DEMO CRM user.
    if (!isScheduler && !isActiveUser_(userToken, properties.getProperty('SUPABASE_URL'))) {
      return json_({ ok: false, error: 'Unauthorized' });
    }

    MailApp.sendEmail({
      to: log.to_emails.join(','),
      cc: Array.isArray(log.cc_emails) ? log.cc_emails.join(',') : '',
      subject: log.subject,
      body: log.body,
      name: properties.getProperty('SENDER_NAME') || 'DEMO CRM'
    });

    var sentAt = new Date().toISOString();
    supabase_('PATCH', '/rest/v1/email_logs?id=eq.' + encodeURIComponent(log.id), {
      sent_status: 'sent', sent_at: sentAt, error_message: null, body: '[redacted after delivery]'
    }, serviceRole);
    if (log.email_type === 'expiry_reminder_email') {
      supabase_('PATCH', '/rest/v1/demo_rounds?id=eq.' + encodeURIComponent(log.demo_round_id), {
        reminder_email_sent_at: sentAt
      }, serviceRole);
    }
    return json_({ ok: true, sent: true });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message || error) });
  } finally {
    lock.releaseLock();
  }
}

function isActiveUser_(token, url) {
  try {
    var user = JSON.parse(UrlFetchApp.fetch(url + '/auth/v1/user', {
      method: 'get', headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true
    }).getContentText());
    if (!user.id) return false;
    var profile = supabase_('GET', '/rest/v1/profiles?id=eq.' + encodeURIComponent(user.id) + '&select=is_active', null,
      PropertiesService.getScriptProperties().getProperty('SUPABASE_SERVICE_ROLE_KEY'))[0];
    return profile && profile.is_active === true;
  } catch (_) { return false; }
}

function supabase_(method, path, body, serviceRole) {
  var url = PropertiesService.getScriptProperties().getProperty('SUPABASE_URL') + path;
  var response = UrlFetchApp.fetch(url, {
    method: method.toLowerCase(), contentType: 'application/json', muteHttpExceptions: true,
    headers: { apikey: serviceRole, Authorization: 'Bearer ' + serviceRole, Prefer: 'return=representation' },
    payload: body ? JSON.stringify(body) : undefined
  });
  if (response.getResponseCode() >= 300) throw new Error('Supabase HTTP ' + response.getResponseCode());
  var text = response.getContentText();
  return text ? JSON.parse(text) : [];
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

/** Run once in the Apps Script editor to install a daily 09:00 project-timezone trigger. */
function installDailyReminderTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'sendDueReminders') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('sendDueReminders').timeBased().atHour(9).everyDays(1).create();
}

/** Background job. It only sends reminders for rounds that have exactly three days remaining. */
function sendDueReminders() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var properties = PropertiesService.getScriptProperties();
    var serviceRole = properties.getProperty('SUPABASE_SERVICE_ROLE_KEY');
    if (!serviceRole) throw new Error('Missing service configuration');
    var queued = supabase_('POST', '/rest/v1/rpc/queue_due_reminder_emails', {}, serviceRole) || [];
    queued.forEach(function(item) { deliverScheduledEmail_(item.email_log_id, serviceRole); });
    return { ok: true, queued: queued.length };
  } finally {
    lock.releaseLock();
  }
}

function deliverScheduledEmail_(emailLogId, serviceRole) {
  var log = supabase_('GET', '/rest/v1/email_logs?id=eq.' + encodeURIComponent(emailLogId)
    + '&select=id,demo_round_id,email_type,to_emails,cc_emails,subject,body,sent_status,sent_at', null, serviceRole)[0];
  if (!log || log.sent_at || log.sent_status === 'sent') return;
  if (!Array.isArray(log.to_emails) || !log.to_emails.length || !log.subject || !log.body) {
    throw new Error('Email log is incomplete');
  }
  MailApp.sendEmail({
    to: log.to_emails.join(','), cc: Array.isArray(log.cc_emails) ? log.cc_emails.join(',') : '',
    subject: log.subject, body: log.body,
    name: PropertiesService.getScriptProperties().getProperty('SENDER_NAME') || 'DEMO CRM'
  });
  var sentAt = new Date().toISOString();
  supabase_('PATCH', '/rest/v1/email_logs?id=eq.' + encodeURIComponent(log.id), {
    sent_status: 'sent', sent_at: sentAt, error_message: null, body: '[redacted after delivery]'
  }, serviceRole);
  supabase_('PATCH', '/rest/v1/demo_rounds?id=eq.' + encodeURIComponent(log.demo_round_id), {
    reminder_email_sent_at: sentAt
  }, serviceRole);
}

function testConfiguration() {
  var properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('SUPABASE_URL') || !properties.getProperty('SUPABASE_SERVICE_ROLE_KEY')) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  return { ok: true, timezone: Session.getScriptTimeZone() };
}
