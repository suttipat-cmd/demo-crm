# demo-crm

DEMO CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.2.4`
- Type: UI Polish / Visual Refinement
- SQL required: ไม่ต้องรัน SQL เพิ่ม

## Files

```txt
index.html
style.css
script.js
README.md
```

## สิ่งที่เปลี่ยนใน v1.2.4

- ลดความแข็งของ UI โดยลดเส้นขอบที่ไม่จำเป็นและใช้ shadow ที่นุ่มขึ้น
- ปรับ card, section title, table, form control และ empty state ให้เป็นชุดเดียวกัน
- ปรับประวัติรอบเดโมให้เป็น timeline จริง มีจุด/เส้นเชื่อมและ highlight รอบปัจจุบัน
- ปรับ hierarchy ของตัวอักษร วันที่ รายละเอียด และปุ่มในหน้า detail
- ปรับ table row, badge, button และ bar chart ให้ดูเรียบร้อยขึ้น
- ไม่แตะ database และไม่เปลี่ยน business logic

## Deploy

```bash
git add .
git commit -m "Release v1.2.4 UI polish"
git push
```

หลัง deploy ให้กด `Cmd + Shift + R`

## Rollback

ย้อนกลับ commit ก่อนหน้าใน GitHub หรือ deploy ไฟล์ v1.2.3 กลับขึ้นไปแทนได้ทันที เพราะ v1.2.4 ไม่ได้เปลี่ยน schema/database
