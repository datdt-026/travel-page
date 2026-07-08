import payload from 'payload';

/**
 * Cities Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/cities.seed.ts
 */

export const citiesData = [
  // ═══════════════════════════════════════════════════════════════════
  // VIETNAM
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Hanoi',
    slug: 'hanoi',
    countrySlug: 'vietnam',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Hanoi, Vietnam\'s charming capital, is a city where ancient traditions meet modern aspirations. The Old Quarter\'s 36 streets, each named after the trade historically practiced there, create a fascinating maze of narrow lanes filled with history, culture, and some of the world\'s best street food.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The city boasts world-famous culinary treasures including pho bo from Ly Quoc Su street, bun cha from Hang Manh, and the unique egg coffee from Cafe Giang. Every corner reveals centuries of heritage, from the serene Hoan Kiem Lake to the ancient Temple of Literature.',
          },
        ],
      },
    ],
    excerpt: 'Vietnam\'s thousand-year-old capital with enchanting Old Quarter streets, legendary street food, and a perfect blend of French colonial and Vietnamese heritage.',
    population: 8500000,
    coordinates: { latitude: 21.0285, longitude: 105.8542 },
    highlights: [
      { title: 'Old Quarter', description: '36 historic streets with traditional architecture and vibrant street food scene' },
      { title: 'Hoan Kiem Lake', description: 'Heart of Hanoi with Ngoc Son Temple and iconic red Huc Bridge' },
      { title: 'Temple of Literature', description: 'Vietnam\'s first university, a UNESCO-recognized heritage site' },
      { title: 'Ho Chi Minh Mausoleum', description: 'The final resting place of Vietnam\'s beloved founding father' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Try egg coffee at Cafe Giang - a unique Hanoi invention\n• Wake up early to see locals exercising around Hoan Kiem Lake\n• Walk through the Old Quarter in the evening to experience the vibrant atmosphere\n• Don\'t miss the weekend walking street around Hoan Kiem Lake',
          },
        ],
      },
    ],
    metaTitle: 'Visit Hanoi - Vietnam\'s Ancient Capital',
    metaDescription: 'Discover Hanoi: Old Quarter, Hoan Kiem Lake, Temple of Literature, and world-famous street food.',
    metaKeywords: 'hanoi, vietnam capital, old quarter, hoan kiem, pho, vietnamese street food',
    status: 'published' as const,
  },
  {
    name: 'Ho Chi Minh City',
    slug: 'ho-chi-minh-city',
    countrySlug: 'vietnam',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Ho Chi Minh City, formerly Saigon, pulses with relentless energy as Vietnam\'s largest city and economic powerhouse. This dynamic metropolis seamlessly blends French colonial grandeur with modern skyscrapers, traditional markets with trendy rooftop bars.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'From the historic Notre-Dame Cathedral and Central Post Office to the sobering War Remnants Museum, the city offers profound insights into Vietnam\'s complex history. Meanwhile, Districts 2 and 7 showcase the city\'s rapid modernization with international restaurants and lifestyle venues.',
          },
        ],
      },
    ],
    excerpt: 'Vietnam\'s vibrant economic hub where French colonial heritage meets modern Asian dynamism, famous for its energy, food, and entrepreneurial spirit.',
    population: 13000000,
    coordinates: { latitude: 10.8231, longitude: 106.6297 },
    highlights: [
      { title: 'Ben Thanh Market', description: 'Iconic central market for local goods, food, and souvenirs' },
      { title: 'Notre-Dame Cathedral', description: 'Beautiful French colonial cathedral in the city center' },
      { title: 'War Remnants Museum', description: 'Moving museum documenting the Vietnam War' },
      { title: 'Cu Chi Tunnels', description: 'Historic underground tunnel network just outside the city' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Try banh mi at Banh Mi Huynh Hoa - arguably the city\'s best\n• Visit the rooftop bars in District 1 for stunning city views\n• Take a Vespa street food tour for the authentic experience\n• Ben Thanh night market opens after the day market closes',
          },
        ],
      },
    ],
    metaTitle: 'Visit Ho Chi Minh City - Vietnam\'s Dynamic Metropolis',
    metaDescription: 'Explore Ho Chi Minh City: Ben Thanh Market, French colonial architecture, Cu Chi Tunnels, and legendary street food.',
    metaKeywords: 'ho chi minh city, saigon, ben thanh, cu chi tunnels, vietnam travel',
    status: 'published' as const,
  },
  {
    name: 'Hoi An',
    slug: 'hoi-an',
    countrySlug: 'vietnam',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Hoi An is a UNESCO World Heritage ancient town that glows magically under thousands of colorful lanterns each evening. Once the most important trading port in Southeast Asia during the 16th-17th centuries, the town preserves unique architecture blending Vietnamese, Chinese, and Japanese influences.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond its photogenic old town, Hoi An offers beautiful An Bang Beach, the vegetable village of Tra Que for cooking classes, and hundreds of skilled tailors who can create custom clothing within 24 hours. The town\'s cuisine is legendary, featuring cao lau noodles, mi quang, and banh mi Phuong.',
          },
        ],
      },
    ],
    excerpt: 'UNESCO World Heritage ancient town glowing with lanterns, famed for tailoring, superb cuisine, and beautifully preserved multicultural architecture.',
    population: 120000,
    coordinates: { latitude: 15.8801, longitude: 108.3380 },
    highlights: [
      { title: 'Ancient Town', description: 'UNESCO site with unique Vietnamese-Chinese-Japanese architecture' },
      { title: 'Japanese Covered Bridge', description: 'Iconic symbol of Hoi An built in the 16th century' },
      { title: 'An Bang Beach', description: 'One of Vietnam\'s most beautiful beaches' },
      { title: 'Tra Que Vegetable Village', description: 'Experience farming and authentic cooking classes' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Visit the old town at night when lanterns are lit\n• Rent a bicycle to explore the surrounding countryside\n• Try Banh Mi Phuong - called "the world\'s best banh mi" by Anthony Bourdain\n• Order tailored clothes at least 2 days before departure for alterations',
          },
        ],
      },
    ],
    metaTitle: 'Visit Hoi An - Vietnam\'s Lantern Town',
    metaDescription: 'Discover Hoi An: UNESCO Ancient Town, Japanese Bridge, An Bang Beach, tailoring, and Central Vietnamese cuisine.',
    metaKeywords: 'hoi an, ancient town, lanterns, vietnam unesco, hoi an tailors, cao lau',
    status: 'published' as const,
  },
  {
    name: 'Da Nang',
    slug: 'da-nang',
    countrySlug: 'vietnam',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Da Nang has transformed from a quiet coastal city into one of Vietnam\'s most exciting destinations. With beautiful beaches, the stunning Marble Mountains, and the famous Ba Na Hills with its Golden Bridge, Da Nang serves as the perfect gateway to Central Vietnam.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The city boasts modern infrastructure, excellent seafood restaurants along My Khe Beach, and iconic bridges including the Dragon Bridge that breathes fire on weekends. It\'s the ideal base for exploring both Hoi An and Hue.',
          },
        ],
      },
    ],
    excerpt: 'Central Vietnam\'s modern coastal city featuring stunning beaches, the famous Golden Bridge, Marble Mountains, and gateway to Hoi An and Hue.',
    population: 1200000,
    coordinates: { latitude: 16.0544, longitude: 108.2022 },
    highlights: [
      { title: 'Ba Na Hills & Golden Bridge', description: 'Mountain resort with the iconic giant hands bridge' },
      { title: 'Marble Mountains', description: 'Five limestone hills with caves, temples, and panoramic views' },
      { title: 'My Khe Beach', description: 'One of the world\'s most beautiful beaches' },
      { title: 'Dragon Bridge', description: 'Architectural marvel that breathes fire and water on weekends' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Watch Dragon Bridge fire show on Saturday/Sunday nights at 9pm\n• Go to Ba Na Hills early to avoid crowds\n• My Khe Beach is best at sunrise\n• Fresh seafood along the beach road is excellent and affordable',
          },
        ],
      },
    ],
    metaTitle: 'Visit Da Nang - Central Vietnam\'s Coastal Gem',
    metaDescription: 'Explore Da Nang: Golden Bridge at Ba Na Hills, Marble Mountains, My Khe Beach, and Dragon Bridge.',
    metaKeywords: 'da nang, golden bridge, ba na hills, marble mountains, my khe beach, dragon bridge',
    status: 'published' as const,
  },
  {
    name: 'Sapa',
    slug: 'sapa',
    countrySlug: 'vietnam',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Sapa sits dramatically among the Hoang Lien Son Mountains, home to Fansipan - Indochina\'s highest peak. The stunning terraced rice fields cascading down misty valleys create one of Vietnam\'s most iconic landscapes, while diverse ethnic minorities including H\'mong and Dao maintain vibrant cultural traditions.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Trekking through remote villages, witnessing the colorful weekend markets, and experiencing homestays with local families offer authentic insights into mountain life. The cool climate provides a refreshing escape from Vietnam\'s tropical lowlands.',
          },
        ],
      },
    ],
    excerpt: 'Mountain paradise with spectacular terraced rice fields, ethnic minority cultures, trekking adventures, and Indochina\'s highest peak.',
    population: 80000,
    coordinates: { latitude: 22.3364, longitude: 103.8438 },
    highlights: [
      { title: 'Muong Hoa Valley', description: 'Spectacular terraced rice paddies and ethnic villages' },
      { title: 'Fansipan Peak', description: 'Indochina\'s highest summit at 3,143m, accessible by cable car or trek' },
      { title: 'Cat Cat Village', description: 'H\'mong village with traditional crafts and waterfalls' },
      { title: 'Bac Ha Market', description: 'Colorful Sunday market with ethnic minorities from surrounding areas' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Best rice terrace views are May-June (green) or September-October (golden)\n• Book multi-day treks with homestays for authentic experiences\n• Bring warm clothes - temperatures can drop significantly\n• The cable car to Fansipan is impressive but trekking is more rewarding',
          },
        ],
      },
    ],
    metaTitle: 'Visit Sapa - Vietnam\'s Mountain Paradise',
    metaDescription: 'Discover Sapa: Rice terraces, ethnic villages, Fansipan peak, trekking, and Hill tribe cultures.',
    metaKeywords: 'sapa, rice terraces, fansipan, hmong, vietnam mountains, sapa trekking',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // JAPAN
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Tokyo',
    slug: 'tokyo',
    countrySlug: 'japan',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Tokyo is a city of extraordinary contrasts - ancient temples and futuristic skyscrapers, serene gardens and neon-lit entertainment districts, traditional craft shops and cutting-edge technology stores. Japan\'s capital is one of the world\'s most fascinating urban environments.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Each neighborhood offers distinct character: Shibuya\'s iconic crossing and youth culture, Shinjuku\'s towering buildings and nightlife, Asakusa\'s historic temples, Harajuku\'s fashion extremes, and Ginza\'s luxury shopping. The city\'s food scene ranges from Michelin stars to beloved ramen shops.',
          },
        ],
      },
    ],
    excerpt: 'Japan\'s dazzling capital where ancient temples meet futuristic skyscrapers, quiet gardens contrast neon streets, and every neighborhood tells a different story.',
    population: 14000000,
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
    highlights: [
      { title: 'Senso-ji Temple', description: 'Tokyo\'s oldest temple in historic Asakusa district' },
      { title: 'Shibuya Crossing', description: 'World\'s busiest pedestrian crossing and Tokyo icon' },
      { title: 'Meiji Shrine', description: 'Peaceful Shinto shrine surrounded by forest in central Tokyo' },
      { title: 'Tsukiji Outer Market', description: 'Fresh sushi and Japanese culinary delights' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Get a Suica/Pasmo card for easy public transport\n• Visit Senso-ji Temple at dawn to avoid crowds\n• Try standing sushi bars for fresh, affordable sushi\n• Robot Restaurant in Shinjuku is wild entertainment',
          },
        ],
      },
    ],
    metaTitle: 'Visit Tokyo - Japan\'s Electric Capital',
    metaDescription: 'Explore Tokyo: Senso-ji Temple, Shibuya Crossing, Shinjuku, Harajuku, and world-class Japanese cuisine.',
    metaKeywords: 'tokyo, japan, shibuya, shinjuku, asakusa, senso-ji, japanese food',
    status: 'published' as const,
  },
  {
    name: 'Kyoto',
    slug: 'kyoto',
    countrySlug: 'japan',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Kyoto, Japan\'s former imperial capital for over a thousand years, is the country\'s cultural heart. With 17 UNESCO World Heritage Sites, 2,000 temples and shrines, traditional geisha districts, and exquisite Zen gardens, Kyoto embodies the soul of traditional Japan.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The city transforms dramatically with each season - cherry blossoms in spring, verdant moss gardens in summer, fiery maple leaves in autumn, and snow-dusted temples in winter. Kaiseki multi-course dining, matcha tea ceremonies, and staying in traditional ryokans complete the authentic experience.',
          },
        ],
      },
    ],
    excerpt: 'Japan\'s cultural treasure with ancient temples, geisha districts, Zen gardens, and the timeless traditions of the former imperial capital.',
    population: 1500000,
    coordinates: { latitude: 35.0116, longitude: 135.7681 },
    highlights: [
      { title: 'Fushimi Inari Shrine', description: 'Thousands of vermillion torii gates climbing the mountainside' },
      { title: 'Kinkaku-ji (Golden Pavilion)', description: 'Iconic gold-leaf covered Zen temple' },
      { title: 'Arashiyama Bamboo Grove', description: 'Magical bamboo forest path in western Kyoto' },
      { title: 'Gion District', description: 'Historic geisha quarter with traditional wooden machiya houses' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Visit Fushimi Inari at dawn for photos without crowds\n• Rent a bicycle to explore efficiently\n• Book kaiseki dinner for an unforgettable culinary experience\n• Stay in a traditional ryokan at least one night',
          },
        ],
      },
    ],
    metaTitle: 'Visit Kyoto - Japan\'s Cultural Capital',
    metaDescription: 'Discover Kyoto: Fushimi Inari, Golden Pavilion, Bamboo Grove, geisha district, and timeless Japanese traditions.',
    metaKeywords: 'kyoto, japan, fushimi inari, kinkakuji, arashiyama, geisha, zen temples',
    status: 'published' as const,
  },
  {
    name: 'Osaka',
    slug: 'osaka',
    countrySlug: 'japan',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Osaka is Japan\'s kitchen - a city that lives to eat. Known as "Japan\'s Kitchen," the city\'s food obsession shows in everything from Michelin-starred restaurants to legendary street food. Osakans are famous for their directness, humor, and dedication to enjoying life.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond food, Osaka offers the magnificent Osaka Castle, the vibrant Dotonbori entertainment district with its giant neon signs, and Universal Studios Japan. The city serves as an excellent base for day trips to Kyoto, Nara, and Kobe.',
          },
        ],
      },
    ],
    excerpt: 'Japan\'s culinary capital famous for takoyaki, okonomiyaki, vibrant nightlife, and the warmest, most outgoing people in Japan.',
    population: 2700000,
    coordinates: { latitude: 34.6937, longitude: 135.5023 },
    highlights: [
      { title: 'Dotonbori', description: 'Neon-lit entertainment district with iconic Glico Running Man sign' },
      { title: 'Osaka Castle', description: 'Historic castle with beautiful grounds and city views' },
      { title: 'Kuromon Market', description: 'Fresh seafood market called "Osaka\'s Kitchen"' },
      { title: 'Universal Studios Japan', description: 'World-class theme park with Harry Potter World' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Try takoyaki (octopus balls) and okonomiyaki (savory pancakes)\n• Dotonbori is best experienced at night\n• Shinsekai area has retro charm and kushikatsu\n• Osaka people speak directly - don\'t be surprised!',
          },
        ],
      },
    ],
    metaTitle: 'Visit Osaka - Japan\'s Food Capital',
    metaDescription: 'Explore Osaka: Dotonbori, Osaka Castle, Kuromon Market, street food, and the heartland of Japanese cuisine.',
    metaKeywords: 'osaka, japan, dotonbori, osaka castle, takoyaki, okonomiyaki, japan food',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // THAILAND
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Bangkok',
    slug: 'bangkok',
    countrySlug: 'thailand',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Bangkok, Thailand\'s pulsating capital, overwhelms and delights in equal measure. Ornate temples and palaces stand alongside modern shopping malls, while traditional street food carts operate beneath futuristic sky trains. This city never sleeps and never stops surprising.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The Grand Palace and Wat Pho showcase Thai artistic achievement, while the legendary Chatuchak Weekend Market offers 15,000 stalls. Thai massage, rooftop bars, floating markets, and night markets keep visitors engaged from dawn to well past midnight.',
          },
        ],
      },
    ],
    excerpt: 'Thailand\'s dazzling capital where ancient temples meet modern skyscrapers, legendary street food meets rooftop bars, and the energy never stops.',
    population: 10700000,
    coordinates: { latitude: 13.7563, longitude: 100.5018 },
    highlights: [
      { title: 'Grand Palace & Wat Phra Kaew', description: 'Thailand\'s most sacred Buddhist temple and royal palace' },
      { title: 'Wat Pho', description: 'Temple of the Reclining Buddha and traditional Thai massage school' },
      { title: 'Chatuchak Weekend Market', description: 'One of the world\'s largest outdoor markets with 15,000+ stalls' },
      { title: 'Khao San Road', description: 'Legendary backpacker hub with vibrant nightlife' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Visit Grand Palace early morning to beat the heat and crowds\n• Use BTS Skytrain and MRT to avoid traffic\n• Street food is safe and delicious - look for busy stalls\n• Negotiate tuk-tuk prices before getting in',
          },
        ],
      },
    ],
    metaTitle: 'Visit Bangkok - Thailand\'s City of Angels',
    metaDescription: 'Explore Bangkok: Grand Palace, Wat Pho, floating markets, street food, and vibrant Thai nightlife.',
    metaKeywords: 'bangkok, thailand, grand palace, wat pho, chatuchak, thai street food',
    status: 'published' as const,
  },
  {
    name: 'Chiang Mai',
    slug: 'chiang-mai',
    countrySlug: 'thailand',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Chiang Mai, the Rose of the North, offers a slower pace and cooler climate than Bangkok. This cultural capital of Northern Thailand features over 300 ancient temples, rich Lanna heritage, thriving arts scene, and is surrounded by misty mountains perfect for trekking.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The walled Old City contains the most important temples, while the trendy Nimmanhaemin area showcases boutiques and cafes. Nearby attractions include elephant sanctuaries, hill tribe villages, and the stunning Doi Inthanon National Park.',
          },
        ],
      },
    ],
    excerpt: 'Northern Thailand\'s cultural capital with ancient temples, Lanna heritage, mountain adventures, elephant sanctuaries, and a thriving creative scene.',
    population: 130000,
    coordinates: { latitude: 18.7883, longitude: 98.9853 },
    highlights: [
      { title: 'Doi Suthep Temple', description: 'Golden mountaintop temple overlooking the city' },
      { title: 'Old City Temples', description: 'Wat Chedi Luang, Wat Phra Singh, and dozens more' },
      { title: 'Night Bazaar', description: 'Famous night market with crafts, food, and entertainment' },
      { title: 'Sunday Walking Street', description: 'Weekly market transforming the Old City' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Visit Doi Suthep for sunrise or sunset views\n• Sunday Walking Street is unmissable\n• Choose ethical elephant sanctuaries (no riding)\n• November\'s Loi Krathong/Yi Peng lantern festival is magical',
          },
        ],
      },
    ],
    metaTitle: 'Visit Chiang Mai - Rose of the North',
    metaDescription: 'Discover Chiang Mai: Doi Suthep Temple, ancient Old City, night bazaar, and Northern Thai culture.',
    metaKeywords: 'chiang mai, thailand, doi suthep, old city, night bazaar, northern thailand',
    status: 'published' as const,
  },
  {
    name: 'Phuket',
    slug: 'phuket',
    countrySlug: 'thailand',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Phuket, Thailand\'s largest island, offers everything from buzzing Patong Beach to secluded coves in the north. World-class resorts, stunning Sino-Portuguese architecture in Phuket Town, and some of Asia\'s best beaches make it Thailand\'s premier beach destination.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond the beaches, Phuket serves as a gateway to the Andaman Sea\'s incredible islands including Phi Phi, James Bond Island, and the Similan Islands. Water sports, Thai cooking classes, and vibrant nightlife cater to every interest.',
          },
        ],
      },
    ],
    excerpt: 'Thailand\'s premier beach destination with stunning Andaman Sea views, world-class resorts, island hopping, and gateway to Phi Phi Islands.',
    population: 400000,
    coordinates: { latitude: 7.9519, longitude: 98.3381 },
    highlights: [
      { title: 'Patong Beach', description: 'Most famous beach with lively atmosphere and nightlife' },
      { title: 'Big Buddha', description: '45-meter marble Buddha statue with panoramic views' },
      { title: 'Old Phuket Town', description: 'Charming Sino-Portuguese architecture and local culture' },
      { title: 'Phi Phi Islands', description: 'Stunning islands accessible by speedboat from Phuket' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Rent a scooter to explore beyond the main beaches\n• Kata and Karon beaches are more relaxed than Patong\n• Book island tours in advance during high season\n• Sunday evening market in Phuket Town is excellent',
          },
        ],
      },
    ],
    metaTitle: 'Visit Phuket - Thailand\'s Island Paradise',
    metaDescription: 'Explore Phuket: Beautiful beaches, Big Buddha, Old Town, and gateway to Phi Phi Islands.',
    metaKeywords: 'phuket, thailand, patong beach, phi phi islands, andaman sea, thai islands',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // INDONESIA
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Bali',
    slug: 'bali',
    countrySlug: 'indonesia',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Bali, the Island of the Gods, enchants visitors with its unique Hindu culture, stunning temples, lush rice terraces, and world-class surf breaks. From the artistic hub of Ubud to the beach clubs of Seminyak and the spiritual energy of the island\'s countless temples, Bali offers something magical.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The island\'s diverse regions each offer distinct experiences: Uluwatu\'s clifftop temples and surf, Ubud\'s rice paddies and yoga retreats, Seminyak\'s boutiques and nightlife, and Nusa Penida\'s dramatic coastline. Balinese ceremonies and offerings bring color and spirituality to daily life.',
          },
        ],
      },
    ],
    excerpt: 'The Island of the Gods with ancient temples, rice terrace landscapes, world-class surfing, yoga retreats, and vibrant Hindu-Balinese culture.',
    population: 4300000,
    coordinates: { latitude: -8.4095, longitude: 115.1889 },
    highlights: [
      { title: 'Ubud', description: 'Cultural heart with rice terraces, monkey forest, and arts scene' },
      { title: 'Tanah Lot Temple', description: 'Iconic sea temple perched on a rock formation' },
      { title: 'Uluwatu Temple', description: 'Clifftop temple famous for Kecak fire dance at sunset' },
      { title: 'Tegalalang Rice Terraces', description: 'Iconic cascading rice paddies near Ubud' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Rent a scooter to explore freely (or hire a driver)\n• Watch sunset Kecak dance at Uluwatu Temple\n• Visit temples with appropriate clothing (sarongs available)\n• Avoid Kuta if you want a peaceful Bali experience',
          },
        ],
      },
    ],
    metaTitle: 'Visit Bali - Indonesia\'s Island of the Gods',
    metaDescription: 'Discover Bali: Ubud, Tanah Lot, Uluwatu, rice terraces, and the spiritual heart of Indonesia.',
    metaKeywords: 'bali, indonesia, ubud, tanah lot, uluwatu, bali temples, rice terraces',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAMBODIA
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Siem Reap',
    slug: 'siem-reap',
    countrySlug: 'cambodia',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Siem Reap is the gateway to the legendary Angkor temples, one of the world\'s most significant archaeological sites. The town has evolved from a simple temple town into a vibrant destination with excellent restaurants, traditional Apsara dance shows, and the famous Pub Street nightlife.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond Angkor, Siem Reap offers floating villages on Tonle Sap Lake, the Landmine Museum, traditional craft workshops, and some of Cambodia\'s best cuisine. The town strikes a pleasant balance between tourist facilities and authentic Khmer culture.',
          },
        ],
      },
    ],
    excerpt: 'Gateway to magnificent Angkor temples, Cambodia\'s most visited destination blending ancient wonders with vibrant modern town life.',
    population: 250000,
    coordinates: { latitude: 13.3671, longitude: 103.8448 },
    highlights: [
      { title: 'Angkor Wat', description: 'World\'s largest religious monument and sunrise icon' },
      { title: 'Angkor Thom', description: 'Ancient Khmer capital with the famous Bayon temple faces' },
      { title: 'Ta Prohm', description: 'Atmospheric temple engulfed by jungle tree roots' },
      { title: 'Tonle Sap Lake', description: 'Southeast Asia\'s largest freshwater lake with floating villages' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Buy a 3-day Angkor pass for thorough exploration\n• Watch sunrise at Angkor Wat (arrive before 5am)\n• Visit lesser-known temples like Banteay Srei and Beng Mealea\n• Hire a knowledgeable guide to understand the history',
          },
        ],
      },
    ],
    metaTitle: 'Visit Siem Reap - Gateway to Angkor Wat',
    metaDescription: 'Explore Siem Reap: Angkor Wat, Angkor Thom, Ta Prohm, floating villages, and Khmer culture.',
    metaKeywords: 'siem reap, angkor wat, angkor thom, ta prohm, cambodia temples, khmer',
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // EUROPE
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Paris',
    slug: 'paris',
    countrySlug: 'france',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Paris, the City of Light, needs no introduction. The Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, and Champs-Élysées are icons recognized worldwide. Yet Paris reveals its true magic in its neighborhoods - the Latin Quarter\'s intellectual cafes, Le Marais\'s historic streets, and Montmartre\'s artistic spirit.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Parisian lifestyle centers on appreciation of beauty, whether in art museums, patisserie windows, or elegant boulevards. World-class dining from bistros to Michelin stars, romantic Seine cruises, and endless cultural treasures make every visit memorable.',
          },
        ],
      },
    ],
    excerpt: 'The City of Light - iconic monuments, world-class museums, legendary cuisine, and the timeless romance that makes Paris the world\'s most visited city.',
    population: 2100000,
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    highlights: [
      { title: 'Eiffel Tower', description: 'Paris\'s iconic symbol with stunning city views' },
      { title: 'Louvre Museum', description: 'World\'s largest art museum, home to the Mona Lisa' },
      { title: 'Notre-Dame Cathedral', description: 'Gothic masterpiece on Île de la Cité' },
      { title: 'Montmartre', description: 'Artistic village crowned by Sacré-Cœur basilica' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Book Louvre and Eiffel Tower tickets online in advance\n• Wander the Le Marais district for charming streets\n• Try local bakeries for authentic croissants and baguettes\n• Sunset from Sacré-Cœur steps is magical',
          },
        ],
      },
    ],
    metaTitle: 'Visit Paris - The City of Light',
    metaDescription: 'Explore Paris: Eiffel Tower, Louvre Museum, Notre-Dame, Montmartre, and French gastronomy.',
    metaKeywords: 'paris, france, eiffel tower, louvre, notre dame, montmartre, french cuisine',
    status: 'published' as const,
  },
  {
    name: 'Rome',
    slug: 'rome',
    countrySlug: 'italy',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Rome, the Eternal City, is an open-air museum where ancient ruins, Renaissance art, and modern Italian life create an intoxicating mix. The Colosseum, Roman Forum, and Pantheon stand as testaments to the empire that once ruled the known world.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Vatican City offers spiritual and artistic treasures including St. Peter\'s Basilica and the Sistine Chapel. Roman cuisine - from carbonara to supplì to gelato - satisfies every craving, while the city\'s piazzas invite lingering over espresso and people-watching.',
          },
        ],
      },
    ],
    excerpt: 'The Eternal City where ancient ruins meet Renaissance masterpieces, Vatican treasures, and the irresistible pleasures of Italian life.',
    population: 2800000,
    coordinates: { latitude: 41.9028, longitude: 12.4964 },
    highlights: [
      { title: 'Colosseum', description: 'Ancient Rome\'s iconic amphitheater' },
      { title: 'Vatican Museums & Sistine Chapel', description: 'World\'s greatest art collection and Michelangelo\'s masterpiece' },
      { title: 'Trevi Fountain', description: 'Baroque fountain where tradition says to throw a coin' },
      { title: 'Roman Forum', description: 'Heart of ancient Rome\'s political and social life' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Book Vatican and Colosseum tickets online in advance\n• Trastevere neighborhood has the best authentic trattorias\n• Avoid tourist traps near major sites - walk a few blocks away\n• The best gelato shops display covered containers, not mountains',
          },
        ],
      },
    ],
    metaTitle: 'Visit Rome - The Eternal City',
    metaDescription: 'Explore Rome: Colosseum, Vatican City, Trevi Fountain, Roman Forum, and authentic Italian cuisine.',
    metaKeywords: 'rome, italy, colosseum, vatican, sistine chapel, trevi fountain, roman ruins',
    status: 'published' as const,
  },
  {
    name: 'Barcelona',
    slug: 'barcelona',
    countrySlug: 'spain',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Barcelona dazzles with Gaudí\'s surreal architecture, golden Mediterranean beaches, and the vibrant Catalan culture that sets it apart from the rest of Spain. La Sagrada Família, Park Güell, and Casa Batlló showcase architectural genius that seems to defy the laws of design.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The Gothic Quarter\'s medieval lanes contrast with the modern waterfront, while Las Ramblas bustles day and night. Barcelona\'s culinary scene ranges from legendary La Boqueria market to Michelin-starred restaurants, all enjoyed on the Spanish schedule of late dinners and later nights.',
          },
        ],
      },
    ],
    excerpt: 'Gaudí\'s masterpiece city with surreal architecture, Mediterranean beaches, Gothic Quarter charm, and the proud spirit of Catalonia.',
    population: 1600000,
    coordinates: { latitude: 41.3851, longitude: 2.1734 },
    highlights: [
      { title: 'La Sagrada Família', description: 'Gaudí\'s unfinished masterpiece and Barcelona\'s icon' },
      { title: 'Park Güell', description: 'Whimsical park with mosaic designs and city views' },
      { title: 'Gothic Quarter', description: 'Medieval labyrinth of narrow streets and hidden plazas' },
      { title: 'La Boqueria Market', description: 'Famous food market on Las Ramblas' },
    ],
    localTips: [
      {
        type: 'p',
        children: [
          {
            text: '• Book Sagrada Família tickets weeks in advance\n• Enjoy vermouth at noon like the locals\n• El Born neighborhood has the best bars and restaurants\n• Beach season runs May through October',
          },
        ],
      },
    ],
    metaTitle: 'Visit Barcelona - Gaudí\'s Masterpiece City',
    metaDescription: 'Explore Barcelona: La Sagrada Família, Park Güell, Gothic Quarter, beaches, and Catalan culture.',
    metaKeywords: 'barcelona, spain, gaudi, sagrada familia, park guell, gothic quarter, catalonia',
    status: 'published' as const,
  },
];

export const seedCities = async (
  countriesMap: Record<string, string>,
  placeholderMediaId?: number,
): Promise<void> => {
  console.log('\n🏙️ Seeding Cities...');

  for (const cityData of citiesData) {
    try {
      const { countrySlug, ...restCityData } = cityData;
      const countryId = countriesMap[countrySlug];

      if (!countryId) {
        console.log(`  ⚠️ Country not found for ${cityData.name} (${countrySlug})`);
        continue;
      }

      // Check if city already exists
      const existing = await payload.find({
        collection: 'cities',
        where: { slug: { equals: cityData.slug } },
      });

      const dataWithRelations = {
        ...restCityData,
        country: countryId,
        featuredImage: placeholderMediaId,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'cities',
          id: existing.docs[0].id,
          data: dataWithRelations as any,
        });
        console.log(`  ✏️ Updated: ${cityData.name}`);
      } else {
        await payload.create({
          collection: 'cities',
          data: dataWithRelations as any,
        });
        console.log(`  ✅ Created: ${cityData.name}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${cityData.name}:`, error.message);
    }
  }

  console.log(`  📊 Total cities: ${citiesData.length}`);
};

// Run independently
if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    // Build countries map
    const countriesResult = await payload.find({ collection: 'countries', limit: 100 });
    const countriesMap: Record<string, string> = {};
    countriesResult.docs.forEach((country: any) => {
      countriesMap[country.slug] = country.id;
    });

    await seedCities(countriesMap);
    console.log('\n✅ Cities seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed cities:', error);
    process.exit(1);
  });
}
