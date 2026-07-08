import { getCountries, getItineraries, getHomePageConfig, getMediaImageUrl } from '@/lib/api';
import { Country, Itinerary, HomePageConfig, Media } from '@/types';
import { JsonLd, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/seo';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import HeroSection from '@/components/HeroSection';
import {
  BrandPhilosophy,
  DestinationsHighlight,
  SignatureExperiences,
  Testimonials,
  SoftCTA,
  B2BPartnerShowcase,
  B2BStatsSection,
} from '@/components/home';
import {
  B2BValuePropositionPremium,
  CredentialsSectionPremium,
  B2BServicesOverviewPremium,
  PartnerShowcasePremium,
  CTASectionPremiumNew,
} from '@/components/b2b';

export const revalidate = 60;

interface Props {
  params: { locale: string };
}

async function getFeaturedContent(locale: string, homeConfig: HomePageConfig | null) {
  // If CMS has featured countries/itineraries, use those; otherwise fetch from collections
  const [countriesData, itinerariesData] = await Promise.all([
    getCountries({ limit: 6, status: 'published', locale }),
    getItineraries({ limit: 3, status: 'published', locale }),
  ]);

  // Use CMS featured countries if set, otherwise use fetched ones
  const featuredCountries = homeConfig?.destinations?.featuredCountries;
  const countries = (featuredCountries && featuredCountries.length > 0)
    ? featuredCountries.filter((c): c is Country => typeof c !== 'string')
    : countriesData.docs as Country[];

  // Use CMS featured itineraries if set, otherwise use fetched ones
  const featuredItineraries = homeConfig?.experiences?.featuredItineraries;
  const itineraries = (featuredItineraries && featuredItineraries.length > 0)
    ? featuredItineraries.filter((i): i is Itinerary => typeof i !== 'string')
    : itinerariesData.docs as Itinerary[];

  return { countries, itineraries };
}

export async function generateMetadata({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, homeConfig] = await Promise.all([
    getDictionary(locale),
    getHomePageConfig(locale) as Promise<HomePageConfig | null>,
  ]);
  const alternates = generateAlternateLanguages(`/${locale}`);

  return {
    title: homeConfig?.seo?.metaTitle || `${dict.common.siteName} - ${dict.home.heroTitle}`,
    description: homeConfig?.seo?.metaDescription || dict.home.heroDescription,
    keywords: homeConfig?.seo?.metaKeywords,
    alternates,
  };
}

// Helper to get image URL from CMS media
function getMediaUrl(media: Media | string | undefined): string | undefined {
  return getMediaImageUrl(media);
}

export default async function HomePage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, homeConfig] = await Promise.all([
    getDictionary(locale),
    getHomePageConfig(locale) as Promise<HomePageConfig | null>,
  ]);
  const { countries, itineraries } = await getFeaturedContent(locale, homeConfig);
  const hreflangLinks = generateHreflangLinks(`/${locale}`);

  const localePath = (path: string) => `/${locale}${path}`;

  // Extract CMS content with fallbacks to dictionary
  const hero = homeConfig?.hero;
  const philosophy = homeConfig?.philosophy;
  const destinations = homeConfig?.destinations;
  const experiences = homeConfig?.experiences;
  const testimonials = homeConfig?.testimonials;
  const cta = homeConfig?.cta;

  return (
    <div className="overflow-hidden">
      <JsonLd data={[generateWebsiteSchema(), generateOrganizationSchema()]} />
      {hreflangLinks}

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Full screen, cinematic, left-aligned, full bleed
      ═══════════════════════════════════════════════════════════════════ */}
      <HeroSection
        title={hero?.title || dict.home.heroTitle.replace(dict.common.siteName, '').trim() || 'discover'}
        brandName={hero?.brandName || dict.common.siteName}
        subtitle={hero?.subtitle || dict.home.heroDescription}
        image={hero?.backgroundImage}
        video={hero?.backgroundVideo}
        videoPoster={hero?.videoPoster}
        mediaType={hero?.mediaType || 'image'}
        ctaText={hero?.ctaText || dict.home.exploreDestinations}
        ctaHref={hero?.ctaLink || localePath('/destinations')}
        size="full"
        align={hero?.textAlignment || 'left'}
        overlay={hero?.overlayStyle === 'heavy' ? 'dark' : (hero?.overlayStyle || 'dark')}
        styling={hero?.styling}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          BRAND PHILOSOPHY - Quiet luxury introduction
      ═══════════════════════════════════════════════════════════════════ */}
      {(philosophy?.enabled !== false) && (
        <BrandPhilosophy
          tagline={philosophy?.tagline || "Triết lý của chúng tôi"}
          statement={philosophy?.statement || "Chúng tôi tin rằng du lịch không chỉ là điểm đến, mà là những khoảnh khắc làm thay đổi cách ta nhìn thế giới. Mỗi hành trình là một lời mời nhẹ nhàng để bạn khám phá thế giới và chính mình."}
          signature={philosophy?.signature || "— Nghệ thuật du lịch chậm"}
          image={getMediaUrl(philosophy?.image)}
          styling={philosophy?.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          DESTINATIONS HIGHLIGHT - Editorial grid, large imagery
      ═══════════════════════════════════════════════════════════════════ */}
      {(destinations?.enabled !== false) && (
        <DestinationsHighlight
          destinations={countries}
          title={destinations?.title || dict.home.featuredCountries}
          subtitle={destinations?.subtitle || "Những vùng đất đặc biệt, được tuyển chọn kỹ lưỡng"}
          ctaText={destinations?.ctaText || dict.common.viewAll}
          ctaHref={destinations?.ctaLink || "/destinations"}
          locale={locale}
          limit={destinations?.limit || 4}
          styling={destinations?.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SIGNATURE EXPERIENCES - Editorial alternating layout
      ═══════════════════════════════════════════════════════════════════ */}
      {(experiences?.enabled !== false) && (
        <SignatureExperiences
          experiences={itineraries}
          title={experiences?.title || dict.home.featuredItineraries}
          subtitle={experiences?.subtitle || "Vượt khỏi những điều quen thuộc"}
          locale={locale}
          limit={experiences?.limit || 3}
          styling={experiences?.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS - Quiet, elegant social proof
      ═══════════════════════════════════════════════════════════════════ */}
      {(testimonials?.enabled !== false) && (
        <Testimonials
          title={testimonials?.title || "Cảm nhận từ du khách"}
          items={testimonials?.items}
          styling={testimonials?.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          B2B VALUE PROPOSITION - Premium hero-style B2B intro (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {homeConfig?.b2bValueProposition?.enabled && (
        <B2BValuePropositionPremium
          eyebrow={homeConfig.b2bValueProposition.eyebrow}
          title={homeConfig.b2bValueProposition.title}
          subtitle={homeConfig.b2bValueProposition.subtitle}
          highlights={homeConfig.b2bValueProposition.highlights?.map(h => ({
            icon: h.icon,
            title: h.title,
            description: h.description,
          }))}
          ctaText={homeConfig.b2bValueProposition.ctaText}
          ctaLink={homeConfig.b2bValueProposition.ctaLink}
          secondaryCtaText={homeConfig.b2bValueProposition.secondaryCtaText}
          secondaryCtaLink={homeConfig.b2bValueProposition.secondaryCtaLink}
          backgroundImage={homeConfig.b2bValueProposition.backgroundImage}
          styling={homeConfig.b2bValueProposition.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          B2B CREDENTIALS - Premium floating cards (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {homeConfig?.b2bCredentials?.enabled && (
        <CredentialsSectionPremium
          eyebrow={homeConfig.b2bCredentials.eyebrow}
          title={homeConfig.b2bCredentials.title}
          subtitle={homeConfig.b2bCredentials.subtitle}
          credentials={homeConfig.b2bCredentials.items?.map(item => ({
            type: item.type as 'stat' | 'certification' | 'award' | 'membership',
            value: item.value,
            label: item.label,
            description: item.description,
            logo: typeof item.logo === 'string' ? { url: item.logo } : item.logo,
            year: item.year,
          }))}
          variant={homeConfig.b2bCredentials.variant as 'floating' | 'timeline' | 'showcase'}
          styling={homeConfig.b2bCredentials.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          B2B SERVICES OVERVIEW - Premium DMC services grid (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {homeConfig?.b2bServicesOverview?.enabled && (
        <B2BServicesOverviewPremium
          eyebrow={homeConfig.b2bServicesOverview.eyebrow}
          title={homeConfig.b2bServicesOverview.title}
          description={homeConfig.b2bServicesOverview.description}
          services={homeConfig.b2bServicesOverview.services?.map(s => ({
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: s.features?.map(f => f.feature).filter((f): f is string => !!f),
            link: s.link,
            image: s.image,
            stats: s.stats?.value ? { value: s.stats.value, label: s.stats.label || '' } : undefined,
          }))}
          styling={homeConfig.b2bServicesOverview.styling}
          variant={homeConfig.b2bServicesOverview.variant as 'cards' | 'horizontal'}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          B2B PARTNER SHOWCASE - Premium partner display (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {homeConfig?.b2bPartnerShowcase?.enabled && (
        <PartnerShowcasePremium
          eyebrow={homeConfig.b2bPartnerShowcase.eyebrow}
          title={homeConfig.b2bPartnerShowcase.title}
          description={homeConfig.b2bPartnerShowcase.description}
          partners={homeConfig.b2bPartnerShowcase.partners?.map(p => ({
            logo: typeof p.logo === 'string' ? { url: p.logo } : p.logo,
            name: p.name,
            country: p.country,
            url: p.url,
            testimonial: p.testimonial,
            representative: p.representative,
          }))}
          ctaText={homeConfig.b2bPartnerShowcase.ctaText}
          ctaLink={homeConfig.b2bPartnerShowcase.ctaLink}
          variant={homeConfig.b2bPartnerShowcase.variant as 'marquee' | 'grid' | 'featured'}
          styling={homeConfig.b2bPartnerShowcase.styling}
          backgroundImage={homeConfig.b2bPartnerShowcase.backgroundImage}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          B2B CTA - Premium call to action (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {homeConfig?.b2bCta?.enabled && (
        <CTASectionPremiumNew
          eyebrow={homeConfig.b2bCta.eyebrow}
          title={homeConfig.b2bCta.title}
          description={homeConfig.b2bCta.description}
          primaryButtonText={homeConfig.b2bCta.primaryButtonText}
          primaryButtonLink={homeConfig.b2bCta.primaryButtonLink}
          secondaryButtonText={homeConfig.b2bCta.secondaryButtonText}
          secondaryButtonLink={homeConfig.b2bCta.secondaryButtonLink}
          backgroundImage={homeConfig.b2bCta.backgroundImage}
          variant={homeConfig.b2bCta.variant as 'cinematic' | 'split' | 'minimal'}
          stats={homeConfig.b2bCta.stats?.filter(s => s.value && s.label).map(s => ({
            value: s.value!,
            label: s.label!,
          }))}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          B2B STATS - For B2B credibility (optional)
      ═══════════════════════════════════════════════════════════════════ */}
      {homeConfig?.b2bStats?.enabled && (
        <B2BStatsSection
          stats={homeConfig.b2bStats.items}
          backgroundImage={getMediaUrl(homeConfig.b2bStats.backgroundImage)}
          styling={homeConfig.b2bStats.styling}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SOFT CTA - Inviting, not pushy
      ═══════════════════════════════════════════════════════════════════ */}
      {(cta?.enabled !== false) && (
        <SoftCTA
          title={cta?.title || "Bắt đầu hành trình của bạn"}
          subtitle={cta?.subtitle || "Cùng tạo nên một trải nghiệm thật khác biệt"}
          description={cta?.description || "Dù bạn đang tìm kiếm một kỳ nghỉ chuyển hóa hay một chuyến phiêu lưu được thiết kế tỉ mỉ, chúng tôi luôn sẵn sàng lắng nghe, thấu hiểu và tạo nên hành trình phù hợp với bạn."}
          backgroundImage={getMediaUrl(cta?.backgroundImage)}
          primaryCta={{ 
            text: cta?.primaryCtaText || dict.common.contact, 
            href: cta?.primaryCtaLink || "/contact" 
          }}
          secondaryCta={{ 
            text: cta?.secondaryCtaText || dict.home.exploreDestinations, 
            href: cta?.secondaryCtaLink || "/destinations" 
          }}
          locale={locale}
          styling={cta?.styling}
        />
      )}
    </div>
  );
}
