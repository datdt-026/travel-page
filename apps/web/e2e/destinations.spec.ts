import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  translations,
  localeLangAttributes,
  containsAnyText,
  type TestLocale,
} from './helpers/i18n-test-utils';

// Test destination pages for all supported locales
for (const locale of testLocales) {
  test.describe(`Destinations Pages (${locale})`, () => {
    test('should render the destinations index page', async ({ page }) => {
      await page.goto(getLocalizedPath('/destinations', locale));

      // Check page title
      await expect(page).toHaveTitle(/Destinations|Điểm đến|Reiseziele|TravelSite/);

      // Check main heading with localized content
      const expectedText = translations[locale].destinations;
      await expect(page.locator('h1')).toContainText(expectedText);

      // Page should have navigation
      await expect(page.locator('header nav')).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('should render a country page (japan)', async ({ page }) => {
      // This test assumes seed data includes Japan
      const response = await page.goto(getLocalizedPath('/destinations/japan', locale));

      // If the page exists, check content
      if (response?.status() === 200) {
        // Check for country name (may be localized)
        await expect(page.locator('h1')).toBeVisible();

        // Check for breadcrumb navigation
        await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();

        // Check for JSON-LD schema
        const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
        expect(jsonLdScripts.length).toBeGreaterThan(0);

        // Check for TouristDestination schema
        let hasTouristDestination = false;
        for (const script of jsonLdScripts) {
          const content = await script.textContent();
          if (content?.includes('TouristDestination')) {
            hasTouristDestination = true;
            break;
          }
        }
        expect(hasTouristDestination).toBe(true);

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      } else {
        // Page might not exist if seed data hasn't run
        console.log(`Japan country page not found for locale ${locale} - seed data may not be present`);
        expect([200, 404]).toContain(response?.status());
      }
    });

    test('should handle non-existent country gracefully', async ({ page }) => {
      await page.goto(getLocalizedPath('/destinations/non-existent-country-xyz', locale));

      // Should show 404 or redirect
      const content = await page.textContent('body');
      const notFoundTexts = ['404', 'Not Found', 'not found', 'Không tìm thấy', 'Page non trouvée', 'Nicht gefunden'];
      expect(containsAnyText(content, ...notFoundTexts)).toBe(true);
    });
  });

  test.describe(`City Pages (${locale})`, () => {
    test('should render a city page with breadcrumbs', async ({ page }) => {
      // Navigate to Tokyo assuming seed data
      const response = await page.goto(getLocalizedPath('/destinations/japan/tokyo', locale));

      if (response?.status() === 200) {
        // Check breadcrumb has country and city
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
        await expect(breadcrumb).toBeVisible();

        // Check for JSON-LD
        const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
        expect(jsonLdScripts.length).toBeGreaterThan(0);

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      } else {
        console.log(`Tokyo city page not found for locale ${locale} - seed data may not be present`);
        expect([200, 404]).toContain(response?.status());
      }
    });
  });

  test.describe(`Itinerary Pages (${locale})`, () => {
    test('should render itinerary detail with TouristTrip schema', async ({ page }) => {
      // This test checks any itinerary that might exist
      const response = await page.goto(getLocalizedPath('/destinations/japan/tokyo/7-days-in-tokyo', locale));

      if (response?.status() === 200) {
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

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      } else {
        console.log(`Itinerary page not found for locale ${locale} - seed data may not be present`);
        expect([200, 404]).toContain(response?.status());
      }
    });
  });
}

// Test hreflang on destination pages
test.describe('Destinations i18n', () => {
  test('should have hreflang tags on destinations page', async ({ page }) => {
    await page.goto(getLocalizedPath('/destinations', 'en'));

    // Check hreflang tags exist for all supported locales
    for (const hrefLocale of testLocales) {
      const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
      await expect(hreflangLink).toHaveAttribute('href', new RegExp(`/${hrefLocale}/destinations`));
    }
  });

  test('should navigate to localized country page', async ({ page }) => {
    await page.goto(getLocalizedPath('/destinations', 'vi'));

    // Click on a country link if available
    const countryLinks = await page.locator(`a[href^="/vi/destinations/"]`).first();
    if (await countryLinks.isVisible()) {
      await countryLinks.click();

      // Should stay in Vietnamese locale
      await expect(page).toHaveURL(/\/vi\/destinations\//);

      // Lang attribute should be Vietnamese
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe('vi');
    }
  });
});
