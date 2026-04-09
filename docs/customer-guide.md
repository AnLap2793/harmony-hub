# Hướng dẫn cho Khách hàng - HRM System

## 🎯 Bắt đầu nhanh (3 bước đơn giản)

### Bước 1: Upload code lên Google Apps Script

1. Truy cập: https://script.google.com
2. Click **"New Project"**
3. Upload tất cả files từ folder bạn nhận được:
   - `Code.js`
   - `core/LicenseValidator.js`
   - `core/TemplateSetup.js`
   - `appsscript.json`
4. Click **Save** (Ctrl+S)

### Bước 2: Tạo Google Sheets

1. Tạo Google Sheets mới: https://sheets.google.com
2. Đặt tên: "HRM System - [Tên công ty bạn]"
3. Refresh trang (F5)
4. Menu **"HRM System"** sẽ xuất hiện

### Bước 3: Kích hoạt license

1. Click menu **"HRM System"** → **"Activate License"**
2. Nhập license key: `[YOUR-LICENSE-KEY]`
3. Click **"Activate"**
4. Thành công! ✅

---

## 🎉 Khởi tạo hệ thống

Sau khi activate license, làm theo:

1. Click menu **"HRM System"** → **"Khởi tạo hệ thống"**
2. Click **"Yes"** để xác nhận
3. Đợi 5-10 giây
4. Hệ thống tự động tạo:
   - ✅ Dashboard (Tổng quan)
   - ✅ Employees (5 nhân viên mẫu)
   - ✅ Attendance (Dữ liệu chấm công mẫu)
   - ✅ Leave (Đơn nghỉ phép mẫu)
   - ✅ Payroll (Bảng lương mẫu)
   - ✅ Settings (Cài đặt)

---

## 📊 Sử dụng hệ thống

### Dashboard - Tổng quan
- Xem tổng số nhân viên
- Số người có mặt hôm nay
- Số người đang nghỉ phép
- Tổng lương tháng

### Employees - Quản lý nhân viên
1. Xem danh sách nhân viên mẫu
2. **Xóa dữ liệu mẫu** (chọn dòng 2-6, click chuột phải → Delete rows)
3. Nhập nhân viên thực của bạn:
   - Mã NV: NV001, NV002, ...
   - Họ tên, email, số điện thoại
   - Phòng ban, chức vụ
   - Ngày vào làm
   - Lương cơ bản

### Attendance - Chấm công
1. Xem dữ liệu chấm công mẫu
2. **Xóa dữ liệu mẫu** nếu muốn
3. Sử dụng menu **"HRM System"** → **"Chấm công"** → **"Chấm công hôm nay"**

### Leave - Nghỉ phép
1. Xem đơn nghỉ phép mẫu
2. **Xóa dữ liệu mẫu** nếu muốn
3. Nhân viên đăng ký nghỉ phép qua menu
4. Quản lý duyệt đơn

### Payroll - Bảng lương
1. Xem bảng lương mẫu
2. **Xóa dữ liệu mẫu** nếu muốn
3. Tính lương tháng tự động qua menu

### Settings - Cài đặt
1. Cập nhật **thông tin công ty**:
   - Tên công ty
   - Địa chỉ, điện thoại, email
2. Cài đặt **chấm công**:
   - Giờ vào làm: 08:00
   - Giờ tan làm: 17:30
   - Số phút được đi muộn: 15
3. Cài đặt **nghỉ phép**:
   - Số ngày phép/năm: 12
   - Số ngày ốm/năm: 30
4. Danh sách **phòng ban**

---

## 💡 Mẹo sử dụng

### Xóa dữ liệu mẫu
```
1. Chọn các dòng có dữ liệu mẫu
2. Click chuột phải → "Delete rows"
3. Bắt đầu nhập dữ liệu thực
```

### Sao lưu dữ liệu
```
1. File → Make a copy
2. Đặt tên: "HRM Backup - [Ngày]"
3. Lưu vào Google Drive
```

### Chia sẻ với đồng nghiệp
```
1. Click "Share" (góc trên bên phải)
2. Nhập email đồng nghiệp
3. Chọn quyền: "Editor" hoặc "Viewer"
4. Click "Send"
```

### In báo cáo
```
1. Chọn sheet cần in (Employees, Attendance, etc.)
2. File → Print
3. Chọn "Current sheet"
4. Click "Next" → "Print"
```

---

## ❓ Câu hỏi thường gặp

### Q: Tôi có thể sử dụng trên nhiều máy không?
**A:** Có! Google Sheets chạy trên cloud, bạn truy cập từ bất kỳ đâu có internet.

### Q: Dữ liệu có bị mất không?
**A:** Không. Dữ liệu lưu trên Google Drive của bạn, Google tự động backup.

### Q: Tôi có thể tùy chỉnh không?
**A:** Có thể chỉnh sửa Settings, thêm/xóa cột trong các sheet.

### Q: License hết hạn thì sao?
**A:** Hệ thống sẽ thông báo trước 30 ngày. Liên hệ support để gia hạn.

### Q: Tôi muốn chuyển sang máy khác?
**A:** Menu "HRM System" → "Settings" → "Deactivate License", sau đó activate lại trên máy mới.

### Q: Tôi quên license key?
**A:** Liên hệ support@yourcompany.com với email đã đăng ký.

---

## 🆘 Hỗ trợ

### Liên hệ
- **Email:** support@yourcompany.com
- **Hotline:** 1900-xxxx-xxx
- **Giờ làm việc:** 8:00 - 17:30 (Thứ 2 - Thứ 6)

### Video hướng dẫn
- YouTube: [Link video]

### Tài liệu
- Hướng dẫn chi tiết: [Link]
- FAQ: [Link]

---

## ✅ Checklist sau khi cài đặt

- [ ] Upload code lên Google Apps Script
- [ ] Tạo Google Sheets mới
- [ ] Activate license thành công
- [ ] Khởi tạo hệ thống (tạo sheets + data mẫu)
- [ ] Xem qua Dashboard
- [ ] Cập nhật Settings (thông tin công ty)
- [ ] Xóa dữ liệu mẫu
- [ ] Nhập nhân viên thực
- [ ] Test chấm công
- [ ] Chia sẻ với đồng nghiệp (nếu cần)

---

**Chúc bạn sử dụng hiệu quả! 🎉**

*HRM System v1.0 - © 2026 Your Company*
