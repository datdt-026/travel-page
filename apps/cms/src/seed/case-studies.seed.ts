import payload from 'payload';

/**
 * Case Studies Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/case-studies.seed.ts
 */

export const caseStudiesData = [
  {
    title: 'Golden Triangle Expedition: 500-Person Corporate Summit',
    slug: 'golden-triangle-corporate-summit',
    destination: 'Thailand, Myanmar & Laos',
    summary: 'Logistics masterclass: coordinating a Fortune 500 company\'s regional leadership summit across three countries in seven days.',
    overview: {
      caseContext: 'A major technology corporation approached us to organize their annual APAC leadership summit with a difference: they wanted executives to experience the cultural diversity of the Mekong region while maintaining rigorous business programming. The challenge was balancing cultural immersion with productivity across three nations.',
      journeyType: 'corporate-incentive',
      duration: 7,
      operatingEnvironment: 'Multi-country coordination across Thailand (Bangkok, Chiang Rai), Myanmar (Yangon border region), and Laos (Luang Prabang). Required synchronized logistics across different regulatory environments and infrastructure levels.',
    },
    challenges: [
      { type: 'p', children: [{ text: 'Visa coordination across three countries for 500+ attendees from 28 nationalities' }] },
      { type: 'p', children: [{ text: 'Maintaining consistent 5-star service standards in regions with variable infrastructure' }] },
      { type: 'p', children: [{ text: 'Balancing cultural programming with executive-level business meetings' }] },
      { type: 'p', children: [{ text: 'COVID-era health protocols and testing logistics across borders' }] },
    ],
    solutions: [
      { type: 'p', children: [{ text: 'Deployed dedicated visa processing team six months in advance with embassy partnerships' }] },
      { type: 'p', children: [{ text: 'Pre-positioned equipment and staff at all venues; established backup suppliers in each country' }] },
      { type: 'p', children: [{ text: 'Created hybrid schedule with mornings for meetings, afternoons for cultural immersion' }] },
      { type: 'p', children: [{ text: 'On-site medical team with mobile testing facility; partnered with three international hospitals' }] },
    ],
    measurableResults: [
      { value: '100%', label: 'On-time departures across 12 charter flights' },
      { value: '98%', label: 'Participant satisfaction score' },
      { value: '500+', label: 'Executives coordinated seamlessly' },
      { value: '0', label: 'Health or safety incidents' },
    ],
    clientTestimonial: 'The logistical complexity was immense, but the execution was flawless. Our team experienced three countries while maintaining our business objectives. Simply outstanding.',
    seo: {
      metaTitle: 'Case Study: 500-Person Corporate Summit in Golden Triangle',
      metaDescription: 'How we coordinated a Fortune 500 leadership summit across Thailand, Myanmar, and Laos. Logistics, challenges, and results.',
    },
    status: 'published' as const,
  },
  {
    title: 'Sustainable Luxury: Bhutan Carbon-Neutral Expedition',
    slug: 'bhutan-carbon-neutral-expedition',
    destination: 'Bhutan',
    summary: 'Pioneering the first fully carbon-neutral luxury tour to the Kingdom of Bhutan, setting new industry standards for sustainable high-end travel.',
    overview: {
      caseContext: 'An environmental foundation requested a luxury experience in Bhutan that would demonstrate carbon-neutral travel is possible without compromising service quality. The program needed to be replicable and set measurable standards for the industry.',
      journeyType: 'cultural-deep-dive',
      duration: 12,
      operatingEnvironment: 'Bhutan\'s high-altitude terrain from Paro (2,250m) to Bumthang (2,600m). Required coordination with Bhutan\'s strict tourism policies and limited infrastructure for carbon measurement.',
    },
    challenges: [
      { type: 'p', children: [{ text: 'Calculating and offsetting carbon footprint in a country with limited emissions data' }] },
      { type: 'p', children: [{ text: 'Maintaining 5-star luxury standards using only local, sustainable suppliers' }] },
      { type: 'p', children: [{ text: 'Working within Bhutan\'s tourism framework while innovating sustainability practices' }] },
      { type: 'p', children: [{ text: 'Creating a replicable model with verifiable metrics' }] },
    ],
    solutions: [
      { type: 'p', children: [{ text: 'Partnered with Bhutan\'s Gross National Happiness Commission to develop carbon calculation methodology' }] },
      { type: 'p', children: [{ text: 'Curated network of farm-to-table restaurants and traditional artisan accommodations' }] },
      { type: 'p', children: [{ text: 'Collaborated with Tourism Council to create replicable standards' }] },
      { type: 'p', children: [{ text: 'Implemented blockchain-verified carbon offset program with local reforestation projects' }] },
    ],
    measurableResults: [
      { value: '0', label: 'Net carbon emissions (fully offset)' },
      { value: '100%', label: 'Local supplier usage' },
      { value: '120%', label: 'Carbon offset beyond trip emissions' },
      { value: '5', label: 'Framework now adopted by 5 DMCs' },
    ],
    clientTestimonial: 'This wasn\'t just a trip—it was proof that luxury and sustainability can coexist. The experience was exceptional, and knowing it was carbon-positive made it even better.',
    seo: {
      metaTitle: 'Case Study: Carbon-Neutral Luxury Tour in Bhutan',
      metaDescription: 'How we pioneered carbon-neutral luxury travel in Bhutan. Sustainability methodology, challenges, and results.',
    },
    status: 'published' as const,
  },
  {
    title: 'Post-Pandemic Recovery: Vietnam Tourism Restoration Project',
    slug: 'vietnam-tourism-recovery-project',
    destination: 'Vietnam',
    summary: 'Helping Vietnam\'s tourism sector rebuild after COVID-19 through a comprehensive DMC training and quality assurance program.',
    overview: {
      caseContext: 'Vietnam\'s tourism ministry invited us to help restore quality standards after two years of tourism shutdown. Local operators had lost staff, supply chains were broken, and service standards had deteriorated. The mission: rebuild capacity while raising the bar.',
      journeyType: 'educational-program',
      duration: 90,
      operatingEnvironment: 'Nationwide program covering Hanoi, Ho Chi Minh City, Da Nang, Hoi An, and Phu Quoc. Working with government agencies, private operators, and international hospitality brands.',
    },
    challenges: [
      { type: 'p', children: [{ text: 'Rebuilding skilled workforce after mass exodus from tourism sector' }] },
      { type: 'p', children: [{ text: 'Restoring broken supply chains with new quality standards' }] },
      { type: 'p', children: [{ text: 'Harmonizing international expectations with local capabilities' }] },
      { type: 'p', children: [{ text: 'Creating sustainable improvement versus temporary fixes' }] },
    ],
    solutions: [
      { type: 'p', children: [{ text: 'Developed 200-hour certification program with international hospitality school' }] },
      { type: 'p', children: [{ text: 'Created vetted supplier database with ongoing quality monitoring' }] },
      { type: 'p', children: [{ text: 'Established mystery shopper program and feedback loops' }] },
      { type: 'p', children: [{ text: 'Built train-the-trainer program for sustained knowledge transfer' }] },
    ],
    measurableResults: [
      { value: '2,500+', label: 'Tourism professionals trained' },
      { value: '340', label: 'Suppliers quality-certified' },
      { value: '89%', label: 'Post-program service score improvement' },
      { value: '15', label: 'DMCs now operating at international standard' },
    ],
    clientTestimonial: 'The transformation has been remarkable. Our suppliers are delivering consistently high standards, and international bookings have returned stronger than before.',
    seo: {
      metaTitle: 'Case Study: Vietnam Tourism Recovery Program',
      metaDescription: 'How we helped Vietnam\'s tourism sector rebuild post-pandemic. Training programs, quality standards, and measurable results.',
    },
    status: 'published' as const,
  },
  {
    title: 'Royal Wedding in Rajasthan: 300-Guest Destination Celebration',
    slug: 'rajasthan-destination-wedding',
    destination: 'India - Rajasthan',
    summary: 'Orchestrating a three-day destination wedding at a heritage palace for 300 guests from 15 countries, blending tradition with luxury.',
    overview: {
      caseContext: 'A prominent family requested a destination wedding that would honor Indian traditions while accommodating international guests unfamiliar with the culture. The venue: a 400-year-old palace converted to a luxury hotel in Udaipur.',
      journeyType: 'special-events',
      duration: 5,
      operatingEnvironment: 'Udaipur, Rajasthan. Historic palace venue with preservation requirements. Peak wedding season coordination with limited access periods.',
    },
    challenges: [
      { type: 'p', children: [{ text: 'Coordinating arrivals from 15 countries with varying visa requirements' }] },
      { type: 'p', children: [{ text: 'Balancing traditional ceremonies with accessibility for international guests' }] },
      { type: 'p', children: [{ text: 'Managing complex dietary requirements (vegetarian, halal, kosher, vegan, allergies)' }] },
      { type: 'p', children: [{ text: 'Working within heritage preservation guidelines for venue customization' }] },
    ],
    solutions: [
      { type: 'p', children: [{ text: 'Dedicated travel coordinator in each major origin country; charter flights from Dubai and Singapore' }] },
      { type: 'p', children: [{ text: 'Created printed ceremony guides and deployed cultural liaisons for real-time explanation' }] },
      { type: 'p', children: [{ text: 'Brought in specialized catering team; color-coded service system for dietary needs' }] },
      { type: 'p', children: [{ text: 'Worked with palace conservators on reversible decoration installations' }] },
    ],
    measurableResults: [
      { value: '300', label: 'Guests from 15 countries coordinated' },
      { value: '0', label: 'Dietary incidents across 2,700 meals served' },
      { value: '12', label: 'Traditional ceremonies executed flawlessly' },
      { value: '100%', label: 'Heritage compliance maintained' },
    ],
    clientTestimonial: 'Every detail was perfect—from the flower arrangements to the coordination of 300 guests across three days. Our families will remember this for generations.',
    seo: {
      metaTitle: 'Case Study: Destination Wedding in Rajasthan Palace',
      metaDescription: 'How we orchestrated a 300-guest destination wedding at a heritage palace in Udaipur. Planning, challenges, and execution.',
    },
    status: 'published' as const,
  },
  {
    title: 'Adventure Photography Expedition: Remote Mongolia Capture',
    slug: 'mongolia-photography-expedition',
    destination: 'Mongolia',
    summary: 'Supporting a National Geographic team with logistics for a 45-day documentary shoot across Mongolia\'s most remote regions.',
    overview: {
      caseContext: 'A documentary crew needed to capture the annual eagle hunting festival and follow nomadic families through seasonal migrations. This required reaching some of Mongolia\'s most isolated regions during harsh weather conditions while protecting sensitive equipment.',
      journeyType: 'expedition',
      duration: 45,
      operatingEnvironment: 'Western Mongolia including Altai Mountains, Gobi Desert, and central steppes. Operating in temperatures from -25°C to +35°C. Areas with no infrastructure, mobile coverage, or established supply chains.',
    },
    challenges: [
      { type: 'p', children: [{ text: 'Maintaining equipment functionality in extreme temperature variations' }] },
      { type: 'p', children: [{ text: 'Providing reliable communication in areas without mobile coverage' }] },
      { type: 'p', children: [{ text: 'Sustaining a 12-person crew in locations with no supply infrastructure' }] },
      { type: 'p', children: [{ text: 'Navigating cultural protocols with eagle hunter families' }] },
    ],
    solutions: [
      { type: 'p', children: [{ text: 'Deployed custom-built mobile equipment storage with climate control and backup power' }] },
      { type: 'p', children: [{ text: 'Installed satellite communication network with daily check-ins and emergency protocols' }] },
      { type: 'p', children: [{ text: 'Pre-positioned supply caches and maintained mobile support team with 4x4 vehicles' }] },
      { type: 'p', children: [{ text: 'Engaged local guides with deep relationships in eagle hunting communities' }] },
    ],
    measurableResults: [
      { value: '45', label: 'Days of uninterrupted filming' },
      { value: '0', label: 'Equipment failures or lost footage' },
      { value: '8', label: 'Nomadic families documented' },
      { value: '100%', label: 'Crew safety maintained' },
    ],
    clientTestimonial: 'We\'ve filmed on every continent, but Mongolia was our most challenging environment. The support team made the impossible possible—we captured footage we never thought achievable.',
    seo: {
      metaTitle: 'Case Study: Documentary Expedition in Remote Mongolia',
      metaDescription: 'How we supported a 45-day documentary shoot across Mongolia\'s most remote regions. Logistics, challenges, and results.',
    },
    status: 'published' as const,
  },
];

export const seedCaseStudies = async (placeholderMediaId?: number): Promise<void> => {
  console.log('\n📋 Seeding Case Studies...');

  for (const studyData of caseStudiesData) {
    try {
      const existing = await payload.find({
        collection: 'case-studies',
        where: { slug: { equals: studyData.slug } },
      });

      const dataToSave = {
        ...studyData,
        featuredImage: placeholderMediaId,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'case-studies',
          id: existing.docs[0].id,
          data: dataToSave as any,
        });
        console.log(`  ✏️ Updated: ${studyData.title}`);
      } else {
        await payload.create({
          collection: 'case-studies',
          data: dataToSave as any,
        });
        console.log(`  ✅ Created: ${studyData.title}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${studyData.title}:`, error.message);
    }
  }

  console.log(`  📊 Total case studies: ${caseStudiesData.length}`);
};

if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    await seedCaseStudies();
    console.log('\n✅ Case studies seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed case studies:', error);
    process.exit(1);
  });
}
