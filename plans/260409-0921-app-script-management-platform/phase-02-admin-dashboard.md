# Phase 02 - Quản trị & Danh mục (Admin Dashboard)

## Context Links
- [Plan cha (plan.md)](./plan.md)
- [Hệ thống thiết kế (DESIGN.md)](../../DESIGN.md)
- [Phase 01 - Foundation](./phase-01-foundation.md)

## Overview
- **Ngày**: 2026-04-09
- **Mô tả**: Xây dựng UI cho Admin để quản lý danh mục App Script, RBAC và cài đặt hệ thống.
- **Ưu tiên**: Cao (High)
- **Trạng thái thực hiện**: Pending
- **Trạng thái review**: Chưa bắt đầu

## Key Insights
- Dashboard dành cho Admin cần tối giản, trực quan và mạnh mẽ.
- Quy trình đăng ký Script cần tự động hóa việc lấy thông tin từ Google Apps Script API.
- Phân quyền (RBAC) cần được quản lý theo dạng Group hoặc Department cho quy mô lớn.

## Requirements
- UI Dashboard: Sidebar, Header, Content Area.
- Quản lý App Script: CRUD (Tên, Script ID, Deployment ID, Mô tả, Loại, Trạng thái).
- Quản lý RBAC: Tạo Roles, gán Permissions cho từng Script/Service.
- Quản lý User: Danh sách User, gán Role/Group.
- Cấu hình Google Cloud Project (Credentials).

## Architecture
- **Admin Layout**: Dashboard pattern (Sidebar navigation).
- **Forms**: React Hook Form + Zod validation.
- **Tables**: TanStack Table (Data grid, Pagination, Sorting, Search).
- **State Management**: React Query (TanStack Query) cho API caching/sync.

## Related Code Files
- `src/app/admin/layout.tsx` (Dashboard layout)
- `src/app/admin/scripts/page.tsx` (Scripts management)
- `src/app/admin/rbac/page.tsx` (Roles/Permissions)
- `src/app/admin/users/page.tsx` (User list)
- `src/components/admin/ScriptForm.tsx` (CRUD form)

## Implementation Steps
1.  Thiết lập Admin Layout với Sidebar và Breadcrumbs.
2.  Xây dựng trang quản lý danh sách Script với data grid.
3.  Tạo form đăng ký Script hỗ trợ lấy thông tin từ GAS API (Script ID).
4.  Triển khai giao diện quản lý Role và Gán quyền (Permission Matrix).
5.  Xây dựng trang quản lý User và đồng bộ quyền từ Better Auth.
6.  Thêm thông báo (Toasts) và Trạng thái loading.

## Todo List
- [ ] Thiết kế Dashboard layout.
- [ ] Hoàn thành CRUD Script basic.
- [ ] Triển khai giao diện gán quyền cho Role.
- [ ] Tích hợp React Query cho các API calls.
- [ ] Kiểm tra phân quyền truy cập trang `/admin`.

## Success Criteria
- [ ] Admin có thể tạo mới, cập nhật Script.
- [ ] Gán quyền thành công cho User/Role.
- [ ] Dashboard hiển thị thống kê cơ bản (Tổng Script, Tổng User).
- [ ] Chặn được user không có quyền Admin vào dashboard.

## Risk Assessment
- **Rủi ro**: Khó khăn khi đồng bộ User Group từ Google Workspace nếu cần.
- **Khắc phục**: Ưu tiên RBAC nội bộ trong Database trước, đồng bộ bên ngoài là Option.

## Security Considerations
- Validate tất cả input từ phía server (Server Actions/API Routes).
- Bảo vệ các API routes của Admin bằng Better Auth Middleware.
- Log lại các hành động thay đổi quan trọng (Audit Logs).

## Next Steps
- Tiếp tục Phase 03 để xây dựng User Portal (Giao diện cho người dùng cuối).
