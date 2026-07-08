# KẾ HOẠCH HOÀN THIỆN WEBSITE DU LỊCH

# (VIETWAY TRAVEL SEO MONOREPO)

Tài liệu này phác thảo kế hoạch chi tiết để chuyển đổi website từ trạng thái chạy dữ liệu tĩnh (Mock Data) sang trạng thái vận hành thực tế (Production-Ready) với hệ quản trị nội dung (CMS) và Cơ sở dữ liệu (PostgreSQL) kết nối hoàn chỉnh.

## 1. Đánh giá trạng thái hiện tại

Frontend (Next.js 14): Đang hoạt động tốt trên port 3004. Hiện tại đã được cấu hình tạm thời chạy qua cơ chế Mock API (src/lib/api.ts) để đọc dữ liệu từ tệp tĩnh (src/lib/mockData.ts) giúp hiển thị giao diện đầy đủ.

Backend (PayloadCMS 2): Cấu hình đã sẵn sàng nhưng chưa thể khởi động do chưa thiết lập kết nối tới CSDL PostgreSQL.

CSDL (PostgreSQL): Chưa có hệ thống CSDL vật lý (máy chủ hoặc Docker) chạy để phục vụ lưu trữ dữ liệu thực tế.

Lưu trữ tài nguyên (Media Storage): Chưa liên kết với dịch vụ lưu trữ đám mây (Cloudflare R2 / AWS S3) để lưu trữ hình ảnh tải lên từ admin panel.

## 2. Danh sách các đầu mục cần hoàn thiện (To-Do List)

### A. Hạ Tầng & CSDL (Infrastructure & Database)

Khởi tạo cơ sở dữ liệu: Thiết lập một máy chủ PostgreSQL 14+ (có thể dùng Supabase, Neon.tech, AWS RDS để quản lý dễ dàng hoặc tự chạy Docker/Cài đặt local).

Cấu hình biến môi trường (.env): Cập nhật DATABASE_URL chính xác ở cả gốc và các thư mục ứng dụng con.

Đồng bộ hóa Schema & Migration:

Chạy migrations của Drizzle ORM trong PayloadCMS để tự động khởi tạo cấu trúc bảng dữ liệu (Users, Countries, Cities, Attractions, Itineraries, Pages, v.v.).

Seed dữ liệu gốc: Chạy tập lệnh seed (pnpm run seed) để chuyển đổi dữ liệu từ các file mock tĩnh vào PostgreSQL thực tế.

### B. Liên kết hệ thống (Integration & CMS Restoring)

Khôi phục API kết nối thực tế:

Thay thế tệp apps/web/src/lib/api.ts bằng phiên bản gốc (đang được lưu tại api.ts.bak) để ứng dụng Next.js thực hiện các yêu cầu HTTP fetch trực tiếp tới PayloadCMS API (http://localhost:3005/api/...).

Cấu hình Lưu trữ đám mây (Cloudflare R2 / AWS S3):

Thiết lập bucket trên Cloudflare R2 (hoặc S3) và cấu hình các khoá (R2_ACCESS_KEY, R2_SECRET_KEY, R2_ENDPOINT) trong .env để kích hoạt plugin cloudStoragePlugin trong CMS.

Cấu hình Mail Server (SMTP):

Tích hợp SMTP (Google Workspace, SendGrid, Mailgun) vào PayloadCMS để gửi email thông báo khi có khách hàng gửi liên hệ (ContactSubmissions) hoặc yêu cầu đối tác (PartnerInquiries).

### C. Kiểm thử & tối ưu hóa (Testing & Optimization)

Kiểm thử phân quyền Admin Panel: Tạo tài khoản admin đầu tiên, kiểm tra các thao tác Thêm/Sửa/Xoá các Collection.

Kiểm tra Đa ngôn ngữ (Localization): Xác minh dữ liệu nhập từ CMS hiển thị đúng trên các ngôn ngữ vi, en, fr, de.

Kiểm tra luồng đi dữ liệu (E2E): Gửi form liên hệ từ web xem có lưu vào cơ sở dữ liệu CMS thành công không.

Tối ưu SEO & Performance: Cấu hình tự động tạo Sitemap thực tế dựa trên dữ liệu từ CSDL, cấu hình caching/revalidation của Next.js hợp lý.

## 3. Kiến trúc backend(Proposed Architecture)

Hệ thống được thiết kế theo kiến trúc Decoupled (Headless CMS), sử dụng mô hình Monorepo giúp tối ưu hoá việc phát triển và triển khai:

### Chi tiết các thành phần:

Nginx Reverse Proxy: Đóng vai trò định tuyến các yêu cầu. Tên miền chính (ví dụ: vietway.vn) trỏ vào cổng 3004 (Next.js), tên miền phụ quản trị (ví dụ: cms.vietway.vn) trỏ vào cổng 3005 (PayloadCMS). Hỗ trợ mã hoá SSL (Let’s Encrypt).

Next.js 14 (App Router): Đóng vai trò là lớp hiển thị. Sử dụng tính năng Incremental Static Regeneration (ISR) giúp sinh trang tĩnh tối ưu cho SEO, đồng thời tự động cập nhật lại trang sau mỗi 60 giây hoặc thông qua Webhook kích hoạt từ CMS khi có nội dung mới.

PayloadCMS 2 (Express + Node): Cung cấp giao diện quản trị trực quan cho người dùng và tự động sinh hệ thống REST API / GraphQL bảo mật cho Frontend.

PostgreSQL: Lưu trữ toàn bộ dữ liệu văn bản cấu trúc, phân quyền, cấu hình trang.

Cloudflare R2 (S3 Compatible): Lưu trữ toàn bộ tệp hình ảnh, tài liệu được upload để giảm tải cho máy chủ chính và tối ưu tốc độ tải ảnh qua mạng phân phối nội dung (CDN).

## 4. Lộ trình thực hiện (Roadmap)

Dự kiến tổng thời gian thực hiện: 4 tuần (dành cho 1-2 lập trình viên).

Tuần 1 (Hạ tầng & CSDL): Cài đặt môi trường máy chủ (VPS Ubuntu), cài đặt PostgreSQL bảo mật, trỏ tên miền và thiết lập Nginx.

Tuần 2 (Database & CMS Integration): Chạy lệnh đồng bộ database schema, seed toàn bộ dữ liệu du lịch thực tế, khôi phục logic API thực tế ở Frontend để chạy kết nối thật.

Tuần 3 (Cloud Integration): Thiết lập Cloudflare R2 để quản lý hình ảnh, cấu hình hệ thống mail SMTP để nhận thông tin từ form liên hệ.

Tuần 4 (Testing & Deployment): Chạy thử nghiệm toàn bộ luồng nghiệp vụ, tối ưu tốc độ tải trang (PageSpeed), cấu hình sitemap tự động và chính thức đưa website vào hoạt động (Go-Live).

## 5. Chi phí (Budget & Cost Estimation)

### A. Chi phí Hạ tầng (Hàng tháng/Hàng năm)

Các khoản dưới đây là chi phí vận hành trả cho nhà cung cấp hạ tầng/dịch vụ. **Phía khách hàng/doanh nghiệp sẽ chịu và thanh toán trực tiếp**, không nằm trong gói công triển khai 15,000,000 VND.

| Dịch vụ | Loại chi phí | Mức giá dự kiến (VND) | Ghi chú |

| --- | --- | --- | --- |

| Máy chủ VPS nhỏ hoặc server hiện có | Hàng tháng | ~250,000 - 500,000 VND / tháng | Giai đoạn đầu chỉ cần cấu hình vừa đủ, có thể nâng cấp sau |

| CSDL PostgreSQL Managed (Supabase/Neon) | Hàng tháng | 0 VND / tháng | Ưu tiên dùng gói Free ở giai đoạn đầu |

| Cloudflare R2 Media Storage | Hàng tháng | 0 VND / tháng | Dùng trong giới hạn miễn phí ban đầu |

| SMTP Mail Server (SendGrid/Resend) | Hàng tháng | 0 VND / tháng | Dùng gói miễn phí để nhận/gửi email cơ bản |

| Tên miền (Domain .vn / .com) | Hàng năm | ~250,000 - 650,000 VND / năm | Chi phí đăng ký và duy trì tên miền |

| Chứng chỉ SSL (Let’s Encrypt) | Miễn phí | 0 VND | Cấu hình tự động gia hạn trên Nginx |

| Tổng chi phí hạ tầng năm đầu | Hàng năm | ~3,250,000 - 6,650,000 VND | Phía khách hàng/doanh nghiệp thanh toán trực tiếp; có thể thấp hơn nếu tận dụng server/free tier |

### B. Chi phí phát triển & hoàn thiện (Một lần)

Mục tiêu ngân sách phần công triển khai: **gói gọn trong 15,000,000 VND**. Phạm vi tập trung vào việc đưa website lên production tối thiểu, chạy ổn định với CMS, database, domain/SSL và các form cơ bản.

| Hạng mục công việc | Thời gian dự kiến | Đơn giá quy đổi | Tổng chi phí |

| --- | --- | --- | --- |

| Rà soát source, sửa dependency/env/port để chạy sạch | 12 giờ | 250,000 VND | 3,000,000 VND |

| Thiết lập database, CMS, migration/seed và kết nối API thật | 16 giờ | 250,000 VND | 4,000,000 VND |

| Deploy web + CMS, cấu hình domain, HTTPS/SSL, Nginx/reverse proxy | 14 giờ | 250,000 VND | 3,500,000 VND |

| Cấu hình media storage và form email ở mức cơ bản | 8 giờ | 250,000 VND | 2,000,000 VND |

| Kiểm thử, tối ưu SEO cơ bản, sửa lỗi sau deploy và bàn giao | 10 giờ | 250,000 VND | 2,500,000 VND |

| Tổng chi phí nhân sự phát triển | 60 giờ |   | 15,000,000 VND |

Lưu ý: Gói 15,000,000 VND là chi phí công triển khai một lần. Các khoản hạ tầng ở mục A như domain, VPS, email hoặc dịch vụ lưu trữ do phía khách hàng/doanh nghiệp chịu và thanh toán trực tiếp cho nhà cung cấp. Phạm vi này phù hợp cho bản production tối thiểu; các tính năng lớn như Agent Hub, booking, payment, dashboard doanh thu hoặc automation nâng cao sẽ cần tách thành giai đoạn sau.
