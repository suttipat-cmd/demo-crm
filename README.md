# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.3`
- Type: Login/UI + Master Delete + Cleanup SQL
- SQL required: มี SQL สำหรับ policy ลบ master และ SQL สำหรับล้างข้อมูลธุรกรรม

## Files

```txt
index.html
style.css
script.js
README.md
supabase/
  007_v1_2_3_master_delete_policies.sql
  reset_transaction_data_keep_masters.sql
```

## สิ่งที่เปลี่ยนใน v1.2.3

- ปรับปุ่ม “กลับ” เป็นไอคอน Back Arrow
- ปรับหน้า Login ให้ข้อความไม่ทับซ้อน ฟอร์มเล็กลง และพื้นหลังเต็มทั้งหน้า
- เพิ่มปุ่มลบ master ผู้รับผิดชอบ เมื่อยังไม่มีรายการเดโม related
- คงการลบ master โมดูลแบบลบได้เฉพาะยังไม่ถูกใช้งาน
- เพิ่ม SQL สำหรับล้างข้อมูลธุรกรรมทั้งหมด โดยเก็บ master data ไว้
- อัปเดต version/cache เป็น `1.2.3`

## SQL

รันไฟล์นี้ก่อนใช้การลบ master ผ่านหน้าเว็บ:

```txt
supabase/007_v1_2_3_master_delete_policies.sql
```

ถ้าต้องการล้างข้อมูล demo ทั้งหมด แต่เก็บ master ให้รันไฟล์นี้ด้วยความระมัดระวัง:

```txt
supabase/reset_transaction_data_keep_masters.sql
```

ไฟล์ reset จะล้าง:
- companies
- demo_rounds
- demo_accounts
- demo_round_modules
- activity_logs
- email_logs

และจะเก็บ:
- profiles/users
- responsible_people
- modules
- email_templates
- settings/logo/fixed CC

## Deploy

```bash
git add .
git commit -m "Release v1.2.3 login layout and master cleanup"
git push
```

หลัง deploy ให้กด `Cmd + Shift + R`
