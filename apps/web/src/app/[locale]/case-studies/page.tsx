import { Metadata } from 'next';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages } from '@/lib/seo-i18n';
import { getCaseStudiesPageConfig, getImageUrl } from '@/lib/api';
import { getMockImageSrc } from '@/assets/mockImages';
import { 
  HeroSectionPremium,
  CTASectionPremium,
  PartnerStatementsStrip,
} from '@/components/b2b';
import { PartnerLogosSection } from '@/components/b2b/PartnerLogosSection';
import { FeaturedCaseStudies } from '@/components/b2b/FeaturedCaseStudies';
import { PartnerTestimonials } from '@/components/b2b/PartnerTestimonials';
import { PartnershipTypesSection } from '@/components/b2b/PartnershipTypesSection';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

// Type for Case Studies Page CMS Config
interface CaseStudiesPageConfig {
  hero?: {
    backgroundImage?: { url?: string } | null;
    title?: string;
    subtitle?: string;
    height?: string;
    overlayStyle?: string;
  };
  intro?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  partnerLogos?: {
    enabled?: boolean;
    title?: string;
    logos?: {
      logo?: { url?: string } | null;
      name?: string;
      country?: string;
      link?: string;
    }[];
  };
  caseStudies?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: {
      slug?: string;
      image?: { url?: string } | null;
      title?: string;
      destination?: string;
      deliverySummary?: string;
      metrics?: { number?: string; label?: string }[];
      partnerName?: string;
      partnerCountry?: string;
      featured?: boolean;
      featuredOrder?: number;
    }[];
  };
  // New: Lightweight partner statements for trust reinforcement
  partnerStatements?: {
    enabled?: boolean;
    title?: string;
    reviewContext?: string;
    layout?: 'horizontal' | 'vertical';
    statements?: {
      quote?: string;
      partnerRole?: string;
      partnerType?: string;
      region?: string;
      partnerLogo?: { url?: string } | null;
      order?: number;
      status?: 'published' | 'hidden';
    }[];
  };
  // Legacy: Partner testimonials (deprecated)
  testimonials?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      quote?: string;
      authorName?: string;
      authorRole?: string;
      companyName?: string;
      companyCountry?: string;
      companyLogo?: { url?: string } | null;
      avatar?: { url?: string } | null;
    }[];
  };
  partnershipTypes?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      icon?: string;
      title?: string;
      description?: string;
    }[];
  };
  cta?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const pageConfig = await getCaseStudiesPageConfig(locale) as CaseStudiesPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/case-studies`);

  return {
    title: pageConfig?.seo?.metaTitle || 'Case Studies | VietWay',
    description: pageConfig?.seo?.metaDescription || 'Câu chuyện triển khai thành công cùng các đối tác của chúng tôi',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function CaseStudiesPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, pageConfig] = await Promise.all([
    getDictionary(locale),
    getCaseStudiesPageConfig(locale) as Promise<CaseStudiesPageConfig | null>,
  ]);

  // Default content with editorial fields
  const defaultCaseStudies = [
    {
      slug: 'northern-vietnam-fit-operations',
      title: 'Scaling FIT Operations Across Northern Vietnam',
      destination: 'Northern Vietnam',
      image: { url: getMockImageSrc(0) },
      deliverySummary: 'Deployed a dedicated 4-person operations team in Hanoi with 24/7 English-speaking support. Established standardized quality protocols across 28 supplier partners and implemented real-time booking confirmation within 2 hours for FIT requests.',
      metrics: [
        { number: '500+', label: 'FIT bookings handled in year one' },
        { number: '98%', label: 'post-trip satisfaction rating' },
        { number: '2hr', label: 'average booking confirmation' },
      ],
      partnerName: 'European Tour Operator',
      partnerCountry: 'Germany',
      featured: true,
      featuredOrder: 1,
    },
    {
      slug: 'multi-country-series-coordination',
      title: 'Multi-Country Series Coordination',
      destination: 'Vietnam · Cambodia · Laos',
      image: { url: getMockImageSrc(1) },
      deliverySummary: 'Built an integrated ground operations network spanning three countries with unified guide training, consistent vehicle standards, and seamless border-crossing logistics. Single point of contact manages end-to-end coordination.',
      metrics: [
        { number: '24', label: 'annual series departures' },
        { number: '4.8/5', label: 'average guest rating' },
      ],
      partnerName: 'Australian Wholesaler',
      partnerCountry: 'Australia',
      featured: true,
      featuredOrder: 2,
    },
    {
      slug: 'luxury-private-journey-program',
      title: 'Luxury Private Journey Program',
      destination: 'Central Vietnam',
      image: { url: getMockImageSrc(2) },
      deliverySummary: 'Curated exclusive experiences including private heritage site access, chef-led market tours, and bespoke wellness retreats. Dedicated concierge handles all client preferences and last-minute requests.',
      metrics: [
        { number: '40%', label: 'repeat booking rate' },
        { number: '5-Star', label: 'service level maintained' },
      ],
      partnerName: 'UK Travel Agency',
      partnerCountry: 'United Kingdom',
      featured: true,
      featuredOrder: 3,
    },
  ];

  const defaultTestimonials = [
    {
      quote: "Voyager has been instrumental in our expansion into Southeast Asia. Their professionalism and attention to detail matches our standards perfectly.",
      authorName: "Thomas Mueller",
      authorRole: "Product Manager",
      companyName: "TravelVision GmbH",
      companyCountry: "Germany",
    },
    {
      quote: "The responsiveness and flexibility we've experienced with Voyager is exceptional. They truly understand the needs of a B2B partner.",
      authorName: "Sarah Chen",
      authorRole: "Operations Director",
      companyName: "Pacific Journeys",
      companyCountry: "Australia",
    },
    {
      quote: "Working with Voyager has allowed us to confidently offer Vietnam to our luxury clients. Their local expertise is invaluable.",
      authorName: "James Richardson",
      authorRole: "Managing Director",
      companyName: "Prestige Travel",
      companyCountry: "United Kingdom",
    },
  ];

  // Default partner statements - operational tone with credibility context
  const defaultPartnerStatements = [
    {
      quote: 'Operationally consistent across peak seasons with clear communication.',
      partnerRole: 'Operations Director',
      partnerType: 'Inbound Operator',
      region: 'Europe',
      partnerLogo: undefined,
      order: 1,
      status: 'published' as const,
    },
    {
      quote: 'Strong local partner coordination and reliable delivery timelines.',
      partnerRole: 'Product Manager',
      partnerType: 'Wholesaler',
      region: 'Australia',
      partnerLogo: undefined,
      order: 2,
      status: 'published' as const,
    },
    {
      quote: 'Dependable ground handling with attention to service quality.',
      partnerRole: 'Contracting Manager',
      partnerType: 'DMC',
      region: 'North America',
      partnerLogo: undefined,
      order: 3,
      status: 'published' as const,
    },
  ];

  const defaultPartnershipTypes = [
    { icon: '🎯', title: 'FIT Partners', description: 'Flexible arrangements for individual travel bookings with quick response times.', image: { url: getMockImageSrc(3) } },
    { icon: '👥', title: 'Series Partners', description: 'Long-term agreements for regular group departures with preferred rates.', image: { url: getMockImageSrc(4) } },
    { icon: '🏢', title: 'MICE Partners', description: 'Corporate event and incentive travel collaboration opportunities.', image: { url: getMockImageSrc(5) } },
    { icon: '✨', title: 'White Label Partners', description: 'Branded service delivery under your company identity.', image: { url: getMockImageSrc(6) } },
  ];

  const caseStudies = pageConfig?.caseStudies?.items?.length 
    ? pageConfig.caseStudies.items 
    : defaultCaseStudies;

  const testimonials = pageConfig?.testimonials?.items?.length
    ? pageConfig.testimonials.items
    : defaultTestimonials;

  const partnershipTypes = pageConfig?.partnershipTypes?.items?.length
    ? pageConfig.partnershipTypes.items
    : defaultPartnershipTypes;

  // Prepare partner statements - filter by status, sort by order
  const rawStatements = pageConfig?.partnerStatements?.statements?.length
    ? pageConfig.partnerStatements.statements
    : defaultPartnerStatements;

  const partnerStatements = rawStatements
    .filter(s => s.status !== 'hidden')
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 3) // Max 3 statements
    .map(s => ({
      quote: s.quote || '',
      partnerRole: s.partnerRole,
      partnerType: s.partnerType || '',
      region: s.region,
      partnerLogo: s.partnerLogo,
    }));

  // Review context for source authenticity
  const reviewContext = pageConfig?.partnerStatements?.reviewContext;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Premium */}
      <HeroSectionPremium
        backgroundImage={pageConfig?.hero?.backgroundImage?.url ? getImageUrl(pageConfig.hero.backgroundImage.url) : getMockImageSrc(5)}
        eyebrow="Thành công đối tác"
        title={pageConfig?.hero?.title || 'Case Studies'}
        subtitle={pageConfig?.hero?.subtitle || 'Khám phá cách chúng tôi hỗ trợ các doanh nghiệp du lịch mở rộng sản phẩm Đông Nam Á một cách tự tin.'}
        height="medium"
        overlayOpacity="medium"
        alignment="left"
        showScrollIndicator={false}
      />

      {/* Partner Logos Section */}
      {pageConfig?.partnerLogos?.enabled !== false && pageConfig?.partnerLogos?.logos?.length && (
        <PartnerLogosSection
          title={pageConfig?.partnerLogos?.title || 'Đối tác của chúng tôi'}
          partners={pageConfig.partnerLogos.logos}
        />
      )}

      {/* Featured Case Studies - Editorial Layout */}
      {pageConfig?.caseStudies?.enabled !== false && (
        <FeaturedCaseStudies
          eyebrow={pageConfig?.caseStudies?.eyebrow || 'Dự án tiêu biểu'}
          title={pageConfig?.caseStudies?.title || 'Cách chúng tôi triển khai'}
          subtitle={pageConfig?.caseStudies?.subtitle}
          caseStudies={caseStudies}
          locale={locale}
        />
      )}

      {/* Partner Statements - Lightweight Trust Signal */}
      {/* 
        Design: Calm, credible section for trust reinforcement
        - No cards, avatars, carousels
        - Typography-driven, editorial feel
        - Visually secondary to Featured Case Studies
        
        Credibility Enhancements:
        - Partner role for source clarity
        - Partner type + region for context
        - Review context for authenticity signal
        - Optional monochrome logos (quiet markers)
      */}
      {pageConfig?.partnerStatements?.enabled !== false && partnerStatements.length > 0 && (
        <PartnerStatementsStrip
          title={pageConfig?.partnerStatements?.title || 'Đối tác nói gì về chúng tôi'}
          reviewContext={reviewContext}
          statements={partnerStatements}
          layout={pageConfig?.partnerStatements?.layout || 'horizontal'}
        />
      )}

      {/* Legacy: Partner Testimonials (only shown if explicitly enabled and no new statements) */}
      {pageConfig?.testimonials?.enabled === true && 
       pageConfig?.partnerStatements?.enabled === false && (
        <PartnerTestimonials
          eyebrow={pageConfig?.testimonials?.eyebrow || 'Phản hồi đối tác'}
          title={pageConfig?.testimonials?.title || 'Đối tác nói gì về chúng tôi'}
          testimonials={testimonials}
        />
      )}

      {/* Partnership Types */}
      {pageConfig?.partnershipTypes?.enabled !== false && (
        <PartnershipTypesSection
          eyebrow={pageConfig?.partnershipTypes?.eyebrow || 'Cách chúng tôi hợp tác'}
          title={pageConfig?.partnershipTypes?.title || 'Mô hình hợp tác'}
          types={partnershipTypes}
        />
      )}

      {/* CTA Section - Premium */}
      {pageConfig?.cta?.enabled !== false && (
        <CTASectionPremium
          eyebrow="Tham gia mạng lưới"
          title={pageConfig?.cta?.title || 'Sẵn sàng trở thành câu chuyện thành công tiếp theo?'}
          description={pageConfig?.cta?.description || 'Hãy bắt đầu trao đổi về cách chúng ta có thể cùng phát triển danh mục sản phẩm Đông Nam Á.'}
          primaryButtonText={pageConfig?.cta?.primaryButtonText || 'Gửi yêu cầu hợp tác'}
          primaryButtonLink={pageConfig?.cta?.primaryButtonLink || '/partners/inquiry'}
          secondaryButtonText={pageConfig?.cta?.secondaryButtonText || 'Yêu cầu tham chiếu'}
          secondaryButtonLink={pageConfig?.cta?.secondaryButtonLink || '/contact'}
          variant="dark"
        />
      )}
    </main>
  );
}
