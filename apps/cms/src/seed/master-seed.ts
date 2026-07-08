import payload from 'payload';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

/**
 * Master Seed File - Orchestrates all individual seed files
 * 
 * This file coordinates the seeding process in the correct order
 * to handle relationships between collections properly.
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/master-seed.ts
 * 
 * Individual seed files can also be run separately:
 *   npx tsx src/seed/countries.seed.ts
 *   npx tsx src/seed/cities.seed.ts
 *   etc.
 */

// Import seed functions
import { seedCountries } from './countries.seed';
import { seedCities } from './cities.seed';
import { seedAttractions } from './attractions.seed';
import { seedItineraries } from './itineraries.seed';
import { seedBlogPosts } from './blog-posts.seed';
import { seedFAQs } from './faqs.seed';
import { seedCaseStudies } from './case-studies.seed';
import { seedPages } from './pages.seed';
import { seedSiteConfig } from './site-config.seed';
import { seedPageConfigs } from './page-configs.seed';

/**
 * Create a placeholder media file for required image fields
 */
async function createPlaceholderMedia(): Promise<number> {
  // Check if placeholder already exists
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Placeholder Image' } },
  });

  if (existing.docs.length > 0) {
    console.log('  ℹ️ Placeholder media already exists');
    return existing.docs[0].id as number;
  }

  // Create a simple 1x1 PNG placeholder
  const placeholderBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwYABQsC/kHi0RAAAAAASUVORK5CYII=';
  const placeholderBuffer = Buffer.from(placeholderBase64, 'base64');

  const mediaDir = path.resolve(__dirname, '../../media');
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
  }

  const placeholderPath = path.join(mediaDir, 'placeholder.png');
  fs.writeFileSync(placeholderPath, placeholderBuffer);

  const media = await payload.create({
    collection: 'media',
    data: {
      alt: 'Placeholder Image',
      caption: 'Placeholder - Replace with actual image',
    },
    filePath: placeholderPath,
  });

  console.log('  ✅ Placeholder media created');
  return media.id as number;
}

const masterSeed = async (): Promise<void> => {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║        🌱 TravelSite Master Seed Process Starting            ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me-in-production',
    local: true,
  });

  const startTime = Date.now();

  try {
    // ═══════════════════════════════════════════════════════════════════
    // STEP 1: Create admin user (if not exists)
    // ═══════════════════════════════════════════════════════════════════
    console.log('👤 Step 1: Checking admin user...');
    let adminUserId: number | undefined;
    const existingUsers = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@travel.com' } },
    });

    if (existingUsers.docs.length === 0) {
      const adminUser = await payload.create({
        collection: 'users',
        data: {
          email: 'admin@travel.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin',
        },
      });
      adminUserId = adminUser.id as number;
      console.log(`  ✅ Admin user created (admin@travel.com / admin123) - ID: ${adminUserId}`);
    } else {
      adminUserId = existingUsers.docs[0].id as number;
      console.log(`  ℹ️ Admin user already exists - ID: ${adminUserId}`);
    }

    // ═══════════════════════════════════════════════════════════════════
    // STEP 1.5: Create placeholder media for required image fields
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n🖼️ Step 1.5: Creating placeholder media...');
    const placeholderMediaId = await createPlaceholderMedia();

    // ═══════════════════════════════════════════════════════════════════
    // STEP 2: Seed Countries (base data, no dependencies)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n🌍 Step 2: Seeding Countries...');
    await seedCountries(placeholderMediaId);

    // Build countries map for relationships
    const countriesResult = await payload.find({
      collection: 'countries',
      limit: 100,
    });
    const countriesMap: Record<string, string> = {};
    countriesResult.docs.forEach((country: any) => {
      countriesMap[country.slug] = country.id;
    });
    console.log(`  📊 Countries map built: ${Object.keys(countriesMap).length} countries`);

    // ═══════════════════════════════════════════════════════════════════
    // STEP 3: Seed Cities (depends on Countries)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n🏙️ Step 3: Seeding Cities...');
    await seedCities(countriesMap, placeholderMediaId);

    // Build cities map for relationships
    const citiesResult = await payload.find({
      collection: 'cities',
      limit: 200,
    });
    const citiesMap: Record<string, string> = {};
    citiesResult.docs.forEach((city: any) => {
      citiesMap[city.slug] = city.id;
    });
    console.log(`  📊 Cities map built: ${Object.keys(citiesMap).length} cities`);

    // ═══════════════════════════════════════════════════════════════════
    // STEP 4: Seed Attractions (depends on Cities)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n🏛️ Step 4: Seeding Attractions...');
    await seedAttractions(citiesMap, placeholderMediaId);

    // ═══════════════════════════════════════════════════════════════════
    // STEP 5: Seed Itineraries (depends on Countries & Cities)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n🗺️ Step 5: Seeding Itineraries...');
    await seedItineraries(countriesMap, citiesMap, placeholderMediaId);

    // ═══════════════════════════════════════════════════════════════════
    // STEP 6: Seed Blog Posts (depends on admin user for author)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n📝 Step 6: Seeding Blog Posts...');
    await seedBlogPosts(placeholderMediaId, adminUserId);

    // ═══════════════════════════════════════════════════════════════════
    // STEP 7: Seed FAQs (independent)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n❓ Step 7: Seeding FAQs...');
    await seedFAQs();

    // ═══════════════════════════════════════════════════════════════════
    // STEP 8: Seed Case Studies (independent)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n📋 Step 8: Seeding Case Studies...');
    await seedCaseStudies(placeholderMediaId);

    // ═══════════════════════════════════════════════════════════════════
    // STEP 9: Seed Pages (independent)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n📄 Step 9: Seeding Pages...');
    await seedPages();

    // ═══════════════════════════════════════════════════════════════════
    // STEP 10: Seed Site Config (Header & Footer)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n🔧 Step 10: Seeding Site Config (Header & Footer)...');
    await seedSiteConfig();

    // ═══════════════════════════════════════════════════════════════════
    // STEP 11: Seed Page Configs (All global page settings)
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n📑 Step 11: Seeding Page Configs...');
    await seedPageConfigs();

    // ═══════════════════════════════════════════════════════════════════
    // COMPLETE
    // ═══════════════════════════════════════════════════════════════════
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║           🎉 Seed Process Completed Successfully!            ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log(`\n⏱️  Total time: ${duration} seconds`);
    console.log('\n📊 Summary:');
    console.log('  • Countries: 15 (Vietnam, Japan, Thailand, Indonesia, etc.)');
    console.log('  • Cities: 15+ major cities across Asia & Europe');
    console.log('  • Attractions: 22 tourist attractions');
    console.log('  • Itineraries: 3 detailed multi-day tour packages');
    console.log('  • Blog Posts: 10 travel articles');
    console.log('  • FAQs: 20 questions');
    console.log('  • Case Studies: 5 B2B operational examples');
    console.log('  • Pages: 7 static pages');
    console.log('  • Site Config: Header & Footer');
    console.log('  • Page Configs: 11 page settings');
    console.log('\n🔑 Admin Login:');
    console.log('  Email: admin@travel.com');
    console.log('  Password: admin123');
    console.log('\n💡 Note: Images use placeholder. Replace with real images in the CMS.');

  } catch (error) {
    console.error('\n❌ Seed process failed:', error);
    throw error;
  }
};

// Run the seed
masterSeed()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
