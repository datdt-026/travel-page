'use client';

import RichText from '@/components/RichText';

/**
 * Practical Essentials Component
 * 
 * Elegant presentation of practical travel information.
 * Unobtrusive but helpful for trip planning.
 * 
 * DESIGN PRINCIPLES:
 * - Minimal, understated design
 * - Does not interrupt the editorial flow
 * - Organized by category
 * - Easy to scan
 */

interface EssentialCategory {
  categoryType: string;
  title?: string;
  content?: any; // RichText
  items?: { item: string }[];
}

interface PracticalEssentialsProps {
  title?: string;
  introduction?: string;
  categories: EssentialCategory[];
  layout?: 'minimal' | 'cards' | 'accordion';
  showIcon?: boolean;
  className?: string;
}

// Category configurations
const categoryConfig: Record<string, { label: string; icon: string }> = {
  'best-time': { label: 'Best Time to Visit', icon: '◐' },
  'packing': { label: 'What to Pack', icon: '◫' },
  'getting-there': { label: 'Getting There', icon: '→' },
  'local-tips': { label: 'Local Tips', icon: '✧' },
  'climate': { label: 'Climate & Weather', icon: '◑' },
  'cultural-notes': { label: 'Cultural Notes', icon: '◇' },
  'practical': { label: 'Practical Information', icon: '○' },
};

export default function PracticalEssentials({
  title = 'Before You Go',
  introduction,
  categories,
  layout = 'minimal',
  showIcon = true,
  className = '',
}: PracticalEssentialsProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className={`py-16 md:py-24 bg-neutral-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12 md:mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-4">
            {title}
          </h2>
          {introduction && (
            <p className="text-neutral-500 font-light max-w-2xl mx-auto">
              {introduction}
            </p>
          )}
        </header>

        {/* Categories */}
        {layout === 'minimal' && (
          <div className="space-y-12">
            {categories.map((category, index) => {
              const config = categoryConfig[category.categoryType] || {
                label: category.categoryType,
                icon: '•',
              };
              const displayTitle = category.title || config.label;

              return (
                <div key={index} className="border-b border-neutral-200 pb-10 last:border-0">
                  <div className="flex items-center gap-3 mb-5">
                    {showIcon && (
                      <span className="text-neutral-400">{config.icon}</span>
                    )}
                    <h3 className="text-lg font-medium text-neutral-800">
                      {displayTitle}
                    </h3>
                  </div>
                  
                  {category.content && (
                    <div className="prose prose-neutral max-w-none font-light text-neutral-600">
                      <RichText content={category.content} />
                    </div>
                  )}
                  
                  {category.items && category.items.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-neutral-600">
                          <span className="text-neutral-300 mt-1">—</span>
                          <span className="font-light">{item.item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {layout === 'cards' && (
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => {
              const config = categoryConfig[category.categoryType] || {
                label: category.categoryType,
                icon: '•',
              };
              const displayTitle = category.title || config.label;

              return (
                <div key={index} className="bg-white p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    {showIcon && (
                      <span className="text-xl text-neutral-400">{config.icon}</span>
                    )}
                    <h3 className="text-lg font-medium text-neutral-800">
                      {displayTitle}
                    </h3>
                  </div>
                  
                  {category.content && (
                    <div className="prose prose-sm prose-neutral max-w-none font-light">
                      <RichText content={category.content} />
                    </div>
                  )}
                  
                  {category.items && category.items.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-neutral-600 font-light">
                          • {item.item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {layout === 'accordion' && (
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {categories.map((category, index) => {
              const config = categoryConfig[category.categoryType] || {
                label: category.categoryType,
                icon: '•',
              };
              const displayTitle = category.title || config.label;

              return (
                <details key={index} className="group py-5">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      {showIcon && (
                        <span className="text-neutral-400">{config.icon}</span>
                      )}
                      <h3 className="text-lg font-medium text-neutral-800">
                        {displayTitle}
                      </h3>
                    </div>
                    <span className="text-neutral-400 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  
                  <div className="mt-4 pl-7">
                    {category.content && (
                      <div className="prose prose-neutral max-w-none font-light">
                        <RichText content={category.content} />
                      </div>
                    )}
                    
                    {category.items && category.items.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-neutral-600 font-light">
                            — {item.item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
