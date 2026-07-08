'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { defaultLocale } from '@/i18n';

const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/expertise', label: 'Our Expertise' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/partners', label: 'Partner With Us' },
];

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position after mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use mounted check to prevent hydration mismatch
  const effectiveIsScrolled = isMounted ? isScrolled : false;
  const isTransparent = variant === 'transparent' && !effectiveIsScrolled;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-elegant
        ${isTransparent
          ? 'bg-transparent'
          : 'bg-surface-primary/95 backdrop-blur-md border-b border-border-light'
        }
      `}
    >
      <nav className="container-luxury">
        <div className="flex items-center h-20 md:h-24">
          {/* Logo */}
          <Link 
            href="/" 
            className={`
              font-serif text-2xl md:text-3xl font-light tracking-wide
              transition-colors duration-300
              ${isTransparent ? 'text-content-inverse' : 'text-content-primary'}
            `}
          >
            Voyager
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-10 mx-auto">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    text-sm font-normal tracking-wide
                    transition-all duration-300 ease-elegant
                    relative group
                    ${isTransparent 
                      ? 'text-content-inverse/80 hover:text-content-inverse' 
                      : 'text-content-secondary hover:text-content-primary'
                    }
                  `}
                >
                  {item.label}
                  <span 
                    className={`
                      absolute -bottom-1 left-0 right-0 h-px
                      bg-accent scale-x-0 origin-left
                      transition-transform duration-300 ease-elegant
                      group-hover:scale-x-100
                    `}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side: Language Switcher & Contact */}
          <div className="flex items-center gap-4 md:gap-6 ml-auto lg:ml-0">
            {/* Partnership Inquiry CTA - Desktop only */}
            <Link
              href="/partners/inquiry"
              className={`
                hidden md:inline-flex items-center justify-center
                px-5 py-2 text-sm font-normal tracking-wide
                border transition-all duration-300 ease-elegant
                ${isTransparent
                  ? 'border-content-inverse/30 text-content-inverse hover:border-content-inverse hover:bg-content-inverse/10'
                  : 'border-border text-content-primary hover:border-content-primary hover:bg-surface-tertiary'
                }
              `}
            >
              Inquire
            </Link>

            <LanguageSwitcher currentLocale={defaultLocale} />

            {/* Mobile menu button */}
            <button
              className={`
                lg:hidden p-2 -mr-2
                transition-colors duration-300
                ${isTransparent ? 'text-content-inverse' : 'text-content-primary'}
              `}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden overflow-hidden
          transition-all duration-500 ease-elegant
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
          ${isTransparent ? 'bg-surface-dark/95' : 'bg-surface-primary'}
          backdrop-blur-md
        `}
      >
        <nav className="container-luxury py-8">
          <ul className="space-y-6">
            {navItems.map((item, index) => (
              <li
                key={item.href}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <Link
                  href={item.href}
                  className={`
                    block text-lg font-light tracking-wide
                    ${isTransparent ? 'text-content-inverse' : 'text-content-primary'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-border-light/20">
              <Link
                href="/contact"
                className={`
                  inline-flex items-center text-sm tracking-editorial uppercase
                  ${isTransparent ? 'text-accent' : 'text-accent'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
