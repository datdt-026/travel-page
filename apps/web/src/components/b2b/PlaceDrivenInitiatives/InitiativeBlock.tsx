/**
 * InitiativeBlock — Individual Initiative Display
 * 
 * Renders a single place-driven initiative with:
 * - Title (serif, prominent)
 * - Location meta (small, muted)
 * - Editorial description
 * - Operational approach bullets
 * 
 * Design philosophy:
 * - No cards, no boxes, no rounded corners
 * - Typography and spacing create hierarchy
 * - Subtle hover interaction on title only
 * - Generous whitespace communicates premium positioning
 */

'use client';

import React from 'react';
import { InitiativeBlockProps } from './types';
import { OperationalList } from './OperationalList';

export function InitiativeBlock({ initiative, showDivider = true }: InitiativeBlockProps) {
  const { title, location, description, operationalApproach } = initiative;

  return (
    <article className="group">
      {/* Initiative Content */}
      <div className="max-w-2xl">
        {/* Header: Title + Location */}
        <header className="mb-5">
          <h3 className="font-serif text-[1.625rem] md:text-[1.75rem] font-normal text-neutral-900 dark:text-neutral-100 leading-tight tracking-[-0.01em] transition-colors duration-300 group-hover:text-amber-800 dark:group-hover:text-amber-500">
            {title}
          </h3>
          {location && (
            <p className="mt-2 text-[0.8125rem] text-neutral-500 dark:text-neutral-400 tracking-wide">
              {location}
            </p>
          )}
        </header>

        {/* Description */}
        {description && (
          <p className="text-base leading-[1.75] text-neutral-700 dark:text-neutral-300 mb-5">
            {description}
          </p>
        )}

        {/* Operational Approach */}
        {operationalApproach && operationalApproach.length > 0 && (
          <div className="mt-5">
            <OperationalList items={operationalApproach} />
          </div>
        )}
      </div>

      {/* Divider */}
      {showDivider && (
        <div 
          className="mt-12 mb-12 border-t border-neutral-200/60 dark:border-neutral-700/40" 
          role="separator" 
          aria-hidden="true" 
        />
      )}
    </article>
  );
}

export default InitiativeBlock;
