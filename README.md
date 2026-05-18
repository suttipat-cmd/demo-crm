# demo-crm

Demo CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.1.0`
- Type: Full Release
- ต้องรัน SQL migration ก่อน deploy frontend v1.1.0

## Files

```txt
index.html
style.css
script.js
README.md
supabase/
  005_v1_1_0_responsible_masters.sql
```

## สิ่งที่เปลี่ยนใน v1.1.0

- เพิ่ม autosave draft ในฟอร์มเดโมด้วย `localStorage`
- เพิ่ม master ผู้รับผิดชอบ แยกจาก user login
- ปรับ master โมดูลให้มีรายละเอียดและลำดับ
- บันทึกความคืบหน้าเหลือเฉพาะข้อความใน UI
- เก็บ `log_type` เดิมไว้ใน DB เพื่อ compatibility
- แก้ required `*` เป็นสีแดง
- ช่องรหัสผ่านบัญชีเดโมแสดงค่าจริงตอนกรอก
- Sidebar ย่อ/ขยายได้
- ปรับคำใน UI เป็นภาษาไทย
- ปรับ layout/spacing เพื่อ UX ดีขึ้น
- Log แก้ไข/ลบได้เฉพาะรายการล่าสุดเท่านั้น

## Deploy

1. รัน SQL ใน `supabase/005_v1_1_0_responsible_masters.sql`
2. แทนที่ไฟล์ `index.html`, `style.css`, `script.js`, `README.md`
3. Commit และ push

```bash
git add index.html style.css script.js README.md supabase/005_v1_1_0_responsible_masters.sql
git commit -m "Release v1.1.0 UX and master data improvements"
git push
```

4. เปิด GitHub Pages แล้ว hard refresh

```txt
Mac: Cmd + Shift + R
Windows: Ctrl + F5
```

## Test checklist

- Login ได้
- เข้าแดชบอร์ดได้
- หน้าเดโมโหลดข้อมูลได้
- สร้าง/แก้ไขเดโมได้
- กรอกฟอร์มแล้วสลับแท็บกลับมา ข้อมูลยังอยู่
- ผู้รับผิดชอบมาจาก master ไม่ใช่ user login
- เพิ่ม/แก้ไข master ผู้รับผิดชอบได้
- เพิ่ม/แก้ไข master โมดูลได้
- บันทึกความคืบหน้าเห็นเฉพาะช่องข้อความ
- Log เก่าแก้ไข/ลบไม่ได้ ยกเว้นรายการล่าสุด
- Export Excel ได้

## Rollback

- ถ้า frontend มีปัญหา ให้ rollback commit กลับ v1.0.1 ได้
- ไม่แนะนำให้ rollback SQL หลังมีข้อมูลจริง เพราะ `responsible_people` อาจถูกใช้งานแล้ว
- ถ้าจำเป็นต้อง rollback DB ให้ backup database ก่อนทุกครั้ง
