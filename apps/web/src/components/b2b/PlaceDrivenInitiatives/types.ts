/**
 * Place-Driven Initiatives — Type Definitions
 * 
 * These types support the editorial, place-anchored approach to
 * sustainability initiatives. Each initiative is tied to a geographic
 * context and described through its operational reality.
 */

/**
 * Represents a single operational approach bullet point.
 * These describe how the initiative integrates into actual travel operations.
 */
export interface OperationalApproachItem {
  text: string;
}

/**
 * Represents a place-driven initiative.
 * 
 * Design philosophy:
 * - Anchored to specific geography (location field)
 * - Described through operations, not marketing categories
 * - No images or badges — typography and content do the work
 */
export interface Initiative {
  /** Clear, specific initiative name */
  title: string;
  /** Geographic anchor (e.g., "Northern Vietnam · Sapa Highlands") */
  location: string;
  /** Short editorial description (2-3 lines) */
  description: string;
  /** How this integrates into travel operations (max 3 bullets) */
  operationalApproach: OperationalApproachItem[];
  /** Display order (lower = first) */
  order: number;
  /** Visibility status */
  status: 'active' | 'archived';
}

/**
 * Props for the PlaceDrivenInitiatives section component.
 */
export interface PlaceDrivenInitiativesProps {
  /** Small label above section title */
  eyebrow?: string;
  /** Main section heading */
  title?: string;
  /** List of initiatives to display */
  initiatives?: Initiative[];
  /** Optional className for section wrapper */
  className?: string;
}

/**
 * Props for individual InitiativeBlock component.
 */
export interface InitiativeBlockProps {
  initiative: Initiative;
  /** Whether to show divider below this block */
  showDivider?: boolean;
}

/**
 * Props for the OperationalList component.
 */
export interface OperationalListProps {
  items: OperationalApproachItem[];
}
