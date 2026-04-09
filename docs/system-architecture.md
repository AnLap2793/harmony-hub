# System Architecture - HRM App Script

## Tổng quan kiến trúc

Hệ thống HRM App Script được thiết kế với kiến trúc phân tán, bao gồm 2 thành phần chính:

1. **Client Side**: Google Apps Script (chạy trên Google's infrastructure)
2. **Server Side**: License Server API (chạy trên server của bạn)

```
┌─────────────────────────────────────────────────────────────────┐
│                        Customer Environment                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Google Sheets + Apps Script (Obfuscated Code)             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  UI Layer                                            │  │ │
│  │  │  - Menu system                                       │  │ │
│  │  │  - Dialogs & Sidebars                               │  │ │
│  │  │  - HTML templates                                    │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  Business Logic Layer                                │  │ │
│  │  │  - Employee management                               │  │ │
│  │  │  - Attendance tracking                               │  │ │
│  │  │  - Leave management                                  │  │ │
│  │  │  - Payroll calculation                               │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  License Validation Layer                            │  │ │
│  │  │  - Token storage                                     │  │ │
│  │  │  - Periodic validation                               │  │ │
│  │  │  - Offline grace period                              │  │ │
│  │  │  - Anti-tampering checks                             │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              ↓ HTTPS                             │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Your Infrastructure                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  License Server API (Node.js + Express)                    │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  API Endpoints                                       │  │ │
│  │  │  - POST /api/validate    (activate license)         │  │ │
│  │  │  - POST /api/check       (verify token)             │  │ │
│  │  │  - POST /api/deactivate  (release license)          │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  Admin API                                           │  │ │
│  │  │  - POST /api/admin/generate  (create license)       │  │ │
│  │  │  - GET  /api/admin/licenses  (list all)             │  │ │
│  │  │  - GET  /api/admin/license/:key (details)           │  │ │
│  │  │  - PUT  /api/admin/license/:key (update)            │  │ │
│  │  │  - DELETE /api/admin/license/:key (revoke)          │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Database (MongoDB / PostgreSQL)                           │ │
│  │  - Licenses table                                          │ │
│  │  - Activations table                                       │ │
│  │  - Activities log                                          │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. License Activation Flow

```
User → Enter License Key
  ↓
Apps Script → POST /api/validate
  ↓
License Server → Validate key
  ↓
  ├─ Check status (active/expired/revoked)
  ├─ Check domain restrictions
  ├─ Check email restrictions
  ├─ Check max activations
  └─ Generate JWT token
  ↓
Apps Script ← Return token
  ↓
Store token in PropertiesService
  ↓
Initialize HRM menu
```

### 2. License Check Flow (mỗi lần khởi động)

```
User → Open Google Sheets
  ↓
Apps Script → onOpen() trigger
  ↓
Read token from PropertiesService
  ↓
Apps Script → POST /api/check (with token)
  ↓
License Server → Verify JWT
  ↓
  ├─ Check expiration
  ├─ Check license status
  ├─ Verify code checksum
  └─ Update last checked time
  ↓
Apps Script ← Return validation result
  ↓
  ├─ Valid → Initialize full menu
  └─ Invalid → Show limited menu + activation dialog
```

### 3. Offline Grace Period

```
Apps Script → POST /api/check
  ↓
Connection failed
  ↓
Decode JWT locally
  ↓
Check token age < 24 hours
  ↓
  ├─ Within grace period → Allow usage (offline mode)
  └─ Expired → Require reactivation
```

## Security Layers

### Layer 1: Code Obfuscation
- Variable/function renaming
- String encryption
- Control flow flattening
- Dead code injection
- Self-defending code

### Layer 2: License Validation
- JWT-based authentication
- Server-side validation
- Domain/email restrictions
- Activation limits
- Expiration checks

### Layer 3: Anti-Tampering
- Code checksum verification
- Debugger detection
- Periodic server checks
- Activity logging

### Layer 4: Distribution Control
- Only distribute obfuscated code
- License key tied to customer
- Remote kill switch capability
- Usage analytics

## Database Schema

### Licenses Table
```javascript
{
  licenseKey: String,        // XXXX-XXXX-XXXX-XXXX
  customerName: String,
  customerEmail: String,
  allowedDomains: [String],  // ['company.com']
  allowedEmails: [String],   // ['user@company.com']
  maxActivations: Number,    // 1
  expiresAt: Date,          // null = lifetime
  codeChecksum: String,      // SHA256 hash
  status: String,            // active/expired/revoked
  createdAt: Date,
  updatedAt: Date
}
```

### Activations Table
```javascript
{
  licenseKey: String,
  email: String,
  domain: String,
  activatedAt: Date,
  lastCheckedAt: Date
}
```

### Activities Log
```javascript
{
  licenseKey: String,
  action: String,           // activate/check/deactivate/revoke/tampering_detected
  email: String,
  domain: String,
  timestamp: Date,
  details: Object
}
```

## Deployment Architecture

### Development Environment
```
src/
├── Code.js                 # Main entry point
├── core/
│   └── LicenseValidator.js # License validation logic
├── services/               # HRM business logic
└── ui/                     # UI components
```

### Production Distribution
```
dist/
├── Code.js                 # Obfuscated + checksum injected
├── core/
│   └── LicenseValidator.js # Obfuscated
├── services/               # Obfuscated
├── ui/                     # Obfuscated
├── appsscript.json        # Config
└── README.txt             # Installation guide
```

## Scalability Considerations

### License Server
- Horizontal scaling với load balancer
- Database replication
- Redis caching cho token validation
- Rate limiting per IP/license

### Apps Script
- Quota limits: 6 min/execution, 90 min/day
- UrlFetchApp: 20,000 calls/day
- PropertiesService: 500KB storage
- Trigger limits: 20 triggers/script

## Monitoring & Analytics

### Metrics to Track
- Total licenses issued
- Active licenses
- Activation attempts (success/failed)
- License checks per day
- Tampering detection events
- Expiring licenses (30 days)

### Alerts
- Multiple failed activation attempts
- Tampering detected
- Unusual usage patterns
- License expiring soon
- Server downtime

## Backup & Recovery

### License Server
- Daily database backups
- Transaction logs
- Disaster recovery plan
- Backup license server (failover)

### Customer Data
- Customer owns their Google Sheets data
- No sensitive data stored on license server
- License keys backed up securely
