'use client';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LOAD MORE BUTTON - Quiet Luxury Design
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Minimal load more button for pagination.
 * 
 * Design Philosophy:
 * - Text-based button
 * - Không màu nổi
 * - Không to
 * - Đặt cuối danh sách
 * - Loading state tinh tế
 * - Không làm gián đoạn cảm xúc đọc
 */

interface LoadMoreProps {
  /** Click handler */
  onClick: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Has more items to load */
  hasMore: boolean;
  /** Remaining items count */
  remainingCount?: number;
  /** Button text */
  label?: string;
  /** Loading text */
  loadingLabel?: string;
}

export function LoadMore({
  onClick,
  isLoading = false,
  hasMore,
  remainingCount,
  label = 'Load more',
  loadingLabel = 'Loading',
}: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="mt-16 text-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="inline-flex items-center gap-3 text-body-md text-content-secondary hover:text-content-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-wait group"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border border-content-muted border-t-transparent rounded-full animate-spin" />
            <span>{loadingLabel}</span>
          </>
        ) : (
          <>
            <span className="underline underline-offset-4 decoration-border-light group-hover:decoration-content-muted transition-colors">
              {label}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </>
        )}
      </button>
      
      {remainingCount !== undefined && remainingCount > 0 && !isLoading && (
        <p className="mt-3 text-caption text-content-light">
          {remainingCount} more to explore
        </p>
      )}
    </div>
  );
}

export default LoadMore;
