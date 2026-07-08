import payload from 'payload';

/**
 * FAQs Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/faqs.seed.ts
 */

export const faqsData = [
  // ═══════════════════════════════════════════════════════════════════
  // GENERAL QUESTIONS
  // ═══════════════════════════════════════════════════════════════════
  {
    question: 'What makes your company different from other travel agencies?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'We\'re not a traditional travel agency—we\'re a Destination Management Company (DMC) with deep local expertise. Unlike agencies that simply resell packages, we design, operate, and deliver experiences ourselves with our own teams on the ground.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Our local presence means faster problem-solving, authentic insider access, and relationships with suppliers built over years. We handle everything from private transfers to complex multi-country itineraries, and we\'re available 24/7 during your trip.' }],
      },
    ],
    category: 'general' as const,
    order: 1,
    status: 'published' as const,
  },
  {
    question: 'Which destinations do you cover?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'We specialize in Asia with comprehensive coverage of Vietnam, Thailand, Cambodia, Laos, Myanmar, Indonesia (particularly Bali), Japan, and Malaysia. We also offer programs in select destinations including Morocco, Spain, Italy, France, Peru, and New Zealand.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Our strength is in Southeast Asia, where we\'ve built relationships and operated programs for over two decades. For destinations outside our core expertise, we partner with carefully vetted local operators to maintain our quality standards.' }],
      },
    ],
    category: 'general' as const,
    order: 2,
    status: 'published' as const,
  },
  {
    question: 'Do you offer group tours or only private trips?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'We specialize in private, customized travel experiences. Every itinerary we create is tailored to your specific interests, pace, and travel style. This allows for maximum flexibility and personalization.' }],
      },
      {
        type: 'p',
        children: [{ text: 'That said, we do operate scheduled small-group departures for certain popular itineraries, typically limited to 12-16 participants. These offer a social travel experience at a lower price point while maintaining our quality standards. Contact us for current group tour schedules.' }],
      },
    ],
    category: 'general' as const,
    order: 3,
    status: 'published' as const,
  },
  {
    question: 'Are you a sustainable travel company?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Sustainability is central to how we operate. We\'re committed to minimizing environmental impact, supporting local communities, and preserving cultural heritage. This includes partnering with eco-certified accommodations, supporting local enterprises, and ensuring fair wages for all service providers.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Specific initiatives include: carbon offset programs for all flights we book, elimination of single-use plastics on our tours, support for wildlife sanctuaries over exploitative animal attractions, and community-based tourism experiences that directly benefit local populations.' }],
      },
    ],
    category: 'general' as const,
    order: 4,
    status: 'published' as const,
  },
  // ═══════════════════════════════════════════════════════════════════
  // BOOKING QUESTIONS
  // ═══════════════════════════════════════════════════════════════════
  {
    question: 'How far in advance should I book my trip?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'For the best availability and rates, we recommend booking 3-6 months in advance, especially for peak season travel (November-March in Southeast Asia, cherry blossom season in Japan). This allows time for thoughtful itinerary planning and ensures availability at preferred hotels.' }],
      },
      {
        type: 'p',
        children: [{ text: 'That said, we specialize in making things happen. If you\'re planning a last-minute trip, contact us anyway—our local teams and supplier relationships often enable us to secure availability when others can\'t.' }],
      },
    ],
    category: 'bookings' as const,
    order: 1,
    status: 'published' as const,
  },
  {
    question: 'What is your payment process?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Upon confirmation, we require a 30% deposit to secure your bookings. The remaining 70% is due 45 days before departure. For bookings made within 45 days of travel, full payment is required at the time of booking.' }],
      },
      {
        type: 'p',
        children: [{ text: 'We accept credit cards (Visa, Mastercard, American Express), bank transfers, and PayPal. All payments are processed securely, and you\'ll receive detailed invoices and receipts for your records.' }],
      },
    ],
    category: 'bookings' as const,
    order: 2,
    status: 'published' as const,
  },
  {
    question: 'What is your cancellation policy?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Our standard cancellation policy is as follows: More than 60 days before departure: Full refund minus $150 processing fee. 30-60 days: 50% refund. 15-30 days: 25% refund. Less than 15 days: No refund.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Some components like flights and peak-season hotel bookings may have stricter cancellation terms. We\'ll clearly communicate any special conditions before you confirm. We strongly recommend comprehensive travel insurance to protect your investment.' }],
      },
    ],
    category: 'bookings' as const,
    order: 3,
    status: 'published' as const,
  },
  {
    question: 'Can I modify my itinerary after booking?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Absolutely! Flexibility is one of the benefits of traveling with us. Minor changes to restaurant reservations, activity timing, or non-peak hotel bookings can usually be accommodated at no charge up to 14 days before departure.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Major changes (destinations, dates, hotels during peak season) may incur modification fees and are subject to availability. Once your trip begins, our local teams can help arrange modifications on the ground—this is where our DMC advantage really shines.' }],
      },
    ],
    category: 'bookings' as const,
    order: 4,
    status: 'published' as const,
  },
  {
    question: 'Do you offer travel insurance?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'We strongly recommend comprehensive travel insurance for all trips and can provide quotes from our trusted insurance partners. A good policy should cover trip cancellation, medical emergencies, evacuation, lost luggage, and travel delays.' }],
      },
      {
        type: 'p',
        children: [{ text: 'While we don\'t require insurance, traveling without it is risky—medical care in some destinations can be expensive, and unexpected events do happen. We\'re happy to advise on appropriate coverage levels for your specific itinerary.' }],
      },
    ],
    category: 'bookings' as const,
    order: 5,
    status: 'published' as const,
  },
  // ═══════════════════════════════════════════════════════════════════
  // TRIP PLANNING
  // ═══════════════════════════════════════════════════════════════════
  {
    question: 'How do I start planning my trip?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Simply reach out via our contact form, email, or phone. Tell us where you want to go, when you\'re traveling, how many people are in your group, and what kind of experiences interest you. Don\'t worry if you don\'t have all the answers—that\'s what we\'re here for!' }],
      },
      {
        type: 'p',
        children: [{ text: 'One of our travel consultants will schedule a call to understand your preferences, travel style, and any special requirements. From there, we\'ll craft a customized proposal. This consultation is complimentary and comes with no obligation.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 1,
    status: 'published' as const,
  },
  {
    question: 'What should I pack for Southeast Asia?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Light, breathable clothing is essential—think cotton and quick-dry fabrics. Pack modest attire for temples (covered shoulders and knees). Comfortable walking shoes are crucial, and flip-flops are handy for beaches and when removing shoes frequently.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Don\'t forget: quality sunscreen and insect repellent, a reusable water bottle, basic first aid supplies, a day pack for excursions, and a waterproof bag during monsoon season. Leave room in your luggage—you\'ll want to bring home treasures!' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 2,
    status: 'published' as const,
  },
  {
    question: 'Do I need a visa to visit your destinations?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Visa requirements vary by nationality and destination. Many Southeast Asian countries offer visa-free entry or visa-on-arrival for citizens of Western countries. Vietnam offers e-visas for most nationalities. Japan allows 90-day visa-free stays for many passport holders.' }],
      },
      {
        type: 'p',
        children: [{ text: 'We provide detailed visa guidance for your specific itinerary as part of our pre-departure information. Requirements change frequently, so we recommend checking official embassy websites closer to your departure date.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 3,
    status: 'published' as const,
  },
  {
    question: 'What vaccines or health precautions do I need?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'We recommend consulting a travel health specialist 6-8 weeks before departure. Generally, routine vaccinations should be up-to-date. Hepatitis A and Typhoid are commonly recommended for Southeast Asia. Malaria prophylaxis may be needed for certain areas.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Basic precautions include: drinking only bottled/purified water, being cautious with raw foods, using insect repellent, and protecting against sun exposure. Your pre-departure documents will include specific health recommendations for your destinations.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 4,
    status: 'published' as const,
  },
  {
    question: 'What is the best time of year to visit?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'The best time varies by destination. Vietnam and Thailand are ideal November-April (dry season). Japan\'s cherry blossom season (late March-April) and autumn colors (November) are peak times. Bali is lovely year-round but driest April-October.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Keep in mind that "monsoon season" doesn\'t mean constant rain—often just afternoon showers. Traveling during shoulder or low season means fewer crowds, lower prices, and landscapes at their greenest. We\'re happy to advise on the best timing for your priorities.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 5,
    status: 'published' as const,
  },
  // ═══════════════════════════════════════════════════════════════════
  // DURING YOUR TRIP
  // ═══════════════════════════════════════════════════════════════════
  {
    question: 'What kind of support do you provide during my trip?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'You\'ll have 24/7 access to our local support team throughout your trip. Our operations teams are based in-destination and can respond quickly to any situation—from minor inconveniences to emergencies. You\'ll receive a local emergency contact number before departure.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Our guides are carefully selected for their knowledge, language skills, and problem-solving abilities. They\'re empowered to make on-the-spot decisions to enhance your experience. Think of them as your local friend with connections and insider knowledge.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 6,
    status: 'published' as const,
  },
  {
    question: 'Will I have a guide for the entire trip?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'This depends on your preferences and itinerary structure. Many travelers prefer a mix: guided activities and tours with free time for independent exploration. For multi-city itineraries, you may have different specialist guides in each location.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Full-time accompanying guides are available for those who prefer constant assistance, especially recommended for first-time visitors to Asia, travelers with accessibility needs, or those preferring a completely seamless experience. Discuss your preference with your travel consultant.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 7,
    status: 'published' as const,
  },
  {
    question: 'What happens if something goes wrong during my trip?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Our local teams are experienced problem-solvers. Missed connection? We\'ll arrange alternative transport. Hotel issue? We\'ll intervene or relocate you. Medical emergency? We\'ll coordinate with hospitals and insurance providers while supporting you on the ground.' }],
      },
      {
        type: 'p',
        children: [{ text: 'This is where the DMC advantage is clearest. We\'re not a distant call center—we\'re on the ground with local knowledge and supplier relationships. Most issues can be resolved within hours, often without disrupting your itinerary.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 8,
    status: 'published' as const,
  },
  {
    question: 'Can you accommodate dietary requirements?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Absolutely. We regularly accommodate vegetarian, vegan, gluten-free, halal, kosher, and allergy-specific dietary requirements. Let us know your needs during planning, and we\'ll ensure all restaurants and guides are informed in advance.' }],
      },
      {
        type: 'p',
        children: [{ text: 'For severe allergies, we can prepare translated allergy cards in local languages for you to carry. Our guides are trained to communicate dietary requirements clearly, but we always recommend carrying backup snacks for remote areas where options may be limited.' }],
      },
    ],
    category: 'trip-planning' as const,
    order: 9,
    status: 'published' as const,
  },
  {
    question: 'Is it safe to travel to your destinations?',
    answer: [
      {
        type: 'p',
        children: [{ text: 'Southeast Asia and Japan are generally very safe for tourists. Petty crime (pickpocketing, bag snatching) exists in tourist areas as in any destination worldwide. We provide detailed safety briefings and our guides are trained to keep you aware of your surroundings.' }],
      },
      {
        type: 'p',
        children: [{ text: 'We monitor travel advisories continuously and would never operate in areas with significant safety concerns. Traffic is often the biggest risk—crossing streets and road travel require extra attention. Our vehicles and drivers meet strict safety standards.' }],
      },
    ],
    category: 'general' as const,
    order: 5,
    status: 'published' as const,
  },
];

export const seedFAQs = async (): Promise<void> => {
  console.log('\n❓ Seeding FAQs...');

  for (const faqData of faqsData) {
    try {
      // Check if FAQ already exists
      const existing = await payload.find({
        collection: 'faqs',
        where: { question: { equals: faqData.question } },
      });

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'faqs',
          id: existing.docs[0].id,
          data: faqData as any,
        });
        console.log(`  ✏️ Updated: ${faqData.question.substring(0, 50)}...`);
      } else {
        await payload.create({
          collection: 'faqs',
          data: faqData as any,
        });
        console.log(`  ✅ Created: ${faqData.question.substring(0, 50)}...`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed FAQ:`, error.message);
    }
  }

  console.log(`  📊 Total FAQs: ${faqsData.length}`);
};

// Run independently
if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    await seedFAQs();
    console.log('\n✅ FAQs seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed FAQs:', error);
    process.exit(1);
  });
}
