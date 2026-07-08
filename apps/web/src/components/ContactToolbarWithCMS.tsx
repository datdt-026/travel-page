import { getSiteFooterConfig } from '@/lib/api';
import { SiteFooterConfig } from '@/types';
import ContactToolbar from './ContactToolbar';

interface ContactToolbarWithCMSProps {
  locale: string;
}

export default async function ContactToolbarWithCMS({ locale }: ContactToolbarWithCMSProps) {
  // Reuse footer config for contact info (email, phone)
  const config = await getSiteFooterConfig(locale) as SiteFooterConfig | null;

  return (
    <ContactToolbar 
      email={config?.contact?.email}
      phone={config?.contact?.phone}
      showChat={false}
      inquiryPath="/contact"
      schedulePath="/contact?action=schedule"
    />
  );
}
