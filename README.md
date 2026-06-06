# DEMO CRM

DEMO CRM สำหรับทีม Customer Support ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ demo แทน Google Sheet

## Version

- Current: `v1.3.8`
- Type: Status Master + Dashboard Status Summary
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

ต้องรัน SQL นี้ก่อน deploy v1.3.8:

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
git commit -m "Release v1.3.8 status master and dashboard summary"
git push
```

หลัง GitHub Pages deploy เสร็จ ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Smoke Test หลัง Deploy

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
