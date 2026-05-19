# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.8`
- Type: Report Presentation + Google Apps Script Email
- SQL required: ไม่ต้องรัน SQL เพิ่ม

## Files

```txt
index.html
style.css
script.js
README.md
apps-script/
  Code.gs
```

## สิ่งที่เปลี่ยนใน v1.2.8

- ปรับหน้า **รายงาน** ให้เหมาะกับการเปิดนำเสนอมากขึ้น
- ลดการแสดงข้อมูลแบบตารางยาว ๆ แล้วเปลี่ยนเป็น:
  - hero summary
  - metric cards
  - บันทึกล่าสุดที่ควรติดตาม
  - รายการที่ต้องดูแล
  - card สรุปรายบริษัท
- ยังแสดง 1 บริษัท = 1 record และเรียงตามบันทึกล่าสุด
- เพิ่ม Google Apps Script สำหรับส่งอีเมลจริงผ่าน Gmail/Google Workspace
- Web app ส่ง `email_log_id` พร้อม Supabase access token ไป Apps Script
- Apps Script validate session กับ Supabase Auth ก่อนอ่าน email log
- ไม่ใช้ `service_role key` ใน frontend หรือ Apps Script

## ตั้งค่า Google Apps Script

1. ไปที่ Google Apps Script แล้วสร้าง project ใหม่
2. คัดลอกโค้ดจาก `apps-script/Code.gs` ไปวาง
3. ไปที่ **Project Settings → Script properties**
4. เพิ่มค่า:

```txt
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SENDER_NAME=DEMO CRM
```

5. Deploy เป็น Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
6. Copy Web App URL
7. กลับไปที่ DEMO CRM:
   - ตั้งค่าระบบ → การตั้งค่า
   - วาง URL ในช่อง Google Apps Script Web App URL
   - กดบันทึก

## Email flow

```txt
User กดส่งอีเมล
→ Web app สร้าง email_logs เป็น queued
→ Web app เรียก Apps Script พร้อม email_log_id + Supabase access token
→ Apps Script ตรวจ token กับ Supabase Auth
→ Apps Script อ่าน email_logs ผ่าน RLS
→ Apps Script ส่ง Gmail
→ Apps Script อัปเดต email_logs เป็น sent/error
→ Web app โหลดข้อมูลใหม่
```

## Production readiness checklist

ก่อนส่งให้ user ใช้งานจริง ควรตรวจรายการนี้อย่างน้อย 1 รอบ:

### Auth / Role

- [ ] Admin login ได้
- [ ] User login ได้
- [ ] User เข้าเมนูตั้งค่าระบบไม่ได้
- [ ] User ที่ถูกปิดใช้งาน login แล้วถูก sign out
- [ ] Logout แล้ว session ถูกล้างจริง

### Permission / RLS

- [ ] ตาราง `companies` เปิด RLS และ user ที่ login อ่าน/เพิ่ม/แก้ได้ตาม policy
- [ ] ตาราง `demo_rounds` เปิด RLS และ policy ตรงกับ flow สร้าง/แก้/ต่ออายุ
- [ ] ตาราง `demo_accounts` เปิด RLS และไม่อ่านได้จาก user ที่ไม่ได้ login
- [ ] ตาราง `activity_logs` เปิด RLS และแก้/ลบได้เฉพาะ log ล่าสุดตาม rule
- [ ] ตาราง `email_logs` เปิด RLS และ Apps Script อ่าน/อัปเดตได้ด้วย user token
- [ ] ตาราง `modules`, `responsible_people`, `settings`, `email_templates` มี policy ตาม role

### Core flow

- [ ] สร้าง demo ใหม่ได้
- [ ] เพิ่ม contact email หลายรายการได้
- [ ] เพิ่ม demo account หลายบัญชีได้
- [ ] เลือกโมดูลหลายรายการได้
- [ ] เพิ่มบันทึกความคืบหน้าได้
- [ ] หน้า detail แสดง timeline และประวัติรอบ demo ได้
- [ ] ต่ออายุแล้วรายการเดโมยังแสดง 1 บริษัท = 1 record ล่าสุด
- [ ] รอบเก่าถูกเปลี่ยนเป็น `ปิดรายการ`
- [ ] รายงานแสดงบันทึกล่าสุดของแต่ละบริษัทถูกต้อง

### Email

- [ ] Preview email ถูกต้อง
- [ ] Apps Script endpoint ถูกตั้งค่าแล้ว
- [ ] ส่งอีเมลครั้งแรกได้จริง
- [ ] Email error/queued แสดงใน notification
- [ ] Reminder 3 วันทำงานตามที่ต้องการ

### Security / Repo

- [ ] ไม่มี `service_role key` ใน frontend
- [ ] ไม่มี database password ใน repo
- [ ] ไม่มี GitHub token หรือ Apps Script secret ใน repo
- [ ] Repo public ต้องยอมรับได้ว่า anon key และ frontend code มองเห็นได้
- [ ] Backup Supabase ก่อนเปิดใช้งานจริง

## Deploy

```bash
git add .
git commit -m "Release v1.2.8 report presentation and email script"
git push
```

หลัง deploy ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Rollback

ถ้า deploy แล้วมีปัญหา ให้ revert commit ล่าสุด หรืออัปโหลดไฟล์จาก ZIP version ก่อนหน้า

```bash
git revert HEAD
git push
```


## Release v1.2.8 - Regression Recovery

เวอร์ชันนี้ใช้ **v1.2.6 เป็น base หลัก** แล้ว patch เฉพาะ requirement ใหม่ เพื่อไม่ให้เกิด regression ซ้ำ

สิ่งที่เปลี่ยน:
- รักษา Login redesign, branding, notification, Apps Script และ design system จาก v1.2.6
- เพิ่ม `activity_logs.source` เพื่อแยกบันทึกที่ user พิมพ์เอง (`manual`) ออกจาก system log (`system`)
- Timeline / บันทึกล่าสุด / รายงาน แสดงเฉพาะ manual log
- วันที่ทุกจุดใช้ `dd/mm/yyyy` และวันที่พร้อมเวลาใช้ `dd/mm/yyyy hh:mm` โดยใช้ปี ค.ศ.
- User ส่งอีเมลแจ้งข้อมูลเดโมครั้งแรกได้ 1 ครั้งต่อ demo round; admin ส่งซ้ำได้
- ปุ่มส่งอีเมลมี loading/disabled เพื่อกันกดซ้ำ
- หน้า “รายงาน” เหลือเฉพาะ “สรุปรายบริษัท”
- คงไฟล์ `apps-script/Code.gs` ไว้ใน package

SQL ที่ต้องรัน:
```txt
supabase/008_v1_2_8_activity_log_source.sql
```
