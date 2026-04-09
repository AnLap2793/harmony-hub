# Deployment Guide

## Tổng quan

Hướng dẫn deploy hệ thống HRM App Script với License Server từ development đến production.

## Prerequisites

### Development Environment
- Node.js 18+ và npm
- Git
- Google Account
- Clasp CLI: `npm install -g @google/clasp`
- Text editor (VS Code recommended)

### Production Environment
- VPS/Cloud server (DigitalOcean, AWS, GCP, etc.)
- Domain name với SSL certificate
- MongoDB hoặc PostgreSQL database
- PM2 hoặc Docker cho process management

## Part 1: Setup License Server

### 1.1. Clone và Install Dependencies

```bash
# Clone repository
git clone <your-repo>
cd app-script

# Install dependencies
npm install

# Install license server dependencies
cd license-server
npm install
cd ..
```

### 1.2. Configure Environment

```bash
# Copy .env.example
cp .env.example .env

# Edit .env
nano .env
```

Cấu hình các biến quan trọng:

```bash
# Server
PORT=3000
NODE_ENV=production
API_BASE_URL=https://license.yourcompany.com

# Database (chọn MongoDB hoặc PostgreSQL)
MONGODB_URI=mongodb://localhost:27017/hrm-licenses

# JWT Secret (generate strong secret)
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

# Encryption
ENCRYPTION_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
ENCRYPTION_IV=$(node -e "console.log(require('crypto').randomBytes(16).toString('hex'))")

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>

# CORS
ALLOWED_ORIGINS=https://script.google.com,https://script.googleusercontent.com
```

### 1.3. Setup Database

#### Option A: MongoDB

```bash
# Install MongoDB
sudo apt update
sudo apt install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database
mongo
> use hrm_licenses
> db.createCollection("licenses")
> db.createCollection("activations")
> db.createCollection("activities")
> exit
```

#### Option B: PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres psql
postgres=# CREATE DATABASE hrm_licenses;
postgres=# CREATE USER hrm_admin WITH PASSWORD 'your-password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE hrm_licenses TO hrm_admin;
postgres=# \q

# Update .env
DATABASE_URL=postgresql://hrm_admin:your-password@localhost:5432/hrm_licenses
```

### 1.4. Test License Server Locally

```bash
# Start server
npm run license-server

# Test health endpoint
curl http://localhost:3000/health

# Expected: {"status":"ok","timestamp":"2026-04-08T15:13:08.244Z"}
```

### 1.5. Deploy License Server to Production

#### Option A: PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start server with PM2
cd license-server
pm2 start index.js --name hrm-license-server

# Save PM2 config
pm2 save

# Setup auto-start on reboot
pm2 startup
```

#### Option B: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

```bash
# Build và run
docker build -t hrm-license-server .
docker run -d -p 3000:3000 --env-file .env hrm-license-server
```

### 1.6. Setup Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/license.yourcompany.com

server {
    listen 80;
    server_name license.yourcompany.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/license.yourcompany.com /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 1.7. Setup SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d license.yourcompany.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 1.8. Verify Production Server

```bash
# Test HTTPS endpoint
curl https://license.yourcompany.com/health

# Test admin API
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:your-password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test Customer",
    "customerEmail": "test@example.com",
    "expirationDays": 365
  }'
```

## Part 2: Build và Deploy Apps Script

### 2.1. Update API URL

```javascript
// src/core/LicenseValidator.js
// Thay đổi apiUrl thành production URL
constructor() {
  this.apiUrl = 'https://license.yourcompany.com/api';
  // ...
}
```

### 2.2. Build Distribution Package

```bash
# Obfuscate code
npm run obfuscate

# Output sẽ ở dist/ folder
# Lưu lại checksum được in ra
```

Output example:
```
🔒 Starting obfuscation...
Source: C:\Users\NCPC\Documents\Company\app-script\src
Output: C:\Users\NCPC\Documents\Company\app-script\dist

Obfuscating: src\Code.js
✓ Saved to: dist\Code.js
Obfuscating: src\core\LicenseValidator.js
✓ Saved to: dist\core\LicenseValidator.js

✓ Obfuscation complete! 2 files processed.

🔐 Injecting checksums...
✓ Checksum injected
✓ Copied appsscript.json
✓ Created README.txt

✅ Distribution package ready!

Checksum: a1b2c3d4e5f6789...
```

### 2.3. Generate License Key

```bash
# Tạo license cho khách hàng với checksum từ bước trước
curl -X POST https://license.yourcompany.com/api/admin/generate \
  -u admin:your-password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "allowedEmails": [],
    "maxActivations": 1,
    "expirationDays": 365,
    "codeChecksum": "a1b2c3d4e5f6789..."
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

### 2.4. Prepare Customer Package

```bash
# Tạo folder cho khách hàng
mkdir customer-package
cp -r dist/* customer-package/

# Update README.txt với license key
echo "License Key: A1B2-C3D4-E5F6-G7H8" >> customer-package/README.txt

# Zip package
zip -r ABC-Company-HRM.zip customer-package/
```

### 2.5. Customer Installation Steps

Gửi cho khách hàng file `ABC-Company-HRM.zip` và hướng dẫn:

```
1. Giải nén file ABC-Company-HRM.zip

2. Truy cập https://script.google.com

3. Tạo New Project

4. Upload tất cả files từ folder customer-package:
   - Code.js
   - core/LicenseValidator.js
   - appsscript.json

5. Save project (Ctrl+S)

6. Tạo Google Sheets mới

7. Refresh trang → Menu "HRM System" sẽ xuất hiện

8. Click "HRM System" → "Activate License"

9. Nhập license key: A1B2-C3D4-E5F6-G7H8

10. Click Activate → Thành công!
```

## Part 3: Monitoring & Maintenance

### 3.1. Monitor License Server

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs hrm-license-server

# Monitor resources
pm2 monit
```

### 3.2. Database Backup

```bash
# MongoDB backup
mongodump --db hrm_licenses --out /backup/$(date +%Y%m%d)

# PostgreSQL backup
pg_dump hrm_licenses > /backup/hrm_licenses_$(date +%Y%m%d).sql

# Setup cron job cho daily backup
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

### 3.3. Monitor License Usage

```bash
# Get statistics
curl https://license.yourcompany.com/api/admin/stats \
  -u admin:your-password

# List all licenses
curl https://license.yourcompany.com/api/admin/licenses \
  -u admin:your-password

# Get specific license details
curl https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:your-password
```

### 3.4. Handle License Issues

#### Revoke License
```bash
curl -X DELETE https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:your-password
```

#### Extend Expiration
```bash
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:your-password \
  -H "Content-Type: application/json" \
  -d '{
    "expiresAt": "2028-04-08T00:00:00.000Z"
  }'
```

#### Increase Max Activations
```bash
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:your-password \
  -H "Content-Type: application/json" \
  -d '{
    "maxActivations": 5
  }'
```

## Part 4: Updates & Versioning

### 4.1. Release New Version

```bash
# 1. Update code trong src/
# 2. Build new distribution
npm run obfuscate

# 3. New checksum sẽ khác
# Checksum: b2c3d4e5f6g7890...

# 4. Update existing licenses với new checksum
curl -X PUT https://license.yourcompany.com/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:your-password \
  -H "Content-Type: application/json" \
  -d '{
    "codeChecksum": "b2c3d4e5f6g7890..."
  }'

# 5. Gửi updated package cho khách hàng
```

### 4.2. Backward Compatibility

```javascript
// Trong code, check version
const VERSION = '1.1.0';

function checkVersion() {
  const storedVersion = PropertiesService.getUserProperties()
    .getProperty('hrm_version');
  
  if (storedVersion !== VERSION) {
    // Run migration if needed
    migrateData(storedVersion, VERSION);
    
    // Update version
    PropertiesService.getUserProperties()
      .setProperty('hrm_version', VERSION);
  }
}
```

## Part 5: Troubleshooting

### License Server không start
```bash
# Check logs
pm2 logs hrm-license-server --lines 100

# Check port
sudo netstat -tulpn | grep 3000

# Restart
pm2 restart hrm-license-server
```

### Customer không activate được
```bash
# Check license exists
curl https://license.yourcompany.com/api/admin/license/XXXX-XXXX-XXXX-XXXX \
  -u admin:your-password

# Check server logs
pm2 logs hrm-license-server | grep "validate"

# Check CORS settings
# Ensure ALLOWED_ORIGINS includes script.google.com
```

### Tampering detected
```bash
# Customer có thể đã modify code
# Check activities log
curl https://license.yourcompany.com/api/admin/license/XXXX-XXXX-XXXX-XXXX \
  -u admin:your-password

# Nếu confirmed tampering → revoke license
curl -X DELETE https://license.yourcompany.com/api/admin/license/XXXX-XXXX-XXXX-XXXX \
  -u admin:your-password
```

## Security Checklist

- [ ] License server chạy HTTPS only
- [ ] Strong JWT_SECRET (64+ chars)
- [ ] Strong ADMIN_PASSWORD
- [ ] Database credentials trong .env (không commit)
- [ ] Firewall rules (chỉ allow port 80, 443, 22)
- [ ] Daily database backups
- [ ] Monitor logs cho suspicious activities
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] SSL certificate auto-renewal
- [ ] PM2 auto-restart on crash
- [ ] Server monitoring (uptime, CPU, memory)
