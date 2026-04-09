# 📦 HƯỚNG DẪN ĐÓNG GÓI CHO KHÁCH HÀNG

## Quy trình đóng gói và giao hàng

### Bước 1: Build distribution package

```bash
# Chạy build script
npm run obfuscate

# Lưu lại checksum được in ra
# Ví dụ: Checksum: a1b2c3d4e5f6789...
```

### Bước 2: Generate license key

```bash
# Tạo license cho khách hàng
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "maxActivations": 1,
    "expirationDays": 365,
    "codeChecksum": "a1b2c3d4e5f6789..."
  }'

# Lưu lại license key từ response
# Ví dụ: A1B2-C3D4-E5F6-G7H8
```

### Bước 3: Tạo customer package

```bash
# Tạo folder cho khách hàng
mkdir customer-package-ABC-Company
cd customer-package-ABC-Company

# Copy obfuscated code
cp -r ../dist/* .

# Tạo README cho khách hàng
cat > README.txt << 'EOF'
╔════════════════════════════════════════════════════════════╗
║           HRM SYSTEM - HƯỚNG DẪN CÀI ĐẶT                  ║
╚════════════════════════════════════════════════════════════╝

🎉 Chào mừng bạn đến với HRM System!

📋 THÔNG TIN LICENSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
License Key: A1B2-C3D4-E5F6-G7H8
Khách hàng: ABC Company
Email: contact@abc.com
Hạn sử dụng: 08/04/2027
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 CÀI ĐẶT NHANH (3 BƯỚC)

BƯỚC 1: Upload code lên Google Apps Script
   1. Truy cập: https://script.google.com
   2. Click "New Project"
   3. Upload tất cả files từ folder này
   4. Save (Ctrl+S)

BƯỚC 2: Tạo Google Sheets
   1. Tạo Sheets mới: https://sheets.google.com
   2. Đặt tên: "HRM System - ABC Company"
   3. Refresh trang (F5)

BƯỚC 3: Kích hoạt
   1. Menu "HRM System" → "Activate License"
   2. Nhập license key ở trên
   3. Click "Activate"
   4. Menu "HRM System" → "Khởi tạo hệ thống"
   5. Xong! Bắt đầu sử dụng

📚 TÀI LIỆU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hướng dẫn chi tiết: Xem file CUSTOMER-GUIDE.pdf
• Video hướng dẫn: [Link YouTube]
• FAQ: [Link website]

🆘 HỖ TRỢ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: support@yourcompany.com
Hotline: 1900-xxxx-xxx
Giờ làm việc: 8:00 - 17:30 (T2-T6)

⚠️ LƯU Ý QUAN TRỌNG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• License key chỉ dùng cho domain: abc.com
• Không chia sẻ license key cho người khác
• Dữ liệu lưu trên Google Sheets của bạn (an toàn)
• Liên hệ support nếu cần hỗ trợ

© 2026 Your Company - All rights reserved
EOF

# Copy customer guide
cp ../docs/customer-guide.md CUSTOMER-GUIDE.md

# Tạo file version info
cat > VERSION.txt << EOF
HRM System v1.0.0
Build date: $(date +"%Y-%m-%d %H:%M:%S")
Checksum: a1b2c3d4e5f6789...
EOF
```

### Bước 4: Zip package

```bash
# Quay lại thư mục gốc
cd ..

# Zip package
zip -r "HRM-System-ABC-Company-$(date +%Y%m%d).zip" customer-package-ABC-Company/

# Kết quả: HRM-System-ABC-Company-20260408.zip
```

### Bước 5: Gửi cho khách hàng

**Email template:**

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

📋 HƯỚNG DẪN CÀI ĐẶT
1. Giải nén file zip
2. Đọc file README.txt
3. Làm theo 3 bước đơn giản
4. Hoàn tất trong 5 phút!

📚 TÀI LIỆU HỖ TRỢ
• Hướng dẫn chi tiết: CUSTOMER-GUIDE.md (trong zip)
• Video hướng dẫn: [Link YouTube]
• FAQ: [Link website]

🆘 HỖ TRỢ KỸ THUẬT
Nếu gặp khó khăn trong quá trình cài đặt:
• Email: support@yourcompany.com
• Hotline: 1900-xxxx-xxx
• Giờ làm việc: 8:00 - 17:30 (T2-T6)

Chúng tôi sẵn sàng hỗ trợ bạn!

Trân trọng,
Your Company Team
```

---

## 📁 Cấu trúc package giao cho khách

```
HRM-System-ABC-Company-20260408.zip
├── Code.js                      # Obfuscated main code
├── core/
│   ├── LicenseValidator.js     # Obfuscated license validator
│   └── TemplateSetup.js        # Obfuscated template setup
├── appsscript.json             # Apps Script config
├── README.txt                  # Hướng dẫn cài đặt nhanh
├── CUSTOMER-GUIDE.md           # Hướng dẫn chi tiết
└── VERSION.txt                 # Version info
```

---

## ✅ Checklist trước khi giao

- [ ] Build code với `npm run obfuscate`
- [ ] Lưu checksum
- [ ] Generate license key với checksum đúng
- [ ] Verify license key hoạt động (test trên server)
- [ ] Tạo customer package
- [ ] Update README.txt với license key đúng
- [ ] Update email template với thông tin khách hàng
- [ ] Zip package
- [ ] Test: Giải nén và kiểm tra files
- [ ] Gửi email cho khách hàng
- [ ] Lưu trữ thông tin license vào database/spreadsheet

---

## 🔄 Quy trình hỗ trợ sau bán

### Khi khách hàng gặp vấn đề

1. **Không activate được**
   ```bash
   # Check license status
   curl https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
     -u admin:password
   
   # Kiểm tra: status, domain, expiration
   ```

2. **Muốn chuyển sang máy khác**
   ```bash
   # Option 1: Tăng maxActivations
   curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
     -u admin:password \
     -d '{"maxActivations": 2}'
   
   # Option 2: Hướng dẫn deactivate trên máy cũ
   ```

3. **License sắp hết hạn**
   ```bash
   # Extend thêm 1 năm
   curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
     -u admin:password \
     -d '{"expiresAt": "2028-04-08T00:00:00.000Z"}'
   ```

4. **Muốn thêm domain**
   ```bash
   # Thêm domain mới
   curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
     -u admin:password \
     -d '{"allowedDomains": ["abc.com", "abc.vn"]}'
   ```

---

## 📊 Tracking khách hàng

### Tạo spreadsheet theo dõi

```
Customer Tracking Sheet:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
| Ngày bán | Khách hàng | Email | License Key | Domain | Hạn | Status |
|----------|------------|-------|-------------|--------|-----|--------|
| 08/04/26 | ABC Co     | ...   | A1B2-...    | abc.com| 1yr | Active |
```

### Monitor usage

```bash
# Xem activities của license
curl https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password | jq '.activities'

# Check last activation
# Check usage frequency
```

---

## 💡 Tips

### Tự động hóa packaging

Tạo script `package-for-customer.sh`:

```bash
#!/bin/bash

CUSTOMER_NAME=$1
CUSTOMER_EMAIL=$2
CUSTOMER_DOMAIN=$3
LICENSE_KEY=$4

if [ -z "$CUSTOMER_NAME" ]; then
  echo "Usage: ./package-for-customer.sh 'ABC Company' 'contact@abc.com' 'abc.com' 'A1B2-C3D4-E5F6-G7H8'"
  exit 1
fi

# Build
npm run obfuscate

# Create package
mkdir -p "customer-package-$CUSTOMER_NAME"
cp -r dist/* "customer-package-$CUSTOMER_NAME/"

# Generate README with license key
# ... (code ở trên)

# Zip
zip -r "HRM-System-$CUSTOMER_NAME-$(date +%Y%m%d).zip" "customer-package-$CUSTOMER_NAME/"

echo "✅ Package ready: HRM-System-$CUSTOMER_NAME-$(date +%Y%m%d).zip"
```

Sử dụng:
```bash
./package-for-customer.sh "ABC Company" "contact@abc.com" "abc.com" "A1B2-C3D4-E5F6-G7H8"
```
