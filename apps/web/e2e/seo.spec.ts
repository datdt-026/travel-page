import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  localeLangAttributes,
  type TestLocale,
} from './helpers/i18n-test-utils';

// Test SEO requirements for all supported locales
for (const locale of testLocales) {
  test.describe(`SEO Requirements (${locale})`, () => {
    const pagesToTest = [
      { path: '/', name: 'Homepage' },
      { path: '/destinations', name: 'Destinations' },
      { path: '/blog', name: 'Blog' },
      { path: '/about', name: 'About' },
      { path: '/contact', name: 'Contact' },
      { path: '/faq', name: 'FAQ' },
    ];

    for (const pageConfig of pagesToTest) {
      test(`${pageConfig.name} should have proper meta tags`, async ({ page }) => {
        await page.goto(getLocalizedPath(pageConfig.path, locale));

        // Check title exists and is not empty
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);

        // Check meta description
        const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
        expect(metaDescription).toBeTruthy();
        expect(metaDescription!.length).toBeGreaterThan(50);

        // Check Open Graph tags
        const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
        const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
        expect(ogTitle).toBeTruthy();
        expect(ogDescription).toBeTruthy();

        // Check Open Graph locale
        const ogLocale = await page.getAttribute('meta[property="og:locale"]', 'content');
        if (ogLocale) {
          expect(ogLocale).toContain(locale);
        }

        // Check Twitter card
        const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
        expect(twitterCard).toBeTruthy();

        // Verify lang attribute
        const lang = await page.getAttribute('html', 'lang');
        expect(lang).toBe(localeLangAttributes[locale]);
      });
    }

    test('should have proper heading structure', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Check there's exactly one H1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Check H1 is not empty
      const h1Text = await page.locator('h1').first().textContent();
      expect(h1Text!.trim().length).toBeGreaterThan(0);
    });

    test('should have proper canonical URL', async ({ page }) => {
      await page.goto(getLocalizedPath('/destinations', locale));

      // Check for canonical link (may be added by metadata)
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
      if (canonical) {
        expect(canonical).toContain(`/${locale}/destinations`);
      }
    });

    test('should have proper robots meta', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Robots should allow indexing on main pages
      const robots = await page.getAttribute('meta[name="robots"]', 'content');
      // If robots meta exists, it should allow indexing
      if (robots) {
        expect(robots.includes('noindex')).toBe(false);
      }
    });

    test('should have hreflang tags for all locales', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Check hreflang tags exist for all supported locales
      for (const hrefLocale of testLocales) {
        const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
        await expect(hreflangLink).toHaveAttribute('href', new RegExp(`/${hrefLocale}`));
      }

      // Check for x-default hreflang
      const xDefaultLink = page.locator('link[rel="alternate"][hreflang="x-default"]');
      if (await xDefaultLink.count() > 0) {
        await expect(xDefaultLink).toBeVisible();
      }
    });
  });

  test.describe(`JSON-LD Schema Validation (${locale})`, () => {
    test('Homepage should have WebSite and Organization schema', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      expect(jsonLdScripts.length).toBeGreaterThan(0);

      const schemas: string[] = [];
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content) {
          schemas.push(content);
        }
      }

      const allSchemaText = schemas.join(' ');
      expect(allSchemaText).toContain('WebSite');
      expect(allSchemaText).toContain('Organization');

      // Check inLanguage property matches locale
      for (const schema of schemas) {
        try {
          const json = JSON.parse(schema);
          if (json.inLanguage) {
            expect(json.inLanguage).toContain(locale);
          }
        } catch {
          // Skip invalid JSON
        }
      }
    });

    test('FAQ page should have FAQPage schema', async ({ page }) => {
      await page.goto(getLocalizedPath('/faq', locale));

      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      let hasFaqSchema = false;

      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content?.includes('FAQPage')) {
          hasFaqSchema = true;
          const json = JSON.parse(content);
          expect(json['@type']).toBe('FAQPage');
          expect(json.mainEntity).toBeDefined();
          expect(Array.isArray(json.mainEntity)).toBe(true);
          break;
        }
      }

      expect(hasFaqSchema).toBe(true);
    });

    test('About page should have Organization schema', async ({ page }) => {
      await page.goto(getLocalizedPath('/about', locale));

      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      let hasOrgSchema = false;

      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content?.includes('Organization')) {
          hasOrgSchema = true;
          break;
        }
      }

      expect(hasOrgSchema).toBe(true);
    });
  });

  test.describe(`Accessibility Basics (${locale})`, () => {
    test('should have proper lang attribute', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('navigation should be accessible', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Check navigation exists
      const nav = page.locator('header nav');
      await expect(nav).toBeVisible();

      // Links should have text content
      const navLinks = await nav.locator('a').all();
      for (const link of navLinks) {
        const text = await link.textContent();
        expect(text!.trim().length).toBeGreaterThan(0);
      }
    });

    test('images should have alt attributes', async ({ page }) => {
      await page.goto(getLocalizedPath('/destinations', locale));

      // Wait for images to load
      await page.waitForLoadState('networkidle');

      const images = await page.locator('img').all();
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        // All images should have alt attribute (can be empty for decorative)
        expect(alt !== null).toBe(true);
      }
    });
  });
}

test.describe('Performance Basics', () => {
  // Test performance for each locale
  for (const locale of testLocales) {
    test(`pages should load within reasonable time (${locale})`, async ({ page }) => {
      const start = Date.now();
      await page.goto(getLocalizedPath('/', locale));
      const loadTime = Date.now() - start;

      // Page should load within 10 seconds (generous for dev)
      expect(loadTime).toBeLessThan(10000);

      // Verify correct locale was loaded
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });
  }

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto(getLocalizedPath('/', 'en'));
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like failed CMS fetch in tests)
    const criticalErrors = errors.filter(
      (e) => !e.includes('Failed to fetch') && !e.includes('net::ERR')
    );

    expect(criticalErrors.length).toBe(0);
  });
});

// Test i18n-specific SEO requirements
test.describe('i18n SEO', () => {
  test('all locales should have consistent page structure', async ({ page }) => {
    for (const locale of testLocales) {
      await page.goto(getLocalizedPath('/destinations', locale));

      // Each locale should have same basic structure
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('header nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    }
  });

  test('hreflang tags should point to correct locale paths', async ({ page }) => {
    await page.goto(getLocalizedPath('/blog', 'en'));

    // Check each hreflang link has correct href pattern
    for (const hrefLocale of testLocales) {
      const hreflangLink = page.locator(`link[rel="alternate"][hreflang="${hrefLocale}"]`);
      const href = await hreflangLink.getAttribute('href');
      expect(href).toContain(`/${hrefLocale}/blog`);
    }
  });

  test('og:locale should match page locale', async ({ page }) => {
    for (const locale of testLocales) {
      await page.goto(getLocalizedPath('/', locale));

      const ogLocale = await page.getAttribute('meta[property="og:locale"]', 'content');
      if (ogLocale) {
        // og:locale format is typically 'en_US', 'vi_VN', etc.
        expect(ogLocale.toLowerCase()).toContain(locale);
      }
    }
  });
});
