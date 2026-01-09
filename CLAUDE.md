# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Asome is a bilingual (Spanish/English) corporate website built with Astro (SSG) for the frontend and Strapi v5 as a headless CMS for content management. The project uses a monorepo structure with separate `frontend/` and `backend/` directories.

## Development Commands

### Frontend (Astro)
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally
```

### Backend (Strapi)
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start Strapi in development mode at http://localhost:1337
npm run build        # Build Strapi admin panel
npm run start        # Start Strapi in production mode

# Database management (Docker Compose)
npm run db:start     # Start PostgreSQL container
npm run db:stop      # Stop PostgreSQL container
npm run db:restart   # Restart PostgreSQL container
npm run db:logs      # View PostgreSQL logs
npm run db:reset     # Reset database (deletes all data)
```

### Full Stack with Docker
```bash
# From root directory
docker-compose up -d    # Start both backend and database
docker-compose down     # Stop all services
```

## Architecture

### Frontend Architecture

**Framework**: Astro 5 with React integration for interactive components

**Internationalization (i18n)**:
- Default locale: `es-AR` (Spanish Argentina)
- Supported locales: `es-AR`, `en` (English)
- Routing: Uses dynamic `[lang]` route segments (e.g., `/en/projects`, `/es-AR/contact`)
- Translation utilities in [src/i18n/utils.ts](frontend/src/i18n/utils.ts) and [src/i18n/ui.ts](frontend/src/i18n/ui.ts)
- The `getLangFromUrl()` extracts language from URL path
- The `useTranslations()` hook provides translation function for components
- The `getLocalizedPath()` generates localized URLs

**Styling**: Tailwind CSS v4 with custom font (Maax)

**Data Fetching**: All content is fetched from Strapi CMS at build time via [src/lib/strapi.ts](frontend/src/lib/strapi.ts)
- Uses `fetchApi()` helper that wraps fetch with authentication
- Requires `STRAPI_URL` and `STRAPI_API_TOKEN` environment variables
- Data is structured and typed in [src/types/index.ts](frontend/src/types/index.ts)

**Component Structure**:
- `src/components/common/` - Shared components (Header, Footer, Navbar, Newsletter)
- `src/components/home/` - Home page specific components
- `src/components/projects/` - Project-related components
- `src/components/services/` - Service page components
- `src/components/about/` - About page components
- `src/components/shared/` - Reusable UI elements (badges, tags, icons, cards)
- `src/layouts/` - Page layouts

**Dynamic Content Pattern**: The project uses a "blocks" architecture where Strapi returns dynamic block arrays that map to Astro components. Each block has a `__component` field (e.g., `'blocks.hero'`, `'blocks.stats-section'`) that determines which component to render.

**Pages Structure**:
- Static pages use `[lang]` dynamic routes for i18n
- Dynamic pages: `/[lang]/services/[category]`, `/[lang]/projects/[slug]`
- Root `index.astro` likely redirects to default language

### Backend Architecture

**CMS**: Strapi v5 (Headless CMS)

**Database**:
- Development: SQLite (default) or PostgreSQL via Docker
- Production: PostgreSQL (configured via `DATABASE_URL` or individual env vars)
- Configuration in [backend/config/database.ts](backend/config/database.ts) supports both connection string parsing and individual env vars

**Content Types** (in `backend/src/api/`):
- `global` - Global site data (navigation, footer)
- `home-page` - Home page content with dynamic blocks
- `about-page` - About page content
- `project` - Individual project entries
- `service` - Service offerings
- `service-category` - Service categories (software, design, marketing)
- `tag` - Tags for categorization
- `lead` - Contact form submissions

**Media Upload**: Cloudinary integration configured in [backend/config/plugins.ts](backend/config/plugins.ts)
- Requires `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` environment variables

**Additional Plugin**: `strapi-plugin-populate-deep` for deeply populating relations

## Environment Variables

### Frontend (.env in frontend/)
```
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token
```

### Backend (.env in root/)
```
# Authentication
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=key1,key2,key3,key4

# Server
HOST=0.0.0.0
PORT=1337

# Database (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=asome-db
DATABASE_PORT=5432
DATABASE_NAME=asome
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false

# Cloudinary
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

## Key Technical Details

### Astro Configuration
- React integration enabled for interactive components
- i18n configured with `es-AR` default and `en` support
- Tailwind v4 integration via Vite plugin
- Preview allowed host for Railway deployment

### Strapi Content Modeling
- Uses dynamic zones/blocks pattern for flexible page composition
- Relations between services, tags, and categories
- Image fields configured for Cloudinary upload
- Populate deep plugin allows fetching nested relations in single query

### Type Safety
All Strapi data structures are typed in [frontend/src/types/index.ts](frontend/src/types/index.ts), including:
- Block types (`FeatureGridBlock`, `StatsSectionBlock`, `HeroBlock`, etc.)
- Content types (`Service`, `Project`, `TeamMember`, etc.)
- Navigation types (`NavbarLink`, `NavbarDropdown`)
- Use these types when working with Strapi data

### Fonts
The project uses Maax font family (weights 400, 500, 700). Font files should be placed in `frontend/public/fonts/` directory.
