import { Metadata } from 'next';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages, generateHreflangLinks } from '@/lib/seo-i18n';
import { getPageBySlug, getImageUrl, getContactPageConfig } from '@/lib/api';
import { Page } from '@/types';
import RichText from '@/components/RichText';
import { toTitleCase } from '@/i18n/utils';
import { 
  DynamicHeroSection,
  ContactInfoSection,
  ContactFormSection,
  SocialSection,
  MapSection,
} from '@/components/cms';

export const revalidate = 3600;

// Type for Contact Page CMS Config
interface ContactPageConfig {
  hero?: {
    backgroundImage?: { url?: string } | null;
    title?: string;
    subtitle?: string;
    height?: string;
    overlayStyle?: string;
    overlayOpacity?: number;
    eyebrow?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  contactInfo?: {
    sectionTitle?: string;
    email?: { icon?: string; label?: string; value?: string; description?: string };
    phone?: { icon?: string; label?: string; value?: string; description?: string };
    address?: { icon?: string; label?: string; value?: string; mapLink?: string };
    hours?: { icon?: string; label?: string; value?: string };
  };
  form?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    fields?: {
      namePlaceholder?: string;
      emailPlaceholder?: string;
      subjectPlaceholder?: string;
      messagePlaceholder?: string;
      submitButtonText?: string;
    };
    successMessage?: string;
    errorMessage?: string;
  };
  social?: {
    enabled?: boolean;
    title?: string;
    links?: { platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube' | 'tiktok' | 'pinterest'; url: string }[];
  };
  map?: {
    enabled?: boolean;
    embedUrl?: string;
    height?: 'small' | 'medium' | 'large';
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const pageConfig = await getContactPageConfig(locale) as ContactPageConfig | null;
  const page = await getPageBySlug('contact', locale) as Page | null;
  const alternates = generateAlternateLanguages(`/${locale}/contact`);

  return {
    title: pageConfig?.seo?.metaTitle || page?.seo?.metaTitle || page?.title || dict.contact?.title || 'Contact Us',
    description: pageConfig?.seo?.metaDescription || page?.seo?.metaDescription || page?.excerpt || dict.contact?.description || 'Get in touch with us.',
    keywords: pageConfig?.seo?.metaKeywords || page?.seo?.metaKeywords,
    alternates,
  };
}

export default async function ContactPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const dict = await getDictionary(locale);
  const hreflangLinks = generateHreflangLinks(`/${locale}/contact`);

  // Fetch page config and content from CMS
  const pageConfig = await getContactPageConfig(locale) as ContactPageConfig | null;
  const page = await getPageBySlug('contact', locale) as Page | null;
  
  // Use CMS content if available, otherwise fall back to dictionary
  const title = pageConfig?.hero?.title || page?.title || dict.contact?.title || 'Contact Us';
  const subtitle = pageConfig?.hero?.subtitle || page?.excerpt || dict.contact?.subtitle || "Have a question or suggestion? We'd love to hear from you.";

  // Build hero config from CMS
  const rawBackgroundImage = pageConfig?.hero?.backgroundImage || page?.featuredImage;
  const backgroundImage = typeof rawBackgroundImage === 'string' 
    ? { url: rawBackgroundImage } 
    : rawBackgroundImage;
  
  const heroConfig = {
    title: title as string,
    subtitle: subtitle as string,
    backgroundImage,
    height: (pageConfig?.hero?.height as 'auto' | 'small' | 'medium' | 'large' | 'full') || 'large',
    overlayOpacity: pageConfig?.hero?.overlayOpacity || 50,
    eyebrow: pageConfig?.hero?.eyebrow || 'Get in Touch',
    ctaText: pageConfig?.hero?.ctaText,
    ctaLink: pageConfig?.hero?.ctaLink,
  };

  // Contact info config with defaults
  const contactInfoConfig = {
    sectionTitle: pageConfig?.contactInfo?.sectionTitle || dict.contact?.getInTouch || 'Get in Touch',
    email: {
      icon: pageConfig?.contactInfo?.email?.icon || '✉️',
      label: pageConfig?.contactInfo?.email?.label || dict.contact?.emailUs || 'Email Us',
      value: pageConfig?.contactInfo?.email?.value || 'hello@travelsite.com',
      description: pageConfig?.contactInfo?.email?.description,
    },
    phone: {
      icon: pageConfig?.contactInfo?.phone?.icon || '📞',
      label: pageConfig?.contactInfo?.phone?.label || dict.contact?.callUs || 'Call Us',
      value: pageConfig?.contactInfo?.phone?.value,
      description: pageConfig?.contactInfo?.phone?.description,
    },
    address: {
      icon: pageConfig?.contactInfo?.address?.icon || '📍',
      label: pageConfig?.contactInfo?.address?.label || dict.contact?.office || 'Visit Us',
      value: pageConfig?.contactInfo?.address?.value || '123 Travel Street\nAdventure City, AC 12345',
      mapLink: pageConfig?.contactInfo?.address?.mapLink,
    },
    hours: {
      icon: pageConfig?.contactInfo?.hours?.icon || '🕐',
      label: pageConfig?.contactInfo?.hours?.label || dict.contact?.hours || 'Business Hours',
      value: pageConfig?.contactInfo?.hours?.value || 'Monday - Friday: 9am - 6pm\nSaturday: 10am - 4pm',
    },
  };

  // Form config
  const formConfig = {
    enabled: pageConfig?.form?.enabled !== false,
    title: pageConfig?.form?.title || dict.contact?.sendMessage || 'Send Us a Message',
    subtitle: pageConfig?.form?.subtitle,
    fields: {
      namePlaceholder: pageConfig?.form?.fields?.namePlaceholder || dict.contact?.yourName || 'Your Name',
      emailPlaceholder: pageConfig?.form?.fields?.emailPlaceholder || dict.contact?.yourEmail || 'Your Email',
      subjectPlaceholder: pageConfig?.form?.fields?.subjectPlaceholder || dict.contact?.subject || 'Subject',
      messagePlaceholder: pageConfig?.form?.fields?.messagePlaceholder || dict.contact?.yourMessage || 'Your Message',
      submitButtonText: pageConfig?.form?.fields?.submitButtonText || dict.contact?.send || 'Send Message',
    },
    successMessage: pageConfig?.form?.successMessage,
    errorMessage: pageConfig?.form?.errorMessage,
  };

  return (
    <div>
      {hreflangLinks}
      
      {/* Dynamic Hero Section from CMS */}
      <DynamicHeroSection 
        config={heroConfig}
        fallback={{
          title: dict.contact?.title || 'Contact Us',
          subtitle: dict.contact?.subtitle || "Have a question or suggestion? We'd love to hear from you.",
        }}
      />

      <section className="section-lg bg-surface-primary">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ContactFormSection 
              config={formConfig}
              dict={{
                name: dict.contact?.name || 'Name',
                email: dict.contact?.email || 'Email',
                subject: dict.contact?.subject || 'Subject',
                message: dict.contact?.message || 'Message',
              }}
            />

            {/* Contact Info */}
            <div>
              <ContactInfoSection config={contactInfoConfig} />
              
              {/* CMS Content if available */}
              {page?.content && page.content.length > 0 && (
                <div className="prose prose-luxury mt-8">
                  <RichText content={page.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <SocialSection config={{
        enabled: pageConfig?.social?.enabled,
        title: pageConfig?.social?.title,
        links: pageConfig?.social?.links,
      }} />

      {/* Map Section */}
      <MapSection config={{
        enabled: pageConfig?.map?.enabled,
        embedUrl: pageConfig?.map?.embedUrl,
        height: pageConfig?.map?.height,
      }} />
    </div>
  );
}
