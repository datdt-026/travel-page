'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useCurrentLocale } from '@/components/LocaleProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { addLocaleToPathname } from '@/i18n';
import { getImageUrl } from '@/lib/api';
import { SiteHeaderConfig, Media } from '@/types';

interface MegaMenuHeaderPremiumProps {
  forceTransparent?: boolean;
  cmsConfig?: SiteHeaderConfig;
}

interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  children?: SubMenuItem[];
  featured?: {
    title: string;
    subtitle: string;
    image?: string;
    href: string;
  };
  highlight?: {
    title: string;
    items: { label: string; href: string }[];
  };
}

// Helper to get media URL
function getMediaUrl(media: Media | string | undefined): string | undefined {
  if (!media) return undefined;
  if (typeof media === 'string') return media;
  return media.url;
}

export default function MegaMenuHeaderPremium({ forceTransparent = false, cmsConfig }: MegaMenuHeaderPremiumProps) {
  const dict = useTranslations();
  const currentLocale = useCurrentLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const effectiveIsScrolled = isMounted ? isScrolled : false;
  const isTransparent = forceTransparent || !effectiveIsScrolled;

  const localePath = (path: string) => addLocaleToPathname(path, currentLocale);
  const isVietnamese = currentLocale === 'vi';
  const headerText = {
    allDestinations: isVietnamese ? 'Tất cả điểm đến' : 'All Destinations',
    allDestinationsDescription: isVietnamese
      ? 'Khám phá toàn bộ mạng lưới điểm đến của chúng tôi tại Đông Nam Á'
      : 'Explore our complete coverage across Southeast Asia',
    citiesDescription: isVietnamese
      ? 'Trải nghiệm đô thị và các thủ phủ văn hóa'
      : 'Urban experiences and cultural capitals',
    attractionsDescription: isVietnamese
      ? 'Các điểm tham quan và biểu tượng được chọn lọc'
      : 'Curated sites and iconic landmarks',
    itinerariesDescription: isVietnamese
      ? 'Hành trình mẫu và chương trình du lịch'
      : 'Sample journeys and travel programs',
    southeastAsia: isVietnamese ? 'Đông Nam Á' : 'Southeast Asia',
    popularDestinations: isVietnamese ? 'Điểm đến phổ biến' : 'Popular Destinations',
    services: isVietnamese ? 'Dịch vụ của chúng tôi' : 'Our Services',
    servicesDescription: isVietnamese
      ? 'Giải pháp DMC toàn diện cho chuyên gia du lịch'
      : 'Comprehensive DMC solutions for travel professionals',
    sustainabilityDescription: isVietnamese
      ? 'Cam kết của chúng tôi với du lịch có trách nhiệm'
      : 'Our commitment to responsible tourism',
    caseStudiesDescription: isVietnamese
      ? 'Câu chuyện thành công và phản hồi từ khách hàng'
      : 'Success stories and client testimonials',
    dmcExcellence: isVietnamese ? 'Năng lực DMC chuyên nghiệp' : 'DMC Excellence',
    dmcSubtitle: isVietnamese
      ? 'Hơn 15 năm kiến tạo trải nghiệm du lịch khác biệt'
      : '15+ years crafting exceptional travel experiences',
    partnerWithUsDescription: isVietnamese
      ? 'Khám phá các cơ hội hợp tác'
      : 'Discover collaboration opportunities',
    partnerInquiryDescription: isVietnamese
      ? 'Bắt đầu trao đổi với đội ngũ của chúng tôi'
      : 'Start a conversation with our team',
    joinNetwork: isVietnamese ? 'Tham gia mạng lưới của chúng tôi' : 'Join Our Network',
    joinNetworkSubtitle: isVietnamese
      ? 'Được tin tưởng bởi hơn 100 đối tác du lịch toàn cầu'
      : 'Trusted by 100+ travel partners worldwide',
    ourStory: isVietnamese ? 'Câu chuyện của chúng tôi' : 'Our Story',
    ourStoryDescription: isVietnamese
      ? 'Hành trình định hình nên chúng tôi hôm nay'
      : 'The journey that shaped who we are',
    blogDescription: isVietnamese
      ? 'Góc nhìn du lịch và hướng dẫn điểm đến'
      : 'Travel insights and destination guides',
    contactDescription: isVietnamese
      ? 'Kết nối với đội ngũ của chúng tôi'
      : 'Get in touch with our team',
    fallbackMessage: isVietnamese
      ? 'Khám phá những hành trình khác biệt được tạo nên bằng sự tỉ mỉ và đam mê'
      : 'Discover extraordinary journeys crafted with precision and passion',
  };

  // Define mega menu structure with rich content
  const menuItems: MenuItem[] = [
    {
      id: 'destinations',
      label: dict.common.destinations,
      href: '/destinations',
      children: [
        { 
          label: headerText.allDestinations, 
          href: '/destinations', 
          description: headerText.allDestinationsDescription
        },
        { 
          label: dict.common.cities || dict.destinations.cities, 
          href: '/cities', 
          description: headerText.citiesDescription
        },
        { 
          label: dict.common.attractions, 
          href: '/attractions', 
          description: headerText.attractionsDescription
        },
        { 
          label: dict.common.itineraries, 
          href: '/itineraries', 
          description: headerText.itinerariesDescription
        },
      ],
      featured: {
        title: headerText.southeastAsia,
        subtitle: 'Vietnam • Cambodia • Laos • Thailand • Myanmar',
        image: '/images/destinations-featured.jpg',
        href: '/destinations',
      },
      highlight: {
        title: headerText.popularDestinations,
        items: [
          { label: 'Hanoi', href: '/cities/hanoi' },
          { label: 'Ho Chi Minh City', href: '/cities/ho-chi-minh' },
          { label: 'Ha Long Bay', href: '/attractions/ha-long-bay' },
          { label: 'Siem Reap', href: '/cities/siem-reap' },
        ],
      },
    },
    {
      id: 'expertise',
      label: dict.common.expertise || 'Expertise',
      href: '/expertise',
      children: [
        { 
          label: headerText.services, 
          href: '/expertise', 
          description: headerText.servicesDescription
        },
        { 
          label: dict.common.sustainability || 'Sustainability', 
          href: '/sustainability', 
          description: headerText.sustainabilityDescription
        },
        { 
          label: dict.common.caseStudies || 'Case Studies', 
          href: '/case-studies', 
          description: headerText.caseStudiesDescription
        },
      ],
      featured: {
        title: headerText.dmcExcellence,
        subtitle: headerText.dmcSubtitle,
        image: '/images/expertise-featured.jpg',
        href: '/expertise',
      },
    },
    {
      id: 'partnership',
      label: dict.common.partnership || 'Partnership',
      href: '/partners',
      children: [
        { 
          label: dict.common.partners || 'Partner With Us', 
          href: '/partners', 
          description: headerText.partnerWithUsDescription
        },
        { 
          label: dict.common.partnerInquiry || 'Partnership Inquiry', 
          href: '/partners/inquiry', 
          description: headerText.partnerInquiryDescription
        },
      ],
      featured: {
        title: headerText.joinNetwork,
        subtitle: headerText.joinNetworkSubtitle,
        image: '/images/partnership-featured.jpg',
        href: '/partners',
      },
    },
    {
      id: 'about',
      label: dict.common.about,
      href: '/about',
      children: [
        { 
          label: headerText.ourStory, 
          href: '/about', 
          description: headerText.ourStoryDescription
        },
        { 
          label: dict.common.blog, 
          href: '/blog', 
          description: headerText.blogDescription
        },
        { 
          label: dict.common.contact, 
          href: '/contact', 
          description: headerText.contactDescription
        },
      ],
    },
  ];

  // CTA button configuration
  const ctaEnabled = cmsConfig?.ctaButton?.enabled !== false;
  const ctaLabel = cmsConfig?.ctaButton?.label || dict.common.partnerInquiry || 'Inquire Now';
  const ctaLink = cmsConfig?.ctaButton?.link || '/partners/inquiry';

  // Logo configuration
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
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const textColor = isTransparent ? 'text-white' : 'text-[#1C1C1C]';
  const textColorMuted = isTransparent ? 'text-white/80' : 'text-[#666]';

  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-500 ease-out
          ${effectiveIsScrolled && !forceTransparent
            ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] py-4'
            : 'bg-transparent py-6'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={localePath('/')}
              className={`flex-shrink-0 transition-colors duration-300 ${textColor}`}
            >
              {logoImage || logoLightImage ? (
                <Image
                  src={getImageUrl((effectiveIsScrolled && !forceTransparent ? logoImage : logoLightImage) || logoImage || '')!}
                  alt={logoAlt}
                  width={140}
                  height={48}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="flex items-center">
                  <span className="text-xl tracking-[0.3em] uppercase font-extralight">
                    Viet<span className="font-normal">Way</span>
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(item.id)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={localePath(item.href)}
                    className={`
                      flex items-center gap-1.5 px-4 py-3 
                      text-[13px] tracking-[0.1em] font-light uppercase
                      transition-all duration-300 relative
                      ${activeMenu === item.id 
                        ? textColor
                        : textColorMuted
                      }
                      hover:${isTransparent ? 'text-white' : 'text-[#1C1C1C]'}
                    `}
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ml-1 ${
                          activeMenu === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {/* Active indicator */}
                    <span 
                      className={`
                        absolute bottom-0 left-5 right-5 h-px bg-current
                        transition-transform duration-300 origin-left
                        ${activeMenu === item.id ? 'scale-x-100' : 'scale-x-0'}
                      `}
                    />
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right side - CTA & Language */}
            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              {showLanguageSwitcher && (
                <LanguageSwitcher currentLocale={currentLocale} />
              )}
              
              {ctaEnabled && (
                <Link
                  href={localePath(ctaLink)}
                  className={`
                    px-7 py-3 text-[11px] tracking-[0.2em] uppercase font-normal
                    transition-all duration-500 border relative overflow-hidden group
                    ${isTransparent
                      ? 'bg-transparent text-white border-white/40 hover:bg-white hover:text-[#1C1C1C] hover:border-white'
                      : 'bg-[#1C1C1C] text-white border-[#1C1C1C] hover:bg-transparent hover:text-[#1C1C1C]'
                    }
                  `}
                >
                  <span className="relative z-10">{ctaLabel}</span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${textColor}`}
              aria-label={isVietnamese ? 'Mở hoặc đóng menu' : 'Toggle menu'}
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
                    strokeWidth={1}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mega Menu Dropdown - Centered container with max width */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[72px] left-0 right-0 z-40 flex justify-center"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMenuLeave}
          >
            <div className="w-full max-w-5xl mx-4 lg:mx-8 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden">
              {menuItems.map((item) => (
                item.id === activeMenu && (
                  <div key={item.id}>
                    <div className="p-8 lg:p-10">
                      <div className="grid grid-cols-10 gap-6 lg:gap-8">
                        {/* Menu Items - Left Section (2/10) */}
                        <div className="col-span-10 lg:col-span-2">
                          <div className="space-y-0.5">
                            {item.children?.map((child, idx) => (
                              <Link
                                key={idx}
                                href={localePath(child.href)}
                                className="group block py-3 border-b border-[#f5f5f5] last:border-0 transition-all duration-300"
                                onClick={() => setActiveMenu(null)}
                              >
                                <span className="block text-[14px] font-medium text-[#1C1C1C] group-hover:text-[#C4A35A] transition-colors duration-300">
                                  {child.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Highlight links below menu items */}
                          {item.highlight && (
                            <div className="mt-6 pt-6 border-t border-[#f0f0f0]">
                              <h4 className="text-[10px] tracking-[0.15em] uppercase text-[#999] mb-3 font-normal">
                                {item.highlight.title}
                              </h4>
                              <div className="space-y-2">
                                {item.highlight.items.slice(0, 3).map((link, idx) => (
                                  <Link
                                    key={idx}
                                    href={localePath(link.href)}
                                    className="block text-[12px] text-[#666] hover:text-[#C4A35A] transition-colors duration-300 font-light"
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Featured Section - Right (8/10) */}
                        {item.featured && (
                          <div className="col-span-10 lg:col-span-8">
                            <Link 
                              href={localePath(item.featured.href)}
                              className="group block relative overflow-hidden rounded-lg h-full min-h-[200px] lg:min-h-[220px]"
                              onClick={() => setActiveMenu(null)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] to-[#2a2a2a] opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
                              
                              {/* Decorative pattern */}
                              <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-0 right-0 w-1/2 h-full" 
                                  style={{ 
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                    backgroundSize: '24px 24px'
                                  }} 
                                />
                              </div>
                              
                              <div className="relative h-full p-6 lg:p-8 flex flex-col justify-end">
                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C4A35A] mb-2 font-normal">
                                  {dict.common.featured || 'Featured'}
                                </span>
                                <h3 className="text-xl lg:text-2xl font-light text-white mb-2 tracking-wide">
                                  {item.featured.title}
                                </h3>
                                <p className="text-[13px] text-white/60 font-light">
                                  {item.featured.subtitle}
                                </p>
                                
                                <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                                  <span className="text-[11px] tracking-[0.1em] uppercase font-light">{dict.common.explore || dict.common.viewAll}</span>
                                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          </div>
                        )}

                        {/* If no featured, show decorative element (8/10) */}
                        {!item.featured && (
                          <div className="col-span-10 lg:col-span-8 flex items-center justify-center bg-[#fafafa] rounded-lg min-h-[180px]">
                            <div className="text-center px-8">
                              <div className="w-px h-12 bg-[#e5e5e5] mx-auto mb-4" />
                              <p className="text-[13px] text-[#999] font-light max-w-md">
                                {headerText.fallbackMessage}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-0 bg-white z-40"
          >
            <div className="h-full overflow-y-auto">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#f0f0f0]">
                <Link href={localePath('/')} onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="text-xl tracking-[0.3em] uppercase font-extralight text-[#1C1C1C]">
                    Viet<span className="font-normal">Way</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#1C1C1C]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-6">
                {menuItems.map((item) => (
                  <MobileMenuItem 
                    key={item.id} 
                    item={item} 
                    localePath={localePath}
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>

              {/* Mobile Footer */}
              <div className="p-6 border-t border-[#f0f0f0] mt-auto">
                <div className="flex flex-col gap-4">
                  {showLanguageSwitcher && (
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] tracking-[0.1em] uppercase text-[#888]">{dict.common.languageLabel || dict.common.language}</span>
                      <LanguageSwitcher currentLocale={currentLocale} />
                    </div>
                  )}
                  {ctaEnabled && (
                    <Link
                      href={localePath(ctaLink)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-4 bg-[#1C1C1C] text-white text-center text-[12px] tracking-[0.2em] uppercase"
                    >
                      {ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile Menu Item Component
function MobileMenuItem({ 
  item, 
  localePath, 
  onClose 
}: { 
  item: MenuItem; 
  localePath: (path: string) => string;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={localePath(item.href)}
        onClick={onClose}
        className="block py-5 text-[15px] text-[#1C1C1C] font-light tracking-wide border-b border-[#f5f5f5]"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-[#f5f5f5]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-[15px] text-[#1C1C1C] font-light tracking-wide"
      >
        {item.label}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4 space-y-1">
              {item.children.map((child, idx) => (
                <Link
                  key={idx}
                  href={localePath(child.href)}
                  onClick={onClose}
                  className="block py-3 text-[14px] text-[#666] hover:text-[#1C1C1C] transition-colors font-light"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
