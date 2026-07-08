import Link from 'next/link';
import { JsonLd, generateBreadcrumbSchema, BreadcrumbItem } from '@/lib/seo';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ name: 'Home', url: '/' }, ...items];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(allItems)} />
      <nav
        aria-label="Breadcrumb"
        className={`text-sm text-gray-600 ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={item.url} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
