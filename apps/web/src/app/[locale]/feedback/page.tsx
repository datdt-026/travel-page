import type { Metadata } from 'next';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { mockImageList } from '@/assets/mockImages';
import FeedbackImageGrid from './FeedbackImageGrid';

export const dynamic = 'force-dynamic';

interface Props {
  params: { locale: string };
}

const feedbackCopy = {
  vi: {
    title: 'Phản hồi từ khách hàng',
    description:
      'Chia sẻ cảm nhận, góp ý và những khoảnh khắc đáng nhớ sau hành trình cùng Vietway Travel.',
    eyebrow: 'Feedback',
    heroTitle: 'Lắng nghe từng trải nghiệm',
    heroSubtitle:
      'Mỗi phản hồi giúp chúng tôi hoàn thiện hành trình, dịch vụ và cách đồng hành cùng du khách tốt hơn.',
    galleryTitle: 'Khoảnh khắc từ hành trình',
    gallerySubtitle:
      'Bộ ảnh được hiển thị ngẫu nhiên từ thư viện hình ảnh mock hiện có, mô phỏng những phản hồi bằng hình ảnh từ du khách.',
    imageAlt: 'Ảnh phản hồi hành trình',
  },
  en: {
    title: 'Guest Feedback',
    description:
      'Share your travel experience, suggestions, and memorable moments with Vietway Travel.',
    eyebrow: 'Feedback',
    heroTitle: 'Listening to every journey',
    heroSubtitle:
      'Every comment helps us refine our itineraries, service quality, and the way we travel with our guests.',
    galleryTitle: 'Moments from the journey',
    gallerySubtitle:
      'A randomized gallery from the existing mock image library, representing visual feedback moments from travelers.',
    imageAlt: 'Traveler feedback image',
  },
};

function getCopy(locale: string) {
  return locale === 'vi' ? feedbackCopy.vi : feedbackCopy.en;
}

function getRandomizedImages() {
  return [...mockImageList].sort(() => Math.random() - 0.5);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const copy = getCopy(locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: generateAlternateLanguages(`/${locale}/feedback`),
  };
}

export default async function FeedbackPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const copy = getCopy(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/feedback`);
  const images = getRandomizedImages().slice(0, 8);

  return (
    <main className="bg-[#f7f3ec] text-neutral-950">
      {hreflangLinks}

      <section className="border-b border-neutral-200/80 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-neutral-500">
            {copy.eyebrow}
          </p>
          <h1 className="font-serif text-5xl font-light leading-tight md:text-7xl">
            {copy.heroTitle}
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-8 text-neutral-600 md:text-lg">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      <section className="px-3 py-10 md:px-5 md:py-14">
        <div className="mx-auto max-w-[1760px]">
          <FeedbackImageGrid images={images} imageAlt={copy.imageAlt} />
        </div>
      </section>
    </main>
  );
}
