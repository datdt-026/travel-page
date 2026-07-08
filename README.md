# Travel SEO Monorepo

A production-ready monorepo for a large-scale SEO travel site built with Next.js 14 and PayloadCMS 2.

## Tech Stack

- **Frontend**: Next.js 14.2.x (App Router)
- **CMS**: PayloadCMS 2.x
- **Database**: PostgreSQL 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Project Structure

```
travel/
├── apps/
│   ├── cms/                 # PayloadCMS backend
│   │   ├── src/
│   │   │   ├── collections/ # Payload collections (Countries, Cities, etc.)
│   │   │   ├── seed/        # Seed script
│   │   │   ├── payload.config.ts
│   │   │   └── server.ts
│   │   └── package.json
│   │
│   └── web/                 # Next.js frontend
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # React components
│       │   ├── lib/         # API utilities
│       │   └── types/       # TypeScript types
│       └── package.json
│
├── .github/workflows/ci.yml # CI pipeline
├── .env.example             # Environment variables template
├── package.json             # Root workspace config
├── pnpm-workspace.yaml
└── README.md
```

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL 14+
- Docker (optional, for running PostgreSQL)

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repo-url> travel
cd travel

# Install dependencies
pnpm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
```

Required variables:
- `DATABASE_URL`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for Payload (min 32 characters)
- `NEXT_PUBLIC_CMS_URL`: URL where CMS is running (default: http://localhost:3001)
- `NEXT_PUBLIC_SITE_URL`: URL where frontend is running (default: http://localhost:3000)

### 3. Set Up PostgreSQL

**Option A: Using Docker**

```bash
docker run --name travel-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=travel_cms \
  -p 5432:5432 \
  -d postgres:14
```

**Option B: Local PostgreSQL**

Create a database named `travel_cms` and update your `.env` file with the connection string.

### 4. Start the CMS

```bash
# Start the CMS in development mode
pnpm dev:cms

# Or use the filter command
pnpm --filter @travel/cms dev
```

The CMS will:
1. Connect to PostgreSQL
2. Automatically create/migrate database tables
3. Start at http://localhost:3001

First run: Create an admin user at http://localhost:3001/admin

### 5. Seed Sample Data

```bash
# Run the seed script to add sample content
pnpm seed

# Or
pnpm --filter @travel/cms seed
```

This creates:
- 1 Admin user (admin@travel.com / admin123)
- 1 Country (Japan)
- 1 City (Tokyo)
- 1 Attraction (Senso-ji Temple)
- 1 Itinerary (3 Days in Tokyo)
- 1 Media placeholder

### 6. Start the Frontend

```bash
# In a new terminal, start the Next.js frontend
pnpm dev:web

# Or
pnpm --filter @travel/web dev
```

Visit http://localhost:3000 to see the site.

## Development Commands

```bash
# Install all dependencies
pnpm install

# Start CMS development server
pnpm dev:cms

# Start Web development server
pnpm dev:web

# Start both simultaneously
pnpm dev

# Seed sample data
pnpm seed

# Build all packages
pnpm build

# Start production servers
pnpm start

# Run linting
pnpm lint

# Run type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Collections

The CMS includes the following collections:

| Collection | Description |
|------------|-------------|
| **Users** | Admin users with role-based access |
| **Media** | Images and videos with responsive sizes |
| **Countries** | Country destinations with SEO fields |
| **Cities** | Cities belonging to countries |
| **Attractions** | Points of interest within cities |
| **Itineraries** | Multi-day travel plans with day-by-day activities |
| **BlogPosts** | Blog articles with categories and rich content |
| **Pages** | Static pages (about, contact, etc.) |
| **FAQs** | Frequently asked questions grouped by category |

## API Endpoints

### CMS API (PayloadCMS REST)

- `GET /api/countries` - List countries
- `GET /api/countries?where[slug][equals]=japan` - Get country by slug
- `GET /api/cities` - List cities
- `GET /api/attractions` - List attractions
- `GET /api/itineraries` - List itineraries
- `GET /api/blog-posts` - List blog posts
- `GET /api/pages` - List pages
- `GET /api/faqs` - List FAQs
- `GET /health` - CMS health check

### Frontend API

- `GET /api/health` - Frontend health check with CMS status

## Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured content |
| `/countries` | All countries list |
| `/countries/[slug]` | Country detail page |
| `/cities` | All cities list |
| `/cities/[slug]` | City detail page |
| `/attractions` | All attractions list |
| `/attractions/[slug]` | Attraction detail page |
| `/itineraries` | All itineraries list |
| `/itineraries/[slug]` | Itinerary detail page |
| `/blog` | Blog listing with pagination |
| `/blog/[slug]` | Blog post detail with Article JSON-LD |
| `/about` | About page (CMS-managed) |
| `/contact` | Contact page (CMS-managed) |
| `/faq` | FAQ page with FAQPage JSON-LD |

## Documentation

- [CMS Data Integration Guide](docs/CMS_INTEGRATION.md) - How CMS data maps to frontend UI

## SEO Features

- Server-side rendering for all pages
- Dynamic metadata generation
- OpenGraph tags
- Structured data ready
- Sitemap generation ready
- Fast page loads with revalidation
- **Multi-language support with hreflang tags**

## Internationalization (i18n)

The project supports multiple languages with a SEO-friendly URL structure:

### Supported Languages

| Code | Language | URL Structure |
|------|----------|---------------|
| `en` | English (default) | `/` (no prefix) |
| `vi` | Vietnamese | `/vi/...` |
| `fr` | French | `/fr/...` |
| `de` | German | `/de/...` |

### URL Examples

- English: `https://example.com/destinations/japan`
- Vietnamese: `https://example.com/vi/destinations/japan`
- French: `https://example.com/fr/destinations/japan`

### Adding a New Language

#### 1. Update Frontend Configuration

Edit `apps/web/src/i18n/config.ts`:

```typescript
export const locales = ['en', 'vi', 'fr', 'de', 'es'] as const; // Add 'es'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español', // Add Spanish name
};

export const localeHreflang: Record<Locale, string> = {
  en: 'en',
  vi: 'vi',
  fr: 'fr',
  de: 'de',
  es: 'es', // Add hreflang code
};
```

#### 2. Add Dictionary File

Create `apps/web/src/i18n/dictionaries/es.json`:

```json
{
  "common": {
    "siteName": "TravelSite",
    "home": "Inicio",
    "destinations": "Destinos"
    // ... copy structure from en.json and translate
  }
}
```

#### 3. Register Dictionary

Edit `apps/web/src/i18n/dictionaries.ts`:

```typescript
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default), // Add
};
```

#### 4. Update PayloadCMS

Edit `apps/cms/src/payload.config.ts`:

```typescript
const locales = [
  { label: 'English', code: 'en' },
  { label: 'Tiếng Việt', code: 'vi' },
  { label: 'Français', code: 'fr' },
  { label: 'Deutsch', code: 'de' },
  { label: 'Español', code: 'es' }, // Add
];
```

### CMS Localization

Collections have localized fields for content that needs translation:

**Localized fields** (translate per language):
- `name`, `title` - Display names
- `description`, `excerpt` - Content
- `metaTitle`, `metaDescription`, `metaKeywords` - SEO

**Non-localized fields** (same across languages):
- `slug` - URL identifier (keeps URLs consistent)
- `status`, `publishedAt` - Publishing state
- Media/images - Shared assets
- Numerical data (prices, coordinates, ratings)

### Fetching Localized Content

The API supports locale parameter:

```typescript
// Fetch countries in Vietnamese
const countries = await getCountries({ 
  locale: 'vi',
  status: 'published' 
});

// Get single country in French
const country = await getCountryBySlug('japan', 'fr');
```

API URL examples:
- `GET /api/countries?locale=vi` - Vietnamese content
- `GET /api/countries?locale=vi&fallback-locale=en` - Vietnamese with English fallback

### SEO Features for i18n

1. **hreflang Tags**: Automatically added to all pages
2. **Canonical URLs**: Language-specific canonical URLs
3. **Sitemap**: Includes all language variants with alternates
4. **x-default**: Points to English (default language)

### How It Works

1. **Middleware** (`middleware.ts`): 
   - Detects locale from URL path
   - Redirects default locale URLs (removes `/en` prefix)
   - Sets locale cookie for user preference

2. **Routing**:
   - Default locale (English): `/destinations`
   - Other locales: `/vi/destinations`, `/fr/destinations`

3. **Static Generation**:
   - Pages are generated for all locales
   - Content is fetched with locale parameter

4. **Language Switcher**:
   - Dropdown in header
   - Maintains current page path when switching

### Migration Notes

- **Existing content**: Preserved as default locale (English)
- **No database changes required**: PayloadCMS handles schema updates
- **Backward compatible**: English URLs remain unchanged (no `/en` prefix)

## Production Deployment

### Environment Variables for Production

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/travel_cms

# PayloadCMS
PAYLOAD_SECRET=your-production-secret-minimum-32-characters
PAYLOAD_PUBLIC_SERVER_URL=https://cms.yourdomain.com

# Next.js
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_CMS_URL=https://cms.yourdomain.com
```

### Build for Production

```bash
# Build all packages
pnpm build

# Start in production mode
pnpm start
```

## Testing the Setup

1. **CMS Health**: Visit http://localhost:3001/health
2. **Admin Panel**: Visit http://localhost:3001/admin
3. **Frontend Health**: Visit http://localhost:3000/api/health
4. **Homepage**: Visit http://localhost:3000
5. **Sample Content**: After seeding, visit http://localhost:3000/countries/japan

## Troubleshooting

### Database Connection Failed
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Verify database exists

### CMS Not Starting
- Check if port 3001 is available
- Verify `PAYLOAD_SECRET` is at least 32 characters
- Check PostgreSQL connection

### Frontend Shows No Content
- Ensure CMS is running
- Run `pnpm seed` to add sample data
- Check `NEXT_PUBLIC_CMS_URL` matches CMS URL

### Build Errors
- Run `pnpm install` to ensure all dependencies
- Check Node.js version >= 18
- Clear `.next` and `dist` folders: `pnpm clean`

## License

MIT
# travel
# travel
# travel
# travel
