import { Metadata } from 'next';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages } from '@/lib/seo-i18n';
import { getPartnersPageConfig, getImageUrl } from '@/lib/api';
import { getMockImageSrc } from '@/assets/mockImages';
import { 
  HeroSectionPremium,
  ValuePropositionSectionPremium,
  PartnershipModelsSectionPremium,
  StatsSectionPremium,
  CTASectionPremium,
  ImageFeatureSection,
} from '@/components/b2b';
import { OnboardingProcessSection } from '@/components/b2b/OnboardingProcessSection';
import { CredentialsDownloadSection } from '@/components/b2b/CredentialsDownloadSection';
import { PartnerTestimonialHighlight } from '@/components/b2b/PartnerTestimonialHighlight';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

// Type for Partners Page CMS Config
interface PartnersPageConfig {
  hero?: {
    backgroundImage?: { url?: string } | null;
    title?: string;
    subtitle?: string;
    height?: string;
    overlayStyle?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  valueProposition?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    sectionImage?: { url?: string } | null;
    benefits?: {
      image?: { url?: string } | null;
      icon?: string;
      title?: string;
      description?: string;
    }[];
  };
  partnershipModels?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    layout?: 'cards' | 'alternating';
    models?: {
      image?: { url?: string } | null;
      icon?: string;
      title?: string;
      description?: string;
      features?: { text?: string }[];
      idealFor?: string;
    }[];
  };
  process?: {
    enabled?: boolean;
    sectionImage?: { url?: string } | null;
    eyebrow?: string;
    title?: string;
    steps?: {
      number?: string;
      title?: string;
      description?: string;
    }[];
  };
  credentials?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    downloads?: {
      title?: string;
      description?: string;
      file?: { url?: string } | null;
      requiresContact?: boolean;
    }[];
    certifications?: {
      logo?: { url?: string } | null;
      name?: string;
    }[];
  };
  stats?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      number?: string;
      label?: string;
      description?: string;
    }[];
    backgroundColor?: 'light' | 'dark' | 'accent';
  };
  testimonialHighlight?: {
    enabled?: boolean;
    quote?: string;
    authorName?: string;
    authorRole?: string;
    companyName?: string;
    companyLogo?: { url?: string } | null;
    linkText?: string;
    linkUrl?: string;
  };
  inquiryCta?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    contactEmail?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const pageConfig = await getPartnersPageConfig(locale) as PartnersPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/partners`);

  return {
    title: pageConfig?.seo?.metaTitle || 'Hợp tác cùng VietWay',
    description: pageConfig?.seo?.metaDescription || 'Đối tác quản lý điểm đến đáng tin cậy của bạn tại Đông Nam Á',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function PartnersPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, pageConfig] = await Promise.all([
    getDictionary(locale),
    getPartnersPageConfig(locale) as Promise<PartnersPageConfig | null>,
  ]);

  // Default content
  const defaultBenefits = [
    { icon: '⚡', title: 'Fast Response', description: 'Quick turnaround on quotes and inquiries, typically within 24 hours.' },
    { icon: '🤝', title: 'Dedicated Support', description: 'Personal account manager for streamlined communication and support.' },
    { icon: '💰', title: 'Competitive Rates', description: 'Volume-based pricing and preferential rates for partners.' },
    { icon: '✅', title: 'Quality Assurance', description: 'Rigorous supplier vetting and consistent service standards.' },
    { icon: '🛡️', title: 'Risk Coverage', description: 'Full insurance coverage and emergency support protocols.' },
    { icon: '📊', title: 'Transparent Operations', description: 'Clear pricing, detailed reporting, and open communication.' },
  ];

  const defaultModels = [
    {
      icon: '🎯',
      title: 'FIT Partnership',
      description: 'Flexible collaboration for individual travel bookings with per-booking arrangements.',
      features: [
        { text: 'No minimum volume commitment' },
        { text: 'Quick quote turnaround' },
        { text: 'Flexible modifications' },
        { text: '24/7 traveler support' },
      ],
      idealFor: 'Travel agencies with varied FIT requests',
    },
    {
      icon: '👥',
      title: 'Series Partnership',
      description: 'Long-term agreement for regular group departures with guaranteed allocations.',
      features: [
        { text: 'Preferential series rates' },
        { text: 'Guaranteed availability' },
        { text: 'Dedicated group coordinator' },
        { text: 'Marketing support' },
      ],
      idealFor: 'Tour operators with regular series programs',
    },
    {
      icon: '✨',
      title: 'White Label Partnership',
      description: 'Full service delivery under your brand identity with seamless integration.',
      features: [
        { text: 'Branded documentation' },
        { text: 'Direct client communication' },
        { text: 'Customized processes' },
        { text: 'Revenue sharing models' },
      ],
      idealFor: 'Agencies wanting branded ground services',
    },
  ];

  const defaultProcess = [
    { number: '01', title: 'Initial Contact', description: 'Share your requirements and business profile through our inquiry form.' },
    { number: '02', title: 'Discovery Call', description: 'Schedule a call to discuss your needs and explore collaboration opportunities.' },
    { number: '03', title: 'Proposal & Terms', description: 'Receive a tailored partnership proposal with rates and service scope.' },
    { number: '04', title: 'Agreement', description: 'Finalize partnership terms and set up your dedicated account.' },
    { number: '05', title: 'Onboarding', description: 'Complete onboarding with your account manager and start collaborating.' },
  ];

  const defaultStats = [
    { number: '7+', label: 'Years Experience', description: 'Operating since 2019' },
    { number: '50+', label: 'Active Partners', description: 'Worldwide' },
    { number: '6', label: 'Destinations', description: 'Across Southeast Asia' },
    { number: '24/7', label: 'Support', description: 'For active bookings' },
  ];

  const benefits = pageConfig?.valueProposition?.benefits?.length 
    ? pageConfig.valueProposition.benefits 
    : defaultBenefits;

  const models = pageConfig?.partnershipModels?.models?.length
    ? pageConfig.partnershipModels.models
    : defaultModels;

  const process = pageConfig?.process?.steps?.length
    ? pageConfig.process.steps
    : defaultProcess;

  const stats = pageConfig?.stats?.items?.length
    ? pageConfig.stats.items
    : defaultStats;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Premium */}
      <HeroSectionPremium
        backgroundImage={pageConfig?.hero?.backgroundImage?.url ? getImageUrl(pageConfig.hero.backgroundImage.url) : getMockImageSrc(4)}
        eyebrow="Hợp tác B2B"
        title={pageConfig?.hero?.title || 'Hợp tác cùng VietWay'}
        subtitle={pageConfig?.hero?.subtitle || 'Đối tác quản lý điểm đến đáng tin cậy tại Đông Nam Á, với chuyên môn địa phương, năng lực vận hành và cam kết chất lượng.'}
        ctaText={pageConfig?.hero?.ctaText || 'Gửi yêu cầu hợp tác'}
        ctaLink={pageConfig?.hero?.ctaLink || '/partners/inquiry'}
        secondaryCtaText="Tải hồ sơ năng lực"
        secondaryCtaLink="/about/credentials"
        height="large"
        overlayOpacity="medium"
      />

      {/* Value Proposition Section - Premium */}
      {pageConfig?.valueProposition?.enabled !== false && (
        <ValuePropositionSectionPremium
          eyebrow={pageConfig?.valueProposition?.eyebrow || 'Vì sao hợp tác với chúng tôi'}
          title={pageConfig?.valueProposition?.title || 'Thành công của bạn là sứ mệnh của chúng tôi'}
          description={pageConfig?.valueProposition?.description}
          sectionImage={pageConfig?.valueProposition?.sectionImage}
          benefits={benefits}
        />
      )}

      {/* Stats Section - Premium */}
      {pageConfig?.stats?.enabled !== false && (
        <StatsSectionPremium
          eyebrow={pageConfig?.stats?.eyebrow || 'Kết quả đã chứng minh'}
          title={pageConfig?.stats?.title || 'Năng lực được kiểm chứng'}
          stats={stats}
          variant={pageConfig?.stats?.backgroundColor === 'light' ? 'light' : 'dark'}
        />
      )}

      {/* Partnership Models Section - Premium */}
      {pageConfig?.partnershipModels?.enabled !== false && (
        <PartnershipModelsSectionPremium
          eyebrow={pageConfig?.partnershipModels?.eyebrow || 'Mô hình hợp tác'}
          title={pageConfig?.partnershipModels?.title || 'Cấu trúc hợp tác linh hoạt'}
          description={pageConfig?.partnershipModels?.description || 'Chúng tôi cung cấp mô hình hợp tác được điều chỉnh theo nhu cầu kinh doanh và mục tiêu tăng trưởng của bạn.'}
          models={models}
        />
      )}

      {/* Onboarding Process Section */}
      {pageConfig?.process?.enabled !== false && (
        <OnboardingProcessSection
          eyebrow={pageConfig?.process?.eyebrow || 'Bắt đầu hợp tác'}
          title={pageConfig?.process?.title || 'Cách chúng ta bắt đầu làm việc cùng nhau'}
          sectionImage={pageConfig?.process?.sectionImage}
          steps={process}
        />
      )}

      {/* Credentials Download Section */}
      {pageConfig?.credentials?.enabled !== false && (
        <CredentialsDownloadSection
          eyebrow={pageConfig?.credentials?.eyebrow || 'Hồ sơ năng lực'}
          title={pageConfig?.credentials?.title || 'Năng lực của chúng tôi'}
          description={pageConfig?.credentials?.description}
          downloads={pageConfig?.credentials?.downloads}
          certifications={pageConfig?.credentials?.certifications}
        />
      )}

      {/* Partner Testimonial Highlight */}
      {pageConfig?.testimonialHighlight?.enabled !== false && pageConfig?.testimonialHighlight?.quote && (
        <PartnerTestimonialHighlight
          quote={pageConfig.testimonialHighlight.quote}
          authorName={pageConfig.testimonialHighlight.authorName}
          authorRole={pageConfig.testimonialHighlight.authorRole}
          companyName={pageConfig.testimonialHighlight.companyName}
          companyLogo={pageConfig.testimonialHighlight.companyLogo}
          linkText={pageConfig.testimonialHighlight.linkText}
          linkUrl={pageConfig.testimonialHighlight.linkUrl}
        />
      )}

      {/* CTA Section - Premium */}
      {pageConfig?.inquiryCta?.enabled !== false && (
        <CTASectionPremium
          eyebrow="Bước tiếp theo"
          title={pageConfig?.inquiryCta?.title || 'Sẵn sàng trao đổi hợp tác?'}
          description={pageConfig?.inquiryCta?.description || 'Hãy chia sẻ về doanh nghiệp của bạn và cách chúng ta có thể làm việc cùng nhau. Đội ngũ của chúng tôi sẽ phản hồi trong vòng 24 giờ.'}
          primaryButtonText={pageConfig?.inquiryCta?.primaryButtonText || 'Gửi yêu cầu hợp tác'}
          primaryButtonLink={pageConfig?.inquiryCta?.primaryButtonLink || '/partners/inquiry'}
          secondaryButtonText={pageConfig?.inquiryCta?.secondaryButtonText || 'Đặt lịch gọi'}
          secondaryButtonLink={pageConfig?.inquiryCta?.secondaryButtonLink || '/contact'}
          variant="dark"
        />
      )}
    </main>
  );
}
