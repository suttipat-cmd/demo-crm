# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.7`
- Type: Data Display + Email Guard Hotfix
- SQL required: ต้องรัน `supabase/008_v1_2_7_activity_log_source.sql`

## Files

```txt
index.html
style.css
script.js
README.md
supabase/
  008_v1_2_7_activity_log_source.sql
```

## สิ่งที่เปลี่ยนใน v1.2.7

- เพิ่ม `source` ให้ `activity_logs` เพื่อแยกบันทึกที่ผู้ใช้พิมพ์เองออกจาก system log
- หน้า Detail แสดง **บันทึกความคืบหน้าของบริษัท** เฉพาะ log ที่ผู้ใช้บันทึกเอง
- system log เช่น สร้างรายการเดโม, ส่งอีเมลไม่สำเร็จ, ต่ออายุ จะไม่แสดงใน timeline ความคืบหน้า
- วันที่/เวลาทั้งระบบและอีเมลใช้รูปแบบ `dd/mm/yyyy` หรือ `dd/mm/yyyy hh:mm`
- ใช้ปี ค.ศ. เท่านั้น
- ปุ่มส่งอีเมลมี loading/disabled เพื่อกันกดซ้ำ
- User ส่งอีเมลแจ้งข้อมูล Demo ครั้งแรกได้ 1 ครั้งต่อรอบเดโม
- ถ้า user ส่งแล้ว จะไม่เห็นปุ่มส่งอีเมลอีก
- Admin ยังสามารถส่งอีเมลซ้ำได้
- เพิ่มหน้า **รายงาน** เป็นมุมมอง **สรุปรายบริษัท** เท่านั้น
- รายงานเรียงจากวันที่บันทึกล่าสุดใหม่สุดก่อน
- ดึงรายงานบริษัทเป็น Excel ได้

## SQL / Migration

ให้รันไฟล์นี้ใน Supabase SQL Editor ก่อนใช้งาน v1.2.7:

```txt
supabase/008_v1_2_7_activity_log_source.sql
```

หลังรันแล้ว ถ้าจะล้างข้อมูลทดสอบก่อนใช้งานจริง ให้ใช้ไฟล์ reset transaction data version ล่าสุดที่มีอยู่ในโปรเจกต์เดิม

## Deploy

```bash
git add .
git commit -m "Release v1.2.7 data display and email guard"
git push
```

หลัง deploy ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Production check หลัง deploy

- [ ] รัน SQL v1.2.7 แล้ว
- [ ] Login ด้วย admin ได้
- [ ] Login ด้วย user ได้
- [ ] สร้างเดโมใหม่แล้วบันทึกความคืบหน้าได้
- [ ] Timeline แสดงเฉพาะบันทึกที่ผู้ใช้พิมพ์เอง
- [ ] System log ไม่แสดงใน Timeline ความคืบหน้า
- [ ] วันที่/เวลาแสดงเป็น `dd/mm/yyyy` หรือ `dd/mm/yyyy hh:mm`
- [ ] User ส่งอีเมลครั้งแรกแล้วปุ่มส่งอีเมลหาย
- [ ] Admin ยังส่งอีเมลซ้ำได้
- [ ] หน้ารายงานแสดงเฉพาะสรุปรายบริษัท
- [ ] กดดึงรายงานได้
- [ ] ตรวจ Console ไม่มี error

## Rollback

ถ้า deploy แล้วมีปัญหา ให้ revert commit ล่าสุด:

```bash
git revert HEAD
git push
```

ถ้าต้อง rollback SQL อย่างเดียว:

```sql
alter table public.activity_logs drop column if exists source;
```
