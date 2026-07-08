import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const seed = async (): Promise<void> => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me-in-production',
    local: true,
  });

  console.log('🌱 Starting comprehensive seed process...');

  try {
    // 1. Create admin user (if not exists)
    console.log('Creating admin user...');
    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@travel.com' } },
    });

    let adminUser;
    if (existingUsers.docs.length === 0) {
      adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@travel.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
        },
      });
      console.log('✅ Admin user created');
    } else {
      adminUser = existingUsers.docs[0];
      console.log('ℹ️ Admin user already exists');
    }

    // 2. Create sample media
    console.log('Creating sample media...');
    
    const placeholderImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const placeholderBuffer = Buffer.from(placeholderImageBase64, 'base64');
    
    const mediaDir = path.resolve(__dirname, '../../media');
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    const placeholderPath = path.join(mediaDir, 'placeholder.png');
    fs.writeFileSync(placeholderPath, placeholderBuffer);

    const existingMedia = await payload.find({
      collection: 'media',
      where: { alt: { equals: 'Japan Featured Image' } },
    });

    let featuredMedia;
    if (existingMedia.docs.length === 0) {
      featuredMedia = await payload.create({
        collection: 'media',
        data: {
          alt: 'Japan Featured Image',
          caption: 'Beautiful view of Japan',
          credit: 'Travel Photography',
        },
        filePath: placeholderPath,
      });
      console.log('✅ Sample media created');
    } else {
      featuredMedia = existingMedia.docs[0];
      console.log('ℹ️ Sample media already exists');
    }

    // =====================================================
    // COUNTRIES
    // =====================================================
    console.log('\n📍 Creating countries...');

    const countriesData = [
      {
        name: 'Japan',
        slug: 'japan',
        continent: 'asia' as const,
        excerpt: 'Experience the perfect blend of ancient tradition and modern innovation in the Land of the Rising Sun.',
        currency: 'JPY',
        language: 'Japanese',
        timezone: 'JST (UTC+9)',
        bestTimeToVisit: 'Spring (March-May) for cherry blossoms, or Autumn (September-November) for fall colors.',
      },
      {
        name: 'France',
        slug: 'france',
        continent: 'europe' as const,
        excerpt: 'Discover romance, art, and culinary excellence in the heart of Europe.',
        currency: 'EUR',
        language: 'French',
        timezone: 'CET (UTC+1)',
        bestTimeToVisit: 'Spring (April-June) or Fall (September-October) for pleasant weather.',
      },
      {
        name: 'Thailand',
        slug: 'thailand',
        continent: 'asia' as const,
        excerpt: 'Explore tropical beaches, ancient temples, and vibrant street food culture.',
        currency: 'THB',
        language: 'Thai',
        timezone: 'ICT (UTC+7)',
        bestTimeToVisit: 'November to February for cool, dry weather.',
      },
      {
        name: 'Italy',
        slug: 'italy',
        continent: 'europe' as const,
        excerpt: 'Immerse yourself in art, history, and the finest cuisine in the Mediterranean.',
        currency: 'EUR',
        language: 'Italian',
        timezone: 'CET (UTC+1)',
        bestTimeToVisit: 'April to June or September to October for ideal weather.',
      },
      {
        name: 'Vietnam',
        slug: 'vietnam',
        continent: 'asia' as const,
        excerpt: 'Journey through stunning landscapes, rich history, and incredible cuisine.',
        currency: 'VND',
        language: 'Vietnamese',
        timezone: 'ICT (UTC+7)',
        bestTimeToVisit: 'February to April for North, December to April for South.',
      },
    ];

    const countries: Record<string, typeof adminUser> = {};
    
    for (const countryData of countriesData) {
      const existing = await payload.find({
        collection: 'countries',
        where: { slug: { equals: countryData.slug } },
      });

      if (existing.docs.length === 0) {
        countries[countryData.slug] = await payload.create({
          collection: 'countries',
          data: {
            ...countryData,
            description: [{ type: 'p', children: [{ text: countryData.excerpt }] }],
            featuredImage: featuredMedia.id,
            metaTitle: `${countryData.name} Travel Guide`,
            metaDescription: countryData.excerpt,
            status: 'published',
            publishedAt: new Date().toISOString(),
          },
        });
        console.log(`✅ Country "${countryData.name}" created`);
      } else {
        countries[countryData.slug] = existing.docs[0];
        console.log(`ℹ️ Country "${countryData.name}" already exists`);
      }
    }

    // =====================================================
    // CITIES
    // =====================================================
    console.log('\n🏙️ Creating cities...');

    const citiesData = [
      // Japan
      { name: 'Tokyo', slug: 'tokyo', country: 'japan', population: 13960000, lat: 35.6762, lng: 139.6503, excerpt: "Japan's vibrant capital where ancient temples meet futuristic technology." },
      { name: 'Kyoto', slug: 'kyoto', country: 'japan', population: 1460000, lat: 35.0116, lng: 135.7681, excerpt: 'The cultural heart of Japan with thousands of temples and traditional gardens.' },
      { name: 'Osaka', slug: 'osaka', country: 'japan', population: 2750000, lat: 34.6937, lng: 135.5023, excerpt: "Japan's kitchen - a food lover's paradise with vibrant nightlife." },
      { name: 'Nara', slug: 'nara', country: 'japan', population: 360000, lat: 34.6851, lng: 135.8048, excerpt: 'Ancient capital famous for friendly deer and magnificent temples.' },
      { name: 'Hiroshima', slug: 'hiroshima', country: 'japan', population: 1200000, lat: 34.3853, lng: 132.4553, excerpt: 'A city of peace and resilience with powerful historical significance.' },
      // France
      { name: 'Paris', slug: 'paris', country: 'france', population: 2161000, lat: 48.8566, lng: 2.3522, excerpt: 'The City of Light - romance, art, and iconic landmarks await.' },
      { name: 'Nice', slug: 'nice', country: 'france', population: 343000, lat: 43.7102, lng: 7.2620, excerpt: 'Glamorous French Riviera destination with stunning Mediterranean views.' },
      { name: 'Lyon', slug: 'lyon', country: 'france', population: 516000, lat: 45.7640, lng: 4.8357, excerpt: 'Gastronomic capital of France with rich Roman heritage.' },
      // Thailand
      { name: 'Bangkok', slug: 'bangkok', country: 'thailand', population: 10539000, lat: 13.7563, lng: 100.5018, excerpt: 'Bustling metropolis blending ancient temples with modern skyscrapers.' },
      { name: 'Chiang Mai', slug: 'chiang-mai', country: 'thailand', population: 131000, lat: 18.7883, lng: 98.9853, excerpt: 'Northern cultural hub surrounded by misty mountains and temples.' },
      { name: 'Phuket', slug: 'phuket', country: 'thailand', population: 416582, lat: 7.8804, lng: 98.3923, excerpt: 'Tropical paradise with stunning beaches and vibrant nightlife.' },
      // Italy
      { name: 'Rome', slug: 'rome', country: 'italy', population: 2873000, lat: 41.9028, lng: 12.4964, excerpt: 'The Eternal City - 3000 years of globally influential art and architecture.' },
      { name: 'Florence', slug: 'florence', country: 'italy', population: 382000, lat: 43.7696, lng: 11.2558, excerpt: 'Birthplace of the Renaissance with world-class art and architecture.' },
      { name: 'Venice', slug: 'venice', country: 'italy', population: 261000, lat: 45.4408, lng: 12.3155, excerpt: 'Unique city of canals, gondolas, and stunning Venetian architecture.' },
      // Vietnam
      { name: 'Hanoi', slug: 'hanoi', country: 'vietnam', population: 8053663, lat: 21.0285, lng: 105.8542, excerpt: "Vietnam's charming capital with French colonial architecture and ancient temples." },
      { name: 'Ho Chi Minh City', slug: 'ho-chi-minh-city', country: 'vietnam', population: 8993082, lat: 10.8231, lng: 106.6297, excerpt: "Vietnam's largest city - a dynamic metropolis of history and modernity." },
      { name: 'Da Nang', slug: 'da-nang', country: 'vietnam', population: 1134310, lat: 16.0544, lng: 108.2022, excerpt: 'Coastal city with beautiful beaches and the famous Marble Mountains.' },
      { name: 'Hoi An', slug: 'hoi-an', country: 'vietnam', population: 120000, lat: 15.8801, lng: 108.3380, excerpt: 'Enchanting ancient town with lantern-lit streets and tailored fashion.' },
    ];

    const cities: Record<string, typeof adminUser> = {};

    for (const cityData of citiesData) {
      const existing = await payload.find({
        collection: 'cities',
        where: { slug: { equals: cityData.slug } },
      });

      if (existing.docs.length === 0) {
        cities[cityData.slug] = await payload.create({
          collection: 'cities',
          data: {
            name: cityData.name,
            slug: cityData.slug,
            country: countries[cityData.country].id,
            description: [{ type: 'p', children: [{ text: cityData.excerpt }] }],
            excerpt: cityData.excerpt,
            featuredImage: featuredMedia.id,
            population: cityData.population,
            coordinates: { latitude: cityData.lat, longitude: cityData.lng },
            metaTitle: `${cityData.name} Travel Guide`,
            metaDescription: cityData.excerpt,
            status: 'published',
            publishedAt: new Date().toISOString(),
          },
        });
        console.log(`✅ City "${cityData.name}" created`);
      } else {
        cities[cityData.slug] = existing.docs[0];
        console.log(`ℹ️ City "${cityData.name}" already exists`);
      }
    }

    // =====================================================
    // ATTRACTIONS (30+ for pagination testing)
    // =====================================================
    console.log('\n🏛️ Creating attractions...');

    const attractionsData = [
      // Tokyo
      { name: 'Senso-ji Temple', slug: 'senso-ji-temple', city: 'tokyo', category: 'religious-site', rating: 4.7, excerpt: "Tokyo's oldest and most significant Buddhist temple in Asakusa." },
      { name: 'Tokyo Skytree', slug: 'tokyo-skytree', city: 'tokyo', category: 'landmark', rating: 4.5, excerpt: 'The tallest tower in Japan with panoramic views of the city.' },
      { name: 'Shibuya Crossing', slug: 'shibuya-crossing', city: 'tokyo', category: 'landmark', rating: 4.6, excerpt: "The world's busiest pedestrian crossing and iconic Tokyo landmark." },
      { name: 'Meiji Shrine', slug: 'meiji-shrine', city: 'tokyo', category: 'religious-site', rating: 4.8, excerpt: 'Serene Shinto shrine dedicated to Emperor Meiji surrounded by forest.' },
      { name: 'teamLab Borderless', slug: 'teamlab-borderless', city: 'tokyo', category: 'museum', rating: 4.9, excerpt: 'Immersive digital art museum with stunning interactive installations.' },
      { name: 'Tsukiji Outer Market', slug: 'tsukiji-outer-market', city: 'tokyo', category: 'shopping', rating: 4.4, excerpt: 'Famous food market with fresh seafood and Japanese street food.' },
      { name: 'Ueno Park', slug: 'ueno-park', city: 'tokyo', category: 'park', rating: 4.3, excerpt: 'Large public park with museums, temples, and cherry blossoms.' },
      { name: 'Akihabara Electric Town', slug: 'akihabara', city: 'tokyo', category: 'entertainment', rating: 4.2, excerpt: 'Electronics and anime culture hub with countless shops.' },
      // Kyoto
      { name: 'Fushimi Inari Shrine', slug: 'fushimi-inari', city: 'kyoto', category: 'religious-site', rating: 4.9, excerpt: 'Iconic shrine with thousands of vermillion torii gates.' },
      { name: 'Kinkaku-ji', slug: 'kinkaku-ji', city: 'kyoto', category: 'religious-site', rating: 4.8, excerpt: 'The famous Golden Pavilion reflected in a tranquil pond.' },
      { name: 'Arashiyama Bamboo Grove', slug: 'arashiyama-bamboo', city: 'kyoto', category: 'nature', rating: 4.7, excerpt: 'Towering bamboo forest creating an ethereal walking path.' },
      { name: 'Gion District', slug: 'gion-district', city: 'kyoto', category: 'historical', rating: 4.5, excerpt: "Kyoto's famous geisha district with traditional architecture." },
      { name: 'Nijo Castle', slug: 'nijo-castle', city: 'kyoto', category: 'historical', rating: 4.6, excerpt: 'UNESCO World Heritage castle with nightingale floors.' },
      // Paris
      { name: 'Eiffel Tower', slug: 'eiffel-tower', city: 'paris', category: 'landmark', rating: 4.7, excerpt: "The iconic symbol of Paris and France's most visited monument." },
      { name: 'Louvre Museum', slug: 'louvre-museum', city: 'paris', category: 'museum', rating: 4.8, excerpt: "World's largest art museum home to the Mona Lisa." },
      { name: 'Notre-Dame Cathedral', slug: 'notre-dame', city: 'paris', category: 'religious-site', rating: 4.6, excerpt: 'Iconic Gothic cathedral on the Île de la Cité.' },
      { name: 'Sacré-Cœur', slug: 'sacre-coeur', city: 'paris', category: 'religious-site', rating: 4.5, excerpt: 'White-domed basilica atop Montmartre with city views.' },
      { name: 'Champs-Élysées', slug: 'champs-elysees', city: 'paris', category: 'shopping', rating: 4.3, excerpt: 'Famous avenue with luxury shops and the Arc de Triomphe.' },
      // Bangkok
      { name: 'Grand Palace', slug: 'grand-palace', city: 'bangkok', category: 'landmark', rating: 4.8, excerpt: 'Stunning former royal residence with the Emerald Buddha.' },
      { name: 'Wat Pho', slug: 'wat-pho', city: 'bangkok', category: 'religious-site', rating: 4.7, excerpt: 'Temple of the Reclining Buddha and traditional massage school.' },
      { name: 'Wat Arun', slug: 'wat-arun', city: 'bangkok', category: 'religious-site', rating: 4.6, excerpt: 'Temple of Dawn with stunning riverside location.' },
      { name: 'Chatuchak Market', slug: 'chatuchak-market', city: 'bangkok', category: 'shopping', rating: 4.4, excerpt: "One of the world's largest weekend markets." },
      { name: 'Khao San Road', slug: 'khao-san-road', city: 'bangkok', category: 'entertainment', rating: 4.0, excerpt: 'Famous backpacker street with vibrant nightlife.' },
      // Rome
      { name: 'Colosseum', slug: 'colosseum', city: 'rome', category: 'historical', rating: 4.8, excerpt: 'Ancient Roman amphitheater and iconic symbol of Rome.' },
      { name: 'Vatican Museums', slug: 'vatican-museums', city: 'rome', category: 'museum', rating: 4.9, excerpt: 'World-famous art collection including the Sistine Chapel.' },
      { name: 'Trevi Fountain', slug: 'trevi-fountain', city: 'rome', category: 'landmark', rating: 4.7, excerpt: 'Baroque masterpiece where you toss coins for good luck.' },
      { name: 'Roman Forum', slug: 'roman-forum', city: 'rome', category: 'historical', rating: 4.6, excerpt: 'Ancient ruins of the Roman Empire\'s political center.' },
      { name: 'Pantheon', slug: 'pantheon', city: 'rome', category: 'historical', rating: 4.8, excerpt: 'Best-preserved ancient Roman temple with stunning dome.' },
      // Vietnam
      { name: 'Ha Long Bay', slug: 'ha-long-bay', city: 'hanoi', category: 'nature', rating: 4.9, excerpt: 'UNESCO World Heritage site with thousands of limestone islands.' },
      { name: 'Hoan Kiem Lake', slug: 'hoan-kiem-lake', city: 'hanoi', category: 'park', rating: 4.5, excerpt: 'Scenic lake in the heart of Hanoi with Turtle Tower.' },
      { name: 'Old Quarter', slug: 'hanoi-old-quarter', city: 'hanoi', category: 'historical', rating: 4.4, excerpt: 'Historic commercial quarter with 36 ancient streets.' },
      { name: 'Cu Chi Tunnels', slug: 'cu-chi-tunnels', city: 'ho-chi-minh-city', category: 'historical', rating: 4.6, excerpt: 'Underground tunnel network from the Vietnam War.' },
      { name: 'War Remnants Museum', slug: 'war-remnants-museum', city: 'ho-chi-minh-city', category: 'museum', rating: 4.5, excerpt: 'Powerful museum documenting the Vietnam War.' },
      { name: 'Japanese Covered Bridge', slug: 'japanese-bridge', city: 'hoi-an', category: 'landmark', rating: 4.7, excerpt: 'Iconic 18th-century bridge symbol of Hoi An.' },
      { name: 'Ancient Town', slug: 'hoi-an-ancient-town', city: 'hoi-an', category: 'historical', rating: 4.8, excerpt: 'UNESCO World Heritage trading port with lantern-lit streets.' },
      // Additional attractions for pagination
      { name: 'Florence Cathedral', slug: 'florence-cathedral', city: 'florence', category: 'religious-site', rating: 4.8, excerpt: 'Iconic dome designed by Brunelleschi dominating Florence skyline.' },
      { name: 'Uffizi Gallery', slug: 'uffizi-gallery', city: 'florence', category: 'museum', rating: 4.9, excerpt: 'Premier art gallery with Botticelli and Renaissance masterpieces.' },
      { name: "St. Mark's Basilica", slug: 'st-marks-basilica', city: 'venice', category: 'religious-site', rating: 4.7, excerpt: 'Byzantine masterpiece with golden mosaics in Venice.' },
      { name: 'Rialto Bridge', slug: 'rialto-bridge', city: 'venice', category: 'landmark', rating: 4.5, excerpt: 'Oldest bridge spanning the Grand Canal in Venice.' },
      { name: 'Marble Mountains', slug: 'marble-mountains', city: 'da-nang', category: 'nature', rating: 4.4, excerpt: 'Five limestone hills with caves, temples and stunning views.' },
      { name: 'Dragon Bridge', slug: 'dragon-bridge', city: 'da-nang', category: 'landmark', rating: 4.3, excerpt: 'Iconic bridge that breathes fire and water on weekends.' },
      { name: 'Doi Suthep', slug: 'doi-suthep', city: 'chiang-mai', category: 'religious-site', rating: 4.7, excerpt: 'Sacred temple on a mountain overlooking Chiang Mai.' },
      { name: 'Old City Temples', slug: 'chiang-mai-old-city', city: 'chiang-mai', category: 'historical', rating: 4.5, excerpt: 'Collection of ancient temples within the moated old city.' },
    ];

    const attractions: Record<string, typeof adminUser> = {};

    for (const attractionData of attractionsData) {
      const existing = await payload.find({
        collection: 'attractions',
        where: { slug: { equals: attractionData.slug } },
      });

      if (existing.docs.length === 0) {
        attractions[attractionData.slug] = await payload.create({
          collection: 'attractions',
          data: {
            name: attractionData.name,
            slug: attractionData.slug,
            city: cities[attractionData.city].id,
            category: attractionData.category as 'landmark' | 'museum' | 'park' | 'beach' | 'religious-site' | 'entertainment' | 'shopping' | 'restaurant' | 'nature' | 'historical' | 'adventure' | 'other',
            description: [{ type: 'p', children: [{ text: attractionData.excerpt }] }],
            excerpt: attractionData.excerpt,
            featuredImage: featuredMedia.id,
            rating: attractionData.rating,
            visitDuration: '1-2 hours',
            ticketPrice: { adult: 0, child: 0, currency: 'USD', notes: 'Free admission' },
            tips: [
              { tip: 'Visit early morning to avoid crowds.' },
              { tip: 'Wear comfortable walking shoes.' },
            ],
            metaTitle: `${attractionData.name} - Travel Guide`,
            metaDescription: attractionData.excerpt,
            status: 'published',
            publishedAt: new Date().toISOString(),
          },
        });
        console.log(`✅ Attraction "${attractionData.name}" created`);
      } else {
        attractions[attractionData.slug] = existing.docs[0];
        console.log(`ℹ️ Attraction "${attractionData.name}" already exists`);
      }
    }

    // =====================================================
    // ITINERARIES (15+ for pagination testing)
    // =====================================================
    console.log('\n📋 Creating itineraries...');

    const itinerariesData = [
      {
        title: '3 Days in Tokyo: A Perfect Introduction',
        slug: '3-days-in-tokyo',
        duration: 3,
        countries: ['japan'],
        cities: ['tokyo'],
        difficulty: 'easy' as const,
        travelStyle: ['cultural', 'foodie'],
        budget: { min: 500, max: 1000, currency: 'USD' },
        excerpt: 'The perfect 3-day Tokyo itinerary for first-time visitors, covering temples, culture, food, and modern attractions.',
      },
      {
        title: '7 Days Exploring Japan: Tokyo to Kyoto',
        slug: '7-days-tokyo-kyoto',
        duration: 7,
        countries: ['japan'],
        cities: ['tokyo', 'kyoto', 'osaka'],
        difficulty: 'moderate' as const,
        travelStyle: ['cultural', 'adventure'],
        budget: { min: 1500, max: 2500, currency: 'USD' },
        excerpt: 'Experience the best of Japan from bustling Tokyo to traditional Kyoto with a taste of Osaka.',
      },
      {
        title: 'Paris in 4 Days: Romance and Culture',
        slug: '4-days-paris',
        duration: 4,
        countries: ['france'],
        cities: ['paris'],
        difficulty: 'easy' as const,
        travelStyle: ['romantic', 'cultural'],
        budget: { min: 800, max: 1500, currency: 'USD' },
        excerpt: 'Experience the magic of Paris with this perfectly curated 4-day romantic getaway.',
      },
      {
        title: '10 Days in Thailand: Beaches and Temples',
        slug: '10-days-thailand',
        duration: 10,
        countries: ['thailand'],
        cities: ['bangkok', 'chiang-mai', 'phuket'],
        difficulty: 'moderate' as const,
        travelStyle: ['adventure', 'relaxation'],
        budget: { min: 1000, max: 2000, currency: 'USD' },
        excerpt: 'From bustling Bangkok to serene beaches, discover the best of Thailand.',
      },
      {
        title: 'Italian Grand Tour: 14 Days',
        slug: '14-days-italy',
        duration: 14,
        countries: ['italy'],
        cities: ['rome', 'florence', 'venice'],
        difficulty: 'moderate' as const,
        travelStyle: ['cultural', 'foodie', 'romantic'],
        budget: { min: 2500, max: 4000, currency: 'USD' },
        excerpt: 'The classic Italian journey through Rome, Florence, and Venice.',
      },
      {
        title: 'Vietnam North to South: 2 Weeks',
        slug: '14-days-vietnam',
        duration: 14,
        countries: ['vietnam'],
        cities: ['hanoi', 'hoi-an', 'ho-chi-minh-city'],
        difficulty: 'moderate' as const,
        travelStyle: ['adventure', 'cultural', 'foodie'],
        budget: { min: 1200, max: 2000, currency: 'USD' },
        excerpt: 'Journey through Vietnam from Hanoi to Ho Chi Minh City, experiencing culture and cuisine.',
      },
      {
        title: 'Weekend in Kyoto: Temple Trail',
        slug: 'weekend-kyoto',
        duration: 2,
        countries: ['japan'],
        cities: ['kyoto'],
        difficulty: 'easy' as const,
        travelStyle: ['cultural', 'relaxation'],
        budget: { min: 300, max: 500, currency: 'USD' },
        excerpt: 'A quick but immersive weekend exploring Kyoto\'s most beautiful temples.',
      },
      {
        title: 'French Riviera Escape: 5 Days',
        slug: '5-days-french-riviera',
        duration: 5,
        countries: ['france'],
        cities: ['nice'],
        difficulty: 'easy' as const,
        travelStyle: ['luxury', 'relaxation'],
        budget: { min: 1500, max: 3000, currency: 'USD' },
        excerpt: 'Glamorous days on the Mediterranean coast with beaches and fine dining.',
      },
      {
        title: 'Bangkok Food Tour: 3 Days',
        slug: '3-days-bangkok-food',
        duration: 3,
        countries: ['thailand'],
        cities: ['bangkok'],
        difficulty: 'easy' as const,
        travelStyle: ['foodie'],
        budget: { min: 400, max: 700, currency: 'USD' },
        excerpt: 'Explore Bangkok through its incredible street food and restaurants.',
      },
      {
        title: 'Rome Ancient History: 5 Days',
        slug: '5-days-rome',
        duration: 5,
        countries: ['italy'],
        cities: ['rome'],
        difficulty: 'easy' as const,
        travelStyle: ['cultural'],
        budget: { min: 800, max: 1400, currency: 'USD' },
        excerpt: 'Walk through 3000 years of history in the Eternal City.',
      },
      {
        title: 'Chiang Mai Wellness Retreat: 7 Days',
        slug: '7-days-chiang-mai-wellness',
        duration: 7,
        countries: ['thailand'],
        cities: ['chiang-mai'],
        difficulty: 'easy' as const,
        travelStyle: ['relaxation', 'cultural'],
        budget: { min: 600, max: 1200, currency: 'USD' },
        excerpt: 'Rejuvenate with yoga, meditation, and Thai massage in the mountains.',
      },
      {
        title: 'Hoi An and Da Nang: 5 Days',
        slug: '5-days-hoi-an-danang',
        duration: 5,
        countries: ['vietnam'],
        cities: ['hoi-an', 'da-nang'],
        difficulty: 'easy' as const,
        travelStyle: ['relaxation', 'cultural'],
        budget: { min: 500, max: 900, currency: 'USD' },
        excerpt: 'Ancient charm and beach relaxation in central Vietnam.',
      },
      {
        title: 'Japan Cherry Blossom Special: 10 Days',
        slug: '10-days-japan-sakura',
        duration: 10,
        countries: ['japan'],
        cities: ['tokyo', 'kyoto', 'osaka', 'nara'],
        difficulty: 'moderate' as const,
        travelStyle: ['cultural', 'romantic'],
        budget: { min: 2000, max: 3500, currency: 'USD' },
        excerpt: 'Experience Japan during the magical cherry blossom season.',
      },
      {
        title: 'Budget Backpacking Southeast Asia: 21 Days',
        slug: '21-days-sea-backpacking',
        duration: 21,
        countries: ['thailand', 'vietnam'],
        cities: ['bangkok', 'chiang-mai', 'hanoi', 'ho-chi-minh-city'],
        difficulty: 'challenging' as const,
        travelStyle: ['budget', 'adventure'],
        budget: { min: 1500, max: 2500, currency: 'USD' },
        excerpt: 'The ultimate backpacker route through Thailand and Vietnam.',
      },
      {
        title: 'Luxury Europe: Paris, Florence, Venice',
        slug: 'luxury-europe-15-days',
        duration: 15,
        countries: ['france', 'italy'],
        cities: ['paris', 'florence', 'venice'],
        difficulty: 'easy' as const,
        travelStyle: ['luxury', 'romantic', 'cultural'],
        budget: { min: 5000, max: 10000, currency: 'USD' },
        excerpt: 'An indulgent journey through Europe\'s most romantic cities.',
      },
      {
        title: 'Family Adventure: Japan with Kids',
        slug: '10-days-japan-family',
        duration: 10,
        countries: ['japan'],
        cities: ['tokyo', 'osaka', 'kyoto'],
        difficulty: 'easy' as const,
        travelStyle: ['family', 'cultural'],
        budget: { min: 4000, max: 6000, currency: 'USD' },
        excerpt: 'Kid-friendly itinerary covering Japan\'s best family attractions.',
      },
    ];

    for (const itineraryData of itinerariesData) {
      const existing = await payload.find({
        collection: 'itineraries',
        where: { slug: { equals: itineraryData.slug } },
      });

      if (existing.docs.length === 0) {
        const countryIds = itineraryData.countries.map(c => countries[c]?.id).filter(Boolean);
        const cityIds = itineraryData.cities.map(c => cities[c]?.id).filter(Boolean);
        
        // Create days based on duration
        const days = [];
        for (let i = 1; i <= itineraryData.duration; i++) {
          const cityIndex = Math.min(i - 1, itineraryData.cities.length - 1);
          const citySlug = itineraryData.cities[cityIndex];
          days.push({
            dayNumber: i,
            title: `Day ${i}: ${i === 1 ? 'Arrival and Exploration' : i === itineraryData.duration ? 'Final Day and Departure' : 'Continued Adventures'}`,
            city: cities[citySlug]?.id,
            description: [{ type: 'p', children: [{ text: `Explore the highlights of ${citySlug.replace(/-/g, ' ')}.` }] }],
            activities: [
              {
                time: 'Morning',
                activity: 'Sightseeing and exploration',
                description: 'Start the day with local attractions.',
                duration: '3-4 hours',
              },
              {
                time: 'Afternoon',
                activity: 'Cultural experiences',
                description: 'Immerse yourself in local culture.',
                duration: '3-4 hours',
              },
              {
                time: 'Evening',
                activity: 'Dinner and relaxation',
                description: 'Enjoy local cuisine and rest.',
                duration: '2-3 hours',
              },
            ],
            meals: {
              breakfast: 'Hotel breakfast',
              lunch: 'Local restaurant',
              dinner: 'Traditional cuisine',
            },
          });
        }

        await payload.create({
          collection: 'itineraries',
          data: {
            title: itineraryData.title,
            slug: itineraryData.slug,
            description: [{ type: 'p', children: [{ text: itineraryData.excerpt }] }],
            excerpt: itineraryData.excerpt,
            featuredImage: featuredMedia.id,
            duration: itineraryData.duration,
            countries: countryIds,
            cities: cityIds,
            difficulty: itineraryData.difficulty,
            travelStyle: itineraryData.travelStyle,
            estimatedBudget: {
              min: itineraryData.budget.min,
              max: itineraryData.budget.max,
              currency: itineraryData.budget.currency,
              notes: 'Excluding international flights',
            },
            days,
            packingList: [
              { item: 'Comfortable walking shoes', category: 'clothing' },
              { item: 'Weather-appropriate clothing', category: 'clothing' },
              { item: 'Travel adapter', category: 'electronics' },
              { item: 'Passport and documents', category: 'documents' },
              { item: 'Travel insurance details', category: 'documents' },
            ],
            tips: [{ type: 'p', children: [{ text: 'Book accommodations and major attractions in advance. Carry local currency for small vendors. Respect local customs and dress codes.' }] }],
            author: adminUser.id,
            metaTitle: itineraryData.title,
            metaDescription: itineraryData.excerpt,
            status: 'published',
            publishedAt: new Date().toISOString(),
          },
        });
        console.log(`✅ Itinerary "${itineraryData.title}" created`);
      } else {
        console.log(`ℹ️ Itinerary "${itineraryData.title}" already exists`);
      }
    }

    console.log('\n🎉 Comprehensive seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • ${Object.keys(countries).length} countries`);
    console.log(`   • ${Object.keys(cities).length} cities`);
    console.log(`   • ${attractionsData.length} attractions`);
    console.log(`   • ${itinerariesData.length} itineraries`);
    console.log('\nYou can now:');
    console.log('1. Login to admin panel at http://localhost:3001/admin');
    console.log('   Email: admin@travel.com');
    console.log('   Password: admin123');
    console.log('2. View the seeded content in the CMS');
    console.log('3. Start the web frontend to see pagination in action');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
