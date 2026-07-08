'use client';

import React, { createContext, useContext } from 'react';
import type { Locale, Dictionary } from '@/i18n';

interface LocaleContextType {
  locale: Locale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

interface LocaleProviderProps {
  children: React.ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}

export function LocaleProvider({ children, locale, dictionary }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

/**
 * Hook to access translation dictionary
 */
export function useTranslations() {
  const { dictionary } = useLocale();
  return dictionary;
}

/**
 * Hook to get current locale
 */
export function useCurrentLocale(): Locale {
  const { locale } = useLocale();
  return locale;
}
