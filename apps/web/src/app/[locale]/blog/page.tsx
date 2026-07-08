import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { getBlogPosts, getImageUrl, getBlogPageConfig } from '@/lib/api';
import { BlogPost, BLOG_CATEGORY_LABELS } from '@/types';
import { toTitleCase } from '@/i18n/utils';
import { DynamicHeroSection, HeroConfig } from '@/components/cms';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
  searchParams: { page?: string };
}

// Type for Blog Page CMS Config
interface BlogPageConfig {
  hero?: HeroConfig;
  listing?: {
    postsPerPage?: number;
    layout?: 'grid' | 'list' | 'magazine';
    columns?: '2' | '3' | '4';
    showCategories?: boolean;
    showSearch?: boolean;
    showFeaturedSection?: boolean;
    featuredPostsCount?: number;
  };
  emptyState?: {
    title?: string;
    message?: string;
    showCTA?: boolean;
    ctaText?: string;
    ctaLink?: string;
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
  const pageConfig = await getBlogPageConfig(locale) as BlogPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/blog`);

  return {
    title: pageConfig?.seo?.metaTitle || pageConfig?.hero?.title || dict.blog?.title || 'Travel Blog',
    description: pageConfig?.seo?.metaDescription || pageConfig?.hero?.subtitle || dict.blog?.description || 'Read our latest travel tips and inspiring stories.',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

/**
 * Format date for display
 */
function formatDate(dateString: string | undefined, locale: string): string {
  if (!dateString) return '';
  try {
    const dateLocale = locale === 'vi' ? 'vi-VN' : locale;
    return new Date(dateString).toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Get category label for display
 */
function getCategoryLabel(category: BlogPost['category']): string {
  return BLOG_CATEGORY_LABELS[category] || category;
}

export default async function BlogPage({ params, searchParams }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/blog`);
  const localePath = (path: string) => `/${locale}${path}`;

  // Fetch page config and blog posts from CMS
  const pageConfig = await getBlogPageConfig(locale) as BlogPageConfig | null;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsPerPage = pageConfig?.listing?.postsPerPage || 10;
  const response = await getBlogPosts({ locale, page: currentPage, limit: postsPerPage });
  const blogPosts = response.docs as BlogPost[];

  // Hero configuration from CMS or fallback
  const heroConfig: HeroConfig = {
    ...pageConfig?.hero,
    // Use first post's image as background if no CMS image is set
    backgroundImage: pageConfig?.hero?.backgroundImage || 
      (blogPosts[0]?.featuredImage && typeof blogPosts[0].featuredImage === 'object' 
        ? { url: blogPosts[0].featuredImage.url } 
        : null),
  };

  // Handle empty state
  if (blogPosts.length === 0) {
    const emptyTitle = pageConfig?.emptyState?.title || 'No Posts Yet';
    const emptyMessage = pageConfig?.emptyState?.message || 'No blog posts available yet. Check back soon!';
    
    return (
      <div>
        {hreflangLinks}
        
        <DynamicHeroSection
          config={heroConfig}
          fallback={{
            title: dict.blog?.title || 'Travel Blog',
            subtitle: dict.blog?.description,
          }}
          breadcrumb={{
            homeLabel: dict.common?.home || 'Home',
            currentLabel: dict.blog?.title || 'Blog',
          }}
        />
        
        <section className="section-lg">
          <div className="container-wide text-center">
            <h2 className="font-serif text-heading-lg text-content-primary mb-4">{emptyTitle}</h2>
            <p className="text-content-muted text-body-lg mb-8">{emptyMessage}</p>
            {pageConfig?.emptyState?.showCTA && pageConfig.emptyState.ctaLink && (
              <Link 
                href={pageConfig.emptyState.ctaLink}
                className="btn-primary"
              >
                {pageConfig.emptyState.ctaText || 'Explore'}
              </Link>
            )}
          </div>
        </section>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);
  const showFeaturedSection = pageConfig?.listing?.showFeaturedSection !== false;
  const gridColumns = pageConfig?.listing?.columns || '3';
  const gridClass = gridColumns === '4' 
    ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12'
    : gridColumns === '2'
      ? 'grid md:grid-cols-2 gap-x-8 gap-y-16'
      : 'grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16';

  return (
    <div>
      {hreflangLinks}
      
      {/* Dynamic Hero Banner from CMS */}
      <DynamicHeroSection
        config={heroConfig}
        fallback={{
          title: dict.blog?.title || 'Travel Blog',
          subtitle: dict.blog?.description,
        }}
        breadcrumb={{
          homeLabel: dict.common?.home || 'Home',
          currentLabel: dict.blog?.title || 'Blog',
        }}
      />

      {/* Featured Article */}
      {showFeaturedSection && (
      <section className="py-16 md:py-24 bg-surface-primary">
        <div className="container-wide">
          <Link
            href={localePath(`/blog/${featuredPost.slug}`)}
            className="group block"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-surface-tertiary">
                {featuredPost.featuredImage && typeof featuredPost.featuredImage === 'object' && (
                  <Image
                    src={getImageUrl(featuredPost.featuredImage.url) || ''}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute top-4 left-4 px-4 py-2 bg-accent text-surface-dark text-label-sm uppercase tracking-wider">
                  Featured
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:py-8">
                <span className="text-label-md uppercase text-accent tracking-wider mb-4 block">
                  {getCategoryLabel(featuredPost.category)}
                </span>
                <h2 className="font-serif text-heading-xl lg:text-display-md text-content-primary mb-6 group-hover:text-accent transition-colors duration-300 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-body-lg text-content-secondary mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-body-sm text-content-muted">
                  <time dateTime={featuredPost.publishedAt}>{formatDate(featuredPost.publishedAt, locale)}</time>
                  {featuredPost.readTime && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-content-muted" />
                      <span>{featuredPost.readTime}</span>
                    </>
                  )}
                </div>
                <div className="mt-8">
                  <span className="inline-flex items-center text-label-md uppercase text-content-primary group-hover:text-accent transition-colors duration-300 tracking-wider">
                    {dict.common?.readMore || 'Read Article'}
                    <svg className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      )}

      {/* Articles Grid */}
      {otherPosts.length > 0 && (
        <section className="pb-24 bg-surface-primary">
          <div className="container-wide">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-border-light">
              <h2 className="font-serif text-heading-lg text-content-primary">
                Latest Articles
              </h2>
            </div>
            
            {/* Grid - uses CMS column config */}
            <div className={gridClass}>
              {otherPosts.map((post) => {
                const postImageUrl = post.featuredImage && typeof post.featuredImage === 'object'
                  ? getImageUrl(post.featuredImage.url)
                  : null;
                  
                return (
                  <Link
                    key={post.slug}
                    href={localePath(`/blog/${post.slug}`)}
                    className="group block"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/2] overflow-hidden bg-surface-tertiary mb-6">
                      {postImageUrl ? (
                        <Image
                          src={postImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-surface-tertiary flex items-center justify-center">
                          <span className="text-content-muted text-4xl">✦</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Category */}
                    <span className="text-label-sm uppercase text-accent tracking-wider mb-3 block">
                      {getCategoryLabel(post.category)}
                    </span>
                    
                    {/* Title */}
                    <h3 className="font-serif text-heading-md text-content-primary mb-3 group-hover:text-accent transition-colors duration-300 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-body-sm text-content-muted line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-label-sm text-content-light">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                      {post.readTime && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-content-light" />
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {response.totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-20 pt-12 border-t border-border-light">
                {response.hasPrevPage && (
                  <Link
                    href={localePath(`/blog?page=${response.prevPage}`)}
                    className="flex items-center gap-2 text-label-md uppercase text-content-primary hover:text-accent transition-colors duration-300 tracking-wider"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous
                  </Link>
                )}
                
                <span className="px-6 py-2 text-body-sm text-content-muted border-x border-border-light">
                  {response.page} / {response.totalPages}
                </span>
                
                {response.hasNextPage && (
                  <Link
                    href={localePath(`/blog?page=${response.nextPage}`)}
                    className="flex items-center gap-2 text-label-md uppercase text-content-primary hover:text-accent transition-colors duration-300 tracking-wider"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
