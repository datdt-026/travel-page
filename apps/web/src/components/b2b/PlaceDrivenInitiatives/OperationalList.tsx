/**
 * OperationalList — Concise Bullet List for Initiative Operations
 * 
 * Displays how an initiative integrates into actual travel operations.
 * Uses en-dash prefix, muted styling, and restrained typography.
 * 
 * Design notes:
 * - No icons, no decorative bullets
 * - En-dash (–) prefix feels editorial, like a print magazine
 * - Muted text color maintains visual hierarchy
 * - Tight spacing keeps the list compact
 */

import React from 'react';
import { OperationalListProps } from './types';

export function OperationalList({ items }: OperationalListProps) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="space-y-2" role="list">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-[0.9375rem] leading-relaxed text-neutral-500 dark:text-neutral-400 pl-0"
        >
          <span className="inline-block w-5 text-neutral-400 dark:text-neutral-500 select-none" aria-hidden="true">
            –
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default OperationalList;
