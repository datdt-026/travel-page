# TravelSite - Next.js Frontend

A SEO-optimized travel website frontend built with Next.js 14 (App Router) and PayloadCMS 2.x.

## Features

- 🚀 **Server Components** - All SEO pages are server-rendered by default
- 🔍 **SEO Optimized** - Meta tags, canonical URLs, and JSON-LD structured data
- 📱 **Responsive Design** - Mobile-first with Tailwind CSS
- 🎨 **Modern UI** - Clean, accessible components
- ✅ **Type Safe** - Full TypeScript support
- 🧪 **Tested** - Playwright E2E tests

## Pages

| Route | Description | JSON-LD Schema |
|-------|-------------|----------------|
| `/` | Homepage with featured destinations | WebSite, Organization |
| `/destinations` | Browse all countries by continent | - |
| `/destinations/[country]` | Country landing page | TouristDestination |
| `/destinations/[country]/[city]` | City detail page | TouristDestination |
| `/destinations/[country]/[city]/[itinerary]` | Itinerary detail | TouristTrip |
| `/attractions/[slug]` | Attraction detail | TouristAttraction |
| `/blog` | Blog listing | - |
| `/blog/[slug]` | Blog article | Article |
| `/about` | About us page | Organization |
| `/contact` | Contact form | - |
| `/faq` | FAQ page | FAQPage |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PayloadCMS instance running (default: http://localhost:3001)

### Installation

1. Install dependencies:
```bash
cd apps/web
pnpm install
```

2. Set environment variables:
```bash
# Create .env.local
NEXT_PUBLIC_CMS_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Running with CMS

Make sure the CMS is running first:

```bash
# From project root
cd apps/cms
pnpm dev

# Seed sample data (optional)
pnpm seed
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── destinations/       # Destination pages
│   │   ├── page.tsx       # /destinations
│   │   └── [country]/     # Country and city pages
│   ├── attractions/        # Attraction pages
│   ├── blog/              # Blog pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── error.tsx          # Error boundary
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 page
├── components/            # Reusable UI components
│   ├── Breadcrumb.tsx     # Breadcrumb navigation with schema
│   ├── Card.tsx           # Content card component
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Site header
│   ├── HeroSection.tsx    # Page hero sections
│   ├── ImageGallery.tsx   # Image gallery component
│   └── RichText.tsx       # Rich text renderer
├── lib/
│   ├── api.ts             # Payload API client
│   └── seo.ts             # SEO utilities and schema generators
└── types/
    └── index.ts           # TypeScript types
```

## SEO Features

### Metadata Generation

Each page uses typed metadata helpers from `lib/seo.ts`:

```typescript
import { generateCountryMetadata } from '@/lib/seo';

export async function generateMetadata({ params }): Promise<Metadata> {
  const country = await getCountryBySlug(params.country);
  return generateCountryMetadata(country);
}
```

### JSON-LD Structured Data

JSON-LD schemas are generated using helper functions:

```typescript
import { JsonLd, generateTouristDestinationSchema } from '@/lib/seo';

// In component
<JsonLd data={generateTouristDestinationSchema(name, description, imageUrl)} />
```

Supported schemas:
- `BreadcrumbList` - Navigation breadcrumbs
- `TouristDestination` - Countries and cities
- `TouristTrip` - Itineraries
- `TouristAttraction` - Attractions
- `FAQPage` - FAQ content
- `Article` - Blog posts
- `Organization` - Site organization
- `WebSite` - Site information with search

### Breadcrumbs

Breadcrumb component automatically generates BreadcrumbList schema:

```typescript
import Breadcrumb from '@/components/Breadcrumb';

<Breadcrumb items={[
  { name: 'Destinations', url: '/destinations' },
  { name: 'Japan', url: '/destinations/japan' },
]} />
```

## Testing

### Install Playwright

```bash
pnpm exec playwright install
```

### Run Tests

```bash
# Run all tests
pnpm test

# Run with UI
pnpm test:ui

# Run in headed mode
pnpm test:headed

# Debug mode
pnpm test:debug
```

### Test Suites

- `homepage.spec.ts` - Homepage rendering and JSON-LD
- `destinations.spec.ts` - Destination page tests
- `seo.spec.ts` - Meta tags and schema validation
- `pages.spec.ts` - Static pages and navigation

## Build

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

## API Integration

The frontend fetches data from PayloadCMS REST API:

```typescript
// lib/api.ts
export function getCountries(options?: FetchOptions) {
  return fetchFromCMS('countries', options);
}

export function getCountryBySlug(slug: string) {
  return fetchOneFromCMS('countries', slug);
}
```

All fetches use Next.js caching with 60-second revalidation:

```typescript
const res = await fetch(url, {
  next: { revalidate: 60 },
});
```

## Component Usage

### Card

```typescript
<Card
  title="Tokyo"
  href="/destinations/japan/tokyo"
  excerpt="Vibrant capital city..."
  image={city.featuredImage}
  variant="default" // 'default' | 'horizontal' | 'featured'
  tags={['Asia', 'Japan']}
/>
```

### HeroSection

```typescript
<HeroSection
  title="Explore Japan"
  subtitle="Discover ancient traditions..."
  image={country.featuredImage}
  size="lg" // 'sm' | 'md' | 'lg'
/>
```

### RichText

```typescript
<RichText 
  content={country.description} 
  className="prose-lg"
/>
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_CMS_URL` | PayloadCMS API URL | `http://localhost:3001` |
| `NEXT_PUBLIC_SITE_URL` | Site URL for canonical URLs | `https://travelsite.com` |

## License

MIT
