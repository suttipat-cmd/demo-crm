# DEMO CRM

DEMO CRM สำหรับทีม Customer Support ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ demo แทน Google Sheet

## Version

- Current: `v1.4.5`
- Type: Demo Form Cleanup + Calendar View
- Frontend: Static HTML/CSS/JS on GitHub Pages
- Backend: Supabase Auth + Database
- Email: Google Apps Script

## Files

```txt
index.html
style.css
script.js
README.md
apps-script/
  Code.gs
supabase/
  009_v1_2_9_activity_log_source.sql
  010_v1_3_0_profile_avatar.sql
  011_v1_3_2_notification_states.sql
  012_v1_3_8_status_master.sql
  013_v1_4_3_activity_log_latest_manual_rls.sql
  014_v1_4_4_activity_log_rpc_rls.sql
  reset_transaction_data_keep_masters.sql
```

## v1.4.5 Update

- หน้า `สร้างเดโม` / `แก้ไขเดโม` เอาส่วน `บันทึกความคืบหน้า` ออกจากฟอร์ม
- การบันทึก demo จะไม่สร้าง `activity_logs` อีกต่อไป ทั้ง manual log และ system log จากฟอร์มนี้
- การเพิ่มบันทึกความคืบหน้าให้ทำจากหน้ารายละเอียดเดโม / ส่วน activity log เท่านั้น
- เพิ่มมุมมอง `ปฏิทิน` ในหน้า `รายการเดโม`
  - แสดงรายการตามวันที่หมดอายุของ demo (`demo_rounds.end_date`)
  - ใช้สีรายการตามสถานะ demo จาก status master
  - กดรายการในปฏิทินเพื่อเปิดรายละเอียด demo
- ปรับ logic เลือกรอบล่าสุดให้ใช้ `renewal_no → end_date → start_date → created_at` เพื่อลดความเสี่ยงข้อมูล migrate เรียงผิด
- ไม่ต้องรัน SQL เพิ่มสำหรับ v1.4.5

## v1.4.4 Update

- แก้ root cause ที่กด `ลบ` / `แก้ไข` activity log แล้วยังติด RLS แม้รัน SQL v1.4.3 แล้ว
- เพิ่ม SQL migration `supabase/014_v1_4_4_activity_log_rpc_rls.sql`
- เพิ่ม RPC ที่ enforce permission เองโดยไม่ปิด RLS:
  - `update_latest_activity_log_message(log_id, new_message)`
  - `soft_delete_latest_activity_log(log_id)`
- ปรับ `UPDATE policy` ของ `activity_logs` ให้รองรับ soft delete ด้วย `deleted_at`
- ยังคง rule เดิม: แก้ไข/ลบได้เฉพาะ `manual log` ล่าสุดของแต่ละบริษัท และต้องเป็นเจ้าของ record หรือ admin
- เพิ่มปุ่ม `คัดลอกชื่อบริษัท` ใต้คอลัมน์ `ชื่อบริษัท` ในหน้า `รายการเดโม`
- ปรับ error message ให้ชี้ไปที่ SQL v1.4.4
- Sync version/cache เป็น `v1.4.4`

### Install SQL v1.4.4

1. Backup database ก่อน
2. เปิด Supabase SQL Editor
3. รันไฟล์:

```txt
supabase/014_v1_4_4_activity_log_rpc_rls.sql
```

4. Deploy frontend แล้ว hard refresh
5. ทดสอบแก้ไข/ลบ manual log ล่าสุดอีกครั้ง

Rollback note:
- ถ้าต้อง rollback frontend ให้กลับไป tag/commit v1.4.3
- ถ้าต้อง rollback SQL ให้แจ้งก่อน เพราะ v1.4.4 เพิ่ม RPC และ policy ใหม่ที่ใช้กับ frontend v1.4.4 โดยตรง

## v1.4.3 Update

- แก้ root cause error `new row violates row-level security policy for table "activity_logs"` ตอนกดลบบันทึก
- เพิ่ม SQL migration `supabase/013_v1_4_3_activity_log_latest_manual_rls.sql`
- ปรับ RLS/trigger ของ `activity_logs` ให้ตรงกับ UX:
  - แก้ไข/ลบได้เฉพาะ `manual log` ล่าสุดของแต่ละบริษัท
  - system log เช่น log ส่งอีเมล/เปลี่ยนสถานะ จะไม่ทำให้ manual log ล่าสุดถูกล็อกผิด
  - soft delete ด้วย `deleted_at` ผ่าน RLS ได้ถูกต้อง
- ปรับ frontend ให้เรียงบันทึกล่าสุดแบบ deterministic ด้วย `created_at` และ `id`
- เพิ่มข้อความ error ที่ชัดขึ้น หากยังไม่ได้รัน SQL v1.4.3
- อัปเดต README คู่กับโค้ดและ SQL ตาม release rule

## v1.4.2 Update

- เปลี่ยนช่อง `ข้อความบันทึก` ในหน้ารายละเอียดบริษัทจาก input บรรทัดเดียวเป็น textarea
- ผู้ใช้สามารถกด Enter เพื่อขึ้นบรรทัดใหม่ในข้อความบันทึกได้
- การเพิ่มบันทึกต้องกดปุ่ม `เพิ่มบันทึก` เท่านั้น ไม่บันทึกด้วย Enter
- บันทึกที่แสดงใน timeline จะรักษาการขึ้นบรรทัดใหม่ตามที่ผู้ใช้พิมพ์
- ปุ่ม `แก้ไข` และ `ลบ` แสดงในทุกบันทึก แต่จะใช้งานได้เฉพาะบันทึกล่าสุดของบริษัทเท่านั้น
- บันทึกเก่าจะ disabled ปุ่ม `แก้ไข` และ `ลบ` พร้อม tooltip อธิบาย
- แก้ logic ตรวจบันทึกล่าสุดให้ดูเฉพาะ manual log ที่ยังไม่ถูกลบ
- ไม่มีการเปลี่ยน database schema หรือ SQL
- อัปเดต README คู่กับโค้ดตาม release rule

## v1.4.0 Update

- ปรับ Dashboard เพื่อลดพื้นที่ส่วนบนและลดข้อมูลซ้ำ
- ย้ายการ์ด `เดโมในช่วงที่เลือก` และ `ใกล้หมดอายุ 7 วัน` ไปอยู่บรรทัดเดียวกับปุ่ม `สร้างคิวเตือน 3 วัน`
- เปลี่ยนการ์ดทั้ง 2 ใบเป็น compact KPI card ขนาดเล็ก
- เปลี่ยน section เดิม `จำนวนตามสถานะ` เป็น KPI ใหม่ชื่อ `อัตราเป็นลูกค้า`
- `อัตราเป็นลูกค้า` คำนวณจากจำนวนเดโมที่เป็นสถานะ `เป็นลูกค้าแล้ว` เทียบกับจำนวนเดโมทั้งหมด
- คง section `สรุปตามสถานะ` ไว้สำหรับดูจำนวนตาม Status Master
- คง section `จำนวนตามโมดูล` ไว้เหมือนเดิม
- ไม่มีการเปลี่ยน database schema
- อัปเดต README คู่กับโค้ดตาม release rule

## v1.3.9 Update

- ตัดการ์ด Dashboard เดิมที่ซ้ำกับ `สรุปตามสถานะ` ออก:
  - `หมดอายุ`
  - `เป็นลูกค้าแล้ว`
- คงการ์ด Dashboard ที่ไม่ซ้ำไว้:
  - `เดโมในช่วงที่เลือก`
  - `ใกล้หมดอายุ 7 วัน`
- เพิ่ม error handling กลางให้ click actions บนหน้าเว็บ
  - ถ้า action ใดเกิด error จะขึ้น toast แทนการหลุดเป็น error ใน console
  - ลดความเสี่ยงที่ผู้ใช้กดแล้วไม่รู้ว่าเกิดอะไรขึ้น
- ไม่มีการเปลี่ยน database schema
- อัปเดต README คู่กับโค้ดตาม release rule

## v1.3.8 Update

- เพิ่ม `Status Master` ในเมนู `ตั้งค่าระบบ → สถานะ`
- Admin สามารถเพิ่มสถานะใหม่เองได้
- Admin แก้ชื่อ สี ลำดับ เปิด/ปิดใช้งาน และกำหนดว่าเป็นสถานะจบงานได้
- สถานะที่ถูกใช้งานแล้วลบไม่ได้ แต่ยังเปลี่ยนชื่อได้
- Dropdown สถานะในฟอร์มเดโมและ filter สถานะในหน้า `รายการเดโม` ดึงจาก master
- Badge สีสถานะใช้สีจาก master
- Dashboard เพิ่ม section `สรุปตามสถานะ` เป็น card ตามสถานะ พร้อมจำนวนและเปอร์เซ็นต์
- กด card สถานะบน Dashboard แล้วไปหน้า `รายการเดโม` พร้อม filter สถานะนั้น
- คง logic ระบบเดิม:
  - สถานะระบบหลักยังมี `รอดำเนินการ`, `เปิดใช้งาน`, `หมดอายุ`, `ปิดรายการ`, `เป็นลูกค้าแล้ว`
  - สถานะ `ปิดรายการ` และ `เป็นลูกค้าแล้ว` เป็นสถานะจบงาน
  - การ auto status ตามวันที่ยังใช้กับสถานะระบบหลักเท่านั้น
  - สถานะ custom จะไม่ถูก auto overwrite เพื่อไม่ให้ข้อมูล user หาย
- อัปเดต README คู่กับโค้ดและ SQL ตาม release rule ล่าสุด

## SQL Required

v1.4.3 ต้องรัน SQL เพิ่ม 1 ไฟล์หลัง deploy โค้ด หรือก่อน deploy ก็ได้:

```txt
supabase/013_v1_4_3_activity_log_latest_manual_rls.sql
```

ถ้ายังไม่เคยรัน migration เดิม ให้รันตามลำดับนี้ก่อนใช้งานเวอร์ชันล่าสุด:

```txt
supabase/009_v1_2_9_activity_log_source.sql
supabase/010_v1_3_0_profile_avatar.sql
supabase/011_v1_3_2_notification_states.sql
supabase/012_v1_3_8_status_master.sql
supabase/013_v1_4_3_activity_log_latest_manual_rls.sql
```

หมายเหตุ:
- ห้ามปิด RLS เพื่อแก้ error
- SQL v1.4.3 เป็น idempotent และรันซ้ำได้
- ควร backup database ก่อนรันจริงทุกครั้ง
- Rollback: ถ้าเกิดปัญหา ให้ restore database backup ก่อนรัน v1.4.3 หรือแจ้ง error exact message ก่อนแก้ต่อ

## Status Master Design

ตารางใหม่:

```txt
demo_statuses
- id
- name
- color
- sort_order
- is_active
- is_final
- system_key
- created_at
- updated_at
```

`demo_rounds` เพิ่ม field:

```txt
status_id
```

หมายเหตุ:
- `demo_rounds.status` ยังถูกเก็บไว้เพื่อ backward compatibility
- logic ใหม่ใช้ `status_id` เป็นหลัก
- trigger จะ sync `status` จาก `demo_statuses.name`
- ถ้าเปลี่ยนชื่อสถานะที่ใช้งานอยู่ ระบบจะแสดงชื่อใหม่ผ่าน master

## Reset Transaction Data

ใช้สำหรับล้างข้อมูลทดสอบก่อนใช้งานจริง โดยเก็บ master data ไว้:

```txt
supabase/reset_transaction_data_keep_masters.sql
```

ไฟล์นี้ล้าง:
- companies
- demo_rounds
- demo_accounts
- demo_round_modules
- activity_logs
- email_logs
- notification_states

ไฟล์นี้เก็บ:
- profiles/users
- responsible_people
- modules
- demo_statuses
- email_templates
- settings/logo/fixed CC/Apps Script URL

ควร backup database ก่อนรันจริงทุกครั้ง

## Deploy

```bash
git add .
git commit -m "Release v1.4.5 demo calendar view"
git push
```

หลัง GitHub Pages deploy เสร็จ ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Smoke Test เพิ่มเติมสำหรับ v1.4.5

- เปิดหน้า `สร้างเดโม` แล้วต้องไม่เห็น section `บันทึกความคืบหน้า`
- เปิดหน้า `แก้ไขเดโม` แล้วต้องไม่เห็น section `บันทึกความคืบหน้า`
- บันทึก demo ใหม่แล้วตรวจว่าไม่มี activity log ใหม่ถูกสร้างจาก form save โดยอัตโนมัติ
- เปิดหน้ารายละเอียด demo แล้วเพิ่ม `บันทึกความคืบหน้า` จากส่วน activity log ได้ตามปกติ
- เปิดหน้า `รายการเดโม` แล้วสลับมุมมอง `ตาราง` / `ปฏิทิน` ได้
- ในมุมมอง `ปฏิทิน` ต้องเห็นรายการตาม `วันที่สิ้นสุด` และสีตามสถานะ
- กดรายการในปฏิทินแล้วต้องไปหน้ารายละเอียด demo ถูกต้อง
- กด `ก่อนหน้า` / `เดือนนี้` / `ถัดไป` แล้วเดือนเปลี่ยนถูกต้อง
- ตรวจว่า filter สถานะ/ผู้รับผิดชอบ/โมดูล/ค้นหา มีผลกับปฏิทินเหมือนตาราง

## Smoke Test หลัง Deploy

- ตรวจ Dashboard ว่าไม่มีการ์ดซ้ำ `หมดอายุ` และ `เป็นลูกค้าแล้ว` ใน section บนสุด
- ตรวจ `สรุปตามสถานะ` ว่ายังแสดงสถานะครบและกด filter ได้
- ทดสอบ click action เช่น รีเฟรช/ปิดรายการ/ลบ/ส่งอีเมล หาก error ต้องขึ้น toast

- Login ด้วย admin
- เปิด `ตั้งค่าระบบ → สถานะ`
- เพิ่มสถานะใหม่ 1 รายการ
- แก้สี/ลำดับ/ชื่อสถานะ
- สร้างเดโมโดยเลือกสถานะจาก master
- ตรวจหน้า `รายการเดโม` ว่า filter สถานะทำงาน
- ตรวจ badge สีสถานะ
- ตรวจ Dashboard section `สรุปตามสถานะ`
- กด card สถานะบน Dashboard แล้วต้องไปหน้า `รายการเดโม` พร้อม filter
- ทดสอบลบสถานะที่ยังไม่ถูกใช้งาน
- ทดสอบลบสถานะที่ถูกใช้งาน ต้องลบไม่ได้
- ตรวจ flow เดิม: สร้างเดโม, เพิ่ม log, ส่งอีเมล, ต่ออายุ, ปิดรายการ, รายงาน, notification


## Smoke Test เพิ่มเติมสำหรับ v1.4.3

- รัน SQL `supabase/013_v1_4_3_activity_log_latest_manual_rls.sql` ใน Supabase SQL Editor
- Login ด้วย user ปกติที่เป็นเจ้าของบันทึก
- เปิดหน้ารายละเอียดบริษัทที่มี manual log ล่าสุด และมี system log ใหม่กว่าหรือเคยส่งอีเมล
- กด `ลบ` manual log ล่าสุด ต้องลบได้และไม่เจอ RLS error
- เพิ่ม manual log ใหม่ แล้วกด `แก้ไข` ต้องแก้ได้
- ตรวจว่าบันทึกเก่ายัง disabled ปุ่มแก้ไข/ลบ
- Login ด้วย admin แล้วตรวจว่า UI ยังแก้ไข/ลบได้เฉพาะ manual log ล่าสุดเท่านั้น

## Smoke Test เพิ่มเติมสำหรับ v1.4.2

- เปิดหน้ารายละเอียดบริษัท
- กรอก `ข้อความบันทึก` หลายบรรทัด แล้วกด `เพิ่มบันทึก`
- ตรวจว่า timeline แสดงข้อความหลายบรรทัดถูกต้อง
- กด Enter ในช่องข้อความแล้วต้องขึ้นบรรทัดใหม่ ไม่ submit ฟอร์ม
- ตรวจว่าบันทึกล่าสุดเท่านั้นที่กด `แก้ไข` และ `ลบ` ได้
- ตรวจว่าบันทึกเก่ามีปุ่ม disabled และไม่สามารถแก้ไข/ลบได้
- แก้ไขบันทึกล่าสุดเป็นหลายบรรทัด แล้วตรวจผลหลังบันทึก

## Security Notes

- ห้ามใส่ `service_role key`, database password, GitHub token หรือ Apps Script secret ใน frontend/repo
- Frontend ใช้ Supabase anon public key เท่านั้น
- RLS ต้องเปิดทุก table ที่ frontend เข้าถึง
- `demo_statuses` ให้ authenticated อ่านได้ และ admin เท่านั้นที่เพิ่ม/แก้/ลบได้
- การลบสถานะถูกกันทั้ง frontend และ RLS policy ถ้าสถานะถูกใช้งานอยู่

## Known External Setup

- สร้าง/จัดการ Auth User ผ่าน Supabase Dashboard
- ตั้ง Google Apps Script Web App URL ที่ `ตั้งค่าระบบ → ตั้งค่าอีเมล`
- ตั้ง Script Properties ใน Google Apps Script:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`


## v1.4.0 Update

- ปรับ Dashboard เพื่อลดพื้นที่ส่วนบนและลดข้อมูลซ้ำ
- ย้ายการ์ด `เดโมในช่วงที่เลือก` และ `ใกล้หมดอายุ 7 วัน` ไปอยู่บรรทัดเดียวกับปุ่ม `สร้างคิวเตือน 3 วัน`
- เปลี่ยนการ์ดทั้ง 2 ใบเป็น compact KPI card ขนาดเล็ก
- เปลี่ยน section เดิม `จำนวนตามสถานะ` เป็น KPI ใหม่ชื่อ `อัตราเป็นลูกค้า`
- `อัตราเป็นลูกค้า` คำนวณจาก:
  - จำนวนเดโมที่เป็นสถานะ `เป็นลูกค้าแล้ว`
  - หารด้วยจำนวนเดโมทั้งหมด
  - แสดงเป็นเปอร์เซ็นต์และจำนวนรายการประกอบ
- คง section `สรุปตามสถานะ` ไว้สำหรับดูจำนวนแยกตาม status master
- คง section `จำนวนตามโมดูล` ไว้เหมือนเดิม
- ไม่มีการเปลี่ยน database schema
- อัปเดต README คู่กับโค้ดตาม release rule

