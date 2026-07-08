import payload from 'payload';

/**
 * Users Seed Data
 * 
 * Creates admin and test users for the CMS
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/users.seed.ts
 */

export const usersData = [
  {
    email: 'admin@travel.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
  },
  {
    email: 'editor@travel.com', 
    password: 'editor123',
    firstName: 'Editor',
    lastName: 'User',
  },
  {
    email: 'content@travel.com',
    password: 'content123', 
    firstName: 'Content',
    lastName: 'Manager',
  },
];

export const seedUsers = async (): Promise<number | undefined> => {
  console.log('\n👤 Seeding Users...');

  let adminUserId: number | undefined;

  for (const userData of usersData) {
    try {
      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: userData.email } },
      });

      if (existing.docs.length > 0) {
        console.log(`  ⏭️ User already exists: ${userData.email}`);
        if (userData.email === 'admin@travel.com') {
          adminUserId = existing.docs[0].id as number;
        }
      } else {
        const created = await payload.create({
          collection: 'users',
          data: userData as any,
        });
        console.log(`  ✅ Created: ${userData.email}`);
        if (userData.email === 'admin@travel.com') {
          adminUserId = created.id as number;
        }
      }
    } catch (error: any) {
      console.error(`  ❌ Failed to seed ${userData.email}:`, error.message);
    }
  }

  console.log(`  📊 Total users: ${usersData.length}`);
  return adminUserId;
};

if (require.main === module) {
  require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
  
  payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    local: true,
  }).then(async () => {
    const adminId = await seedUsers();
    console.log(`\n✅ Users seeding complete! Admin ID: ${adminId}`);
    process.exit(0);
  }).catch((error) => {
    console.error('Failed to seed users:', error);
    process.exit(1);
  });
}
