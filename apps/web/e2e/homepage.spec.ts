import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  translations,
  localeLangAttributes,
  type TestLocale,
} from './helpers/i18n-test-utils';

// Test homepage for all supported locales
for (const locale of testLocales) {
  test.describe(`Homepage (${locale})`, () => {
    test('should render the homepage with correct title', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Check page title
      await expect(page).toHaveTitle(/TravelSite/);

      // Check hero section with localized content
      const heroTitle = translations[locale].heroTitle;
      await expect(page.locator('h1')).toContainText(heroTitle);

      // Check navigation links are present with localized paths
      await expect(page.locator(`nav a[href="/${locale}/destinations"]`)).toBeVisible();
      await expect(page.locator(`nav a[href="/${locale}/attractions"]`)).toBeVisible();
      await expect(page.locator(`nav a[href="/${locale}/blog"]`)).toBeVisible();

      // Check footer exists
      await expect(page.locator('footer')).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('should have JSON-LD schema markup', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Check for JSON-LD script
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      expect(jsonLdScripts.length).toBeGreaterThan(0);

      // Parse and validate JSON-LD
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        expect(content).toBeTruthy();
        const jsonLd = JSON.parse(content!);
        expect(jsonLd['@context']).toBe('https://schema.org');
      }
    });

    test('should have hreflang tags for all locales', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Check hreflang tags exist for all supported locales
      for (const hrefLocale of testLocales) {
        const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
        await expect(hreflangLink).toHaveAttribute('href', new RegExp(`/${hrefLocale}`));
      }
    });
  });
}

// Test locale switching
test.describe('Locale Switching', () => {
  test('should redirect root path to default locale', async ({ page }) => {
    const response = await page.goto('/');
    
    // Should redirect to a localized path
    await expect(page).toHaveURL(/^\/(en|vi|fr|de)/);
  });

  test('should preserve locale when navigating', async ({ page }) => {
    await page.goto(getLocalizedPath('/', 'vi'));

    // Click on destinations link
    await page.click(`nav a[href="/vi/destinations"]`);
    
    // Should stay in Vietnamese locale
    await expect(page).toHaveURL(/\/vi\/destinations/);
    
    // Lang attribute should be Vietnamese
    const lang = await page.getAttribute('html', 'lang');
    expect(lang).toBe('vi');
  });
});
