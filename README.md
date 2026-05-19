# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.2`
- Type: Login & Branding Update
- SQL required: ไม่ต้องรัน SQL เพิ่ม

## Files

```txt
index.html
style.css
script.js
README.md
```

## สิ่งที่เปลี่ยนใน v1.2.2

- ใช้โลโก้ DEMO CRM เป็นโลโก้หลักทุกจุด
- ใช้โลโก้เดียวกันกับ favicon บน browser tab
- ถ้าอัปโหลดโลโก้ใหม่ในตั้งค่าระบบ จะอัปเดตโลโก้และ favicon ตาม
- ปรับหน้า Login ใหม่เป็น split layout ตามแนว design system
- เพิ่ม hero section, login card, input icon และปุ่มแสดง/ซ่อนรหัสผ่าน
- เปลี่ยน wording ปุ่ม email preview จาก `ส่ง / บันทึกคิวอีเมล` เป็น `ส่งอีเมล`
- ไม่แก้ฐานข้อมูล

## Deploy

```bash
git add .
git commit -m "Release v1.2.2 login and branding update"
git push
```

หลัง deploy ให้กด hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Security note

ห้ามใส่ข้อมูลลับใน frontend/repo เช่น:

```txt
service_role key
database password
Google Apps Script secret
GitHub token
```
