# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.1`
- Type: UI / Settings Update
- SQL required: ไม่ต้องรัน SQL เพิ่ม

## Files

```txt
index.html
style.css
script.js
README.md
```

## สิ่งที่เปลี่ยนใน v1.2.1

- เพิ่มตัวเลขแจ้งเตือนบนไอคอนกระดิ่ง
- คลิกกระดิ่งแล้วแสดง popup แจ้งเตือนจากข้อมูลปัจจุบัน
- แจ้งเตือนเดโมใกล้หมดอายุภายใน 7 วัน
- แจ้งเตือนเดโมหมดอายุแล้วยังไม่ปิดรายการ
- แจ้งเตือนอีเมลส่งไม่สำเร็จและอีเมลรอส่ง
- กดรายการแจ้งเตือนแล้วเข้าไปยังหน้ารายละเอียดเดโม
- เพิ่มแท็บ `แบรนด์ / โลโก้` ในหน้าตั้งค่าระบบ
- อัปโหลดโลโก้เว็บเองได้ รองรับ PNG/JPG/WebP ไม่เกิน 300KB
- บันทึกโลโก้ใน `settings.brand_logo_data_uri` เป็น base64
- มีปุ่มคืนค่าโลโก้เริ่มต้น
- ไม่ใช้ service_role key ใน frontend

## Deploy

```bash
git add .
git commit -m "Release v1.2.1 brand logo and notifications"
git push
```

หลัง deploy ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Test checklist

- Login ด้วย admin
- เปิดกระดิ่งแล้วเห็น popup แจ้งเตือน
- มี badge ตัวเลขเมื่อมีรายการใกล้หมดอายุ/หมดอายุ/email error/queued
- กด notification แล้วไปหน้า detail ได้
- เข้า `ตั้งค่าระบบ > แบรนด์ / โลโก้`
- อัปโหลดโลโก้ PNG/JPG/WebP แล้ว preview ได้
- บันทึกแล้วโลโก้บน header เปลี่ยน
- กดคืนค่าโลโก้เริ่มต้นแล้วกลับเป็นโลโก้ default
- ตรวจ Console ว่าไม่มี error ใหม่

## Security notes

- ห้ามใส่ service_role key, database password หรือ secret ใด ๆ ใน frontend
- โลโก้ถูกเก็บเป็น base64 ใน `settings` เหมาะกับไฟล์ขนาดเล็กเท่านั้น
- ถ้าต้องใช้โลโก้ขนาดใหญ่ในอนาคต ควรย้ายไป Supabase Storage พร้อม policy ที่เหมาะสม
