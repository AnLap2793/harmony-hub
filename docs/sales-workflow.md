# 🎯 WORKFLOW: Bán HRM System cho Khách hàng

## Quy trình hoàn chỉnh từ A-Z

### 📋 Phase 1: Chuẩn bị (Làm 1 lần)

#### 1.1. Setup License Server

```bash
# Deploy license server lên production
ssh user@your-server.com

# Clone repo
git clone <your-repo>
cd app-script

# Install dependencies
npm install
cd license-server && npm install && cd ..

# Setup .env
cp .env.example .env
nano .env  # Cập nhật production values

# Start server với PM2
cd license-server
pm2 start index.js --name hrm-license-server
pm2 save

# Setup Nginx + SSL
# (Xem deployment-guide.md)
```

#### 1.2. Test License Server

```bash
# Test health
curl https://license.yourcompany.com/health

# Test generate license
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test",
    "customerEmail": "test@test.com",
    "expirationDays": 30
  }'
```

---

### 🛒 Phase 2: Khi có khách hàng mới

#### 2.1. Thu thập thông tin

```
Thông tin cần có:
✓ Tên công ty
✓ Email liên hệ
✓ Domain email (@company.com)
✓ Số lượng user (để set maxActivations)
✓ Thời hạn sử dụng (1 năm, 2 năm, lifetime)
```

#### 2.2. Build distribution

```bash
# Update API URL trong code (nếu cần)
# src/core/LicenseValidator.js
# this.apiUrl = 'https://license.yourcompany.com/api';

# Build obfuscated code
npm run obfuscate

# Lưu lại checksum
# Output: Checksum: a1b2c3d4e5f6789...
```

#### 2.3. Generate license key

```bash
# Tạo license với checksum từ bước trên
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "maxActivations": 5,
    "expirationDays": 365,
    "codeChecksum": "a1b2c3d4e5f6789..."
  }'

# Lưu license key: A1B2-C3D4-E5F6-G7H8
```

#### 2.4. Tạo customer package

```bash
# Sử dụng script tự động
bash build-tools/package-for-customer.sh \
  "ABC Company" \
  "contact@abc.com" \
  "abc.com" \
  "A1B2-C3D4-E5F6-G7H8"

# Output: customer-packages/HRM-System-ABC-Company-20260408.zip
```

#### 2.5. Gửi email cho khách hàng

```
Subject: [HRM System] Package cài đặt và License Key

Kính gửi ABC Company,

Cảm ơn bạn đã tin tưởng sử dụng HRM System!

📦 PACKAGE CÀI ĐẶT
Đính kèm: HRM-System-ABC-Company-20260408.zip

🔑 THÔNG TIN LICENSE
License Key: A1B2-C3D4-E5F6-G7H8
Hạn sử dụng: 08/04/2027
Domain: abc.com
Số user: 5

📋 HƯỚNG DẪN CÀI ĐẶT
1. Giải nén file zip
2. Đọc file README.txt
3. Làm theo 3 bước đơn giản
4. Hoàn tất trong 5 phút!

🎥 VIDEO HƯỚNG DẪN
[Link YouTube nếu có]

🆘 HỖ TRỢ
Email: support@yourcompany.com
Hotline: 1900-xxxx-xxx

Chúng tôi sẵn sàng hỗ trợ bạn!

Trân trọng,
Your Company Team
```

#### 2.6. Tracking

```bash
# Lưu thông tin vào spreadsheet hoặc database
# Columns: Ngày bán | Khách hàng | Email | License | Domain | Hạn | Status
```

---

### 🔍 Phase 3: Hỗ trợ khách hàng

#### 3.1. Khách hàng không activate được

```bash
# Check license status
curl https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password

# Kiểm tra:
# - status = "active"?
# - domain đúng không?
# - expiresAt chưa hết hạn?

# Check server logs
pm2 logs hrm-license-server | grep "A1B2-C3D4-E5F6-G7H8"
```

#### 3.2. Khách hàng muốn thêm user

```bash
# Tăng maxActivations
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"maxActivations": 10}'
```

#### 3.3. Khách hàng muốn chuyển máy

```bash
# Option 1: Hướng dẫn deactivate
# Menu "HRM System" → "Settings" → "Deactivate License"
# Sau đó activate lại trên máy mới

# Option 2: Tăng maxActivations tạm thời
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -d '{"maxActivations": 2}'
```

#### 3.4. Gia hạn license

```bash
# Extend thêm 1 năm
NEW_EXPIRY=$(date -d "+1 year" -Iseconds)

curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d "{\"expiresAt\": \"$NEW_EXPIRY\"}"
```

---

### 🔄 Phase 4: Update phiên bản mới

#### 4.1. Khi có update code

```bash
# 1. Update code trong src/
# 2. Build new version
npm run obfuscate

# 3. Lưu checksum mới
# Checksum: b2c3d4e5f6g7890...

# 4. Update tất cả active licenses
curl https://license.yourcompany.com/api/admin/licenses?status=active \
  -u admin:password | jq -r '.licenses.data[].licenseKey' | while read key; do
  
  curl -X PUT https://license.yourcompany.com/api/admin/license/$key \
    -u admin:password \
    -H "Content-Type: application/json" \
    -d '{"codeChecksum": "b2c3d4e5f6g7890..."}'
  
  echo "Updated: $key"
done

# 5. Gửi email thông báo update cho customers
# 6. Gửi package mới
```

---

### 📊 Phase 5: Monitoring & Maintenance

#### 5.1. Daily checks

```bash
# Check server status
pm2 status

# Check expiring licenses (30 days)
curl https://license.yourcompany.com/api/admin/stats \
  -u admin:password | jq '.stats.expiringSoon'

# Backup database
mongodump --db hrm_licenses --out /backup/$(date +%Y%m%d)
```

#### 5.2. Weekly reports

```bash
# Get statistics
curl https://license.yourcompany.com/api/admin/stats \
  -u admin:password

# Output:
# - Total licenses
# - Active licenses
# - Expired licenses
# - Expiring soon
```

#### 5.3. Monthly tasks

```bash
# Review customer feedback
# Update documentation
# Plan new features
# Send newsletter to customers
```

---

## 🎯 Quick Reference

### Các lệnh thường dùng

```bash
# Build distribution
npm run obfuscate

# Generate license
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"customerName":"X","customerEmail":"x@x.com","expirationDays":365}'

# Package for customer
bash build-tools/package-for-customer.sh "Company" "email" "domain" "LICENSE-KEY"

# Check license
curl https://license.yourcompany.com/api/admin/license/LICENSE-KEY -u admin:password

# Update license
curl -X PUT https://license.yourcompany.com/api/admin/license/LICENSE-KEY \
  -u admin:password -d '{"maxActivations":10}'

# Revoke license
curl -X DELETE https://license.yourcompany.com/api/admin/license/LICENSE-KEY \
  -u admin:password

# View stats
curl https://license.yourcompany.com/api/admin/stats -u admin:password
```

---

## ✅ Checklist cho mỗi khách hàng

- [ ] Thu thập thông tin khách hàng
- [ ] Build distribution (npm run obfuscate)
- [ ] Generate license key với checksum đúng
- [ ] Test license key hoạt động
- [ ] Tạo customer package
- [ ] Gửi email + package cho khách hàng
- [ ] Lưu thông tin vào tracking sheet
- [ ] Follow up sau 1 ngày (khách đã cài chưa?)
- [ ] Follow up sau 1 tuần (có vấn đề gì không?)
- [ ] Set reminder trước 30 ngày hết hạn

---

## 💡 Tips

1. **Tự động hóa**: Sử dụng scripts để giảm manual work
2. **Template email**: Chuẩn bị sẵn email templates
3. **Video hướng dẫn**: Quay video 1 lần, gửi cho tất cả khách
4. **FAQ document**: Tổng hợp câu hỏi thường gặp
5. **Customer portal**: Xây dựng portal để khách tự quản lý license
6. **Monitoring**: Setup alerts cho license expiring, server down
7. **Backup**: Daily backup database, weekly backup code
8. **Documentation**: Luôn update docs khi có thay đổi
