/**
 * PlaceDrivenInitiatives — Main Section Component
 * 
 * An editorial, place-anchored presentation of sustainability initiatives.
 * Designed for Travel B2B websites where authenticity and operational
 * credibility matter more than marketing polish.
 * 
 * Design principles:
 * - No cards, no boxes, no gradients
 * - Typography and whitespace create visual interest
 * - Geographic anchoring signals operational reality
 * - Restrained color palette (neutral + one accent on hover)
 * - Feels like a luxury travel magazine, not a CSR report
 * 
 * CMS Integration:
 * - Filters out archived initiatives automatically
 * - Sorts by order field
 * - Falls back to default content if no CMS data
 */

'use client';

import React, { useMemo } from 'react';
import { PlaceDrivenInitiativesProps, Initiative } from './types';
import { InitiativeBlock } from './InitiativeBlock';

// Default initiatives for fallback/demo purposes
const defaultInitiatives: Initiative[] = [
  {
    title: 'Highland Homestay Development',
    location: 'Northern Vietnam · Sapa Highlands',
    description:
      'Working with Hmong and Dao communities to develop family-run guesthouses that meet international comfort standards while preserving traditional architecture and daily rhythms.',
    operationalApproach: [
      { text: 'Revenue shared 70/30 with host families, paid monthly' },
      { text: 'Maximum 6 guests per homestay to minimize disruption' },
      { text: 'Guides sourced from the same village network' },
    ],
    order: 10,
    status: 'active',
  },
  {
    title: 'River Transport Initiative',
    location: 'Mekong Delta · Cần Thơ Province',
    description:
      'Replacing diesel boats with electric alternatives for floating market tours. A phased program developed with local boat operators who retain ownership and income.',
    operationalApproach: [
      { text: 'Operators trained and certified on electric vessels' },
      { text: 'Charging infrastructure installed at three hubs' },
      { text: '40% reduction in tour-related emissions since 2024' },
    ],
    order: 20,
    status: 'active',
  },
  {
    title: 'Artisan Supply Chain',
    location: 'Central Highlands · Kon Tum Province',
    description:
      'Connecting traditional weavers directly with our tour experiences. Guests visit workshops; textiles sold are tracked back to specific artisans for fair payment.',
    operationalApproach: [
      { text: 'Direct purchasing at pre-agreed fair-trade prices' },
      { text: 'Artisan profiles included in guest briefing materials' },
      { text: 'Annual orders placed in advance to ensure income stability' },
    ],
    order: 30,
    status: 'active',
  },
];

export function PlaceDrivenInitiatives({
  eyebrow = 'What We Do',
  title = 'Our Initiatives',
  initiatives = [],
  className = '',
}: PlaceDrivenInitiativesProps) {
  // Filter and sort initiatives
  const displayInitiatives = useMemo(() => {
    const items = initiatives.length > 0 ? initiatives : defaultInitiatives;
    return items
      .filter((item) => item.status === 'active')
      .sort((a, b) => a.order - b.order);
  }, [initiatives]);

  if (displayInitiatives.length === 0) {
    return null;
  }

  return (
    <section
      className={`py-20 md:py-28 lg:py-32 bg-white dark:bg-neutral-950 ${className}`}
      aria-labelledby="initiatives-title"
    >
      <div className="container mx-auto px-5 md:px-8 lg:px-12 max-w-4xl">
        {/* Section Header */}
        <header className="mb-14 md:mb-20">
          {eyebrow && (
            <p className="text-[0.75rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 mb-4 font-medium">
              {eyebrow}
            </p>
          )}
          <h2
            id="initiatives-title"
            className="font-serif text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-normal text-neutral-900 dark:text-neutral-100 leading-[1.15] tracking-[-0.02em]"
          >
            {title}
          </h2>
        </header>

        {/* Initiatives List */}
        <div role="list">
          {displayInitiatives.map((initiative, index) => (
            <div key={`${initiative.title}-${index}`} role="listitem">
              <InitiativeBlock
                initiative={initiative}
                showDivider={index < displayInitiatives.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlaceDrivenInitiatives;
