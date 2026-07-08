'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useCurrentLocale, useTranslations } from '@/components/LocaleProvider';
import { addLocaleToPathname } from '@/i18n';

interface ContactToolbarProps {
  /** Email address for direct contact */
  email?: string;
  /** Phone number for scheduling calls */
  phone?: string;
  /** Enable chat option (lowest priority) */
  showChat?: boolean;
  /** Custom inquiry page path */
  inquiryPath?: string;
  /** Custom schedule call path */
  schedulePath?: string;
}

// Contact option configuration
interface ContactOption {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function ContactToolbar({
  email = 'inquiries@vietway.com',
  phone,
  showChat = false,
  inquiryPath = '/contact',
  schedulePath = '/contact?action=schedule',
}: ContactToolbarProps) {
  const dict = useTranslations();
  const currentLocale = useCurrentLocale();
  const localePath = (path: string) => addLocaleToPathname(path, currentLocale);
  const contactText = dict.contactToolbar || {};

  // Desktop hover state
  const [isExpanded, setIsExpanded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Mobile overlay state
  const [mobileOverlayOpen, setMobileOverlayOpen] = useState(false);
  
  // Visibility state - show after scrolling past first section
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll position for visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile overlay on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOverlayOpen) {
        setMobileOverlayOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOverlayOpen]);

  // Prevent body scroll when mobile overlay is open
  useEffect(() => {
    if (mobileOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOverlayOpen]);

  // Handle desktop hover with delay
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 300); // Grace period before closing
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Define contact options with conversational labels
  const options: ContactOption[] = [
    {
      id: 'write',
      label: contactText.writeToUs || 'Write to us',
      href: localePath(inquiryPath),
    },
    {
      id: 'email',
      label: contactText.sendNote || 'Send a note',
      href: `mailto:${email}`,
      external: true,
    },
    {
      id: 'call',
      label: contactText.requestCall || 'Request a call',
      href: localePath(schedulePath),
    },
  ];

  // Add chat if enabled
  if (showChat) {
    options.push({
      id: 'chat',
      label: contactText.startConversation || 'Start a conversation',
      onClick: () => {
        // TODO: Integrate with chat service (Intercom, Crisp, etc.)
        setMobileOverlayOpen(false);
      },
    });
  }

  const handleOptionClick = useCallback(() => {
    setMobileOverlayOpen(false);
    setIsExpanded(false);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP: Edge-anchored text presence
          - Bottom-right corner, within the page margin
          - Text-only, no container
          - Expands on hover to reveal options
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className={`
          fixed bottom-12 right-8 lg:right-12 z-40
          hidden md:block
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        role="navigation"
        aria-label={contactText.ariaLabel || 'Contact options'}
      >
        <div className="text-right">
          {/* Anchor text - always visible when scrolled */}
          <button
            type="button"
            className="
              text-[15px] text-stone-500 hover:text-stone-300
              font-light tracking-wide
              transition-colors duration-300 ease-out
              focus:outline-none focus-visible:text-stone-300
              cursor-pointer
            "
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {contactText.speakWithUs || 'Speak with us'}
          </button>

          {/* Expanded options - revealed on hover/focus */}
          <div
            className={`
              mt-4 space-y-3
              transition-all duration-200 ease-out
              ${isExpanded 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
              }
            `}
            role="menu"
          >
            {options.map((option) => (
              option.href ? (
                <Link
                  key={option.id}
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className="
                    block text-[14px] text-stone-600 hover:text-stone-200
                    font-light tracking-wide
                    transition-colors duration-200 ease-out
                    focus:outline-none focus-visible:text-stone-200
                  "
                  role="menuitem"
                  onClick={handleOptionClick}
                >
                  {option.label}
                </Link>
              ) : (
                <button
                  key={option.id}
                  type="button"
                  className="
                    block text-[14px] text-stone-600 hover:text-stone-200
                    font-light tracking-wide
                    transition-colors duration-200 ease-out
                    focus:outline-none focus-visible:text-stone-200
                    text-right w-full
                  "
                  role="menuitem"
                  onClick={() => {
                    option.onClick?.();
                    handleOptionClick();
                  }}
                >
                  {option.label}
                </button>
              )
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE: Discreet text trigger
          - Fixed at bottom, centered
          - Single line of text, no button styling
          - Opens full-screen conversational overlay
      ═══════════════════════════════════════════════════════════════ */}
      <button
        type="button"
        className={`
          md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40
          text-[14px] text-stone-500
          font-light tracking-wide
          transition-all duration-500 ease-out
          focus:outline-none
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        `}
        aria-label={contactText.openContactOptions || 'Open contact options'}
        aria-expanded={mobileOverlayOpen}
        aria-controls="mobile-contact-overlay"
        onClick={() => setMobileOverlayOpen(true)}
      >
        <span className="border-b border-stone-600/30 pb-0.5">
          {contactText.speakWithUs || 'Speak with us'}
        </span>
      </button>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE: Full-screen conversational overlay
          - Clean, warm background
          - Centered content with generous whitespace
          - Feels like opening a private note
      ═══════════════════════════════════════════════════════════════ */}
      <div
        id="mobile-contact-overlay"
        className={`
          md:hidden fixed inset-0 z-50
          bg-[#1c1a18]
          transition-all duration-300 ease-out
          ${mobileOverlayOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
        role="dialog"
        aria-modal="true"
        aria-label={contactText.ariaLabel || 'Contact options'}
      >
        {/* Close button - subtle, top right */}
        <button
          type="button"
          className="
            absolute top-6 right-6
            text-stone-600 hover:text-stone-400
            transition-colors duration-200
            focus:outline-none
            p-2 -m-2
          "
          aria-label={contactText.close || 'Close'}
          onClick={() => setMobileOverlayOpen(false)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Centered content */}
        <div 
          className={`
            flex flex-col items-center justify-center
            min-h-full px-8 py-20
            transition-all duration-300 ease-out delay-100
            ${mobileOverlayOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
        >
          {/* Headline */}
          <h2 className="text-[22px] text-stone-300 font-light tracking-wide mb-12">
            {contactText.howCanWeHelp || 'How can we help?'}
          </h2>

          {/* Options as stacked text */}
          <nav className="space-y-6 text-center" aria-label="Contact options">
            {options.map((option) => (
              option.href ? (
                <Link
                  key={option.id}
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className="
                    block text-[17px] text-stone-500 hover:text-stone-200
                    font-light tracking-wide
                    transition-colors duration-200 ease-out
                    focus:outline-none focus-visible:text-stone-200
                    py-2
                  "
                  onClick={handleOptionClick}
                >
                  {option.label}
                </Link>
              ) : (
                <button
                  key={option.id}
                  type="button"
                  className="
                    block w-full text-[17px] text-stone-500 hover:text-stone-200
                    font-light tracking-wide
                    transition-colors duration-200 ease-out
                    focus:outline-none focus-visible:text-stone-200
                    py-2
                  "
                  onClick={() => {
                    option.onClick?.();
                    handleOptionClick();
                  }}
                >
                  {option.label}
                </button>
              )
            ))}
          </nav>

          {/* Subtle footer message */}
          <p className="mt-16 text-[13px] text-stone-700 font-light tracking-wide">
            {contactText.readyMessage || "We're here when you're ready"}
          </p>
        </div>
      </div>
    </>
  );
}
