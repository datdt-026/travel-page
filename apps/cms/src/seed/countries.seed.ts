import payload from 'payload';

/**
 * Countries Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/countries.seed.ts
 */

export const countriesData = [
  // ═══════════════════════════════════════════════════════════════════
  // ASIA
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Vietnam',
    slug: 'vietnam',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Vietnam is an S-shaped country in Southeast Asia, renowned for its stunning beaches, winding rivers, Buddhist pagodas, and vibrant cities. From the emerald terraced rice paddies of Sapa to the mystical Ha Long Bay, Vietnam offers a perfect blend of natural beauty and rich cultural heritage.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The country is also famous for its diverse cuisine, from Hanoi\'s aromatic pho to Saigon\'s crispy banh mi and Hoi An\'s signature cao lau noodles. Each region boasts its own culinary specialties, creating an unforgettable gastronomic journey for travelers.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Vietnam\'s history spans thousands of years, with influences from Chinese dynasties, French colonialism, and American intervention shaping its modern identity. Today, it stands as one of Asia\'s fastest-growing economies while preserving its traditional values and warm hospitality.',
          },
        ],
      },
    ],
    excerpt: 'Discover Vietnam - home to the mystical Ha Long Bay, ancient Hoi An, world-renowned street food, and the warmest hospitality in Southeast Asia.',
    currency: 'VND',
    language: 'Vietnamese',
    timezone: 'UTC+7',
    bestTimeToVisit: 'February to April and August to October are ideal. The North has cold winters (November-January), while the South is hot year-round with monsoon season from May to November.',
    metaTitle: 'Travel Vietnam - Discover the S-Shaped Country',
    metaDescription: 'Comprehensive Vietnam travel guide: Ha Long Bay, Hoi An, Phu Quoc, and many more fascinating destinations.',
    metaKeywords: 'vietnam, vietnam travel, ha long bay, hoi an, sapa, phu quoc, vietnamese food',
    status: 'published' as const,
  },
  {
    name: 'Japan',
    slug: 'japan',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Japan masterfully blends ancient traditions with cutting-edge innovation. From the serene Shinto shrines of Kyoto to the neon-lit skyscrapers of Tokyo, the Land of the Rising Sun offers experiences that captivate every traveler\'s imagination.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The cherry blossom season (Sakura) in March-April and autumn foliage (Momiji) in October-November are the most spectacular times to visit. Japanese culture, with its tea ceremonies, kimono traditions, sumo wrestling, and anime, continues to fascinate visitors from around the world.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond the major cities, Japan reveals hidden gems: snow monkeys bathing in hot springs, ancient pilgrimage routes, pristine alpine villages, and remote islands with unique ecosystems. The legendary bullet trains make exploring this diverse archipelago remarkably convenient.',
          },
        ],
      },
    ],
    excerpt: 'Experience the Land of the Rising Sun where ancient traditions seamlessly merge with world-leading technology and innovation.',
    currency: 'JPY',
    language: 'Japanese',
    timezone: 'UTC+9',
    bestTimeToVisit: 'Spring (March-May) for cherry blossoms or autumn (September-November) for stunning fall foliage and comfortable temperatures.',
    metaTitle: 'Travel Japan - Land of the Rising Sun',
    metaDescription: 'Explore Japan: Tokyo, Kyoto, Osaka, and beyond. Comprehensive guide to Japanese culture, cuisine, and travel planning.',
    metaKeywords: 'japan, japan travel, tokyo, kyoto, osaka, cherry blossom, sakura, mt fuji',
    status: 'published' as const,
  },
  {
    name: 'Thailand',
    slug: 'thailand',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Thailand, the "Land of Smiles," is one of Southeast Asia\'s most beloved destinations. With its ornate golden temples, pristine tropical beaches, and world-famous street food, Thailand offers an incredible diversity of experiences for every type of traveler.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'From the bustling energy of Bangkok with its vibrant night markets to the tranquility of Chiang Mai\'s ancient temples, each region of Thailand has its own distinctive character. The southern islands offer some of the world\'s best diving and beach experiences.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Thai cuisine has earned global recognition, from fiery tom yum soup to aromatic green curry. The country\'s wellness traditions, including Thai massage and meditation retreats, make it a top destination for those seeking relaxation and rejuvenation.',
          },
        ],
      },
    ],
    excerpt: 'The Land of Smiles featuring magnificent golden temples, paradise beaches, legendary street food, and the warmest welcome in Asia.',
    currency: 'THB',
    language: 'Thai',
    timezone: 'UTC+7',
    bestTimeToVisit: 'November to February offers cool, dry weather. The rainy season (June-October) brings lush landscapes and fewer crowds.',
    metaTitle: 'Travel Thailand - Land of Smiles',
    metaDescription: 'Your complete Thailand travel guide: Bangkok, Chiang Mai, Phuket, and the best Thai beaches and temples.',
    metaKeywords: 'thailand, thailand travel, bangkok, chiang mai, phuket, thai beaches, thai food',
    status: 'published' as const,
  },
  {
    name: 'Indonesia',
    slug: 'indonesia',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Indonesia, the world\'s largest archipelago, spans over 17,000 islands offering extraordinary diversity. From Bali\'s spiritual temples and rice terraces to Komodo\'s legendary dragons, each island presents a unique adventure.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The country boasts some of the planet\'s most biodiverse ecosystems, including the rainforests of Sumatra and Borneo. World-class surfing, diving at Raja Ampat\'s pristine reefs, and volcano trekking attract adventurers from around the globe.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Indonesian culture reflects influences from Hindu, Buddhist, Islamic, and indigenous traditions. Ancient temples like Borobudur and Prambanan stand as UNESCO World Heritage Sites, while traditional arts flourish in communities across the archipelago.',
          },
        ],
      },
    ],
    excerpt: 'Explore the world\'s largest archipelago with over 17,000 islands, from Bali\'s spiritual landscapes to Komodo\'s prehistoric dragons.',
    currency: 'IDR',
    language: 'Indonesian',
    timezone: 'UTC+7 to UTC+9',
    bestTimeToVisit: 'April to October (dry season) is ideal for most regions. Bali is pleasant year-round with occasional rain December to March.',
    metaTitle: 'Travel Indonesia - World\'s Largest Archipelago',
    metaDescription: 'Indonesia travel guide: Bali, Komodo, Raja Ampat, Java, and over 17,000 islands to explore.',
    metaKeywords: 'indonesia, bali, komodo, raja ampat, java, borobudur, indonesian islands',
    status: 'published' as const,
  },
  {
    name: 'Cambodia',
    slug: 'cambodia',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Cambodia, home to the legendary Angkor Wat, offers travelers a profound journey through one of history\'s greatest civilizations. The ancient Khmer Empire left behind architectural masterpieces that continue to inspire awe nearly a millennium later.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond Angkor, Cambodia reveals pristine beaches in Sihanoukville and Koh Rong, the riverside charm of Battambang, and the sobering history of Phnom Penh. The resilient Cambodian people welcome visitors with genuine warmth and hospitality.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Cambodian cuisine, though less famous than its neighbors, offers delicious discoveries including fish amok, beef lok lak, and fresh Kampot pepper. The country\'s floating villages and rural communities provide authentic cultural immersion experiences.',
          },
        ],
      },
    ],
    excerpt: 'Home to the magnificent Angkor Wat, Cambodia blends ancient Khmer heritage with pristine beaches and heartfelt hospitality.',
    currency: 'KHR/USD',
    language: 'Khmer',
    timezone: 'UTC+7',
    bestTimeToVisit: 'November to April is dry and cooler. The rainy season (May-October) offers lush landscapes and Angkor\'s moats at their fullest.',
    metaTitle: 'Travel Cambodia - Land of Angkor',
    metaDescription: 'Cambodia travel guide: Angkor Wat, Siem Reap, Phnom Penh, and the best experiences in the Kingdom of Wonder.',
    metaKeywords: 'cambodia, angkor wat, siem reap, phnom penh, khmer empire, cambodia beaches',
    status: 'published' as const,
  },
  {
    name: 'Laos',
    slug: 'laos',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Laos, the "Land of a Million Elephants," remains one of Southeast Asia\'s most unspoiled destinations. The peaceful country along the Mekong River offers travelers a glimpse into traditional Indochina that has largely vanished elsewhere.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Luang Prabang, a UNESCO World Heritage city, enchants with its French colonial architecture, gilded temples, and the daily alms-giving ceremony. The mysterious Plain of Jars and the thundering Kuang Si Falls showcase the country\'s natural and archaeological wonders.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Adventure seekers find paradise in Laos: kayaking through limestone karsts in Vang Vieng, trekking to remote hill tribe villages, and exploring vast cave systems. The laid-back atmosphere and genuine hospitality make visitors fall in love with this hidden gem.',
          },
        ],
      },
    ],
    excerpt: 'The "Land of a Million Elephants" - discover unspoiled natural beauty, ancient temples, and authentic Indochinese culture along the Mekong.',
    currency: 'LAK',
    language: 'Lao',
    timezone: 'UTC+7',
    bestTimeToVisit: 'October to April offers dry, pleasant weather. The rainy season brings beautiful green landscapes but some roads become difficult.',
    metaTitle: 'Travel Laos - Land of a Million Elephants',
    metaDescription: 'Laos travel guide: Luang Prabang, Vientiane, Vang Vieng, and authentic Mekong River experiences.',
    metaKeywords: 'laos, luang prabang, vientiane, mekong river, kuang si, laos travel',
    status: 'published' as const,
  },
  {
    name: 'Myanmar',
    slug: 'myanmar',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Myanmar, formerly Burma, captivates travelers with its thousands of ancient temples, rich Buddhist traditions, and remarkably preserved culture. The country offers a journey back in time to a Southeast Asia that has changed dramatically elsewhere.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Bagan\'s temple-studded plains create one of the world\'s most extraordinary archaeological landscapes. Inle Lake\'s leg-rowing fishermen, Mandalay\'s royal heritage, and Yangon\'s magnificent Shwedagon Pagoda showcase Myanmar\'s diverse attractions.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The Burmese people are renowned for their warmth and hospitality. Traditional crafts, puppet shows, thanaka face paint, and vibrant local markets offer authentic cultural experiences rarely found in more developed destinations.',
          },
        ],
      },
    ],
    excerpt: 'Step into a timeless world of golden pagodas, thousand-temple plains, and some of Asia\'s warmest and most welcoming people.',
    currency: 'MMK',
    language: 'Burmese',
    timezone: 'UTC+6:30',
    bestTimeToVisit: 'November to February is cool and dry. Avoid March-May (extremely hot) and June-October (monsoon season).',
    metaTitle: 'Travel Myanmar - Land of Golden Pagodas',
    metaDescription: 'Myanmar travel guide: Bagan temples, Inle Lake, Mandalay, Yangon, and authentic Burmese culture.',
    metaKeywords: 'myanmar, burma, bagan, inle lake, yangon, shwedagon pagoda, myanmar travel',
    status: 'published' as const,
  },
  {
    name: 'Malaysia',
    slug: 'malaysia',
    continent: 'asia' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Malaysia is a captivating fusion of Malay, Chinese, Indian, and indigenous cultures, creating one of Asia\'s most diverse destinations. Modern Kuala Lumpur with its iconic Petronas Towers stands in striking contrast to ancient rainforests and traditional kampung villages.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The country offers remarkable variety: Georgetown\'s UNESCO heritage streets, Langkawi\'s island paradise, Borneo\'s orangutans and Mount Kinabalu, and the pristine Perhentian Islands. Malaysian food is legendary - from laksa to nasi lemak to char kway teow.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Malaysia\'s excellent infrastructure makes it easy to explore, while diverse cultural festivals, from Chinese New Year to Deepavali to Hari Raya, offer year-round opportunities to experience its multicultural heritage.',
          },
        ],
      },
    ],
    excerpt: 'Experience Asia\'s melting pot - where Malay, Chinese, Indian, and indigenous cultures create extraordinary diversity in food, festivals, and traditions.',
    currency: 'MYR',
    language: 'Malay',
    timezone: 'UTC+8',
    bestTimeToVisit: 'Peninsula Malaysia is best December to April (west coast) or May to September (east coast). Borneo is driest April to October.',
    metaTitle: 'Travel Malaysia - Asia\'s Cultural Melting Pot',
    metaDescription: 'Malaysia travel guide: Kuala Lumpur, Penang, Langkawi, Borneo, and the best of Malaysian food and culture.',
    metaKeywords: 'malaysia, kuala lumpur, penang, langkawi, borneo, malaysian food, petronas towers',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // EUROPE
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'France',
    slug: 'france',
    continent: 'europe' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'France epitomizes European elegance, from the world-famous monuments of Paris to the sun-drenched vineyards of Provence. The country\'s influence on art, cuisine, fashion, and philosophy has shaped Western civilization for centuries.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond Paris, France reveals diverse landscapes: the glamorous French Riviera, fairy-tale Loire Valley châteaux, rugged Normandy coastline, and Alpine ski resorts. Each region boasts its own cuisine, wines, and traditions.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'French gastronomy, recognized by UNESCO as an Intangible Cultural Heritage, offers experiences from Michelin-starred restaurants to neighborhood bistros and bustling food markets. Wine enthusiasts find paradise in Bordeaux, Burgundy, and Champagne.',
          },
        ],
      },
    ],
    excerpt: 'The epitome of European elegance - from Parisian monuments to Provençal vineyards, experience the art of living à la française.',
    currency: 'EUR',
    language: 'French',
    timezone: 'UTC+1/+2',
    bestTimeToVisit: 'April to June and September to October offer mild weather and fewer crowds. Summer is perfect for beaches; winter for skiing.',
    metaTitle: 'Travel France - The Art of Living',
    metaDescription: 'France travel guide: Paris, Provence, French Riviera, Loire Valley, and the best of French culture and cuisine.',
    metaKeywords: 'france, paris, provence, french riviera, loire valley, french cuisine, french wine',
    status: 'published' as const,
  },
  {
    name: 'Italy',
    slug: 'italy',
    continent: 'europe' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Italy is a living museum where ancient Roman ruins, Renaissance masterpieces, and contemporary style coexist in perfect harmony. Every corner tells stories of emperors, artists, and culinary traditions passed down through generations.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'From Rome\'s Colosseum and Vatican City to Venice\'s romantic canals, Florence\'s artistic treasures, and the dramatic Amalfi Coast, Italy offers an embarrassment of riches. The northern lakes, Tuscan countryside, and Sicilian beaches add natural beauty to cultural splendor.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Italian cuisine needs no introduction - from wood-fired pizza in Naples to fresh pasta in Bologna to gelato everywhere. The country\'s regional diversity means every city, every village, offers distinct culinary discoveries.',
          },
        ],
      },
    ],
    excerpt: 'La Dolce Vita awaits - explore ancient ruins, Renaissance art, romantic cities, and the world\'s most beloved cuisine.',
    currency: 'EUR',
    language: 'Italian',
    timezone: 'UTC+1/+2',
    bestTimeToVisit: 'April to June and September to October are ideal. Summer is peak season but very hot and crowded in major cities.',
    metaTitle: 'Travel Italy - La Dolce Vita',
    metaDescription: 'Italy travel guide: Rome, Venice, Florence, Amalfi Coast, Tuscany, and the best of Italian art, history, and cuisine.',
    metaKeywords: 'italy, rome, venice, florence, amalfi coast, tuscany, italian food, colosseum',
    status: 'published' as const,
  },
  {
    name: 'Spain',
    slug: 'spain',
    continent: 'europe' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Spain pulses with passion - from fiery flamenco and legendary fiestas to world-class art museums and architectural wonders. The country\'s diverse regions each offer distinct cultures, cuisines, and landscapes.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Barcelona\'s Gaudí masterpieces, Madrid\'s grand plazas, Seville\'s Moorish palaces, and Granada\'s Alhambra showcase Spain\'s remarkable heritage. The Basque Country, Catalonia, Andalusia, and Galicia each maintain unique identities and traditions.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Spanish cuisine revolves around tapas culture - small plates meant for sharing and socializing. From pintxos in San Sebastián to paella in Valencia to jamón ibérico everywhere, eating in Spain is a celebration.',
          },
        ],
      },
    ],
    excerpt: 'Passion personified - experience flamenco, tapas, Gaudí\'s architecture, and the vibrant spirit that makes Spain irresistible.',
    currency: 'EUR',
    language: 'Spanish',
    timezone: 'UTC+1/+2',
    bestTimeToVisit: 'April to June and September to November offer perfect weather. Summer is hot in the south; winter is mild except in the north.',
    metaTitle: 'Travel Spain - Where Passion Meets Culture',
    metaDescription: 'Spain travel guide: Barcelona, Madrid, Seville, Granada, and the best of Spanish culture, cuisine, and beaches.',
    metaKeywords: 'spain, barcelona, madrid, seville, granada, alhambra, gaudi, spanish tapas',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // OTHER REGIONS
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Morocco',
    slug: 'morocco',
    continent: 'africa' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Morocco enchants with its labyrinthine medinas, vast Sahara dunes, and snow-capped Atlas Mountains. This North African kingdom offers sensory overload - vibrant souks, intricate tilework, fragrant tagines, and the call to prayer echoing through ancient streets.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Marrakech\'s Djemaa el-Fna square, Fes\'s medieval medina, the blue-washed streets of Chefchaouen, and the coastal charm of Essaouira showcase Morocco\'s diverse attractions. Luxury riads offer oases of calm amid the bustling cities.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Adventure beckons in the Sahara Desert - camel treks, starlit camps, and sunrise over endless dunes create unforgettable memories. Berber hospitality in mountain villages reveals Morocco\'s warm, welcoming heart.',
          },
        ],
      },
    ],
    excerpt: 'A feast for the senses - ancient medinas, Sahara adventures, Atlas Mountains, and the legendary hospitality of the Berber people.',
    currency: 'MAD',
    language: 'Arabic/French',
    timezone: 'UTC+0/+1',
    bestTimeToVisit: 'March to May and September to November offer ideal temperatures. Summer is scorching; winter is cold in mountains.',
    metaTitle: 'Travel Morocco - Gateway to Africa',
    metaDescription: 'Morocco travel guide: Marrakech, Fes, Sahara Desert, Atlas Mountains, and authentic Moroccan experiences.',
    metaKeywords: 'morocco, marrakech, fes, sahara desert, atlas mountains, moroccan food, medina',
    status: 'published' as const,
  },
  {
    name: 'New Zealand',
    slug: 'new-zealand',
    continent: 'oceania' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'New Zealand is an adventure playground of epic proportions. The dramatic landscapes that brought Middle Earth to life offer real-world thrills: bungee jumping, glacier hiking, and some of the world\'s best hiking trails.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The North Island features geothermal wonders, Maori culture, and cosmopolitan Auckland. The South Island showcases jaw-dropping fjords, glaciers, and the adventure capital Queenstown. The diversity packed into these two islands is remarkable.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'New Zealand\'s wine regions, especially Marlborough and Central Otago, produce world-renowned wines. The farm-to-table dining scene emphasizes fresh, local ingredients. Maori culture adds depth with traditional hangi feasts and powerful haka performances.',
          },
        ],
      },
    ],
    excerpt: 'Middle Earth in reality - jaw-dropping landscapes, adrenaline-pumping adventures, Maori culture, and pristine natural beauty.',
    currency: 'NZD',
    language: 'English/Maori',
    timezone: 'UTC+12/+13',
    bestTimeToVisit: 'December to February (summer) is warmest. Shoulder seasons offer fewer crowds. Winter (June-August) is perfect for skiing.',
    metaTitle: 'Travel New Zealand - Adventure Awaits',
    metaDescription: 'New Zealand travel guide: Auckland, Queenstown, Milford Sound, Rotorua, and the best Kiwi adventures.',
    metaKeywords: 'new zealand, queenstown, milford sound, rotorua, hobbiton, maori culture, nz adventure',
    status: 'published' as const,
  },
  {
    name: 'Peru',
    slug: 'peru',
    continent: 'south-america' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Peru is the crown jewel of South American travel, home to the legendary Machu Picchu and the vast mysteries of the Nazca Lines. The ancient Inca Empire\'s legacy permeates everything from mountain citadels to living traditions in highland communities.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond the famous ruins, Peru offers the world\'s deepest canyons, the highest navigable lake, Amazon rainforest adventures, and colonial Cusco\'s architectural splendor. The Sacred Valley villages maintain traditions unchanged for centuries.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Peruvian cuisine has achieved global recognition. Lima is considered South America\'s culinary capital, while traditional dishes like ceviche, lomo saltado, and pachamanca showcase the country\'s diverse ingredients and cultural influences.',
          },
        ],
      },
    ],
    excerpt: 'Land of the Incas - Machu Picchu, the Sacred Valley, Amazonian adventures, and South America\'s most celebrated cuisine.',
    currency: 'PEN',
    language: 'Spanish/Quechua',
    timezone: 'UTC-5',
    bestTimeToVisit: 'May to October (dry season) is best for trekking and ruins. The Amazon has two distinct seasons with different wildlife opportunities.',
    metaTitle: 'Travel Peru - Land of the Incas',
    metaDescription: 'Peru travel guide: Machu Picchu, Cusco, Sacred Valley, Lima, and authentic Peruvian experiences.',
    metaKeywords: 'peru, machu picchu, cusco, sacred valley, lima, peruvian cuisine, inca trail',
    status: 'published' as const,
  },
];

export const seedCountries = async (placeholderMediaId?: number): Promise<void> => {
  console.log('\n🌍 Seeding Countries...');

  for (const countryData of countriesData) {
    try {
      // Check if country already exists
      const existing = await payload.find({
        collection: 'countries',
        where: { slug: { equals: countryData.slug } },
      });

      // Only include featuredImage if placeholderMediaId is provided
      const dataWithImage = placeholderMediaId
        ? { ...countryData, featuredImage: placeholderMediaId }
        : countryData;

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'countries',
          id: existing.docs[0].id,
          data: dataWithImage as any,
        });
        console.log(`  ✏️ Updated: ${countryData.name}`);
      } else {
        await payload.create({
          collection: 'countries',
          data: dataWithImage as any,
        });
        console.log(`  ✅ Created: ${countryData.name}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${countryData.name}:`, error.message);
    }
  }

  console.log(`  📊 Total countries: ${countriesData.length}`);
};

// Run independently
if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    await seedCountries();
    console.log('\n✅ Countries seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed countries:', error);
    process.exit(1);
  });
}
