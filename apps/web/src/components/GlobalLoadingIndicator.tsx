'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Global Loading Indicator
 * Shows a centered spinner overlay during page transitions
 * More noticeable than progress bar, good for slow connections
 */
export default function GlobalLoadingIndicator() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const previousPath = useRef(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spinnerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        const isExternal = anchor.target === '_blank' || anchor.rel?.includes('external');
        const isHash = href?.startsWith('#');
        const isSameOrigin = href?.startsWith('/') || href?.startsWith(window.location.origin);
        
        if (href && !isExternal && !isHash && isSameOrigin) {
          const url = new URL(href, window.location.origin);
          if (url.pathname !== pathname) {
            setIsLoading(true);
            
            // Only show spinner if loading takes more than 300ms
            // This prevents flash for fast navigations
            spinnerTimeoutRef.current = setTimeout(() => {
              setShowSpinner(true);
            }, 300);
          }
        }
      }
    };

    const handlePopState = () => {
      setIsLoading(true);
      spinnerTimeoutRef.current = setTimeout(() => {
        setShowSpinner(true);
      }, 300);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== previousPath.current) {
      previousPath.current = pathname;
      
      // Clear timeouts
      if (spinnerTimeoutRef.current) {
        clearTimeout(spinnerTimeoutRef.current);
      }
      
      // Small delay before hiding to ensure smooth transition
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setShowSpinner(false);
      }, 100);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (spinnerTimeoutRef.current) {
        clearTimeout(spinnerTimeoutRef.current);
      }
    };
  }, [pathname]);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        showSpinner ? 'bg-white/60 backdrop-blur-sm' : 'bg-transparent'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      {/* Spinner - only visible after delay */}
      <div
        className={`flex flex-col items-center gap-4 transition-opacity duration-300 ${
          showSpinner ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Elegant spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-12 h-12 rounded-full border-2 border-gray-200" />
          {/* Spinning arc */}
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
        </div>
        
        {/* Loading text */}
        <p className="text-sm text-gray-500 font-light tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
