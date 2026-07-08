# Báo Cáo Tổng Thể Dự Án Travel

Ngày lập báo cáo: 05/07/2026

## 1. Tổng Quan

Dự án Travel là một nền tảng website du lịch theo mô hình monorepo, được xây dựng để phục vụ nhu cầu hiển thị nội dung du lịch đa ngôn ngữ, tối ưu SEO và quản trị nội dung qua CMS.

Hệ thống gồm 2 phần chính:

- **Web frontend**: website public cho người dùng cuối, hiển thị điểm đến, thành phố, địa điểm tham quan, lịch trình, blog, case studies và các trang B2B.
- **CMS admin**: hệ quản trị nội dung cho admin/editor nhập liệu, chỉnh sửa nội dung, cấu hình trang và quản lý dữ liệu gửi từ form.

Mục tiêu chính của dự án là tạo một website du lịch có khả năng mở rộng nội dung lớn, dễ quản trị, hỗ trợ nhiều ngôn ngữ và thân thiện với SEO.

## 2. Kiến Trúc Hệ Thống

Luồng hoạt động tổng quát:

```text
Admin / Editor
    |
    v
PayloadCMS Admin
    |
    v
PostgreSQL
    |
    v
PayloadCMS REST API
    |
    v
Next.js Web Frontend
    |
    v
Người dùng cuối
```

Trong kiến trúc này:

- CMS là nơi quản trị dữ liệu và cấu hình nội dung.
- PostgreSQL là nơi lưu trữ dữ liệu chính.
- Frontend gọi REST API từ CMS để render nội dung.
- Next.js xử lý routing, metadata, render giao diện và tối ưu SEO.
- Media có thể được lưu qua Cloudflare R2 trong môi trường production.

## 3. Công Nghệ Sử Dụng

| Nhóm | Công nghệ |
| --- | --- |
| Monorepo | pnpm workspace |
| Frontend | Next.js 14 App Router, React 18, TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| CMS | PayloadCMS 2 |
| Database | PostgreSQL |
| Rich text | Slate editor |
| Media storage | Cloudflare R2/S3-compatible storage |
| Test | Playwright E2E |
| DevOps | Docker Compose, Nginx, GitHub Actions |

## 4. Cấu Trúc Thư Mục Chính

```text
travel-main/
+-- apps/
|   +-- web/                  # Next.js public website
|   |   +-- src/app/           # App Router pages và API routes
|   |   +-- src/components/    # React components
|   |   +-- src/lib/           # API client, SEO helpers
|   |   +-- src/i18n/          # Cấu hình đa ngôn ngữ
|   |   +-- e2e/               # Playwright tests
|   |
|   +-- cms/                  # PayloadCMS backend
|       +-- src/collections/   # Collections nội dung
|       +-- src/globals/       # Cấu hình global/page config
|       +-- src/blocks/        # Content blocks
|       +-- src/seed/          # Seed dữ liệu mẫu
|       +-- src/migrations/    # Database migrations
|       +-- src/payload.config.ts
|
+-- docs/                     # Tài liệu dự án
+-- screenshots/              # Ảnh chụp UI
+-- docker-compose.yml         # Compose production
+-- docker-compose.dev.yml     # PostgreSQL cho local dev
+-- nginx/                     # Cấu hình reverse proxy
+-- package.json               # Root workspace scripts
+-- pnpm-workspace.yaml
```

## 5. Phân Hệ Web Frontend

Frontend nằm tại `apps/web` và là website public hướng đến người dùng cuối.

### Nhóm trang chính

- Trang chủ.
- Trang giới thiệu.
- Trang liên hệ.
- Trang FAQ.
- Trang destinations.
- Trang countries.
- Trang cities.
- Trang attractions.
- Trang itineraries.
- Trang blog.
- Trang case studies.
- Trang expertise.
- Trang sustainability.
- Trang partners.
- Trang partner inquiry.

### Route tiêu biểu

```text
/{locale}
/{locale}/about
/{locale}/contact
/{locale}/faq
/{locale}/destinations
/{locale}/destinations/[country]
/{locale}/destinations/[country]/[city]
/{locale}/destinations/[country]/[city]/[itinerary]
/{locale}/countries
/{locale}/countries/[slug]
/{locale}/cities
/{locale}/cities/[slug]
/{locale}/attractions
/{locale}/attractions/[slug]
/{locale}/itineraries
/{locale}/itineraries/[slug]
/{locale}/blog
/{locale}/blog/[slug]
/{locale}/case-studies
/{locale}/case-studies/[slug]
/{locale}/expertise
/{locale}/sustainability
/{locale}/partners
/{locale}/partners/inquiry
```

### API route frontend

- `GET /api/health`: kiểm tra trạng thái frontend và CMS.
- `POST /api/contact`: xử lý form liên hệ.
- `POST /api/partner-inquiry`: xử lý form inquiry đối tác.

## 6. Phân Hệ CMS Admin

CMS nằm tại `apps/cms`, sử dụng PayloadCMS để quản lý dữ liệu nội dung và cấu hình website.

### Collections chính

- `Users`: tài khoản admin/editor/author.
- `Media`: quản lý hình ảnh, alt text, caption, credit.
- `Countries`: dữ liệu quốc gia/điểm đến.
- `Cities`: dữ liệu thành phố.
- `Attractions`: địa điểm tham quan.
- `Itineraries`: lịch trình du lịch.
- `BlogPosts`: bài viết blog.
- `Pages`: trang nội dung tĩnh.
- `FAQs`: câu hỏi thường gặp.
- `CaseStudies`: case studies.
- `ContactSubmissions`: dữ liệu gửi từ form liên hệ.
- `PartnerInquiries`: dữ liệu gửi từ form đối tác.

### Globals và page config

CMS có nhiều global config để admin có thể điều chỉnh nội dung từng trang mà không cần sửa code:

- Site header.
- Site footer.
- Homepage.
- Destinations page.
- Blog page.
- About page.
- Contact page.
- FAQ page.
- Countries, cities, attractions, itineraries listing pages.
- Detail config cho country, city, attraction, itinerary.
- Expertise page.
- Sustainability page.
- Case studies page.
- Partners page.
- Partner inquiry page.

## 7. Đa Ngôn Ngữ

Dự án hỗ trợ 4 ngôn ngữ:

| Locale | Ngôn ngữ |
| --- | --- |
| `en` | English |
| `vi` | Tiếng Việt |
| `fr` | Français |
| `de` | Deutsch |

Frontend dùng cấu trúc URL theo locale, ví dụ:

- `/vi`
- `/vi/countries`
- `/vi/itineraries`
- `/fr/destinations`
- `/de/blog`

CMS cũng bật localization, cho phép nhiều field nội dung có bản dịch theo từng locale và fallback về `en` khi thiếu bản dịch.

## 8. SEO Và Hiệu Năng

Frontend được thiết kế theo hướng SEO-ready:

- Sử dụng Next.js App Router.
- Server rendering/static generation cho các trang nội dung.
- Dynamic metadata theo từng trang.
- Canonical URL và hreflang cho đa ngôn ngữ.
- JSON-LD structured data cho các trang phù hợp.
- Sitemap-ready.
- Fetch dữ liệu CMS với cơ chế revalidate theo thời gian.
- Route động cho detail pages như country, city, attraction, itinerary và blog post.

## 9. Dữ Liệu Và API

Frontend gọi CMS thông qua REST API, cấu hình bằng biến môi trường:

```bash
NEXT_PUBLIC_CMS_URL=http://localhost:3005
```

Các endpoint CMS tiêu biểu:

- `GET /api/countries`
- `GET /api/cities`
- `GET /api/attractions`
- `GET /api/itineraries`
- `GET /api/blog-posts`
- `GET /api/faqs`
- `GET /api/pages`
- `GET /api/case-studies`
- `GET /api/globals/{global-slug}`

Các request có thể truyền `locale`, `fallback-locale`, `depth`, `limit`, `page` và điều kiện `where` theo chuẩn PayloadCMS.

## 10. Dữ Liệu Seed Mẫu

Seed script của CMS hỗ trợ tạo dữ liệu mẫu để kiểm thử giao diện và luồng dữ liệu.

Dữ liệu seed bao gồm:

- Tài khoản admin mặc định.
- Countries như Japan, France, Thailand, Italy, Vietnam.
- Cities như Tokyo, Kyoto, Paris, Bangkok, Rome, Hanoi, Da Nang, Hoi An.
- Attractions.
- Itineraries.
- Blog posts.
- Case studies.
- Site config/page config.

Tài khoản seed mặc định:

```text
Email: admin@travel.com
Password: admin123
```

Lưu ý: tài khoản và mật khẩu seed chỉ phù hợp cho môi trường local/dev, không dùng cho production.

## 11. Hướng Dẫn Chạy Local

### Thông tin local hiện tại

| Service | URL |
| --- | --- |
| Web frontend | `http://localhost:3004/vi` |
| CMS admin | `http://localhost:3005/admin` |
| CMS API | `http://localhost:3005/api` |
| PostgreSQL | `localhost:5432` |

### Chạy frontend only

Dùng khi chỉ cần xem UI web, không cần CMS hoặc database:

```bash
cd apps/web
npm install --no-package-lock --workspaces=false
npm run dev
```

Mở:

```text
http://localhost:3004/vi
```

Nếu CMS không chạy, frontend vẫn có thể load giao diện fallback/static, nhưng một số dữ liệu CMS-driven như header, footer hoặc home config có thể thiếu.

### Chạy PostgreSQL local

```bash
docker compose -f docker-compose.dev.yml up -d
```

### Các lệnh workspace dự kiến

```bash
pnpm install
pnpm dev:cms
pnpm dev:web
pnpm dev
pnpm seed
pnpm build
pnpm start
pnpm lint
pnpm typecheck
```

## 12. Build, Test Và CI

Root `package.json` cung cấp các nhóm script chính:

- Migration CMS: `pnpm migrate:cms`, `pnpm migrate:cms:status`, `pnpm migrate:cms:create`.
- Development: `pnpm dev:cms`, `pnpm dev:web`, `pnpm dev`.
- Build: `pnpm build:cms`, `pnpm build:web`, `pnpm build`.
- Production: `pnpm start:cms`, `pnpm start:web`, `pnpm start`.
- Utilities: `pnpm seed`, `pnpm lint`, `pnpm typecheck`, `pnpm clean`.

Frontend có Playwright E2E tests trong `apps/web/e2e`.

CI hiện có cấu hình GitHub Actions để chạy các bước kiểm tra cơ bản như lint, typecheck và build. E2E có trong repo nhưng cần kiểm tra pipeline thực tế nếu muốn bắt buộc chạy trong CI.

## 13. Triển Khai Production

Dự án có sẵn cấu hình phục vụ production:

- `docker-compose.yml` cho web và CMS.
- `nginx/nginx.conf` cho reverse proxy.
- Biến môi trường mẫu trong `.env.example` và `.env.docker.example`.
- Cloudflare R2/S3-compatible storage cho media.

Các biến môi trường quan trọng:

```bash
DATABASE_URL=postgresql://user:password@host:5432/travel_cms
PAYLOAD_SECRET=your-production-secret-minimum-32-characters
PAYLOAD_PUBLIC_SERVER_URL=https://cms.yourdomain.com
NEXT_PUBLIC_CMS_URL=https://cms.yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
R2_BUCKET=your-r2-bucket
R2_ACCESS_KEY=your-r2-access-key
R2_SECRET_KEY=your-r2-secret-key
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://media.yourdomain.com
```

## 14. Ghi Chú Kỹ Thuật Hiện Tại

- Local hiện tại dùng web port `3004` và CMS port `3005`; một số tài liệu cũ vẫn ghi `3000` và `3001`.
- `apps/web/src/lib/api.ts` có fallback CMS URL là `http://localhost:3001`, nhưng local docs hiện đang dùng `http://localhost:3005` qua `.env.local`.
- Root workspace dùng `pnpm`, nhưng tài liệu local hiện ghi workaround chạy frontend bằng `npm` để tránh lỗi dependency cũ.
- Dependency `drizzle-kit@0.20.14-1f2c838` trong chuỗi dependency của Payload Postgres adapter có thể không còn install được từ npm.
- CMS có cấu hình `PAYLOAD_DB_PUSH=true` để hỗ trợ bootstrap schema local khi migration dependency gặp vấn đề.
- Cloudflare R2 cần được cấu hình đầy đủ trong production; nếu thiếu biến môi trường R2, upload media có thể lỗi hoặc cảnh báo.
- Docker production config cần được rà soát lại theo domain, network, database service và biến môi trường thực tế trước khi deploy.
- Seed password mặc định và fallback secret không được dùng trong production.

## 15. Đánh Giá Tổng Thể

Dự án đã có nền tảng tương đối đầy đủ cho một website du lịch đa ngôn ngữ, bao gồm frontend public, CMS quản trị nội dung, database, seed data, API integration, SEO, route động và tài liệu local.

Điểm mạnh:

- Kiến trúc monorepo rõ ràng, tách biệt web và CMS.
- Domain nội dung du lịch được mô hình hóa đầy đủ.
- Có hỗ trợ đa ngôn ngữ từ cả frontend và CMS.
- Frontend có nhiều trang public và B2B đã được triển khai.
- CMS có collections và globals phong phú, phù hợp cho đội content vận hành.
- Có sẵn hướng triển khai bằng Docker/Nginx.

Các hạng mục nên ưu tiên hoàn thiện:

- Đồng bộ lại toàn bộ tài liệu về port, lệnh chạy và trạng thái dependency hiện tại.
- Xử lý dứt điểm vấn đề dependency `drizzle-kit` để root `pnpm install` ổn định.
- Kiểm tra lại Docker production compose, database service, network và domain hardcode.
- Thiết lập R2 hoặc chiến lược media storage rõ ràng cho từng môi trường.
- Tăng độ tin cậy CI bằng typecheck/build đầy đủ và cân nhắc chạy Playwright E2E cho các route quan trọng.
- Đổi toàn bộ secret/password mặc định trước khi triển khai production.

## 16. Kết Luận

Travel là một dự án website du lịch SEO-ready, CMS-driven và đa ngôn ngữ. Kiến trúc hiện tại phù hợp để phát triển thành một nền tảng nội dung du lịch quy mô lớn, nơi đội vận hành có thể quản lý dữ liệu qua CMS và frontend tự động hiển thị nội dung theo từng ngôn ngữ, từng loại trang và từng route động.

Trước khi đưa vào production, dự án cần được rà soát thêm về cấu hình môi trường, dependency install, Docker deployment, media storage, bảo mật secret và độ phủ kiểm thử.
