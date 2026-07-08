'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useCurrentLocale } from '@/components/LocaleProvider';
import { addLocaleToPathname, formatMessage } from '@/i18n';
import { getImageUrl } from '@/lib/api';
import { SiteFooterConfig, Media } from '@/types';

interface LocalizedFooterProps {
  cmsConfig?: SiteFooterConfig;
}

// Helper to get media URL
function getMediaUrl(media: Media | string | undefined): string | undefined {
  if (!media) return undefined;
  if (typeof media === 'string') return media;
  return media.url;
}

// Elegant social icons for luxury brand
const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  pinterest: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  ),
  tiktok: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
};

// Decorative ornament component
const Ornament = ({ className = '' }: { className?: string }) => (
  <svg className={`h-3 ${className}`} viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 6H42M58 6H100" stroke="currentColor" strokeWidth="0.5"/>
    <path d="M50 1L55 6L50 11L45 6L50 1Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
  </svg>
);

// Award/certification badge icons
const certificationIcons = {
  luxury: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="16" cy="16" r="14"/>
      <path d="M16 6L18.5 11.5L24 12.5L20 17L21 23L16 20L11 23L12 17L8 12.5L13.5 11.5L16 6Z"/>
    </svg>
  ),
  certified: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="4" y="4" width="24" height="24" rx="2"/>
      <path d="M10 16L14 20L22 12"/>
    </svg>
  ),
  partner: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="16" cy="16" r="12"/>
      <path d="M12 16C12 14 14 12 16 12C18 12 20 14 20 16C20 18 18 20 16 20"/>
      <circle cx="16" cy="16" r="3"/>
    </svg>
  ),
};

export default function LocalizedFooter({ cmsConfig }: LocalizedFooterProps = {}) {
  const dict = useTranslations();
  const currentLocale = useCurrentLocale();

  const localePath = (path: string) => addLocaleToPathname(path, currentLocale);

  // Default links if CMS not configured
  const quickLinks = [
    { href: '/', label: dict.common.home },
    { href: '/about', label: dict.common.about },
    { href: '/contact', label: dict.common.contact },
    { href: '/faq', label: dict.common.faq },
  ];

  const exploreLinks = [
    { href: '/destinations', label: dict.common.destinations },
    { href: '/cities', label: dict.destinations.cities },
    { href: '/attractions', label: dict.common.attractions },
    { href: '/itineraries', label: dict.common.itineraries },
  ];

  // CMS data with fallbacks
  const brandLogo = getMediaUrl(cmsConfig?.brand?.logo);
  const brandDescription = cmsConfig?.brand?.description || dict.footer.description;
  const socialLinks = cmsConfig?.social || [];
  const newsletterEnabled = cmsConfig?.newsletter?.enabled !== false;
  const newsletterTitle = cmsConfig?.newsletter?.title || dict.footer.newsletter;
  const newsletterDescription = cmsConfig?.newsletter?.description || dict.footer.newsletterDescription;
  const newsletterPlaceholder = cmsConfig?.newsletter?.placeholder || dict.footer.emailPlaceholder;
  const newsletterButton = cmsConfig?.newsletter?.buttonLabel || dict.footer.subscribe;
  const copyright = cmsConfig?.bottomBar?.copyright || formatMessage(dict.footer.copyright, { year: new Date().getFullYear().toString() });
  const legalLinks = cmsConfig?.bottomBar?.legalLinks || [
    { id: '1', label: dict.footer.privacyPolicy || 'Privacy Policy', link: '/privacy' },
    { id: '2', label: dict.footer.termsConditions || 'Terms & Conditions', link: '/terms' },
  ];
  const contactInfo = cmsConfig?.contact || {};

  // Use CMS columns if available
  const columns = cmsConfig?.columns && cmsConfig.columns.length > 0
    ? cmsConfig.columns.map(col => ({
        ...col,
        links: col.links.map(link => ({
          ...link,
          openInNewTab: link.openInNewTab || false,
        })),
      }))
    : [
        { id: '1', title: dict.footer.quickLinks, links: quickLinks.map((l, i) => ({ id: String(i), label: l.label, link: l.href, openInNewTab: false })) },
        { id: '2', title: dict.footer.explore, links: exploreLinks.map((l, i) => ({ id: String(i), label: l.label, link: l.href, openInNewTab: false })) },
      ];

  return (
    <footer className="relative bg-[#0f0f0f] text-gray-300 overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Top Decorative Border */}
     

      {/* Pre-footer CTA Section */}
      {/* <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left">
              <p className="text-[#c4a35a] text-xs tracking-[0.3em] uppercase mb-4 font-light">
                Exclusive Partnerships
              </p>
              <h2 className="font-serif text-2xl lg:text-3xl text-white font-light tracking-wide">
                Craft Extraordinary Journeys Together
              </h2>
            </div>
            <Link
              href={localePath('/contact')}
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-[#c4a35a]/40 text-[#c4a35a] text-xs tracking-[0.25em] uppercase font-light overflow-hidden transition-all duration-700 hover:border-[#c4a35a]"
            >
              <span className="absolute inset-0 bg-[#c4a35a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              <span className="relative group-hover:text-[#0f0f0f] transition-colors duration-700">Partner With Us</span>
              <svg className="relative w-4 h-4 group-hover:text-[#0f0f0f] transform group-hover:translate-x-1 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Section - Wider */}
          <div className="lg:col-span-5 lg:pr-12">
            <Link 
              href={localePath('/')} 
              className="inline-block mb-10 group"
            >
              {brandLogo ? (
                <Image
                  src={getImageUrl(brandLogo)!}
                  alt={dict.common.siteName}
                  width={180}
                  height={60}
                  className="h-14 w-auto"
                />
              ) : (
                <div className="flex flex-col">
                  <span className="text-4xl text-white font-serif tracking-wide">
                    <span className="font-light italic text-[#c4a35a]">Viet</span>
                    <span className="font-normal">Way</span>
                  </span>
                  <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 mt-1">
                    {dict.footer.luxuryTravelPartner || 'Luxury Travel Partner'}
                  </span>
                </div>
              )}
            </Link>
            
            <p className="text-[15px] leading-[1.9] mb-10 max-w-md text-gray-400 font-light">
              {brandDescription}
            </p>

            {/* Contact Info Block */}
            {(contactInfo.email || contactInfo.phone || contactInfo.address) && (
              <div className="mb-10 space-y-4 border-l-2 border-[#c4a35a]/30 pl-6">
                {contactInfo.email && (
                  <div className="group">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm text-gray-300 hover:text-[#c4a35a] transition-colors duration-500">
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="group">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">{dict.footer.telephone || 'Telephone'}</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-sm text-gray-300 hover:text-[#c4a35a] transition-colors duration-500">
                      {contactInfo.phone}
                    </a>
                  </div>
                )}
                {contactInfo.address && (
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">{dict.contact.office}</p>
                    <p className="text-sm text-gray-300">{contactInfo.address}</p>
                  </div>
                )}
              </div>
            )}

            {/* Social Links - Refined */}
            <div className="flex items-center gap-1">
              {socialLinks.length > 0 ? (
                socialLinks.map((social, idx) => (
                  <a
                    key={social.id || social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#c4a35a] transition-all duration-500"
                    aria-label={social.platform}
                  >
                    <span className="absolute inset-0 border border-transparent group-hover:border-[#c4a35a]/30 transition-all duration-500" />
                    {socialIcons[social.platform] || socialIcons.facebook}
                  </a>
                ))
              ) : (
                ['linkedin', 'instagram', 'facebook', 'youtube'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="group relative w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#c4a35a] transition-all duration-500"
                    aria-label={platform}
                  >
                    <span className="absolute inset-0 border border-transparent group-hover:border-[#c4a35a]/30 transition-all duration-500" />
                    {socialIcons[platform as keyof typeof socialIcons]}
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-8">
              {columns.slice(0, 2).map((column) => (
                <div key={column.id || column.title}>
                  <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#c4a35a] mb-8 font-medium">
                    {column.title}
                  </h3>
                  <ul className="space-y-5">
                    {column.links.map((item) => (
                      <li key={item.id || item.link}>
                        <Link
                          href={item.openInNewTab ? item.link : localePath(item.link)}
                          target={item.openInNewTab ? '_blank' : undefined}
                          rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="group relative inline-flex items-center text-[14px] text-gray-400 hover:text-white transition-colors duration-500 font-light"
                        >
                          <span className="absolute -left-4 w-0 h-[1px] bg-[#c4a35a] group-hover:w-3 transition-all duration-500" />
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section - Premium */}
          {newsletterEnabled && (
            <div className="lg:col-span-3 lg:pl-8 lg:border-l lg:border-white/5">
              <div className="relative">
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-[#c4a35a] mb-4 font-medium">
                  {newsletterTitle}
                </h3>
                <p className="text-[14px] leading-relaxed mb-8 text-gray-400 font-light">
                  {newsletterDescription}
                </p>
                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder={newsletterPlaceholder}
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-gray-700 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#c4a35a] transition-colors duration-500 font-light"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#c4a35a] transition-all duration-500 group-focus-within:w-full" />
                  </div>
                  <button
                    type="submit"
                    className="group relative w-full py-4 bg-transparent border border-[#c4a35a]/40 text-[#c4a35a] text-[11px] tracking-[0.25em] uppercase font-medium overflow-hidden transition-all duration-500 hover:border-[#c4a35a]"
                  >
                    <span className="absolute inset-0 bg-[#c4a35a] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative group-hover:text-[#0f0f0f] transition-colors duration-500 flex items-center justify-center gap-2">
                      {newsletterButton}
                      <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges Section */}
      {/* <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20 opacity-40">
            <div className="flex items-center gap-3 text-gray-500">
              {certificationIcons.luxury}
              <span className="text-[10px] tracking-[0.15em] uppercase">Luxury Travel</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              {certificationIcons.certified}
              <span className="text-[10px] tracking-[0.15em] uppercase">IATA Certified</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              {certificationIcons.partner}
              <span className="text-[10px] tracking-[0.15em] uppercase">Global Network</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Bar - Refined */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-[12px] text-gray-600 font-light tracking-wide order-2 lg:order-1" suppressHydrationWarning>
              {copyright}
            </p>
            
            {/* Legal Links */}
            <div className="flex items-center gap-8 order-1 lg:order-2">
              {legalLinks.map((link, idx) => (
                <Link 
                  key={link.id || link.link}
                  href={localePath(link.link)} 
                  className="text-[11px] text-gray-500 hover:text-[#c4a35a] transition-colors duration-500 tracking-[0.1em] uppercase font-light"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" className="text-[#c4a35a]" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" className="text-[#c4a35a]" />
          <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.5" className="text-[#c4a35a]" />
        </svg>
      </div>
    </footer>
  );
}
