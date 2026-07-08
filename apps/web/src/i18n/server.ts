import 'server-only';

// Re-export getDictionary for server components only
// This file should only be imported in Server Components
export { getDictionary } from './dictionaries';
export type { Dictionary } from './dictionaries';
