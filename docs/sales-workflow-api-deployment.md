# Sales Workflow - API Deployment Model

## 🎯 Quy trình bán hàng mới (Đơn giản hơn)

### ✅ Ưu điểm so với model cũ

|                     | Model cũ (Obfuscation)              | Model mới (API Deployment)         |
| ------------------- | ----------------------------------- | ---------------------------------- |
| **Bảo mật code**    | Obfuscated (vẫn có thể deobfuscate) | 100% ẩn (khách không bao giờ thấy) |
| **Khách nhận code** | ✅ Có                               | ❌ Không                           |
| **Thời gian setup** | 5-10 phút                           | 2 phút                             |
| **Update code**     | Phải gửi package mới                | Tự động                            |
| **Revoke access**   | Khó (đã có code)                    | Dễ (undeploy ngay)                 |
| **Debug**           | Khó                                 | Dễ (có quyền truy cập)             |
| **Risk**            | Khách có thể copy/share             | Không thể copy                     |

---

## 📋 Phase 1: Setup (Làm 1 lần)

### 1.1. Setup Google Cloud Service Account

```bash
# Làm theo hướng dẫn
cat docs/setup-service-account.md

# Lưu service account email
# Ví dụ: hrm-deploy@your-project.iam.gserviceaccount.com
```

### 1.2. Deploy License Server

```bash
# Deploy như bình thường
ssh user@your-server.com
cd app-script
npm install
cd license-server && npm install

# Start server
pm2 start index.js --name hrm-license-server
pm2 save
```

### 1.3. Test Deployment API

```bash
# Test endpoint
curl http://localhost:3000/api/deploy -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "sheetsUrl": "test",
    "licenseKey": "test",
    "customerEmail": "test@test.com"
  }'

# Should return error (expected)
```

---

## 🛒 Phase 2: Khi có khách hàng mới

### 2.1. Thu thập thông tin

```
Thông tin cần:
✓ Tên công ty
✓ Email liên hệ
✓ Domain email (@company.com)
✓ Số lượng user
✓ Thời hạn sử dụng
```

### 2.2. Generate license key

```bash
# Tạo license (KHÔNG CẦN build code nữa!)
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "maxActivations": 5,
    "expirationDays": 365
  }'

# Lưu license key: A1B2-C3D4-E5F6-G7H8
```

**Lưu ý:** Không cần `codeChecksum` nữa vì code không giao cho khách!

### 2.3. Gửi hướng dẫn cho khách hàng

**Email template:**

```
Subject: [HRM System] Hướng dẫn cài đặt

Kính gửi ABC Company,

Cảm ơn bạn đã tin tưởng sử dụng HRM System!

🔑 THÔNG TIN LICENSE
License Key: A1B2-C3D4-E5F6-G7H8
Hạn sử dụng: 08/04/2027
Domain: abc.com

📋 HƯỚNG DẪN CÀI ĐẶT (3 BƯỚC - 2 PHÚT)

BƯỚC 1: Tạo Google Sheets
   1. Truy cập: https://sheets.google.com
   2. Tạo Sheets mới
   3. Đặt tên: "HRM System - ABC Company"

BƯỚC 2: Chia sẻ Sheets
   1. Click "Share"
   2. Nhập email: hrm-deploy@your-project.iam.gserviceaccount.com
   3. Chọn quyền: "Editor"
   4. Bỏ tick "Notify people"
   5. Click "Share"

BƯỚC 3: Gửi thông tin cho chúng tôi
   Reply email này với:
   - Sheets URL: [URL Sheets bạn vừa tạo]

   Chúng tôi sẽ cài đặt trong 1-2 phút!

📚 HƯỚNG DẪN CHI TIẾT
Đính kèm: customer-guide-api-deployment.pdf

🆘 HỖ TRỢ
Email: support@yourcompany.com
Hotline: 1900-xxxx-xxx

Trân trọng,
Your Company Team
```

### 2.4. Khi nhận Sheets URL từ khách hàng

```bash
# Deploy code vào Sheets của khách
curl -X POST https://license.yourcompany.com/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "sheetsUrl": "https://docs.google.com/spreadsheets/d/1ABC...xyz/edit",
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerEmail": "contact@abc.com"
  }'

# Response:
# {
#   "success": true,
#   "message": "Code deployed successfully",
#   "sheetsId": "1ABC...xyz",
#   "scriptId": "AKfyc..."
# }
```

### 2.5. Gửi email xác nhận

```
Subject: [HRM System] Cài đặt hoàn tất ✅

Kính gửi ABC Company,

Hệ thống HRM đã được cài đặt thành công vào Sheets của bạn!

✅ HOÀN TẤT
- Sheets ID: 1ABC...xyz
- Cài đặt lúc: 08/04/2026 15:40

📋 BƯỚC TIẾP THEO
1. Refresh trang Sheets của bạn (F5)
2. Menu "HRM System" sẽ xuất hiện
3. Click "HRM System" → "Khởi tạo hệ thống"
4. Hệ thống tự động tạo sheets + data mẫu
5. Bắt đầu sử dụng!

💡 LƯU Ý
- Dữ liệu của bạn lưu 100% trên Sheets của bạn
- Chúng tôi chỉ cài đặt code, không truy cập dữ liệu
- Bạn có thể thu hồi quyền truy cập bất cứ lúc nào

🆘 HỖ TRỢ
Nếu có vấn đề, liên hệ ngay:
Email: support@yourcompany.com
Hotline: 1900-xxxx-xxx

Chúc bạn sử dụng hiệu quả!

Trân trọng,
Your Company Team
```

---

## 🔍 Phase 3: Hỗ trợ khách hàng

### 3.1. Khách hàng không thấy menu

```bash
# Check deployment status
curl https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password

# Kiểm tra:
# - deployedSheetsId có đúng không?
# - deployedScriptId có tồn tại không?

# Nếu cần, deploy lại
curl -X POST https://license.yourcompany.com/api/deploy \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### 3.2. Khách hàng muốn chuyển sang Sheets khác

```bash
# 1. Undeploy khỏi Sheets cũ
curl -X POST https://license.yourcompany.com/api/undeploy \
  -H "Content-Type: application/json" \
  -d '{"licenseKey": "A1B2-C3D4-E5F6-G7H8"}'

# 2. Deploy vào Sheets mới
curl -X POST https://license.yourcompany.com/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "sheetsUrl": "https://docs.google.com/spreadsheets/d/NEW_SHEETS_ID/edit",
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerEmail": "contact@abc.com"
  }'
```

### 3.3. Revoke access (khách không trả tiền, vi phạm)

```bash
# Undeploy code
curl -X POST https://license.yourcompany.com/api/undeploy \
  -H "Content-Type: application/json" \
  -d '{"licenseKey": "A1B2-C3D4-E5F6-G7H8"}'

# Revoke license
curl -X DELETE https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password

# → Menu "HRM System" biến mất ngay lập tức
```

---

## 🔄 Phase 4: Update code

### 4.1. Khi có update/fix bug

```bash
# 1. Update code trong src/
nano src/Code.js

# 2. KHÔNG CẦN build/obfuscate

# 3. Redeploy cho TẤT CẢ khách hàng
curl https://license.yourcompany.com/api/admin/licenses?status=active \
  -u admin:password | jq -r '.licenses.data[] | select(.deployedSheetsId != null)' | while read license; do

  LICENSE_KEY=$(echo $license | jq -r '.licenseKey')
  SHEETS_URL="https://docs.google.com/spreadsheets/d/$(echo $license | jq -r '.deployedSheetsId')/edit"
  EMAIL=$(echo $license | jq -r '.customerEmail')

  # Undeploy old
  curl -X POST https://license.yourcompany.com/api/undeploy \
    -H "Content-Type: application/json" \
    -d "{\"licenseKey\": \"$LICENSE_KEY\"}"

  # Deploy new
  curl -X POST https://license.yourcompany.com/api/deploy \
    -H "Content-Type: application/json" \
    -d "{
      \"sheetsUrl\": \"$SHEETS_URL\",
      \"licenseKey\": \"$LICENSE_KEY\",
      \"customerEmail\": \"$EMAIL\"
    }"

  echo "Updated: $LICENSE_KEY"
done

# 4. Gửi email thông báo update (optional)
```

---

## 📊 Phase 5: Monitoring

### 5.1. Daily checks

```bash
# Check deployments
curl https://license.yourcompany.com/api/admin/stats \
  -u admin:password | jq '.stats'

# Backup database
mongodump --db hrm_licenses --out /backup/$(date +%Y%m%d)
```

### 5.2. Track deployments

```bash
# List all deployed licenses
curl https://license.yourcompany.com/api/admin/licenses \
  -u admin:password | jq '.licenses.data[] | select(.deployedSheetsId != null)'
```

---

## 🎯 Quick Reference

### Các lệnh thường dùng

```bash
# Generate license (không cần checksum)
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -d '{"customerName":"X","customerEmail":"x@x.com","expirationDays":365}'

# Deploy code
curl -X POST https://license.yourcompany.com/api/deploy \
  -d '{"sheetsUrl":"URL","licenseKey":"KEY","customerEmail":"EMAIL"}'

# Undeploy code
curl -X POST https://license.yourcompany.com/api/undeploy \
  -d '{"licenseKey":"KEY"}'

# Check deployment
curl https://license.yourcompany.com/api/admin/license/KEY -u admin:password

# Revoke license
curl -X DELETE https://license.yourcompany.com/api/admin/license/KEY -u admin:password
```

---

## ✅ Checklist cho mỗi khách hàng

- [ ] Thu thập thông tin
- [ ] Generate license key
- [ ] Gửi email hướng dẫn cho khách
- [ ] Nhận Sheets URL từ khách
- [ ] Deploy code qua API
- [ ] Gửi email xác nhận
- [ ] Lưu vào tracking sheet
- [ ] Follow up sau 1 ngày
- [ ] Set reminder trước 30 ngày hết hạn

---

## 💡 Tips

1. **Không cần build code nữa** - Deploy trực tiếp từ src/
2. **Update dễ dàng** - Redeploy cho tất cả khách trong vài phút
3. **Revoke ngay lập tức** - Undeploy → Menu biến mất
4. **Debug dễ** - Có quyền truy cập script project
5. **Tracking tốt** - Biết chính xác ai đang dùng
6. **Bảo mật tuyệt đối** - Khách không bao giờ thấy code
