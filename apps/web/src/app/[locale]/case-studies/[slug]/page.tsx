import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCaseStudyBySlug, getCaseStudies, getImageUrl } from '@/lib/api';
import { isValidLocale, defaultLocale } from '@/i18n';

/**
 * Case Study Detail Page
 * 
 * An editorial, operational case reference — NOT a marketing success story.
 * Used by travel partners, procurement teams, and sales leads.
 * 
 * Structure:
 * 1. Opening Context (above fold)
 * 2. Case Overview
 * 3. Delivery Approach
 * 4. Responsible Practices
 * 5. Measurable Results
 * 6. Learnings & Continuity
 * 7. Related Case Studies
 */

// Types
interface Media {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface DeliveryBlock {
  heading?: string;
  content?: string;
}

interface ResponsiblePractice {
  practice?: string;
  application?: string;
}

interface MeasurableResult {
  value?: string;
  label?: string;
  context?: string;
  measurementMethod?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  destination?: string;
  region?: string;
  summary?: string;
  featuredImage?: Media | string;
  overview?: {
    caseContext?: string;
    journeyType?: string;
    duration?: string;
    operatingEnvironment?: string;
  };
  deliveryApproach?: DeliveryBlock[];
  responsiblePractices?: ResponsiblePractice[];
  measurableResults?: MeasurableResult[];
  learnings?: {
    keyLearnings?: string;
    futureApplication?: string;
    continuousImprovement?: string;
  };
  relatedCaseStudies?: CaseStudy[] | string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: Media | string;
  };
}

interface Props {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const caseStudy = await getCaseStudyBySlug(slug, locale) as CaseStudy | null;

  if (!caseStudy) {
    return { title: 'Case Study Not Found' };
  }

  const imageUrl = typeof caseStudy.featuredImage === 'object'
    ? getImageUrl(caseStudy.featuredImage?.url)
    : undefined;

  const ogImageUrl = caseStudy.seo?.ogImage && typeof caseStudy.seo.ogImage === 'object'
    ? getImageUrl(caseStudy.seo.ogImage?.url)
    : imageUrl;

  return {
    title: caseStudy.seo?.metaTitle || `${caseStudy.title} | Case Study`,
    description: caseStudy.seo?.metaDescription || caseStudy.summary,
    keywords: caseStudy.seo?.metaKeywords,
    openGraph: {
      title: caseStudy.seo?.metaTitle || caseStudy.title,
      description: caseStudy.seo?.metaDescription || caseStudy.summary,
      images: ogImageUrl ? [ogImageUrl] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.seo?.metaTitle || caseStudy.title,
      description: caseStudy.seo?.metaDescription || caseStudy.summary,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: `/${locale}/case-studies/${slug}`,
      languages: {
        en: `/en/case-studies/${slug}`,
        vi: `/vi/case-studies/${slug}`,
        fr: `/fr/case-studies/${slug}`,
        de: `/de/case-studies/${slug}`,
      },
    },
  };
}

// Static params for build-time generation
export async function generateStaticParams() {
  const response = await getCaseStudies({ locale: defaultLocale, limit: 100, status: 'published' });
  const caseStudies = (response?.docs || []) as CaseStudy[];
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

// Helper to get image URL
function getFeaturedImageUrl(image: Media | string | undefined): string | undefined {
  if (!image) return undefined;
  if (typeof image === 'string') return undefined;
  return getImageUrl(image.url);
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const validLocale = isValidLocale(locale) ? locale : defaultLocale;

  const caseStudy = await getCaseStudyBySlug(slug, validLocale) as CaseStudy | null;

  if (!caseStudy) {
    notFound();
  }

  const featuredImageUrl = getFeaturedImageUrl(caseStudy.featuredImage);

  return (
    <main className="min-h-screen bg-background">
      {/* ════════════════════════════════════════════════════════════════
          SECTION 1: OPENING CONTEXT (Above the Fold)
          ════════════════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center text-sm text-foreground-secondary">
              <li>
                <Link href={`/${validLocale}/case-studies`} className="hover:text-foreground transition-colors">
                  Case Studies
                </Link>
              </li>
              <li className="mx-2">/</li>
              <li className="text-foreground-secondary/70 truncate max-w-[200px]">
                {caseStudy.title}
              </li>
            </ol>
          </nav>

          {/* Destination Label */}
          {caseStudy.destination && (
            <p className="text-sm tracking-widest uppercase text-accent mb-4">
              {caseStudy.destination}
              {caseStudy.region && <span className="text-foreground-secondary/60"> · {caseStudy.region}</span>}
            </p>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light leading-tight max-w-4xl mb-6">
            {caseStudy.title}
          </h1>

          {/* Editorial Summary */}
          {caseStudy.summary && (
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed">
              {caseStudy.summary}
            </p>
          )}
        </div>

        {/* Featured Image - Full Width */}
        {featuredImageUrl && (
          <div className="mt-12 md:mt-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
                <Image
                  src={featuredImageUrl}
                  alt={caseStudy.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">

          {/* ════════════════════════════════════════════════════════════════
              SECTION 2: CASE OVERVIEW
              ════════════════════════════════════════════════════════════════ */}
          {caseStudy.overview && (
            <section className="py-12 md:py-16 border-t border-border">
              <h2 className="text-xs tracking-widest uppercase text-foreground-secondary mb-8">
                Case Overview
              </h2>

              <div className="space-y-8">
                {caseStudy.overview.caseContext && (
                  <div>
                    <p className="text-foreground leading-relaxed text-lg">
                      {caseStudy.overview.caseContext}
                    </p>
                  </div>
                )}

                {/* Travel Context Details */}
                <div className="grid md:grid-cols-3 gap-6 pt-4">
                  {caseStudy.overview.journeyType && (
                    <div>
                      <p className="text-xs tracking-wider uppercase text-foreground-secondary/70 mb-1">
                        Journey Type
                      </p>
                      <p className="text-foreground">
                        {caseStudy.overview.journeyType}
                      </p>
                    </div>
                  )}
                  {caseStudy.overview.duration && (
                    <div>
                      <p className="text-xs tracking-wider uppercase text-foreground-secondary/70 mb-1">
                        Duration
                      </p>
                      <p className="text-foreground">
                        {caseStudy.overview.duration}
                      </p>
                    </div>
                  )}
                  {caseStudy.overview.operatingEnvironment && (
                    <div className="md:col-span-3">
                      <p className="text-xs tracking-wider uppercase text-foreground-secondary/70 mb-1">
                        Operating Environment
                      </p>
                      <p className="text-foreground-secondary leading-relaxed">
                        {caseStudy.overview.operatingEnvironment}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SECTION 3: DELIVERY APPROACH
              ════════════════════════════════════════════════════════════════ */}
          {caseStudy.deliveryApproach && caseStudy.deliveryApproach.length > 0 && (
            <section className="py-12 md:py-16 border-t border-border">
              <h2 className="text-xs tracking-widest uppercase text-foreground-secondary mb-8">
                Delivery Approach
              </h2>

              <div className="space-y-10">
                {caseStudy.deliveryApproach.map((block, index) => (
                  <div key={index}>
                    {block.heading && (
                      <h3 className="font-serif text-xl text-foreground mb-3">
                        {block.heading}
                      </h3>
                    )}
                    {block.content && (
                      <p className="text-foreground-secondary leading-relaxed">
                        {block.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SECTION 4: RESPONSIBLE PRACTICES
              ════════════════════════════════════════════════════════════════ */}
          {caseStudy.responsiblePractices && caseStudy.responsiblePractices.length > 0 && (
            <section className="py-12 md:py-16 border-t border-border">
              <h2 className="text-xs tracking-widest uppercase text-foreground-secondary mb-8">
                Responsible Practices Applied
              </h2>

              <div className="space-y-8">
                {caseStudy.responsiblePractices.map((practice, index) => (
                  <div key={index} className="pl-4 border-l-2 border-accent/30">
                    {practice.practice && (
                      <p className="text-sm font-medium text-accent mb-2">
                        {practice.practice}
                      </p>
                    )}
                    {practice.application && (
                      <p className="text-foreground-secondary leading-relaxed">
                        {practice.application}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SECTION 5: MEASURABLE RESULTS
              ════════════════════════════════════════════════════════════════ */}
          {caseStudy.measurableResults && caseStudy.measurableResults.length > 0 && (
            <section className="py-12 md:py-16 border-t border-border">
              <h2 className="text-xs tracking-widest uppercase text-foreground-secondary mb-10">
                Measurable Results
              </h2>

              <div className="space-y-10">
                {caseStudy.measurableResults.map((result, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-baseline gap-4">
                    {/* Metric Value */}
                    <div className="md:w-32 flex-shrink-0">
                      <span className="font-serif text-4xl md:text-5xl text-foreground">
                        {result.value}
                      </span>
                    </div>

                    {/* Label & Context */}
                    <div className="flex-1">
                      {result.label && (
                        <p className="text-foreground font-medium mb-1">
                          {result.label}
                        </p>
                      )}
                      {result.context && (
                        <p className="text-foreground-secondary text-sm">
                          {result.context}
                        </p>
                      )}
                      {result.measurementMethod && (
                        <p className="text-foreground-secondary/60 text-xs mt-2 italic">
                          Measured via: {result.measurementMethod}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SECTION 6: LEARNINGS & CONTINUITY
              ════════════════════════════════════════════════════════════════ */}
          {caseStudy.learnings && (
            <section className="py-12 md:py-16 border-t border-border">
              <h2 className="text-xs tracking-widest uppercase text-foreground-secondary mb-8">
                Learnings & Continuity
              </h2>

              <div className="space-y-8">
                {caseStudy.learnings.keyLearnings && (
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      Key Learnings
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                      {caseStudy.learnings.keyLearnings}
                    </p>
                  </div>
                )}

                {caseStudy.learnings.futureApplication && (
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      Future Application
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                      {caseStudy.learnings.futureApplication}
                    </p>
                  </div>
                )}

                {caseStudy.learnings.continuousImprovement && (
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      Continuous Improvement
                    </h3>
                    <p className="text-foreground-secondary leading-relaxed">
                      {caseStudy.learnings.continuousImprovement}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ════════════════════════════════════════════════════════════════
              SECTION 7: RELATED CASE STUDIES
              ════════════════════════════════════════════════════════════════ */}
          {caseStudy.relatedCaseStudies && caseStudy.relatedCaseStudies.length > 0 && (
            <section className="py-12 md:py-16 border-t border-border">
              <h2 className="text-xs tracking-widest uppercase text-foreground-secondary mb-6">
                Related Case Studies
              </h2>

              <ul className="space-y-3">
                {caseStudy.relatedCaseStudies.map((related, index) => {
                  // Handle both populated objects and string IDs
                  if (typeof related === 'string') return null;
                  
                  return (
                    <li key={index}>
                      <Link
                        href={`/${validLocale}/case-studies/${related.slug}`}
                        className="group inline-flex items-center text-foreground hover:text-accent transition-colors"
                      >
                        <span className="font-serif text-lg">{related.title}</span>
                        {related.destination && (
                          <span className="ml-2 text-sm text-foreground-secondary/60">
                            — {related.destination}
                          </span>
                        )}
                        <svg 
                          className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Back to Case Studies */}
          <div className="py-12 md:py-16 border-t border-border">
            <Link
              href={`/${validLocale}/case-studies`}
              className="inline-flex items-center text-foreground-secondary hover:text-foreground transition-colors"
            >
              <svg 
                className="mr-2 w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>All Case Studies</span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
