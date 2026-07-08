# Tổng Hợp Tính Năng Project Travel

Project này là một hệ thống website du lịch gồm 2 phần chính:

- **Web frontend**: website public để người dùng xem nội dung du lịch.
- **CMS admin**: hệ quản trị nội dung để admin/editor nhập và chỉnh sửa dữ liệu.

## Thông Tin Local

Khi chạy trên máy local hiện tại:

- Web frontend: `http://localhost:3004/vi`
- CMS admin: `http://localhost:3005/admin`
- CMS API: `http://localhost:3005/api`
- PostgreSQL: `localhost:5432`

Tài khoản CMS seed mặc định:

- Email: `admin@travel.com`
- Password: `admin123`

## Tech Stack

- **Frontend**: Next.js 14 App Router
- **CMS**: PayloadCMS 2
- **Database**: PostgreSQL
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Package manager**: pnpm theo cấu hình repo, nhưng local hiện tại đang cài riêng bằng npm để tránh lỗi dependency cũ
- **Docker**: dùng cho PostgreSQL dev và có cấu hình compose cho production

## Kiến Trúc Tổng Quan

Hệ thống hoạt động theo luồng:

1. Admin đăng nhập CMS.
2. Admin tạo/chỉnh sửa nội dung như countries, cities, attractions, itineraries, blog posts.
3. CMS lưu dữ liệu vào PostgreSQL.
4. Web frontend gọi REST API của CMS.
5. Người dùng xem nội dung du lịch trên website public.

Nói ngắn gọn: **CMS là nơi quản trị dữ liệu, frontend là nơi hiển thị dữ liệu đó cho khách truy cập**.

## Tính Năng Web Frontend

Web frontend nằm trong `apps/web`.

### Trang Public

Website có các nhóm trang chính:

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

### Nội Dung Du Lịch

Frontend hiển thị các loại nội dung du lịch:

- Quốc gia/destination nổi bật.
- Thành phố thuộc từng quốc gia.
- Địa điểm tham quan.
- Lịch trình du lịch theo số ngày, travel style, difficulty.
- Bài viết blog.
- Case studies.
- FAQ.

### Đa Ngôn Ngữ

Project có cấu trúc đa ngôn ngữ theo locale:

- `en`
- `vi`
- `fr`
- `de`

URL frontend dùng dạng:

- `/vi`
- `/en`
- `/fr`
- `/de`

Và các trang con ví dụ:

- `/vi/countries`
- `/vi/cities`
- `/vi/attractions`
- `/vi/itineraries`

### SEO

Frontend được thiết kế theo hướng SEO:

- Next.js server rendering/static generation.
- Metadata riêng cho từng trang.
- Sitemap.
- JSON-LD structured data.
- Route động cho detail pages.
- Tối ưu first load JS theo từng route.

### UI/UX

Giao diện có các thành phần:

- Header/navigation.
- Hero section.
- Featured destinations.
- Featured itineraries.
- Testimonial section.
- Footer.
- Newsletter form.
- Floating contact options.
- Responsive layout cho mobile/desktop.
- Animation và transition bằng Framer Motion.

### Form Và API Frontend

Frontend có các API route:

- `GET /api/health`: kiểm tra tình trạng web và CMS.
- `POST /api/contact`: xử lý form liên hệ.
- `POST /api/partner-inquiry`: xử lý form inquiry đối tác.

## Tính Năng CMS Admin

CMS nằm trong `apps/cms`.

### Quản Lý User

CMS có collection `Users` để quản lý tài khoản admin:

- Admin.
- Editor.
- Author.

### Quản Lý Media

CMS có collection `Media` để quản lý file upload:

- Hình ảnh.
- Alt text.
- Caption/credit.
- Media dùng cho countries, cities, attractions, itineraries và các page config.

Lưu ý local hiện tại có warning liên quan R2/cloud storage nếu chưa cấu hình biến môi trường R2.

### Quản Lý Nội Dung Du Lịch

CMS có các collection nội dung chính:

- `Countries`: quốc gia/điểm đến.
- `Cities`: thành phố.
- `Attractions`: địa điểm tham quan.
- `Itineraries`: lịch trình du lịch.
- `BlogPosts`: bài viết blog.
- `Pages`: trang nội dung tĩnh.
- `FAQs`: câu hỏi thường gặp.
- `CaseStudies`: case studies.
- `ContactSubmissions`: dữ liệu gửi từ form liên hệ.
- `PartnerInquiries`: dữ liệu gửi từ form đối tác.

### Quản Lý Cấu Hình Trang

CMS có các global/page config:

- Site header.
- Site footer.
- Homepage.
- Destinations page.
- Blog page.
- About page.
- Contact page.
- FAQ page.
- Itineraries page.
- Attractions page.
- Cities page.
- Countries page.
- Detail page configs cho country/city/attraction/itinerary.
- Expertise page.
- Sustainability page.
- Case studies page.
- Partners page.
- Partner inquiry page.

### Localization Trong CMS

CMS hỗ trợ localization cho nội dung với các locale:

- English: `en`
- Tiếng Việt: `vi`
- Français: `fr`
- Deutsch: `de`

Nội dung có thể có bản dịch theo từng ngôn ngữ và fallback về ngôn ngữ mặc định.

### REST API

CMS expose REST API cho frontend sử dụng:

- `GET /api/countries`
- `GET /api/cities`
- `GET /api/attractions`
- `GET /api/itineraries`
- `GET /api/blog-posts`
- `GET /api/faqs`
- `GET /api/pages`

Frontend gọi các API này qua biến môi trường:

```bash
NEXT_PUBLIC_CMS_URL=http://localhost:3005
```

## Dữ Liệu Seed Mẫu

Seed script tạo dữ liệu mẫu để test giao diện:

- 1 admin user.
- Nhiều countries: Japan, France, Thailand, Italy, Vietnam.
- Nhiều cities: Tokyo, Kyoto, Paris, Bangkok, Rome, Hanoi, Da Nang, Hoi An...
- Nhiều attractions.
- Nhiều itineraries.

Sau khi seed, frontend có thể hiển thị danh sách countries và itineraries trên trang chủ.

## Docker Và Local Development

Docker hiện được dùng tốt nhất cho PostgreSQL dev:

```bash
docker compose -f docker-compose.dev.yml up -d
```

Sau đó chạy CMS:

```bash
cd apps/cms
npm run dev
```

Và chạy web:

```bash
cd apps/web
npm run start
```

## Lưu Ý Kỹ Thuật Hiện Tại

- Web frontend đang chạy ở port `3004`.
- CMS admin đang chạy ở port `3005`.
- README/DOCKER.md có một số nơi vẫn ghi port cũ `3000` và `3001`.
- Docker production config cần được đồng bộ lại nếu muốn chạy full stack bằng Docker.
- Dependency `drizzle-kit` canary cũ của Payload Postgres adapter đã bị remove khỏi npm, nên local hiện tại có workaround để CMS chạy được.
- Nếu xoá `node_modules` và cài lại từ đầu, cần xử lý lại phần dependency/override của CMS.

## Tóm Tắt Ngắn

Project này là một nền tảng website du lịch SEO-ready:

- **CMS** giúp đội ngũ content quản lý điểm đến, thành phố, attraction, lịch trình, blog và page config.
- **Web frontend** hiển thị các nội dung đó thành website đa ngôn ngữ, responsive, tối ưu SEO.
- **Database PostgreSQL** lưu trữ toàn bộ nội dung.
- **Docker** hỗ trợ chạy database local và có sẵn cấu hình cho hướng production.
