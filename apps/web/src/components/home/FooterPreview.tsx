'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { defaultLocale } from '@/i18n';

interface FooterPreviewProps {
  brandName?: string;
  tagline?: string;
  locale?: string;
}

export default function FooterPreview({
  brandName = "VietWay",
  tagline = "Nghệ thuật của những hành trình ý nghĩa",
  locale = defaultLocale
}: FooterPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const essentialLinks = [
    { href: '/destinations', label: 'Điểm đến' },
    { href: '/itineraries', label: 'Trải nghiệm' },
    { href: '/about', label: 'Giới thiệu' },
    { href: '/contact', label: 'Liên hệ' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-24 bg-surface-dark border-t border-content-inverse/5"
    >
      <div className="container-luxury">
        <div 
          className={`flex flex-col items-center text-center transition-all duration-1000 ease-elegant ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Brand */}
          <Link 
            href={`/${locale}`}
            className="font-serif text-3xl md:text-4xl font-light tracking-wide text-content-inverse mb-4 hover:text-accent transition-colors duration-500"
          >
            {brandName}
          </Link>
          
          {/* Tagline */}
          <p className="text-body-sm text-content-inverse/50 font-light italic mb-10">
            {tagline}
          </p>

          {/* Essential Links - Horizontal, minimal */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
            {essentialLinks.map((link, index) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`text-body-sm text-content-inverse/60 hover:text-content-inverse transition-colors duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons - Minimal */}
          <div className="flex items-center gap-6 mb-12">
            {/* Instagram */}
            <a
              href="#"
              className="text-content-inverse/40 hover:text-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
            {/* Pinterest */}
            <a
              href="#"
              className="text-content-inverse/40 hover:text-accent transition-colors duration-300"
              aria-label="Pinterest"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          {/* Decorative line */}
          <div className="w-16 h-px bg-content-inverse/10 mb-8" />

          {/* Copyright */}
          <p className="text-caption text-content-inverse/30 font-light">
            <span suppressHydrationWarning>© {new Date().getFullYear()} {brandName}.</span>
            <span className="mx-2">·</span>
            <span>All rights reserved.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
