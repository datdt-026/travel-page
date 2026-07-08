import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import type { Locale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { getPageBySlug, getImageUrl, getAboutPageConfig } from '@/lib/api';
import { Page } from '@/types';
import RichText from '@/components/RichText';
import Link from 'next/link';
import Image from 'next/image';
import { mockImages } from '@/assets/mockImages';
import { 
  DynamicHeroSection, 
  HeroConfig,
  MissionSection,
  ValuesSection,
  TeamSection,
  StatsSection,
  CTASection,
} from '@/components/cms';

export const revalidate = 3600; // 1 hour

interface Props {
  params: { locale: string };
}

// Type for About Page CMS Config
interface AboutPageConfig {
  hero?: HeroConfig;
  intro?: {
    enabled?: boolean;
    title?: string;
    content?: string | unknown[];
  };
  story?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    content?: string | unknown[];
    highlight?: string;
    image?: { url?: string } | null;
  };
  mission?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    content?: unknown[];
    image?: { url?: string } | null;
    imagePosition?: 'left' | 'right';
  };
  values?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      icon?: string;
      title?: string;
      description?: string;
    }[];
    columns?: '2' | '3' | '4';
    backgroundColor?: 'default' | 'light' | 'dark';
  };
  team?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    members?: {
      photo?: { url?: string } | null;
      name?: string;
      role?: string;
      bio?: string;
      socials?: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
      };
    }[];
  };
  stats?: {
    enabled?: boolean;
    items?: {
      number?: string;
      label?: string;
    }[];
    backgroundColor?: 'light' | 'dark' | 'accent';
    backgroundImage?: { url?: string } | null;
  };
  whyChoose?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      title?: string;
      description?: string;
    }[];
  };
  cta?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    backgroundImage?: { url?: string } | null;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const page = await getPageBySlug('about', locale) as Page | null;
  const pageConfig = await getAboutPageConfig(locale) as AboutPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/about`);

  return {
    title: pageConfig?.seo?.metaTitle || page?.seo?.metaTitle || page?.title || dict.about.title,
    description: pageConfig?.seo?.metaDescription || page?.seo?.metaDescription || page?.excerpt || dict.about.description,
    keywords: pageConfig?.seo?.metaKeywords || page?.seo?.metaKeywords,
    alternates,
  };
}

export default async function AboutPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/about`);

  // Fetch page content and config from CMS
  const page = await getPageBySlug('about', locale) as Page | null;
  const pageConfig = await getAboutPageConfig(locale) as AboutPageConfig | null;

  // Check if we have CMS config (to determine whether to show fallback UI)
  const hasCMSConfig = pageConfig !== null && Object.keys(pageConfig).length > 0;

  // Use CMS content if available, otherwise fall back to dictionary
  const title = pageConfig?.hero?.title || page?.title || dict.about.title;
  const subtitle = pageConfig?.hero?.subtitle || page?.excerpt || dict.about.heroSubtitle || dict.about.description;
  const hasContent = page?.content && page.content.length > 0;

  // Hero configuration from CMS - use CMS contentPosition or fallback to 'bottom-left'
  const heroConfig: HeroConfig = {
    ...pageConfig?.hero,
    title,
    subtitle,
    eyebrow: pageConfig?.hero?.eyebrow || dict.common.about,
    backgroundImage: pageConfig?.hero?.backgroundImage || 
      (page?.featuredImage && typeof page.featuredImage === 'object' ? { url: page.featuredImage.url } : { url: mockImages.hero.src }),
    contentPosition: pageConfig?.hero?.contentPosition || 'bottom-left',
    height: pageConfig?.hero?.height || 'large',
  };

  // Fallback values items from dictionary (4 items now)
  const defaultValuesItems = [
    { 
      icon: dict.about.values?.curated?.icon || '🌍', 
      title: dict.about.values?.curated?.title || 'Curated Experiences', 
      description: dict.about.values?.curated?.description || 'Every destination handpicked for authentic, meaningful encounters that transcend ordinary travel.' 
    },
    { 
      icon: dict.about.values?.personal?.icon || '❤️', 
      title: dict.about.values?.personal?.title || 'Personal Touch', 
      description: dict.about.values?.personal?.description || 'Tailored itineraries designed around your preferences, creating journeys as unique as you are.' 
    },
    { 
      icon: dict.about.values?.trusted?.icon || '✓', 
      title: dict.about.values?.trusted?.title || 'Trusted Expertise', 
      description: dict.about.values?.trusted?.description || 'Years of experience ensuring seamless, worry-free travel with support every step of the way.' 
    },
    { 
      icon: dict.about.values?.sustainable?.icon || '🌱', 
      title: dict.about.values?.sustainable?.title || 'Sustainable Travel', 
      description: dict.about.values?.sustainable?.description || 'Committed to responsible tourism that benefits local communities and preserves destinations for future generations.' 
    },
  ];

  // Default stats from dictionary
  const defaultStatsItems = [
    { number: dict.about.stats?.travelers?.number || '10,000+', label: dict.about.stats?.travelers?.label || 'Happy Travelers' },
    { number: dict.about.stats?.destinations?.number || '50+', label: dict.about.stats?.destinations?.label || 'Destinations' },
    { number: dict.about.stats?.years?.number || '10+', label: dict.about.stats?.years?.label || 'Years Experience' },
    { number: dict.about.stats?.rating?.number || '4.9', label: dict.about.stats?.rating?.label || 'Average Rating' },
  ];

  // Default why choose items from dictionary
  const defaultWhyChooseItems = dict.about.whyChoose?.items || [
    { title: 'Expert Local Guides', description: 'Connect with passionate locals who share insider knowledge and hidden gems.' },
    { title: '24/7 Support', description: 'Our dedicated team is always available to assist you, wherever you are.' },
    { title: 'Flexible Planning', description: 'Customize every aspect of your journey to match your preferences and pace.' },
    { title: 'Best Value', description: 'Premium experiences at competitive prices with no hidden fees.' },
  ];

  // Section configs - show by default if no CMS config
  const valuesConfig = pageConfig?.values;
  const showValues = hasCMSConfig ? (valuesConfig?.enabled !== false) : true;
  const valuesItems = valuesConfig?.items || defaultValuesItems;

  const statsConfig = pageConfig?.stats;
  const showStats = hasCMSConfig ? (statsConfig?.enabled === true) : true;
  const statsItems = statsConfig?.items || defaultStatsItems;

  const whyChooseConfig = pageConfig?.whyChoose;
  const showWhyChoose = hasCMSConfig ? (whyChooseConfig?.enabled !== false) : true;
  const whyChooseItems = whyChooseConfig?.items || defaultWhyChooseItems;

  const ctaConfig = pageConfig?.cta;
  const showCTA = hasCMSConfig ? (ctaConfig?.enabled === true) : true;

  return (
    <div>
      {hreflangLinks}
      
      {/* Dynamic Hero Section from CMS */}
      <DynamicHeroSection
        config={heroConfig}
        fallback={{
          title: dict.about.title,
          subtitle: dict.about.heroSubtitle || dict.about.description,
        }}
      />

      {/* Intro Section - Always show with fallback */}
      {(!hasCMSConfig || pageConfig?.intro?.enabled !== false) && (
        <section className="section-lg bg-surface-primary">
          <div className="container-main max-w-4xl text-center">
            <h2 className="font-serif text-heading-xl text-content-primary mb-8">
              {pageConfig?.intro?.title || dict.about.intro?.title || 'Your Journey Begins Here'}
            </h2>
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl mx-auto">
              {typeof pageConfig?.intro?.content === 'string' 
                ? pageConfig.intro.content 
                : dict.about.intro?.content || 'Founded with a passion for authentic travel, we have been helping travelers discover the world\'s hidden gems for over a decade. We believe that the best journeys are those that leave a lasting impact—on both the traveler and the communities they visit.'}
            </p>
          </div>
        </section>
      )}

      {/* Content Section - From Page content if exists */}
      {hasContent && (
        <section className="section-lg">
          <div className="container-main max-w-3xl">
            <div className="prose prose-luxury">
              <RichText content={page.content} />
            </div>
          </div>
        </section>
      )}

      {/* Stats Section - Show by default with fallback */}
      <StatsSection config={{
        enabled: showStats,
        items: statsItems.map(stat => ({
          number: stat.number || '',
          label: stat.label || '',
        })),
        backgroundColor: statsConfig?.backgroundColor || 'accent',
        backgroundImage: statsConfig?.backgroundImage || undefined,
      }} />

      {/* Story Section - Always show with fallback */}
      {(!hasCMSConfig || pageConfig?.story?.enabled !== false) && (
        <section className="section-lg bg-surface-secondary overflow-hidden">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div>
                <span className="text-label-md uppercase text-accent mb-4 block tracking-wider">
                  {pageConfig?.story?.eyebrow || dict.about.story?.eyebrow || 'Our Story'}
                </span>
                <h2 className="font-serif text-heading-xl text-content-primary mb-6">
                  {pageConfig?.story?.title || dict.about.story?.title || 'From Wanderlust to Purpose'}
                </h2>
                <p className="text-body-lg text-content-secondary mb-6 leading-relaxed">
                  {typeof pageConfig?.story?.content === 'string' 
                    ? pageConfig.story.content 
                    : dict.about.story?.content || 'What started as a small group of travel enthusiasts has grown into a trusted travel partner for thousands of explorers worldwide. Our founders, seasoned travelers themselves, noticed a gap in the market—travelers seeking more than just a vacation. They wanted transformation, connection, and stories worth telling. That\'s exactly what we deliver.'}
                </p>
                {(pageConfig?.story?.highlight || dict.about.story?.highlight) && (
                  <div className="border-l-4 border-accent pl-6 py-2">
                    <p className="text-body-lg text-content-primary font-medium italic">
                      {pageConfig?.story?.highlight || dict.about.story?.highlight}
                    </p>
                  </div>
                )}
              </div>
              {/* Image or Decorative Element */}
              <div className="relative hidden md:block">
                <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-sm">
                  <Image
                    src={pageConfig?.story?.image?.url ? getImageUrl(pageConfig.story.image.url) || mockImages.oldQuarter : mockImages.oldQuarter}
                    alt={pageConfig?.story?.title || dict.about.story?.title || 'Câu chuyện của chúng tôi'}
                    width={640}
                    height={640}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-16 lg:w-24 h-16 lg:h-24 bg-accent/10 rounded-full translate-x-4 translate-y-4"></div>
                <div className="absolute top-0 left-0 w-12 lg:w-16 h-12 lg:h-16 bg-accent/5 rounded-full -translate-x-4 -translate-y-4"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission Section - Dynamic from CMS, with fallback */}
      <MissionSection config={{
        enabled: hasCMSConfig ? (pageConfig?.mission?.enabled !== false) : true,
        eyebrow: pageConfig?.mission?.eyebrow || dict.about.mission?.eyebrow,
        title: pageConfig?.mission?.title || dict.about.mission?.title,
        content: pageConfig?.mission?.content || dict.about.mission?.content,
        image: pageConfig?.mission?.image || undefined,
        imagePosition: pageConfig?.mission?.imagePosition || 'right',
        backgroundColor: 'primary',
      }} />

      {/* Values Section - Dynamic from CMS */}
      <ValuesSection config={{
        enabled: showValues,
        eyebrow: valuesConfig?.eyebrow || dict.about.values?.eyebrow || 'Our Philosophy',
        title: valuesConfig?.title || dict.about.values?.title || 'What Sets Us Apart',
        items: valuesItems.map(v => ({
          icon: v.icon,
          title: v.title || '',
          description: v.description,
        })),
        columns: valuesConfig?.columns || '4',
        backgroundColor: valuesConfig?.backgroundColor || 'default',
      }} />

      {/* Why Choose Us Section - Show by default with fallback */}
      {showWhyChoose && whyChooseItems.length > 0 && (
        <section className="section-lg bg-surface-secondary">
          <div className="container-wide">
            <div className="text-center mb-16">
              <span className="text-label-md uppercase text-accent mb-4 block tracking-wider">
                {whyChooseConfig?.eyebrow || dict.about.whyChoose?.eyebrow || 'Why Choose Us'}
              </span>
              <h2 className="font-serif text-heading-xl text-content-primary">
                {whyChooseConfig?.title || dict.about.whyChoose?.title || 'Travel With Confidence'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {whyChooseItems.map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <span className="text-xl lg:text-2xl font-bold text-accent">{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-heading-sm text-content-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-content-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section - Dynamic from CMS */}
      <TeamSection config={{
        enabled: pageConfig?.team?.enabled,
        title: pageConfig?.team?.title,
        subtitle: pageConfig?.team?.subtitle,
        members: pageConfig?.team?.members?.map(m => ({
          photo: m.photo || undefined,
          name: m.name || '',
          role: m.role,
          bio: m.bio,
          socials: m.socials,
        })),
      }} />

      {/* CTA Section - Dynamic from CMS, with fallback */}
      <CTASection config={{
        enabled: showCTA,
        title: ctaConfig?.title || dict.about.cta?.title || 'Ready to Start Your Journey?',
        subtitle: ctaConfig?.subtitle || dict.about.cta?.subtitle,
        primaryButtonText: ctaConfig?.primaryButtonText || dict.about.cta?.primaryButton || 'Get Started',
        primaryButtonLink: ctaConfig?.primaryButtonLink || `/${locale}/contact`,
        secondaryButtonText: ctaConfig?.secondaryButtonText || dict.about.cta?.secondaryButton || 'Explore Destinations',
        secondaryButtonLink: ctaConfig?.secondaryButtonLink || `/${locale}/destinations`,
        backgroundImage: ctaConfig?.backgroundImage || undefined,
      }} />
    </div>
  );
}
