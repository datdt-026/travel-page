'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Inner component that uses useSearchParams
 * Must be wrapped in Suspense
 */
function NavigationProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const previousPath = useRef<string | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Simulate progress while navigating
  const startProgress = useCallback(() => {
    setIsNavigating(true);
    setProgress(0);

    // Clear any existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    // Start progress animation
    let currentProgress = 0;
    progressInterval.current = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 90) {
        currentProgress = 90; // Never reach 100% until complete
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      }
      setProgress(currentProgress);
    }, 200);
  }, []);

  const completeProgress = useCallback(() => {
    // Clear interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    // Complete the progress
    setProgress(100);

    // Hide after animation completes
    setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 300);
  }, []);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    previousPath.current = pathname;
  }, []);

  // Intercept link clicks to start progress immediately
  useEffect(() => {
    if (!isMounted) return;
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        const isExternal = anchor.target === '_blank' || anchor.rel?.includes('external');
        const isHash = href?.startsWith('#');
        const isSameOrigin = href?.startsWith('/') || href?.startsWith(window.location.origin);
        
        // Only start progress for internal navigation
        if (href && !isExternal && !isHash && isSameOrigin) {
          const url = new URL(href, window.location.origin);
          if (url.pathname !== pathname) {
            startProgress();
          }
        }
      }
    };

    // Handle browser back/forward
    const handlePopState = () => {
      startProgress();
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname, startProgress, isMounted]);

  // Complete progress when navigation finishes
  useEffect(() => {
    if (!isMounted) return;
    if (previousPath.current !== null && pathname !== previousPath.current) {
      previousPath.current = pathname;
      completeProgress();
    }
  }, [pathname, searchParams, completeProgress, isMounted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  if (!isNavigating && progress === 0) {
    return null;
  }

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page loading progress"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(245,158,11,0.7)]"
          style={{
            width: `${progress}%`,
            transition: progress === 100 ? 'width 0.2s ease-out, opacity 0.3s ease-out' : 'width 0.3s ease-out',
            opacity: progress === 100 ? 0 : 1,
          }}
        />
      </div>

      {/* Optional: Subtle overlay for better visual feedback */}
      <div
        className={`fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-300 ${
          isNavigating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.03) 0%, transparent 50%)',
        }}
      />
    </>
  );
}

/**
 * Navigation Progress Bar Component
 * Shows a progress bar at the top of the page during navigation
 * Similar to YouTube/GitHub loading indicator
 * 
 * Wrapped in Suspense to handle useSearchParams properly
 */
export default function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressInner />
    </Suspense>
  );
}
