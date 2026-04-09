# Setup Google Cloud Service Account

## Bước 1: Tạo Google Cloud Project

1. Truy cập: https://console.cloud.google.com
2. Click **"New Project"**
3. Đặt tên: `HRM-Deployment-Service`
4. Click **"Create"**

## Bước 2: Enable APIs

1. Vào **"APIs & Services"** → **"Library"**
2. Enable các APIs sau:
   - ✅ **Google Apps Script API**
   - ✅ **Google Sheets API**
   - ✅ **Google Drive API**

## Bước 3: Tạo Service Account

1. Vào **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Điền thông tin:
   - **Service account name**: `hrm-deploy`
   - **Service account ID**: `hrm-deploy` (auto-generated)
   - **Description**: `Service account for deploying HRM code to customer Sheets`
4. Click **"Create and Continue"**
5. **Grant this service account access to project**: Skip (không cần)
6. Click **"Done"**

## Bước 4: Tạo Key cho Service Account

1. Click vào service account vừa tạo: `hrm-deploy@your-project.iam.gserviceaccount.com`
2. Vào tab **"Keys"**
3. Click **"Add Key"** → **"Create new key"**
4. Chọn **"JSON"**
5. Click **"Create"**
6. File JSON sẽ được download: `your-project-xxxxx.json`

## Bước 5: Setup trong Project

```bash
# Tạo thư mục config
mkdir -p license-server/config

# Copy service account key vào
cp ~/Downloads/your-project-xxxxx.json license-server/config/service-account.json

# Bảo mật file
chmod 600 license-server/config/service-account.json

# Add vào .gitignore (đã có sẵn)
echo "license-server/config/service-account.json" >> .gitignore
```

## Bước 6: Lấy Service Account Email

```bash
# Xem email của service account
cat license-server/config/service-account.json | grep client_email

# Output: "client_email": "hrm-deploy@your-project.iam.gserviceaccount.com"
```

**Lưu email này lại!** Khách hàng sẽ cần share Sheets với email này.

## Bước 7: Test Service Account

```bash
# Install googleapis
cd license-server
npm install googleapis

# Test deployment API
npm start

# Trong terminal khác, test
curl http://localhost:3000/health
```

## Bước 8: Update .env

```bash
# Thêm vào .env
SERVICE_ACCOUNT_EMAIL=hrm-deploy@your-project.iam.gserviceaccount.com
SERVICE_ACCOUNT_FILE=./config/service-account.json
```

## ✅ Hoàn thành!

Service account đã sẵn sàng để deploy code vào Sheets của khách hàng.

## 🔒 Security Notes

- ✅ File `service-account.json` chứa private key → **KHÔNG commit vào git**
- ✅ Service account chỉ có quyền trên Sheets được share
- ✅ Không có quyền truy cập Drive/Gmail/Calendar của khách
- ✅ Khách có thể revoke access bất cứ lúc nào (unshare Sheets)

## 📋 Checklist

- [ ] Tạo Google Cloud Project
- [ ] Enable 3 APIs (Apps Script, Sheets, Drive)
- [ ] Tạo Service Account
- [ ] Download JSON key
- [ ] Copy vào `license-server/config/service-account.json`
- [ ] Lưu service account email
- [ ] Update .env
- [ ] Test API
