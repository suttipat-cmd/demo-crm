# demo-crm

Demo CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.1.1`
- Type: UI/Logic Hotfix
- SQL required: ไม่ต้องรัน SQL เพิ่มจาก v1.1.0

## Files

```txt
index.html
style.css
script.js
README.md
```

## สิ่งที่เปลี่ยนใน v1.1.1

- รวมปุ่มรายงานเป็นปุ่มเดียวชื่อ `ดึงรายงาน`
- ถ้ามี search/filter จะ export ตามผลลัพธ์ที่กรอง ถ้าไม่มี filter จะ export ข้อมูลทั้งหมด
- แก้หลอดกราฟให้คิดความยาวจากจำนวนรายการทั้งหมดในชุดข้อมูลนั้น ไม่ใช่จากกลุ่มที่มากที่สุด
- หน้า `รายการเดโม` แสดง 1 บริษัทเป็น 1 record ล่าสุด แม้มีการต่ออายุหลายรอบ
- รอบเดโมเก่ายังดูได้ในหน้า detail / ประวัติรอบเดโม
- ปรับตารางรายการเดโมไม่ให้ข้อความตกบรรทัด และใช้ horizontal scroll
- ปรับ sidebar ตอนย่อให้เป็น compact mode พร้อม tooltip และ active state ชัดขึ้น

## วิธี deploy

```bash
git add index.html style.css script.js README.md
git commit -m "Hotfix v1.1.1 report dashboard and renewed demo list"
git push
```

หลัง deploy ให้ hard refresh:

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Rollback

ถ้ามีปัญหา ให้ revert commit v1.1.1 แล้ว deploy กลับเป็น v1.1.0

```bash
git revert HEAD
git push
```

## Notes

- ห้ามใส่ `service_role key`, database password, token หรือ secret ใด ๆ ใน frontend
- v1.1.1 ไม่เปลี่ยน schema ฐานข้อมูล
