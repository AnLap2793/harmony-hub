# Phase 01 - Thiết lập Nền tảng (Foundation)

## Context Links
- [Plan cha (plan.md)](./plan.md)
- [Hệ thống thiết kế (DESIGN.md)](../../DESIGN.md)
- [Tài liệu API Google Apps Script](https://developers.google.com/apps-script/api)

## Overview
- **Ngày**: 2026-04-09
- **Mô tả**: Thiết lập cơ sở hạ tầng, cơ sở dữ liệu và hệ thống xác thực.
- **Ưu tiên**: Cao (Critical)
- **Trạng thái thực hiện**: Pending
- **Trạng thái review**: Chưa bắt đầu

## Key Insights
- Sử dụng Next.js 15 (App Router) giúp tận dụng tối đa Server Components cho hiệu năng.
- Prisma ORM cung cấp type-safety tuyệt vời cho PostgreSQL.
- Better Auth với RBAC là chìa khóa để quản lý phân quyền (Admin vs User).
- Thiết kế Database cần linh hoạt để hỗ trợ các phiên bản khác nhau của App Script.

## Requirements
- Setup Next.js 15, TypeScript, Tailwind CSS.
- Cấu hình Prisma kết nối PostgreSQL.
- Triển khai Better Auth với Google Provider và Plugin RBAC.
- Tích hợp shadcn/ui và cấu hình CSS theo HVN Style (Colors, Typography).

## Architecture
- **Web App**: Next.js 15 (App Router).
- **ORM**: Prisma.
- **Database**: PostgreSQL (Scripts, Users, Roles, Permissions, Groups).
- **Auth**: Better Auth (Google OAuth).
- **Styling**: Tailwind CSS + shadcn/ui + CSS Variables (HVN Style).

## Related Code Files
- `src/app/layout.tsx` (Global layout)
- `src/lib/prisma.ts` (Database client)
- `src/lib/auth.ts` (Better Auth config)
- `prisma/schema.prisma` (Database models)
- `src/styles/globals.css` (HVN theme)

## Implementation Steps
1.  Khởi tạo project Next.js 15 và cài đặt dependencies.
2.  Cấu hình `.env` (Database URL, Google Client ID, Auth Secret).
3.  Định nghĩa `schema.prisma` (Script, User, ServiceLayer models).
4.  Cài đặt Better Auth và Plugin RBAC, thiết lập middleware bảo vệ route.
5.  Thiết lập theme HVN Style trong `tailwind.config.ts` và `globals.css`.
6.  Tạo Base Layout với Header (90px) và Container (1230px).

## Todo List
- [ ] Khởi tạo repository và project cấu trúc.
- [ ] Cài đặt Prisma và đẩy schema lên DB.
- [ ] Cấu hình Better Auth (Login/Session).
- [ ] Triển khai Header component theo HVN Style.
- [ ] Kiểm tra khả năng kết nối DB và Auth flow.

## Success Criteria
- [ ] Project khởi chạy không lỗi.
- [ ] Login bằng Google thành công.
- [ ] Prisma generate types thành công.
- [ ] UI hiển thị đúng màu sắc và typography của HVN.

## Risk Assessment
- **Rủi ro**: Quá trình đăng ký Google OAuth App có thể bị chậm trễ hoặc bị từ chối.
- **Khắc phục**: Đăng ký ngay từ đầu Phase 1 với đầy đủ thông tin doanh nghiệp.

## Security Considerations
- Sử dụng HTTPS cho tất cả giao dịch.
- Lưu trữ `secrets` an toàn trong Environment Variables (không commit lên Git).
- RBAC phải chặn truy cập vào Admin Dashboard ngay từ mức server.

## Next Steps
- Tiếp tục sang Phase 02 để xây dựng Dashboard quản trị.
