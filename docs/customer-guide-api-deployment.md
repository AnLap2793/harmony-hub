# Hướng dẫn cho Khách hàng - API Deployment Model

## 🎉 Chào mừng đến với HRM System!

Với phương thức mới này, bạn **KHÔNG CẦN upload code** nữa. Chúng tôi sẽ tự động cài đặt cho bạn!

---

## 🚀 Cài đặt siêu nhanh (3 bước - 2 phút)

### Bước 1: Tạo Google Sheets

1. Truy cập: https://sheets.google.com
2. Click **"Blank"** để tạo Sheets mới
3. Đặt tên: **"HRM System - [Tên công ty bạn]"**
4. Copy URL của Sheets (ví dụ: `https://docs.google.com/spreadsheets/d/1ABC...xyz/edit`)

### Bước 2: Chia sẻ Sheets

1. Click nút **"Share"** (góc trên bên phải)
2. Trong ô **"Add people, groups, and calendar events"**, nhập:
   ```
   hrm-deploy@your-project.iam.gserviceaccount.com
   ```
3. Chọn quyền: **"Editor"**
4. **Bỏ tick** "Notify people" (không cần thông báo)
5. Click **"Share"**

### Bước 3: Gửi thông tin cho chúng tôi

Gửi email đến: **deploy@yourcompany.com** với nội dung:

```
Subject: [HRM] Yêu cầu cài đặt

Thông tin:
- Tên công ty: [Tên công ty bạn]
- Email: [Email của bạn]
- License Key: [License key bạn nhận được]
- Sheets URL: [URL Sheets bạn vừa tạo]

Ví dụ:
- Tên công ty: ABC Company
- Email: contact@abc.com
- License Key: A1B2-C3D4-E5F6-G7H8
- Sheets URL: https://docs.google.com/spreadsheets/d/1ABC...xyz/edit
```

### ⏳ Đợi 1-2 phút

Chúng tôi sẽ:
- ✅ Xác thực license key
- ✅ Tự động cài đặt HRM System vào Sheets của bạn
- ✅ Gửi email xác nhận

### ✅ Hoàn tất!

1. Refresh trang Sheets của bạn (F5)
2. Menu **"HRM System"** sẽ xuất hiện
3. Click **"HRM System"** → **"Khởi tạo hệ thống"**
4. Hệ thống tự động tạo sheets + data mẫu
5. Bắt đầu sử dụng!

---

## 💡 Ưu điểm của phương thức này

### ✅ Đơn giản hơn
- Không cần upload code
- Không cần hiểu Apps Script
- Chỉ cần tạo Sheets và share

### ✅ An toàn hơn
- Code luôn được cập nhật phiên bản mới nhất
- Chúng tôi quản lý bảo mật
- Không lo lỗi khi upload

### ✅ Hỗ trợ tốt hơn
- Chúng tôi có thể debug từ xa
- Update tính năng mới tự động
- Fix bug nhanh chóng

---

## ❓ Câu hỏi thường gặp

### Q: Dữ liệu của tôi có an toàn không?
**A:** Có! Dữ liệu lưu 100% trên Google Sheets của bạn. Chúng tôi chỉ cài đặt code, không truy cập dữ liệu.

### Q: Tôi có thể thu hồi quyền truy cập không?
**A:** Có! Bất cứ lúc nào, bạn có thể:
1. Mở Sheets → Click "Share"
2. Tìm `hrm-deploy@...`
3. Click "Remove"
→ Hệ thống sẽ ngừng hoạt động ngay lập tức.

### Q: Tôi có thể xem code không?
**A:** Không. Code được bảo vệ và chỉ chúng tôi quản lý. Điều này đảm bảo chất lượng và bảo mật.

### Q: Nếu tôi muốn chuyển sang Sheets khác?
**A:** Liên hệ support, chúng tôi sẽ deploy vào Sheets mới cho bạn.

### Q: License hết hạn thì sao?
**A:** Hệ thống sẽ ngừng hoạt động. Liên hệ để gia hạn.

### Q: Tôi có thể sử dụng offline không?
**A:** Không. HRM System cần kết nối internet để hoạt động.

---

## 🆘 Hỗ trợ

### Liên hệ
- **Email deploy**: deploy@yourcompany.com
- **Email support**: support@yourcompany.com
- **Hotline**: 1900-xxxx-xxx
- **Giờ làm việc**: 8:00 - 17:30 (T2-T6)

### Thời gian xử lý
- **Cài đặt mới**: 1-2 phút (tự động)
- **Hỗ trợ kỹ thuật**: Trong ngày làm việc
- **Khẩn cấp**: Trong 1 giờ

---

## ✅ Checklist

- [ ] Tạo Google Sheets
- [ ] Share với service account
- [ ] Gửi email yêu cầu cài đặt
- [ ] Nhận email xác nhận
- [ ] Refresh Sheets
- [ ] Thấy menu "HRM System"
- [ ] Khởi tạo hệ thống
- [ ] Bắt đầu sử dụng

---

## 🎯 So sánh với phương thức cũ

| | Phương thức cũ | Phương thức mới |
|---|---|---|
| **Upload code** | ✅ Phải upload | ❌ Không cần |
| **Thời gian setup** | 5-10 phút | 2 phút |
| **Độ khó** | Trung bình | Rất dễ |
| **Update** | Phải upload lại | Tự động |
| **Bảo mật code** | Obfuscated | Hoàn toàn ẩn |
| **Hỗ trợ** | Khó debug | Dễ debug |

---

**Chúc bạn sử dụng hiệu quả! 🎉**

*HRM System v2.0 - API Deployment Model*  
*© 2026 Your Company*
