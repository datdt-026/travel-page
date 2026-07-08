'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { locales, localeNames, defaultLocale, type Locale, addLocaleToPathname, removeLocaleFromPathname } from '@/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export default function LanguageSwitcher({ currentLocale, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Get the path without the current locale prefix
  const basePath = removeLocaleFromPathname(pathname);
  
  // Use mounted check to prevent hydration mismatch
  const effectiveIsScrolled = isMounted ? isScrolled : false;

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position after mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`relative group ${className}`}>
      <button 
        className={`flex items-center gap-1.5 text-xs tracking-wider uppercase font-light transition-colors duration-300 ${
          effectiveIsScrolled 
            ? 'text-gray-600 hover:text-gray-900' 
            : 'text-white/80 hover:text-white'
        }`}
        aria-label="Select language"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span>{currentLocale}</span>
        <svg 
          className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 top-full mt-3 w-44 bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
        <ul className="py-2">
          {locales.map((locale) => {
            const localizedPath = addLocaleToPathname(basePath, locale);
            const isActive = locale === currentLocale;
            
            return (
              <li key={locale}>
                <Link
                  href={localizedPath}
                  className={`block px-5 py-2.5 text-sm transition-all duration-300 ${
                    isActive 
                      ? 'text-gray-900 bg-gray-50 font-medium' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {localeNames[locale]}
                    {isActive && (
                      <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
