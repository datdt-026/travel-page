import payload from 'payload';

/**
 * Site Config Seed Data (Header & Footer)
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/site-config.seed.ts
 */

export const siteHeaderData = {
  logo: undefined, // Will be added manually
  logoAlt: 'TravelSite - DMC Vietnam & Southeast Asia',
  navigation: [
    {
      label: { en: 'Destinations', vi: 'Điểm đến' },
      type: 'dropdown' as const,
      children: [
        { label: { en: 'Vietnam', vi: 'Việt Nam' }, url: '/destinations/vietnam' },
        { label: { en: 'Japan', vi: 'Nhật Bản' }, url: '/destinations/japan' },
        { label: { en: 'Thailand', vi: 'Thái Lan' }, url: '/destinations/thailand' },
        { label: { en: 'Indonesia', vi: 'Indonesia' }, url: '/destinations/indonesia' },
        { label: { en: 'All Destinations', vi: 'Tất cả điểm đến' }, url: '/destinations' },
      ],
    },
    {
      label: { en: 'Itineraries', vi: 'Lịch trình' },
      type: 'dropdown' as const,
      children: [
        { label: { en: 'Vietnam Tours', vi: 'Tour Việt Nam' }, url: '/itineraries?country=vietnam' },
        { label: { en: 'Multi-country', vi: 'Liên tuyến' }, url: '/itineraries?type=multi-country' },
        { label: { en: 'Tailor-made', vi: 'Thiết kế riêng' }, url: '/tailor-made' },
        { label: { en: 'All Itineraries', vi: 'Tất cả lịch trình' }, url: '/itineraries' },
      ],
    },
    {
      label: { en: 'Services', vi: 'Dịch vụ' },
      type: 'dropdown' as const,
      children: [
        { label: { en: 'FIT Services', vi: 'Dịch vụ FIT' }, url: '/services/fit' },
        { label: { en: 'Group Tours', vi: 'Tour đoàn' }, url: '/services/group-tours' },
        { label: { en: 'MICE', vi: 'MICE' }, url: '/services/mice' },
        { label: { en: 'Cruise Operations', vi: 'Du thuyền' }, url: '/services/cruise' },
      ],
    },
    {
      label: { en: 'About', vi: 'Về chúng tôi' },
      type: 'dropdown' as const,
      children: [
        { label: { en: 'Our Story', vi: 'Câu chuyện' }, url: '/about' },
        { label: { en: 'Expertise', vi: 'Chuyên môn' }, url: '/expertise' },
        { label: { en: 'Sustainability', vi: 'Phát triển bền vững' }, url: '/sustainability' },
        { label: { en: 'Case Studies', vi: 'Dự án mẫu' }, url: '/case-studies' },
        { label: { en: 'Team', vi: 'Đội ngũ' }, url: '/team' },
      ],
    },
    {
      label: { en: 'Resources', vi: 'Tài nguyên' },
      type: 'dropdown' as const,
      children: [
        { label: { en: 'Blog', vi: 'Blog' }, url: '/blog' },
        { label: { en: 'Travel Guides', vi: 'Cẩm nang' }, url: '/guides' },
        { label: { en: 'FAQ', vi: 'Câu hỏi thường gặp' }, url: '/faq' },
        { label: { en: 'Downloads', vi: 'Tải xuống' }, url: '/downloads' },
      ],
    },
    {
      label: { en: 'Contact', vi: 'Liên hệ' },
      type: 'link' as const,
      url: '/contact',
    },
  ],
  ctaButton: {
    label: { en: 'Partner Portal', vi: 'Cổng đối tác' },
    url: '/partner-portal',
    style: 'primary' as const,
  },
  topBar: {
    enabled: true,
    message: {
      en: '🌏 New: Japan Cherry Blossom 2025 - Early Bird 15% OFF | Contact us now!',
      vi: '🌏 Mới: Tour Nhật Bản mùa hoa anh đào 2025 - Giảm 15% đặt sớm | Liên hệ ngay!',
    },
    backgroundColor: '#1a365d',
    textColor: '#ffffff',
  },
};

export const siteFooterData = {
  logo: undefined, // Will be added manually
  tagline: {
    en: 'Your trusted DMC partner for authentic travel experiences in Vietnam & Southeast Asia',
    vi: 'Đối tác DMC tin cậy cho trải nghiệm du lịch đích thực tại Việt Nam & Đông Nam Á',
  },
  columns: [
    {
      title: { en: 'Destinations', vi: 'Điểm đến' },
      links: [
        { label: { en: 'Vietnam', vi: 'Việt Nam' }, url: '/destinations/vietnam' },
        { label: { en: 'Japan', vi: 'Nhật Bản' }, url: '/destinations/japan' },
        { label: { en: 'Thailand', vi: 'Thái Lan' }, url: '/destinations/thailand' },
        { label: { en: 'Indonesia', vi: 'Indonesia' }, url: '/destinations/indonesia' },
        { label: { en: 'Cambodia', vi: 'Campuchia' }, url: '/destinations/cambodia' },
      ],
    },
    {
      title: { en: 'Services', vi: 'Dịch vụ' },
      links: [
        { label: { en: 'FIT Services', vi: 'Dịch vụ FIT' }, url: '/services/fit' },
        { label: { en: 'Group Tours', vi: 'Tour đoàn' }, url: '/services/group-tours' },
        { label: { en: 'MICE & Events', vi: 'MICE & Sự kiện' }, url: '/services/mice' },
        { label: { en: 'Tailor-made Tours', vi: 'Tour thiết kế riêng' }, url: '/tailor-made' },
        { label: { en: 'Cruise Operations', vi: 'Điều hành du thuyền' }, url: '/services/cruise' },
      ],
    },
    {
      title: { en: 'Company', vi: 'Công ty' },
      links: [
        { label: { en: 'About Us', vi: 'Về chúng tôi' }, url: '/about' },
        { label: { en: 'Our Team', vi: 'Đội ngũ' }, url: '/team' },
        { label: { en: 'Sustainability', vi: 'Phát triển bền vững' }, url: '/sustainability' },
        { label: { en: 'Career', vi: 'Tuyển dụng' }, url: '/career' },
        { label: { en: 'Contact', vi: 'Liên hệ' }, url: '/contact' },
      ],
    },
    {
      title: { en: 'Resources', vi: 'Tài nguyên' },
      links: [
        { label: { en: 'Blog', vi: 'Blog' }, url: '/blog' },
        { label: { en: 'FAQ', vi: 'Câu hỏi thường gặp' }, url: '/faq' },
        { label: { en: 'Partner Portal', vi: 'Cổng đối tác' }, url: '/partner-portal' },
        { label: { en: 'Booking Process', vi: 'Quy trình đặt tour' }, url: '/booking-process' },
        { label: { en: 'Emergency Support', vi: 'Hỗ trợ khẩn cấp' }, url: '/emergency-support' },
      ],
    },
  ],
  contact: {
    address: {
      en: '15th Floor, Lotte Center Hanoi, 54 Lieu Giai, Ba Dinh, Hanoi, Vietnam',
      vi: 'Tầng 15, Lotte Center Hà Nội, 54 Liễu Giai, Ba Đình, Hà Nội, Việt Nam',
    },
    phone: '+84 24 1234 5678',
    email: 'partners@travelsite.com',
    emergencyPhone: '+84 912 345 678',
  },
  social: {
    facebook: 'https://facebook.com/travelsite',
    instagram: 'https://instagram.com/travelsite',
    linkedin: 'https://linkedin.com/company/travelsite',
    youtube: 'https://youtube.com/@travelsite',
    twitter: 'https://twitter.com/travelsite',
  },
  bottomBar: {
    copyright: {
      en: '© 2025 TravelSite. All rights reserved.',
      vi: '© 2025 TravelSite. Bảo lưu mọi quyền.',
    },
    links: [
      { label: { en: 'Terms of Service', vi: 'Điều khoản dịch vụ' }, url: '/terms-of-service' },
      { label: { en: 'Privacy Policy', vi: 'Chính sách bảo mật' }, url: '/privacy-policy' },
      { label: { en: 'Cookie Policy', vi: 'Chính sách cookie' }, url: '/cookie-policy' },
    ],
  },
  certifications: [
    {
      name: { en: 'IATA Accredited', vi: 'Chứng nhận IATA' },
      image: undefined, // Will be added manually
    },
    {
      name: { en: 'VNAT Licensed', vi: 'Giấy phép VNAT' },
      image: undefined,
    },
    {
      name: { en: 'Travelife Certified', vi: 'Chứng nhận Travelife' },
      image: undefined,
    },
  ],
};

export const seedSiteConfig = async (): Promise<void> => {
  console.log('\n🔧 Seeding Site Config (Header & Footer)...');

  // Seed Site Header
  try {
    await payload.updateGlobal({
      slug: 'site-header',
      data: siteHeaderData as any,
    });
    console.log('  ✅ Site Header configured');
  } catch (error: any) {
    console.error('  ❌ Failed to configure Site Header:', error.message);
  }

  // Seed Site Footer
  try {
    await payload.updateGlobal({
      slug: 'site-footer',
      data: siteFooterData as any,
    });
    console.log('  ✅ Site Footer configured');
  } catch (error: any) {
    console.error('  ❌ Failed to configure Site Footer:', error.message);
  }
};

// Standalone execution
if (require.main === module) {
  const run = async () => {
    const path = require('path');
    const dotenv = require('dotenv');
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me-in-production',
      local: true,
    });

    await seedSiteConfig();
    console.log('\n✅ Site config seeding completed!');
    process.exit(0);
  };

  run().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
}
