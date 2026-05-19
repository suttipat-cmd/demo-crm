# demo-crm

Demo CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.1.2`
- Type: UI/Logic Hotfix
- SQL required: `supabase/006_v1_1_2_delete_policies.sql`

## Files

```txt
index.html
style.css
script.js
README.md
supabase/
  006_v1_1_2_delete_policies.sql
```

## สิ่งที่เปลี่ยนใน v1.1.2

- ลบ master โมดูลได้เฉพาะโมดูลที่ยังไม่ถูกใช้งาน
- แก้กราฟหลอดให้คำนวณความยาวจากจำนวน demo record ปัจจุบันทั้งหมด
- เมื่อต่ออายุ demo จะปิดรอบเก่าเป็นสถานะ `ปิดรายการ` ทันที
- Dashboard tables มี pagination ค่าเริ่มต้น 10 รายการ
- หน้า `รายการเดโม` มี pagination ค่าเริ่มต้น 20 รายการ
- เพิ่ม animation แบบพอดีใน card, table, modal, button และ bar chart
- เมื่อ demo round เป็น `ปิดรายการ` ระบบจะลบ activity logs เก่าของ round นั้นแบบถาวร และเหลือ log ล่าสุดไว้

## วิธีติดตั้ง

1. Run SQL นี้ใน Supabase SQL Editor:

```txt
supabase/006_v1_1_2_delete_policies.sql
```

2. แทนที่ไฟล์บน repo:

```txt
index.html
style.css
script.js
README.md
```

3. Push ขึ้น GitHub Pages:

```bash
git add index.html style.css script.js README.md supabase/006_v1_1_2_delete_policies.sql
git commit -m "Release v1.1.2 pagination module delete and cleanup"
git push
```

4. เปิดเว็บแล้ว hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## ตรวจหลัง deploy

- ลองลบโมดูลที่ยังไม่ถูกใช้งาน ต้องลบได้
- โมดูลที่ถูกใช้งานแล้ว ต้องไม่แสดงปุ่มลบ
- สร้าง demo แล้วต่ออายุ รอบเก่าต้องเปลี่ยนเป็น `ปิดรายการ`
- Dashboard table ต้องแบ่งหน้า 10 รายการ
- รายการเดโมต้องแบ่งหน้า 20 รายการ
- กราฟหลอดต้องไม่เต็ม 100% เพียงเพราะเป็นกลุ่มที่มากที่สุด

## Rollback

ถ้าต้อง rollback ให้ revert commit ล่าสุดกลับ v1.1.1 และอย่าใช้งานปุ่มลบโมดูล/cleanup log จนกว่าจะตรวจ policy อีกครั้ง
