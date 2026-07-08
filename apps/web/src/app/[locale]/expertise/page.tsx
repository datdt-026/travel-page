import { Metadata } from 'next';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages } from '@/lib/seo-i18n';
import { getExpertisePageConfig, getImageUrl } from '@/lib/api';
import { getMockImageSrc } from '@/assets/mockImages';
import { 
  HeroSectionPremium,
  WhyPartnerSectionPremium,
  CTASectionPremium,
  StatsSectionPremium,
  ServicesSectionPremium,
  ImageFeatureSection,
} from '@/components/b2b';
import { DestinationCoverageSection } from '@/components/b2b/DestinationCoverageSection';
import { QualityAssuranceSection } from '@/components/b2b/QualityAssuranceSection';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

// Type for Expertise Page CMS Config
interface ExpertisePageConfig {
  hero?: {
    backgroundImage?: { url?: string } | null;
    title?: string;
    subtitle?: string;
    height?: string;
    overlayStyle?: string;
  };
  services?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    layout?: 'cards' | 'featured';
    items?: {
      image?: { url?: string } | null;
      icon?: string;
      title?: string;
      description?: string;
      features?: { text?: string }[];
    }[];
  };
  coverage?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    regions?: {
      name?: string;
      countries?: string;
      image?: { url?: string } | null;
      description?: string;
      highlights?: { text?: string }[];
      keyAttractions?: { text?: string }[];
      bestTime?: string;
      travelStyles?: { text?: string }[];
      localTeam?: string;
      languages?: { text?: string }[];
      highlighted?: boolean;
    }[];
  };
  capacity?: {
    enabled?: boolean;
    backgroundImage?: { url?: string } | null;
    eyebrow?: string;
    title?: string;
    items?: {
      number?: string;
      label?: string;
      description?: string;
    }[];
  };
  quality?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: {
      image?: { url?: string } | null;
      title?: string;
      description?: string;
      linkText?: string;
      linkUrl?: string;
    }[];
  };
  whyUs?: {
    enabled?: boolean;
    backgroundImage?: { url?: string } | null;
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: {
      image?: { url?: string } | null;
      icon?: string;
      title?: string;
      description?: string;
      details?: { text?: string }[];
      stat?: string;
      statLabel?: string;
    }[];
    ctaText?: string;
    ctaLink?: string;
  };
  cta?: {
    enabled?: boolean;
    backgroundImage?: { url?: string } | null;
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
  const pageConfig = await getExpertisePageConfig(locale) as ExpertisePageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/expertise`);

  return {
    title: pageConfig?.seo?.metaTitle || 'Chuyên môn của chúng tôi | VietWay',
    description: pageConfig?.seo?.metaDescription || 'Dịch vụ quản lý điểm đến toàn diện tại Đông Nam Á',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function ExpertisePage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, pageConfig] = await Promise.all([
    getDictionary(locale),
    getExpertisePageConfig(locale) as Promise<ExpertisePageConfig | null>,
  ]);

  // Default content
  const defaultServices = [
    {
      icon: '',
      title: 'FIT Services',
      image: { url: getMockImageSrc(7) },
      description: 'Tailored individual travel arrangements with personalized itineraries and dedicated support.',
      features: [
        { text: 'Custom itinerary design' },
        { text: 'Private transfers & guides' },
        { text: 'Flexible booking options' },
        { text: '24/7 traveler support' },
      ],
    },
    {
      icon: '',
      title: 'Group Tours',
      image: { url: getMockImageSrc(8) },
      description: 'Expertly managed group travel programs for series and ad-hoc departures.',
      features: [
        { text: 'Series & ad-hoc programs' },
        { text: 'Quality-controlled suppliers' },
        { text: 'Multilingual guides' },
        { text: 'Competitive group rates' },
      ],
    },
    {
      icon: '',
      title: 'MICE Services',
      image: { url: getMockImageSrc(9) },
      description: 'Professional corporate event management and incentive travel programs.',
      features: [
        { text: 'Conference & meeting organization' },
        { text: 'Incentive trip planning' },
        { text: 'Team building activities' },
        { text: 'Gala dinner & event management' },
      ],
    },
    {
      icon: '',
      title: 'Tailored Experiences',
      image: { url: getMockImageSrc(10) },
      description: 'Bespoke luxury travel experiences designed around unique client requirements.',
      features: [
        { text: 'Luxury accommodations' },
        { text: 'Exclusive experiences' },
        { text: 'Private yacht & villa rentals' },
        { text: 'VIP arrangements' },
      ],
    },
  ];

  const defaultCapacity = [
    { number: '50+', label: 'Local Guides', description: 'Certified multilingual professionals' },
    { number: '200+', label: 'Vetted Partners', description: 'Hotels, transport, experiences' },
    { number: '24/7', label: 'Support', description: 'Emergency assistance available' },
    { number: '6', label: 'Destinations', description: 'Countries in Southeast Asia' },
  ];

  const defaultWhyUs = [
    { 
      icon: '🌏', 
      title: 'Local Expertise', 
      description: 'Deep destination knowledge with on-ground teams across Southeast Asia.',
      details: [{ text: '15+ years combined team experience' }, { text: 'Native-speaking local teams' }, { text: 'Exclusive supplier relationships' }],
      stat: '50+',
      statLabel: 'Local Partners',
    },
    { 
      icon: '🤝', 
      title: 'Partnership Focus', 
      description: 'Long-term relationship building with transparent communication.',
      details: [{ text: 'Single point of contact' }, { text: 'Business review meetings' }, { text: 'Tailored product development' }],
      stat: '1:1',
      statLabel: 'Support',
    },
    { 
      icon: '⚡', 
      title: 'Responsive Service', 
      description: 'Quick turnaround on quotes and dedicated account management.',
      details: [{ text: '24-hour quote turnaround' }, { text: 'Same-day urgent response' }, { text: 'Dedicated inquiry portal' }],
      stat: '<24h',
      statLabel: 'Quote Time',
    },
    { 
      icon: '🌱', 
      title: 'Sustainable Operations', 
      description: 'Responsible tourism practices integrated into all services.',
      details: [{ text: 'Carbon offset programs' }, { text: 'Community-based tourism' }, { text: 'Eco-certified partners' }],
      stat: '100%',
      statLabel: 'Sustainable',
    },
  ];

  const services = pageConfig?.services?.items?.length 
    ? pageConfig.services.items 
    : defaultServices;

  const capacity = pageConfig?.capacity?.items?.length
    ? pageConfig.capacity.items
    : defaultCapacity;

  const whyUs = pageConfig?.whyUs?.items?.length
    ? pageConfig.whyUs.items
    : defaultWhyUs;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Premium */}
      <HeroSectionPremium
        backgroundImage={pageConfig?.hero?.backgroundImage?.url ? getImageUrl(pageConfig.hero.backgroundImage.url) : getMockImageSrc(0)}
        eyebrow="Chuyên môn"
        title={pageConfig?.hero?.title || 'Năng lực quản lý điểm đến'}
        subtitle={pageConfig?.hero?.subtitle || 'Dịch vụ du lịch toàn diện tại Đông Nam Á, được triển khai với sự chính xác và am hiểu địa phương.'}
        height="large"
        overlayOpacity="medium"
        showScrollIndicator={true}
      />

      {/* Services Section - Premium with Images */}
      {pageConfig?.services?.enabled !== false && (
        <ServicesSectionPremium
          eyebrow={pageConfig?.services?.eyebrow || 'Dịch vụ'}
          title={pageConfig?.services?.title || 'Giải pháp DMC toàn diện'}
          description={pageConfig?.services?.description}
          services={services.map(s => ({
            image: typeof s === 'object' && 'image' in s ? s.image : undefined,
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: s.features,
          }))}
          layout={pageConfig?.services?.layout || 'featured'}
        />
      )}

      {/* Destination Coverage Section */}
      {pageConfig?.coverage?.enabled !== false && (
        <DestinationCoverageSection
          eyebrow={pageConfig?.coverage?.eyebrow || 'Khu vực hoạt động'}
          title={pageConfig?.coverage?.title || 'Mạng lưới điểm đến'}
          description={pageConfig?.coverage?.description}
          destinations={pageConfig?.coverage?.regions?.map(region => ({
            ...region,
            highlights: region.highlights?.map(h => h.text).filter((t): t is string => !!t),
            keyAttractions: region.keyAttractions?.map(k => k.text).filter((t): t is string => !!t),
            travelStyles: region.travelStyles?.map(s => s.text).filter((t): t is string => !!t),
            languages: region.languages?.map(l => l.text).filter((t): t is string => !!t),
          }))}
        />
      )}

      {/* Operational Capacity Stats - Premium */}
      {pageConfig?.capacity?.enabled !== false && (
        <StatsSectionPremium
          eyebrow={pageConfig?.capacity?.eyebrow || 'Năng lực vận hành'}
          title={pageConfig?.capacity?.title || 'Vận hành chuyên nghiệp'}
          stats={capacity}
          variant="dark"
          backgroundImage={pageConfig?.capacity?.backgroundImage?.url ? getImageUrl(pageConfig.capacity.backgroundImage.url) : getMockImageSrc(1)}
        />
      )}

      {/* Quality Assurance Section */}
      {pageConfig?.quality?.enabled !== false && (
        <QualityAssuranceSection
          eyebrow={pageConfig?.quality?.eyebrow || 'Đảm bảo chất lượng'}
          title={pageConfig?.quality?.title || 'Cam kết của chúng tôi'}
          description={pageConfig?.quality?.description}
          items={pageConfig?.quality?.items?.map(item => ({
            image: item.image,
            title: item.title,
            description: item.description,
            linkText: item.linkText,
            linkUrl: item.linkUrl,
          }))}
        />
      )}

      {/* Why Partner Section - Premium */}
      {pageConfig?.whyUs?.enabled !== false && (
        <WhyPartnerSectionPremium
          eyebrow={pageConfig?.whyUs?.eyebrow || 'Khác biệt VietWay'}
          title={pageConfig?.whyUs?.title || 'Vì sao hợp tác với chúng tôi'}
          description={pageConfig?.whyUs?.description}
          backgroundImage={pageConfig?.whyUs?.backgroundImage?.url ? getImageUrl(pageConfig.whyUs.backgroundImage.url) : getMockImageSrc(2)}
          reasons={whyUs.map((item: { image?: { url?: string } | null; icon?: string; title?: string; description?: string; details?: { text?: string }[]; stat?: string; statLabel?: string }) => ({
            image: item.image?.url ? { url: getImageUrl(item.image.url) } : undefined,
            icon: item.icon,
            title: item.title,
            description: item.description,
            details: item.details?.map(d => d.text).filter((t): t is string => !!t),
            stat: item.stat,
            statLabel: item.statLabel,
          }))}
          ctaText={pageConfig?.whyUs?.ctaText || 'Gửi yêu cầu hợp tác'}
          ctaLink={pageConfig?.whyUs?.ctaLink || '/partners/inquiry'}
        />
      )}

      {/* CTA Section - Premium */}
      {pageConfig?.cta?.enabled !== false && (
        <CTASectionPremium
          eyebrow="Bước tiếp theo"
          title={pageConfig?.cta?.title || 'Sẵn sàng hợp tác?'}
          description={pageConfig?.cta?.description || 'Hãy trao đổi để chúng tôi hiểu cách có thể hỗ trợ doanh nghiệp của bạn bằng chuyên môn điểm đến.'}
          primaryButtonText={pageConfig?.cta?.primaryButtonText || 'Bắt đầu trao đổi'}
          primaryButtonLink={pageConfig?.cta?.primaryButtonLink || '/partners/inquiry'}
          secondaryButtonText={pageConfig?.cta?.secondaryButtonText || 'Tải hồ sơ năng lực'}
          secondaryButtonLink={pageConfig?.cta?.secondaryButtonLink || '/about/credentials'}
          variant="light"
          backgroundImage={pageConfig?.cta?.backgroundImage?.url ? getImageUrl(pageConfig.cta.backgroundImage.url) : getMockImageSrc(3)}
        />
      )}
    </main>
  );
}
