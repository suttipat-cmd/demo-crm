# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.5`
- Type: Report + Production Readiness
- SQL required: ไม่ต้องรัน SQL เพิ่ม

## Files

```txt
index.html
style.css
script.js
README.md
```

## สิ่งที่เปลี่ยนใน v1.2.5

- เพิ่มเมนู **รายงาน** ใน navbar ก่อนเมนูตั้งค่าระบบ
- หน้า **รายงาน** แสดง 1 บริษัท = 1 แถว โดยไม่กรองตามสถานะ
- แสดงข้อมูลเดโมล่าสุดของแต่ละบริษัท พร้อมบันทึกล่าสุดของบริษัทนั้น
- เรียงข้อมูลจากวันที่บันทึกล่าสุดใหม่สุดก่อน
- เพิ่มค้นหาในหน้ารายงาน
- เพิ่มปุ่ม **ดึงรายงาน** สำหรับ export รายงานบริษัท
- เพิ่ม pagination ในหน้ารายงาน ค่าเริ่มต้น 20 รายการ
- เพิ่ม production readiness checklist สำหรับตรวจระบบก่อนส่งให้ user ใช้งานจริง

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
- [ ] ตาราง `email_logs` เปิด RLS และไม่หลุดข้อมูล email ข้าม role
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

### Report / Export

- [ ] หน้า รายการเดโม กดดึงรายงานได้
- [ ] หน้า รายงาน กดดึงรายงานได้
- [ ] Search/filter แล้ว export ได้ข้อมูลตรงกับที่เห็น
- [ ] ข้อมูล sensitive เช่นรหัสผ่าน demo account แสดงเฉพาะหน้าที่ตั้งใจให้เห็น

### Email

- [ ] Preview email ถูกต้อง
- [ ] Apps Script endpoint ถูกตั้งค่าแล้ว
- [ ] ส่งอีเมลครั้งแรกได้จริง
- [ ] Email error/queued แสดงใน notification
- [ ] Reminder 3 วันทำงานตามที่ต้องการ

### UI / Browser

- [ ] Hard refresh แล้วไม่ค้าง loading
- [ ] กลับมาจาก tab อื่นแล้วข้อมูลไม่หาย
- [ ] Draft form ถูกจำใน browser เดิม
- [ ] Dashboard pagination ใช้งานได้
- [ ] Demo list pagination ใช้งานได้
- [ ] Report pagination ใช้งานได้
- [ ] Mobile/tablet ไม่พัง แม้ยังไม่ใช่ primary target

### Security / Repo

- [ ] ไม่มี `service_role key` ใน frontend
- [ ] ไม่มี database password ใน repo
- [ ] ไม่มี GitHub token หรือ Apps Script secret ใน repo
- [ ] Repo public ต้องยอมรับได้ว่า anon key และ frontend code มองเห็นได้
- [ ] Backup Supabase ก่อนเปิดใช้งานจริง

## Deploy

```bash
git add .
git commit -m "Release v1.2.5 report and production readiness"
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
