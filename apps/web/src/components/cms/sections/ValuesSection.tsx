'use client';

interface ValueItem {
  icon?: string;
  title: string;
  description?: string;
}

interface ValuesSectionProps {
  config: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: ValueItem[];
    columns?: '2' | '3' | '4';
    backgroundColor?: 'default' | 'light' | 'dark';
  };
}

export function ValuesSection({ config }: ValuesSectionProps) {
  if (!config?.enabled || !config.items?.length) return null;

  const bgClasses = {
    default: 'bg-surface-primary',
    light: 'bg-surface-secondary',
    dark: 'bg-surface-dark text-content-inverse',
  };

  const columnClasses = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  };

  const isDark = config.backgroundColor === 'dark';

  return (
    <section className={`section-lg ${bgClasses[config.backgroundColor || 'light']}`}>
      <div className="container-wide">
        {/* Header */}
        {(config.eyebrow || config.title) && (
          <div className="text-center mb-16">
            {config.eyebrow && (
              <span className={`text-label-md uppercase ${isDark ? 'text-accent-light' : 'text-accent'} mb-4 block tracking-wider`}>
                {config.eyebrow}
              </span>
            )}
            {config.title && (
              <h2 className={`font-serif text-heading-xl ${isDark ? 'text-content-inverse' : 'text-content-primary'}`}>
                {config.title}
              </h2>
            )}
          </div>
        )}

        {/* Values Grid */}
        <div className={`grid ${columnClasses[config.columns || '3']} gap-8`}>
          {config.items.map((item, index) => (
            <div 
              key={index}
              className={`p-8 border ${isDark ? 'border-white/10 bg-white/5' : 'border-border-light bg-surface-primary'} transition-all duration-300 hover:border-accent`}
            >
              {item.icon && (
                <span className="text-3xl mb-4 block">{item.icon}</span>
              )}
              <h3 className={`font-serif text-heading-md mb-3 ${isDark ? 'text-content-inverse' : 'text-content-primary'}`}>
                {item.title}
              </h3>
              {item.description && (
                <p className={`text-body-md ${isDark ? 'text-content-inverse/70' : 'text-content-muted'}`}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;
