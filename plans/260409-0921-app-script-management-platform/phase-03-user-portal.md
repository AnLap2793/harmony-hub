# Phase 03 - Cổng Dịch vụ Người dùng (User Portal)

## Context Links
- [Plan cha (plan.md)](./plan.md)
- [Hệ thống thiết kế (DESIGN.md)](../../DESIGN.md)
- [Phase 01 - Foundation](./phase-01-foundation.md)
- [Phase 02 - Admin Dashboard](./phase-02-admin-dashboard.md)

## Overview
- **Ngày**: 2026-04-09
- **Mô tả**: Xây dựng UI cho người dùng cuối (User Portal) để truy cập và yêu cầu quyền sử dụng App Script.
- **Ưu tiên**: Trung bình (Medium)
- **Trạng thái thực hiện**: Pending
- **Trạng thái review**: Chưa bắt đầu

## Key Insights
- Không hiển thị App Script dưới dạng kỹ thuật, mà hiển thị như một "Dịch vụ" (Service).
- Card của mỗi dịch vụ cần đầy đủ thông tin: Tên, Mô tả ngắn, Trạng thái (Có quyền/Chưa có quyền/Đang chờ duyệt).
- Thiết kế User Portal phải thân thiện, đơn giản, sạch sẽ (HVN Style).

## Requirements
- Danh sách Dịch vụ (Service Grid) với 3 cột (Desktop).
- Bộ lọc dịch vụ (Danh mục, Trạng thái, Bộ phận).
- Trang chi tiết dịch vụ (Service Detail): Mô tả, Hướng dẫn sử dụng, Nút hành động (Mở/Yêu cầu quyền).
- Form Yêu cầu quyền: Mục đích, Thời hạn, Ghi chú nghiệp vụ.
- Dashboard cá nhân: Xem trạng thái các yêu cầu đã gửi.

## Architecture
- **User Layout**: Main Portal (Header 90px + Footer).
- **Service Cards**: Thumbnail (2px white border, Shadow lg) + Hover effect.
- **Service Grid**: Responsive Grid (3 -> 2 -> 1 columns).
- **Service Details**: Modal (Shadcn Dialog) hoặc Page chi tiết.

## Related Code Files
- `src/app/(portal)/page.tsx` (Service grid)
- `src/app/(portal)/service/[id]/page.tsx` (Service details)
- `src/app/(portal)/my-requests/page.tsx` (User's requests status)
- `src/components/portal/ServiceCard.tsx` (Service card component)
- `src/components/portal/RequestAccessForm.tsx` (Request access modal)

## Implementation Steps
1.  Xây dựng layout Portal chính với Header HVN và Hero section.
2.  Thiết kế component `ServiceCard` theo tiêu chuẩn HVN (Thumbnail, Shadow, Hover).
3.  Triển khai Service Grid với bộ lọc và tìm kiếm nhanh.
4.  Xây dựng trang chi tiết Dịch vụ (Service Detail) hiển thị giá trị sử dụng.
5.  Triển khai logic kiểm tra quyền (Access Check) và nút CTA động (Mở/Yêu cầu).
6.  Xây dựng quy trình gửi yêu cầu quyền sử dụng qua form popup.
7.  Tạo trang Dashboard cá nhân cho user theo dõi trạng thái yêu cầu.

## Todo List
- [ ] Thiết kế Service Card & Grid.
- [ ] Hoàn thành trang chi tiết Dịch vụ.
- [ ] Triển khai Form yêu cầu quyền.
- [ ] Thiết lập logic Access Check cho user hiện tại.
- [ ] Tích hợp thông báo trạng thái yêu cầu (Success/Pending/Denied).

## Success Criteria
- [ ] Giao diện hiển thị đẹp trên cả Desktop và Mobile.
- [ ] User có thể tìm kiếm và xem chi tiết các dịch vụ.
- [ ] User có thể gửi yêu cầu quyền truy cập thành công.
- [ ] Trạng thái "Có quyền/Chưa có quyền" hiển thị chính xác.

## Risk Assessment
- **Rủi ro**: Quá nhiều dịch vụ làm trang tải chậm.
- **Khắc phục**: Sử dụng Server Components và Pagination/Infinite Scroll cho grid.

## Security Considerations
- Chặn user truy cập trực tiếp Link dịch vụ nếu chưa có quyền (Server-side redirect).
- Filter các dịch vụ "Sensitive" không hiển thị cho user chưa được phép thấy.

## Next Steps
- Tiếp tục Phase 04 để tích hợp logic gọi App Script API và Tự động hóa.
