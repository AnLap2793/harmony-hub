# Quick Start Guide

## Dành cho Developer

### 1. Setup môi trường development

```bash
# Clone project
git clone <your-repo>
cd app-script

# Install dependencies
npm install

# Setup license server
cd license-server
npm install
cd ..

# Copy environment file
cp .env.example .env

# Edit .env với thông tin của bạn
nano .env
```

### 2. Start license server locally

```bash
# Start server
npm run license-server

# Server chạy tại http://localhost:3000
# Test: curl http://localhost:3000/health
```

### 3. Develop Apps Script code

```bash
# Edit code trong src/
# - src/Code.js (main entry)
# - src/core/LicenseValidator.js (license logic)
# - src/services/ (HRM features)
```

### 4. Test locally

```bash
# Generate test license
curl -X POST http://localhost:3000/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "expirationDays": 30
  }'

# Copy license key từ response
```

### 5. Build distribution

```bash
# Obfuscate code
npm run obfuscate

# Output: dist/ folder
# Checksum sẽ được in ra console
```

## Dành cho Admin

### 1. Deploy license server

```bash
# SSH vào server
ssh user@your-server.com

# Clone và setup
git clone <your-repo>
cd app-script
npm install

# Setup .env với production values
cp .env.example .env
nano .env

# Start với PM2
cd license-server
pm2 start index.js --name hrm-license-server
pm2 save
```

### 2. Generate license cho customer

```bash
# Build distribution package
npm run obfuscate
# Lưu checksum

# Generate license
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "maxActivations": 1,
    "expirationDays": 365,
    "codeChecksum": "<checksum-from-build>"
  }'
```

### 3. Package và gửi cho customer

```bash
# Tạo customer package
mkdir customer-package
cp -r dist/* customer-package/

# Update README với license key
echo "License Key: XXXX-XXXX-XXXX-XXXX" >> customer-package/README.txt

# Zip
zip -r Customer-HRM-Package.zip customer-package/

# Gửi file zip cho customer
```

## Dành cho Customer

### 1. Nhận package từ vendor

- File: `Customer-HRM-Package.zip`
- License Key: `XXXX-XXXX-XXXX-XXXX`

### 2. Upload lên Google Apps Script

```
1. Giải nén Customer-HRM-Package.zip
2. Truy cập https://script.google.com
3. New Project
4. Upload tất cả files từ folder
5. Save (Ctrl+S)
```

### 3. Tạo Google Sheets và activate

```
1. Tạo Google Sheets mới
2. Refresh → Menu "HRM System" xuất hiện
3. Click "HRM System" → "Activate License"
4. Nhập license key
5. Click Activate
6. Thành công! Bắt đầu sử dụng
```

## Troubleshooting

### License server không start
```bash
pm2 logs hrm-license-server
# Check error messages
```

### Customer không activate được
```bash
# Check license
curl https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password

# Check status, expiration, restrictions
```

### Code bị lỗi sau khi obfuscate
```bash
# Test code trước khi obfuscate
# Ensure no syntax errors
# Check appsscript.json config
```

## Next Steps

- Đọc [System Architecture](./system-architecture.md) để hiểu kiến trúc
- Đọc [Security Implementation](./security-implementation.md) để hiểu bảo mật
- Đọc [Deployment Guide](./deployment-guide.md) để deploy production
- Đọc [License Management](./license-management.md) để quản lý licenses

## Support

- Issues: Create issue trên GitHub
- Email: support@yourcompany.com
- Documentation: ./docs/
