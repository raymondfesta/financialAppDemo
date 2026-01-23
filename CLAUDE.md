# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
```

## Architecture

Next.js 16 + React 19 financial dashboard with shadcn/ui (new-york style) and Tailwind v4.

**Layout:** Single-page app with three-column layout
- `app/page.tsx` - Main dashboard, manages sidebar state
- Left: Collapsible navigation (`components/dashboard/left-nav.tsx`)
- Center: Charts + data table
- Right: Insights feed sidebar (`components/dashboard/insights-feed.tsx`)

**Components:**
- `components/ui/` - shadcn/ui primitives (Radix-based)
- `components/dashboard/` - Dashboard-specific components
- Add new shadcn components: `npx shadcn@latest add <component>`

**Styling:**
- Dark theme with CSS variables in `app/globals.css`
- Custom colors: `--chart-1` through `--chart-5`, `--sidebar-*` variants
- Use `cn()` from `lib/utils.ts` for conditional classes

**Data:** Currently hardcoded in component files (no API layer)
