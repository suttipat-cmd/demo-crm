import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = await readFile(resolve(root, 'supabase/functions/send-demo-reminders/index.ts'), 'utf8');

assert.match(source, /item\.email_log_id/, 'Scheduled rows must dispatch their email_log_id, not the row object.');
assert.match(source, /rpc\('sync_demo_statuses'\)/, 'The trusted scheduler must synchronize statuses before queueing reminders.');
assert.match(source, /Reminder dispatch failed/, 'The function must return a safe failure response.');
console.log('Edge reminder checks passed.');
