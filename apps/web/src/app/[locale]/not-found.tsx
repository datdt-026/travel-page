'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n';
import { useTranslations } from '@/components/LocaleProvider';

export default function LocaleNotFound() {
  const dict = useTranslations();
  const pathname = usePathname();
  
  // Extract locale from current path
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale = locales.includes(pathSegments[0] as typeof locales[number]) 
    ? pathSegments[0] 
    : defaultLocale;
  
  const localePath = (path: string) => `/${currentLocale}${path}`;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🧭</div>
        <h1 className="font-serif text-6xl md:text-7xl font-light text-content-primary mb-4">404</h1>
        <h2 className="font-serif text-2xl font-light text-content-secondary mb-4">
          {dict.common.notFound}
        </h2>
        <p className="text-content-muted mb-8 font-light">
          {currentLocale === 'vi'
            ? 'Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={localePath('')}
            className="btn-primary"
          >
            {dict.common.backHome}
          </Link>
          <Link
            href={localePath('/destinations')}
            className="btn-secondary"
          >
            {dict.home.exploreDestinations}
          </Link>
        </div>
        <div className="mt-8 text-sm text-content-muted">
          <p>{currentLocale === 'vi' ? 'Bạn đang tìm nội dung cụ thể?' : 'Looking for something specific?'}</p>
          <div className="flex gap-4 justify-center mt-2">
            <Link href={localePath('/blog')} className="text-accent hover:text-accent-dark transition-colors">
              {dict.common.blog}
            </Link>
            <Link href={localePath('/attractions')} className="text-accent hover:text-accent-dark transition-colors">
              {dict.common.attractions}
            </Link>
            <Link href={localePath('/contact')} className="text-accent hover:text-accent-dark transition-colors">
              {dict.common.contact}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
