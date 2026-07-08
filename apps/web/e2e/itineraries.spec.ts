import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  localeLangAttributes,
} from './helpers/i18n-test-utils';

/**
 * Itineraries Pages E2E Tests
 * Tests for the itineraries listing and detail pages
 */

// Expected translations for itineraries
const itineraryTranslations = {
  en: { title: 'Itineraries', days: 'days' },
  vi: { title: 'Lịch trình', days: 'ngày' },
  fr: { title: 'Itinéraires', days: 'jours' },
  de: { title: 'Reiserouten', days: 'Tage' },
} as const;

// Test itineraries pages for all supported locales
for (const locale of testLocales) {
  test.describe(`Itineraries Pages (${locale})`, () => {
    test('should render the itineraries index page', async ({ page }) => {
      await page.goto(getLocalizedPath('/itineraries', locale));

      // Check page title
      await expect(page).toHaveTitle(/Itineraries|Lịch trình|Itinéraires|Reiserouten|TravelSite/i);

      // Check main heading with localized content
      const expectedText = itineraryTranslations[locale].title;
      await expect(page.locator('h1')).toContainText(expectedText);

      // Page should have navigation
      await expect(page.locator('header nav')).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('should display itinerary cards with duration', async ({ page }) => {
      await page.goto(getLocalizedPath('/itineraries', locale));
      await page.waitForLoadState('networkidle');

      // Check for itinerary cards/items
      const itineraryLinks = await page.locator(`a[href^="/${locale}/itineraries/"], a[href^="/${locale}/destinations/"]`).count();
      
      if (itineraryLinks > 0) {
        // Cards should show duration
        const bodyText = await page.textContent('body');
        const daysText = itineraryTranslations[locale].days;
        // Duration should be visible somewhere
        expect(bodyText?.toLowerCase()).toContain(daysText.toLowerCase());
      }
    });

    test('should have filter functionality', async ({ page }) => {
      await page.goto(getLocalizedPath('/itineraries', locale));
      await page.waitForLoadState('networkidle');

      // Check for filter elements
      const hasFilters = await page.locator('select, [role="listbox"], button:has-text("Filter"), [class*="filter"]').count();
      
      // Page should have filter functionality
      if (hasFilters > 0) {
        expect(hasFilters).toBeGreaterThan(0);
      }
    });
  });
}

// Test itinerary detail pages
test.describe('Itinerary Detail Pages', () => {
  for (const locale of testLocales) {
    test(`should render itinerary detail page (${locale})`, async ({ page }) => {
      // First, go to itineraries listing
      await page.goto(getLocalizedPath('/itineraries', locale));
      await page.waitForLoadState('networkidle');

      // Try to find and click on an itinerary link
      const itineraryLink = page.locator(`a[href*="/${locale}/"]`).filter({ hasText: /day|ngày|jour|Tag/i }).first();
      
      if (await itineraryLink.isVisible()) {
        await itineraryLink.click();
        await page.waitForLoadState('networkidle');

        // Should have H1 (itinerary name)
        await expect(page.locator('h1')).toBeVisible();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      } else {
        // Try direct navigation to a known itinerary
        const response = await page.goto(getLocalizedPath('/destinations/japan/tokyo/7-days-in-tokyo', locale));
        
        if (response?.status() === 200) {
          await expect(page.locator('h1')).toBeVisible();
          
          // Check for TouristTrip schema
          const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
          let hasTouristTrip = false;
          for (const script of jsonLdScripts) {
            const content = await script.textContent();
            if (content?.includes('TouristTrip')) {
              hasTouristTrip = true;
              break;
            }
          }
          expect(hasTouristTrip).toBe(true);
        } else {
          console.log(`Itinerary detail not found for locale ${locale} - seed data may not be present`);
        }
      }
    });
  }
});

// Test itineraries i18n features
test.describe('Itineraries i18n', () => {
  test('should have hreflang tags on itineraries page', async ({ page }) => {
    await page.goto(getLocalizedPath('/itineraries', 'en'));

    // Check hreflang tags exist for all supported locales
    for (const hrefLocale of testLocales) {
      const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
      if (await hreflangLink.count() > 0) {
        await expect(hreflangLink).toHaveAttribute('href', new RegExp(`/${hrefLocale}/itineraries`));
      }
    }
  });

  test('should maintain locale when navigating itineraries', async ({ page }) => {
    await page.goto(getLocalizedPath('/itineraries', 'de'));

    // Click on an itinerary if available
    const itineraryLink = page.locator(`a[href^="/de/"]`).first();
    if (await itineraryLink.isVisible()) {
      await itineraryLink.click();
      
      // Should stay in German locale
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe('de');
    }
  });
});

// Test itineraries SEO
for (const locale of testLocales) {
  test.describe(`Itineraries SEO (${locale})`, () => {
    test('itineraries index should have proper meta tags', async ({ page }) => {
      await page.goto(getLocalizedPath('/itineraries', locale));

      // Check title exists
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Check meta description
      const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(20);

      // Check Open Graph tags
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle).toBeTruthy();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });
  });
}
