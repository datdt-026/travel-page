import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import RichText from '@/components/RichText';
import ShareButton from '@/components/ShareButton';
import { getBlogPostBySlug, getImageUrl } from '@/lib/api';
import { BlogPost, BLOG_CATEGORY_LABELS, User } from '@/types';
import { toTitleCase } from '@/i18n/utils';

export const revalidate = 3600;

interface BlogPostPageProps {
  params: { locale: string; slug: string };
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
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Get ISO date for schema
 */
function getISODate(dateString: string | undefined): string {
  if (!dateString) return new Date().toISOString();
  try {
    return new Date(dateString).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Get author name from User object or string
 */
function getAuthorName(author: User | string | undefined): string {
  if (!author) return 'Đội ngũ VietWay';
  if (typeof author === 'string') return author;
  return author.name || author.email || 'Đội ngũ VietWay';
}

/**
 * Get category label for display
 */
function getCategoryLabel(category: BlogPost['category']): string {
  return BLOG_CATEGORY_LABELS[category] || category;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const post = await getBlogPostBySlug(params.slug, locale) as BlogPost | null;

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const alternates = generateAlternateLanguages(`/${locale}/blog/${params.slug}`);

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.metaKeywords,
    alternates,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const post = await getBlogPostBySlug(params.slug, locale) as BlogPost | null;

  if (!post) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/blog/${params.slug}`);
  const localePath = (path: string) => `/${locale}${path}`;

  const breadcrumbs = [
    { name: dict.blog?.title || 'Blog', url: localePath('/blog') },
    { name: post.title, url: localePath(`/blog/${params.slug}`) },
  ];

  const authorName = getAuthorName(post.author);

  // Article structured data for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: getISODate(post.publishedAt),
    dateModified: getISODate(post.updatedAt),
    author: { '@type': 'Person', name: authorName },
    publisher: {
      '@type': 'Organization',
      name: 'VietWay',
    },
  };

  // Get featured image URL
  const heroImageUrl = post.featuredImage && typeof post.featuredImage === 'object'
    ? getImageUrl(post.featuredImage.url)
    : null;

  return (
    <div>
      {hreflangLinks}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Banner - Quiet Luxury Style */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] w-full flex items-end -mt-20 md:-mt-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          {heroImageUrl ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImageUrl})` }}
            />
          ) : (
            <div className="w-full h-full bg-surface-dark" />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 hero-overlay-medium" />
        </div>
        
        {/* Content - Bottom Left */}
        <div className="relative z-10 w-full">
          <div className="container-wide pb-16 md:pb-20 pt-32">
            {/* Breadcrumb */}
            <div className="text-label-md uppercase text-content-inverse/60 tracking-wider mb-8 opacity-0 animate-fade-in">
              <Link href={localePath('/blog')} className="text-accent hover:text-content-inverse transition-colors duration-300">
                {dict.blog?.title || 'Blog'}
              </Link>
              <span className="mx-3">—</span>
              <span className="text-content-inverse/60 truncate max-w-xs">{getCategoryLabel(post.category)}</span>
            </div>
            
            {/* Accent line */}
            <div className="w-16 h-px bg-accent mb-8 opacity-0 animate-fade-in animation-delay-200" />
          
            <h1 className="font-serif font-semibold text-display-lg text-content-inverse mb-6 tracking-wide opacity-0 animate-fade-in-up leading-tight">
              {toTitleCase(post.title)}
            </h1>
          
            <p className="text-lg md:text-xl text-content-inverse/80 max-w-2xl leading-relaxed font-light opacity-0 animate-fade-in-up animation-delay-200">
              {post.excerpt}
            </p>
          
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mt-8 opacity-0 animate-fade-in-up animation-delay-400 text-content-inverse/60 text-sm">
              <span>{dict.blog?.by || 'By'} {authorName}</span>
              <span className="text-content-inverse/30">•</span>
              <time dateTime={getISODate(post.publishedAt)}>{formatDate(post.publishedAt, locale)}</time>
              {post.readTime && (
                <>
                  <span className="text-content-inverse/30">•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 md:py-24 bg-surface-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Article Body */}
              <div className="prose prose-lg max-w-none 
                prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-wide 
                prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6 
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-content-secondary prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-content-primary prose-strong:font-medium
                prose-ul:my-6 prose-li:text-content-secondary
                prose-blockquote:border-l-accent prose-blockquote:bg-surface-secondary prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-content-primary prose-blockquote:font-serif prose-blockquote:text-xl
                prose-img:rounded-none prose-img:my-10
              ">
                <RichText content={post.content} />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border-light">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-label-sm uppercase text-content-muted tracking-wider">{dict.blog?.tags || 'Tags'}:</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-surface-secondary text-body-sm text-content-secondary hover:bg-surface-tertiary transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share & Navigation */}
              <footer className="mt-12 pt-8 border-t border-border-light">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <Link
                    href={localePath('/blog')}
                    className="inline-flex items-center text-label-md uppercase text-content-primary hover:text-accent transition-colors duration-300 tracking-wider"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    {dict.blog?.backToBlog || 'All Articles'}
                  </Link>
                  
                  <ShareButton />
                </div>
              </footer>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-10">
                {/* Author Card */}
                <div className="bg-surface-secondary p-8">
                  <span className="text-label-sm uppercase text-content-muted tracking-wider mb-4 block">
                    {dict.blog?.writtenBy || 'Written By'}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-surface-tertiary rounded-full flex items-center justify-center">
                      <span className="text-xl text-content-muted">✦</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-heading-sm text-content-primary">
                        {authorName}
                      </h4>
                      <p className="text-body-sm text-content-muted">
                        {dict.blog?.contributor || 'Contributor'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Article Info */}
                <div className="border-l-2 border-accent pl-6 space-y-4">
                  <div>
                    <span className="text-label-sm uppercase text-content-muted tracking-wider block mb-1">
                      {dict.blog?.published || 'Published'}
                    </span>
                    <time dateTime={getISODate(post.publishedAt)} className="text-body-md text-content-primary">
                      {formatDate(post.publishedAt, locale)}
                    </time>
                  </div>
                  
                  {post.readTime && (
                    <div>
                      <span className="text-label-sm uppercase text-content-muted tracking-wider block mb-1">
                        {dict.blog?.readingTime || 'Reading Time'}
                      </span>
                      <span className="text-body-md text-content-primary">{post.readTime}</span>
                    </div>
                  )}
                  
                  <div>
                    <span className="text-label-sm uppercase text-content-muted tracking-wider block mb-1">
                      {dict.blog?.category || 'Category'}
                    </span>
                    <span className="text-body-md text-accent">{getCategoryLabel(post.category)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}
