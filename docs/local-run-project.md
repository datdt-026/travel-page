# Local Run Frontend

## Quick Start: Frontend Only

Use this when you only want to view the web UI. Docker and CMS are not required.

## Local Run Modes

There are 2 common local run modes.

### Mode 1: Frontend only

Use this mode when you only need to review the UI layout quickly.

```text
Web frontend :3004
CMS API      : not running
PostgreSQL   : not required
```

In this mode:

- The web still loads at `http://localhost:3004/vi`.
- Static UI, layout, header shell, fallback sections, and local mock images can still render.
- Real CMS data such as countries, cities, attractions, itineraries, blog posts, header config, footer config, and page config will not be available.
- The terminal may show expected fetch errors like `ECONNREFUSED 127.0.0.1:3005` because the web is trying to call the CMS API but CMS is not running.

### Mode 2: Full local data flow

Use this mode when you want to see real CMS-managed data on the web.

```text
PostgreSQL Docker :5432
        |
        v
CMS local         :3005
        |
        v
Web local         :3004
```

In this mode:

- Docker is used for PostgreSQL only.
- CMS runs locally on port `3005`.
- Web runs locally on port `3004`.
- Web calls `NEXT_PUBLIC_CMS_URL=http://localhost:3005`.
- Countries, cities, attractions, itineraries, blog posts, CMS header/footer, and page configs can render from CMS data.

Recommended full local startup:

```bash
# 1. Start PostgreSQL
docker compose -f docker-compose.dev.yml up -d

# 2. Start CMS
cd apps/cms
npm run dev

# 3. Seed data if the database is empty
npm run seed

# 4. Start web in another terminal
cd apps/web
WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=true npm run dev
```

CMS admin:

```text
http://localhost:3005/admin
```

Seed admin account:

```text
Email: admin@travel.com
Password: admin123
```

```bash
# From the repository root
cd apps/web

# Install frontend dependencies
npm install --no-package-lock --workspaces=false

# Start frontend dev server
npm run dev
```

Open the website at:

```text
http://localhost:3004/vi
```

The frontend uses locale routes. Use `/vi` for Vietnamese, or replace it with `/en`, `/fr`, or `/de`.

## Current Frontend Screens

All screens live under `/{locale}`, for example `/vi/about`.

```text
/vi
/vi/about
/vi/contact
/vi/faq
/vi/expertise
/vi/sustainability
/vi/partners
/vi/partners/inquiry
/vi/countries
/vi/countries/[slug]
/vi/cities
/vi/cities/[slug]
/vi/attractions
/vi/attractions/[slug]
/vi/itineraries
/vi/itineraries/[slug]
/vi/case-studies
/vi/case-studies/[slug]
/vi/blog
/vi/blog/[slug]
/vi/destinations
/vi/destinations/[country]
/vi/destinations/[country]/[city]
/vi/destinations/[country]/[city]/[itinerary]
```

## Check Local Services

```bash
# Check frontend response
curl -I http://localhost:3004/vi
```

Expected frontend response:

```text
HTTP/1.1 200 OK
```

## Important Notes

- Run `npm run dev` only after `cd apps/web`.
- Do not run `npm run dev` from the repository root. The root script starts both CMS and web.
- Do not use root `pnpm dev` unless you want to start both CMS and web.
- The frontend currently reads CMS config from `apps/web/.env.local`:

```bash
NEXT_PUBLIC_CMS_URL=http://localhost:3005
NEXT_PUBLIC_SITE_URL=http://localhost:3004
```

If CMS is not running on `localhost:3005`, the frontend may log fetch errors such as `ECONNREFUSED 127.0.0.1:3005`. The web page can still load with fallback/static UI, but CMS-driven header/footer/home data may be missing.

If macOS shows file watcher errors like `EMFILE: too many open files`, use this fallback command inside `apps/web`:

```bash
WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=true npm run dev
```

## CMS Commands

After CMS dependencies are installable, these are the intended commands:

```bash
# Start CMS only
pnpm dev:cms

# Start web only
pnpm dev:web

# Start both CMS and web
pnpm dev
```

CMS should run on:

```text
http://localhost:3005
```

## Current Known Install Issue

At the time this note was written, root workspace install failed with:

```text
ERR_PNPM_NO_MATCHING_VERSION
No matching version found for drizzle-kit@0.20.14-1f2c838
```

This comes from the CMS dependency chain via `@payloadcms/db-postgres`. Until that is fixed, use the frontend-only commands in the Quick Start section to view the web UI locally.

## Stop Local Dev

```bash
# Stop the frontend server
Ctrl+C
```
