# DEMO CRM v1.6.0

เว็บแอปสำหรับทีม Customer Support เพื่อจัดการบริษัท รอบทดลองใช้งาน บัญชีเดโม โมดูล ผู้รับผิดชอบ บันทึกความคืบหน้า การแจ้งเตือน รายงาน และอีเมล

- Frontend: Static HTML/CSS/JavaScript
- Authentication/Database: Supabase
- Email gateway: Google Apps Script + MailApp
- Deployment target: GitHub Pages หรือ static hosting ที่ใช้ HTTPS

## สิ่งที่แก้ใน v1.5.0

- บันทึกสร้าง/แก้ไข/ต่ออายุเดโมผ่าน transaction RPC เดียว ป้องกันข้อมูลบันทึกค้างเพียงบางตาราง
- ตรวจ `updated_at` ก่อนแก้ไข ป้องกันเขียนทับข้อมูลที่ผู้ใช้อื่นแก้ไปแล้ว
- ปิดรายการผ่าน transaction RPC และเพิ่ม Activity Log ใน transaction เดียว
- ปุ่มลบเรียก `hard_delete_demo_round` ซึ่งลบข้อมูลของรอบที่เลือกทั้งหมดใน transaction เดียว โดยไม่ปิด RLS
- เพิ่ม idempotency key ให้การส่งอีเมล ป้องกันส่งซ้ำจาก retry, double click หรือหลายแท็บ
- Apps Script ป้องกันการส่งซ้ำด้วย database state และ sent marker
- ไม่โหลดรหัสผ่านทุกบัญชีตั้งแต่เปิดเว็บ โหลดเฉพาะรอบที่ผู้ใช้เปิดดู/แก้ไข/ส่งอีเมล
- ล้างเนื้อหาอีเมลออกจาก `email_logs.body` หลัง gateway ประมวลผลสำเร็จหรือผิดพลาด
- โหลดข้อมูลแบบแบ่งหน้า รองรับมากกว่า 1,000 แถว โดยกำหนดเพดานความปลอดภัย 50,000 แถวต่อตาราง
- ใช้ library แบบ self-hosted ไม่พึ่ง CDN ขณะใช้งาน
- เพิ่ม validation, loading/error feedback, duplicate-action guard, keyboard focus, modal focus trap, reduced motion และ responsive layout
- ปรับ Dashboard ให้ช่วงวันที่มีผลต่อ KPI/กราฟ/รายการอย่างสอดคล้องกัน
- ปรับปุ่มเตือน 3 วันให้ส่งอีเมลจริงและรายงานจำนวนสำเร็จ/ล้มเหลว
- เพิ่ม CSV formula-injection protection

## สิ่งที่แก้ใน v1.6.0

- โหลด AG Grid และ XLSX เฉพาะเมื่อเปิดตารางหรือส่งออกรายงาน ลดขนาดหน้าแรก
- กำหนด timeout 30 วินาทีสำหรับการเรียก email gateway
- ตัด RPC hard-delete overload แบบ text และปิดสิทธิ์ execute สำหรับ anon ทุก function
- บังคับให้ผู้เรียก sync สถานะต้องมี profile ที่ active
- เพิ่ม static checks และ GitHub Actions CI
- เตรียม Apps Script gateway และ RPC สำหรับส่งอีเมลเตือน 3 วันแบบอัตโนมัติ โดย CC ผู้รับผิดชอบและ Fixed CC

## โครงสร้างไฟล์

```text
index.html
style.css
script.js
README.md
THIRD_PARTY_NOTICES.md
apps-script/
  Code.gs
supabase/
  migrations/
    20260817184417_security_hardening.sql
    20260817184418_rls_performance.sql
    20260817184841_rpc_exposure_hardening.sql
    20260817184928_revoke_remaining_anon_functions.sql
    20260817184951_revoke_remaining_public_functions.sql
    20260817185244_queue_due_reminder_emails.sql
    20260817185906_harden_scheduled_reminder_delivery.sql
  functions/
    send-demo-reminders/
tests/
  static-check.mjs
vendor/
  supabase-js-2.110.8.min.js
  xlsx-0.18.5.min.js
  ag-grid-community-36.0.0.min.js
  LICENSE-*.txt
```

## ตรวจสอบก่อนส่งขึ้นระบบ

```bash
npm run check
```

ไฟล์ migration ชุด v1.6.0 ไม่มีคำสั่งแก้ไขข้อมูลในตารางธุรกิจ แต่มีการปรับสิทธิ์ RPC และ RLS จึงต้องทดสอบ login, สร้าง/แก้ไข/ลบรอบเดโม และแก้ไข activity log ด้วย user และ admin หลัง deploy ทุกครั้ง

## ข้อกำหนดก่อนอัปเกรด

เวอร์ชันนี้เป็นแพ็กอัปเกรดสำหรับฐานข้อมูลเดิมของ DEMO CRM ซึ่งต้องมี schema และ migrations ถึง v1.4.4 แล้ว ได้แก่ตาราง/ฟังก์ชันที่ frontend เดิมใช้งาน เช่น `profiles`, `companies`, `demo_rounds`, `demo_accounts`, `demo_round_modules`, `modules`, `responsible_people`, `demo_statuses`, `activity_logs`, `email_logs`, `email_templates`, `notification_states`, `settings`, `is_admin()`, `update_latest_activity_log_message()` และ `soft_delete_latest_activity_log()`

หากเป็นการติดตั้งฐานข้อมูลใหม่ตั้งแต่ศูนย์ แพ็กไฟล์ที่ได้รับจากผู้ใช้ไม่มี base schema และ migrations 001–014 จึงต้องนำ schema เดิมมารันก่อน ไฟล์ 015–016 ไม่ใช่ full schema สำหรับฐานข้อมูลเปล่า

## ขั้นตอนติดตั้ง

### 1. สำรองข้อมูล

สำรอง Supabase Database ก่อนรัน migration โดยเฉพาะก่อนทดสอบ Hard Delete

### 2. รัน SQL ตามลำดับ

เปิด Supabase SQL Editor ด้วย role เจ้าของฐานข้อมูล แล้วรัน:

```text
supabase/015_v1_4_8_hard_delete_demo_round.sql
supabase/016_v1_5_0_reliability_security.sql
```

ห้ามปิด RLS เพื่อแก้ปัญหาสิทธิ์

ตรวจหลังติดตั้ง:

```sql
select p.proname, p.prosecdef
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'hard_delete_demo_round',
    'save_demo_round_transaction',
    'get_demo_accounts_sensitive',
    'close_demo_round_transaction'
  )
order by p.proname;

select indexname
from pg_indexes
where schemaname = 'public'
  and indexname = 'email_logs_idempotency_key_uidx';
```

ควรพบ 4 functions และ 1 unique index

### 3. ตั้งค่า Frontend

ตรวจ `APP_CONFIG` ตอนต้นของ `script.js`:

```js
const APP_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT_ID.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_SUPABASE_ANON_KEY',
  APPS_SCRIPT_URL: ''
};
```

ใช้เฉพาะ Supabase anon/publishable key เท่านั้น ห้ามใส่ `service_role`, database password หรือ private token ใน frontend

### 4. ติดตั้ง Google Apps Script

1. สร้างหรือเปิด Apps Script project ที่ใช้ส่งอีเมล
2. แทนที่ `Code.gs` ด้วยไฟล์ `apps-script/Code.gs`
3. ตั้ง Script Properties:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SENDER_NAME` (ไม่บังคับ)
4. รัน `testConfiguration()` หนึ่งครั้งเพื่ออนุญาตสิทธิ์
5. Deploy เป็น Web app:
   - Execute as: Me
   - Who has access: Anyone
6. ใช้ URL ที่ลงท้าย `/exec`
7. Login เป็น Admin ใน DEMO CRM แล้วบันทึก URL ที่เมนู ตั้งค่าระบบ → ตั้งค่าอีเมล

Frontend ยอมรับเฉพาะ URL รูปแบบ `https://script.google.com/macros/s/.../exec`

### 5. Deploy Static Files

อัปโหลดทั้งโฟลเดอร์ โดยต้องมี `vendor/` ครบ:

```bash
git add .
git commit -m "Release DEMO CRM v1.5.0"
git push
```

หลัง deploy ให้ hard refresh (`Ctrl+F5` หรือ `Cmd+Shift+R`)

### 6. เปิดระบบอีเมลเตือนอัตโนมัติ

1. อัปโหลด `apps-script/Code.gs` ไปยัง Google Apps Script project เดิม แล้ว deploy Web App เวอร์ชันใหม่
2. ตั้ง Script Properties เพิ่ม `SUPABASE_SERVICE_ROLE_KEY` (เก็บใน Script Properties เท่านั้น ห้ามใส่ frontend)
3. ตั้ง project timezone เป็น `Asia/Bangkok` แล้วรัน `installDailyReminderTrigger()` หนึ่งครั้งเพื่อสร้าง job รายวันช่วง 09:00

ระบบจะเลือกเฉพาะรอบที่เหลือ 3 วัน ยังไม่ถูกส่ง reminder และไม่ได้อยู่ในสถานะสุดท้าย จึงไม่ส่งย้อนหลังหรือส่งซ้ำ โดยผู้รับใน `To` คืออีเมลติดต่อบริษัท และ `CC` คือผู้รับผิดชอบรวมกับ Fixed CC.

## สิทธิ์การลบ

- Admin ที่ active ลบเดโมได้ทุกสถานะ
- User ที่ active ลบได้เฉพาะรอบสถานะ `pending/รอดำเนินการ` ที่ตนเองสร้าง
- ระบบลบ `demo_accounts`, `demo_round_modules`, `activity_logs`, `email_logs`, notification state และแถว `demo_rounds` ของรอบนั้น
- รอบต่ออายุอื่นที่อ้างถึงรอบเดิมจะยังอยู่ แต่ `renewed_from_round_id` ถูกตั้งเป็น `null`
- `companies` จะถูกลบเมื่อไม่มีรอบอื่นอ้างถึงเท่านั้น
- ทุกคำสั่งอยู่ใน transaction เดียว หากขั้นตอนใดผิดพลาด PostgreSQL จะ rollback ทั้งหมด
- Hard Delete ไม่สามารถกู้คืนด้วยการ rollback โค้ด ต้องกู้จาก database backup

## ความปลอดภัยที่ควรทราบ

- รหัสผ่านบัญชีเดโมยังจำเป็นต้องเก็บในฐานข้อมูลเพื่อแสดงและประกอบอีเมล แต่ v1.5.0 ลดการกระจายข้อมูลด้วย RPC แบบโหลดเฉพาะรอบ ไม่โหลดทั้งตาราง
- ใช้เฉพาะ credential สำหรับระบบทดลอง ห้ามนำรหัสผ่าน production หรือรหัสผ่านที่ใช้ซ้ำกับระบบอื่นมาเก็บ
- `Code.gs` ตรวจ Supabase access token และอ่าน/อัปเดต `email_logs` ด้วยสิทธิ์ของผู้ใช้ ไม่ใช้ service role
- Email body ถูก redact หลัง Apps Script ประมวลผล หากกด retry frontend จะสร้าง payload เดิมกลับในแถว idempotency เดิม
- Static-hosting CSP แบบ `<meta>` ไม่สามารถบังคับ `frame-ancestors`; production hosting ควรส่ง HTTP headers `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` และ `Permissions-Policy` เพิ่ม
- ตรวจ Supabase Auth redirect URLs, password policy, session lifetime และ RLS policies ใน staging ก่อน production

## การตรวจสอบก่อน Deploy

รันจาก root ของโปรเจกต์:

```bash
node tests/static-check.mjs
```

จากนั้นทดสอบ staging อย่างน้อย:

1. Login/Logout, inactive profile ถูกปฏิเสธ
2. สร้างเดโม, แก้ไข, ต่ออายุ และปิดรายการ
3. เปิดหน้าแก้ไขพร้อมกัน 2 แท็บ แท็บที่บันทึกทีหลังต้องพบ conflict
4. ลบเดโมของบริษัทที่มีหนึ่งรอบและหลายรอบ
5. User ลบรายการของผู้อื่น/สถานะไม่ pending ต้องถูกปฏิเสธ
6. Double click ส่งอีเมลและส่งพร้อมกัน 2 แท็บ ผู้รับต้องได้อีเมลครั้งเดียว
7. Apps Script timeout หลังส่งแล้ว เมื่อ retry ต้องไม่ส่งซ้ำ
8. ข้อมูล 0, 1, 1,001 และจำนวนมาก พร้อม search/filter/sort/export
9. ภาษาไทย อังกฤษ emoji อักขระพิเศษ และข้อความยาวตามขีดจำกัด
10. Desktop, tablet, mobile, keyboard-only และ reduced-motion

## Rollback

- Frontend และ `Code.gs` สามารถ rollback เป็นเวอร์ชันก่อนหน้าได้
- Functions และ index ใน migration 015–016 สามารถคงอยู่ได้ แต่ frontend v1.5.0 ต้องใช้ migration 016 จึงควรรัน SQL ก่อน deploy frontend
- การเปลี่ยน column privileges ของ `demo_accounts` ใน migration 016 ถูกออกแบบให้ frontend v1.5.0 โหลด password ผ่าน RPC หาก rollback frontend รุ่นเก่าที่ใช้ `select('*')` จะอ่าน password ไม่ได้
- ก่อน rollback frontend รุ่นเก่า ให้ประเมิน privilege นี้ก่อน ห้าม grant password กลับโดยไม่ตรวจผลกระทบด้านความปลอดภัย
- Hard Delete ที่เกิดขึ้นแล้วกู้คืนได้จาก backup เท่านั้น
