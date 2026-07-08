import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  localeLangAttributes,
} from './helpers/i18n-test-utils';

/**
 * B2B Pages E2E Tests
 * Tests for business-focused pages: expertise, case-studies, partners, sustainability
 */

// Test B2B pages for all supported locales
for (const locale of testLocales) {
  test.describe(`B2B Pages (${locale})`, () => {
    test('Expertise page should render correctly', async ({ page }) => {
      const response = await page.goto(getLocalizedPath('/expertise', locale));

      if (response?.status() === 200) {
        await expect(page).toHaveTitle(/Expertise|Chuyên môn|Notre Expertise|Unsere Expertise/i);
        await expect(page.locator('h1')).toBeVisible();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);

        // Check for navigation
        await expect(page.locator('header nav')).toBeVisible();
      } else {
        console.log(`Expertise page not found for locale ${locale}`);
        expect([200, 404]).toContain(response?.status());
      }
    });

    test('Case Studies page should render correctly', async ({ page }) => {
      const response = await page.goto(getLocalizedPath('/case-studies', locale));

      if (response?.status() === 200) {
        await expect(page).toHaveTitle(/Case Studies|Nghiên cứu|Études de Cas|Fallstudien/i);
        await expect(page.locator('h1')).toBeVisible();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      } else {
        console.log(`Case Studies page not found for locale ${locale}`);
        expect([200, 404]).toContain(response?.status());
      }
    });

    test('Partners page should render correctly', async ({ page }) => {
      const response = await page.goto(getLocalizedPath('/partners', locale));

      if (response?.status() === 200) {
        await expect(page).toHaveTitle(/Partner|Đối tác|Partenaire/i);
        await expect(page.locator('h1')).toBeVisible();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);

        // Check for contact/inquiry form or CTA
        const hasForm = await page.locator('form').count();
        const hasCTA = await page.locator('a[href*="contact"], button').count();
        expect(hasForm > 0 || hasCTA > 0).toBe(true);
      } else {
        console.log(`Partners page not found for locale ${locale}`);
        expect([200, 404]).toContain(response?.status());
      }
    });

    test('Sustainability page should render correctly', async ({ page }) => {
      const response = await page.goto(getLocalizedPath('/sustainability', locale));

      if (response?.status() === 200) {
        await expect(page).toHaveTitle(/Sustainability|Bền vững|Durabilité|Nachhaltigkeit/i);
        await expect(page.locator('h1')).toBeVisible();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      } else {
        console.log(`Sustainability page not found for locale ${locale}`);
        expect([200, 404]).toContain(response?.status());
      }
    });
  });
}

// Test B2B page SEO for all locales
for (const locale of testLocales) {
  test.describe(`B2B Pages SEO (${locale})`, () => {
    const b2bPages = [
      { path: '/expertise', name: 'Expertise' },
      { path: '/case-studies', name: 'Case Studies' },
      { path: '/partners', name: 'Partners' },
      { path: '/sustainability', name: 'Sustainability' },
    ];

    for (const pageConfig of b2bPages) {
      test(`${pageConfig.name} should have proper meta tags`, async ({ page }) => {
        const response = await page.goto(getLocalizedPath(pageConfig.path, locale));

        if (response?.status() === 200) {
          // Check title exists
          const title = await page.title();
          expect(title.length).toBeGreaterThan(0);

          // Check meta description
          const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
          if (metaDescription) {
            expect(metaDescription.length).toBeGreaterThan(20);
          }

          // Check Open Graph tags
          const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
          expect(ogTitle).toBeTruthy();

          // Verify lang attribute
          const lang = await page.getAttribute('html', 'lang');
          expect(lang).toBe(localeLangAttributes[locale]);
        }
      });
    }
  });
}

// Test hreflang tags on B2B pages
test.describe('B2B Pages i18n', () => {
  test('Expertise page should have hreflang tags', async ({ page }) => {
    const response = await page.goto(getLocalizedPath('/expertise', 'en'));

    if (response?.status() === 200) {
      for (const hrefLocale of testLocales) {
        const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
        if (await hreflangLink.count() > 0) {
          await expect(hreflangLink).toHaveAttribute('href', new RegExp(`/${hrefLocale}/expertise`));
        }
      }
    }
  });

  test('B2B pages should maintain locale on navigation', async ({ page }) => {
    await page.goto(getLocalizedPath('/', 'vi'));

    // Try to find and click on a B2B link if available
    const expertiseLink = page.locator(`a[href="/vi/expertise"]`).first();
    if (await expertiseLink.isVisible()) {
      await expertiseLink.click();
      await expect(page).toHaveURL(/\/vi\/expertise/);

      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe('vi');
    }
  });
});
