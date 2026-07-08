import payload from 'payload';

/**
 * Pages Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/pages.seed.ts
 */

export const pagesData = [
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: [
      { type: 'h1', children: [{ text: 'Terms of Service' }] },
      { type: 'p', children: [{ text: 'Last updated: January 2024' }] },
      { type: 'h2', children: [{ text: '1. Acceptance of Terms' }] },
      { type: 'p', children: [{ text: 'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this site.' }] },
      { type: 'h2', children: [{ text: '2. Services Description' }] },
      { type: 'p', children: [{ text: 'We provide destination management and travel services including but not limited to tour planning, accommodation booking, transportation arrangements, and guide services throughout Asia.' }] },
      { type: 'h2', children: [{ text: '3. Booking and Payment' }] },
      { type: 'p', children: [{ text: 'All bookings are subject to availability. A deposit is required to confirm your booking, with full payment due 30 days before departure. Payment can be made via bank transfer, credit card, or other methods as specified.' }] },
      { type: 'h2', children: [{ text: '4. Cancellation Policy' }] },
      { type: 'p', children: [{ text: 'Cancellations made more than 60 days before departure: Full refund minus processing fees. 30-60 days: 50% refund. Less than 30 days: No refund. We strongly recommend travel insurance.' }] },
      { type: 'h2', children: [{ text: '5. Liability Limitations' }] },
      { type: 'p', children: [{ text: 'We act as intermediaries between travelers and service providers. While we carefully vet all partners, we cannot be held liable for actions or omissions of third-party suppliers, acts of nature, or circumstances beyond our control.' }] },
    ],
    seo: {
      metaTitle: 'Terms of Service | Travel Company',
      metaDescription: 'Read our terms of service including booking policies, cancellation terms, and liability information for travel services.',
    },
    status: 'published' as const,
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: [
      { type: 'h1', children: [{ text: 'Privacy Policy' }] },
      { type: 'p', children: [{ text: 'Last updated: January 2024' }] },
      { type: 'h2', children: [{ text: 'Information We Collect' }] },
      { type: 'p', children: [{ text: 'We collect information you provide directly: name, email, phone number, passport details (for bookings), dietary requirements, and travel preferences. We also collect technical data through cookies and analytics.' }] },
      { type: 'h2', children: [{ text: 'How We Use Your Information' }] },
      { type: 'p', children: [{ text: 'Your information is used to: process bookings, communicate about your travel arrangements, send relevant travel information, improve our services, and comply with legal requirements.' }] },
      { type: 'h2', children: [{ text: 'Data Sharing' }] },
      { type: 'p', children: [{ text: 'We share necessary information with travel service providers (hotels, airlines, guides) to fulfill your booking. We do not sell your personal information to third parties for marketing purposes.' }] },
      { type: 'h2', children: [{ text: 'Data Security' }] },
      { type: 'p', children: [{ text: 'We implement industry-standard security measures to protect your data. Passport and payment information is encrypted and stored securely. Access is limited to authorized personnel only.' }] },
      { type: 'h2', children: [{ text: 'Your Rights' }] },
      { type: 'p', children: [{ text: 'You have the right to access, correct, or delete your personal data. You may opt out of marketing communications at any time. Contact us at privacy@example.com for any data-related requests.' }] },
    ],
    seo: {
      metaTitle: 'Privacy Policy | Travel Company',
      metaDescription: 'Our privacy policy explains how we collect, use, and protect your personal information when you use our travel services.',
    },
    status: 'published' as const,
  },
  {
    title: 'Cookie Policy',
    slug: 'cookie-policy',
    content: [
      { type: 'h1', children: [{ text: 'Cookie Policy' }] },
      { type: 'h2', children: [{ text: 'What Are Cookies?' }] },
      { type: 'p', children: [{ text: 'Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your browsing experience.' }] },
      { type: 'h2', children: [{ text: 'Cookies We Use' }] },
      { type: 'p', children: [{ text: 'Essential cookies: Required for the website to function. Analytics cookies: Help us understand how visitors use our site. Marketing cookies: Used to deliver relevant advertisements.' }] },
      { type: 'h2', children: [{ text: 'Managing Cookies' }] },
      { type: 'p', children: [{ text: 'You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality. Our cookie consent banner allows you to customize your preferences.' }] },
    ],
    seo: {
      metaTitle: 'Cookie Policy | Travel Company',
      metaDescription: 'Learn about the cookies we use on our website and how to manage your cookie preferences.',
    },
    status: 'published' as const,
  },
  {
    title: 'Accessibility Statement',
    slug: 'accessibility',
    content: [
      { type: 'h1', children: [{ text: 'Accessibility Statement' }] },
      { type: 'h2', children: [{ text: 'Our Commitment' }] },
      { type: 'p', children: [{ text: 'We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.' }] },
      { type: 'h2', children: [{ text: 'Accessibility Features' }] },
      { type: 'p', children: [{ text: 'Our website includes: keyboard navigation support, alt text for images, sufficient color contrast, resizable text, screen reader compatibility, and clear heading structure.' }] },
      { type: 'h2', children: [{ text: 'Accessible Travel' }] },
      { type: 'p', children: [{ text: 'We specialize in arranging accessible travel experiences. Please contact us with your specific requirements, and we will work to accommodate your needs throughout your journey.' }] },
      { type: 'h2', children: [{ text: 'Feedback' }] },
      { type: 'p', children: [{ text: 'If you encounter accessibility barriers on our website or have suggestions for improvement, please contact accessibility@example.com. We take all feedback seriously and strive to respond within 2 business days.' }] },
    ],
    seo: {
      metaTitle: 'Accessibility Statement | Travel Company',
      metaDescription: 'Our commitment to digital accessibility and accessible travel experiences for all travelers.',
    },
    status: 'published' as const,
  },
  {
    title: 'Careers',
    slug: 'careers',
    content: [
      { type: 'h1', children: [{ text: 'Join Our Team' }] },
      { type: 'p', children: [{ text: 'We\'re always looking for passionate individuals who share our love for travel and commitment to excellence. Join a team that creates unforgettable experiences across Asia.' }] },
      { type: 'h2', children: [{ text: 'Why Work With Us' }] },
      { type: 'p', children: [{ text: 'Travel opportunities: Experience the destinations you help create. Professional growth: Training and development programs. Global team: Work with colleagues from diverse backgrounds. Impact: Help travelers discover the world.' }] },
      { type: 'h2', children: [{ text: 'Current Openings' }] },
      { type: 'p', children: [{ text: 'Please check our LinkedIn page for current job openings, or send your CV to careers@example.com. We review all applications and reach out to candidates whose experience aligns with our needs.' }] },
      { type: 'h2', children: [{ text: 'Internship Program' }] },
      { type: 'p', children: [{ text: 'Our internship program offers hands-on experience in destination management. Interns work alongside experienced professionals and often transition to full-time roles. Applications accepted year-round.' }] },
    ],
    seo: {
      metaTitle: 'Careers | Join Our Travel Team',
      metaDescription: 'Explore career opportunities with our travel company. Join a team passionate about creating exceptional travel experiences.',
    },
    status: 'published' as const,
  },
  {
    title: 'Press & Media',
    slug: 'press-media',
    content: [
      { type: 'h1', children: [{ text: 'Press & Media' }] },
      { type: 'h2', children: [{ text: 'Media Inquiries' }] },
      { type: 'p', children: [{ text: 'For press inquiries, interview requests, or media partnerships, please contact our communications team at press@example.com. We typically respond within 24 hours.' }] },
      { type: 'h2', children: [{ text: 'Press Kit' }] },
      { type: 'p', children: [{ text: 'Download our press kit for company information, executive bios, high-resolution images, and recent press releases. Available upon request.' }] },
      { type: 'h2', children: [{ text: 'Expert Commentary' }] },
      { type: 'p', children: [{ text: 'Our team includes experts on Asian travel, sustainable tourism, and luxury hospitality. We\'re available for interviews and commentary on travel industry trends.' }] },
      { type: 'h2', children: [{ text: 'Recent Coverage' }] },
      { type: 'p', children: [{ text: 'Featured in: Travel + Leisure, Condé Nast Traveler, National Geographic Traveler, The New York Times Travel, Forbes Travel Guide, and leading Asian publications.' }] },
    ],
    seo: {
      metaTitle: 'Press & Media | Travel Company',
      metaDescription: 'Media resources, press inquiries, and recent coverage of our travel company.',
    },
    status: 'published' as const,
  },
  {
    title: 'Travel Insurance',
    slug: 'travel-insurance',
    content: [
      { type: 'h1', children: [{ text: 'Travel Insurance' }] },
      { type: 'h2', children: [{ text: 'Why Travel Insurance Matters' }] },
      { type: 'p', children: [{ text: 'Travel insurance is essential for international travel. It protects you against unexpected events including trip cancellation, medical emergencies, lost luggage, and travel delays.' }] },
      { type: 'h2', children: [{ text: 'Recommended Coverage' }] },
      { type: 'p', children: [{ text: 'We recommend comprehensive policies that include: emergency medical coverage (minimum $100,000), medical evacuation, trip cancellation/interruption, baggage loss, and 24/7 assistance services.' }] },
      { type: 'h2', children: [{ text: 'Adventure Activities' }] },
      { type: 'p', children: [{ text: 'Standard policies may not cover adventure activities like trekking, diving, or motorbiking. If your itinerary includes these activities, ensure your policy specifically covers them.' }] },
      { type: 'h2', children: [{ text: 'Our Partners' }] },
      { type: 'p', children: [{ text: 'We can recommend reputable travel insurance providers. While we don\'t sell insurance directly, we\'re happy to advise on coverage appropriate for your destination and activities.' }] },
    ],
    seo: {
      metaTitle: 'Travel Insurance Guide | Travel Company',
      metaDescription: 'Essential information about travel insurance for your Asia trip. Coverage recommendations and important considerations.',
    },
    status: 'published' as const,
  },
];

export const seedPages = async (placeholderMediaId?: number): Promise<void> => {
  console.log('\n📄 Seeding Pages...');

  for (const pageData of pagesData) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: pageData.slug } },
      });

      const dataToSave = {
        ...pageData,
        featuredImage: placeholderMediaId,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: dataToSave as any,
        });
        console.log(`  ✏️ Updated: ${pageData.title}`);
      } else {
        await payload.create({
          collection: 'pages',
          data: dataToSave as any,
        });
        console.log(`  ✅ Created: ${pageData.title}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${pageData.title}:`, error.message);
    }
  }

  console.log(`  📊 Total pages: ${pagesData.length}`);
};

if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    await seedPages();
    console.log('\n✅ Pages seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed pages:', error);
    process.exit(1);
  });
}
