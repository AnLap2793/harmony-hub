# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Harmony Hub là một ứng dụng web React + TypeScript được xây dựng với Vite, sử dụng Supabase làm backend. Đây là cổng dịch vụ số nội bộ (internal service portal) cho phép người dùng truy cập và quản lý các dịch vụ/công cụ nghiệp vụ.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Framework**: Radix UI + shadcn/ui components
- **Styling**: Tailwind CSS với custom design system (HVN Style)
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Backend**: Supabase (Auth + Database)
- **Testing**: Vitest + Testing Library + Playwright
- **Linting**: ESLint 9 với TypeScript ESLint

## Development Commands

```bash
# Development server (port 8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests (single run)
npm run test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (Radix UI wrappers)
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ServiceCard.tsx
│   └── ServiceCatalog.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Supabase authentication context
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/      # Supabase client and types
├── lib/               # Utility functions
│   └── utils.ts       # cn() helper for Tailwind
├── pages/             # Route pages
│   ├── Index.tsx      # Landing page
│   ├── AuthPage.tsx   # Login/signup
│   ├── AdminPage.tsx  # Admin dashboard
│   └── NotFound.tsx   # 404 page
├── test/              # Test setup and utilities
├── App.tsx            # Root component with routing
└── main.tsx           # Application entry point
```

## Architecture Notes

### Authentication Flow

- `AuthContext` wraps toàn bộ app và quản lý Supabase auth state
- Sử dụng `supabase.auth.onAuthStateChange()` để theo dõi session
- Admin role được kiểm tra qua RPC function `has_role()`
- Auth state bao gồm: `user`, `session`, `isAdmin`, `isLoading`

### Routing Structure

- `/` - Landing page (public)
- `/auth` - Authentication page (public)
- `/admin` - Admin dashboard (protected)
- `*` - 404 Not Found

### Component Architecture

- UI components từ shadcn/ui được đặt trong `components/ui/`
- Business components ở root level của `components/`
- Sử dụng Radix UI primitives cho accessibility
- Styling với Tailwind CSS và `class-variance-authority`

### State Management

- TanStack Query cho server state và caching
- React Context cho global state (Auth)
- Local state với useState/useReducer cho component state

## Design System

Project tuân theo HVN Design System (xem `DESIGN.md`):

### Brand Colors
- Primary Red: `#ea4544` - CTAs, highlights
- Secondary Orange: `#f5760f` - Accents, hover states
- Warm Background: `#fedaa8` - Section backgrounds

### Typography
- Font: Inter (400, 600, 700)
- Headings: Bold (700)
- Body: Regular (400)

### Container
- Max width: `1230px`
- Centered với padding responsive

### Key Design Principles
- Professional & Modern
- Tech-Oriented
- User-Friendly
- Warm & Approachable

## Service Portal UX Guidelines

### Product Positioning
- Định vị là **cổng dịch vụ số nội bộ**, không phải "kho App Script"
- Mỗi service được đóng gói thành **dịch vụ/công cụ nghiệp vụ**

### Service Card Requirements
- Tên hiển thị
- Mô tả ngắn
- Bộ phận/đối tượng phù hợp
- Trạng thái truy cập
- CTA: "Mở công cụ" hoặc "Yêu cầu quyền"

### Service Detail Blocks
- Dùng để làm gì
- Ai nên dùng
- Cách bắt đầu
- Tình trạng truy cập của tôi

### User-Facing Status
- Có quyền / Chưa có quyền
- Đang chờ duyệt / Đã duyệt, đang đồng bộ
- Bị từ chối / Sắp hết hạn / Đã hết hạn

## TypeScript Configuration

- Path alias: `@/*` maps to `src/*`
- Relaxed type checking: `noImplicitAny: false`, `strictNullChecks: false`
- Unused variables/parameters warnings disabled
- Skip lib check enabled

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## Testing

- Unit tests: Vitest với jsdom environment
- E2E tests: Playwright
- Test files: `src/**/*.{test,spec}.{ts,tsx}`
- Setup file: `src/test/setup.ts`

## Supabase Integration

- Client initialized in `src/integrations/supabase/client.ts`
- Auto-generated types in `src/integrations/supabase/types.ts`
- Auth storage: localStorage với session persistence
- Migrations: `supabase/migrations/`

## Development Notes

- Dev server runs on port 8080 with HMR
- Hot reload overlay disabled
- Component tagging enabled in development mode (lovable-tagger)
- React dedupe configured for multiple React instances prevention

## Code Style

- ESLint với TypeScript strict rules
- React Hooks rules enforced
- Unused vars warnings disabled
- React Refresh warnings for component exports
