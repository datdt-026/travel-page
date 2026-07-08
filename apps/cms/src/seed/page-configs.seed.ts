import payload from 'payload';

/**
 * Page Configs Seed Data (All Global Page Configurations)
 * 
 * Run with:
 *   cd apps/cms && npx tsx src/seed/page-configs.seed.ts
 */

// ═══════════════════════════════════════════════════════════════════
// HOME PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const homePageData = {
  hero: {
    heading: {
      en: 'Your Trusted DMC Partner in Southeast Asia',
      vi: 'Đối Tác DMC Tin Cậy Tại Đông Nam Á',
    },
    subheading: {
      en: 'Creating authentic travel experiences for your clients since 2010',
      vi: 'Tạo nên những trải nghiệm du lịch đích thực cho khách hàng của bạn từ năm 2010',
    },
    backgroundImage: undefined, // Will be added manually
    ctaPrimary: {
      label: { en: 'Explore Itineraries', vi: 'Khám phá lịch trình' },
      url: '/itineraries',
    },
    ctaSecondary: {
      label: { en: 'Become a Partner', vi: 'Trở thành đối tác' },
      url: '/partner-inquiry',
    },
  },
  stats: [
    { number: '500+', label: { en: 'Partner Agencies', vi: 'Đại lý đối tác' } },
    { number: '40+', label: { en: 'Countries Served', vi: 'Quốc gia phục vụ' } },
    { number: '98%', label: { en: 'Satisfaction Rate', vi: 'Tỷ lệ hài lòng' } },
    { number: '15+', label: { en: 'Years Experience', vi: 'Năm kinh nghiệm' } },
  ],
  featuredDestinations: {
    heading: { en: 'Featured Destinations', vi: 'Điểm đến nổi bật' },
    subheading: { en: 'Discover our most popular destinations', vi: 'Khám phá những điểm đến được yêu thích nhất' },
    // destinations will be linked by ID
  },
  featuredItineraries: {
    heading: { en: 'Popular Itineraries', vi: 'Lịch trình phổ biến' },
    subheading: { en: 'Ready-to-sell tour packages for your clients', vi: 'Tour package sẵn sàng bán cho khách hàng của bạn' },
  },
  testimonials: {
    heading: { en: 'What Our Partners Say', vi: 'Đối tác nói về chúng tôi' },
    items: [
      {
        quote: { en: 'TravelSite has been our go-to DMC for Vietnam for over 5 years. Their attention to detail and 24/7 support is unmatched.', vi: 'TravelSite là đối tác DMC tại Việt Nam của chúng tôi suốt 5 năm qua. Sự chú ý đến chi tiết và hỗ trợ 24/7 của họ là không ai sánh được.' },
        author: 'Sarah Johnson',
        company: 'Adventure Tours UK',
        image: undefined,
      },
      {
        quote: { en: 'The team is incredibly responsive and their local knowledge is invaluable. Our clients always come back happy.', vi: 'Đội ngũ phản hồi cực kỳ nhanh và kiến thức địa phương của họ vô cùng quý giá. Khách hàng của chúng tôi luôn trở về với nụ cười.' },
        author: 'Michael Schmidt',
        company: 'Wanderlust Germany',
        image: undefined,
      },
      {
        quote: { en: 'Reliable, professional, and creative. TravelSite helps us deliver unique experiences that set us apart.', vi: 'Đáng tin cậy, chuyên nghiệp và sáng tạo. TravelSite giúp chúng tôi mang đến những trải nghiệm độc đáo tạo nên sự khác biệt.' },
        author: 'Marie Dubois',
        company: 'Voyages Excellence France',
        image: undefined,
      },
    ],
  },
  cta: {
    heading: { en: 'Ready to Partner with Us?', vi: 'Sẵn sàng hợp tác cùng chúng tôi?' },
    description: { en: 'Join 500+ travel agencies worldwide who trust TravelSite for their Southeast Asia programs.', vi: 'Tham gia cùng hơn 500 đại lý du lịch trên toàn thế giới tin tưởng TravelSite cho các chương trình Đông Nam Á.' },
    button: {
      label: { en: 'Get Started', vi: 'Bắt đầu ngay' },
      url: '/partner-inquiry',
    },
  },
  metaTitle: {
    en: 'TravelSite - B2B DMC Vietnam & Southeast Asia | Tour Operator Partner',
    vi: 'TravelSite - DMC B2B Việt Nam & Đông Nam Á | Đối tác điều hành tour',
  },
  metaDescription: {
    en: 'Leading B2B DMC for Vietnam & Southeast Asia. 500+ partners, 15+ years experience. FIT, Groups, MICE services with 24/7 support.',
    vi: 'DMC B2B hàng đầu cho Việt Nam & Đông Nam Á. 500+ đối tác, 15+ năm kinh nghiệm. Dịch vụ FIT, Đoàn, MICE với hỗ trợ 24/7.',
  },
};

// ═══════════════════════════════════════════════════════════════════
// ABOUT PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const aboutPageData = {
  hero: {
    heading: { en: 'About TravelSite', vi: 'Về TravelSite' },
    subheading: { en: 'Your journey, our passion', vi: 'Hành trình của bạn, niềm đam mê của chúng tôi' },
    backgroundImage: undefined,
  },
  story: {
    heading: { en: 'Our Story', vi: 'Câu chuyện của chúng tôi' },
    content: [
      {
        type: 'p',
        children: [{ text: 'Founded in 2010 in Hanoi, TravelSite began with a simple mission: to share the authentic beauty of Vietnam and Southeast Asia with the world. What started as a small team of passionate travel enthusiasts has grown into one of the region\'s most trusted DMC partners.' }],
      },
      {
        type: 'p',
        children: [{ text: 'Today, we work with over 500 travel agencies across 40 countries, organizing more than 10,000 tours annually. Our team of 50+ travel experts brings deep local knowledge and unwavering commitment to quality service.' }],
      },
    ],
  },
  values: [
    {
      title: { en: 'Authenticity', vi: 'Đích thực' },
      description: { en: 'We create genuine experiences that go beyond surface-level tourism', vi: 'Chúng tôi tạo ra trải nghiệm chân thực vượt xa du lịch bề nổi' },
      icon: 'heart',
    },
    {
      title: { en: 'Sustainability', vi: 'Bền vững' },
      description: { en: 'Committed to responsible travel that benefits local communities', vi: 'Cam kết du lịch có trách nhiệm mang lại lợi ích cho cộng đồng địa phương' },
      icon: 'leaf',
    },
    {
      title: { en: 'Partnership', vi: 'Đối tác' },
      description: { en: 'Your success is our success - we grow together', vi: 'Thành công của bạn là thành công của chúng tôi - cùng nhau phát triển' },
      icon: 'handshake',
    },
    {
      title: { en: 'Innovation', vi: 'Đổi mới' },
      description: { en: 'Continuously evolving to meet changing travel trends', vi: 'Liên tục phát triển để đáp ứng xu hướng du lịch thay đổi' },
      icon: 'lightbulb',
    },
  ],
  team: {
    heading: { en: 'Leadership Team', vi: 'Đội ngũ lãnh đạo' },
    members: [
      {
        name: 'Nguyen Van Minh',
        role: { en: 'Founder & CEO', vi: 'Người sáng lập & CEO' },
        bio: { en: '20+ years in travel industry, former VP at major tourism company', vi: '20+ năm trong ngành du lịch, cựu Phó Giám đốc công ty du lịch lớn' },
        image: undefined,
      },
      {
        name: 'Tran Thi Lan',
        role: { en: 'Head of Operations', vi: 'Trưởng phòng Vận hành' },
        bio: { en: 'Expert in DMC operations with 15 years experience', vi: 'Chuyên gia vận hành DMC với 15 năm kinh nghiệm' },
        image: undefined,
      },
      {
        name: 'David Chen',
        role: { en: 'Director of Partnerships', vi: 'Giám đốc Đối tác' },
        bio: { en: 'Built partner network across 40 countries', vi: 'Xây dựng mạng lưới đối tác tại 40 quốc gia' },
        image: undefined,
      },
    ],
  },
  metaTitle: {
    en: 'About TravelSite - Leading DMC Vietnam | Our Story & Team',
    vi: 'Về TravelSite - DMC hàng đầu Việt Nam | Câu chuyện & Đội ngũ',
  },
  metaDescription: {
    en: 'Learn about TravelSite - founded 2010, 500+ partners, 50+ team members. Our mission: authentic Southeast Asia experiences.',
    vi: 'Tìm hiểu về TravelSite - thành lập 2010, 500+ đối tác, 50+ thành viên. Sứ mệnh: trải nghiệm Đông Nam Á đích thực.',
  },
};

// ═══════════════════════════════════════════════════════════════════
// CONTACT PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const contactPageData = {
  hero: {
    heading: { en: 'Contact Us', vi: 'Liên hệ' },
    subheading: { en: 'We\'d love to hear from you', vi: 'Chúng tôi rất mong nhận được tin từ bạn' },
  },
  offices: [
    {
      name: { en: 'Hanoi Head Office', vi: 'Văn phòng chính Hà Nội' },
      address: { en: '15th Floor, Lotte Center, 54 Lieu Giai, Ba Dinh, Hanoi', vi: 'Tầng 15, Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội' },
      phone: '+84 24 1234 5678',
      email: 'hanoi@travelsite.com',
      hours: { en: 'Mon-Fri: 8:00 AM - 6:00 PM', vi: 'Thứ 2-6: 8:00 - 18:00' },
    },
    {
      name: { en: 'Ho Chi Minh City Office', vi: 'Văn phòng TP.HCM' },
      address: { en: '10th Floor, Bitexco Tower, 2 Hai Trieu, District 1, HCMC', vi: 'Tầng 10, Bitexco Tower, 2 Hải Triều, Quận 1, TP.HCM' },
      phone: '+84 28 9876 5432',
      email: 'hcmc@travelsite.com',
      hours: { en: 'Mon-Fri: 8:00 AM - 6:00 PM', vi: 'Thứ 2-6: 8:00 - 18:00' },
    },
    {
      name: { en: 'Bangkok Representative', vi: 'Đại diện Bangkok' },
      address: { en: 'Siam Square One, Pathum Wan, Bangkok', vi: 'Siam Square One, Pathum Wan, Bangkok' },
      phone: '+66 2 123 4567',
      email: 'bangkok@travelsite.com',
      hours: { en: 'Mon-Fri: 9:00 AM - 5:00 PM', vi: 'Thứ 2-6: 9:00 - 17:00' },
    },
  ],
  emergencyContact: {
    title: { en: '24/7 Emergency Support', vi: 'Hỗ trợ khẩn cấp 24/7' },
    phone: '+84 912 345 678',
    whatsapp: '+84 912 345 678',
    description: { en: 'For urgent matters during tours, contact our emergency line anytime.', vi: 'Các vấn đề khẩn cấp trong tour, liên hệ đường dây nóng bất cứ lúc nào.' },
  },
  form: {
    heading: { en: 'Send us a message', vi: 'Gửi tin nhắn cho chúng tôi' },
    submitButton: { en: 'Send Message', vi: 'Gửi tin nhắn' },
    successMessage: { en: 'Thank you! We\'ll get back to you within 24 hours.', vi: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi trong vòng 24 giờ.' },
  },
  metaTitle: { en: 'Contact TravelSite - Get in Touch | Offices in Vietnam & Thailand', vi: 'Liên hệ TravelSite - Văn phòng tại Việt Nam & Thái Lan' },
  metaDescription: { en: 'Contact TravelSite DMC. Offices in Hanoi, Ho Chi Minh City, Bangkok. 24/7 emergency support. Email: partners@travelsite.com', vi: 'Liên hệ TravelSite DMC. Văn phòng tại Hà Nội, TP.HCM, Bangkok. Hỗ trợ 24/7. Email: partners@travelsite.com' },
};

// ═══════════════════════════════════════════════════════════════════
// DESTINATIONS PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const destinationsPageData = {
  hero: {
    heading: { en: 'Destinations', vi: 'Điểm đến' },
    subheading: { en: 'Explore our curated collection of Southeast Asian destinations', vi: 'Khám phá bộ sưu tập điểm đến Đông Nam Á được tuyển chọn' },
    backgroundImage: undefined,
  },
  filterOptions: {
    regions: ['Southeast Asia', 'East Asia', 'Oceania', 'Europe'],
    travelStyles: ['Adventure', 'Cultural', 'Beach', 'Eco-tourism', 'Luxury'],
  },
  featuredSection: {
    heading: { en: 'Featured Countries', vi: 'Quốc gia nổi bật' },
    description: { en: 'Our most requested destinations with comprehensive DMC support', vi: 'Điểm đến được yêu cầu nhiều nhất với hỗ trợ DMC toàn diện' },
  },
  metaTitle: { en: 'Travel Destinations - Southeast Asia, Japan & More | TravelSite', vi: 'Điểm đến du lịch - Đông Nam Á, Nhật Bản & Thêm | TravelSite' },
  metaDescription: { en: 'Explore destinations: Vietnam, Thailand, Japan, Indonesia & more. Comprehensive DMC services for travel agencies.', vi: 'Khám phá điểm đến: Việt Nam, Thái Lan, Nhật Bản, Indonesia & hơn thế. Dịch vụ DMC toàn diện cho đại lý du lịch.' },
};

// ═══════════════════════════════════════════════════════════════════
// BLOG PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const blogPageData = {
  hero: {
    heading: { en: 'Travel Insights', vi: 'Góc nhìn du lịch' },
    subheading: { en: 'Industry news, destination guides, and travel tips for professionals', vi: 'Tin tức ngành, cẩm nang điểm đến và mẹo du lịch cho chuyên gia' },
  },
  categories: [
    { slug: 'destinations', label: { en: 'Destinations', vi: 'Điểm đến' } },
    { slug: 'travel-tips', label: { en: 'Travel Tips', vi: 'Mẹo du lịch' } },
    { slug: 'industry-news', label: { en: 'Industry News', vi: 'Tin ngành' } },
    { slug: 'guides', label: { en: 'Guides', vi: 'Cẩm nang' } },
    { slug: 'food-culture', label: { en: 'Food & Culture', vi: 'Ẩm thực & Văn hóa' } },
  ],
  newsletter: {
    heading: { en: 'Stay Updated', vi: 'Cập nhật mới nhất' },
    description: { en: 'Subscribe to our newsletter for the latest travel insights', vi: 'Đăng ký nhận bản tin để cập nhật thông tin du lịch mới nhất' },
    buttonLabel: { en: 'Subscribe', vi: 'Đăng ký' },
  },
  metaTitle: { en: 'Travel Blog - Industry Insights & Destination Guides | TravelSite', vi: 'Blog Du lịch - Góc nhìn ngành & Cẩm nang điểm đến | TravelSite' },
  metaDescription: { en: 'Expert travel insights for B2B partners. Destination guides, industry trends, and tips for Southeast Asia travel.', vi: 'Góc nhìn du lịch chuyên gia cho đối tác B2B. Cẩm nang điểm đến, xu hướng ngành và mẹo du lịch Đông Nam Á.' },
};

// ═══════════════════════════════════════════════════════════════════
// FAQ PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const faqPageData = {
  hero: {
    heading: { en: 'Frequently Asked Questions', vi: 'Câu hỏi thường gặp' },
    subheading: { en: 'Find answers to common questions about partnering with TravelSite', vi: 'Tìm câu trả lời cho các câu hỏi thường gặp về việc hợp tác với TravelSite' },
  },
  categories: [
    { slug: 'general', label: { en: 'General', vi: 'Chung' } },
    { slug: 'booking', label: { en: 'Booking & Payments', vi: 'Đặt tour & Thanh toán' } },
    { slug: 'services', label: { en: 'Services', vi: 'Dịch vụ' } },
    { slug: 'partnership', label: { en: 'Partnership', vi: 'Đối tác' } },
  ],
  contactCta: {
    heading: { en: 'Still have questions?', vi: 'Còn thắc mắc?' },
    description: { en: 'Our team is ready to help', vi: 'Đội ngũ chúng tôi sẵn sàng hỗ trợ' },
    buttonLabel: { en: 'Contact Us', vi: 'Liên hệ' },
    buttonUrl: '/contact',
  },
  metaTitle: { en: 'FAQ - Common Questions About TravelSite DMC Services', vi: 'FAQ - Câu hỏi thường gặp về dịch vụ TravelSite DMC' },
  metaDescription: { en: 'Answers to frequently asked questions about TravelSite B2B DMC services, booking process, payments, and partnerships.', vi: 'Trả lời các câu hỏi thường gặp về dịch vụ B2B DMC TravelSite, quy trình đặt tour, thanh toán và đối tác.' },
};

// ═══════════════════════════════════════════════════════════════════
// ITINERARIES PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const itinerariesPageData = {
  hero: {
    heading: { en: 'Tour Itineraries', vi: 'Lịch trình tour' },
    subheading: { en: 'Ready-to-sell tour packages for your clients', vi: 'Tour package sẵn sàng bán cho khách hàng của bạn' },
    backgroundImage: undefined,
  },
  filters: {
    destinations: true,
    duration: true,
    travelStyle: true,
    budget: true,
  },
  sortOptions: ['Newest', 'Duration', 'Price: Low to High', 'Price: High to Low', 'Most Popular'],
  callToAction: {
    heading: { en: 'Need a custom itinerary?', vi: 'Cần lịch trình tùy chỉnh?' },
    description: { en: 'Our team can create tailor-made tours for your specific requirements', vi: 'Đội ngũ chúng tôi có thể tạo tour thiết kế riêng theo yêu cầu cụ thể của bạn' },
    buttonLabel: { en: 'Request Custom Tour', vi: 'Yêu cầu tour tùy chỉnh' },
    buttonUrl: '/tailor-made',
  },
  metaTitle: { en: 'Tour Itineraries - Vietnam, Southeast Asia Packages | TravelSite', vi: 'Lịch trình tour - Gói tour Việt Nam, Đông Nam Á | TravelSite' },
  metaDescription: { en: 'Browse ready-to-sell tour itineraries for Vietnam & Southeast Asia. FIT and group packages with flexible customization.', vi: 'Duyệt lịch trình tour sẵn sàng bán cho Việt Nam & Đông Nam Á. Gói FIT và đoàn với tùy chỉnh linh hoạt.' },
};

// ═══════════════════════════════════════════════════════════════════
// EXPERTISE PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const expertisePageData = {
  hero: {
    heading: { en: 'Our Expertise', vi: 'Chuyên môn của chúng tôi' },
    subheading: { en: 'Specialized DMC services tailored to your needs', vi: 'Dịch vụ DMC chuyên biệt phù hợp với nhu cầu của bạn' },
  },
  services: [
    {
      title: { en: 'FIT Services', vi: 'Dịch vụ FIT' },
      description: { en: 'Personalized independent travel with private guides, drivers, and curated experiences.', vi: 'Du lịch cá nhân với hướng dẫn viên riêng, tài xế và trải nghiệm được tuyển chọn.' },
      features: ['Private transfers', 'Expert local guides', 'Flexible scheduling', 'Premium accommodations'],
      icon: 'user',
    },
    {
      title: { en: 'Group Tours', vi: 'Tour đoàn' },
      description: { en: 'Full-service group handling from 15 to 500+ participants.', vi: 'Xử lý đoàn trọn gói từ 15 đến 500+ khách.' },
      features: ['Logistics management', 'Exclusive venue access', 'Group activities', 'Multi-destination routes'],
      icon: 'users',
    },
    {
      title: { en: 'MICE', vi: 'MICE' },
      description: { en: 'Meetings, Incentives, Conferences & Events with end-to-end management.', vi: 'Hội nghị, Khen thưởng, Hội thảo & Sự kiện với quản lý từ đầu đến cuối.' },
      features: ['Venue sourcing', 'Team building', 'Gala dinners', 'Corporate programs'],
      icon: 'building',
    },
    {
      title: { en: 'Cruise Operations', vi: 'Điều hành du thuyền' },
      description: { en: 'Shore excursion management for cruise lines in Southeast Asian ports.', vi: 'Quản lý tham quan bờ cho các hãng du thuyền tại cảng Đông Nam Á.' },
      features: ['Port coordination', 'Excursion design', 'Emergency protocols', 'Multi-language guides'],
      icon: 'ship',
    },
  ],
  certifications: [
    { name: 'IATA Accredited Agent', year: '2015' },
    { name: 'VNAT Licensed Tour Operator', year: '2010' },
    { name: 'Travelife Partner', year: '2018' },
    { name: 'PATA Member', year: '2012' },
  ],
  metaTitle: { en: 'DMC Expertise - FIT, Groups, MICE, Cruise Operations | TravelSite', vi: 'Chuyên môn DMC - FIT, Đoàn, MICE, Du thuyền | TravelSite' },
  metaDescription: { en: 'TravelSite DMC expertise: FIT services, group tours, MICE, cruise operations. IATA accredited, 15+ years experience.', vi: 'Chuyên môn TravelSite DMC: dịch vụ FIT, tour đoàn, MICE, điều hành du thuyền. Chứng nhận IATA, 15+ năm kinh nghiệm.' },
};

// ═══════════════════════════════════════════════════════════════════
// SUSTAINABILITY PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const sustainabilityPageData = {
  hero: {
    heading: { en: 'Responsible Travel', vi: 'Du lịch có trách nhiệm' },
    subheading: { en: 'Our commitment to sustainable tourism', vi: 'Cam kết của chúng tôi với du lịch bền vững' },
    backgroundImage: undefined,
  },
  pillars: [
    {
      title: { en: 'Environmental Protection', vi: 'Bảo vệ môi trường' },
      description: { en: 'Reducing our carbon footprint and preserving natural habitats', vi: 'Giảm dấu chân carbon và bảo tồn môi trường sống tự nhiên' },
      initiatives: [
        'Carbon offset programs for all tours',
        'Plastic-free tour operations',
        'Support for conservation projects',
        'Eco-certified partners only',
      ],
    },
    {
      title: { en: 'Community Support', vi: 'Hỗ trợ cộng đồng' },
      description: { en: 'Empowering local communities through tourism', vi: 'Trao quyền cho cộng đồng địa phương thông qua du lịch' },
      initiatives: [
        'Local guide employment',
        'Community-based tourism projects',
        'Fair wages policy',
        'Education sponsorships',
      ],
    },
    {
      title: { en: 'Cultural Preservation', vi: 'Bảo tồn văn hóa' },
      description: { en: 'Protecting and celebrating local traditions', vi: 'Bảo vệ và tôn vinh truyền thống địa phương' },
      initiatives: [
        'Heritage site protection',
        'Traditional craft support',
        'Authentic cultural experiences',
        'Respectful tourism guidelines',
      ],
    },
  ],
  goals: {
    heading: { en: '2030 Sustainability Goals', vi: 'Mục tiêu bền vững 2030' },
    items: [
      { target: '100%', description: { en: 'Carbon neutral operations', vi: 'Hoạt động trung hòa carbon' } },
      { target: '0', description: { en: 'Single-use plastics', vi: 'Nhựa dùng một lần' } },
      { target: '50%', description: { en: 'Revenue to local communities', vi: 'Doanh thu cho cộng đồng địa phương' } },
      { target: '100%', description: { en: 'Certified sustainable suppliers', vi: 'Nhà cung cấp được chứng nhận bền vững' } },
    ],
  },
  metaTitle: { en: 'Sustainable Travel - Our Commitment | TravelSite', vi: 'Du lịch bền vững - Cam kết của chúng tôi | TravelSite' },
  metaDescription: { en: 'TravelSite sustainability commitment: carbon neutral, community support, cultural preservation. Travelife certified partner.', vi: 'Cam kết bền vững TravelSite: trung hòa carbon, hỗ trợ cộng đồng, bảo tồn văn hóa. Đối tác chứng nhận Travelife.' },
};

// ═══════════════════════════════════════════════════════════════════
// CASE STUDIES PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const caseStudiesPageData = {
  hero: {
    heading: { en: 'Case Studies', vi: 'Dự án mẫu' },
    subheading: { en: 'Real examples of successful partnerships', vi: 'Ví dụ thực tế về các đối tác thành công' },
  },
  categories: [
    { slug: 'fit', label: { en: 'FIT Programs', vi: 'Chương trình FIT' } },
    { slug: 'groups', label: { en: 'Group Tours', vi: 'Tour đoàn' } },
    { slug: 'mice', label: { en: 'MICE', vi: 'MICE' } },
    { slug: 'cruise', label: { en: 'Cruise', vi: 'Du thuyền' } },
  ],
  cta: {
    heading: { en: 'Want results like these?', vi: 'Muốn có kết quả như thế?' },
    description: { en: 'Let\'s discuss how we can help your business grow', vi: 'Hãy thảo luận cách chúng tôi có thể giúp doanh nghiệp của bạn phát triển' },
    buttonLabel: { en: 'Contact Us', vi: 'Liên hệ' },
    buttonUrl: '/contact',
  },
  metaTitle: { en: 'Case Studies - Successful Tourism Projects | TravelSite', vi: 'Dự án mẫu - Các dự án du lịch thành công | TravelSite' },
  metaDescription: { en: 'Explore TravelSite case studies: FIT programs, group tours, MICE events, cruise operations. Real results from real partnerships.', vi: 'Khám phá dự án mẫu TravelSite: chương trình FIT, tour đoàn, sự kiện MICE, điều hành du thuyền. Kết quả thực từ đối tác thực.' },
};

// ═══════════════════════════════════════════════════════════════════
// PARTNER INQUIRY PAGE CONFIG
// ═══════════════════════════════════════════════════════════════════
export const partnerInquiryPageData = {
  hero: {
    heading: { en: 'Become a Partner', vi: 'Trở thành đối tác' },
    subheading: { en: 'Join our global network of travel partners', vi: 'Tham gia mạng lưới đối tác du lịch toàn cầu của chúng tôi' },
  },
  benefits: [
    { title: { en: 'Competitive Rates', vi: 'Giá cạnh tranh' }, description: { en: 'Net rates with up to 20% discount', vi: 'Giá net với chiết khấu lên đến 20%' } },
    { title: { en: '24/7 Support', vi: 'Hỗ trợ 24/7' }, description: { en: 'Round-the-clock assistance', vi: 'Hỗ trợ xuyên suốt' } },
    { title: { en: 'Fast Response', vi: 'Phản hồi nhanh' }, description: { en: 'Quotes within 4-24 hours', vi: 'Báo giá trong 4-24 giờ' } },
    { title: { en: 'Local Expertise', vi: 'Chuyên gia địa phương' }, description: { en: '50+ travel experts', vi: '50+ chuyên gia du lịch' } },
  ],
  form: {
    heading: { en: 'Partner Application', vi: 'Đăng ký đối tác' },
    fields: ['Company name', 'Country', 'Contact person', 'Email', 'Phone', 'Website', 'Annual pax volume', 'How did you hear about us'],
    submitLabel: { en: 'Submit Application', vi: 'Gửi đơn đăng ký' },
    successMessage: { en: 'Thank you! Our partnership team will contact you within 48 hours.', vi: 'Cảm ơn! Đội ngũ đối tác sẽ liên hệ bạn trong vòng 48 giờ.' },
  },
  metaTitle: { en: 'Become a Partner - Join TravelSite B2B Network', vi: 'Trở thành đối tác - Tham gia mạng lưới B2B TravelSite' },
  metaDescription: { en: 'Apply to become a TravelSite partner. Competitive rates, 24/7 support, fast quotes. Join 500+ travel agencies worldwide.', vi: 'Đăng ký trở thành đối tác TravelSite. Giá cạnh tranh, hỗ trợ 24/7, báo giá nhanh. Tham gia cùng 500+ đại lý du lịch toàn cầu.' },
};

export const seedPageConfigs = async (): Promise<void> => {
  console.log('\n📑 Seeding Page Configs (Globals)...');

  const globalConfigs = [
    { slug: 'home-page', data: homePageData, name: 'Home Page' },
    { slug: 'about-page', data: aboutPageData, name: 'About Page' },
    { slug: 'contact-page', data: contactPageData, name: 'Contact Page' },
    { slug: 'destinations-page', data: destinationsPageData, name: 'Destinations Page' },
    { slug: 'blog-page', data: blogPageData, name: 'Blog Page' },
    { slug: 'faq-page', data: faqPageData, name: 'FAQ Page' },
    { slug: 'itineraries-page', data: itinerariesPageData, name: 'Itineraries Page' },
    { slug: 'expertise-page', data: expertisePageData, name: 'Expertise Page' },
    { slug: 'sustainability-page', data: sustainabilityPageData, name: 'Sustainability Page' },
    { slug: 'case-studies-page', data: caseStudiesPageData, name: 'Case Studies Page' },
    { slug: 'partner-inquiry-page', data: partnerInquiryPageData, name: 'Partner Inquiry Page' },
  ];

  for (const config of globalConfigs) {
    try {
      await payload.updateGlobal({
        slug: config.slug,
        data: config.data as any,
      });
      console.log(`  ✅ ${config.name} configured`);
    } catch (error: any) {
      console.error(`  ❌ Failed to configure ${config.name}:`, error.message);
    }
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

    await seedPageConfigs();
    console.log('\n✅ Page configs seeding completed!');
    process.exit(0);
  };

  run().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
}
