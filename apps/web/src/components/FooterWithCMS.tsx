import { getSiteFooterConfig } from '@/lib/api';
import { SiteFooterConfig } from '@/types';
import LocalizedFooter from './LocalizedFooter';

interface FooterWithCMSProps {
  locale: string;
}

export default async function FooterWithCMS({ locale }: FooterWithCMSProps) {
  const config = await getSiteFooterConfig(locale) as SiteFooterConfig | null;

  return (
    <LocalizedFooter cmsConfig={config || undefined} />
  );
}
