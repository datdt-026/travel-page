import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

// Primary sans-serif font for body text
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700'],
});

// Elegant serif font for headings and display text
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'VietWay - Khám phá thế giới',
    template: '%s | VietWay',
  },
  description: 'Khám phá điểm đến, lên kế hoạch hành trình và trải nghiệm du lịch cao cấp cùng VietWay.',
  keywords: ['du lịch', 'điểm đến', 'lịch trình', 'du lịch cao cấp', 'hướng dẫn du lịch'],
  authors: [{ name: 'VietWay' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'VietWay',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${cormorant.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased font-sans bg-surface-primary text-content-primary" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
