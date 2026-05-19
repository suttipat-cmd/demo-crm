# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.3.0`
- Type: User Profile + Admin Fix Release
- SQL required:
  - `supabase/009_v1_2_9_activity_log_source.sql` ถ้ายังไม่เคยรันจาก v1.2.9
  - `supabase/010_v1_3_0_profile_avatar.sql`

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
  reset_transaction_data_keep_masters.sql
```

## สิ่งที่ปรับใน v1.3.0

- เพิ่มรูปโปรไฟล์ผู้ใช้ในเมนู `ตั้งค่าระบบ → ผู้ใช้ระบบ`
- admin อัปโหลดรูปโปรไฟล์ให้แต่ละผู้ใช้ได้
- รูปโปรไฟล์แสดงเป็นกรอบวงกลม
- รองรับ PNG / JPG / WebP ขนาดไม่เกิน 300KB
- เก็บรูปเป็น base64 ใน `profiles.avatar_data_uri`
- แสดงรูปโปรไฟล์ที่มุมขวาบนของเว็บ
- แสดงรูปโปรไฟล์ในตารางผู้ใช้ระบบ
- แสดงรูปผู้บันทึกใน activity timeline
- แก้ error ตอน admin บันทึกสถานะผู้ใช้ (`is_active is not defined`)
- ถ้าบัญชีถูกปิดใช้งานแล้ว login จะขึ้นข้อความ: `บัญชีนี้ถูกปิดใช้งาน กรุณาติดต่อผู้ดูแลระบบ`
- sync version/cache เป็น v1.3.0

## วิธีติดตั้ง / Deploy

1. รัน SQL migration ใน Supabase SQL Editor:

```txt
supabase/010_v1_3_0_profile_avatar.sql
```

ถ้ายังไม่เคยรัน migration ของ v1.2.9 ให้รันไฟล์นี้ก่อน:

```txt
supabase/009_v1_2_9_activity_log_source.sql
```

2. แทนที่ไฟล์ใน GitHub repo ด้วยไฟล์ชุดนี้

3. Push ขึ้น GitHub:

```bash
git add .
git commit -m "Release v1.3.0 user profile avatars and admin fix"
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
ตั้งค่าระบบ → ตั้งค่าอีเมล → Google Apps Script Web App URL
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

และเก็บ master:
- profiles/users รวมรูปโปรไฟล์
- responsible_people
- modules
- email_templates
- settings/logo/fixed CC

ควร backup database ก่อนรันจริง

## Production checklist สั้น ๆ

- [ ] รัน SQL migration ครบ
- [ ] login ด้วย admin ได้
- [ ] admin แก้ชื่อ/role/status ผู้ใช้ได้
- [ ] admin อัปโหลด/ลบรูปโปรไฟล์ผู้ใช้ได้
- [ ] user ที่ถูกปิดใช้งาน login แล้วเห็นข้อความแจ้งเตือน
- [ ] สร้าง demo ได้
- [ ] เพิ่มบันทึกความคืบหน้าได้
- [ ] ส่งอีเมลผ่าน Apps Script ได้
- [ ] รายงาน/notification/export ทำงาน
- [ ] ตรวจว่าไม่มี service_role key หรือ secret ใน repo
