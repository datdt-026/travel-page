/**
 * i18n Test Utilities
 * 
 * Helpers for running E2E tests across multiple locales.
 * Mirrors the locale configuration from src/i18n/config.ts
 */

export const testLocales = ['en', 'vi', 'fr', 'de'] as const;
export type TestLocale = (typeof testLocales)[number];

export const defaultLocale: TestLocale = 'en';

/**
 * Get localized path for testing
 * @param path - The base path (e.g., '/destinations')
 * @param locale - The locale to use
 */
export function getLocalizedPath(path: string, locale: TestLocale = defaultLocale): string {
  const cleanPath = path === '/' ? '' : path;
  return `/${locale}${cleanPath}`;
}

/**
 * Expected translations for common UI elements
 * Used for validating localized content in tests
 * 
 * These values should match the actual dictionary files:
 * - src/i18n/dictionaries/en.json
 * - src/i18n/dictionaries/vi.json
 * - src/i18n/dictionaries/fr.json
 * - src/i18n/dictionaries/de.json
 */
export const translations = {
  en: {
    home: 'Home',
    destinations: 'Destinations',
    attractions: 'Attractions',
    blog: 'Blog',
    about: 'About Us',
    contact: 'Contact',
    faq: 'FAQ',
    notFound: 'Page not found',
    heroTitle: 'Discover the World',
    // About page sections (from about.mission.eyebrow, about.story.eyebrow, about.values.eyebrow)
    ourMission: 'Our Mission',
    ourStory: 'Our Story',
    ourPhilosophy: 'Our Philosophy',
    // FAQ page
    frequentlyAskedQuestions: 'Frequently Asked Questions',
  },
  vi: {
    home: 'Trang chủ',
    destinations: 'Điểm đến',
    attractions: 'Địa điểm tham quan',
    blog: 'Blog',
    about: 'Giới thiệu',
    contact: 'Liên hệ',
    faq: 'Câu hỏi thường gặp',
    notFound: 'Không tìm thấy trang',
    heroTitle: 'Khám Phá Thế Giới',
    // About page sections
    ourMission: 'Sứ mệnh',
    ourStory: 'Câu chuyện của chúng tôi',
    ourPhilosophy: 'Triết lý của chúng tôi',
    // FAQ page
    frequentlyAskedQuestions: 'Câu hỏi thường gặp',
  },
  fr: {
    home: 'Accueil',
    destinations: 'Destinations',
    attractions: 'Attractions',
    blog: 'Blog',
    about: 'À propos',
    contact: 'Contact',
    faq: 'FAQ',
    notFound: 'Page non trouvée',
    heroTitle: 'Découvrez le Monde',
    // About page sections
    ourMission: 'Notre Mission',
    ourStory: 'Notre Histoire',
    ourPhilosophy: 'Notre Philosophie',
    // FAQ page
    frequentlyAskedQuestions: 'Questions Fréquemment Posées',
  },
  de: {
    home: 'Startseite',
    destinations: 'Reiseziele',
    attractions: 'Sehenswürdigkeiten',
    blog: 'Blog',
    about: 'Über uns',
    contact: 'Kontakt',
    faq: 'FAQ',
    notFound: 'Seite nicht gefunden',
    heroTitle: 'Entdecke die Welt',
    // About page sections
    ourMission: 'Unsere Mission',
    ourStory: 'Unsere Geschichte',
    ourPhilosophy: 'Unsere Philosophie',
    // FAQ page
    frequentlyAskedQuestions: 'Häufig gestellte Fragen',
  },
} as const;

/**
 * Get translation for a specific key and locale
 */
export function getTranslation(locale: TestLocale, key: keyof typeof translations.en): string {
  return translations[locale][key];
}

/**
 * Check if element contains any of the provided text variants
 * Useful for checking localized content that may vary by locale
 */
export function containsAnyText(content: string | null, ...texts: string[]): boolean {
  if (!content) return false;
  return texts.some(text => content.toLowerCase().includes(text.toLowerCase()));
}

/**
 * Expected lang attribute for each locale
 */
export const localeLangAttributes: Record<TestLocale, string> = {
  en: 'en',
  vi: 'vi',
  fr: 'fr',
  de: 'de',
};
