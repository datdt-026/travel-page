/**
 * Grid Utilities for Destinations Page
 * 
 * Maps CMS columnSpan values to Tailwind CSS grid column classes.
 * Uses a 4-column grid system that collapses responsively.
 */

/**
 * Get Tailwind CSS class for grid column span
 * 
 * @param columnSpan - Number of columns to span (1-4)
 * @returns Tailwind CSS class string
 * 
 * Grid behavior:
 * - Mobile (default): 1 column, all items full width
 * - Tablet (md): 2 columns
 * - Desktop (lg): 4 columns with variable spans
 */
export function getColumnSpanClass(columnSpan: number = 1): string {
  // Clamp value between 1 and 4
  const span = Math.max(1, Math.min(4, columnSpan));
  
  // Map span values to Tailwind classes
  // On mobile: all items are full width
  // On tablet (md): span is halved (max 2)
  // On desktop (lg): full span value
  const spanClasses: Record<number, string> = {
    1: 'col-span-1 md:col-span-1 lg:col-span-1',
    2: 'col-span-1 md:col-span-2 lg:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3',
    4: 'col-span-1 md:col-span-2 lg:col-span-4',
  };
  
  return spanClasses[span] || spanClasses[1];
}

/**
 * Get the grid container class for destinations
 * Uses a 4-column grid on desktop, 2 on tablet, 1 on mobile
 */
export function getDestinationsGridClass(): string {
  return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
}

/**
 * Calculate aspect ratio class based on column span
 * Wider cards get a different aspect ratio for visual balance
 * 
 * @param columnSpan - Number of columns the card spans
 * @returns Tailwind CSS aspect ratio class
 */
export function getCardAspectClass(columnSpan: number = 1): string {
  const span = Math.max(1, Math.min(4, columnSpan));
  
  // Wider cards use a more panoramic aspect ratio
  const aspectClasses: Record<number, string> = {
    1: 'aspect-[4/3]',
    2: 'aspect-[16/9]',
    3: 'aspect-[21/9]',
    4: 'aspect-[3/1]',
  };
  
  return aspectClasses[span] || aspectClasses[1];
}
