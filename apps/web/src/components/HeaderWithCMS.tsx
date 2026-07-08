import { getSiteHeaderConfig } from '@/lib/api';
import { SiteHeaderConfig } from '@/types';
import MegaMenuHeaderPremium from './MegaMenuHeaderPremium';

interface HeaderWithCMSProps {
  locale: string;
  forceTransparent?: boolean;
}

export default async function HeaderWithCMS({ locale, forceTransparent = false }: HeaderWithCMSProps) {
  const config = await getSiteHeaderConfig(locale) as SiteHeaderConfig | null;

  return (
    <MegaMenuHeaderPremium 
      forceTransparent={forceTransparent}
      cmsConfig={config || undefined}
    />
  );
}
