# Kế hoạch Xây dựng Hệ thống Quản lý App Script Nội bộ

## 1. Tổng quan
Dự án xây dựng nền tảng quản lý tập trung các Google Apps Script (GAS) nội bộ, hỗ trợ đăng ký, phân quyền (RBAC) và cung cấp giao diện dịch vụ (Service Portal) cho người dùng cuối theo phong cách HVN.

## 2. Các giai đoạn thực hiện (Phases)

| Giai đoạn | Tên Giai đoạn | Trạng thái | Liên kết chi tiết |
| :--- | :--- | :--- | :--- |
| **Phase 01** | Thiết lập Nền tảng (Foundation) | Pending | [phase-01-foundation.md](./phase-01-foundation.md) |
| **Phase 02** | Quản trị & Danh mục (Admin Dashboard) | Pending | [phase-02-admin-dashboard.md](./phase-02-admin-dashboard.md) |
| **Phase 03** | Cổng Dịch vụ Người dùng (User Portal) | Pending | [phase-03-user-portal.md](./phase-03-user-portal.md) |
| **Phase 04** | Tích hợp & Tự động hóa (Integration) | Pending | [phase-04-integration-automation.md](./phase-04-integration-automation.md) |
| **Phase 05** | Hoàn thiện & Bảo mật (Polish & Security) | Pending | [phase-05-polish-security.md](./phase-05-polish-security.md) |

## 3. Tech Stack Chính
- **Framework**: Next.js 15 (App Router), TypeScript.
- **UI/UX**: Tailwind CSS, shadcn/ui, HVN Style (Inter, Red/Orange theme).
- **Database**: PostgreSQL (Supabase/Neon), Prisma ORM.
- **Auth**: Better Auth (Google OAuth, RBAC).
- **API**: Google Apps Script API, Webhooks.

## 4. Mục tiêu then chốt
- Quản lý tập trung > 50 App Script.
- Phân quyền theo phòng ban/vị trí.
- Giao diện thân thiện, không mang tính kỹ thuật cho người dùng cuối.
- Khả năng mở rộng (Scalability) và Bảo mật (Security).

## 5. Tài liệu liên quan
- [DESIGN.md](../../DESIGN.md) - Hệ thống ngôn ngữ thiết kế HVN Style.
- [PDR.md](../../docs/project-overview-pdr.md) - (Nếu có).

---
*Ngày cập nhật: 2026-04-09*
