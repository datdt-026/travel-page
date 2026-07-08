/**
 * Client-safe i18n utilities
 * These can be used in both client and server components
 */

/**
 * Helper to format messages with placeholders
 * Supports simple placeholder replacement: {key} -> value
 */
export function formatMessage(
  message: string,
  values: Record<string, string | number> = {}
): string {
  let result = message;
  
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  
  return result;
}

/**
 * Convert string to Title Case (capitalize first letter of each word)
 * Used for banner titles to ensure consistent styling
 */
export function toTitleCase(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
