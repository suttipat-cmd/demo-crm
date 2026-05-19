# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.0`
- Type: UI Redesign
- SQL required: ไม่ต้องรัน SQL เพิ่ม

## Files

```txt
index.html
style.css
script.js
README.md
```

## สิ่งที่เปลี่ยนใน v1.2.0

- เปลี่ยน layout หลักเป็น Top Navigation ตาม design system ใหม่
- ใช้ชื่อระบบ `DEMO CRM`
- ฝังโลโก้ในไฟล์โค้ดเพื่อไม่ต้องเพิ่มไฟล์รูปแยก
- ปรับสีหลักเป็น blue / cyan ตาม brand
- ปรับ card, table, form, dropdown, badge, pagination, modal และ toast ให้เป็นชุดเดียวกัน
- ปรับ spacing, radius, shadow และ hover state ให้ใช้งานง่ายขึ้น
- ปรับ responsive สำหรับจอเล็ก โดยเมนูด้านบนเลื่อนได้
- รักษา logic จาก v1.1.2 ทั้งหมด

## วิธีติดตั้ง

แทนที่ไฟล์บน repo:

```txt
index.html
style.css
script.js
README.md
```

จากนั้น push:

```bash
git add .
git commit -m "Release v1.2.0 redesign top navigation"
git push
```

หลัง deploy ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## ตรวจหลัง deploy

- หน้า login ต้องแสดงโลโก้และชื่อ DEMO CRM
- หลัง login ต้องเห็นเมนูด้านบน: แดชบอร์ด, รายการเดโม, สร้างเดโม, ตั้งค่าระบบ
- Dashboard, รายการเดโม, ฟอร์ม, Detail และ Admin ต้องยังใช้งานได้เหมือน v1.1.2
- ตรวจสร้างเดโม, ต่ออายุ, บันทึก log, ลบโมดูลที่ไม่ถูกใช้งาน, pagination และดึงรายงาน
- ตรวจ Console ว่าไม่มี JavaScript error

## Rollback

ถ้า UI มีปัญหา ให้ revert commit นี้กลับ v1.1.2 ได้ทันที เพราะ v1.2.0 ไม่ได้เพิ่ม SQL migration
