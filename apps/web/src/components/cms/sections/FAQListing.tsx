'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQListingProps {
  items: FAQItem[];
  config?: {
    showCategories?: boolean;
    style?: 'accordion' | 'cards' | 'list';
    allowMultipleOpen?: boolean;
    expandFirstItem?: boolean;
  };
  searchConfig?: {
    enabled?: boolean;
    placeholder?: string;
  };
}

export function FAQListing({ items, config, searchConfig }: FAQListingProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (config?.expandFirstItem && items.length > 0) {
      return new Set([items[0].id]);
    }
    return new Set();
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = config?.showCategories
    ? Array.from(new Set(items.map((item) => item.category).filter(Boolean)))
    : [];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!config?.allowMultipleOpen) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  // Group by category if enabled
  const groupedItems = config?.showCategories
    ? filteredItems.reduce((acc, item) => {
        const cat = item.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {} as Record<string, FAQItem[]>)
    : { '': filteredItems };

  return (
    <div>
      {/* Search */}
      {searchConfig?.enabled && (
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchConfig.placeholder || 'Search FAQs...'}
              className="w-full px-6 py-4 bg-surface-primary border border-border-light focus:outline-none focus:border-accent transition-colors duration-300 text-content-primary pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-label-sm uppercase tracking-wider transition-colors duration-300 ${
              !activeCategory
                ? 'bg-accent text-white'
                : 'bg-surface-secondary text-content-muted hover:bg-surface-tertiary'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as string)}
              className={`px-4 py-2 text-label-sm uppercase tracking-wider transition-colors duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-surface-secondary text-content-muted hover:bg-surface-tertiary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* FAQ List */}
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category} className="mb-8 last:mb-0">
          {category && config?.showCategories && (
            <h3 className="font-serif text-heading-md text-content-primary mb-4 pb-2 border-b border-border-light">
              {category}
            </h3>
          )}

          {config?.style === 'cards' ? (
            // Cards Style
            <div className="grid md:grid-cols-2 gap-4">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 bg-surface-secondary border border-border-light hover:border-accent transition-colors duration-300"
                >
                  <h4 className="font-serif text-heading-sm text-content-primary mb-3">
                    {item.question}
                  </h4>
                  <p className="text-body-md text-content-muted">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : config?.style === 'list' ? (
            // Simple List Style
            <div className="space-y-6">
              {categoryItems.map((item) => (
                <div key={item.id} className="border-b border-border-light pb-6 last:border-0">
                  <h4 className="font-serif text-heading-sm text-content-primary mb-2">
                    {item.question}
                  </h4>
                  <p className="text-body-md text-content-muted">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // Accordion Style (default)
            <div className="space-y-2">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-border-light bg-surface-primary"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-surface-secondary transition-colors duration-300"
                  >
                    <span className="font-serif text-heading-sm text-content-primary pr-4">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${
                        openItems.has(item.id) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openItems.has(item.id) ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-body-md text-content-muted">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-content-muted text-body-lg">
            No FAQs found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default FAQListing;
