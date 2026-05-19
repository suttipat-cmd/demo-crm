# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.9`
- Type: Stabilization Release
- SQL required: `supabase/009_v1_2_9_activity_log_source.sql`

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
  reset_transaction_data_keep_masters.sql
```

## สิ่งที่ปรับใน v1.2.9

- ใช้ base จาก v1.2.8 และแก้แบบ stabilization เพื่อไม่ให้ regression
- sync version/cache เป็น v1.2.9 ทุกจุด
- คงหน้า Login redesign, Branding/Logo, Favicon, Notification และหน้า Report จากรุ่นก่อนหน้า
- คง Apps Script email sender ไว้ใน package
- แยก `activity_logs.source` เป็น `manual/system`
- บันทึกความคืบหน้าและรายงานแสดงเฉพาะ log ที่ user พิมพ์เอง
- วันที่/เวลาในระบบและอีเมลใช้รูปแบบ `dd/mm/yyyy` หรือ `dd/mm/yyyy hh:mm` โดยใช้ปี ค.ศ.
- user ส่งอีเมลแจ้งข้อมูล demo ได้ 1 ครั้งต่อ demo round
- admin ส่งซ้ำได้
- เพิ่ม loading/disabled ให้ action สำคัญเพิ่มเติมเพื่อลดการกดซ้ำ
- แนบ SQL reset สำหรับล้างข้อมูลทดสอบโดยเก็บ master data

## วิธีติดตั้ง / Deploy

1. รัน SQL migration ใน Supabase SQL Editor:

```txt
supabase/009_v1_2_9_activity_log_source.sql
```

2. แทนที่ไฟล์ใน GitHub repo ด้วยไฟล์ชุดนี้

3. Push ขึ้น GitHub:

```bash
git add .
git commit -m "Release v1.2.9 stabilization"
git push
```

4. หลัง GitHub Pages deploy เสร็จ ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Google Apps Script Email

ใช้ไฟล์:

```txt
apps-script/Code.gs
```

ตั้งค่า Script Properties:

```txt
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_ANON_KEY = anon public key
SENDER_NAME = DEMO CRM
```

Deploy เป็น Web App:

```txt
Execute as: Me
Who has access: Anyone
```

นำ Web App URL ไปใส่ใน:

```txt
ตั้งค่าระบบ → การตั้งค่า → Google Apps Script Web App URL
```

ห้ามใส่ `service_role key`, database password หรือ secret ใด ๆ ใน frontend หรือ repo

## SQL ล้างข้อมูลทดสอบ

ใช้ไฟล์นี้เฉพาะตอนต้องการล้างข้อมูลเดโมก่อนเริ่มใช้งานจริง:

```txt
supabase/reset_transaction_data_keep_masters.sql
```

ไฟล์นี้จะล้าง:
- companies
- demo_rounds
- demo_accounts
- demo_round_modules
- activity_logs
- email_logs

และจะเก็บ:
- users / profiles
- responsible_people
- modules
- email_templates
- settings / logo / fixed CC

ควร backup database ก่อนรันจริง

## Checklist ก่อนส่ง user ใช้งานจริง

- [ ] Login / Logout ใช้งานได้
- [ ] Admin เข้าเมนูตั้งค่าระบบได้
- [ ] User เข้าเมนูตั้งค่าระบบไม่ได้
- [ ] สร้างเดโมพร้อมหลายอีเมลและหลายบัญชีเดโมได้
- [ ] ต่ออายุแล้วรายการหลักยังแสดง 1 บริษัท = 1 record ล่าสุด
- [ ] บันทึกความคืบหน้าแสดงเฉพาะ log ที่ user พิมพ์เอง
- [ ] วันที่ทุกจุดเป็น `dd/mm/yyyy` หรือ `dd/mm/yyyy hh:mm`
- [ ] User ส่งอีเมลแจ้งข้อมูล demo ได้ครั้งเดียว
- [ ] Admin ส่งอีเมลซ้ำได้
- [ ] Apps Script ส่งอีเมลจริงได้
- [ ] Notification badge/popup แสดงข้อมูลถูกต้อง
- [ ] หน้า Report แสดงสรุปรายบริษัทถูกต้อง
- [ ] Export รายงานทำงานได้
- [ ] RLS เปิดครบทุก table
- [ ] ไม่มี service_role key / database password / secret ใน repo

## Rollback

ถ้า deploy แล้วมีปัญหา ให้ revert commit ล่าสุดหรือกลับไปใช้ ZIP เวอร์ชันก่อนหน้า แล้ว hard refresh browser หลัง GitHub Pages deploy เสร็จ
