import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const context = { window: {}, Intl, Date, Object, String, Number, Set, JSON, Math, RegExp };
vm.runInNewContext(fs.readFileSync(new URL('../shared-utils.js', import.meta.url), 'utf8'), context, { filename: 'shared-utils.js' });
const utils = context.window.DemoCrmUtils;

assert.ok(Object.isFrozen(utils));
assert.equal(utils.daysBetween('2026-02-28', '2026-03-01'), 1);
assert.equal(utils.addDaysISO('2026-12-31', 1), '2027-01-01');
assert.equal(utils.shiftMonthKey('2026-01', -1), '2025-12');
assert.equal(utils.formatDate('2026-08-18'), '18/08/2026');
assert.equal(utils.formatRemaining(0), 'หมดอายุวันนี้');
assert.equal(utils.escapeHTML('<img src=x>'), '&lt;img src=x&gt;');
assert.equal(utils.escapeAttr('`"'), '&#096;&quot;');
assert.deepEqual([...utils.unique(['a', ' a ', '', 'b', 'a'])], ['a', 'b']);
assert.equal(utils.isEmail('team@example.com'), true);
assert.equal(utils.isEmail('not-an-email'), false);
assert.equal(utils.safeError({ message: 'failed' }), 'failed');

console.log('shared utility checks passed');
