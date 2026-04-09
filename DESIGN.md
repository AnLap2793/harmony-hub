# Design System - HVN Style

> Phân tích từ https://hvn.vn/ - Ngày cập nhật: 2026-04-09

## 🎨 Color Palette

### Brand Colors

```css
--primary-red: #ea4544; /* Màu đỏ chủ đạo - CTA, highlights */
--secondary-orange: #f5760f; /* Màu cam phụ trợ - accents */
--warm-bg: #fedaa8; /* Background ấm áp, mềm mại */
```

### Neutral Colors

```css
--white: #ffffff; /* Borders, highlights, text on dark */
--shadow: rgba(0, 0, 0, 0.13); /* Box shadows (#0002) */
```

### Usage Guidelines

- **Primary Red**: Buttons chính, links quan trọng, brand elements
- **Secondary Orange**: Hover states, secondary CTAs, icons
- **Warm Background**: Section backgrounds, cards, subtle highlights
- **White**: Borders cho thumbnails, text trên nền tối
- **Shadow**: Depth và elevation cho components

## ✍️ Typography

### Font Stack

```css
font-family: "Inter", sans-serif;
```

### Font Weights & Hierarchy

```css
/* Headings */
h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: 700; /* Bold - tạo hierarchy rõ ràng */
}

/* Body Text */
body,
p {
    font-weight: 400; /* Regular - dễ đọc */
}
```

### Recommendations

- Sử dụng Inter từ Google Fonts hoặc local
- Heading luôn bold (700) để tạo contrast
- Body text regular (400) cho khả năng đọc tốt
- Line-height: 1.5-1.6 cho body text

## 📐 Layout Structure

### Container System

```css
.container {
    max-width: 1230px;
    margin: 0 auto;
    padding: 0 15px;
}
```

### Grid System

```css
.grid-3-cols {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
```

### Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 640px) {
    .grid-3-cols {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile */
@media (max-width: 600px) {
    .grid-3-cols {
        grid-template-columns: 1fr;
    }
}
```

## 🧩 UI Components

### Header

```css
.header-main {
    height: 90px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Buttons

```css
.btn-lg {
    padding: 14px 32px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    background: var(--primary-red);
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-lg:hover {
    background: var(--secondary-orange);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(234, 69, 68, 0.3);
}
```

### Cards/Thumbnails

```css
.thumbnail {
    border: 2px solid #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.13);
    transition: transform 0.3s ease;
}

.thumbnail:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.2);
}
```

### Accordion (FAQ)

```css
.accordion {
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    margin-bottom: 12px;
}

.accordion-header {
    padding: 16px 20px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s ease;
}

.accordion-header:hover {
    background: #f9f9f9;
}

.accordion-content {
    padding: 0 20px 16px;
    display: none;
}

.accordion.active .accordion-content {
    display: block;
}
```

## ✨ Visual Effects

### Animations

```css
/* Fade In Up - Entry animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease-out;
}
```

### Shadows & Depth

```css
/* Elevation levels */
.shadow-sm {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.shadow-md {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.shadow-lg {
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.13);
}

.shadow-xl {
    box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.2);
}
```

### Transitions

```css
/* Standard transitions */
.transition-all {
    transition: all 0.3s ease;
}

.transition-fast {
    transition: all 0.2s ease;
}

.transition-slow {
    transition: all 0.5s ease;
}
```

## 🎯 Design Philosophy

### Brand Identity

- **Tagline**: "Hệ sinh thái kiến tạo doanh nghiệp 4.0"
- **Positioning**: One-Stop Solution cho chuyển đổi số
- **Target Audience**: Doanh nghiệp SME đến Enterprise

### Design Principles

1. **Professional & Modern**
    - Clean layouts, generous whitespace
    - Contemporary color scheme (red/orange)
    - Modern typography (Inter)

2. **Tech-Oriented**
    - Emphasis on digital transformation
    - Clear information hierarchy
    - Data-driven presentation

3. **User-Friendly**
    - Intuitive navigation
    - Responsive design
    - Smooth animations & transitions

4. **Trust & Credibility**
    - Professional imagery
    - Clear CTAs
    - Structured content presentation

### Visual Language

- **Warm & Approachable**: Sử dụng warm tones (#fedaa8)
- **Bold & Confident**: Primary red (#ea4544) cho CTAs
- **Clean & Organized**: Grid layouts, consistent spacing
- **Dynamic**: Subtle animations, hover effects

## 🧭 Service Portal Positioning

### Product Framing

- Với người dùng cuối, không hiển thị hệ thống như “kho App Script”
- Định vị là **cổng dịch vụ số nội bộ**
- Mỗi App Script nên được đóng gói thành một **dịch vụ/công cụ nghiệp vụ**

### Mandatory Service Card Content

- Tên hiển thị
- Mô tả ngắn
- Bộ phận hoặc đối tượng phù hợp
- Trạng thái truy cập hiện tại
- CTA chính: `Mở công cụ` hoặc `Yêu cầu quyền`

### Mandatory Service Detail Blocks

- `Dùng để làm gì`
- `Ai nên dùng`
- `Cách bắt đầu`
- `Tình trạng truy cập của tôi`

### User-Facing Status Language

- `Có quyền`
- `Chưa có quyền`
- `Đang chờ duyệt`
- `Đã duyệt, đang đồng bộ`
- `Bị từ chối`
- `Sắp hết hạn`
- `Đã hết hạn`

### UX Rules

- Không hiển thị role kỹ thuật cho người dùng cuối
- Form request chỉ hỏi mục đích sử dụng, thời hạn và ghi chú nghiệp vụ
- Thông tin quan trọng nhất trên card/detail luôn là giá trị sử dụng và bước tiếp theo

## 📱 Responsive Design

### Mobile-First Approach

```css
/* Base: Mobile */
.container {
    padding: 0 16px;
}

/* Tablet: 640px+ */
@media (min-width: 640px) {
    .container {
        padding: 0 24px;
    }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
    .container {
        padding: 0 32px;
    }
}
```

### Component Adaptations

- **Header**: Collapse to hamburger menu < 768px
- **Grid**: 3 cols → 2 cols → 1 col
- **Typography**: Scale down font sizes on mobile
- **Spacing**: Reduce padding/margins on smaller screens

## 🚀 Implementation Guidelines

### CSS Architecture

```
styles/
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── header.css
│   └── accordion.css
├── layout/
│   ├── container.css
│   └── grid.css
└── utilities/
    ├── animations.css
    └── shadows.css
```

### CSS Variables Setup

```css
:root {
    /* Colors */
    --primary-red: #ea4544;
    --secondary-orange: #f5760f;
    --warm-bg: #fedaa8;
    --white: #ffffff;
    --shadow: rgba(0, 0, 0, 0.13);

    /* Typography */
    --font-family: "Inter", sans-serif;
    --font-weight-regular: 400;
    --font-weight-bold: 700;

    /* Layout */
    --container-max-width: 1230px;
    --header-height: 90px;

    /* Spacing */
    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 32px;
    --spacing-xl: 48px;

    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

## 📚 Resources

### Fonts

- **Inter**: https://fonts.google.com/specimen/Inter
- Weights needed: 400 (Regular), 600 (Semi-Bold), 700 (Bold)

### Tools

- Color palette generator: https://coolors.co
- Shadow generator: https://shadows.brumm.af
- Animation library: https://animate.style

### Inspiration

- Original site: https://hvn.vn/
- Similar styles: Modern SaaS, B2B tech platforms
- Design systems: Material Design, Ant Design

---

**Note**: Design system này được phân tích từ HVN.vn và có thể cần điều chỉnh cho phù hợp với từng project cụ thể.
