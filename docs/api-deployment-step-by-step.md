# Quy trình Setup API Deployment - Chi tiết từng bước

## 🎯 Tổng quan

Khách hàng **KHÔNG upload code**. Bạn deploy code vào Sheets của họ qua API.

---

## 📖 PHẦN 1: BẠN SETUP (Làm 1 lần - 30 phút)

### Bước 1: Tạo Google Cloud Service Account

#### 1.1. Tạo Project

1. Truy cập: https://console.cloud.google.com
2. Click **"Select a project"** (góc trên)
3. Click **"NEW PROJECT"**
4. Điền:
   - **Project name**: `HRM-Deployment`
   - **Location**: No organization
5. Click **"CREATE"**
6. Đợi 10-20 giây
7. Click **"SELECT PROJECT"**

#### 1.2. Enable APIs

1. Vào menu (☰) → **"APIs & Services"** → **"Library"**
2. Tìm và enable 3 APIs:

**API 1: Google Apps Script API**
- Search: "Apps Script API"
- Click vào "Google Apps Script API"
- Click **"ENABLE"**

**API 2: Google Sheets API**
- Back → Search: "Sheets API"
- Click vào "Google Sheets API"
- Click **"ENABLE"**

**API 3: Google Drive API**
- Back → Search: "Drive API"
- Click vào "Google Drive API"
- Click **"ENABLE"**

#### 1.3. Tạo Service Account

1. Vào menu (☰) → **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (góc trên)
3. Chọn **"Service account"**
4. Điền thông tin:
   - **Service account name**: `hrm-deploy`
   - **Service account ID**: `hrm-deploy` (tự động)
   - **Description**: `Deploy HRM code to customer Sheets`
5. Click **"CREATE AND CONTINUE"**
6. **Grant this service account access to project**: 
   - Bỏ qua (không chọn gì)
   - Click **"CONTINUE"**
7. **Grant users access to this service account**:
   - Bỏ qua (không chọn gì)
   - Click **"DONE"**

#### 1.4. Tạo Key cho Service Account

1. Trong trang **"Credentials"**, tìm phần **"Service Accounts"**
2. Click vào service account vừa tạo: `hrm-deploy@hrm-deployment-xxxxx.iam.gserviceaccount.com`
3. Vào tab **"KEYS"**
4. Click **"ADD KEY"** → **"Create new key"**
5. Chọn **"JSON"**
6. Click **"CREATE"**
7. File JSON sẽ tự động download: `hrm-deployment-xxxxx-yyyyyyy.json`

**⚠️ LƯU Ý:** File này chứa private key, giữ bí mật!

#### 1.5. Lưu Service Account Email

1. Copy email của service account:
   ```
   hrm-deploy@hrm-deployment-xxxxx.iam.gserviceaccount.com
   ```
2. Lưu vào notepad, bạn sẽ cần nó!

---

### Bước 2: Setup Project

#### 2.1. Copy Service Account Key

```bash
# Tạo thư mục config
cd app-script/license-server
mkdir -p config

# Copy file JSON vừa download vào
# Windows:
copy "%USERPROFILE%\Downloads\hrm-deployment-xxxxx-yyyyyyy.json" config\service-account.json

# Mac/Linux:
cp ~/Downloads/hrm-deployment-xxxxx-yyyyyyy.json config/service-account.json
```

#### 2.2. Install Dependencies

```bash
# Trong thư mục license-server
npm install googleapis
```

#### 2.3. Update .env

```bash
# Thêm vào file .env
echo "SERVICE_ACCOUNT_EMAIL=hrm-deploy@hrm-deployment-xxxxx.iam.gserviceaccount.com" >> .env
```

#### 2.4. Test Server

```bash
# Start server
npm start

# Trong terminal khác, test
curl http://localhost:3000/health

# Kết quả: {"status":"ok","timestamp":"..."}
```

---

## 📖 PHẦN 2: KHI CÓ KHÁCH HÀNG MỚI

### Bước 1: Generate License Key

```bash
curl -X POST http://localhost:3000/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "maxActivations": 5,
    "expirationDays": 365
  }'
```

**Kết quả:**
```json
{
  "success": true,
  "license": {
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerName": "ABC Company",
    "expiresAt": "2027-04-08T00:00:00.000Z"
  }
}
```

**Lưu license key:** `A1B2-C3D4-E5F6-G7H8`

---

### Bước 2: Gửi Email Hướng Dẫn cho Khách

**Subject:** [HRM System] Hướng dẫn cài đặt

**Nội dung:**

```
Kính gửi ABC Company,

Cảm ơn bạn đã tin tưởng sử dụng HRM System!

🔑 THÔNG TIN LICENSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
License Key: A1B2-C3D4-E5F6-G7H8
Hạn sử dụng: 08/04/2027
Domain: abc.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 HƯỚNG DẪN CÀI ĐẶT (3 BƯỚC - 2 PHÚT)

BƯỚC 1: Tạo Google Sheets
   1. Truy cập: https://sheets.google.com
   2. Click "Blank" để tạo Sheets mới
   3. Đặt tên: "HRM System - ABC Company"
   4. Copy URL của Sheets
      Ví dụ: https://docs.google.com/spreadsheets/d/1ABC...xyz/edit

BƯỚC 2: Chia sẻ Sheets với chúng tôi
   1. Click nút "Share" (góc trên bên phải)
   2. Trong ô "Add people...", nhập email:
      
      hrm-deploy@hrm-deployment-xxxxx.iam.gserviceaccount.com
      
   3. Chọn quyền: "Editor"
   4. BỎ TICK "Notify people" (không cần thông báo)
   5. Click "Share"

BƯỚC 3: Gửi thông tin cho chúng tôi
   Reply email này với:
   
   Sheets URL: [Paste URL Sheets bạn vừa tạo ở đây]
   
   Chúng tôi sẽ cài đặt trong 1-2 phút!

🆘 HỖ TRỢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: support@yourcompany.com
Hotline: 1900-xxxx-xxx

Trân trọng,
Your Company Team
```

---

### Bước 3: Nhận Sheets URL từ Khách

Khách hàng sẽ reply email với Sheets URL, ví dụ:

```
Sheets URL: https://docs.google.com/spreadsheets/d/1ABCdefGHIjklMNOpqrsTUVwxyz123456789/edit
```

---

### Bước 4: Deploy Code vào Sheets của Khách

```bash
curl -X POST http://localhost:3000/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "sheetsUrl": "https://docs.google.com/spreadsheets/d/1ABCdefGHIjklMNOpqrsTUVwxyz123456789/edit",
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerEmail": "contact@abc.com"
  }'
```

**Quá trình API thực hiện (tự động):**

1. ✅ Validate license key `A1B2-C3D4-E5F6-G7H8`
2. ✅ Extract Sheets ID: `1ABCdefGHIjklMNOpqrsTUVwxyz123456789`
3. ✅ Check service account có quyền truy cập Sheets không
4. ✅ Tạo Apps Script project mới
5. ✅ Copy code từ `src/` vào project
6. ✅ Bind project vào Sheets của khách
7. ✅ Lưu thông tin deployment vào database

**Kết quả:**
```json
{
  "success": true,
  "message": "Code deployed successfully",
  "sheetsId": "1ABCdefGHIjklMNOpqrsTUVwxyz123456789",
  "scriptId": "AKfycbz...",
  "instructions": "Please refresh your Google Sheets. The 'HRM System' menu should appear."
}
```

---

### Bước 5: Gửi Email Xác Nhận cho Khách

**Subject:** [HRM System] Cài đặt hoàn tất ✅

**Nội dung:**

```
Kính gửi ABC Company,

Hệ thống HRM đã được cài đặt thành công vào Sheets của bạn!

✅ HOÀN TẤT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sheets ID: 1ABCdefGHIjklMNOpqrsTUVwxyz123456789
Cài đặt lúc: 08/04/2026 15:45

📋 BƯỚC TIẾP THEO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Mở Sheets của bạn
2. Refresh trang (nhấn F5)
3. Menu "HRM System" sẽ xuất hiện ở thanh menu
4. Click "HRM System" → "Khởi tạo hệ thống"
5. Hệ thống tự động tạo:
   • Dashboard (Tổng quan)
   • Employees (Danh sách nhân viên + 5 mẫu)
   • Attendance (Chấm công + data mẫu)
   • Leave (Nghỉ phép + data mẫu)
   • Payroll (Bảng lương)
   • Settings (Cài đặt)
6. Xem qua data mẫu để hiểu cách dùng
7. Xóa data mẫu và nhập data thực của công ty bạn
8. Bắt đầu sử dụng!

💡 LƯU Ý
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Dữ liệu của bạn lưu 100% trên Sheets của bạn
• Chúng tôi chỉ cài đặt code, không truy cập dữ liệu
• Bạn có thể thu hồi quyền truy cập bất cứ lúc nào:
  Sheets → Share → Tìm hrm-deploy@... → Remove

🆘 HỖ TRỢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nếu có vấn đề, liên hệ ngay:
Email: support@yourcompany.com
Hotline: 1900-xxxx-xxx

Chúc bạn sử dụng hiệu quả!

Trân trọng,
Your Company Team
```

---

## 📖 PHẦN 3: KHÁCH HÀNG SỬ DỤNG

### Bước 1: Khách Refresh Sheets

Khách mở Sheets và nhấn **F5** (refresh)

### Bước 2: Menu Xuất Hiện

Menu **"HRM System"** xuất hiện ở thanh menu (giữa Help và Add-ons)

### Bước 3: Khởi Tạo Hệ Thống

1. Click **"HRM System"** → **"Khởi tạo hệ thống"**
2. Dialog xuất hiện: "Hệ thống sẽ tự động tạo các bảng và dữ liệu mẫu"
3. Click **"Yes"**
4. Đợi 5-10 giây
5. Xong! Các sheets được tạo tự động:
   - Dashboard
   - Employees (có 5 nhân viên mẫu)
   - Attendance (có data chấm công mẫu)
   - Leave (có đơn nghỉ phép mẫu)
   - Payroll (bảng lương)
   - Settings (cài đặt)

### Bước 4: Sử Dụng

Khách có thể:
- Xem data mẫu để hiểu cách dùng
- Xóa data mẫu (chọn dòng → Delete rows)
- Nhập data thực của công ty
- Sử dụng menu "HRM System" để:
  - Quản lý nhân viên
  - Chấm công
  - Duyệt nghỉ phép
  - Tính lương

---

## 🔍 PHẦN 4: TROUBLESHOOTING

### Vấn đề 1: Khách không thấy menu

**Nguyên nhân:** Service account chưa có quyền truy cập Sheets

**Giải quyết:**
```bash
# Check deployment status
curl http://localhost:3000/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password

# Nếu deployedSheetsId = null, deploy lại
curl -X POST http://localhost:3000/api/deploy \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Vấn đề 2: API trả lỗi "Service account does not have access"

**Nguyên nhân:** Khách chưa share Sheets

**Giải quyết:** Hướng dẫn khách share lại với email:
```
hrm-deploy@hrm-deployment-xxxxx.iam.gserviceaccount.com
```

### Vấn đề 3: Khách muốn chuyển sang Sheets khác

**Giải quyết:**
```bash
# 1. Undeploy khỏi Sheets cũ
curl -X POST http://localhost:3000/api/undeploy \
  -H "Content-Type: application/json" \
  -d '{"licenseKey": "A1B2-C3D4-E5F6-G7H8"}'

# 2. Deploy vào Sheets mới
curl -X POST http://localhost:3000/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "sheetsUrl": "NEW_SHEETS_URL",
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerEmail": "contact@abc.com"
  }'
```

---

## ✅ Checklist

### Setup (1 lần)
- [ ] Tạo Google Cloud Project
- [ ] Enable 3 APIs
- [ ] Tạo Service Account
- [ ] Download JSON key
- [ ] Copy vào `config/service-account.json`
- [ ] Install googleapis
- [ ] Update .env
- [ ] Test server

### Mỗi khách hàng
- [ ] Generate license key
- [ ] Gửi email hướng dẫn
- [ ] Nhận Sheets URL
- [ ] Deploy qua API
- [ ] Gửi email xác nhận
- [ ] Follow up

---

## 🎯 Tóm tắt

**Khách hàng làm:**
1. Tạo Sheets (1 phút)
2. Share với service account (30 giây)
3. Gửi URL cho bạn (10 giây)
4. Refresh → Dùng (10 giây)

**Bạn làm:**
1. Generate license (10 giây)
2. Gửi email hướng dẫn (1 phút)
3. Gọi API deploy (10 giây)
4. Gửi email xác nhận (1 phút)

**Tổng thời gian:** ~5 phút (so với 10-15 phút model cũ)

**Bảo mật:** Khách KHÔNG BAO GIỜ thấy code!
