import payload from 'payload';

/**
 * Attractions Seed Data - Comprehensive English Version
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/attractions.seed.ts
 */

export const attractionsData = [
  // ═══════════════════════════════════════════════════════════════════
  // VIETNAM - HANOI
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Hoan Kiem Lake',
    slug: 'hoan-kiem-lake',
    citySlug: 'hanoi',
    category: 'landmark' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Hoan Kiem Lake, also known as the Lake of the Restored Sword, is the heart of Hanoi. According to legend, Emperor Le Loi received a magical sword from the Golden Turtle God to drive out Chinese invaders, later returning it to the turtle in this lake.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The Ngoc Son Temple sits on a small island in the lake, connected to the shore by the iconic red Huc Bridge (Morning Sunlight Bridge). Early mornings see locals practicing tai chi, badminton, and traditional exercises around the lake.',
          },
        ],
      },
    ],
    excerpt: 'The legendary heart of Hanoi with Ngoc Son Temple, the iconic red Huc Bridge, and the myth of the Golden Turtle returning the sacred sword.',
    coordinates: { latitude: 21.0288, longitude: 105.8525 },
    address: 'Hoan Kiem District, Hanoi, Vietnam',
    openingHours: 'Lake area: 24/7\nNgoc Son Temple: 7:00 AM - 6:00 PM',
    ticketPrice: { adult: 30000, child: 15000, currency: 'VND' },
    tips: [
      { tip: 'Visit early morning to see locals exercising and the peaceful atmosphere' },
      { tip: 'The pedestrian-only weekend nights (Friday-Sunday) are magical' },
      { tip: 'Rent a paddle boat to see the lake from a different perspective' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },
  {
    name: 'Temple of Literature',
    slug: 'temple-of-literature',
    citySlug: 'hanoi',
    category: 'historical' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Temple of Literature (Van Mieu - Quoc Tu Giam) is Vietnam\'s first national university, founded in 1070 to honor Confucius and educate Vietnam\'s elite. For over 700 years, it was the center of Vietnam\'s education system.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The 82 stone stelae standing on turtle backs list the names of doctoral graduates, now recognized as UNESCO Memory of the World. The complex features five courtyards with traditional Vietnamese architecture and peaceful gardens.',
          },
        ],
      },
    ],
    excerpt: 'Vietnam\'s first university and a masterpiece of traditional architecture, featuring 82 UNESCO-recognized doctor\'s stelae on turtle backs.',
    coordinates: { latitude: 21.0285, longitude: 105.8355 },
    address: '58 Quoc Tu Giam Street, Dong Da District, Hanoi',
    openingHours: 'Daily: 8:00 AM - 5:00 PM\nSummer: 7:30 AM - 6:00 PM',
    ticketPrice: { adult: 30000, child: 15000, currency: 'VND' },
    tips: [
      { tip: 'Touch the turtle heads for good luck in education' },
      { tip: 'Wear traditional ao dai for beautiful graduation photos' },
      { tip: 'Hire a guide to understand the deep historical significance' },
    ],
    rating: 4.6,
    status: 'published' as const,
  },
  {
    name: 'Ho Chi Minh Mausoleum',
    slug: 'ho-chi-minh-mausoleum',
    citySlug: 'hanoi',
    category: 'historical' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Ho Chi Minh Mausoleum is the final resting place of Vietnam\'s beloved revolutionary leader. The imposing granite structure in Ba Dinh Square is where Ho Chi Minh declared independence in 1945. Despite his wish for cremation, his preserved body lies in state.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The surrounding complex includes the Presidential Palace, Ho Chi Minh\'s stilt house, the One Pillar Pagoda, and a museum. The changing of the guard ceremony is a solemn and impressive sight.',
          },
        ],
      },
    ],
    excerpt: 'The final resting place of Vietnam\'s founding father, set in historic Ba Dinh Square where independence was declared in 1945.',
    coordinates: { latitude: 21.0369, longitude: 105.8353 },
    address: 'Ba Dinh Square, Ba Dinh District, Hanoi',
    openingHours: 'Tuesday-Thursday: 7:30 AM - 10:30 AM\nSaturday-Sunday: 7:30 AM - 11:00 AM\nClosed Monday, Friday',
    ticketPrice: { adult: 0, child: 0, currency: 'VND' },
    tips: [
      { tip: 'Dress conservatively - no shorts, sleeveless shirts, or revealing clothing' },
      { tip: 'No cameras, bags, or phones inside the mausoleum' },
      { tip: 'The mausoleum closes annually October-November for maintenance' },
    ],
    rating: 4.5,
    status: 'published' as const,
  },
  {
    name: 'Hanoi Old Quarter',
    slug: 'hanoi-old-quarter',
    citySlug: 'hanoi',
    category: 'historical' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Hanoi\'s Old Quarter, known as the "36 Streets," dates back nearly 1,000 years. Each street was traditionally dedicated to a specific trade - Hang Bac (Silver), Hang Dao (Silk), Hang Gai (Hemp) - creating a fascinating living museum of Vietnamese commerce and culture.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The narrow streets burst with activity: street food vendors, traditional shops, tube houses, and small temples. Weekend pedestrian zones transform the area into a vibrant open-air market with performances, food stalls, and local entertainment.',
          },
        ],
      },
    ],
    excerpt: 'Nearly 1,000-year-old quarter of 36 ancient trade streets, legendary street food, and the living heart of traditional Hanoi.',
    coordinates: { latitude: 21.0333, longitude: 105.8508 },
    address: 'Hoan Kiem District, Hanoi',
    openingHours: '24/7 (Weekend walking streets: Friday evening to Sunday night)',
    ticketPrice: { adult: 0, child: 0, currency: 'VND' },
    tips: [
      { tip: 'Best explored on foot - get lost intentionally' },
      { tip: 'Street food is safe at busy stalls - follow the locals' },
      { tip: 'Visit Dong Xuan Market for wholesale goods and local atmosphere' },
    ],
    rating: 4.8,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // VIETNAM - HOI AN
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Japanese Covered Bridge',
    slug: 'japanese-covered-bridge',
    citySlug: 'hoi-an',
    category: 'historical' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Japanese Covered Bridge (Cau Nhat Ban) is Hoi An\'s most iconic symbol, built by Japanese merchants in the late 16th century to connect the Japanese and Chinese quarters. The bridge features a small temple dedicated to the Taoist god Tran Vo Bac De.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Carved wooden statues of dogs on one end and monkeys on the other mark the years construction began and ended. The bridge beautifully illuminates at night when Hoi An\'s famous lanterns glow throughout the ancient town.',
          },
        ],
      },
    ],
    excerpt: 'Hoi An\'s 16th-century icon connecting ancient Japanese and Chinese quarters, featuring a small temple and elaborate wooden carvings.',
    coordinates: { latitude: 15.8779, longitude: 108.3263 },
    address: 'Tran Phu Street, Hoi An Ancient Town',
    openingHours: '24/7 (best viewed at night)',
    ticketPrice: { adult: 120000, child: 0, currency: 'VND' },
    tips: [
      { tip: 'Visit at night when lanterns illuminate the ancient town' },
      { tip: 'The ticket covers 5 attractions in the Ancient Town' },
      { tip: 'Best photos are from across the river at night' },
    ],
    rating: 4.6,
    status: 'published' as const,
  },
  {
    name: 'An Bang Beach',
    slug: 'an-bang-beach',
    citySlug: 'hoi-an',
    category: 'beach' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'An Bang Beach is considered one of Vietnam\'s finest beaches, offering golden sand, crystal-clear waters, and a laid-back atmosphere just 4 kilometers from Hoi An Ancient Town. The beach strikes a perfect balance between development and natural beauty.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beach clubs and restaurants line the shore, offering sunbeds, cocktails, and excellent seafood. The swimming is safe and gentle, making it perfect for families. Sunrise over the East Sea is particularly spectacular.',
          },
        ],
      },
    ],
    excerpt: 'One of Vietnam\'s most beautiful beaches with golden sand, calm waters, beachfront restaurants, and easy access from Hoi An.',
    coordinates: { latitude: 15.9080, longitude: 108.3622 },
    address: 'An Bang, Cam An, Hoi An',
    openingHours: '24/7',
    ticketPrice: { adult: 0, child: 0, currency: 'VND' },
    tips: [
      { tip: 'Rent a bicycle from Hoi An - it\'s a pleasant 15-minute ride' },
      { tip: 'Bring cash as some beach bars don\'t accept cards' },
      { tip: 'Best swimming is early morning before afternoon winds' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // JAPAN - TOKYO
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Senso-ji Temple',
    slug: 'sensoji-temple',
    citySlug: 'tokyo',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Senso-ji is Tokyo\'s oldest and most significant Buddhist temple, founded in 645 AD. The iconic Kaminarimon (Thunder Gate) with its massive red lantern leads to Nakamise Street, lined with traditional shops selling souvenirs and street food.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The main hall houses a golden image of Kannon, the goddess of mercy. Visitors can participate in traditional rituals: drawing fortune slips (omikuji), burning incense, and washing hands at the purification fountain.',
          },
        ],
      },
    ],
    excerpt: 'Tokyo\'s oldest temple with the iconic Thunder Gate, vibrant Nakamise shopping street, and 1,400 years of Buddhist history.',
    coordinates: { latitude: 35.7148, longitude: 139.7967 },
    address: '2 Chome-3-1 Asakusa, Taito City, Tokyo',
    openingHours: 'Temple: 6:00 AM - 5:00 PM\nNakamise: 9:00 AM - 7:00 PM',
    ticketPrice: { adult: 0, child: 0, currency: 'JPY' },
    tips: [
      { tip: 'Visit at dawn for a peaceful experience without crowds' },
      { tip: 'Try traditional snacks on Nakamise Street - melon pan and ningyo-yaki' },
      { tip: 'The illuminated temple at night is spectacular' },
    ],
    rating: 4.8,
    status: 'published' as const,
  },
  {
    name: 'Shibuya Crossing',
    slug: 'shibuya-crossing',
    citySlug: 'tokyo',
    category: 'landmark' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Shibuya Crossing is the world\'s busiest pedestrian intersection, where up to 3,000 people cross simultaneously when the lights change. This iconic scramble crossing epitomizes Tokyo\'s organized chaos and has become a symbol of modern Japan.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The surrounding area is Tokyo\'s youth culture hub, featuring department stores, fashion boutiques, and entertainment venues. The nearby statue of Hachiko, the loyal dog, is a popular meeting point and symbol of devotion.',
          },
        ],
      },
    ],
    excerpt: 'The world\'s busiest intersection where thousands cross simultaneously, symbolizing Tokyo\'s electrifying energy and organized efficiency.',
    coordinates: { latitude: 35.6595, longitude: 139.7004 },
    address: 'Shibuya Station, Shibuya City, Tokyo',
    openingHours: '24/7 (busiest during rush hours and evenings)',
    ticketPrice: { adult: 0, child: 0, currency: 'JPY' },
    tips: [
      { tip: 'View from above at Shibuya Sky or Starbucks on 2nd floor' },
      { tip: 'Cross during the scramble for the full experience' },
      { tip: 'Best viewed at night with all the neon lights' },
    ],
    rating: 4.6,
    status: 'published' as const,
  },
  {
    name: 'Meiji Shrine',
    slug: 'meiji-shrine',
    citySlug: 'tokyo',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Meiji Shrine is Tokyo\'s most important Shinto shrine, dedicated to Emperor Meiji and Empress Shoken. Set within a 170-acre forest of 120,000 trees, the shrine offers a serene escape from the surrounding Harajuku and Shibuya districts.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The shrine\'s torii gates, made from 1,500-year-old cypress trees, mark the transition from secular to sacred space. Traditional Shinto weddings frequently take place here, offering glimpses of Japanese ceremonial traditions.',
          },
        ],
      },
    ],
    excerpt: 'Tokyo\'s most sacred Shinto shrine surrounded by a tranquil forest, dedicated to Emperor Meiji in the heart of busy Harajuku.',
    coordinates: { latitude: 35.6764, longitude: 139.6993 },
    address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo',
    openingHours: 'Sunrise to Sunset (approximately 5:00 AM - 6:00 PM)',
    ticketPrice: { adult: 0, child: 0, currency: 'JPY' },
    tips: [
      { tip: 'Write wishes on wooden ema plaques at the shrine' },
      { tip: 'Walk through the entire forest path for full experience' },
      { tip: 'New Year\'s visit (Hatsumode) is extremely crowded but memorable' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // JAPAN - KYOTO
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Fushimi Inari Shrine',
    slug: 'fushimi-inari-shrine',
    citySlug: 'kyoto',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Fushimi Inari Shrine is the head shrine of Inari, the Shinto god of rice and prosperity. Famous for its thousands of vermillion torii gates winding up the mountainside, creating an otherworldly tunnel of color that has become Japan\'s most iconic shrine image.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The shrine trail stretches 4 kilometers up Mount Inari, passing smaller shrines, mysterious fox statues (Inari\'s messengers), and offering spots. The full hike takes 2-3 hours and rewards with panoramic views of Kyoto.',
          },
        ],
      },
    ],
    excerpt: 'Japan\'s most famous shrine with thousands of vermillion torii gates creating an mystical tunnel up Mount Inari.',
    coordinates: { latitude: 34.9671, longitude: 135.7727 },
    address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
    openingHours: '24/7 (best at dawn or dusk)',
    ticketPrice: { adult: 0, child: 0, currency: 'JPY' },
    tips: [
      { tip: 'Visit at dawn to avoid crowds and capture empty torii gates' },
      { tip: 'The full hike takes 2-3 hours - bring water' },
      { tip: 'Night visits are atmospheric but bring a flashlight' },
    ],
    rating: 4.9,
    status: 'published' as const,
  },
  {
    name: 'Kinkaku-ji (Golden Pavilion)',
    slug: 'kinkakuji-golden-pavilion',
    citySlug: 'kyoto',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Kinkaku-ji, the Golden Pavilion, is a Zen Buddhist temple covered in gold leaf that reflects magnificently in the surrounding mirror pond. Originally built as a retirement villa for a shogun, it became a temple after his death in 1408.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The three-story structure represents different architectural styles: the ground floor in aristocratic style, the second in samurai style, and the top in Zen style. The surrounding gardens are a masterpiece of Japanese landscape design.',
          },
        ],
      },
    ],
    excerpt: 'Kyoto\'s iconic gold-leaf covered Zen temple reflecting perfectly in its mirror pond, representing the height of Japanese aesthetics.',
    coordinates: { latitude: 35.0394, longitude: 135.7292 },
    address: '1 Kinkakujicho, Kita Ward, Kyoto',
    openingHours: '9:00 AM - 5:00 PM daily',
    ticketPrice: { adult: 400, child: 300, currency: 'JPY' },
    tips: [
      { tip: 'Best photos are in the morning with soft light' },
      { tip: 'Visit in winter for possible snow on the golden roof' },
      { tip: 'The garden path is one-way - take your time' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },
  {
    name: 'Arashiyama Bamboo Grove',
    slug: 'arashiyama-bamboo-grove',
    citySlug: 'kyoto',
    category: 'nature' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Arashiyama Bamboo Grove is one of Kyoto\'s most photographed sites, where towering bamboo stalks create an ethereal atmosphere. Walking through the grove, visitors are surrounded by the gentle sound of bamboo swaying in the wind.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The grove connects to Tenryu-ji Temple (UNESCO World Heritage) and the scenic Togetsu-kyo Bridge. The surrounding Arashiyama district offers monkey parks, boat rides, traditional restaurants, and the famous Sagano Romantic Train.',
          },
        ],
      },
    ],
    excerpt: 'Ethereal pathway through towering bamboo creating Kyoto\'s most magical natural landscape, inspiring artists and poets for centuries.',
    coordinates: { latitude: 35.0094, longitude: 135.6722 },
    address: 'Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto',
    openingHours: '24/7 (best at dawn)',
    ticketPrice: { adult: 0, child: 0, currency: 'JPY' },
    tips: [
      { tip: 'Arrive before 7 AM to have the grove to yourself' },
      { tip: 'Continue to Okochi-Sanso Villa for stunning gardens' },
      { tip: 'Rent a bicycle in Arashiyama to explore the area' },
    ],
    rating: 4.8,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // THAILAND - BANGKOK
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Grand Palace',
    slug: 'grand-palace-bangkok',
    citySlug: 'bangkok',
    category: 'landmark' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Grand Palace is Thailand\'s most sacred site, serving as the official residence of the Kings of Siam since 1782. The complex includes the Temple of the Emerald Buddha (Wat Phra Kaew), housing Thailand\'s most revered Buddha image.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The architectural extravagance combines traditional Thai styles with European influences. Every surface glitters with gold, glass mosaics, and colorful tiles. The intricate murals depict the Ramakien, Thailand\'s national epic.',
          },
        ],
      },
    ],
    excerpt: 'Thailand\'s most sacred site housing the Emerald Buddha, a dazzling complex of temples, halls, and pavilions since 1782.',
    coordinates: { latitude: 13.7500, longitude: 100.4914 },
    address: 'Na Phra Lan Road, Phra Nakhon, Bangkok',
    openingHours: 'Daily: 8:30 AM - 3:30 PM',
    ticketPrice: { adult: 500, child: 0, currency: 'THB' },
    tips: [
      { tip: 'Dress code enforced - cover shoulders and knees (rentals available)' },
      { tip: 'Arrive at 8:30 AM opening to avoid the worst crowds' },
      { tip: 'Beware of scams - the palace is never closed for special ceremonies' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },
  {
    name: 'Wat Pho',
    slug: 'wat-pho',
    citySlug: 'bangkok',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Wat Pho is Bangkok\'s oldest and largest temple complex, famous for its 46-meter long Reclining Buddha covered in gold leaf. The temple predates Bangkok itself and is considered the birthplace of traditional Thai massage.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond the reclining Buddha, Wat Pho houses over 1,000 Buddha images, beautiful chedis, and a renowned massage school. Stone statues of Chinese warriors guard the gates, and colorful tiles adorn the towering stupas.',
          },
        ],
      },
    ],
    excerpt: 'Home of the magnificent 46-meter Reclining Buddha and birthplace of traditional Thai massage, Bangkok\'s oldest and largest temple.',
    coordinates: { latitude: 13.7465, longitude: 100.4930 },
    address: '2 Sanam Chai Road, Phra Nakhon, Bangkok',
    openingHours: 'Daily: 8:30 AM - 6:30 PM',
    ticketPrice: { adult: 200, child: 0, currency: 'THB' },
    tips: [
      { tip: 'Get a traditional Thai massage at the temple school' },
      { tip: 'Drop coins in the 108 bronze bowls for good luck' },
      { tip: 'Less crowded than Grand Palace - combine both visits' },
    ],
    rating: 4.8,
    status: 'published' as const,
  },
  {
    name: 'Chatuchak Weekend Market',
    slug: 'chatuchak-weekend-market',
    citySlug: 'bangkok',
    category: 'shopping' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Chatuchak is one of the world\'s largest outdoor markets, covering 35 acres with over 15,000 stalls and 200,000 visitors each weekend. From vintage clothing and handmade crafts to antiques and exotic plants, the market sells virtually everything.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The market is organized into 27 sections by product type, though the maze of stalls still creates delightful confusion. Food vendors offer Thai favorites from pad thai to coconut ice cream, providing fuel for hours of browsing.',
          },
        ],
      },
    ],
    excerpt: 'One of the world\'s largest outdoor markets with 15,000+ stalls selling everything from vintage treasures to handmade crafts.',
    coordinates: { latitude: 13.7999, longitude: 100.5504 },
    address: 'Chatuchak, Bangkok',
    openingHours: 'Saturday-Sunday: 9:00 AM - 6:00 PM',
    ticketPrice: { adult: 0, child: 0, currency: 'THB' },
    tips: [
      { tip: 'Arrive early (9-10 AM) to beat the crowds and heat' },
      { tip: 'Bring cash - not all vendors accept cards' },
      { tip: 'Download a map - it\'s easy to get lost' },
    ],
    rating: 4.6,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // INDONESIA - BALI
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Tanah Lot Temple',
    slug: 'tanah-lot-temple',
    citySlug: 'bali',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Tanah Lot is one of Bali\'s most iconic sea temples, perched dramatically on a rocky outcrop just offshore. The 16th-century Hindu temple is dedicated to the sea gods and is believed to guard Bali from evil sea spirits.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'At high tide, the temple appears to float on the sea. At low tide, visitors can walk to the base of the rock. The site is most spectacular at sunset when the temple is silhouetted against brilliant orange skies.',
          },
        ],
      },
    ],
    excerpt: 'Bali\'s most photographed temple perched dramatically on a rock in the sea, spectacular at sunset with silhouettes against orange skies.',
    coordinates: { latitude: -8.6212, longitude: 115.0868 },
    address: 'Beraban, Kediri, Tabanan Regency, Bali',
    openingHours: 'Daily: 7:00 AM - 7:00 PM',
    ticketPrice: { adult: 60000, child: 30000, currency: 'IDR' },
    tips: [
      { tip: 'Arrive 1 hour before sunset for best photos' },
      { tip: 'Visit the holy snake cave at the base of the rock' },
      { tip: 'Crowds are huge at sunset - arrive early for good spots' },
    ],
    rating: 4.5,
    status: 'published' as const,
  },
  {
    name: 'Tegalalang Rice Terraces',
    slug: 'tegalalang-rice-terraces',
    citySlug: 'bali',
    category: 'nature' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Tegalalang Rice Terraces showcase Bali\'s ancient subak irrigation system, a UNESCO-recognized tradition of cooperative water management. The dramatic terraces cascade down a steep valley, creating one of Bali\'s most iconic landscapes.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Walking paths wind through the terraces, with cafes and swing attractions offering picture-perfect viewpoints. The terraces remain an active agricultural site, with farmers planting and harvesting throughout the year.',
          },
        ],
      },
    ],
    excerpt: 'Bali\'s most famous rice terraces showcasing centuries-old irrigation traditions, dramatically cascading down a verdant valley.',
    coordinates: { latitude: -8.4312, longitude: 115.2792 },
    address: 'Tegalalang, Gianyar Regency, Bali',
    openingHours: 'Daily: 7:00 AM - 6:00 PM',
    ticketPrice: { adult: 15000, child: 0, currency: 'IDR' },
    tips: [
      { tip: 'Visit early morning (8-9 AM) for best light and fewer crowds' },
      { tip: 'Wear comfortable shoes - paths can be slippery' },
      { tip: 'Small donations expected when walking through farmer\'s fields' },
    ],
    rating: 4.6,
    status: 'published' as const,
  },
  {
    name: 'Uluwatu Temple',
    slug: 'uluwatu-temple',
    citySlug: 'bali',
    category: 'religious-site' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Uluwatu Temple sits dramatically on a 70-meter clifftop overlooking the Indian Ocean, one of six key temples protecting Bali from evil spirits. The ancient temple dates back to the 11th century and is considered one of Bali\'s most spiritual places.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The temple is famous for its nightly Kecak fire dance performances at sunset, where dozens of male performers chant and move in hypnotic unison. Mischievous monkeys roam the temple grounds - secure your belongings!',
          },
        ],
      },
    ],
    excerpt: 'Dramatic clifftop temple 70 meters above the ocean, famous for stunning sunsets and mesmerizing Kecak fire dance performances.',
    coordinates: { latitude: -8.8294, longitude: 115.0849 },
    address: 'Pecatu, South Kuta, Badung Regency, Bali',
    openingHours: 'Daily: 7:00 AM - 7:00 PM\nKecak Dance: 6:00 PM - 7:00 PM',
    ticketPrice: { adult: 50000, child: 25000, currency: 'IDR' },
    tips: [
      { tip: 'Book Kecak dance tickets in advance during peak season' },
      { tip: 'Watch out for monkeys - they grab sunglasses and phones!' },
      { tip: 'Sarongs required - rentals available at entrance' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // CAMBODIA - SIEM REAP
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Angkor Wat',
    slug: 'angkor-wat',
    citySlug: 'siem-reap',
    category: 'historical' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Angkor Wat is the world\'s largest religious monument and the crown jewel of the Khmer Empire. Built in the 12th century as a Hindu temple dedicated to Vishnu, it later transformed into a Buddhist temple and remains an active place of worship today.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The temple complex covers 402 acres with intricate bas-reliefs, towering lotus-shaped towers, and galleries that chronicle Hindu mythology and Khmer history. The sunrise over Angkor Wat\'s iconic silhouette is one of the world\'s most photographed moments.',
          },
        ],
      },
    ],
    excerpt: 'The world\'s largest religious monument and masterpiece of Khmer architecture, its sunrise silhouette one of Earth\'s most iconic images.',
    coordinates: { latitude: 13.4125, longitude: 103.8670 },
    address: 'Angkor Archaeological Park, Siem Reap',
    openingHours: 'Daily: 5:00 AM - 6:00 PM',
    ticketPrice: { adult: 37, child: 0, currency: 'USD' },
    tips: [
      { tip: 'Buy a 3-day pass ($62) to explore without rushing' },
      { tip: 'For sunrise, arrive by 5:00 AM to secure a good spot' },
      { tip: 'Hire a knowledgeable guide for historical context' },
    ],
    rating: 4.9,
    status: 'published' as const,
  },
  {
    name: 'Ta Prohm',
    slug: 'ta-prohm',
    citySlug: 'siem-reap',
    category: 'historical' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'Ta Prohm is the atmospheric temple famously overrun by jungle, where massive silk-cotton and strangler fig trees wrap their roots around ancient stones. The temple was intentionally left in this state to show the power of nature over human creation.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Made famous as the "Tomb Raider Temple" from the Angelina Jolie film, Ta Prohm creates an otherworldly atmosphere where forest and ruins merge. Originally a Buddhist monastery, it once housed over 12,000 people.',
          },
        ],
      },
    ],
    excerpt: 'The atmospheric "Tomb Raider Temple" where ancient stones and jungle trees merge in an eternal embrace.',
    coordinates: { latitude: 13.4350, longitude: 103.8894 },
    address: 'Angkor Archaeological Park, Siem Reap',
    openingHours: 'Daily: 7:30 AM - 5:30 PM',
    ticketPrice: { adult: 37, child: 0, currency: 'USD' },
    tips: [
      { tip: 'Visit early morning or late afternoon for best photos' },
      { tip: 'Look for the famous "dinosaur" carving on a doorway' },
      { tip: 'The roots are fragile - don\'t climb on them' },
    ],
    rating: 4.8,
    status: 'published' as const,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FRANCE - PARIS
  // ═══════════════════════════════════════════════════════════════════
  {
    name: 'Eiffel Tower',
    slug: 'eiffel-tower',
    citySlug: 'paris',
    category: 'landmark' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Eiffel Tower is the world\'s most visited paid monument, the symbol of Paris and of France itself. Built for the 1889 World\'s Fair, the 324-meter iron lattice structure was initially controversial but became beloved over time.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Visitors can ascend by elevator or stairs to three levels, each offering unique perspectives of Paris. The tower sparkles with 20,000 light bulbs every hour after dark, creating a magical display visible across the city.',
          },
        ],
      },
    ],
    excerpt: 'The world\'s most iconic landmark, a 324-meter iron marvel offering breathtaking Paris views and nightly sparkle performances.',
    coordinates: { latitude: 48.8584, longitude: 2.2945 },
    address: 'Champ de Mars, 5 Avenue Anatole France, Paris',
    openingHours: 'Daily: 9:30 AM - 11:45 PM (summer)\nStairs: 9:30 AM - 6:30 PM',
    ticketPrice: { adult: 26, child: 13, currency: 'EUR' },
    tips: [
      { tip: 'Book tickets online weeks in advance, especially for summit' },
      { tip: 'Sunset visits offer daytime and night views in one visit' },
      { tip: 'The stairs to the 2nd floor are cheaper and a unique experience' },
    ],
    rating: 4.7,
    status: 'published' as const,
  },
  {
    name: 'Louvre Museum',
    slug: 'louvre-museum',
    citySlug: 'paris',
    category: 'museum' as const,
    description: [
      {
        type: 'p',
        children: [
          {
            text: 'The Louvre is the world\'s largest art museum and a historic monument in Paris. Housing over 38,000 objects from prehistory to the 21st century, it would take 100 days to spend 30 seconds with each piece.',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Beyond the Mona Lisa and Venus de Milo, the museum offers endless discoveries across its eight departments. The iconic glass pyramid entrance, designed by I.M. Pei, has become a symbol of the museum itself.',
          },
        ],
      },
    ],
    excerpt: 'The world\'s largest art museum housing 38,000 objects including the Mona Lisa, in a magnificent former royal palace.',
    coordinates: { latitude: 48.8606, longitude: 2.3376 },
    address: 'Rue de Rivoli, Paris',
    openingHours: 'Wed-Mon: 9:00 AM - 6:00 PM\nFri: 9:00 AM - 9:45 PM\nClosed Tuesdays',
    ticketPrice: { adult: 17, child: 0, currency: 'EUR' },
    tips: [
      { tip: 'Enter through the underground Carrousel entrance to skip lines' },
      { tip: 'Free on first Saturday evenings 6-9:45 PM' },
      { tip: 'Download the museum app for self-guided tours' },
    ],
    rating: 4.8,
    status: 'published' as const,
  },
];

export const seedAttractions = async (
  citiesMap: Record<string, string>,
  placeholderMediaId?: number,
): Promise<void> => {
  console.log('\n🏛️ Seeding Attractions...');

  for (const attractionData of attractionsData) {
    try {
      const { citySlug, ...restAttractionData } = attractionData;
      const cityId = citiesMap[citySlug];

      if (!cityId) {
        console.log(`  ⚠️ City not found for ${attractionData.name} (${citySlug})`);
        continue;
      }

      // Check if attraction already exists
      const existing = await payload.find({
        collection: 'attractions',
        where: { slug: { equals: attractionData.slug } },
      });

      const dataWithRelations = {
        ...restAttractionData,
        city: cityId,
        featuredImage: placeholderMediaId,
      };

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'attractions',
          id: existing.docs[0].id,
          data: dataWithRelations as any,
        });
        console.log(`  ✏️ Updated: ${attractionData.name}`);
      } else {
        await payload.create({
          collection: 'attractions',
          data: dataWithRelations as any,
        });
        console.log(`  ✅ Created: ${attractionData.name}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${attractionData.name}:`, error.message);
    }
  }

  console.log(`  📊 Total attractions: ${attractionsData.length}`);
};

// Run independently
if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    // Build cities map
    const citiesResult = await payload.find({ collection: 'cities', limit: 200 });
    const citiesMap: Record<string, string> = {};
    citiesResult.docs.forEach((city: any) => {
      citiesMap[city.slug] = city.id;
    });

    await seedAttractions(citiesMap);
    console.log('\n✅ Attractions seeding complete!');
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed attractions:', error);
    process.exit(1);
  });
}
