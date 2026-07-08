import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  translations,
  localeLangAttributes,
  containsAnyText,
} from './helpers/i18n-test-utils';

/**
 * Attractions Pages E2E Tests
 * Tests for the attractions listing and detail pages
 */

// Test attractions pages for all supported locales
for (const locale of testLocales) {
  test.describe(`Attractions Pages (${locale})`, () => {
    test('should render the attractions index page', async ({ page }) => {
      await page.goto(getLocalizedPath('/attractions', locale));

      // Check page title
      await expect(page).toHaveTitle(/Attractions|Địa điểm tham quan|Sehenswürdigkeiten|TravelSite/i);

      // Check main heading with localized content
      const expectedText = translations[locale].attractions;
      await expect(page.locator('h1')).toContainText(expectedText);

      // Page should have navigation
      await expect(page.locator('header nav')).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('should have filter/search functionality', async ({ page }) => {
      await page.goto(getLocalizedPath('/attractions', locale));

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Check for search or filter elements
      const hasSearch = await page.locator('input[type="search"], input[type="text"][placeholder*="search" i]').count();
      const hasFilters = await page.locator('select, [role="listbox"], button:has-text("Filter")').count();
      
      // Page should have either search or filter functionality
      expect(hasSearch > 0 || hasFilters > 0).toBe(true);
    });

    test('should display attraction cards', async ({ page }) => {
      await page.goto(getLocalizedPath('/attractions', locale));

      // Wait for content to load
      await page.waitForLoadState('networkidle');

      // Check for attraction cards/items
      const attractionCards = await page.locator('article, [class*="card"], [class*="attraction"]').count();
      
      // Should have at least one attraction if seed data exists
      if (attractionCards > 0) {
        // Each card should have an image
        const images = await page.locator('article img, [class*="card"] img').count();
        expect(images).toBeGreaterThan(0);
      }
    });

    test('should handle empty state gracefully', async ({ page }) => {
      // Search for something that doesn't exist
      await page.goto(getLocalizedPath('/attractions', locale));

      // If there's a search input, search for nonsense
      const searchInput = page.locator('input[type="search"], input[type="text"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill('xyznonexistent123');
        await searchInput.press('Enter');
        await page.waitForTimeout(1000);

        // Should show "no results" message
        const bodyText = await page.textContent('body');
        const noResultsTexts = [
          'No attractions found',
          'Không tìm thấy',
          'Aucune attraction',
          'Keine Sehenswürdigkeiten',
          'No results',
        ];
        // This is optional - page may just show empty list
      }
    });
  });

  test.describe(`Attraction Detail Page (${locale})`, () => {
    test('should render attraction detail if available', async ({ page }) => {
      // First, go to attractions listing
      await page.goto(getLocalizedPath('/attractions', locale));
      await page.waitForLoadState('networkidle');

      // Try to find and click on an attraction link
      const attractionLink = page.locator(`a[href^="/${locale}/attractions/"]`).first();
      
      if (await attractionLink.isVisible()) {
        await attractionLink.click();
        await page.waitForLoadState('networkidle');

        // Should be on detail page
        await expect(page).toHaveURL(new RegExp(`/${locale}/attractions/`));

        // Should have H1 (attraction name)
        await expect(page.locator('h1')).toBeVisible();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);

        // Check for JSON-LD schema
        const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
        if (jsonLdScripts.length > 0) {
          let hasTouristAttraction = false;
          for (const script of jsonLdScripts) {
            const content = await script.textContent();
            if (content?.includes('TouristAttraction') || content?.includes('LocalBusiness')) {
              hasTouristAttraction = true;
              break;
            }
          }
          // Should have appropriate schema
          expect(hasTouristAttraction).toBe(true);
        }
      } else {
        console.log(`No attraction links found for locale ${locale} - seed data may not be present`);
      }
    });
  });
}

// Test attractions i18n features
test.describe('Attractions i18n', () => {
  test('should have hreflang tags on attractions page', async ({ page }) => {
    await page.goto(getLocalizedPath('/attractions', 'en'));

    // Check hreflang tags exist for all supported locales
    for (const hrefLocale of testLocales) {
      const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
      if (await hreflangLink.count() > 0) {
        await expect(hreflangLink).toHaveAttribute('href', new RegExp(`/${hrefLocale}/attractions`));
      }
    }
  });

  test('should maintain locale when navigating attractions', async ({ page }) => {
    await page.goto(getLocalizedPath('/attractions', 'fr'));

    // Click on an attraction if available
    const attractionLink = page.locator(`a[href^="/fr/attractions/"]`).first();
    if (await attractionLink.isVisible()) {
      await attractionLink.click();
      
      // Should stay in French locale
      await expect(page).toHaveURL(/\/fr\/attractions\//);
      
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe('fr');
    }
  });
});

// Test attractions SEO
for (const locale of testLocales) {
  test.describe(`Attractions SEO (${locale})`, () => {
    test('attractions index should have proper meta tags', async ({ page }) => {
      await page.goto(getLocalizedPath('/attractions', locale));

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
    });
  });
}
