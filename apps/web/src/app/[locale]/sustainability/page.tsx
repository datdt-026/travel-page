import { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages } from '@/lib/seo-i18n';
import { getSustainabilityPageConfig, getImageUrl } from '@/lib/api';
import { getMockImageSrc } from '@/assets/mockImages';
import { 
  HeroSectionPremium,
  CTASectionPremium,
  ImageFeatureSection,
  PlaceDrivenInitiatives,
  ResponsiblePracticesSection,
  MeasurableResultsSection,
  SupplierStandardsSection,
} from '@/components/b2b';
import type { ResponsiblePractice } from '@/components/b2b';
import { SustainabilityPhilosophy } from '@/components/b2b/SustainabilityPhilosophy';
import { CertificationsSection } from '@/components/b2b/CertificationsSection';
import { PracticesSection } from '@/components/b2b/PracticesSection';
import type { Initiative } from '@/components/b2b/PlaceDrivenInitiatives/types';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

// Type for Sustainability Page CMS Config
interface SustainabilityPageConfig {
  hero?: {
    backgroundImage?: { url?: string } | null;
    title?: string;
    subtitle?: string;
    height?: string;
    overlayStyle?: string;
  };
  philosophy?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    statement?: unknown[];
    image?: { url?: string } | null;
  };
  certifications?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: {
      logo?: { url?: string } | null;
      name?: string;
      description?: string;
      year?: string;
      link?: string;
    }[];
  };
  initiatives?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      title?: string;
      location?: string;
      description?: string;
      operationalApproach?: { text?: string }[];
      order?: number;
      status?: 'active' | 'archived';
    }[];
  };
  practices?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    items?: {
      icon?: string;
      title?: string;
      description?: string;
    }[];
  };
  opStandards?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    introduction?: string;
    contextImage?: { url?: string } | null;
    practices?: {
      title?: string;
      description?: string;
      details?: { text?: string }[];
      order?: number;
      status?: 'active' | 'inactive';
    }[];
  };
  supplierStandards?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    description?: ReactNode;
    criteria?: { text?: string }[];
  };
  impact?: {
    enabled?: boolean;
    eyebrow?: string;
    title?: string;
    year?: string;
    items?: {
      number?: string;
      label?: string;
      description?: string;
      measurementMethod?: { text?: string }[];
    }[];
    reportDownload?: { url?: string } | null;
  };
  cta?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const pageConfig = await getSustainabilityPageConfig(locale) as SustainabilityPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/sustainability`);

  return {
    title: pageConfig?.seo?.metaTitle || 'Sustainability & Responsibility | Voyager',
    description: pageConfig?.seo?.metaDescription || 'Our commitment to responsible tourism and sustainable operations',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function SustainabilityPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, pageConfig] = await Promise.all([
    getDictionary(locale),
    getSustainabilityPageConfig(locale) as Promise<SustainabilityPageConfig | null>,
  ]);

  // Default content
  const defaultCertifications = [
    { name: 'Travelife Partner', description: 'Committed to sustainability improvement in tourism', year: '2023' },
    { name: 'Vietnam Tourism Association', description: 'Official member and certified tour operator', year: '2019' },
    { name: 'PATA Member', description: 'Pacific Asia Travel Association member', year: '2020' },
  ];

  // Default place-driven initiatives with geographic anchoring
  const defaultInitiatives: Initiative[] = [
    {
      title: 'Highland Homestay Development',
      location: 'Northern Vietnam · Sapa Highlands',
      description:
        'Working with Hmong and Dao communities to develop family-run guesthouses that meet international comfort standards while preserving traditional architecture and daily rhythms.',
      operationalApproach: [
        { text: 'Revenue shared 70/30 with host families, paid monthly' },
        { text: 'Maximum 6 guests per homestay to minimize disruption' },
        { text: 'Guides sourced from the same village network' },
      ],
      order: 10,
      status: 'active',
    },
    {
      title: 'River Transport Initiative',
      location: 'Mekong Delta · Cần Thơ Province',
      description:
        'Replacing diesel boats with electric alternatives for floating market tours. A phased program developed with local boat operators who retain ownership and income.',
      operationalApproach: [
        { text: 'Operators trained and certified on electric vessels' },
        { text: 'Charging infrastructure installed at three hubs' },
        { text: '40% reduction in tour-related emissions since 2024' },
      ],
      order: 20,
      status: 'active',
    },
    {
      title: 'Artisan Supply Chain',
      location: 'Central Highlands · Kon Tum Province',
      description:
        'Connecting traditional weavers directly with our tour experiences. Guests visit workshops; textiles sold are tracked back to specific artisans for fair payment.',
      operationalApproach: [
        { text: 'Direct purchasing at pre-agreed fair-trade prices' },
        { text: 'Artisan profiles included in guest briefing materials' },
        { text: 'Annual orders placed in advance to ensure income stability' },
      ],
      order: 30,
      status: 'active',
    },
  ];
  const defaultPractices = [
    { icon: '', title: 'Environmental Protection', description: 'Minimizing environmental impact through responsible tourism practices and partner selection.' },
    { icon: '', title: 'Community Support', description: 'Ensuring tourism benefits flow to local communities and preserving cultural heritage.' },
    { icon: '', title: 'Wildlife Ethics', description: 'Strict policies against exploitative wildlife attractions and promoting ethical encounters.' },
    { icon: '', title: 'Waste Reduction', description: 'Active programs to reduce, reuse, and recycle throughout our operations.' },
  ];

  // Default Responsible Practices — Practice-as-Discipline approach
  const defaultResponsiblePractices: ResponsiblePractice[] = [
    {
      title: 'Guide Development',
      description: 'Our guides are more than tour leaders—they are trained interpreters of place, culture, and ecology. Each guide completes annual certifications and participates in regional knowledge exchanges.',
      details: [
        { text: 'All guides complete 40-hour annual certification in cultural interpretation' },
        { text: 'Regional exchanges pair urban and rural guides for cross-training' },
        { text: 'Language proficiency reviewed quarterly with external assessors' },
      ],
      order: 10,
      status: 'active',
    },
    {
      title: 'Supplier Vetting',
      description: 'Every hotel, restaurant, and transport partner undergoes documented evaluation before joining our network. We audit annually and share performance data with partners.',
      details: [
        { text: 'Supplier audits conducted quarterly using 47-point criteria' },
        { text: 'Labor practices verified through third-party documentation' },
        { text: 'Non-compliance triggers 90-day remediation or termination' },
      ],
      order: 20,
      status: 'active',
    },
    {
      title: 'Community Revenue Allocation',
      description: 'Tourism revenue reaches communities through direct mechanisms—not donations. We structure experiences so spending flows to local families, artisans, and cooperatives.',
      details: [
        { text: 'Homestay revenue: 70% to families, paid monthly' },
        { text: 'Artisan purchases tracked to individual makers, paid at point of sale' },
        { text: 'Community meal programs source 100% ingredients within 25km radius' },
      ],
      order: 30,
      status: 'active',
    },
    {
      title: 'Wildlife Interaction Standards',
      description: 'We maintain absolute standards on wildlife encounters. No captive wildlife in entertainment contexts. No feeding or touching protocols that alter animal behavior.',
      details: [
        { text: 'Zero-contact policy for all wildlife viewing experiences' },
        { text: 'Observation distances enforced through trained guide protocols' },
        { text: 'Sanctuaries vetted for rescue-only intake, no breeding programs' },
      ],
      order: 40,
      status: 'active',
    },
    {
      title: 'Operational Carbon Accounting',
      description: 'Carbon impact is calculated per-trip, not offset generically. We measure transport, accommodation, and activity emissions with third-party verified methodology.',
      details: [
        { text: 'Emissions calculated per-passenger using DEFRA factors' },
        { text: 'Electric vehicles deployed on 60% of ground transfers' },
        { text: 'Offset partners audited annually for additionality verification' },
      ],
      order: 50,
      status: 'active',
    },
  ];

  const defaultImpact = [
    { 
      number: '500+ tons', 
      label: 'Carbon Offset Annually', 
      description: 'Verified through Gold Standard certified projects since 2022',
      measurementMethod: [
        { text: 'Calculated per-trip using DEFRA emission factors' },
        { text: 'Third-party audited annually by SGS' },
      ],
    },
    { 
      number: '15 communities', 
      label: 'Direct Tourism Revenue Recipients', 
      description: 'Receiving documented income through homestays, guiding, and artisan sales',
      measurementMethod: [
        { text: 'Monthly payment records maintained per household' },
        { text: 'Revenue tracked via local cooperative ledgers' },
      ],
    },
    { 
      number: '80%', 
      label: 'Single-Use Plastic Reduction', 
      description: 'Across all managed operations since 2021 baseline',
      measurementMethod: [
        { text: 'Quarterly waste audits at partner hotels' },
        { text: 'Supplier compliance verified during annual reviews' },
      ],
    },
    { 
      number: '200+', 
      label: 'Vetted Partners', 
      description: 'Meeting documented sustainability and labor criteria',
      measurementMethod: [
        { text: '47-point assessment applied at onboarding' },
        { text: 'Re-evaluated annually with published scoring' },
      ],
    },
  ];

  const certifications = pageConfig?.certifications?.items?.length 
    ? pageConfig.certifications.items 
    : defaultCertifications;

  // Transform CMS initiatives to match the Initiative type
  const initiatives: Initiative[] = pageConfig?.initiatives?.items?.length
    ? pageConfig.initiatives.items
        .filter((item): item is NonNullable<typeof item> => !!item?.title)
        .map((item) => ({
          title: item.title || '',
          location: item.location || '',
          description: item.description || '',
          operationalApproach: (item.operationalApproach || [])
            .filter((approach): approach is { text?: string } => !!approach?.text)
            .map((approach) => ({ text: approach.text || '' })),
          order: item.order || 0,
          status: (item.status as 'active' | 'archived') || 'active',
        }))
    : defaultInitiatives;

  const practices = pageConfig?.practices?.items?.length
    ? pageConfig.practices.items
    : defaultPractices;

  // Transform CMS responsible practices or use defaults
  const responsiblePractices: ResponsiblePractice[] = pageConfig?.opStandards?.practices?.length
    ? pageConfig.opStandards.practices
        .filter((item): item is NonNullable<typeof item> => !!item?.title)
        .map((item) => ({
          title: item.title || '',
          description: item.description || '',
          details: (item.details || [])
            .filter((detail): detail is { text?: string } => !!detail?.text)
            .map((detail) => ({ text: detail.text || '' })),
          order: item.order || 0,
          status: (item.status as 'active' | 'inactive') || 'active',
        }))
    : defaultResponsiblePractices;

  const impact = pageConfig?.impact?.items?.length
    ? pageConfig.impact.items
    : defaultImpact;

  return (
    <main className="min-h-screen">
      {/* Hero Section - Premium */}
      <HeroSectionPremium
        backgroundImage={pageConfig?.hero?.backgroundImage?.url ? getImageUrl(pageConfig.hero.backgroundImage.url) : getMockImageSrc(6)}
        eyebrow="Responsible Tourism"
        title={pageConfig?.hero?.title || 'Sustainability & Responsibility'}
        subtitle={pageConfig?.hero?.subtitle || 'Our commitment to sustainable tourism goes beyond compliance. We believe in creating positive impact for communities, environment, and future generations.'}
        height="large"
        overlayOpacity="medium"
        alignment="left"
      />

      {/* Philosophy Section */}
      {pageConfig?.philosophy?.enabled !== false && (
        <SustainabilityPhilosophy
          eyebrow={pageConfig?.philosophy?.eyebrow || 'Our Philosophy'}
          title={pageConfig?.philosophy?.title || 'Travel That Matters'}
          content={pageConfig?.philosophy?.statement}
        />
      )}

      {/* Certifications Section */}
      {pageConfig?.certifications?.enabled !== false && (
        <CertificationsSection
          eyebrow={pageConfig?.certifications?.eyebrow || 'Verified Standards'}
          title={pageConfig?.certifications?.title || 'Certifications & Memberships'}
          description={pageConfig?.certifications?.description}
          certifications={certifications}
        />
      )}

      {/* Initiatives Section — Place-Driven Editorial Design */}
      {pageConfig?.initiatives?.enabled !== false && (
        <PlaceDrivenInitiatives
          eyebrow={pageConfig?.initiatives?.eyebrow || 'What We Do'}
          title={pageConfig?.initiatives?.title || 'Our Initiatives'}
          initiatives={initiatives}
        />
      )}

      {/* Responsible Practices Section — Editorial Practice-as-Discipline Design */}
      {pageConfig?.opStandards?.enabled !== false && (
        <ResponsiblePracticesSection
          eyebrow={pageConfig?.opStandards?.eyebrow || 'Operating Standards'}
          title={pageConfig?.opStandards?.title || 'Responsible Tourism Practices'}
          introduction={pageConfig?.opStandards?.introduction}
          practices={responsiblePractices}
          contextImage={pageConfig?.opStandards?.contextImage?.url 
            ? getImageUrl(pageConfig.opStandards.contextImage.url) 
            : undefined}
        />
      )}

      {/* Supplier Standards Section — Editorial Partner Vetting Criteria */}
      {pageConfig?.supplierStandards?.enabled !== false && (
        <SupplierStandardsSection
          eyebrow={pageConfig?.supplierStandards?.eyebrow || 'Supply Chain'}
          title={pageConfig?.supplierStandards?.title || 'Partner & Supplier Standards'}
          description={pageConfig?.supplierStandards?.description}
          criteria={pageConfig?.supplierStandards?.criteria}
        />
      )}

      {/* Measurable Results Section — Text-First Credibility Layout */}
      {pageConfig?.impact?.enabled !== false && (
        <MeasurableResultsSection
          eyebrow={pageConfig?.impact?.eyebrow || 'Our Impact'}
          title={pageConfig?.impact?.title || 'Measurable Results'}
          year={pageConfig?.impact?.year}
          results={impact}
        />
      )}

      {/* CTA Section - Premium */}
      {pageConfig?.cta?.enabled !== false && (
        <CTASectionPremium
          eyebrow="Partner With Purpose"
          title={pageConfig?.cta?.title || 'Partner With a Responsible Operator'}
          description={pageConfig?.cta?.description || 'Join us in creating meaningful, sustainable travel experiences that benefit all stakeholders.'}
          primaryButtonText={pageConfig?.cta?.primaryButtonText || 'Discuss Partnership'}
          primaryButtonLink={pageConfig?.cta?.primaryButtonLink || '/partners/inquiry'}
          variant="accent"
        />
      )}
    </main>
  );
}
