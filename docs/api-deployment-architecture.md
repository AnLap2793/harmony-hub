# API Deployment System - Architecture

## 🎯 Mục tiêu

Khách hàng **KHÔNG BAO GIỜ** nhận được mã nguồn. Bạn deploy code vào Sheets của họ qua API.

## 🏗️ Kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│  Customer                                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  1. Tạo Google Sheets                                  │ │
│  │  2. Share với service account của bạn                 │ │
│  │  3. Gửi Sheets URL cho bạn                            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Your Deployment API                                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  POST /api/deploy                                      │ │
│  │  {                                                     │ │
│  │    "sheetsUrl": "https://docs.google.com/...",        │ │
│  │    "licenseKey": "XXXX-XXXX-XXXX-XXXX",              │ │
│  │    "customerEmail": "contact@abc.com"                 │ │
│  │  }                                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                            ↓                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  1. Validate license key                              │ │
│  │  2. Get Sheets ID from URL                            │ │
│  │  3. Create Apps Script project                        │ │
│  │  4. Deploy code to project                            │ │
│  │  5. Bind project to Sheets                            │ │
│  │  6. Set up triggers                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Google Apps Script API                                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  - projects.create()                                   │ │
│  │  - projects.updateContent()                            │ │
│  │  - projects.deployments.create()                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Customer's Google Sheets                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  ✅ Code đã được deploy (từ project của BẠN)          │ │
│  │  ✅ Menu "HRM System" xuất hiện                        │ │
│  │  ✅ Khách sử dụng bình thường                          │ │
│  │  ❌ Khách KHÔNG thấy code                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔑 Ưu điểm

### 1. Bảo mật tuyệt đối
- ✅ Khách **KHÔNG BAO GIỜ** nhận code
- ✅ Code chạy từ Apps Script project của **BẠN**
- ✅ Khách chỉ thấy menu và UI
- ✅ Không thể copy, share, deobfuscate

### 2. Kiểm soát hoàn toàn
- ✅ Bạn có thể **update code** bất cứ lúc nào
- ✅ Bạn có thể **revoke access** ngay lập tức
- ✅ Track usage chính xác
- ✅ Remote debugging

### 3. Trải nghiệm tốt hơn
- ✅ Khách không cần upload code
- ✅ Setup tự động trong 1 phút
- ✅ Luôn dùng version mới nhất

## 🛠️ Implementation

### Bước 1: Setup Google Cloud Project

```bash
# 1. Tạo Google Cloud Project
# https://console.cloud.google.com

# 2. Enable APIs:
# - Google Apps Script API
# - Google Sheets API
# - Google Drive API

# 3. Tạo Service Account
# - Download JSON key file
# - Lưu vào: license-server/config/service-account.json
```

### Bước 2: Deployment API

Tôi sẽ tạo API endpoint để deploy code vào Sheets của khách hàng.

## 📋 Quy trình cho khách hàng

### Cũ (Phức tạp):
```
1. Nhận package code
2. Upload lên Apps Script (5-10 phút)
3. Tạo Sheets
4. Activate license
5. Khởi tạo hệ thống
```

### Mới (Đơn giản):
```
1. Tạo Google Sheets
2. Share với: hrm-deploy@your-project.iam.gserviceaccount.com
3. Gửi Sheets URL + License key cho bạn
4. Đợi 1 phút → Xong!
```

## 🔒 Security

- Service account chỉ có quyền **Editor** trên Sheets được share
- Không có quyền truy cập Sheets khác
- Code được deploy với quyền của service account
- License key vẫn được validate như cũ

Tôi sẽ implement ngay!
