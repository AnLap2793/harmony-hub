# License Management Guide

## Tổng quan

Hướng dẫn quản lý license keys cho HRM App Script system.

## License Lifecycle

```
Created → Active → [Expired/Revoked]
   ↓         ↓            ↓
Generate  Activate   Renew/Delete
```

## 1. Tạo License Mới

### 1.1. Basic License

```bash
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "expirationDays": 365
  }'
```

Response:
```json
{
  "success": true,
  "license": {
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "expiresAt": "2027-04-08T00:00:00.000Z",
    "maxActivations": 1
  }
}
```

### 1.2. License với Domain Restriction

```bash
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com", "abc.vn"],
    "expirationDays": 365
  }'
```

Chỉ user có email @abc.com hoặc @abc.vn mới activate được.

### 1.3. License với Email Restriction

```bash
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedEmails": ["admin@abc.com", "hr@abc.com"],
    "expirationDays": 365
  }'
```

Chỉ 2 email cụ thể này mới activate được.

### 1.4. License với Multiple Activations

```bash
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "maxActivations": 5,
    "expirationDays": 365
  }'
```

Cho phép activate trên 5 máy/user khác nhau.

### 1.5. Lifetime License

```bash
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "expirationDays": null
  }'
```

License không bao giờ hết hạn.

### 1.6. License với Code Checksum

```bash
# Sau khi build distribution, lấy checksum
npm run obfuscate
# Output: Checksum: a1b2c3d4e5f6...

curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "expirationDays": 365,
    "codeChecksum": "a1b2c3d4e5f6..."
  }'
```

License chỉ hoạt động với version code có checksum này.

## 2. Quản Lý License

### 2.1. Xem Tất Cả Licenses

```bash
# List all
curl https://license.yourcompany.com/api/admin/licenses \
  -u admin:password

# Filter by status
curl "https://license.yourcompany.com/api/admin/licenses?status=active" \
  -u admin:password

# Search
curl "https://license.yourcompany.com/api/admin/licenses?search=ABC" \
  -u admin:password

# Pagination
curl "https://license.yourcompany.com/api/admin/licenses?page=2&limit=20" \
  -u admin:password
```

### 2.2. Xem Chi Tiết License

```bash
curl https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password
```

Response:
```json
{
  "success": true,
  "license": {
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "status": "active",
    "expiresAt": "2027-04-08T00:00:00.000Z",
    "maxActivations": 1,
    "createdAt": "2026-04-08T15:14:00.000Z"
  },
  "activations": [
    {
      "email": "admin@abc.com",
      "domain": "abc.com",
      "activatedAt": "2026-04-08T15:30:00.000Z",
      "lastCheckedAt": "2026-04-08T16:00:00.000Z"
    }
  ],
  "activities": [
    {
      "action": "check",
      "email": "admin@abc.com",
      "timestamp": "2026-04-08T16:00:00.000Z"
    },
    {
      "action": "activate",
      "email": "admin@abc.com",
      "timestamp": "2026-04-08T15:30:00.000Z"
    }
  ]
}
```

### 2.3. Update License

```bash
# Extend expiration
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "expiresAt": "2028-04-08T00:00:00.000Z"
  }'

# Increase max activations
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "maxActivations": 10
  }'

# Update allowed domains
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "allowedDomains": ["abc.com", "abc.vn", "abc.net"]
  }'

# Update checksum (khi release new version)
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "codeChecksum": "b2c3d4e5f6g7..."
  }'
```

### 2.4. Revoke License

```bash
curl -X DELETE https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password
```

License sẽ chuyển sang status "revoked" và không thể sử dụng nữa.

### 2.5. Thống Kê

```bash
curl https://license.yourcompany.com/api/admin/stats \
  -u admin:password
```

Response:
```json
{
  "success": true,
  "stats": {
    "totalLicenses": 150,
    "activeLicenses": 120,
    "expiredLicenses": 20,
    "revokedLicenses": 10,
    "totalActivations": 145,
    "expiringSoon": 15,
    "recentActivities": [...]
  }
}
```

## 3. Customer Self-Service

### 3.1. Activate License

Customer thực hiện trong Google Sheets:
1. Menu "HRM System" → "Activate License"
2. Nhập license key
3. System tự động validate với server

### 3.2. Deactivate License

Customer có thể deactivate để chuyển sang máy khác:
1. Menu "HRM System" → "Settings" → "Deactivate License"
2. Confirm
3. License được release, có thể activate lại ở máy khác

### 3.3. Check License Status

Customer có thể xem thông tin license:
1. Menu "HRM System" → "About"
2. Hiển thị:
   - License status (Active/Expired)
   - Expiration date
   - Activated email

## 4. Common Scenarios

### 4.1. Customer Muốn Chuyển Sang Máy Khác

**Option 1: Deactivate rồi activate lại**
```
1. Customer deactivate trên máy cũ
2. Activate trên máy mới với cùng license key
```

**Option 2: Admin tăng maxActivations**
```bash
curl -X PUT https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"maxActivations": 2}'
```

### 4.2. Customer Báo License Hết Hạn

```bash
# Check expiration
curl https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password

# Extend thêm 1 năm
curl -X PUT https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "expiresAt": "2028-04-08T00:00:00.000Z"
  }'
```

### 4.3. Customer Muốn Thêm User

```bash
# Option 1: Tăng maxActivations
curl -X PUT https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{"maxActivations": 5}'

# Option 2: Thêm email vào allowedEmails
curl -X PUT https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "allowedEmails": ["user1@abc.com", "user2@abc.com", "user3@abc.com"]
  }'
```

### 4.4. Customer Đổi Domain

```bash
# Update allowedDomains
curl -X PUT https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "allowedDomains": ["newdomain.com"]
  }'
```

### 4.5. Phát Hiện License Bị Share Trái Phép

```bash
# Check activations
curl https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password

# Nếu thấy activations từ nhiều domain khác nhau
# → Revoke license
curl -X DELETE https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password

# Contact customer để issue new license
```

### 4.6. Release New Version

```bash
# 1. Build new version
npm run obfuscate
# Checksum: new_checksum_here

# 2. Update tất cả active licenses
curl https://license.yourcompany.com/api/admin/licenses?status=active \
  -u admin:password | jq -r '.licenses.data[].licenseKey' | while read key; do
  curl -X PUT https://license.yourcompany.com/api/admin/license/$key \
    -u admin:password \
    -H "Content-Type: application/json" \
    -d '{"codeChecksum": "new_checksum_here"}'
done

# 3. Gửi updated package cho customers
```

## 5. Automation Scripts

### 5.1. Bulk License Generation

```bash
#!/bin/bash
# generate-bulk-licenses.sh

CUSTOMERS=(
  "Company A:contact@companya.com:companya.com"
  "Company B:contact@companyb.com:companyb.com"
  "Company C:contact@companyc.com:companyc.com"
)

for customer in "${CUSTOMERS[@]}"; do
  IFS=':' read -r name email domain <<< "$customer"
  
  curl -X POST https://license.yourcompany.com/api/admin/generate \
    -u admin:password \
    -H "Content-Type: application/json" \
    -d "{
      \"customerName\": \"$name\",
      \"customerEmail\": \"$email\",
      \"allowedDomains\": [\"$domain\"],
      \"expirationDays\": 365
    }"
  
  echo ""
done
```

### 5.2. Check Expiring Licenses

```bash
#!/bin/bash
# check-expiring.sh

# Get licenses expiring in 30 days
curl https://license.yourcompany.com/api/admin/stats \
  -u admin:password | jq '.stats.expiringSoon'

# Send email notification to customers
# (implement email logic here)
```

### 5.3. Daily Backup

```bash
#!/bin/bash
# backup-licenses.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backup/licenses"

# Export all licenses
curl https://license.yourcompany.com/api/admin/licenses?limit=1000 \
  -u admin:password > $BACKUP_DIR/licenses_$DATE.json

# Compress
gzip $BACKUP_DIR/licenses_$DATE.json

# Keep only last 30 days
find $BACKUP_DIR -name "licenses_*.json.gz" -mtime +30 -delete
```

## 6. Best Practices

### 6.1. License Key Format
- Sử dụng format: XXXX-XXXX-XXXX-XXXX
- Dễ đọc, dễ nhập
- Tránh ký tự dễ nhầm (0/O, 1/I/l)

### 6.2. Expiration Policy
- Standard: 1 năm
- Enterprise: 2-3 năm hoặc lifetime
- Trial: 30 ngày
- Gửi reminder trước 30 ngày hết hạn

### 6.3. Activation Limits
- Single user: maxActivations = 1
- Small team (5-10): maxActivations = 5
- Enterprise: maxActivations = unlimited hoặc domain restriction

### 6.4. Security
- Không share license keys publicly
- Log tất cả admin actions
- Monitor suspicious activities
- Revoke ngay khi phát hiện abuse

### 6.5. Customer Support
- Provide clear activation instructions
- Quick response cho license issues
- Easy deactivation process
- Transparent expiration policy

## 7. Troubleshooting

### License không activate được
```bash
# Check license exists và active
curl https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password

# Check domain/email restrictions
# Check maxActivations reached
# Check expiration date
```

### Customer báo "Tampering detected"
```bash
# Check checksum
curl https://license.yourcompany.com/api/admin/license/XXXX \
  -u admin:password | jq '.license.codeChecksum'

# Nếu customer dùng old version
# → Update checksum hoặc gửi new version
```

### License check quá chậm
```bash
# Check server response time
curl -w "@curl-format.txt" -o /dev/null -s \
  https://license.yourcompany.com/health

# Optimize database queries
# Add caching layer (Redis)
# Scale server if needed
```
