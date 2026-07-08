import payload from 'payload';

/**
 * Itineraries Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/itineraries.seed.ts
 */

export const itinerariesData = [
  // ═══════════════════════════════════════════════════════════════════
  // VIETNAM ITINERARIES
  // ═══════════════════════════════════════════════════════════════════
  {
    title: 'Vietnam Highlights - 10 Days North to South',
    slug: 'vietnam-highlights-10-days',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Experience the very best of Vietnam in 10 unforgettable days. Journey from the historic streets of Hanoi through the mystical Ha Long Bay, along the beautiful coast to ancient Hoi An, and end in dynamic Ho Chi Minh City. This perfectly balanced itinerary showcases Vietnam\'s incredible diversity.',
          },
        ],
      },
    ],
    excerpt: 'The ultimate Vietnam journey from Hanoi to Saigon, experiencing ancient culture, UNESCO heritage, stunning landscapes, and world-famous cuisine.',
    duration: 10,
    difficulty: 'moderate' as const,
    travelStyle: ['cultural', 'foodie'],
    countrySlug: 'vietnam',
    estimatedBudget: {
      min: 1500,
      max: 2500,
      currency: 'USD',
      notes: 'Includes 4-star hotels, domestic flights, guided tours, and main meals',
    },
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Hanoi',
        description: [{ type: 'p', children: [{ text: 'Welcome to Vietnam! Transfer to your hotel in the heart of the Old Quarter. Afternoon walking tour through the ancient 36 streets, each named after traditional trades. Evening cyclo ride around Hoan Kiem Lake.' }] }],
        activities: [
          { time: '14:00', activity: 'Hotel check-in', description: 'Boutique hotel in Old Quarter' },
          { time: '15:30', activity: 'Old Quarter Walking Tour', description: 'Explore the historic 36 streets with local guide', duration: '2 hours' },
          { time: '18:00', activity: 'Cyclo ride around Hoan Kiem Lake', description: 'Traditional pedicab experience at sunset' },
          { time: '19:30', activity: 'Welcome dinner', description: 'Traditional Vietnamese cuisine in restored French villa' },
        ],
        meals: { breakfast: 'Not included', lunch: 'Not included', dinner: 'Welcome dinner included' },
      },
      {
        dayNumber: 2,
        title: 'Hanoi - Heritage & Culture',
        description: [{ type: 'p', children: [{ text: 'Full day exploring Hanoi\'s most significant landmarks. Visit the Ho Chi Minh Complex, Temple of Literature, and the fascinating Vietnam Museum of Ethnology. Evening water puppet show - a unique Vietnamese art form.' }] }],
        activities: [
          { time: '08:00', activity: 'Ho Chi Minh Mausoleum Complex', description: 'Mausoleum, Presidential Palace, One Pillar Pagoda', duration: '2.5 hours' },
          { time: '11:00', activity: 'Temple of Literature', description: 'Vietnam\'s first national university', duration: '1.5 hours' },
          { time: '14:00', activity: 'Museum of Ethnology', description: 'Learn about Vietnam\'s 54 ethnic groups', duration: '2 hours' },
          { time: '20:00', activity: 'Water Puppet Show', description: 'Traditional Vietnamese performing art', duration: '1 hour' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Pho at legendary local shop', dinner: 'Street food tour' },
      },
      {
        dayNumber: 3,
        title: 'Hanoi to Ha Long Bay',
        description: [{ type: 'p', children: [{ text: 'Travel to the UNESCO World Heritage site Ha Long Bay. Board your luxury junk boat and begin cruising among thousands of limestone karsts. Visit Sung Sot Cave, kayak through hidden lagoons, and enjoy a seafood feast on board.' }] }],
        activities: [
          { time: '08:00', activity: 'Depart Hanoi', description: 'Scenic drive through Red River Delta', duration: '3.5 hours' },
          { time: '12:00', activity: 'Board cruise ship', description: 'Check into cabin, lunch while cruising' },
          { time: '15:00', activity: 'Sung Sot Cave', description: 'One of the bay\'s largest and most beautiful caves', duration: '1.5 hours' },
          { time: '17:00', activity: 'Kayaking', description: 'Explore hidden lagoons and floating villages' },
        ],
        accommodation: { name: 'Luxury Junk Boat', type: 'other' as const, notes: 'Private balcony cabin' },
        meals: { breakfast: 'Hotel breakfast', lunch: 'Seafood lunch on boat', dinner: 'Gala dinner on deck' },
      },
      {
        dayNumber: 4,
        title: 'Ha Long Bay to Hanoi to Da Nang',
        description: [{ type: 'p', children: [{ text: 'Wake to sunrise over the bay. Tai chi session on deck followed by brunch while cruising back. Return to Hanoi and fly to Da Nang. Transfer to Hoi An and settle into your riverside resort.' }] }],
        activities: [
          { time: '06:00', activity: 'Tai Chi on deck', description: 'Optional morning exercise' },
          { time: '07:00', activity: 'Brunch and check-out', description: 'Final cruise through the bay' },
          { time: '11:30', activity: 'Return to Hanoi', description: 'Scenic drive back' },
          { time: '16:00', activity: 'Flight to Da Nang', description: '1.5 hour flight', duration: '1.5 hours' },
          { time: '19:00', activity: 'Arrive Hoi An', description: 'Check into riverside resort' },
        ],
        meals: { breakfast: 'Brunch on boat', lunch: 'Light lunch in Hanoi', dinner: 'Hoi An specialties' },
      },
      {
        dayNumber: 5,
        title: 'Hoi An Ancient Town',
        description: [{ type: 'p', children: [{ text: 'Full day immersed in beautiful Hoi An. Morning walking tour of the UNESCO Ancient Town, visiting the Japanese Bridge, Chinese assembly halls, and traditional houses. Afternoon at leisure for tailoring, shopping, or relaxing by the pool.' }] }],
        activities: [
          { time: '09:00', activity: 'Ancient Town Walking Tour', description: 'Japanese Bridge, Phung Hung House, assembly halls', duration: '3 hours' },
          { time: '12:30', activity: 'Lunch at Morning Glory', description: 'Famous restaurant by celebrity chef Ms. Vy' },
          { time: '14:00', activity: 'Free time', description: 'Tailoring fittings, shopping, or resort leisure' },
          { time: '19:00', activity: 'Lantern-lit dinner', description: 'Riverside restaurant as lanterns illuminate the town' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Cooking class lunch', dinner: 'Ancient Town restaurant' },
      },
      {
        dayNumber: 6,
        title: 'Hoi An - Countryside & Cooking',
        description: [{ type: 'p', children: [{ text: 'Morning bicycle ride through rice paddies to Tra Que vegetable village. Hands-on cooking class learning Vietnamese dishes using freshly picked ingredients. Afternoon at An Bang Beach.' }] }],
        activities: [
          { time: '07:30', activity: 'Bicycle to Tra Que Village', description: 'Scenic ride through countryside' },
          { time: '08:30', activity: 'Farming experience', description: 'Work alongside local farmers', duration: '1 hour' },
          { time: '10:00', activity: 'Cooking class', description: 'Learn to prepare Vietnamese dishes', duration: '3 hours' },
          { time: '14:30', activity: 'An Bang Beach', description: 'Relax at one of Vietnam\'s finest beaches' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Cooking class creations', dinner: 'Beach restaurant' },
      },
      {
        dayNumber: 7,
        title: 'Hoi An to Ho Chi Minh City',
        description: [{ type: 'p', children: [{ text: 'Morning at leisure for last-minute tailor pickups. Flight to Ho Chi Minh City. Afternoon orientation walk through District 1 including Notre Dame Cathedral, Central Post Office, and historic Opera House.' }] }],
        activities: [
          { time: '09:00', activity: 'Final tailor fitting', description: 'Collect your custom garments' },
          { time: '12:00', activity: 'Flight to Ho Chi Minh City', description: '1.5 hour flight', duration: '1.5 hours' },
          { time: '15:00', activity: 'District 1 orientation', description: 'Cathedral, Post Office, Opera House' },
          { time: '18:30', activity: 'Rooftop drinks', description: 'Sunset views from iconic Saigon skyscraper' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Airport/flight', dinner: 'Saigon fine dining' },
      },
      {
        dayNumber: 8,
        title: 'Cu Chi Tunnels & Saigon',
        description: [{ type: 'p', children: [{ text: 'Morning excursion to the incredible Cu Chi Tunnels - an underground network used during the Vietnam War. Return for lunch and visit the sobering War Remnants Museum. Evening Vespa street food tour.' }] }],
        activities: [
          { time: '08:00', activity: 'Cu Chi Tunnels', description: 'Underground tunnel system and war history', duration: '4 hours' },
          { time: '13:00', activity: 'Return to Saigon', description: 'Lunch en route' },
          { time: '15:00', activity: 'War Remnants Museum', description: 'Powerful Vietnam War documentation', duration: '2 hours' },
          { time: '18:30', activity: 'Vespa street food tour', description: 'Explore Saigon\'s back alleys by motorbike', duration: '4 hours' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Local restaurant', dinner: 'Street food tour' },
      },
      {
        dayNumber: 9,
        title: 'Mekong Delta Day Trip',
        description: [{ type: 'p', children: [{ text: 'Full day exploring the Mekong Delta - Vietnam\'s rice bowl. Cruise through waterways, visit floating markets, see traditional crafts, and enjoy a home-cooked lunch in a local family\'s orchard.' }] }],
        activities: [
          { time: '07:30', activity: 'Depart for Ben Tre', description: 'Journey to Mekong Delta', duration: '2 hours' },
          { time: '09:30', activity: 'Boat cruise', description: 'Navigate coconut-lined canals' },
          { time: '11:00', activity: 'Traditional workshops', description: 'See coconut candy, rice paper making' },
          { time: '12:30', activity: 'Lunch in orchard', description: 'Home-cooked meal with local family' },
          { time: '14:30', activity: 'Sampan boat ride', description: 'Small boat through narrow waterways' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Home-cooked Mekong meal', dinner: 'Farewell dinner' },
      },
      {
        dayNumber: 10,
        title: 'Departure from Ho Chi Minh City',
        description: [{ type: 'p', children: [{ text: 'Depending on your flight time, enjoy a final morning in Saigon. Perhaps visit Ben Thanh Market for souvenirs or enjoy one last bowl of pho. Transfer to airport for your onward journey.' }] }],
        activities: [
          { time: 'Morning', activity: 'Free time', description: 'Ben Thanh Market or leisure' },
          { time: 'TBC', activity: 'Airport transfer', description: 'Private transfer based on flight time' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Not included', dinner: 'Not included' },
      },
    ],
    metaTitle: 'Vietnam 10 Day Itinerary | North to South Highlights Tour',
    metaDescription: 'The perfect 10-day Vietnam journey from Hanoi to Ho Chi Minh City. Ha Long Bay cruise, Hoi An ancient town, Cu Chi Tunnels, and world-famous cuisine.',
    metaKeywords: 'vietnam itinerary, vietnam 10 days, hanoi to saigon, ha long bay, hoi an, vietnam tour',
    status: 'published' as const,
  },
  {
    title: 'Japan Cherry Blossom Experience - 12 Days',
    slug: 'japan-cherry-blossom-12-days',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Experience Japan at its most magical during cherry blossom season. This carefully crafted 12-day journey takes you from Tokyo through ancient Kyoto and culinary Osaka, timed to coincide with the sakura bloom. Witness hanami parties, ancient temples adorned with pink petals, and Japanese culture at its most celebratory.',
          },
        ],
      },
    ],
    excerpt: 'Japan at its most magical during cherry blossom season. Tokyo, Kyoto, Osaka and beyond, timed perfectly for sakura viewing.',
    duration: 12,
    difficulty: 'easy' as const,
    travelStyle: ['cultural', 'romantic'],
    countrySlug: 'japan',
    estimatedBudget: {
      min: 3500,
      max: 5500,
      currency: 'USD',
      notes: 'Includes ryokan stays, JR Pass, guided tours, and half-board meals',
    },
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Tokyo',
        description: [{ type: 'p', children: [{ text: 'Welcome to Japan! Transfer from Narita or Haneda airport to your hotel in the Shinjuku district. Rest and recover from your flight with an evening orientation walk through the neon-lit streets.' }] }],
        activities: [
          { time: '15:00', activity: 'Hotel check-in', description: 'Contemporary hotel in Shinjuku' },
          { time: '18:00', activity: 'Shinjuku orientation walk', description: 'Experience Tokyo\'s neon wonderland' },
          { time: '19:30', activity: 'Welcome dinner', description: 'Traditional izakaya experience' },
        ],
        meals: { breakfast: 'Not included', lunch: 'Not included', dinner: 'Welcome dinner included' },
      },
      {
        dayNumber: 2,
        title: 'Tokyo - Traditional & Modern',
        description: [{ type: 'p', children: [{ text: 'Contrast old and new Tokyo. Morning at the ancient Senso-ji Temple in Asakusa, then cross the city to the futuristic Shibuya district. Experience the famous scramble crossing and ascend Shibuya Sky for panoramic views.' }] }],
        activities: [
          { time: '09:00', activity: 'Senso-ji Temple', description: 'Tokyo\'s oldest temple and Nakamise shopping street', duration: '2 hours' },
          { time: '12:00', activity: 'Lunch in Asakusa', description: 'Traditional soba noodles' },
          { time: '14:00', activity: 'Shibuya Crossing', description: 'The world\'s busiest intersection' },
          { time: '16:00', activity: 'Shibuya Sky', description: 'Rooftop observation deck', duration: '1.5 hours' },
          { time: '18:30', activity: 'Harajuku exploration', description: 'Youth fashion capital' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Soba restaurant', dinner: 'At leisure' },
      },
      {
        dayNumber: 3,
        title: 'Tokyo - Cherry Blossom Highlights',
        description: [{ type: 'p', children: [{ text: 'Today is dedicated to cherry blossom viewing. Visit Tokyo\'s most spectacular hanami spots including Ueno Park, Chidorigafuchi moat, and the Imperial Palace East Gardens. Join the locals for a picnic under the sakura.' }] }],
        activities: [
          { time: '08:30', activity: 'Ueno Park', description: 'One of Tokyo\'s premier sakura spots', duration: '2 hours' },
          { time: '11:00', activity: 'Imperial Palace East Gardens', description: 'Free gardens with beautiful cherry trees' },
          { time: '13:00', activity: 'Hanami picnic', description: 'Traditional bento lunch under cherry trees' },
          { time: '15:00', activity: 'Chidorigafuchi', description: 'Iconic moat with row boat rental', duration: '2 hours' },
          { time: '18:00', activity: 'Yozakura (night viewing)', description: 'Illuminated cherry blossoms' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Hanami bento box', dinner: 'At leisure' },
      },
      {
        dayNumber: 4,
        title: 'Tokyo to Hakone',
        description: [{ type: 'p', children: [{ text: 'Escape the city for the natural beauty of Hakone. Take the scenic "Hakone Free Pass" route including cable cars, ropeway, and pirate ship across Lake Ashi with views of Mt. Fuji. Overnight in a traditional ryokan with onsen hot springs.' }] }],
        activities: [
          { time: '09:00', activity: 'Shinkansen to Odawara', description: '35 minute bullet train ride' },
          { time: '10:00', activity: 'Hakone circuit begins', description: 'Switchback train and cable car' },
          { time: '12:00', activity: 'Owakudani', description: 'Volcanic valley with black eggs', duration: '1 hour' },
          { time: '14:00', activity: 'Lake Ashi pirate ship', description: 'Scenic cruise with Mt. Fuji views' },
          { time: '16:00', activity: 'Ryokan check-in', description: 'Traditional Japanese inn' },
          { time: '18:00', activity: 'Onsen time', description: 'Natural hot spring baths' },
        ],
        accommodation: { name: 'Traditional Ryokan', type: 'other' as const, notes: 'With private onsen' },
        meals: { breakfast: 'Hotel breakfast', lunch: 'Hakone restaurant', dinner: 'Kaiseki dinner at ryokan' },
      },
      {
        dayNumber: 5,
        title: 'Hakone to Kyoto',
        description: [{ type: 'p', children: [{ text: 'Morning at leisure in the ryokan before traveling to Kyoto by bullet train. Afternoon orientation walk through Gion, Kyoto\'s famous geisha district. Evening stroll along Pontocho alley.' }] }],
        activities: [
          { time: '09:00', activity: 'Morning onsen', description: 'Final soak before departure' },
          { time: '11:00', activity: 'Shinkansen to Kyoto', description: '2 hour journey' },
          { time: '14:00', activity: 'Hotel check-in', description: 'Traditional machiya townhouse' },
          { time: '16:00', activity: 'Gion district walk', description: 'Historic geisha quarter', duration: '2 hours' },
          { time: '19:00', activity: 'Pontocho dinner', description: 'Atmospheric riverside dining' },
        ],
        meals: { breakfast: 'Ryokan breakfast', lunch: 'Shinkansen bento', dinner: 'Pontocho restaurant' },
      },
      {
        dayNumber: 6,
        title: 'Kyoto - Temples & Gardens',
        description: [{ type: 'p', children: [{ text: 'Full day exploring Kyoto\'s iconic temples. Early morning at Fushimi Inari with its thousands of vermillion torii gates, followed by the Golden Pavilion (Kinkaku-ji) and the serene gardens of Ryoan-ji.' }] }],
        activities: [
          { time: '06:00', activity: 'Fushimi Inari Shrine', description: 'Thousands of torii gates at dawn', duration: '2.5 hours' },
          { time: '10:00', activity: 'Kinkaku-ji (Golden Pavilion)', description: 'Iconic gold-covered Zen temple', duration: '1.5 hours' },
          { time: '12:30', activity: 'Lunch in Arashiyama', description: 'Tofu cuisine' },
          { time: '14:00', activity: 'Bamboo Grove', description: 'Walk through the magical bamboo forest' },
          { time: '16:00', activity: 'Ryoan-ji Temple', description: 'Famous Zen rock garden', duration: '1 hour' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Tofu restaurant', dinner: 'At leisure' },
      },
      {
        dayNumber: 7,
        title: 'Kyoto - Cherry Blossom Day',
        description: [{ type: 'p', children: [{ text: 'Experience Kyoto\'s most spectacular cherry blossom locations. Visit Maruyama Park, the Philosopher\'s Path lined with sakura, and the beautiful grounds of Heian Shrine.' }] }],
        activities: [
          { time: '09:00', activity: 'Maruyama Park', description: 'Kyoto\'s most popular hanami spot', duration: '2 hours' },
          { time: '11:30', activity: 'Philosopher\'s Path', description: '2km path lined with cherry trees', duration: '2 hours' },
          { time: '14:00', activity: 'Ginkaku-ji (Silver Pavilion)', description: 'Zen temple at path\'s northern end' },
          { time: '16:00', activity: 'Heian Shrine', description: 'Weeping cherry trees in vast gardens' },
          { time: '18:30', activity: 'Evening in Gion', description: 'Spot geisha during the flower season' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Picnic along Philosopher\'s Path', dinner: 'Kaiseki dinner' },
      },
      {
        dayNumber: 8,
        title: 'Day Trip to Nara',
        description: [{ type: 'p', children: [{ text: 'Visit Japan\'s first permanent capital. Meet the famous bowing deer of Nara Park, marvel at the Great Buddha in Todai-ji, and explore the ancient Kasuga Grand Shrine with its thousands of lanterns.' }] }],
        activities: [
          { time: '09:00', activity: 'Train to Nara', description: '45 minutes from Kyoto' },
          { time: '10:00', activity: 'Nara Park', description: 'Feed the sacred deer', duration: '1 hour' },
          { time: '11:30', activity: 'Todai-ji Temple', description: 'World\'s largest wooden building and Great Buddha', duration: '1.5 hours' },
          { time: '13:30', activity: 'Lunch in Nara', description: 'Local specialty: kakinoha-zushi' },
          { time: '15:00', activity: 'Kasuga Grand Shrine', description: '3,000 stone and bronze lanterns' },
          { time: '17:00', activity: 'Return to Kyoto', description: 'Evening free' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Nara restaurant', dinner: 'At leisure' },
      },
      {
        dayNumber: 9,
        title: 'Kyoto to Osaka',
        description: [{ type: 'p', children: [{ text: 'Morning tea ceremony experience in Kyoto before traveling to Japan\'s kitchen - Osaka. Afternoon in Osaka Castle park (another fantastic cherry blossom spot) and evening in the vibrant Dotonbori district.' }] }],
        activities: [
          { time: '09:00', activity: 'Tea ceremony', description: 'Traditional Japanese tea experience', duration: '1.5 hours' },
          { time: '11:00', activity: 'Nishiki Market', description: 'Kyoto\'s kitchen food market', duration: '1.5 hours' },
          { time: '13:30', activity: 'Train to Osaka', description: '15 minutes by Shinkansen' },
          { time: '14:30', activity: 'Osaka Castle Park', description: 'Castle and cherry blossoms', duration: '2 hours' },
          { time: '18:00', activity: 'Dotonbori', description: 'Osaka\'s neon-lit entertainment district' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Nishiki Market grazing', dinner: 'Osaka street food' },
      },
      {
        dayNumber: 10,
        title: 'Osaka - Food Capital',
        description: [{ type: 'p', children: [{ text: 'Deep dive into Osaka\'s legendary food culture. Morning at Kuromon Market, cooking class learning to make takoyaki and okonomiyaki, and evening street food tour through the city\'s best food districts.' }] }],
        activities: [
          { time: '09:00', activity: 'Kuromon Market', description: 'Osaka\'s kitchen for 170 years', duration: '2 hours' },
          { time: '11:30', activity: 'Cooking class', description: 'Make takoyaki and okonomiyaki', duration: '3 hours' },
          { time: '15:00', activity: 'Shinsekai district', description: 'Retro neighborhood and kushikatsu' },
          { time: '18:00', activity: 'Street food tour', description: 'Guided culinary adventure', duration: '3 hours' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Cooking class creations', dinner: 'Street food tour' },
      },
      {
        dayNumber: 11,
        title: 'Osaka - Free Day',
        description: [{ type: 'p', children: [{ text: 'Free day to explore at your own pace. Options include Universal Studios Japan, day trip to Hiroshima, exploring more of Osaka, or revisiting favorite spots from the journey.' }] }],
        activities: [
          { time: 'Full day', activity: 'Free day', description: 'Universal Studios, Hiroshima day trip, or leisure' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'At leisure', dinner: 'Farewell dinner' },
      },
      {
        dayNumber: 12,
        title: 'Departure',
        description: [{ type: 'p', children: [{ text: 'Transfer to Osaka\'s Kansai International Airport for your departure flight. Sayonara Japan!' }] }],
        activities: [
          { time: 'TBC', activity: 'Airport transfer', description: 'Based on flight time' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Not included', dinner: 'Not included' },
      },
    ],
    metaTitle: 'Japan Cherry Blossom Tour 12 Days | Sakura Season Itinerary',
    metaDescription: '12-day Japan cherry blossom itinerary through Tokyo, Hakone, Kyoto, and Osaka. Experience hanami, ancient temples, and Japanese culture during sakura season.',
    metaKeywords: 'japan cherry blossom, sakura tour, japan itinerary, tokyo kyoto osaka, hanami japan',
    status: 'published' as const,
  },
  {
    title: 'Thailand Temple & Beach Escape - 8 Days',
    slug: 'thailand-temple-beach-8-days',
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Experience the best of Thailand in 8 perfectly balanced days. Begin in vibrant Bangkok with its magnificent temples and street food, journey north to cultural Chiang Mai, then unwind on the paradise beaches of Krabi. This itinerary captures Thailand\'s incredible diversity.',
          },
        ],
      },
    ],
    excerpt: 'Bangkok temples, Chiang Mai culture, and Krabi beaches - experience Thailand\'s incredible diversity in 8 perfectly balanced days.',
    duration: 8,
    difficulty: 'easy' as const,
    travelStyle: ['cultural', 'relaxation', 'adventure'],
    countrySlug: 'thailand',
    estimatedBudget: {
      min: 1200,
      max: 2000,
      currency: 'USD',
      notes: 'Includes 4-star hotels, domestic flights, guided tours, and most meals',
    },
    days: [
      {
        dayNumber: 1,
        title: 'Arrival in Bangkok',
        description: [{ type: 'p', children: [{ text: 'Welcome to Thailand! Transfer to your riverside hotel in Bangkok. Evening long-tail boat ride through the canals (klongs) of old Bangkok, followed by dinner overlooking the illuminated temples.' }] }],
        activities: [
          { time: '14:00', activity: 'Hotel check-in', description: 'Riverside hotel with temple views' },
          { time: '17:00', activity: 'Klong boat tour', description: 'Traditional long-tail boat through old Bangkok', duration: '1.5 hours' },
          { time: '19:00', activity: 'Welcome dinner', description: 'Riverside restaurant with temple views' },
        ],
        meals: { breakfast: 'Not included', lunch: 'Not included', dinner: 'Welcome dinner included' },
      },
      {
        dayNumber: 2,
        title: 'Bangkok Royal Temples',
        description: [{ type: 'p', children: [{ text: 'Full day exploring Bangkok\'s magnificent royal temples. Visit the Grand Palace with its Emerald Buddha, Wat Pho with the reclining Buddha, and cross the river to the stunning Wat Arun at sunset.' }] }],
        activities: [
          { time: '08:30', activity: 'Grand Palace', description: 'Thailand\'s most sacred site', duration: '2.5 hours' },
          { time: '11:30', activity: 'Wat Pho', description: 'Reclining Buddha and massage school', duration: '1.5 hours' },
          { time: '13:30', activity: 'Thai lunch', description: 'Classic dishes at local restaurant' },
          { time: '15:30', activity: 'Thai massage', description: 'Traditional massage at Wat Pho' },
          { time: '17:30', activity: 'Wat Arun at sunset', description: 'Temple of Dawn illumination' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Thai restaurant', dinner: 'At leisure' },
      },
      {
        dayNumber: 3,
        title: 'Bangkok to Chiang Mai',
        description: [{ type: 'p', children: [{ text: 'Morning flight to Chiang Mai, the cultural capital of Northern Thailand. Afternoon temple tour including Wat Phra Singh and Wat Chedi Luang. Evening visit to the famous Chiang Mai Night Bazaar.' }] }],
        activities: [
          { time: '08:30', activity: 'Flight to Chiang Mai', description: '1.5 hour flight' },
          { time: '11:00', activity: 'Hotel check-in', description: 'Boutique hotel in Old City' },
          { time: '14:00', activity: 'Old City temple tour', description: 'Wat Phra Singh, Wat Chedi Luang', duration: '3 hours' },
          { time: '18:00', activity: 'Night Bazaar', description: 'Shopping and street food' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Northern Thai cuisine', dinner: 'Night Bazaar street food' },
      },
      {
        dayNumber: 4,
        title: 'Chiang Mai - Doi Suthep & Elephants',
        description: [{ type: 'p', children: [{ text: 'Morning visit to the hilltop Doi Suthep temple with panoramic views. Afternoon at an ethical elephant sanctuary - meet, feed, and bathe rescued elephants (no riding). Evening khantoke dinner with traditional dance.' }] }],
        activities: [
          { time: '08:00', activity: 'Doi Suthep Temple', description: 'Sacred mountaintop temple', duration: '2 hours' },
          { time: '11:00', activity: 'Drive to elephant sanctuary', description: 'Scenic countryside journey' },
          { time: '12:30', activity: 'Ethical elephant experience', description: 'Feed, interact, and bathe elephants', duration: '4 hours' },
          { time: '19:00', activity: 'Khantoke dinner', description: 'Traditional Lanna feast with dancing' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'At elephant sanctuary', dinner: 'Khantoke dinner' },
      },
      {
        dayNumber: 5,
        title: 'Chiang Mai to Krabi',
        description: [{ type: 'p', children: [{ text: 'Morning at leisure in Chiang Mai - perhaps explore Nimmanhaemin Road\'s cafes and boutiques. Afternoon flight to Krabi and transfer to your beachfront resort.' }] }],
        activities: [
          { time: '09:00', activity: 'Nimman Road exploration', description: 'Trendy cafes and boutiques' },
          { time: '12:30', activity: 'Flight to Krabi', description: 'Via Bangkok, arriving evening' },
          { time: '18:00', activity: 'Resort check-in', description: 'Beachfront resort arrival' },
          { time: '19:30', activity: 'Beachfront dinner', description: 'Fresh seafood overlooking the sea' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Airport', dinner: 'Beach restaurant' },
      },
      {
        dayNumber: 6,
        title: 'Krabi - Four Islands Tour',
        description: [{ type: 'p', children: [{ text: 'Full day island hopping tour by longtail boat. Visit Poda Island, Chicken Island, and Tup Island, connected by a sandbar at low tide. Snorkeling, swimming, and a beachside BBQ lunch.' }] }],
        activities: [
          { time: '09:00', activity: 'Longtail boat departure', description: 'From Ao Nang beach' },
          { time: '10:00', activity: 'Poda Island', description: 'Snorkeling and beach time' },
          { time: '12:00', activity: 'Chicken Island', description: 'Named for its chicken-shaped rock' },
          { time: '13:00', activity: 'BBQ lunch', description: 'Fresh seafood on the beach' },
          { time: '14:30', activity: 'Tup Island sandbar', description: 'Walk between islands at low tide' },
          { time: '16:00', activity: 'Return to resort', description: 'Evening at leisure' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Beach BBQ', dinner: 'At leisure' },
      },
      {
        dayNumber: 7,
        title: 'Krabi - Beach Relaxation',
        description: [{ type: 'p', children: [{ text: 'Free day to relax on the beach or choose from optional activities: rock climbing, kayaking through mangroves, Thai cooking class, or visit to Tiger Cave Temple with 1,260 steps to the summit.' }] }],
        activities: [
          { time: 'Full day', activity: 'Free day', description: 'Beach relaxation or optional activities' },
          { time: '18:30', activity: 'Farewell dinner', description: 'Beachfront restaurant with sunset' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'At leisure', dinner: 'Farewell dinner' },
      },
      {
        dayNumber: 8,
        title: 'Departure',
        description: [{ type: 'p', children: [{ text: 'Final morning to enjoy the beach before transfer to Krabi airport for your departure. Khob khun krap/ka (thank you) Thailand!' }] }],
        activities: [
          { time: 'Morning', activity: 'Beach time', description: 'Last swim and relaxation' },
          { time: 'TBC', activity: 'Airport transfer', description: 'Based on flight time' },
        ],
        meals: { breakfast: 'Hotel breakfast', lunch: 'Not included', dinner: 'Not included' },
      },
    ],
    metaTitle: 'Thailand 8 Day Itinerary | Bangkok, Chiang Mai & Krabi',
    metaDescription: '8-day Thailand itinerary covering Bangkok temples, Chiang Mai culture, and Krabi beaches. The perfect introduction to Thailand.',
    metaKeywords: 'thailand itinerary, bangkok chiang mai, krabi beaches, thailand tour, thai temples',
    status: 'published' as const,
  },
];

export const seedItineraries = async (
  countriesMap: Record<string, string>,
  citiesMap: Record<string, string>,
  placeholderMediaId?: number,
): Promise<void> => {
  console.log('\n🗺️ Seeding Itineraries...');

  for (const itineraryData of itinerariesData) {
    try {
      const { countrySlug, ...restItineraryData } = itineraryData;
      const countryId = countriesMap[countrySlug];

      // Check if itinerary already exists
      const existing = await payload.find({
        collection: 'itineraries',
        where: { slug: { equals: itineraryData.slug } },
      });

      const dataWithRelations = {
        ...restItineraryData,
        countries: countryId ? [countryId] : [],
        featuredImage: placeholderMediaId,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'itineraries',
          id: existing.docs[0].id,
          data: dataWithRelations as any,
        });
        console.log(`  ✏️ Updated: ${itineraryData.title}`);
      } else {
        await payload.create({
          collection: 'itineraries',
          data: dataWithRelations as any,
        });
        console.log(`  ✅ Created: ${itineraryData.title}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${itineraryData.title}:`, error.message);
    }
  }

  console.log(`  📊 Total itineraries: ${itinerariesData.length}`);
};

// Run independently
if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    const countriesResult = await payload.find({ collection: 'countries', limit: 100 });
    const countriesMap: Record<string, string> = {};
    countriesResult.docs.forEach((country: any) => {
      countriesMap[country.slug] = country.id;
    });

    const citiesResult = await payload.find({ collection: 'cities', limit: 200 });
    const citiesMap: Record<string, string> = {};
    citiesResult.docs.forEach((city: any) => {
      citiesMap[city.slug] = city.id;
    });

    await seedItineraries(countriesMap, citiesMap);
    console.log('\n✅ Itineraries seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed itineraries:', error);
    process.exit(1);
  });
}
