# DEMO CRM

DEMO CRM สำหรับทีม Customer Support ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ demo แทน Google Sheet

## Version

- Current: `v1.4.1`
- Type: Stabilization UX Polish
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
  reset_transaction_data_keep_masters.sql
```

## v1.4.1 Update

- Sync version/cache ให้ตรงกันทุกไฟล์เป็น `v1.4.1`
- ปรับ Dashboard date filter ให้สื่อความหมายชัดขึ้นเป็นช่วงวันที่เดโม:
  - `เดโมตั้งแต่`
  - `ถึงวันที่`
  - filter ใช้ logic overlap กับ `start_date/end_date` ของ demo round
- เพิ่มปุ่ม `ล้างช่วงวันที่` บน Dashboard เมื่อมีการเลือกวันที่
- ปรับ logic เลือก demo round ล่าสุดเป็น:
  1. `renewal_no` มากสุด
  2. `end_date` ล่าสุด
  3. `start_date` ล่าสุด
  4. `created_at/updated_at` ล่าสุด
- เพิ่มปุ่ม `ล้างตัวกรอง` ในหน้า `รายการเดโม`
- เพิ่มแถบสรุปตัวกรองที่กำลังใช้งานในหน้า `รายการเดโม`
- เพิ่มปุ่ม `ล้างการค้นหา` ในหน้า `รายงาน`
- ปรับตาราง `รายการเดโม` ให้ compact ขึ้น ลดความสูง row และลดพื้นที่ปุ่ม
- เพิ่ม unsaved changes warning สำหรับฟอร์มสร้าง/แก้ไขเดโม
- เพิ่ม accessibility พื้นฐาน:
  - `aria-current` ให้เมนู active
  - `aria-live` ให้ toast
  - aria-label ให้ date filter บน Dashboard
- ไม่มีการเปลี่ยน database schema
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

v1.4.1 ไม่ต้องรัน SQL เพิ่ม ถ้าเคยรัน v1.3.8 แล้ว

SQL ที่ต้องมีสำหรับฐานข้อมูลปัจจุบันคือ:

```txt
supabase/012_v1_3_8_status_master.sql
```

ถ้ายังไม่เคยรัน migration เดิม ให้รันตามลำดับนี้ก่อน:

```txt
supabase/009_v1_2_9_activity_log_source.sql
supabase/010_v1_3_0_profile_avatar.sql
supabase/011_v1_3_2_notification_states.sql
supabase/012_v1_3_8_status_master.sql
```

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
git commit -m "Release v1.4.1 stabilization UX polish"
git push
```

หลัง GitHub Pages deploy เสร็จ ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Smoke Test หลัง Deploy

### v1.4.1 Checklist

- ตรวจ version/cache ใน browser ว่าโหลด `script.js?v=1.4.1`
- Dashboard:
  - วันที่ `เดโมตั้งแต่/ถึงวันที่` default เป็นค่าว่าง
  - เลือกช่วงวันที่แล้วสรุปตามสถานะต้องเปลี่ยนตามช่วง demo
  - กด `ล้างช่วงวันที่` แล้วข้อมูลกลับมาเป็นทั้งหมด
- รายการเดโม:
  - ใช้ search/filter แล้วมีแถบตัวกรอง
  - กด `ล้างตัวกรอง` แล้วข้อมูลกลับมาเป็นทั้งหมด
  - ตาราง compact ขึ้นและยัง copy email/password ได้
- รายงาน:
  - ค้นหาแล้วกด `ล้างการค้นหา` ได้
- ฟอร์มเดโม:
  - แก้ข้อมูลแล้วกดเมนูออกจากหน้า ต้องมี confirm เตือนข้อมูลยังไม่บันทึก
  - บันทึกสำเร็จแล้วไม่เตือนซ้ำ
- ตรวจ route หลัก: แดชบอร์ด, รายการเดโม, สร้างเดโม, รายงาน, ตั้งค่าระบบ

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

