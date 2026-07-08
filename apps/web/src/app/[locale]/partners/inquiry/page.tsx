import { Metadata } from 'next';
import { getDictionary } from '@/i18n/server';
import { isValidLocale, defaultLocale } from '@/i18n';
import { generateAlternateLanguages } from '@/lib/seo-i18n';
import { getPartnerInquiryPageConfig, getImageUrl } from '@/lib/api';
import { B2BInquiryForm } from '@/components/b2b/B2BInquiryForm';
import { InquiryBenefits } from '@/components/b2b/InquiryBenefits';

export const revalidate = 3600;

interface Props {
  params: { locale: string };
}

// Type for Partner Inquiry Page CMS Config
interface PartnerInquiryPageConfig {
  hero?: {
    backgroundImage?: { url?: string } | null;
    title?: string;
    subtitle?: string;
    height?: string;
  };
  form?: {
    title?: string;
    description?: string;
    companyFields?: {
      companyName?: { label?: string; placeholder?: string; required?: boolean };
      website?: { label?: string; placeholder?: string; required?: boolean };
      country?: { label?: string; placeholder?: string; required?: boolean };
      companyType?: {
        label?: string;
        required?: boolean;
        options?: { value?: string; label?: string }[];
      };
    };
    contactFields?: {
      contactName?: { label?: string; placeholder?: string; required?: boolean };
      email?: { label?: string; placeholder?: string; required?: boolean };
      phone?: { label?: string; placeholder?: string; required?: boolean };
      role?: {
        label?: string;
        required?: boolean;
        options?: { value?: string; label?: string }[];
      };
    };
    businessFields?: {
      annualVolume?: {
        label?: string;
        required?: boolean;
        options?: { value?: string; label?: string }[];
      };
      destinationsOfInterest?: {
        label?: string;
        required?: boolean;
        options?: { value?: string; label?: string }[];
      };
      servicesOfInterest?: {
        label?: string;
        required?: boolean;
        options?: { value?: string; label?: string }[];
      };
    };
    additionalFields?: {
      partnershipType?: {
        label?: string;
        required?: boolean;
        options?: { value?: string; label?: string }[];
      };
      message?: { label?: string; placeholder?: string; required?: boolean };
      howDidYouHear?: {
        label?: string;
        options?: { value?: string; label?: string }[];
      };
    };
    submitButton?: {
      text?: string;
      loadingText?: string;
    };
    successMessage?: {
      title?: string;
      description?: string;
    };
  };
  sidebar?: {
    enabled?: boolean;
    title?: string;
    benefits?: {
      icon?: string;
      title?: string;
      description?: string;
    }[];
    contact?: {
      title?: string;
      email?: string;
      phone?: string;
      responseTime?: string;
    };
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const pageConfig = await getPartnerInquiryPageConfig(locale) as PartnerInquiryPageConfig | null;
  const alternates = generateAlternateLanguages(`/${locale}/partners/inquiry`);

  return {
    title: pageConfig?.seo?.metaTitle || 'Partnership Inquiry | Voyager',
    description: pageConfig?.seo?.metaDescription || 'Start a conversation about partnering with us as your Southeast Asia DMC',
    keywords: pageConfig?.seo?.metaKeywords,
    alternates,
  };
}

export default async function PartnerInquiryPage({ params }: Props) {
  const locale = isValidLocale(params.locale) ? params.locale : defaultLocale;
  const [dict, pageConfig] = await Promise.all([
    getDictionary(locale),
    getPartnerInquiryPageConfig(locale) as Promise<PartnerInquiryPageConfig | null>,
  ]);

  // Default form configuration
  const defaultFormConfig = {
    title: 'Partnership Inquiry',
    description: 'Please tell us about your company and how we can work together. Our team will review your inquiry and respond within 2 business days.',
    companyFields: {
      companyName: { label: 'Company Name', placeholder: 'Your company name', required: true },
      website: { label: 'Website', placeholder: 'https://yourcompany.com', required: false },
      country: { label: 'Country', placeholder: 'Country/Region', required: true },
      companyType: {
        label: 'Company Type',
        required: true,
        options: [
          { value: '', label: 'Select company type...' },
          { value: 'tour_operator', label: 'Tour Operator' },
          { value: 'travel_agency', label: 'Travel Agency' },
          { value: 'ota', label: 'Online Travel Agency (OTA)' },
          { value: 'mice', label: 'MICE/Events Agency' },
          { value: 'corporate', label: 'Corporate Travel' },
          { value: 'luxury', label: 'Luxury Travel Specialist' },
          { value: 'other', label: 'Other' },
        ],
      },
    },
    contactFields: {
      contactName: { label: 'Contact Name', placeholder: 'Your name', required: true },
      email: { label: 'Business Email', placeholder: 'your@company.com', required: true },
      phone: { label: 'Phone', placeholder: '+1 234 567 8900', required: false },
      role: {
        label: 'Your Role',
        required: false,
        options: [
          { value: '', label: 'Select role...' },
          { value: 'owner', label: 'Owner/CEO' },
          { value: 'director', label: 'Director' },
          { value: 'product_manager', label: 'Product Manager' },
          { value: 'operations', label: 'Operations' },
          { value: 'sales', label: 'Sales' },
          { value: 'other', label: 'Other' },
        ],
      },
    },
    businessFields: {
      annualVolume: {
        label: 'Annual Passenger Volume to SE Asia',
        required: true,
        options: [
          { value: '', label: 'Select volume...' },
          { value: 'under_100', label: 'Under 100 pax' },
          { value: '100_500', label: '100-500 pax' },
          { value: '500_1000', label: '500-1,000 pax' },
          { value: '1000_5000', label: '1,000-5,000 pax' },
          { value: 'over_5000', label: 'Over 5,000 pax' },
          { value: 'new_market', label: 'New to SE Asia market' },
        ],
      },
      destinationsOfInterest: {
        label: 'Destinations of Interest',
        required: true,
        options: [
          { value: 'vietnam', label: 'Vietnam' },
          { value: 'cambodia', label: 'Cambodia' },
          { value: 'laos', label: 'Laos' },
          { value: 'thailand', label: 'Thailand' },
          { value: 'myanmar', label: 'Myanmar' },
          { value: 'multi_country', label: 'Multi-Country Itineraries' },
        ],
      },
      servicesOfInterest: {
        label: 'Services of Interest',
        required: false,
        options: [
          { value: 'fit', label: 'FIT/Tailor-Made' },
          { value: 'groups', label: 'Group Tours' },
          { value: 'mice', label: 'MICE/Events' },
          { value: 'luxury', label: 'Luxury Travel' },
          { value: 'adventure', label: 'Adventure/Active' },
          { value: 'cultural', label: 'Cultural Experiences' },
          { value: 'cruise', label: 'Cruise & Shore Excursions' },
        ],
      },
    },
    additionalFields: {
      partnershipType: {
        label: 'Partnership Interest',
        required: false,
        options: [
          { value: '', label: 'Select partnership type...' },
          { value: 'fit', label: 'FIT Partnership' },
          { value: 'series', label: 'Series Partnership' },
          { value: 'white_label', label: 'White Label Partnership' },
          { value: 'undecided', label: "Not sure yet - let's discuss" },
        ],
      },
      message: { label: 'Tell us about your needs', placeholder: 'Share any specific requirements, questions, or how you envision our collaboration...', required: false },
      howDidYouHear: {
        label: 'How did you hear about us?',
        options: [
          { value: '', label: 'Select...' },
          { value: 'search', label: 'Search Engine' },
          { value: 'referral', label: 'Partner Referral' },
          { value: 'trade_show', label: 'Trade Show/Event' },
          { value: 'social', label: 'Social Media' },
          { value: 'industry', label: 'Industry Publication' },
          { value: 'other', label: 'Other' },
        ],
      },
    },
    submitButton: {
      text: 'Submit Inquiry',
      loadingText: 'Submitting...',
    },
    successMessage: {
      title: 'Thank You!',
      description: 'We have received your partnership inquiry. Our team will review your information and respond within 2 business days.',
    },
  };

  // Default sidebar configuration
  const defaultSidebar = {
    enabled: true,
    title: 'Why Partner With Us?',
    benefits: [
      { icon: '', title: 'Quick Response', description: 'Quotes within 24 hours for standard requests' },
      { icon: '', title: 'Dedicated Support', description: 'Personal account manager for all partners' },
      { icon: '', title: 'Competitive Pricing', description: 'Volume-based rates and special promotions' },
      { icon: '', title: 'Quality Guaranteed', description: 'Rigorous supplier standards and service quality' },
    ],
    contact: {
      title: 'Direct Contact',
      email: 'partners@voyager.travel',
      phone: '+84 28 1234 5678',
      responseTime: 'We respond within 2 business days',
    },
  };

  const formConfig = pageConfig?.form || defaultFormConfig;
  const sidebarConfig = pageConfig?.sidebar || defaultSidebar;

  return (
    <main className="min-h-screen">
      {/* Premium Header Section */}
      <section className="relative pt-32 pb-20 bg-[#1C1C1C] overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <span className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6">
              Partnership Inquiry
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-[1.1]">
              {pageConfig?.hero?.title || 'Start a Conversation'}
            </h1>
            <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
              {pageConfig?.hero?.subtitle || 'We\'re interested in learning about your business and exploring how we can work together.'}
            </p>
            
          
            
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#FAFAF8]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Form Column */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="max-w-2xl">
                {/* Form Header */}
                <div className="mb-10">
                  <div className="w-12 h-px bg-[#C4A35A] mb-8" />
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-[#2C2C2C] mb-4 tracking-tight">
                    {formConfig.title}
                  </h2>
                  <p className="text-[#7A7A7A] font-light leading-relaxed">
                    {formConfig.description}
                  </p>
                </div>
                
                {/* Form Card */}
                <div className="bg-white border border-[#E8E8E4] p-8 md:p-10">
                  <B2BInquiryForm config={formConfig} locale={locale} />
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            {sidebarConfig.enabled !== false && (
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-28">
                  <InquiryBenefits config={sidebarConfig} />
                  
                  {/* What Happens Next Section */}
                  <div className="mt-6 bg-white border border-[#E8E8E4]">
                    <div className="px-8 pt-8 pb-6 border-b border-[#E8E8E4]">
                      <h4 className="text-xs tracking-[0.2em] uppercase text-[#A0A0A0] font-light">
                        What Happens Next
                      </h4>
                    </div>
                    <div className="p-8">
                      <ol className="space-y-5">
                        {[
                          { step: 'Review', desc: 'We review your inquiry within 24-48 hours' },
                          { step: 'Connect', desc: 'A partnership manager reaches out to schedule a call' },
                          { step: 'Discuss', desc: 'We explore your needs and share relevant information' },
                          { step: 'Partner', desc: 'If there\'s a fit, we formalize our partnership' },
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C4A35A]/10 flex items-center justify-center text-xs text-[#C4A35A] font-light">
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0 pt-0.5">
                              <span className="block text-sm text-[#2C2C2C] font-light mb-0.5">
                                {item.step}
                              </span>
                              <span className="block text-xs text-[#7A7A7A] font-light leading-relaxed">
                                {item.desc}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Signals - Refined */}
      <section className="py-16 bg-white border-t border-[#E8E8E4]">
        <div className="container-wide">
          <div className="text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A0A0A0] font-light mb-10">
              Trusted by leading travel companies worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {['TravelVision', 'Pacific Journeys', 'Prestige Travel', 'Wanderlust Co', 'Global Tours'].map((name, i) => (
                <div
                  key={i}
                  className="text-sm tracking-wide text-[#4A4A4A]/40 font-light hover:text-[#4A4A4A]/60 transition-colors"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional CTA Section */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-4 tracking-tight">
              Prefer a direct conversation?
            </h2>
            <p className="text-white/60 font-light mb-8 leading-relaxed">
              Our partnership team is available to discuss your specific requirements and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${sidebarConfig.contact?.email || 'partners@voyager.travel'}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4A35A] text-white text-sm font-light hover:bg-[#B89B4A] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Our Team
              </a>
              {sidebarConfig.contact?.phone && (
                <a
                  href={`tel:${sidebarConfig.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 text-sm font-light hover:bg-white/5 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {sidebarConfig.contact.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
