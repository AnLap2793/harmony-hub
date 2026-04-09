# Phase 05 - Hoàn thiện & Bảo mật (Polish & Security)

## Context Links
- [Plan cha (plan.md)](./plan.md)
- [Hệ thống thiết kế (DESIGN.md)](../../DESIGN.md)
- [Phase 01 - Foundation](./phase-01-foundation.md)
- [Phase 02 - Admin Dashboard](./phase-02-admin-dashboard.md)
- [Phase 03 - User Portal](./phase-03-user-portal.md)
- [Phase 04 - Integration](./phase-04-integration-automation.md)

## Overview
- **Ngày**: 2026-04-09
- **Mô tả**: Tối ưu UI/UX, bảo mật hóa hệ thống, thực hiện kiểm thử và chuẩn bị triển khai (Production Ready).
- **Ưu tiên**: Trung bình (Medium)
- **Trạng thái thực hiện**: Pending
- **Trạng thái review**: Chưa bắt đầu

## Key Insights
- Phải tạo hiệu ứng mượt mà (Fade In Up) theo phong cách HVN.
- Bảo mật hệ thống là tối quan trọng trước khi đưa vào sử dụng thực tế (Production).
- Hiệu năng (Performance) và Khả năng chịu tải cần được đánh giá trước khi Release.

## Requirements
- Tối ưu hóa UI: Animation `fadeInUp`, hover states, shadows, responsive layout.
- Bảo mật: CSRF protection, Rate Limiting (Upstash/Redis), Security Headers (Helmet/Next.js config).
- Kiểm thử: Unit tests, Integration tests cho Auth và API.
- Hiệu năng: SEO optimization, Image optimization (Next/Image), Caching.
- Triển khai: Dockerize ứng dụng, thiết lập CI/CD (GitHub Actions/Vercel).

## Architecture
- **Animation Framework**: Framer Motion hoặc CSS Keyframes (HVN style).
- **Rate Limiting Engine**: Upstash Redis (Serverless).
- **Test Framework**: Vitest + Playwright (E2E testing).
- **Monitoring Tool**: Sentry (Error tracking) + Google Analytics (Usage).

## Related Code Files
- `src/components/animations/FadeInUp.tsx` (Shared animation component)
- `src/middleware.ts` (Rate limiting & Security headers)
- `tests/integration/auth.test.ts` (Auth tests)
- `docker-compose.yml` (Docker config)
- `.github/workflows/deploy.yml` (CI/CD pipeline)

## Implementation Steps
1.  Áp dụng animation `fadeInUp` và hiệu ứng hover/shadow theo DESIGN.md cho toàn bộ các component chính.
2.  Cấu hình bảo mật nâng cao trong `next.config.ts` và Middleware (CSP, HSTS, Rate Limit).
3.  Tối ưu hóa hình ảnh thumbnail của các dịch vụ sử dụng `next/image`.
4.  Viết bộ test suite kiểm tra quy trình Auth và Phân quyền (RBAC).
5.  Thực hiện Performance Audit (Lighthouse) và sửa các lỗi về khả năng tiếp cận (Accessibility).
6.  Thiết lập Dockerfile và Docker Compose cho việc triển khai linh hoạt.
7.  Cấu hình CI/CD Pipeline để tự động build và deploy lên Vercel/Coolify/Self-hosted.
8.  Tạo tài liệu hướng dẫn sử dụng (User Guide) cho cả Admin và User.

## Todo List
- [ ] Áp dụng HVN Style Animations.
- [ ] Cấu hình Security Headers & Rate Limiting.
- [ ] Hoàn thành bộ Integration Tests chính.
- [ ] Kiểm tra Lighthouse score (> 90).
- [ ] Thiết lập Monitoring (Sentry/Logtail).
- [ ] Viết README hướng dẫn triển khai.

## Success Criteria
- [ ] Toàn bộ UI tuân thủ đúng HVN Style.
- [ ] Lighthouse score trên 90 điểm (Performance, SEO, Accessibility).
- [ ] Toàn bộ test suite pass.
- [ ] Hệ thống hoạt động ổn định, bảo mật trước các cuộc tấn công cơ bản (Brute-force, SQLi, CSRF).

## Risk Assessment
- **Rủi ro**: Hiệu ứng animation có thể làm giảm hiệu năng trên các thiết bị yếu.
- **Khắc phục**: Sử dụng CSS animations thuần túy cho các hiệu ứng đơn giản thay vì JS-based animations.

## Security Considerations
- Thực hiện định kỳ kiểm tra (Security Audit) các dependencies bằng `npm audit`.
- Sử dụng các công cụ quét mã nguồn (SAST) trong CI/CD.
- Chặn tất cả các IP lạ truy cập vào Admin Panel nếu cần (IP Whitelisting).

## Next Steps
- Triển khai Production.
- Theo dõi log và phản hồi người dùng để bảo trì và nâng cấp.
