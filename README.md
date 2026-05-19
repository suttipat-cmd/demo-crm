# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.3.2`
- Type: Notification Read/Dismiss Release
- SQL required:
  - `supabase/009_v1_2_9_activity_log_source.sql` ถ้ายังไม่เคยรันจาก v1.2.9
  - `supabase/010_v1_3_0_profile_avatar.sql` ถ้ายังไม่เคยรันจาก v1.3.0
  - `supabase/011_v1_3_2_notification_states.sql`

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
  reset_transaction_data_keep_masters.sql
```

## v1.3.2 Update

- เพิ่มสถานะอ่านแล้ว/ซ่อนแล้วของแจ้งเตือน แยกตาม user
- ตัวเลขบนกระดิ่งนับเฉพาะแจ้งเตือนที่ยังไม่อ่าน
- เมื่อเปิด popup แจ้งเตือน ระบบ mark รายการปัจจุบันเป็นอ่านแล้ว ทำให้ตัวเลขหาย
- แจ้งเตือนเคสใหม่ เช่น demo round ใหม่, หมดอายุใหม่, email log ใหม่ จะแสดงตัวเลขใหม่อีกครั้ง
- เพิ่มปุ่ม `×` เพื่อซ่อนแจ้งเตือนรายรายการ
- เพิ่มปุ่ม `ล้างทั้งหมด` เพื่อซ่อนรายการที่กำลังแสดงในหมวดนั้น
- เก็บ state ในตาราง `notification_states` บน Supabase
- อัปเดต SQL ล้างข้อมูลทดสอบให้ล้าง `notification_states` ด้วย

## สิ่งที่มีจาก v1.3.1

- หน้า `รายการเดโม` แสดง `วันรอบนี้`, `วันคงเหลือ`, และ `วันสะสมทั้งหมด`
- `วันรอบนี้` และ `วันคงเหลือ` คำนวณจาก demo round ล่าสุด
- `วันสะสมทั้งหมด` รวมจำนวนวัน demo ทุก round ของบริษัทนั้น
- หน้า detail แสดงประวัติรอบเดโมและจำนวนวันแต่ละรอบ
- บันทึกความคืบหน้าใช้เฉพาะ log ที่ user พิมพ์เอง ไม่เอา system log มาปน

## วิธีติดตั้ง / Deploy

1. รัน SQL migration ใน Supabase SQL Editor:

```txt
supabase/011_v1_3_2_notification_states.sql
```

ถ้ายังไม่เคยรัน migration เดิม ให้รันตามลำดับ:

```txt
supabase/009_v1_2_9_activity_log_source.sql
supabase/010_v1_3_0_profile_avatar.sql
supabase/011_v1_3_2_notification_states.sql
```

2. แทนที่ไฟล์ใน GitHub repo ด้วยไฟล์ชุดนี้

3. Push ขึ้น GitHub:

```bash
git add .
git commit -m "Release v1.3.2 notification read dismiss"
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
- notification_states

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
- [ ] admin แก้ชื่อ/role/status/รูปโปรไฟล์ผู้ใช้ได้
- [ ] user ที่ถูกปิดใช้งาน login แล้วเห็นข้อความแจ้งเตือน
- [ ] สร้าง demo ได้
- [ ] เพิ่มบันทึกความคืบหน้าได้
- [ ] ส่งอีเมลผ่าน Apps Script ได้
- [ ] กระดิ่งแจ้งเตือนแสดง badge, อ่านแล้วตัวเลขหาย, ปิดรายรายการได้
- [ ] รายงาน/export ทำงาน
- [ ] ตรวจว่าไม่มี service_role key หรือ secret ใน repo
