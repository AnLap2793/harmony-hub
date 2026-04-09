# Security Implementation Guide

## Tổng quan bảo mật

Hệ thống sử dụng nhiều lớp bảo mật để bảo vệ mã nguồn và kiểm soát phân phối:

1. **Code Obfuscation** - Làm khó đọc mã nguồn
2. **License Validation** - Xác thực quyền sử dụng
3. **Anti-Tampering** - Phát hiện chỉnh sửa code
4. **Distribution Control** - Kiểm soát phân phối

## 1. Code Obfuscation

### Kỹ thuật sử dụng

#### a) Variable/Function Renaming
```javascript
// Before
function calculateSalary(employee, workDays) {
  return employee.dailyRate * workDays;
}

// After obfuscation
function _0x3a4b(_0x1c2d, _0x4e5f) {
  return _0x1c2d['\x64\x61\x69\x6c\x79\x52\x61\x74\x65'] * _0x4e5f;
}
```

#### b) String Encryption
```javascript
// Before
const message = "License activated successfully";

// After obfuscation
const _0x2b3c = ['\x4c\x69\x63\x65\x6e\x73\x65', '\x61\x63\x74\x69\x76\x61\x74\x65\x64'];
const message = _0x2b3c[0] + ' ' + _0x2b3c[1];
```

#### c) Control Flow Flattening
```javascript
// Before
if (valid) {
  activateLicense();
} else {
  showError();
}

// After obfuscation
var _0x1a2b = '0|1|2|3'.split('|'), _0x3c4d = 0;
while (!![]) {
  switch (_0x1a2b[_0x3c4d++]) {
    case '0': if (!valid) continue;
    case '1': activateLicense(); continue;
    case '2': if (valid) break;
    case '3': showError(); continue;
  }
  break;
}
```

#### d) Dead Code Injection
```javascript
// Inject code không bao giờ chạy để gây nhiễu
function _0x5e6f() {
  var _0x7g8h = Math.random();
  if (_0x7g8h > 1.5) { // Never true
    console.log('This never runs');
  }
}
```

#### e) Self-Defending Code
```javascript
// Phát hiện debugger
setInterval(function() {
  (function() {
    return debugger;
  })();
}, 4000);
```

### Cấu hình Obfuscation

```javascript
{
  compact: true,                          // Minify code
  controlFlowFlattening: true,            // Flatten control flow
  controlFlowFlatteningThreshold: 0.75,   // 75% functions affected
  deadCodeInjection: true,                // Inject dead code
  deadCodeInjectionThreshold: 0.4,        // 40% dead code
  debugProtection: true,                  // Anti-debugger
  debugProtectionInterval: 4000,          // Check every 4s
  disableConsoleOutput: true,             // Disable console.log
  identifierNamesGenerator: 'hexadecimal', // _0x1a2b style names
  stringArray: true,                      // Extract strings
  stringArrayEncoding: ['base64'],        // Encode strings
  stringArrayThreshold: 0.75,             // 75% strings encoded
  selfDefending: true,                    // Detect tampering
  transformObjectKeys: true               // Transform object keys
}
```

### Build Script

```bash
# Obfuscate toàn bộ src/ → dist/
npm run obfuscate

# Hoặc
node build-tools/obfuscator.js
```

## 2. License Validation

### JWT Token Structure

```javascript
{
  licenseKey: "XXXX-XXXX-XXXX-XXXX",
  email: "user@company.com",
  domain: "company.com",
  iat: 1712588400000,        // Issued at
  exp: 1715180400000         // Expires (30 days)
}
```

### Validation Flow

```javascript
// 1. Client gửi license key
POST /api/validate
{
  "licenseKey": "XXXX-XXXX-XXXX-XXXX",
  "email": "user@company.com",
  "domain": "company.com"
}

// 2. Server validate và trả token
Response:
{
  "valid": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2026-05-08T00:00:00.000Z"
}

// 3. Client lưu token vào PropertiesService
PropertiesService.getUserProperties()
  .setProperty('hrm_license_token', token);

// 4. Mỗi lần khởi động, verify token
POST /api/check
Headers: { Authorization: "Bearer <token>" }
Body: { timestamp: 1712588400000, checksum: "abc123..." }
```

### Domain/Email Restrictions

```javascript
// Khi tạo license, chỉ định domain/email được phép
{
  licenseKey: "XXXX-XXXX-XXXX-XXXX",
  allowedDomains: ["company.com"],        // Chỉ @company.com
  allowedEmails: ["admin@company.com"],   // Hoặc email cụ thể
  maxActivations: 1                       // Chỉ 1 máy
}

// Server sẽ reject nếu không match
if (!allowedDomains.includes(userDomain)) {
  return { valid: false, message: "Invalid domain" };
}
```

### Offline Grace Period

```javascript
// Nếu không connect được server, cho phép offline 24h
function checkOfflineGracePeriod(token) {
  const payload = decodeJWT(token);
  const now = Date.now();
  const gracePeriod = 24 * 60 * 60 * 1000; // 24 hours
  
  if (now - payload.iat < gracePeriod) {
    return { valid: true, offline: true };
  }
  
  return { valid: false, reason: 'GRACE_PERIOD_EXPIRED' };
}
```

## 3. Anti-Tampering

### Code Checksum Verification

```javascript
// 1. Khi build, tính checksum của code
const checksum = crypto
  .createHash('sha256')
  .update(obfuscatedCode)
  .digest('hex');

// 2. Inject checksum vào code
const checksumCode = `
PropertiesService.getScriptProperties()
  .setProperty('hrm_code_checksum', '${checksum}');
`;

// 3. Lưu checksum vào license database
await db.createLicense({
  licenseKey: "XXXX-XXXX-XXXX-XXXX",
  codeChecksum: checksum,
  ...
});

// 4. Mỗi lần check, verify checksum
POST /api/check
{
  "checksum": "abc123..."  // From PropertiesService
}

// Server compare
if (checksum !== license.codeChecksum) {
  return { valid: false, reason: 'TAMPERING_DETECTED' };
}
```

### Debugger Detection

```javascript
// Inject vào obfuscated code
setInterval(function() {
  (function() {
    return debugger;
  })();
}, 4000);

// Nếu user mở DevTools, code sẽ pause liên tục
```

### Self-Defending Code

```javascript
// Code tự kiểm tra xem có bị modify không
(function() {
  var _0x1a2b = function() {
    var _0x3c4d = Function('return (function() ' +
      '{}.constructor("return this")( )' + ');');
    return _0x3c4d();
  };
  
  var _0x5e6f = _0x1a2b();
  
  if (!_0x5e6f.console) {
    _0x5e6f.console = (function(_0x7g8h) {
      var _0x9i0j = {};
      _0x9i0j.log = _0x7g8h;
      return _0x9i0j;
    })(function() {});
  }
})();
```

## 4. Distribution Control

### Build Process

```bash
# 1. Obfuscate code
npm run obfuscate

# 2. Generate checksum
node build-tools/obfuscator.js

# Output:
# ✓ Obfuscation complete!
# Checksum: a1b2c3d4e5f6...
```

### License Generation

```bash
# Tạo license cho khách hàng
curl -X POST http://localhost:3000/api/admin/generate \
  -u admin:password \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "ABC Company",
    "customerEmail": "contact@abc.com",
    "allowedDomains": ["abc.com"],
    "maxActivations": 1,
    "expirationDays": 365,
    "codeChecksum": "a1b2c3d4e5f6..."
  }'

# Response:
{
  "success": true,
  "license": {
    "licenseKey": "A1B2-C3D4-E5F6-G7H8",
    "customerName": "ABC Company",
    "expiresAt": "2027-04-08T00:00:00.000Z"
  }
}
```

### Distribution Package

```
dist/
├── Code.js                 # Obfuscated + checksum
├── core/
│   └── LicenseValidator.js # Obfuscated
├── appsscript.json
└── README.txt              # Installation guide + license key
```

### Customer Installation

```
1. Khách hàng nhận folder dist/ + license key
2. Upload lên Google Apps Script
3. Mở Google Sheets → Menu "HRM System" xuất hiện
4. Click "Activate License" → Nhập key
5. System validate với server → Kích hoạt
```

## 5. Remote Kill Switch

### Revoke License

```bash
# Admin có thể revoke license bất cứ lúc nào
curl -X DELETE http://localhost:3000/api/admin/license/A1B2-C3D4-E5F6-G7H8 \
  -u admin:password

# Lần check tiếp theo, license sẽ invalid
```

### Force Revalidation

```javascript
// Trong Apps Script, có thể force check ngay
function forceRevalidation() {
  const result = licenseValidator.checkLicense();
  
  if (!result.valid) {
    // License đã bị revoke
    SpreadsheetApp.getUi().alert('License revoked. Contact support.');
    createLimitedMenu();
  }
}
```

## 6. Security Best Practices

### Server Side
- ✅ Sử dụng HTTPS only
- ✅ Rate limiting (100 requests/15min per IP)
- ✅ JWT secret phải strong (64+ chars)
- ✅ Database credentials trong .env
- ✅ Backup database hàng ngày
- ✅ Monitor suspicious activities
- ✅ Log tất cả admin actions

### Client Side
- ✅ Không hardcode API URL (dùng PropertiesService)
- ✅ Validate input trước khi gửi server
- ✅ Handle network errors gracefully
- ✅ Clear sensitive data khi deactivate
- ✅ Không log sensitive info

### Distribution
- ✅ Chỉ phân phối obfuscated code
- ✅ Mỗi customer có unique license key
- ✅ Checksum phải match với license
- ✅ Không commit src/ vào git public
- ✅ .gitignore license keys

## 7. Limitations & Workarounds

### Limitations
- Code vẫn có thể deobfuscate (khó nhưng không impossible)
- User có thể bypass license check nếu có kiến thức sâu
- Apps Script code phải public để chạy

### Mitigations
- Obfuscation làm khó reverse engineering
- Server-side validation không thể bypass
- Checksum phát hiện modifications
- Activity logging để track abuse
- Legal protection (license agreement)

### Khi nào cần nâng cấp bảo mật
- Phát hiện nhiều tampering attempts
- License bị share trái phép
- Cần bảo mật cao hơn → Chuyển sang SaaS model
