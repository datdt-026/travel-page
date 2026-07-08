'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useCurrentLocale } from '@/components/LocaleProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { addLocaleToPathname } from '@/i18n';
import { getImageUrl } from '@/lib/api';
import { SiteHeaderConfig, Media } from '@/types';

interface LocalizedHeaderProps {
  forceTransparent?: boolean;
  cmsConfig?: SiteHeaderConfig;
}

// Helper to get media URL
function getMediaUrl(media: Media | string | undefined): string | undefined {
  if (!media) return undefined;
  if (typeof media === 'string') return media;
  return media.url;
}

export default function LocalizedHeader({ forceTransparent = false, cmsConfig }: LocalizedHeaderProps = {}) {
  const dict = useTranslations();
  const currentLocale = useCurrentLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Use mounted check to prevent hydration mismatch
  // On server and initial client render, always show non-scrolled state
  const effectiveIsScrolled = isMounted ? isScrolled : false;
  
  // Determine if header should be transparent
  const isTransparent = forceTransparent || !effectiveIsScrolled;

  // Create localized path helper
  const localePath = (path: string) => addLocaleToPathname(path, currentLocale);

  // Use CMS navigation if available, otherwise fallback to dictionary
  const navItems = cmsConfig?.navigation && cmsConfig.navigation.length > 0
    ? cmsConfig.navigation.map(item => ({
        href: item.link,
        label: item.label,
        openInNewTab: item.openInNewTab,
        children: item.children,
      }))
    : [
        { href: '/destinations', label: dict.common.destinations },
        { href: '/attractions', label: dict.common.attractions },
        { href: '/itineraries', label: dict.common.itineraries },
        { href: '/blog', label: dict.common.blog },
        { href: '/about', label: dict.common.about },
      ];

  // CTA button from CMS with fallback
  // Default to true if no CMS config or if enabled is not explicitly set to false
  const ctaEnabled = cmsConfig?.ctaButton?.enabled !== false;
  const ctaLabel = cmsConfig?.ctaButton?.label || dict.common.contact;
  const ctaLink = cmsConfig?.ctaButton?.link || '/contact';

  // Logo from CMS
  const logoImage = getMediaUrl(cmsConfig?.logo?.image);
  const logoLightImage = getMediaUrl(cmsConfig?.logo?.lightImage);
  const logoAlt = cmsConfig?.logo?.altText || 'VietWay';

  // Settings
  const showLanguageSwitcher = cmsConfig?.settings?.showLanguageSwitcher !== false;

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        effectiveIsScrolled && !forceTransparent
          ? 'header-solid py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-wide">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href={localePath('/')}
            className={`transition-colors duration-300 ${
              effectiveIsScrolled && !forceTransparent ? 'text-gray-800' : 'text-white'
            }`}
          >
            {logoImage || logoLightImage ? (
              <Image
                src={getImageUrl((effectiveIsScrolled && !forceTransparent ? logoImage : logoLightImage) || logoImage || '')!}
                alt={logoAlt}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-xl tracking-[0.2em] uppercase font-light">
                <span className="font-light">Viet</span>
                <span className="font-semibold">Way</span>
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(item.href)}
                  className={`text-sm tracking-wider uppercase font-light transition-all duration-300 hover:opacity-70 ${
                    effectiveIsScrolled && !forceTransparent ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side - CTA & Language */}
          <div className="hidden lg:flex items-center gap-6">
            {showLanguageSwitcher && (
              <LanguageSwitcher currentLocale={currentLocale} />
            )}
            
            {ctaEnabled && (
              <Link
                href={localePath(ctaLink)}
                className={`px-5 py-2 text-xs tracking-widest uppercase font-normal transition-all duration-300 ${
                  effectiveIsScrolled && !forceTransparent
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20'
                }`}
              >
                {ctaLabel}
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              effectiveIsScrolled && !forceTransparent ? 'text-gray-700' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="space-y-4 pb-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(item.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm tracking-wider uppercase font-light transition-colors duration-300 ${
                    effectiveIsScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 flex items-center gap-4">
              {showLanguageSwitcher && (
                <LanguageSwitcher currentLocale={currentLocale} />
              )}
              {ctaEnabled && (
                <Link
                  href={localePath(ctaLink)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase font-normal transition-all duration-300 ${
                    effectiveIsScrolled
                      ? 'bg-gray-900 text-white'
                      : 'bg-white/10 backdrop-blur-sm text-white border border-white/30'
                  }`}
                >
                  {ctaLabel}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
