# demo-crm

Demo CRM สำหรับทีม CS ใช้จัดการบริษัทที่ขอทดลองใช้งานระบบ

## Version

- Current: `v1.0.1`
- Hotfix: แก้ปัญหาหน้าเว็บค้างที่ loading หลังสลับแท็บ/กลับมาเปิดแท็บเดิม

## Files

```txt
index.html
style.css
script.js
README.md
```

## Deploy

1. แทนที่ไฟล์เดิมทั้ง 4 ไฟล์ใน repo
2. Commit และ push ไปที่ `main`
3. เปิด GitHub Pages URL
4. กด hard refresh

```bash
git add index.html style.css script.js README.md
git commit -m "Hotfix v1.0.1 prevent loading hang on tab restore"
git push
```

## Test

- Login ได้
- สลับไปแท็บอื่นแล้วกลับมา หน้าไม่ค้าง loading
- ถ้า Supabase ช้าหรือ timeout ต้องเห็นข้อความ error และปุ่มลองโหลดใหม่
- Dashboard / Demo List / Detail โหลดข้อมูลได้
