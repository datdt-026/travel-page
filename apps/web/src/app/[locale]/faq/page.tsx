import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { JsonLd, generateFAQSchema } from '@/lib/seo';
import { getFAQsGroupedByCategory, getFAQPageConfig } from '@/lib/api';
import { toTitleCase } from '@/i18n/utils';
import { 
  DynamicHeroSection, 
  HeroConfig,
  FAQListing,
  ContactCTASection,
} from '@/components/cms';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

// Type for FAQ Page CMS Config
interface FAQPageConfig {
  hero?: HeroConfig;
  search?: {
    enabled?: boolean;
    placeholder?: string;
  };
  listing?: {
    showCategories?: boolean;
    style?: 'accordion' | 'cards' | 'list';
    allowMultipleOpen?: boolean;
    expandFirstItem?: boolean;
  };
  contactCta?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundColor?: 'light' | 'dark' | 'accent';
  };
  emptyState?: {
    title?: string;
    message?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const pageConfig = await getFAQPageConfig(locale) as FAQPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/faq`);

  return {
    title: pageConfig?.seo?.metaTitle || pageConfig?.hero?.title || dict.faq?.title || 'Câu hỏi thường gặp',
    description: pageConfig?.seo?.metaDescription || pageConfig?.hero?.subtitle || dict.faq?.description || 'Tìm câu trả lời cho các câu hỏi phổ biến.',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

// Fallback FAQ categories for when CMS is empty
const fallbackFaqCategories = [
  {
    category: 'using-travelsite',
    label: 'Sử dụng VietWay',
    faqs: [
      {
        id: 'fallback-1',
        question: 'Tôi lên kế hoạch chuyến đi với VietWay như thế nào?',
        answer:
          'Hãy bắt đầu bằng cách khám phá phần điểm đến để tìm nơi phù hợp, sau đó xem hướng dẫn thành phố và lịch trình gợi ý.',
      },
      {
        id: 'fallback-2',
        question: 'Tôi có thể xem hướng dẫn du lịch miễn phí không?',
        answer:
          'Có. Các hướng dẫn điểm đến, thông tin thành phố và gợi ý du lịch đều có thể truy cập miễn phí.',
      },
    ],
  },
  {
    category: 'trip-planning',
    label: 'Lên kế hoạch chuyến đi',
    faqs: [
      {
        id: 'fallback-3',
        question: 'Tôi sử dụng các lịch trình như thế nào?',
        answer:
          'Các lịch trình được thiết kế như mẫu tham khảo linh hoạt, gồm hoạt động theo từng ngày để bạn dễ điều chỉnh.',
      },
      {
        id: 'fallback-4',
        question: 'VietWay có hỗ trợ dịch vụ đặt tour không?',
        answer:
          'Website hiện tập trung vào thông tin du lịch và yêu cầu tư vấn. Các nhu cầu hợp tác hoặc tư vấn có thể gửi qua form liên hệ.',
      },
    ],
  },
];

export default async function FAQPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/faq`);
  const localePath = (path: string) => `/${locale}${path}`;

  // Fetch page config and FAQs from CMS
  const pageConfig = await getFAQPageConfig(locale) as FAQPageConfig | null;
  const { categories: cmsCategories } = await getFAQsGroupedByCategory(locale);
  
  // Use CMS data if available, otherwise use fallback
  const faqCategories = cmsCategories.length > 0 ? cmsCategories : fallbackFaqCategories;

  // Flatten questions for schema
  const allQuestions = faqCategories.flatMap((cat) => cat.faqs);

  // Hero configuration from CMS
  const heroConfig: HeroConfig = {
    ...pageConfig?.hero,
    eyebrow: pageConfig?.hero?.eyebrow || 'Hỗ trợ',
    title: pageConfig?.hero?.title || dict.faq?.title || 'Câu hỏi thường gặp',
    subtitle: pageConfig?.hero?.subtitle || dict.faq?.subtitle || 'Tìm câu trả lời cho các câu hỏi phổ biến về lập kế hoạch du lịch.',
  };

  // Contact CTA config
  const ctaConfig = pageConfig?.contactCta;
  const showCTA = ctaConfig?.enabled !== false;

  return (
    <div>
      {hreflangLinks}
      <JsonLd data={generateFAQSchema(allQuestions)} />

      {/* Dynamic Hero Section from CMS */}
      <DynamicHeroSection
        config={heroConfig}
        fallback={{
          title: dict.faq?.title || 'Câu hỏi thường gặp',
          subtitle: dict.faq?.description,
        }}
        breadcrumb={{
          homeLabel: dict.common?.home || 'Trang chủ',
          currentLabel: dict.faq?.title || 'FAQ',
        }}
      />

      <section className="section-lg bg-surface-primary">
        <div className="container-wide max-w-4xl">
          {/* FAQ Listing with CMS config */}
          <FAQListing 
            items={allQuestions.map(q => ({
              id: q.id,
              question: q.question,
              answer: q.answer,
              category: faqCategories.find(c => c.faqs.includes(q))?.label,
            }))}
            config={{
              showCategories: pageConfig?.listing?.showCategories !== false,
              style: pageConfig?.listing?.style || 'accordion',
              allowMultipleOpen: pageConfig?.listing?.allowMultipleOpen,
              expandFirstItem: pageConfig?.listing?.expandFirstItem !== false,
            }}
            searchConfig={{
              enabled: pageConfig?.search?.enabled !== false,
              placeholder: pageConfig?.search?.placeholder || dict.faq?.searchPlaceholder || 'Tìm kiếm câu hỏi thường gặp...',
            }}
          />

          {/* CTA - Dynamic from CMS */}
          <div className="mt-20">
            <ContactCTASection config={{
              enabled: showCTA,
              title: ctaConfig?.title || dict.faq?.stillHaveQuestions || 'Vẫn còn câu hỏi?',
              subtitle: ctaConfig?.subtitle || dict.faq?.contactUs || 'Không tìm thấy nội dung bạn cần? Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ.',
              buttonText: ctaConfig?.buttonText || dict.contact?.title || 'Liên hệ',
              buttonLink: ctaConfig?.buttonLink || localePath('/contact'),
              backgroundColor: ctaConfig?.backgroundColor || 'light',
            }} />
          </div>
        </div>
      </section>
    </div>
  );
}
