import { test, expect } from '@playwright/test';
import {
  testLocales,
  getLocalizedPath,
  translations,
  localeLangAttributes,
  containsAnyText,
  type TestLocale,
} from './helpers/i18n-test-utils';

// Test static pages for all supported locales
for (const locale of testLocales) {
  test.describe(`Static Pages (${locale})`, () => {
    test('About page should render correctly', async ({ page }) => {
      await page.goto(getLocalizedPath('/about', locale));

      await expect(page).toHaveTitle(/About|Giới thiệu|À propos|Über uns/);
      
      const aboutText = translations[locale].about;
      await expect(page.locator('h1')).toContainText(aboutText);

      // Check key sections exist with localized content
      // These match the eyebrow labels in the about page sections
      const ourMission = translations[locale].ourMission;
      const ourStory = translations[locale].ourStory;
      const ourPhilosophy = translations[locale].ourPhilosophy;
      
      await expect(page.locator(`text=${ourMission}`)).toBeVisible();
      await expect(page.locator(`text=${ourStory}`)).toBeVisible();
      await expect(page.locator(`text=${ourPhilosophy}`)).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('Contact page should render form', async ({ page }) => {
      await page.goto(getLocalizedPath('/contact', locale));

      await expect(page).toHaveTitle(/Contact|Liên hệ|Kontakt/);
      
      const contactText = translations[locale].contact;
      await expect(page.locator('h1')).toContainText(contactText);

      // Check form elements exist
      await expect(page.locator('form')).toBeVisible();
      await expect(page.locator('input[name="firstName"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('textarea[name="message"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('FAQ page should have expandable questions', async ({ page }) => {
      await page.goto(getLocalizedPath('/faq', locale));

      await expect(page).toHaveTitle(/FAQ|Câu hỏi|Questions/);
      
      const faqTitle = translations[locale].frequentlyAskedQuestions;
      await expect(page.locator('h1')).toContainText(faqTitle);

      // Check for FAQ items
      const faqItems = await page.locator('details').all();
      expect(faqItems.length).toBeGreaterThan(0);

      // Test expanding a question
      const firstQuestion = page.locator('details').first();
      await firstQuestion.click();

      // Check it expands (has open attribute or content visible)
      await expect(firstQuestion).toHaveAttribute('open', '');

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('Blog page should render posts', async ({ page }) => {
      await page.goto(getLocalizedPath('/blog', locale));

      await expect(page).toHaveTitle(/Blog/);
      
      const blogText = translations[locale].blog;
      await expect(page.locator('h1')).toContainText(blogText);

      // Check for blog post links with localized paths
      const blogLinks = await page.locator(`a[href^="/${locale}/blog/"]`).all();
      expect(blogLinks.length).toBeGreaterThan(0);

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });

    test('Blog post page should render article', async ({ page }) => {
      await page.goto(getLocalizedPath('/blog/top-10-tips-first-time-travelers', locale));

      // Check article content
      await expect(page.locator('article')).toBeVisible();
      await expect(page.locator('h1')).toBeVisible();

      // Check for article schema
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      let hasArticleSchema = false;
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content?.includes('Article')) {
          hasArticleSchema = true;
          break;
        }
      }
      expect(hasArticleSchema).toBe(true);

      // Verify lang attribute
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });
  });

  test.describe(`Error Pages (${locale})`, () => {
    test('404 page should display correctly', async ({ page }) => {
      await page.goto(getLocalizedPath('/this-page-definitely-does-not-exist-xyz', locale));

      // Should show 404 content in appropriate language
      const body = await page.textContent('body');
      const notFoundTexts = ['404', 'Not Found', 'Page Not Found', 'Không tìm thấy', 'Page non trouvée', 'Nicht gefunden'];
      expect(containsAnyText(body, ...notFoundTexts)).toBe(true);

      // Should have navigation options
      await expect(page.locator(`a[href="/${locale}"]`)).toBeVisible();
    });
  });

  test.describe(`Navigation (${locale})`, () => {
    test('header navigation should work', async ({ page }) => {
      await page.goto(getLocalizedPath('/', locale));

      // Click on Destinations
      await page.click(`nav a[href="/${locale}/destinations"]`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/destinations`));
      await expect(page.locator('h1')).toContainText(translations[locale].destinations);

      // Click on Blog
      await page.click(`nav a[href="/${locale}/blog"]`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/blog`));
      await expect(page.locator('h1')).toContainText(translations[locale].blog);

      // Click on About
      await page.click(`nav a[href="/${locale}/about"]`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/about`));
      await expect(page.locator('h1')).toContainText(translations[locale].about);
    });

    test('breadcrumb navigation should work on destination pages', async ({ page }) => {
      await page.goto(getLocalizedPath('/destinations', locale));

      // If there are countries listed, click on one
      const countryLinks = await page.locator(`a[href^="/${locale}/destinations/"]`).first();
      if (await countryLinks.isVisible()) {
        await countryLinks.click();

        // Should see breadcrumb
        const breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
        await expect(breadcrumb).toBeVisible();

        // Should be able to navigate back via breadcrumb
        await breadcrumb.locator(`a[href="/${locale}/destinations"]`).click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/destinations$`));
      }
    });
  });
}

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(getLocalizedPath('/', 'en'));

    // Check page loads
    await expect(page.locator('h1')).toBeVisible();

    // Mobile menu button should be visible
    await expect(page.locator('button.md\\:hidden')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(getLocalizedPath('/destinations', 'en'));

    // Check grid layout adjusts
    await expect(page.locator('main')).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(getLocalizedPath('/destinations', 'en'));

    // Check page renders correctly
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  // Test responsive design across different locales
  for (const locale of testLocales) {
    test(`should work on mobile viewport (${locale})`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(getLocalizedPath('/', locale));

      // Check page loads with correct language
      await expect(page.locator('h1')).toBeVisible();
      const lang = await page.getAttribute('html', 'lang');
      expect(lang).toBe(localeLangAttributes[locale]);
    });
  }
});
