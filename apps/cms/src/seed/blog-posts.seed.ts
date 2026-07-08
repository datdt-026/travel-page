import payload from 'payload';

/**
 * Blog Posts Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/blog-posts.seed.ts
 */

export const blogPostsData = [
  {
    title: '15 Essential Travel Tips for First-Time Visitors to Southeast Asia',
    slug: 'essential-travel-tips-southeast-asia',
    category: 'travel-tips' as const,
    excerpt: 'Everything you need to know before your first adventure in Southeast Asia. From packing essentials to cultural etiquette, we\'ve got you covered.',
    content: [
      { type: 'p', children: [{ text: 'Southeast Asia is one of the world\'s most popular travel destinations, and for good reason. The region offers an incredible combination of ancient temples, pristine beaches, delicious cuisine, and warm hospitality—all at remarkably affordable prices.' }] },
      { type: 'h2', children: [{ text: '1. Start with the Right Mindset' }] },
      { type: 'p', children: [{ text: 'Southeast Asia operates at a different pace. Things may not always go according to plan, and that\'s okay. Embrace the unexpected detours—they often lead to the best experiences.' }] },
      { type: 'h2', children: [{ text: '2. Pack Light, Pack Right' }] },
      { type: 'p', children: [{ text: 'You can buy almost anything in Southeast Asia for a fraction of what you\'d pay at home. Pack minimal clothing (quick-dry is best), essential toiletries, and leave room for souvenirs.' }] },
      { type: 'h2', children: [{ text: '3. Respect Local Culture' }] },
      { type: 'p', children: [{ text: 'Cover your shoulders and knees when visiting temples. Remove shoes before entering homes and sacred spaces. A little cultural awareness goes a long way.' }] },
    ],
    readTime: '5 min read',
    seo: {
      metaTitle: '15 Essential Travel Tips for Southeast Asia | First-Timer Guide',
      metaDescription: 'Your complete guide to traveling Southeast Asia for the first time. Expert tips on packing, culture, bargaining, and staying safe.',
    },
    status: 'published' as const,
  },
  {
    title: 'The Ultimate Guide to Hoi An: Vietnam\'s Most Charming Town',
    slug: 'ultimate-guide-hoi-an-vietnam',
    category: 'guides' as const,
    excerpt: 'Discover why Hoi An is Vietnam\'s most beloved destination. From ancient architecture to world-class tailoring, this UNESCO town has something for everyone.',
    content: [
      { type: 'p', children: [{ text: 'Hoi An is magical. This UNESCO World Heritage town on Vietnam\'s central coast has a way of capturing hearts like no other place in the country.' }] },
      { type: 'h2', children: [{ text: 'Understanding Hoi An\'s History' }] },
      { type: 'p', children: [{ text: 'From the 15th to 19th centuries, Hoi An was one of Southeast Asia\'s most important trading ports. Japanese, Chinese, Indian, and Portuguese merchants all passed through, leaving behind an architectural legacy that makes the town unique.' }] },
      { type: 'h2', children: [{ text: 'What to See and Do' }] },
      { type: 'p', children: [{ text: 'The Ancient Town is best explored on foot. Purchase a ticket that grants access to five heritage sites, including the Japanese Bridge, traditional houses, assembly halls, and museums.' }] },
      { type: 'h2', children: [{ text: 'The Famous Tailoring Scene' }] },
      { type: 'p', children: [{ text: 'Hoi An is renowned for its tailors, with hundreds of shops offering custom-made clothing at remarkably affordable prices. Suits, dresses, shoes, and leather goods can all be made within 24-48 hours.' }] },
    ],
    readTime: '8 min read',
    seo: {
      metaTitle: 'Hoi An Travel Guide 2024 | Everything You Need to Know',
      metaDescription: 'Complete guide to Hoi An, Vietnam. Best things to do, where to eat, tailoring tips, and how to experience this magical UNESCO town.',
    },
    status: 'published' as const,
  },
  {
    title: 'A Food Lover\'s Guide to Bangkok Street Food',
    slug: 'bangkok-street-food-guide',
    category: 'food-drink' as const,
    excerpt: 'Navigate Bangkok\'s legendary street food scene like a local. From the best pad thai stalls to secret markets.',
    content: [
      { type: 'p', children: [{ text: 'Bangkok is one of the world\'s great food cities, and the streets are where the magic happens. From sizzling woks and fragrant curries to sweet mango sticky rice, the sidewalks of Bangkok offer an endless edible adventure.' }] },
      { type: 'h2', children: [{ text: 'Understanding Street Food Culture' }] },
      { type: 'p', children: [{ text: 'Street food in Bangkok is serious business. Many vendors have been perfecting a single dish for decades. Look for stalls with long queues of locals—that\'s usually a good sign.' }] },
      { type: 'h2', children: [{ text: 'Must-Try Dishes' }] },
      { type: 'p', children: [{ text: 'Pad Thai: The national dish, best from vendors using charcoal flame. Tom Yum Goong: Spicy-sour shrimp soup. Som Tam: Green papaya salad. Khao Man Gai: Poached chicken on rice. Mango Sticky Rice: The perfect ending.' }] },
    ],
    readTime: '6 min read',
    seo: {
      metaTitle: 'Bangkok Street Food Guide | Best Stalls & Dishes',
      metaDescription: 'Your ultimate guide to Bangkok street food. Best dishes, top stalls, and how to navigate Thailand\'s incredible street food scene.',
    },
    status: 'published' as const,
  },
  {
    title: 'Trekking in Northern Vietnam: Sapa and Ha Giang',
    slug: 'trekking-northern-vietnam-sapa-ha-giang',
    category: 'adventure' as const,
    excerpt: 'From the terraced rice fields of Sapa to the remote villages of Ha Giang, northern Vietnam offers Southeast Asia\'s best trekking.',
    content: [
      { type: 'p', children: [{ text: 'Northern Vietnam is a trekking paradise. The region\'s dramatic landscapes—terraced rice paddies carved into mountainsides, remote ethnic minority villages, and some of the most spectacular mountain scenery in Southeast Asia.' }] },
      { type: 'h2', children: [{ text: 'Sapa: The Classic Choice' }] },
      { type: 'p', children: [{ text: 'Sapa has been the gateway to northern Vietnam\'s mountains for over a century. The multi-day trek to Cat Cat, Y Linh Ho, and Ta Van villages takes you through stunning rice terraces and Hmong communities.' }] },
      { type: 'h2', children: [{ text: 'Ha Giang: The Road Less Traveled' }] },
      { type: 'p', children: [{ text: 'For those seeking adventure beyond Sapa, Ha Giang is extraordinary. The Ha Giang Loop by motorbike is legendary, but the region also offers incredible trekking opportunities.' }] },
    ],
    readTime: '7 min read',
    seo: {
      metaTitle: 'Trekking Northern Vietnam | Sapa & Ha Giang Guide',
      metaDescription: 'Plan your Vietnam trekking adventure. Complete guide to Sapa, Ha Giang, and the best hiking trails in northern Vietnam.',
    },
    status: 'published' as const,
  },
  {
    title: 'Understanding Japanese Etiquette: A Cultural Guide',
    slug: 'japanese-etiquette-cultural-guide',
    category: 'culture' as const,
    excerpt: 'Navigate Japanese social customs with confidence. From chopstick etiquette to onsen rules, everything you need to show respect in Japan.',
    content: [
      { type: 'p', children: [{ text: 'Japan is famously polite, and visitors are often anxious about making cultural faux pas. The good news? Japanese people are incredibly forgiving of well-meaning foreigners.' }] },
      { type: 'h2', children: [{ text: 'Bowing and Greetings' }] },
      { type: 'p', children: [{ text: 'Bowing is the standard greeting in Japan. A slight nod of the head is usually sufficient for tourists. A genuine smile and attempt at basic Japanese phrases will be appreciated.' }] },
      { type: 'h2', children: [{ text: 'Dining Etiquette' }] },
      { type: 'p', children: [{ text: 'Never stick chopsticks upright in rice (this resembles funeral incense). Say "itadakimasu" before eating and "gochisousama deshita" after. Slurping noodles is not only acceptable but expected!' }] },
      { type: 'h2', children: [{ text: 'Onsen Rules' }] },
      { type: 'p', children: [{ text: 'Wash thoroughly before entering the communal bath. No swimwear allowed. Keep your small towel out of the water. Most importantly—relax and enjoy this quintessential Japanese experience.' }] },
    ],
    readTime: '6 min read',
    seo: {
      metaTitle: 'Japanese Etiquette Guide | Cultural Customs for Visitors',
      metaDescription: 'Master Japanese etiquette with our complete guide. Bowing, dining, and onsen rules—everything for respectful travel in Japan.',
    },
    status: 'published' as const,
  },
  {
    title: 'Private vs Group Tours: Which Is Right for You?',
    slug: 'private-vs-group-tours-guide',
    category: 'travel-tips' as const,
    excerpt: 'Weighing the pros and cons of private versus group travel? Our comprehensive guide helps you make the right choice.',
    content: [
      { type: 'p', children: [{ text: 'One of the first decisions you\'ll face when booking a tour is whether to go private or join a group. Both options have distinct advantages, and the right choice depends on your travel style, budget, and expectations.' }] },
      { type: 'h2', children: [{ text: 'The Case for Private Tours' }] },
      { type: 'p', children: [{ text: 'Private tours offer unmatched flexibility. You set the pace, choose the departure time, and can linger at places that capture your interest. For families with young children or travelers with specific interests, private tours allow for customization that group tours cannot match.' }] },
      { type: 'h2', children: [{ text: 'The Case for Group Tours' }] },
      { type: 'p', children: [{ text: 'Group tours offer significant cost savings and the opportunity to meet like-minded travelers from around the world. For solo travelers, group tours provide built-in companionship and safety in numbers.' }] },
    ],
    readTime: '5 min read',
    seo: {
      metaTitle: 'Private vs Group Tours: Which Is Right for You?',
      metaDescription: 'Compare private and group tours to find your ideal travel style. Expert advice on costs, flexibility, and when to choose each option.',
    },
    status: 'published' as const,
  },
];

export const seedBlogPosts = async (placeholderMediaId?: number, adminUserId?: number): Promise<void> => {
  console.log('\n📝 Seeding Blog Posts...');

  for (const postData of blogPostsData) {
    try {
      const existing = await payload.find({
        collection: 'blog-posts',
        where: { slug: { equals: postData.slug } },
      });

      const dataToSave = {
        ...postData,
        featuredImage: placeholderMediaId,
        author: adminUserId,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'blog-posts',
          id: existing.docs[0].id,
          data: dataToSave as any,
        });
        console.log(`  ✏️ Updated: ${postData.title}`);
      } else {
        await payload.create({
          collection: 'blog-posts',
          data: dataToSave as any,
        });
        console.log(`  ✅ Created: ${postData.title}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${postData.title}:`, error.message);
    }
  }

  console.log(`  📊 Total blog posts: ${blogPostsData.length}`);
};

if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    await seedBlogPosts();
    console.log('\n✅ Blog posts seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed blog posts:', error);
    process.exit(1);
  });
}
