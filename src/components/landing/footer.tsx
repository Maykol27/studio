import Link from 'next/link';
import { LayersIcon } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface FooterProps {
  dictionary?: Dictionary['footer']; // Made dictionary prop optional
  currentLocale: Locale;
}

export function Footer({ dictionary, currentLocale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Provide default values if dictionary or its properties are missing
  const companyName = dictionary?.companyName || "Aetheria Consulting";
  const copyrightText = dictionary?.copyright || "Aetheria Consulting. Todos los derechos reservados.";
  const privacyPolicyText = dictionary?.privacyPolicy || "Política de Privacidad";
  const termsOfServiceText = dictionary?.termsOfService || "Términos de Servicio";

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 text-foreground/70">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
          <Link href={`/${currentLocale}`} className="flex items-center gap-2 group" prefetch={false}>
            <LayersIcon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
            <span className="text-lg font-semibold text-primary group-hover:text-accent transition-colors font-heading">{companyName}</span>
          </Link>
          <p className="text-sm order-last sm:order-none">
            &copy; {currentYear} {copyrightText}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href={`/${currentLocale}/privacy-policy`} className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {privacyPolicyText}
            </Link>
            <Link href={`/${currentLocale}/terms-of-service`} className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {termsOfServiceText}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
