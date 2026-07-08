import Link from 'next/link';
import { defaultLocale } from '@/i18n';

export default function NotFound() {
  // Use default locale for links since we're at root level
  const localePath = (path: string) => `/${defaultLocale}${path}`;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🧭</div>
        <h1 className="font-serif text-6xl md:text-7xl font-light text-content-primary mb-4">404</h1>
        <h2 className="font-serif text-2xl font-light text-content-secondary mb-4">
          Không tìm thấy trang
        </h2>
        <p className="text-content-muted mb-8 font-light">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href={localePath('')}
            className="btn-primary"
          >
            Về trang chủ
          </Link>
          <Link
            href={localePath('/destinations')}
            className="btn-secondary"
          >
            Khám phá điểm đến
          </Link>
        </div>
        <div className="mt-8 text-sm text-content-muted">
          <p>Bạn đang tìm nội dung cụ thể?</p>
          <div className="flex gap-4 justify-center mt-2">
            <Link href={localePath('/blog')} className="text-accent hover:text-accent-dark transition-colors">
              Blog
            </Link>
            <Link href={localePath('/attractions')} className="text-accent hover:text-accent-dark transition-colors">
              Địa điểm tham quan
            </Link>
            <Link href={localePath('/contact')} className="text-accent hover:text-accent-dark transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
