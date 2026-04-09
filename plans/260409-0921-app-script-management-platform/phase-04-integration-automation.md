# Phase 04 - Tích hợp & Tự động hóa (Integration & Automation)

## Context Links
- [Plan cha (plan.md)](./plan.md)
- [Hệ thống thiết kế (DESIGN.md)](../../DESIGN.md)
- [Phase 01 - Foundation](./phase-01-foundation.md)
- [Phase 02 - Admin Dashboard](./phase-02-admin-dashboard.md)
- [Phase 03 - User Portal](./phase-03-user-portal.md)

## Overview
- **Ngày**: 2026-04-09
- **Mô tả**: Tích hợp Google Apps Script API, cơ chế thực thi script và quy trình tự động hóa.
- **Ưu tiên**: Cao (High)
- **Trạng thái thực hiện**: Pending
- **Trạng thái review**: Chưa bắt đầu

## Key Insights
- Phải đảm bảo an toàn khi gọi Google Apps Script API (OAuth 2.0).
- Hệ thống cần cơ chế ghi log (Audit logs) cho mỗi lượt thực thi script.
- Quy trình duyệt quyền cần tự động gửi thông báo (Email/Webhooks) cho Admin/User.

## Requirements
- Tích hợp Google Apps Script API (Execution API) để gọi script từ server.
- Hệ thống Callbacks/Webhooks xử lý kết quả trả về từ GAS.
- Quy trình duyệt quyền tự động (Auto-approval) cho một số vai trò/nhóm.
- Ghi log chi tiết (Timestamp, User ID, Script ID, Parameters, Response, Status).
- Gửi thông báo qua Email (Google Workspace) khi yêu cầu quyền được phê duyệt.

## Architecture
- **API Engine**: Server-side proxy để gọi GAS API.
- **Webhook Handler**: Next.js API Routes (`/api/webhooks/gas`).
- **Notification Service**: Resend (hoặc Google Mail API) cho email.
- **Audit Logs Table**: Database table cho log thực thi và thay đổi.

## Related Code Files
- `src/lib/google-gas.ts` (Google GAS API client)
- `src/app/api/gas/execute/route.ts` (Execution endpoint)
- `src/app/api/webhooks/gas/route.ts` (Webhook receiver)
- `src/lib/notifications.ts` (Email/Notification logic)
- `src/app/admin/audit-logs/page.tsx` (Audit logs UI)

## Implementation Steps
1.  Thiết lập Google Cloud Service Account hoặc OAuth Client cho Server-to-Server communication.
2.  Viết thư viện `google-gas.ts` thực hiện các yêu cầu GET/POST tới GAS API.
3.  Xây dựng API thực thi script có kiểm tra quyền (Permission Guard) trước khi gọi GAS.
4.  Triển khai hệ thống Webhook để nhận tín hiệu hoàn tất từ GAS (nếu chạy không đồng bộ).
5.  Xây dựng hệ thống Audit Log ghi lại mọi hoạt động trong DB.
6.  Thiết lập Email Notification cho quy trình duyệt quyền.
7.  Xây dựng UI quản lý Audit Logs cho Admin Dashboard.

## Todo List
- [ ] Cấu hình Google Cloud Project (GAS API enabled).
- [ ] Viết hàm gọi GAS API mẫu.
- [ ] Triển khai hệ thống Audit Log.
- [ ] Cài đặt dịch vụ gửi Email thông báo.
- [ ] Kiểm tra tích hợp End-to-End từ User Portal tới thực thi GAS.

## Success Criteria
- [ ] Gọi thành công GAS script từ ứng dụng Next.js.
- [ ] Log được ghi đầy đủ trong Database.
- [ ] Email thông báo gửi đúng địa chỉ khi duyệt quyền.
- [ ] User nhận được kết quả/thông báo sau khi thực thi thành công.

## Risk Assessment
- **Rủi ro**: Quá nhiều yêu cầu thực thi script gây quá tải cho GAS API (Quota limits).
- **Khắc phục**: Triển khai hàng đợi (Queue) và Giới hạn tốc độ (Rate limiting).

## Security Considerations
- Sử dụng Access Tokens ngắn hạn (Short-lived) và Refresh Tokens bảo mật.
- Kiểm tra chữ ký (Signature) hoặc Key bí mật cho Webhooks đến từ Google.
- Masking các dữ liệu nhạy cảm trong log.

## Next Steps
- Tiếp tục Phase 05 để hoàn thiện (Polish) UI/UX và bảo mật.
