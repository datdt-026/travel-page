import payload from 'payload';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

/**
 * Editorial Itineraries Seed
 * 
 * Creates sample itineraries with the new editorial presentation mode
 * featuring story-driven chapters, experience blocks, and rich narratives.
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/editorial-itineraries.ts
 */

const seedEditorialItineraries = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me-in-production',
    local: true,
  });

  console.log('🌱 Seeding Editorial Itineraries...\n');

  try {
    // Get existing data
    const [mediaResult, citiesResult, countriesResult] = await Promise.all([
      payload.find({ collection: 'media', limit: 1 }),
      payload.find({ collection: 'cities', limit: 100 }),
      payload.find({ collection: 'countries', limit: 100 }),
    ]);

    const defaultMedia = mediaResult.docs[0];
    const citiesMap: Record<string, string> = {};
    const countriesMap: Record<string, string> = {};

    citiesResult.docs.forEach((city: any) => {
      citiesMap[city.slug] = city.id;
    });

    countriesResult.docs.forEach((country: any) => {
      countriesMap[country.slug] = country.id;
    });

    if (!defaultMedia) {
      console.log('⚠️ No media found. Please run main seed first.');
      process.exit(1);
    }

    // ═══════════════════════════════════════════════════════════════════
    // EDITORIAL ITINERARY 1: VIETNAM JOURNEY
    // ═══════════════════════════════════════════════════════════════════
    const vietnamEditorial = {
      title: 'Vietnam: A Journey Through Time and Taste',
      slug: 'vietnam-editorial-journey',
      description: [{ 
        type: 'p', 
        children: [{ 
          text: 'From the mist-shrouded limestone karsts of the north to the vibrant energy of the south, this is not merely a trip through Vietnam—it is an immersion into a land where ancient traditions dance with modern ambitions, where every bowl of pho tells a story, and where the rhythm of life flows as gently as the Mekong itself.' 
        }] 
      }],
      excerpt: 'An editorial journey through Vietnam\'s soul—from Hanoi\'s ancient quarters to Ho Chi Minh\'s bustling streets, discovering culinary traditions and timeless landscapes.',
      featuredImage: defaultMedia.id,
      duration: 14,
      countries: [countriesMap['vietnam']].filter(Boolean),
      cities: [citiesMap['hanoi'], citiesMap['hoi-an'], citiesMap['ho-chi-minh-city']].filter(Boolean),
      difficulty: 'moderate' as const,
      travelStyle: ['cultural', 'foodie', 'adventure'],
      estimatedBudget: {
        min: 2000,
        max: 4000,
        currency: 'USD',
        notes: 'Includes boutique accommodations, internal flights, and culinary experiences',
      },
      presentationMode: 'editorial' as const,
      editorialSections: [
        // INTRODUCTION
        {
          blockType: 'intro',
          enabled: true,
          headline: 'Where Ancient Meets Eternal',
          leadParagraph: [{ 
            type: 'p', 
            children: [{ 
              text: 'There is a particular quality of light in Vietnam that photographers chase but never quite capture. It hangs in the morning mist over rice paddies, filters through the bamboo blinds of ancient pagodas, and dances across the faces of grandmothers selling herbs at dawn markets. This is a country that reveals itself slowly, in layers—much like the complex flavors of its legendary cuisine.' 
            }] 
          }],
          openingQuote: 'Vietnam is not a destination. It is a conversation with history, a meditation on resilience, and an awakening of the senses.',
          journeyHighlights: [
            { highlight: 'Dawn coffee rituals in Hanoi\'s Old Quarter' },
            { highlight: 'Overnight cruise through Ha Long Bay\'s limestone cathedrals' },
            { highlight: 'Lantern-lit evenings in Hoi An\'s ancient streets' },
            { highlight: 'Mekong Delta floating markets at sunrise' },
            { highlight: 'Street food odyssey through Ho Chi Minh City' },
          ],
        },
        // CHAPTER 1: HANOI
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 1,
          chapterLabel: 'Chapter One',
          chapterTitle: 'The Quiet Poetry of Hanoi',
          chapterSubtitle: 'Where time moves at the pace of dripping coffee',
          // Soft schedule layer - new fields
          dayNumber: 1,
          timeHint: 'Arrival & first explorations',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_21_9',
          narrative: [
            { type: 'p', children: [{ text: 'Hanoi wakes before the sun. In the blue-gray hours of early morning, when the city\'s lakes are still mirrors and the French colonial buildings stand silent as sleeping giants, something magical stirs in the Old Quarter. The clatter of tiny plastic stools being set out on pavements. The hiss of charcoal braziers coming to life. The first aromatic wisps of pho broth that has simmered through the night.' }] },
            { type: 'p', children: [{ text: 'To understand Vietnam, one must first understand its mornings. And to understand Hanoi\'s mornings, one must surrender to them completely—joining the elderly practitioners of tai chi by Hoan Kiem Lake, or perching on a child-sized stool with a bowl of bun cha as motorbikes swirl past like schools of fish.' }] },
          ],
          pullQuote: 'In Hanoi, breakfast is not a meal. It is a philosophy.',
          location: {
            city: citiesMap['hanoi'],
          },
          moments: [
            { time: 'dawn', moment: 'Witness tai chi by Hoan Kiem Lake as lotus flowers open' },
            { time: 'morning', moment: 'Coffee ritual at a century-old café in the Old Quarter' },
            { time: 'afternoon', moment: 'Wander the 36 ancient guild streets, each with its own trade' },
            { time: 'evening', moment: 'Water puppet theater—a tradition dating back 1,000 years' },
          ],
        },
        // EXPERIENCE: PHO
        {
          blockType: 'experience',
          enabled: true,
          experienceType: 'culinary',
          title: 'The Art of Pho',
          introduction: 'More than soup. A national treasure.',
          experiences: [
            {
              title: 'Dawn Pho in the Old Quarter',
              description: [
                { type: 'p', children: [{ text: 'At 5:30 AM, a line has already formed outside a nondescript shophouse in the Old Quarter. Inside, a woman in her seventies tends a cauldron of broth that has been simmering for twelve hours. The recipe has not changed in four generations. She will serve exactly 200 bowls today, as she has every day for the past 40 years. When they are gone, she will close, whether it is 9 AM or noon.' }] },
                { type: 'p', children: [{ text: 'Each bowl is a study in balance: the star anise and cinnamon warming but not cloying, the beef sliced so thin it cooks in the broth\'s heat, the herbs so fresh they taste of the earth that morning. This is pho as it was meant to be—not a meal to be consumed, but an experience to be savored.' }] },
              ],
              image: defaultMedia.id,
              atmosphere: 'The steam carries whispers of star anise and charred ginger',
              location: 'Hanoi Old Quarter',
            },
          ],
        },
        // INTERLUDE
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'quote',
          quote: 'The Vietnamese do not travel to escape life, but for life not to escape them.',
          quoteAttribution: 'Anonymous traveler, 1920s',
        },
        // CHAPTER 2: HA LONG BAY
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 2,
          chapterLabel: 'Chapter Two',
          chapterTitle: 'Stone Dragons Rising',
          chapterSubtitle: 'Ha Long Bay and the landscape of dreams',
          // Soft schedule layer - multi-day chapter
          dayRangeStart: 3,
          dayRangeEnd: 4,
          timeHint: 'Overnight cruise experience',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'background',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'Legend tells that the gods sent a family of dragons to protect Vietnam from invaders. As the dragons descended, they spat jewels and jade, which turned into the thousands of islands and islets that dot the bay, creating a natural fortress. The dragons were so enchanted by this peaceful bay that they decided to remain, their descendants still living beneath the emerald waters.' }] },
            { type: 'p', children: [{ text: 'Science has a different story—165 million years of geological poetry, of limestone and time and the patient work of water. But standing on the deck of a wooden junk at sunset, watching the karsts turn gold then purple then silver in the fading light, the dragon legend seems far more plausible.' }] },
          ],
          pullQuote: 'In the silence between limestone towers, the only sounds are water against wood and the cry of sea eagles.',
        },
        // CHAPTER 3: HOI AN
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 3,
          chapterLabel: 'Chapter Three',
          chapterTitle: 'The Town That Time Preserved',
          chapterSubtitle: 'Hoi An\'s lantern-lit reverie',
          // Soft schedule layer - multi-day chapter
          dayRangeStart: 6,
          dayRangeEnd: 8,
          timeHint: 'Full immersion in ancient streets',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'left',
          imageAspectRatio: 'ratio_4_3',
          narrative: [
            { type: 'p', children: [{ text: 'Once the greatest port in Southeast Asia, Hoi An attracted traders from China, Japan, India, and beyond. When the river silted up and trade moved to Da Nang, this town simply... paused. For two centuries, it remained a living museum, its merchant houses and assembly halls preserved by benign neglect.' }] },
            { type: 'p', children: [{ text: 'Today, walking through the Ancient Town is to walk through layers of history. Japanese architecture blends with Chinese temples and French colonial shophouses. Tailors work in buildings where silk traders once bargained. And when night falls and the lanterns are lit—hundreds of them, in every color imaginable—the town transforms into something between dream and memory.' }] },
          ],
          location: {
            city: citiesMap['hoi-an'],
          },
          moments: [
            { time: 'morning', moment: 'Cooking class in a riverside garden, learning the secrets of cao lau' },
            { time: 'afternoon', moment: 'Bicycle through rice paddies to Tra Que vegetable village' },
            { time: 'dusk', moment: 'Release a paper lantern onto the Thu Bon River' },
            { time: 'evening', moment: 'Wander the lantern-lit streets as the moon rises' },
          ],
        },
        // EXPERIENCE: TAILORING
        {
          blockType: 'experience',
          enabled: true,
          experienceType: 'culture-heritage',
          title: 'The Art of the Ao Dai',
          introduction: 'Silk, scissors, and centuries of tradition',
          experiences: [
            {
              title: 'Tailoring in Hoi An',
              description: [
                { type: 'p', children: [{ text: 'The tailor\'s hands move with the confidence of fifty years\' practice. She doesn\'t need a tape measure anymore—her eyes calculate proportions that her hands will translate into silk. The ao dai, Vietnam\'s national dress, is not merely clothing. It is architecture for the human form, a garment that requires the wearer to move with grace, to stand with dignity.' }] },
                { type: 'p', children: [{ text: 'In Hoi An, where tailoring is both art and industry, the finest shops still practice the old ways: hand-stitching invisible seams, cutting silk so that the pattern flows unbroken across the body, creating a garment that moves like water.' }] },
              ],
              image: defaultMedia.id,
              atmosphere: 'Intimate, focused, traditional',
              location: 'Hoi An Ancient Town',
            },
          ],
        },
        // GALLERY
        {
          blockType: 'gallery',
          enabled: true,
          title: 'Moments in Light',
          subtitle: 'Visual fragments from the journey',
          layout: 'masonry',
          images: [
            { image: defaultMedia.id, caption: 'Morning mist over Ha Long Bay', location: 'Ha Long Bay' },
            { image: defaultMedia.id, caption: 'Lantern maker in Hoi An', location: 'Hoi An' },
            { image: defaultMedia.id, caption: 'Rice terraces of Sapa', location: 'Northern Vietnam' },
            { image: defaultMedia.id, caption: 'Street food vendor, Hanoi', location: 'Hanoi' },
            { image: defaultMedia.id, caption: 'Fishing boats at sunset', location: 'Hoi An' },
            { image: defaultMedia.id, caption: 'Temple incense spirals', location: 'Ho Chi Minh City' },
          ],
        },
        // CHAPTER 4: HO CHI MINH CITY
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 4,
          chapterLabel: 'Chapter Four',
          chapterTitle: 'The City That Never Stops',
          chapterSubtitle: 'Ho Chi Minh City\'s kinetic energy',
          // Soft schedule layer - multi-day chapter
          dayRangeStart: 10,
          dayRangeEnd: 14,
          timeHint: 'Deep exploration & departure',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'They still call it Saigon here. The government renamed it decades ago, but the soul of the city remains stubbornly, gloriously Saigon—a place of French boulevards and Vietnamese hustle, of rooftop bars overlooking temples, of past and future colliding on every street corner.' }] },
            { type: 'p', children: [{ text: 'This is Vietnam at full throttle. Nine million people and five million motorbikes, all moving with a choreography that appears chaotic but functions with remarkable efficiency. Street food vendors serve world-class meals for two dollars. Art galleries occupy colonial mansions. Traditional medicine shops sit next to coffee chains. It is overwhelming, exhausting, exhilarating—and utterly addictive.' }] },
          ],
          location: {
            city: citiesMap['ho-chi-minh-city'],
          },
        },
        // ESSENTIALS
        {
          blockType: 'essentials',
          enabled: true,
          title: 'Journey Essentials',
          sections: [
            {
              heading: 'When to Journey',
              content: [{ type: 'p', children: [{ text: 'Vietnam\'s weather varies dramatically by region. The north (Hanoi, Ha Long Bay) is best from October to December and March to April. Central Vietnam (Hoi An, Hue) shines from February to May. The south enjoys warm weather year-round, with the dry season from December to April being ideal.' }] }],
            },
            {
              heading: 'Moving Through the Country',
              content: [{ type: 'p', children: [{ text: 'Internal flights connect major cities efficiently—Hanoi to Da Nang in 80 minutes, Da Nang to Ho Chi Minh City in 75 minutes. For a more immersive experience, the Reunification Express train runs the entire length of the country, though this is a journey of days, not hours. Within cities, Grab (Southeast Asia\'s Uber) makes navigation simple.' }] }],
            },
            {
              heading: 'Essential Experiences',
              content: [{ type: 'p', children: [{ text: 'Book your Ha Long Bay cruise in advance—overnight on a traditional junk offers the bay without the day-trip crowds. In Hoi An, schedule at least two tailoring appointments if having clothes made. For street food tours, engage a local guide who can navigate not just language but the unwritten rules of which vendors to trust.' }] }],
            },
            {
              heading: 'Cultural Notes',
              content: [{ type: 'p', children: [{ text: 'Remove shoes when entering homes and temples. Cover shoulders and knees at religious sites. When offered tea, accept with both hands—refusal is considered impolite. Haggling is expected at markets but should be done with humor, not aggression. Learn to say "xin chào" (hello) and "cảm ơn" (thank you)—locals appreciate the effort.' }] }],
            },
          ],
          packingHighlights: [
            { item: 'Light, breathable layers—temples require coverage' },
            { item: 'Comfortable walking shoes (cobblestones and motorbike-dodging)' },
            { item: 'Portable fan and cooling towel for humid days' },
            { item: 'Stomach remedies (embrace street food, but be prepared)' },
            { item: 'Small denominations of dong for street vendors' },
          ],
        },
        // CLOSING INTERLUDE
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'reflection',
          reflection: [
            { type: 'p', children: [{ text: 'Vietnam does not give itself up easily. It requires patience, openness, a willingness to be uncomfortable and confused and occasionally overwhelmed. But for those who approach it with humility and curiosity, it offers something rare: not just a journey through a country, but a transformation of perspective.' }] },
            { type: 'p', children: [{ text: 'You will leave Vietnam different than you arrived. Perhaps with a deeper appreciation for the simple perfection of a bowl of noodles. Perhaps with a new understanding of resilience. Certainly with images burned into memory—the karsts emerging from morning mist, the tailor\'s hands on silk, the grandmother\'s smile as she hands you a bowl of pho at dawn.' }] },
          ],
        },
      ],
      // Classic mode fallback
      days: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival in Hanoi',
          description: [{ type: 'p', children: [{ text: 'Arrive in Hanoi and settle into your hotel in the Old Quarter.' }] }],
          activities: [
            { time: 'Evening', activity: 'Welcome dinner', duration: '2 hours' },
          ],
        },
      ],
      metaTitle: 'Vietnam Editorial Journey | Luxury Travel Experience',
      metaDescription: 'An editorial journey through Vietnam—from Hanoi\'s ancient quarters to Ho Chi Minh\'s bustling streets. Experience culinary traditions and timeless landscapes.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
    };

    // ═══════════════════════════════════════════════════════════════════
    // EDITORIAL ITINERARY 2: JAPAN SEASONS
    // ═══════════════════════════════════════════════════════════════════
    const japanEditorial = {
      title: 'Japan: The Poetry of Impermanence',
      slug: 'japan-editorial-seasons',
      description: [{ 
        type: 'p', 
        children: [{ 
          text: 'The Japanese have a word—mono no aware—that captures the bittersweet beauty of impermanence. It is the cherry blossom that blooms for only a week, the autumn leaf that flames briefly before falling, the perfect moment that exists precisely because it cannot last. This journey through Japan is an invitation to see the world through this lens of transient beauty.' 
        }] 
      }],
      excerpt: 'A contemplative journey through Japan\'s seasons and traditions, from Kyoto\'s ancient temples to Tokyo\'s electric future.',
      featuredImage: defaultMedia.id,
      duration: 12,
      countries: [countriesMap['japan']].filter(Boolean),
      cities: [citiesMap['tokyo'], citiesMap['kyoto'], citiesMap['osaka'], citiesMap['nara']].filter(Boolean),
      difficulty: 'moderate' as const,
      travelStyle: ['cultural', 'luxury', 'relaxation'],
      estimatedBudget: {
        min: 4000,
        max: 8000,
        currency: 'USD',
        notes: 'Includes ryokan stays, kaiseki dinners, and JR Rail Pass',
      },
      presentationMode: 'editorial' as const,
      editorialSections: [
        // INTRODUCTION
        {
          blockType: 'intro',
          enabled: true,
          headline: 'Where Tradition Breathes',
          leadParagraph: [{ 
            type: 'p', 
            children: [{ 
              text: 'Japan exists in a state of beautiful contradiction. It is the land of 1,000-year-old temples and 3,000-mile-per-hour bullet trains. Of profound silence in moss gardens and deafening energy in neon-lit intersections. Of rituals performed with millimeter precision and creativity that knows no bounds. To visit Japan is to hold these contradictions in your hands and marvel at how perfectly they balance.' 
            }] 
          }],
          openingQuote: 'In Japan, I learned that beauty is not a destination but a practice—a way of seeing that transforms the ordinary into the extraordinary.',
          journeyHighlights: [
            { highlight: 'Private tea ceremony with a Kyoto master' },
            { highlight: 'Sunrise at Fushimi Inari\'s thousand torii gates' },
            { highlight: 'Kaiseki dinner in a 400-year-old machiya' },
            { highlight: 'Meditation with Zen monks in a temple garden' },
            { highlight: 'Onsen rituals in a mountain ryokan' },
          ],
        },
        // CHAPTER 1: TOKYO
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 1,
          chapterLabel: 'Chapter One',
          chapterTitle: 'The Electric Dream',
          chapterSubtitle: 'Tokyo\'s dance between chaos and precision',
          // Soft schedule layer
          dayRangeStart: 1,
          dayRangeEnd: 3,
          timeHint: 'Arrival & urban exploration',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_21_9',
          narrative: [
            { type: 'p', children: [{ text: 'Tokyo is a city that should not work. Thirty-seven million people packed into an endless urban sprawl, trains running every ninety seconds, constant construction reshaping skylines, and yet... it functions with an elegance that defies logic. Trains arrive on time to the second. Crime is virtually nonexistent. Even the organized chaos of Shibuya Crossing moves with hidden choreography.' }] },
            { type: 'p', children: [{ text: 'But Tokyo\'s magic lies not in its efficiency—it lies in the human moments hidden within the machine. The sushi master who has devoted sixty years to perfecting rice. The kissaten (coffee shop) where jazz has played since 1948. The tiny shrine wedged between skyscrapers where salarymen pause to pray. In Tokyo, humanity flourishes in the spaces between.' }] },
          ],
          pullQuote: 'Tokyo is not a city you conquer. It is a city you surrender to.',
          location: {
            city: citiesMap['tokyo'],
          },
          moments: [
            { time: 'dawn', moment: 'Tuna auction at Toyosu Market—witness seafood theater' },
            { time: 'morning', moment: 'Tranquility at Meiji Shrine amid 100,000 trees' },
            { time: 'afternoon', moment: 'Lost in the labyrinth of Shimokitazawa\'s vintage shops' },
            { time: 'night', moment: 'Cocktails in Golden Gai\'s six-seat bars' },
          ],
        },
        // EXPERIENCE: SUSHI
        {
          blockType: 'experience',
          enabled: true,
          experienceType: 'culinary',
          title: 'Omakase: The Art of Trust',
          introduction: 'Ten courses. Twenty years of training. One perfect meal.',
          experiences: [
            {
              title: 'Counter Seat at a Master\'s Table',
              description: [
                { type: 'p', children: [{ text: 'The counter seats eight. Behind it, a man in his seventies works in focused silence, his movements economical and precise. Each piece of nigiri is a meditation—the rice shaped in exactly seventeen small movements, the fish sliced at the precise angle that releases its essential oils, the whole composed so that it should be eaten within seconds, at the exact temperature where flavors peak.' }] },
                { type: 'p', children: [{ text: '"Omakase" means "I leave it to you." It is an act of trust, placing yourself entirely in the chef\'s hands. In return, he offers his life\'s work—decades of training, years of building relationships with fishermen, countless hours of perfecting techniques. This is not a meal. It is a performance, a gift, a window into the Japanese soul.' }] },
              ],
              image: defaultMedia.id,
              atmosphere: 'The subtle creak of bamboo. The whisper of knife through fish. Rice at body temperature.',
              location: 'Tokyo',
            },
          ],
        },
        // INTERLUDE: TRANSITION
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'reflection',
          reflection: [
            { type: 'p', children: [{ text: 'The Shinkansen slides out of Tokyo Station with the punctuality of a heartbeat—9:33 AM, not a second early, not a second late. Through the window, the city thins, then gives way to rice paddies glowing green in the morning light. Mount Fuji appears, a perfect cone floating above the clouds. In two hours and fifteen minutes, you will step off in Kyoto, and everything will be different.' }] },
          ],
        },
        // CHAPTER 2: KYOTO
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 2,
          chapterLabel: 'Chapter Two',
          chapterTitle: 'The Old Capital',
          chapterSubtitle: 'Kyoto\'s thousand temples and timeless traditions',
          // Soft schedule layer
          dayRangeStart: 4,
          dayRangeEnd: 7,
          timeHint: 'Temple hopping & cultural immersion',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'background',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'Kyoto was Japan\'s capital for over a thousand years, and in that millennium, it accumulated layers of culture like sediment in a river. There are 2,000 temples here, 400 shrines, countless gardens designed with philosophy as much as aesthetics. But numbers cannot capture Kyoto. It must be experienced in moments: the rake marks in a Zen garden, the rustle of a geisha\'s silk kimono, the taste of matcha whisked by a tea master whose lineage stretches back centuries.' }] },
            { type: 'p', children: [{ text: 'The secret to Kyoto is to rise early and walk slowly. At 6 AM, Fushimi Inari belongs to you alone—ten thousand vermillion torii gates climbing through forest mist. At dawn, the moss gardens of Saiho-ji glow emerald in slanted light. In the early hours, before the crowds, you can hear what Kyoto has always known: that beauty reveals itself to those with patience.' }] },
          ],
          pullQuote: 'In Kyoto, every garden is a meditation. Every tea ceremony is a philosophy. Every moment is an opportunity for enlightenment.',
          location: {
            city: citiesMap['kyoto'],
          },
          moments: [
            { time: 'dawn', moment: 'Walk the empty torii gates of Fushimi Inari' },
            { time: 'morning', moment: 'Private tea ceremony in a machiya townhouse' },
            { time: 'afternoon', moment: 'Contemplate emptiness in a Zen rock garden' },
            { time: 'dusk', moment: 'Spot geisha in the preserved streets of Gion' },
          ],
        },
        // EXPERIENCE: TEA CEREMONY
        {
          blockType: 'experience',
          enabled: true,
          experienceType: 'culture-heritage',
          title: 'Chanoyu: The Way of Tea',
          introduction: 'Four hours to drink a cup of tea. A lifetime to understand why.',
          experiences: [
            {
              title: 'Private Tea Ceremony',
              description: [
                { type: 'p', children: [{ text: 'The tea room is small—just four and a half tatami mats. You enter through a low door, bowing as you go, leaving ego and status at the threshold. Inside, every element has been considered: the scroll in the alcove chosen for the season, the single flower representing nature\'s transient beauty, the arrangement of coals calculated for optimal water temperature.' }] },
                { type: 'p', children: [{ text: 'The host\'s movements are precise, ritualized, yet somehow natural—the result of years of practice until the form dissolves into formlessness. When the bowl reaches your hands, warm and rough with centuries of use, you understand: this is not about tea. It is about presence, about gratitude, about finding the infinite in a single moment.' }] },
              ],
              image: defaultMedia.id,
              atmosphere: 'Charcoal smoke. The sound of water heating—"wind in the pines." Matcha foam like clouds in a jade sky.',
              location: 'Kyoto',
            },
          ],
        },
        // GALLERY
        {
          blockType: 'gallery',
          enabled: true,
          title: 'Seasons of Japan',
          subtitle: 'Light, form, and fleeting beauty',
          layout: 'editorial',
          images: [
            { image: defaultMedia.id, caption: 'Cherry blossoms at Philosopher\'s Path', location: 'Kyoto' },
            { image: defaultMedia.id, caption: 'Golden Pavilion in morning mist', location: 'Kyoto' },
            { image: defaultMedia.id, caption: 'Nara\'s sacred deer at dawn', location: 'Nara' },
            { image: defaultMedia.id, caption: 'Bamboo grove, Arashiyama', location: 'Kyoto' },
            { image: defaultMedia.id, caption: 'Shibuya Crossing at dusk', location: 'Tokyo' },
            { image: defaultMedia.id, caption: 'Ryokan garden in autumn', location: 'Hakone' },
          ],
        },
        // CHAPTER 3: NARA & TRADITIONS
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 3,
          chapterLabel: 'Chapter Three',
          chapterTitle: 'The Sacred Deer',
          chapterSubtitle: 'Nara\'s ancient temples and gentle guardians',
          // Soft schedule layer
          dayRangeStart: 8,
          dayRangeEnd: 9,
          timeHint: 'Day trip & spiritual encounters',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'right',
          imageAspectRatio: 'ratio_3_4',
          narrative: [
            { type: 'p', children: [{ text: 'Before Kyoto, before Tokyo, there was Nara—Japan\'s first permanent capital, established in 710 CE. The city\'s great Buddha, cast in bronze in 752, remains one of the largest in the world, his serene gaze unchanged after thirteen centuries. But it is Nara\'s other inhabitants that capture the heart: over 1,200 wild deer, considered divine messengers for a thousand years.' }] },
            { type: 'p', children: [{ text: 'They roam freely through the park, bowing for deer crackers (a gesture learned from observing human pilgrims), resting in the shade of ancient cryptomeria cedars. There is something profoundly peaceful about sharing space with creatures that have been sacred since before your ancestors\' ancestors were born—a reminder of continuities that transcend individual lives.' }] },
          ],
          location: {
            city: citiesMap['nara'],
          },
        },
        // ESSENTIALS
        {
          blockType: 'essentials',
          enabled: true,
          title: 'Planning Your Journey',
          sections: [
            {
              heading: 'The Art of Timing',
              content: [{ type: 'p', children: [{ text: 'Spring (late March to early May) brings cherry blossoms and pleasant temperatures. Autumn (October to November) offers stunning foliage and clear skies. Summer is humid but features festivals. Winter is mild in most regions and offers snow landscapes in the mountains. For cherry blossoms, plan far in advance—the two-week window books up a year ahead.' }] }],
            },
            {
              heading: 'The Rhythm of Travel',
              content: [{ type: 'p', children: [{ text: 'The JR Rail Pass remains essential for multi-city journeys—order before arriving. Reserve Shinkansen seats during peak periods. Book ryokans 3-6 months ahead for popular properties. Restaurant reservations are often required, particularly for high-end sushi—your hotel concierge can assist. Build in "lost" time—some of Japan\'s best discoveries happen when you wander without agenda.' }] }],
            },
            {
              heading: 'The Language of Respect',
              content: [{ type: 'p', children: [{ text: 'Remove shoes when entering traditional spaces. Silence phones on trains (and in most indoor spaces). Queue with patience. Bow when greeted. Never stick chopsticks upright in rice. Carry cash—Japan remains cash-focused despite technological advancement. Learn basic phrases: "Arigato gozaimasu" (thank you very much), "Sumimasen" (excuse me), "Oishii" (delicious).' }] }],
            },
          ],
          packingHighlights: [
            { item: 'Slip-on shoes (constant removal in temples)' },
            { item: 'Small towel (few paper towels in restrooms)' },
            { item: 'Pocket wifi (essential for navigation)' },
            { item: 'Layers (interiors vary wildly in temperature)' },
            { item: 'Empty suitcase space (you will shop)' },
          ],
        },
        // CLOSING
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'reflection',
          reflection: [
            { type: 'p', children: [{ text: 'There is a concept in Japanese aesthetics called "ma"—the pregnant pause, the meaningful silence, the space between notes that gives music meaning. Japan itself is a study in ma: the stillness of a rock garden, the pause before a geisha enters, the moment when the tea master stops and simply breathes.' }] },
            { type: 'p', children: [{ text: 'This journey has no conclusion. Japan does not resolve; it deepens. Each visit reveals new layers, new questions, new moments of startling beauty. You will return home changed, carrying with you a different relationship with time, with attention, with the transient miracle of being alive. And perhaps, one day, you will return.' }] },
          ],
        },
      ],
      days: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival in Tokyo',
          description: [{ type: 'p', children: [{ text: 'Arrive in Tokyo and transfer to your hotel.' }] }],
          activities: [
            { time: 'Evening', activity: 'Welcome dinner in Shibuya', duration: '2 hours' },
          ],
        },
      ],
      metaTitle: 'Japan Editorial Journey | Seasons and Traditions',
      metaDescription: 'A contemplative journey through Japan\'s seasons, from Tokyo\'s electric energy to Kyoto\'s ancient temples.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
    };

    // ═══════════════════════════════════════════════════════════════════
    // EDITORIAL ITINERARY 3: ITALY LA DOLCE VITA
    // ═══════════════════════════════════════════════════════════════════
    const italyEditorial = {
      title: 'Italy: La Dolce Vita Rediscovered',
      slug: 'italy-editorial-dolce-vita',
      description: [{ 
        type: 'p', 
        children: [{ 
          text: 'Italy does not hurry. It lingers over espresso, debates the proper way to dress pasta, closes shops for three-hour lunches, and considers the evening passeggiata a civic duty. This journey is an invitation to slow down, to savor, to discover why the Italians might have gotten something fundamentally right about the art of living.' 
        }] 
      }],
      excerpt: 'From Rome\'s eternal monuments to Venice\'s floating dreams, an epicurean journey through Italy\'s art, cuisine, and way of life.',
      featuredImage: defaultMedia.id,
      duration: 14,
      countries: [countriesMap['italy']].filter(Boolean),
      cities: [citiesMap['rome'], citiesMap['florence'], citiesMap['venice']].filter(Boolean),
      difficulty: 'easy' as const,
      travelStyle: ['luxury', 'cultural', 'foodie', 'romantic'],
      estimatedBudget: {
        min: 5000,
        max: 10000,
        currency: 'USD',
        notes: 'Includes boutique hotels, private guides, and exceptional dining',
      },
      presentationMode: 'editorial' as const,
      editorialSections: [
        // INTRODUCTION
        {
          blockType: 'intro',
          enabled: true,
          headline: 'An Ode to Living Well',
          leadParagraph: [{ 
            type: 'p', 
            children: [{ 
              text: 'What if life itself could be art? The Italians have been experimenting with this question for three thousand years, and their conclusions are written in every perfectly pulled espresso, every hand-painted fresco, every grandmother\'s ragù that simmers for seven hours because that is simply how long ragù takes. Italy is not a destination—it is an argument for beauty as a fundamental human need.' 
            }] 
          }],
          openingQuote: 'In Italy, they understand that life is too short for bad coffee, bad wine, or rushing through anything worth doing properly.',
          journeyHighlights: [
            { highlight: 'Private after-hours Sistine Chapel viewing' },
            { highlight: 'Truffle hunting in Umbrian forests' },
            { highlight: 'Pasta-making with a Bolognese nonna' },
            { highlight: 'Gondola through Venice at golden hour' },
            { highlight: 'Wine tasting in a 500-year-old Florentine cellar' },
          ],
        },
        // CHAPTER 1: ROME
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 1,
          chapterLabel: 'Chapter One',
          chapterTitle: 'The Eternal City',
          chapterSubtitle: 'Where every cobblestone tells a story',
          // Soft schedule layer
          dayRangeStart: 1,
          dayRangeEnd: 4,
          timeHint: 'Arrival & Roman immersion',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_21_9',
          narrative: [
            { type: 'p', children: [{ text: 'Rome was old when Christ was born. Its temples were ancient when the Goths sacked it. Its Renaissance palaces were already weathered when Napoleon\'s troops marched through. Three thousand years of continuous habitation have left layers upon layers of history, each era building atop the bones of the last, creating a city that is simultaneously museum and living organism.' }] },
            { type: 'p', children: [{ text: 'But Rome is not a relic. It is a city where children play football in piazzas designed by Bernini, where trattorias serve cacio e pepe using the same recipe since Roman legions marched home hungry, where the sunset over St. Peter\'s dome still stops traffic. Rome reminds us that beauty is not fragile—it endures, adapts, and deepens with age.' }] },
          ],
          pullQuote: 'Rome is a poem pressed into marble, a symphony written in stone, a love letter from the past to whoever pauses to read it.',
          location: {
            city: citiesMap['rome'],
          },
          moments: [
            { time: 'dawn', moment: 'Empty Trevi Fountain before the crowds arrive' },
            { time: 'morning', moment: 'Vatican Museums with a private guide' },
            { time: 'afternoon', moment: 'Long lunch in Trastevere—the neighborhood of artisans' },
            { time: 'evening', moment: 'Aperitivo with a view of the Colosseum' },
          ],
        },
        // EXPERIENCE: CACIO E PEPE
        {
          blockType: 'experience',
          enabled: true,
          experienceType: 'culinary',
          title: 'Cacio e Pepe: The Perfect Dish',
          introduction: 'Three ingredients. Two thousand years. One transcendent experience.',
          experiences: [
            {
              title: 'Tableside Alchemy in Testaccio',
              description: [
                { type: 'p', children: [{ text: 'The dish contains only pasta, pecorino Romano, and black pepper. No cream. No butter. No garlic. Just the alchemical transformation that occurs when starchy pasta water, aged sheep\'s cheese, and freshly ground pepper are combined with precisely the right technique at exactly the right temperature.' }] },
                { type: 'p', children: [{ text: 'In a tucked-away trattoria in Testaccio, the neighborhood where Roman cuisine was born, a cook who learned from his grandmother, who learned from hers, performs this alchemy at your tableside. The cheese melts into a creamy emulsion. The pepper blooms with heat. Each bite is a dialogue across centuries—the same flavors that sustained gladiators and emperors, now sustaining you.' }] },
              ],
              image: defaultMedia.id,
              atmosphere: 'Steam rising from the bowl. The crack of pepper. That first forkful.',
              location: 'Testaccio, Rome',
            },
          ],
        },
        // CHAPTER 2: FLORENCE
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 2,
          chapterLabel: 'Chapter Two',
          chapterTitle: 'Renaissance Dreams',
          chapterSubtitle: 'Florence and the invention of modern beauty',
          // Soft schedule layer
          dayRangeStart: 5,
          dayRangeEnd: 9,
          timeHint: 'Art, wine & Tuscan countryside',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'background',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'In the fifteenth century, a small city of 50,000 people produced Michelangelo, Leonardo, Botticelli, Brunelleschi, Machiavelli, and the Medici banking empire. They invented linear perspective, perfected oil painting, and created works of art that still define beauty five centuries later. The Renaissance was born here, and walking Florence\'s streets feels like walking through its birthplace.' }] },
            { type: 'p', children: [{ text: 'But Florence is not a museum frozen in time. It is a living city where artisans still practice centuries-old crafts in the Oltrarno workshops, where the Mercato Centrale buzzes with contemporary food culture, where the sunset over the Arno creates a light show that Botticelli would have recognized. Beauty here is not past tense. It is present continuous.' }] },
          ],
          pullQuote: 'The Florentines did not merely create art. They created the very idea of art as we understand it.',
          location: {
            city: citiesMap['florence'],
          },
          moments: [
            { time: 'dawn', moment: 'Quiet moments with David before the crowds' },
            { time: 'morning', moment: 'Artisan workshop tour in the Oltrarno quarter' },
            { time: 'afternoon', moment: 'Chianti tasting in the Tuscan hills' },
            { time: 'dusk', moment: 'Piazzale Michelangelo as the city turns golden' },
          ],
        },
        // INTERLUDE
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'quote',
          quote: 'One cannot think well, love well, sleep well, if one has not dined well.',
          quoteAttribution: 'Virginia Woolf (but the Italians knew this already)',
        },
        // CHAPTER 3: VENICE
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 3,
          chapterLabel: 'Chapter Three',
          chapterTitle: 'The Floating Dream',
          chapterSubtitle: 'Venice: impossible, improbable, unforgettable',
          // Soft schedule layer
          dayRangeStart: 10,
          dayRangeEnd: 14,
          timeHint: 'Lagoon magic & farewell',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'Venice should not exist. A city built on 118 islands, connected by 400 bridges, sinking slowly into the lagoon that created it—the whole enterprise seems like a collective fever dream. And yet for over a thousand years, this improbable place was one of the most powerful cities in the world, a republic of merchants and artists that punched far above its weight.' }] },
            { type: 'p', children: [{ text: 'Today, Venice is quieter, smaller, increasingly threatened by rising waters and overtourism. But in the early morning, before the day-trippers arrive, or in the evening, as the last light turns the Grand Canal to molten gold, Venice reveals why it has inspired artists, writers, and hopeless romantics for centuries. It is not like any other place. It is not even like itself was yesterday. Venice is perpetually becoming.' }] },
          ],
          pullQuote: 'Venice is not seen. Venice is dreamed.',
          location: {
            city: citiesMap['venice'],
          },
          moments: [
            { time: 'dawn', moment: 'Espresso at Caffè Florian as the piazza awakens' },
            { time: 'morning', moment: 'Lost in the maze of Cannaregio—Venice\'s hidden heart' },
            { time: 'afternoon', moment: 'Glass-blowing demonstration in Murano' },
            { time: 'evening', moment: 'Private gondola at sunset—no Harry\'s Bar, just you and the water' },
          ],
        },
        // GALLERY
        {
          blockType: 'gallery',
          enabled: true,
          title: 'Italian Light',
          subtitle: 'The colors of la dolce vita',
          layout: 'masonry',
          images: [
            { image: defaultMedia.id, caption: 'Dawn at the Colosseum', location: 'Rome' },
            { image: defaultMedia.id, caption: 'The Duomo\'s dome against Tuscan sky', location: 'Florence' },
            { image: defaultMedia.id, caption: 'Grand Canal at golden hour', location: 'Venice' },
            { image: defaultMedia.id, caption: 'Chianti vineyards at harvest', location: 'Tuscany' },
            { image: defaultMedia.id, caption: 'Fisherman\'s nets in Burano', location: 'Venice' },
            { image: defaultMedia.id, caption: 'Trastevere evening', location: 'Rome' },
          ],
        },
        // ESSENTIALS
        {
          blockType: 'essentials',
          enabled: true,
          title: 'La Dolce Vita: Practical Notes',
          sections: [
            {
              heading: 'Timing the Masterpiece',
              content: [{ type: 'p', children: [{ text: 'Spring (April-May) and fall (September-October) offer ideal weather and manageable crowds. Summer brings heat, tourists, and Venetian flooding risks. Winter is romantic but can be cold and damp. Book major museums and Vatican visits months ahead. Restaurants require reservations, particularly on weekends.' }] }],
            },
            {
              heading: 'Moving Through Beauty',
              content: [{ type: 'p', children: [{ text: 'High-speed trains connect Rome-Florence (90 minutes) and Florence-Venice (2 hours) efficiently. Within cities, walk—Italy rewards the pedestrian with unexpected discoveries. In Venice, the vaporetto water buses are essential, but getting lost on foot is the point. Rent a car only for Tuscany countryside exploration.' }] }],
            },
            {
              heading: 'Eating Like the Italians',
              content: [{ type: 'p', children: [{ text: 'Breakfast is espresso and cornetto at a bar (standing costs less). Lunch was traditionally the main meal, though habits are changing. Dinner never before 8 PM. Each region has distinct specialties—Roman cuisine differs from Florentine differs from Venetian. Trust trattorias over restaurants, and always ask what\'s fresh today.' }] }],
            },
          ],
          packingHighlights: [
            { item: 'Comfortable walking shoes (cobblestones are beautiful but brutal)' },
            { item: 'Layers for church visits (covered shoulders, knees)' },
            { item: 'Small daypack for water and museum provisions' },
            { item: 'Power adapter for European outlets' },
            { item: 'Notebook for capturing flavors and moments' },
          ],
        },
        // CLOSING
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'reflection',
          reflection: [
            { type: 'p', children: [{ text: 'Italy teaches you things you didn\'t know you needed to learn. That meals are not fuel but ceremony. That beauty is not luxury but necessity. That slowing down is not laziness but wisdom. That the best moments in life are often the simplest: a perfect espresso, a stunning view, a conversation that lasts until the wine bottle empties.' }] },
            { type: 'p', children: [{ text: 'You will return home heavier—in body, certainly (the pasta makes its presence known), but also in spirit. Italy adds weight to life, substance and richness and depth. And in the months that follow, when life accelerates and the beautiful seems far away, you will close your eyes and return: to a trattoria in Trastevere, to a loggia overlooking Florence, to a canal turning gold in the Venetian dusk. Italy stays with you. That is both its gift and its danger.' }] },
          ],
        },
      ],
      days: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival in Rome',
          description: [{ type: 'p', children: [{ text: 'Arrive in Rome and settle into your boutique hotel.' }] }],
          activities: [
            { time: 'Evening', activity: 'Welcome dinner in Trastevere', duration: '3 hours' },
          ],
        },
      ],
      metaTitle: 'Italy La Dolce Vita | Luxury Editorial Journey',
      metaDescription: 'From Rome\'s eternal monuments to Venice\'s floating dreams—an epicurean journey through Italy\'s art, cuisine, and way of life.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
    };

    // ═══════════════════════════════════════════════════════════════════
    // EDITORIAL ITINERARY 4: MOROCCO - FEATURE SHOWCASE
    // Demonstrates ALL new schedule orientation features
    // ═══════════════════════════════════════════════════════════════════
    const moroccoEditorial = {
      title: 'Morocco: Where Desert Meets Dream',
      slug: 'morocco-editorial-desert-dream',
      description: [{ 
        type: 'p', 
        children: [{ 
          text: 'Morocco is a sensory symphony—the call to prayer echoing through ancient medinas, the scent of spices in labyrinthine souks, the silence of the Sahara at midnight. This journey weaves through imperial cities, across mountain passes, and into the endless dunes, revealing a land where tradition and modernity dance in delicate balance.' 
        }] 
      }],
      excerpt: 'From Marrakech\'s vibrant souks to Saharan starlight—a journey through Morocco\'s colors, flavors, and timeless traditions.',
      featuredImage: defaultMedia.id,
      duration: 10,
      countries: [countriesMap['morocco']].filter(Boolean),
      cities: [citiesMap['marrakech'], citiesMap['fes'], citiesMap['chefchaouen']].filter(Boolean),
      difficulty: 'moderate' as const,
      travelStyle: ['adventure', 'cultural', 'luxury'],
      estimatedBudget: {
        min: 3000,
        max: 6000,
        currency: 'USD',
        notes: 'Includes riads, desert camp, and private guides',
      },
      presentationMode: 'editorial' as const,
      editorialSections: [
        // INTRODUCTION
        {
          blockType: 'intro',
          enabled: true,
          headline: 'A Tapestry of Senses',
          leadParagraph: [{ 
            type: 'p', 
            children: [{ 
              text: 'Morocco exists at the crossroads of worlds—Africa and Europe, Atlantic and Mediterranean, ancient and modern. Its cities are living museums where craftsmen practice arts unchanged for centuries, while its landscapes range from snow-capped mountains to golden dunes. To travel here is to step into a story that has been unfolding for millennia.' 
            }] 
          }],
          openingQuote: 'In Morocco, every door is a mystery, every alley an adventure, every sunset a revelation.',
          journeyHighlights: [
            { highlight: 'Private cooking class in a Marrakech palace' },
            { highlight: 'Sunrise over Saharan dunes from luxury camp' },
            { highlight: 'Tea with Berber families in the Atlas Mountains' },
            { highlight: 'Getting lost (intentionally) in the Fes medina' },
            { highlight: 'Blue city wanderings in Chefchaouen' },
          ],
        },
        
        // ═══════════════════════════════════════════════════════════════
        // CHAPTER 1: Single day with timeHint (FEATURE: dayNumber + timeHint)
        // ═══════════════════════════════════════════════════════════════
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 1,
          chapterLabel: 'Arrival',
          chapterTitle: 'Into the Red City',
          chapterSubtitle: 'Marrakech welcomes with open arms and overwhelming beauty',
          // FEATURE: Single day indicator with arrival context
          dayNumber: 1,
          timeHint: 'Afternoon arrival & first impressions',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_21_9',
          narrative: [
            { type: 'p', children: [{ text: 'The plane descends over terracotta rooftops and palm groves, and already Morocco feels different. The light is golden, the air carries hints of jasmine and wood smoke, and the Atlas Mountains rise in the distance like a promise. This is Marrakech—the Red City—a place that has seduced travelers for centuries.' }] },
            { type: 'p', children: [{ text: 'Your riad awaits in the medina, a hidden oasis behind an unmarked door. Step through, and chaos transforms to calm: a courtyard garden, a fountain\'s gentle song, mint tea served in silver pots. This is the Moroccan way—beauty hidden, waiting to be discovered.' }] },
          ],
          pullQuote: 'In Marrakech, the most beautiful things are always hidden behind ordinary doors.',
          location: {
            city: citiesMap['marrakech'],
          },
          moments: [
            { time: 'afternoon', moment: 'Arrive and settle into your riad sanctuary' },
            { time: 'dusk', moment: 'First venture into Jemaa el-Fnaa square as it awakens' },
            { time: 'evening', moment: 'Rooftop dinner watching the city lights flicker on' },
          ],
        },
        
        // ═══════════════════════════════════════════════════════════════
        // CHAPTER 2: Multi-day range (FEATURE: dayRangeStart + dayRangeEnd)
        // ═══════════════════════════════════════════════════════════════
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 2,
          chapterLabel: 'Deep Exploration',
          chapterTitle: 'The Labyrinth of Wonders',
          chapterSubtitle: 'Getting gloriously lost in Marrakech\'s souks',
          // FEATURE: Multi-day range for extended exploration
          dayRangeStart: 2,
          dayRangeEnd: 3,
          timeHint: 'Full days of discovery',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'background',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'The medina is a maze designed to disorient. Streets narrow to passages, passages become tunnels, and suddenly you\'re in a square you\'ve never seen before, surrounded by craftsmen hammering brass or weaving silk. There are no GPS coordinates here—only instinct, curiosity, and the willingness to be lost.' }] },
            { type: 'p', children: [{ text: 'But being lost in Marrakech is not failure—it is the point. Every wrong turn reveals a hidden gem: a 600-year-old fountain, a spice stall where the owner offers you tea, a rooftop where you can watch the sunset paint the city gold. Surrender to the maze, and it rewards you.' }] },
          ],
          pullQuote: 'The secret of the medina is this: you cannot be lost if you have nowhere to be.',
          moments: [
            { time: 'dawn', moment: 'Secret garden visit before the crowds' },
            { time: 'morning', moment: 'Cooking class: tagine, couscous, preserved lemons' },
            { time: 'afternoon', moment: 'Souk exploration with a local guide' },
            { time: 'evening', moment: 'Hammam ritual and restoration' },
          ],
        },
        
        // EXPERIENCE BLOCK
        {
          blockType: 'experience',
          enabled: true,
          experienceType: 'culinary',
          title: 'The Art of Tagine',
          introduction: 'One pot. Seven spices. Centuries of tradition.',
          experiences: [
            {
              title: 'Cooking in a Palace Kitchen',
              description: [
                { type: 'p', children: [{ text: 'The cook\'s hands move with practiced grace, layering ingredients into the conical clay pot—chicken, preserved lemons, olives, a shower of saffron threads worth their weight in gold. This is not a recipe; it is a meditation, passed from grandmother to mother to daughter for generations.' }] },
                { type: 'p', children: [{ text: 'The tagine cooks slowly, the steam condensing inside the cone and dripping back down, basting the meat in its own perfumed juices. When it\'s done, the lid lifts to reveal: alchemy. Tender meat, complex spices, a sauce that sings of this land and no other.' }] },
              ],
              image: defaultMedia.id,
              atmosphere: 'Saffron steam, the sizzle of chermoula, laughter in Arabic and French',
              location: 'Marrakech Medina',
            },
          ],
        },
        
        // INTERLUDE
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'quote',
          quote: 'Morocco is not a country you visit. It is a country that visits you—and never quite leaves.',
          quoteAttribution: 'Paul Bowles',
        },
        
        // ═══════════════════════════════════════════════════════════════
        // CHAPTER 3: Day without indicator (FEATURE: showDayIndicator: false)
        // For pure editorial flow without schedule context
        // ═══════════════════════════════════════════════════════════════
        {
          blockType: 'chapter',
          enabled: true,
          chapterLabel: 'Intermezzo',
          chapterTitle: 'Ascending to the Clouds',
          chapterSubtitle: 'Over the Atlas Mountains to the edge of the Sahara',
          // FEATURE: No day indicator - pure narrative flow
          dayNumber: 4,
          showDayIndicator: false, // Intentionally hidden for editorial purity
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_21_9',
          narrative: [
            { type: 'p', children: [{ text: 'The road climbs through the High Atlas, switchback after switchback, until Marrakech is a memory and the air grows thin and cold. Berber villages cling to mountainsides, their houses the color of the earth from which they\'re built. Snow caps the highest peaks even in summer.' }] },
            { type: 'p', children: [{ text: 'This is the passage between worlds—the fertile north and the arid south, the medina\'s chaos and the desert\'s silence. Stop for tea with a mountain family, their hospitality as warm as their fire, their smiles transcending any language barrier. Then continue, as the land transforms once more.' }] },
          ],
          pullQuote: 'In the mountains, time moves at a different pace—measured not in hours but in cups of tea shared.',
        },
        
        // ═══════════════════════════════════════════════════════════════
        // CHAPTER 4: Multi-day desert experience
        // ═══════════════════════════════════════════════════════════════
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 3,
          chapterLabel: 'The Desert',
          chapterTitle: 'Where Silence Speaks',
          chapterSubtitle: 'Into the Sahara\'s eternal embrace',
          // FEATURE: Multi-day range with evocative timeHint
          dayRangeStart: 5,
          dayRangeEnd: 6,
          timeHint: 'Sunrise to starlight in the dunes',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'background',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'The dunes of Erg Chebbi rise like frozen waves, their crests sharp against an impossibly blue sky. At sunset, they glow orange, then pink, then purple. At night, they disappear entirely, leaving only stars—more stars than you\'ve ever seen, the Milky Way a river of light overhead.' }] },
            { type: 'p', children: [{ text: 'Your camp is luxury disguised as simplicity: white canvas, Berber carpets, oil lamps that flicker in the breeze. Dinner is served on cushions under the stars—tagine again, but different here, tasting of smoke and silence. Later, drums. Someone sings in a language older than borders. The desert holds you like a secret.' }] },
          ],
          pullQuote: 'In the Sahara, you understand why prophets went to the desert to hear God—here, there is nothing else.',
          moments: [
            { time: 'afternoon', moment: 'Camel trek through golden dunes to camp' },
            { time: 'dusk', moment: 'Watch the sunset paint the desert in impossible colors' },
            { time: 'night', moment: 'Berber music and stargazing—no light pollution for miles' },
            { time: 'dawn', moment: 'Climb the highest dune for sunrise alone' },
          ],
        },
        
        // GALLERY
        {
          blockType: 'gallery',
          enabled: true,
          title: 'Colors of Morocco',
          subtitle: 'A visual journey through ochre, blue, and gold',
          layout: 'masonry',
          images: [
            { image: defaultMedia.id, caption: 'Jemaa el-Fnaa at dusk', location: 'Marrakech' },
            { image: defaultMedia.id, caption: 'Sunrise over Erg Chebbi', location: 'Sahara Desert' },
            { image: defaultMedia.id, caption: 'Blue doors of Chefchaouen', location: 'Chefchaouen' },
            { image: defaultMedia.id, caption: 'Leather tanneries from above', location: 'Fes' },
            { image: defaultMedia.id, caption: 'Atlas Mountain village', location: 'High Atlas' },
            { image: defaultMedia.id, caption: 'Spice stall in the medina', location: 'Marrakech' },
          ],
        },
        
        // ═══════════════════════════════════════════════════════════════
        // CHAPTER 5: Single day with different timeHint style
        // ═══════════════════════════════════════════════════════════════
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 4,
          chapterLabel: 'Ancient Fes',
          chapterTitle: 'The Spiritual Heart',
          chapterSubtitle: 'Fes: where Morocco\'s soul resides',
          // FEATURE: Day range for Fes exploration
          dayRangeStart: 7,
          dayRangeEnd: 8,
          timeHint: 'Immersion in medieval Morocco',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'left',
          imageAspectRatio: 'ratio_4_3',
          narrative: [
            { type: 'p', children: [{ text: 'If Marrakech is Morocco\'s body, Fes is its soul. The world\'s largest car-free urban area, its medina has barely changed since medieval times. Donkeys still carry goods through alleys too narrow for carts. Craftsmen still practice trades established when Europe was in darkness.' }] },
            { type: 'p', children: [{ text: 'The tanneries are legendary—vast vats of natural dyes where leather has been cured for a thousand years. The smell is overwhelming, the colors transcendent: saffron yellow, poppy red, indigo blue. This is not tourism; this is witnessing a living tradition that refuses to die.' }] },
          ],
          location: {
            city: citiesMap['fes'],
          },
          moments: [
            { time: 'morning', moment: 'Private tour of the medieval medina with a local historian' },
            { time: 'afternoon', moment: 'Tanneries from the leather shops above' },
            { time: 'evening', moment: 'Dinner in a restored 14th-century palace' },
          ],
        },
        
        // ═══════════════════════════════════════════════════════════════
        // CHAPTER 6: Final days with departure hint
        // ═══════════════════════════════════════════════════════════════
        {
          blockType: 'chapter',
          enabled: true,
          chapterNumber: 5,
          chapterLabel: 'The Blue Pearl',
          chapterTitle: 'Dreaming in Blue',
          chapterSubtitle: 'Chefchaouen\'s impossible hues',
          // FEATURE: Final days with departure context
          dayRangeStart: 9,
          dayRangeEnd: 10,
          timeHint: 'Final wanderings & reluctant farewell',
          showDayIndicator: true,
          image: defaultMedia.id,
          imagePosition: 'full-width',
          imageAspectRatio: 'ratio_16_9',
          narrative: [
            { type: 'p', children: [{ text: 'No one knows quite why Chefchaouen is blue. Some say Jewish refugees fleeing Spain painted their houses sky-colored to remember the heavens. Some say it repels mosquitoes. Some say it\'s simply beautiful—and in Morocco, that is reason enough.' }] },
            { type: 'p', children: [{ text: 'The effect is dreamlike: streets of every shade of blue, from powder to cobalt to sapphire, punctuated by terracotta pots overflowing with flowers. Time slows here. Cats sleep in doorways. The mountains loom above, as blue as the walls below. It is the perfect place for a journey to end—a whisper rather than a shout, a sigh of contentment.' }] },
          ],
          pullQuote: 'Some places are destinations. Chefchaouen is a state of mind.',
          location: {
            city: citiesMap['chefchaouen'],
          },
          moments: [
            { time: 'dawn', moment: 'Blue streets empty—yours alone to wander' },
            { time: 'morning', moment: 'Hike to the waterfall in the Rif Mountains' },
            { time: 'afternoon', moment: 'Final shopping: wool blankets, painted ceramics' },
            { time: 'evening', moment: 'Farewell dinner overlooking the blue medina' },
          ],
        },
        
        // ESSENTIALS
        {
          blockType: 'essentials',
          enabled: true,
          title: 'Practical Notes for the Journey',
          sections: [
            {
              heading: 'When to Go',
              content: [{ type: 'p', children: [{ text: 'Spring (March-May) and autumn (September-November) offer ideal weather. Summer is scorching, especially in the desert. Ramadan affects opening hours but adds cultural richness. Book desert camps well ahead for peak seasons.' }] }],
            },
            {
              heading: 'Moving Through the Country',
              content: [{ type: 'p', children: [{ text: 'Private driver is recommended for the Atlas crossing and desert journey—roads are winding and conditions vary. Trains connect major cities efficiently. Within medinas, walking is the only option (and the best one).' }] }],
            },
            {
              heading: 'Cultural Considerations',
              content: [{ type: 'p', children: [{ text: 'Dress modestly, especially in Fes. Remove shoes when entering homes. Bargaining is expected but should be friendly. A few words of French or Arabic go far. Accept hospitality when offered—refusing tea is considered rude.' }] }],
            },
          ],
          packingHighlights: [
            { item: 'Layers—desert days are hot, nights cold' },
            { item: 'Comfortable walking shoes for cobblestones' },
            { item: 'Scarf for sun, sand, and mosque visits' },
            { item: 'Small flashlight for dim medina passages' },
            { item: 'Patience and a sense of adventure' },
          ],
        },
        
        // CLOSING REFLECTION
        {
          blockType: 'interlude',
          enabled: true,
          interludeType: 'reflection',
          reflection: [
            { type: 'p', children: [{ text: 'Morocco does not give you answers. It gives you questions—about beauty, about tradition, about what matters in a life well-lived. You will return home with spices in your luggage and something else, harder to name, in your heart: a shift in perspective, an openness to wonder.' }] },
            { type: 'p', children: [{ text: 'The medinas will fade from memory, but the feeling will remain: that moment when a stranger invited you for tea, when the desert stars made you feel both insignificant and infinite, when you understood that the world is larger and stranger and more beautiful than you ever imagined. Morocco stays with you. That is its magic, and its gift.' }] },
          ],
        },
      ],
      days: [
        {
          dayNumber: 1,
          title: 'Day 1: Arrival in Marrakech',
          description: [{ type: 'p', children: [{ text: 'Arrive in Marrakech and transfer to your riad.' }] }],
          activities: [
            { time: 'Evening', activity: 'Welcome dinner on the riad rooftop', duration: '2 hours' },
          ],
        },
      ],
      metaTitle: 'Morocco: Desert Dreams | Luxury Editorial Journey',
      metaDescription: 'From Marrakech\'s vibrant souks to Saharan starlight—an editorial journey through Morocco\'s colors, flavors, and timeless traditions.',
      status: 'published' as const,
      publishedAt: new Date().toISOString(),
    };

    // ═══════════════════════════════════════════════════════════════════
    // CREATE THE ITINERARIES
    // ═══════════════════════════════════════════════════════════════════
    const editorialItineraries = [vietnamEditorial, japanEditorial, italyEditorial, moroccoEditorial];

    for (const itineraryData of editorialItineraries) {
      const existing = await payload.find({
        collection: 'itineraries',
        where: { slug: { equals: itineraryData.slug } },
      });

      if (existing.docs.length > 0) {
        // Update existing
        await payload.update({
          collection: 'itineraries',
          id: existing.docs[0].id,
          data: itineraryData,
        });
        console.log(`✅ Updated: "${itineraryData.title}"`);
      } else {
        // Create new
        await payload.create({
          collection: 'itineraries',
          data: itineraryData,
        });
        console.log(`✅ Created: "${itineraryData.title}"`);
      }
    }

    console.log('\n🎉 Editorial itineraries seeded successfully!');
    console.log('\n📋 Created itineraries:');
    editorialItineraries.forEach((it, i) => {
      console.log(`   ${i + 1}. ${it.title}`);
      console.log(`      URL: /itineraries/${it.slug}`);
    });
    console.log('\n💡 These itineraries use "editorial" presentation mode');
    console.log('   They will display with the new magazine-style layout');
    
    console.log('\n🆕 NEW FEATURES DEMONSTRATED:');
    console.log('   ─────────────────────────────────────────────────────');
    console.log('   📊 Journey Summary (At a Glance)');
    console.log('      • Duration display with intelligent formatting');
    console.log('      • Destination flow (Tokyo → 3 more → Kyoto)');
    console.log('      • Pace descriptions (Unhurried/Balanced/Immersive)');
    console.log('      • Chapter count');
    console.log('');
    console.log('   📅 Soft Schedule Layer (Day Indicators)');
    console.log('      • dayNumber: Single day (e.g., "Day 1")');
    console.log('      • dayRangeStart/End: Multi-day (e.g., "Days 3–5")');
    console.log('      • timeHint: Soft context (e.g., "Morning arrival")');
    console.log('      • showDayIndicator: Toggle visibility per chapter');
    console.log('');
    console.log('   🇲🇦 Morocco itinerary showcases ALL features:');
    console.log('      Chapter 1: Single day + timeHint');
    console.log('      Chapter 2: Multi-day range + timeHint');
    console.log('      Chapter 3: showDayIndicator: false (pure editorial)');
    console.log('      Chapter 4: Desert multi-day experience');
    console.log('      Chapter 5: Final days with departure context');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedEditorialItineraries();
