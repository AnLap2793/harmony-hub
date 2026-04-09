# Ví dụ API Deployment - Từng bước chi tiết

## ⚠️ VẤN ĐỀ: Khách có thể xem code

Khi bạn deploy code vào Sheets của khách qua API:

```
Khách hàng → Mở Sheets
          → Extensions → Apps Script
          → Thấy code của bạn! ❌
          → Copy code
          → Share cho người khác
```

---

## 🔒 GIẢI PHÁP

### **Cách 1: Google Workspace Add-on** ⭐ (Recommended)

Deploy như Add-on thay vì container-bound script.

#### Cách hoạt động

```
Bạn                                    Khách hàng
  ↓                                         ↓
Publish Add-on lên                   Cài Add-on từ
Workspace Marketplace                Marketplace
  ↓                                         ↓
Code chạy từ Add-on                  Sử dụng Add-on
(Không bind vào Sheets)              trên Sheets
  ↓                                         ↓
Khách KHÔNG thể vào                  KHÔNG thấy code
Apps Script editor                   KHÔNG thể copy
```

#### Ưu điểm

- ✅ **Code hoàn toàn ẩn** - Khách không thể vào Apps Script editor
- ✅ **Publish 1 lần** - Tất cả khách cài từ Marketplace
- ✅ **Update tự động** - Fix bug → Tất cả khách có version mới
- ✅ **Bảo mật tuyệt đối** - Không thể copy/decompile

#### Nhược điểm

- ⚠️ **Phải qua review Google** (1-2 tuần)
- ⚠️ **Cần domain riêng** (không dùng @gmail.com)
- ⚠️ **Phải public** (hoặc unlisted cho domain cụ thể)

#### Quy trình

1. **Develop Add-on**
   ```bash
   # Tạo Apps Script project
   # Develop code như bình thường
   # Test trên Sheets
   ```

2. **Publish lên Marketplace**
   ```
   1. Apps Script Editor → Deploy → New deployment
   2. Type: Add-on
   3. Fill form: Name, Description, Screenshots
   4. Submit for review
   5. Đợi 1-2 tuần
   ```

3. **Khách cài đặt**
   ```
   1. Mở Sheets
   2. Extensions → Add-ons → Get add-ons
   3. Search "HRM System"
   4. Install
   5. Nhập license key
   6. Sử dụng
   ```

---

### **Cách 2: Obfuscated Container-bound Script**

Deploy code đã obfuscate vào Sheets.

#### Cách hoạt động

```
Bạn                                    Khách hàng
  ↓                                         ↓
Obfuscate code                       Share Sheets với
(Làm khó đọc)                        service account
  ↓                                         ↓
Deploy qua API                       Có thể vào Apps Script
vào Sheets của khách                 editor ⚠️
  ↓                                         ↓
Code đã obfuscate                    Nhưng chỉ thấy code
+ License validation                 obfuscated (khó đọc)
```

#### Ưu điểm

- ✅ **Setup nhanh** - Không cần review Google
- ✅ **Linh hoạt** - Deploy riêng cho từng khách
- ✅ **Kiểm soát** - Undeploy ngay khi cần

#### Nhược điểm

- ⚠️ **Khách vẫn thấy code** (dù obfuscated)
- ⚠️ **Có thể deobfuscate** (nếu có kỹ năng)
- ⚠️ **Có thể copy** (dù khó dùng)

#### Quy trình

1. **Obfuscate code trước khi deploy**
   ```bash
   # Build obfuscated code
   npm run obfuscate
   
   # Code trong dist/ đã được:
   # - Rename variables: a, b, c, _0x1a2b
   # - Encrypt strings
   # - Flatten control flow
   ```

2. **Deploy qua API**
   ```bash
   curl -X POST .../api/deploy -d '{
     "sheetsUrl": "...",
     "licenseKey": "...",
     "customerEmail": "..."
   }'
   
   # API sẽ deploy code từ dist/ (đã obfuscate)
   ```

3. **Khách có thể vào Apps Script nhưng...**
   ```javascript
   // Họ chỉ thấy code như này:
   var _0x1a2b=['push','apply','shift'];
   (function(_0x3c4d,_0x5e6f){
     var _0x7g8h=function(_0x9i0j){
       while(--_0x9i0j){
         _0x3c4d['push'](_0x3c4d['shift']());
       }
     };
     _0x7g8h(++_0x5e6f);
   }(_0x1a2b,0x123));
   
   // Rất khó đọc và hiểu!
   ```

4. **License validation ngăn chặn sử dụng trái phép**
   ```javascript
   // Dù copy được code, nhưng:
   // - Cần license key hợp lệ
   // - License key gắn với domain
   // - Server validate mỗi lần dùng
   // → Copy sang Sheets khác = không chạy
   ```

---

### **Cách 3: Hybrid Model** (API Backend + UI Frontend)

Core logic chạy trên server, chỉ deploy UI code vào Sheets.

#### Cách hoạt động

```
Khách hàng Sheets                    Your Server
  ↓                                       ↓
UI Code (đơn giản)              Core Business Logic
- Menu                          - Tính lương
- Dialogs                       - Validate data
- Display data                  - Generate reports
  ↓                                       ↓
  ← ← ← ← API Calls ← ← ← ← ← ← ← ← ← ← ←
```

#### Ưu điểm

- ✅ **Business logic ẩn hoàn toàn** - Chạy trên server
- ✅ **Khách chỉ thấy UI code** - Không quan trọng
- ✅ **Update dễ** - Chỉ cần update server

#### Nhược điểm

- ⚠️ **Phức tạp hơn** - Cần maintain API server
- ⚠️ **Phụ thuộc internet** - Không offline được
- ⚠️ **Chi phí server** - Phải host API

#### Quy trình

1. **Core logic trên server**
   ```javascript
   // API Server (Node.js)
   app.post('/api/calculate-salary', (req, res) => {
     const { employeeId, workDays } = req.body;
     
     // Business logic ở đây (ẩn)
     const salary = calculateSalary(employeeId, workDays);
     
     res.json({ salary });
   });
   ```

2. **UI code trên Sheets**
   ```javascript
   // Apps Script (khách thấy được)
   function calculateSalary() {
     const employeeId = 'NV001';
     const workDays = 22;
     
     // Gọi API
     const response = UrlFetchApp.fetch('https://api.yourcompany.com/calculate-salary', {
       method: 'POST',
       payload: JSON.stringify({ employeeId, workDays })
     });
     
     const result = JSON.parse(response.getContentText());
     
     // Hiển thị kết quả
     SpreadsheetApp.getUi().alert('Lương: ' + result.salary);
   }
   ```

3. **Khách thấy UI code nhưng không có business logic**

---

## 📊 So sánh các cách

| | Add-on | Obfuscated | Hybrid |
|---|---|---|---|
| **Bảo mật code** | ✅✅✅ Tuyệt đối | ⚠️ Trung bình | ✅✅ Cao |
| **Khách thấy code** | ❌ Không | ✅ Có (obfuscated) | ✅ Có (UI only) |
| **Setup** | ⚠️ Phức tạp | ✅ Đơn giản | ⚠️ Trung bình |
| **Review Google** | ✅ Cần | ❌ Không | ❌ Không |
| **Update** | ✅ Tự động | ⚠️ Manual | ✅ Dễ |
| **Chi phí** | ✅ Thấp | ✅ Thấp | ⚠️ Cao (server) |
| **Phù hợp** | Sản phẩm lớn | Sản phẩm nhỏ | Enterprise |

---

## 💡 Khuyến nghị

### Nếu bạn có thời gian và muốn bảo mật tối đa:
→ **Chọn Cách 1: Add-on**

### Nếu bạn muốn nhanh và chấp nhận rủi ro:
→ **Chọn Cách 2: Obfuscated** + License validation mạnh

### Nếu bạn có budget và cần bảo mật cao:
→ **Chọn Cách 3: Hybrid**

---

## 🎯 Kết luận

**Không có cách nào 100% ngăn khách xem code** khi deploy vào Sheets của họ, NGOẠI TRỪ:

1. **Add-on Model** - Code không bind vào Sheets
2. **Hybrid Model** - Core logic trên server

**Cách tốt nhất:** Kết hợp nhiều lớp bảo vệ:
- Obfuscation (làm khó đọc)
- License validation (ngăn sử dụng trái phép)
- Legal protection (hợp đồng, bản quyền)
- Watermarking (nhận diện code bị leak)

---

## 📚 Tài liệu tham khảo

- [Google Workspace Add-ons](https://developers.google.com/workspace/add-ons)
- [Apps Script Publishing](https://developers.google.com/apps-script/guides/publishing)
- [Code Obfuscation Best Practices](../security-implementation.md)
