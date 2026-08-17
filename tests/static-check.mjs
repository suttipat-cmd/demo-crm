import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const requiredFiles = [
  'index.html',
  'style.css',
  'script.js',
  'shared-utils.js',
  'vendor-loader.js',
  'vendor/supabase-js-2.110.8.min.js',
  'vendor/ag-grid-community-36.0.0.min.js',
  'vendor/xlsx-0.18.5.min.js'
];

for (const relativePath of requiredFiles) {
  await stat(resolve(root, relativePath));
}

const [html, script, loader, sharedUtils] = await Promise.all([
  readFile(resolve(root, 'index.html'), 'utf8'),
  readFile(resolve(root, 'script.js'), 'utf8'),
  readFile(resolve(root, 'vendor-loader.js'), 'utf8'),
  readFile(resolve(root, 'shared-utils.js'), 'utf8')
]);

const expectations = [
  [html, 'vendor-loader.js', 'HTML must load the optional-vendor loader'],
  [html, 'shared-utils.js', 'HTML must load shared utilities before the app'],
  [sharedUtils, 'DemoCrmUtils', 'Shared utility module must expose its API'],
  [script, 'AbortController', 'Email dispatch must have a cancellation timeout'],
  [script, 'ensureXlsx', 'Excel export must lazy-load XLSX'],
  [script, 'requestAgGrid', 'Demo list must lazy-load AG Grid'],
  [loader, 'ag-grid-community-36.0.0.min.js', 'Vendor loader must reference AG Grid'],
  [loader, 'xlsx-0.18.5.min.js', 'Vendor loader must reference XLSX']
];

for (const [content, expected, message] of expectations) {
  if (!content.includes(expected)) throw new Error(message);
}

if (/SUPABASE_SERVICE_ROLE(?:_KEY)?\s*[:=]/i.test(script)) {
  throw new Error('Frontend must not contain a service-role credential');
}

console.log('Static checks passed.');
