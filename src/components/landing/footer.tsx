// src/components/landing/footer.tsx
import Link from 'next/link';
import { CustomLogoIcon } from '@/components/icons/custom-logo-icon'; // O el nuevo CustomLogoIcon si usas un archivo
import type { Dictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface FooterProps {
  dictionary?: Partial<Dictionary['footer']>;
  currentLocale: Locale;
}

// Default texts (Spanish fallbacks)
const defaultTexts: Dictionary['footer'] = {
  companyName: "SIKAI Consulting",
  copyright: "SIKAI Consulting. Todos los derechos reservados.",
  privacyPolicy: "Política de Privacidad",
  termsOfService: "Términos de Servicio"
};


export function Footer({ dictionary: dictProp, currentLocale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const dictionary = { ...defaultTexts, ...(dictProp || {}) };

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 text-foreground/70">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-4 text-center sm:text-left">
          <Link href={`/${currentLocale}`} className="flex items-center gap-2 group" prefetch={false}>
            {/* Usa CustomLogoIcon si estás cargando un archivo SVG desde /public */}
            <CustomLogoIcon width={32} height={32} className="text-primary group-hover:text-accent transition-colors" />
            {/* O usa SikaiLogoIcon si quieres mantener el SVG complejo definido en el componente */}
            {/* <SikaiLogoIcon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" /> */}
            <span className="text-lg font-semibold text-primary group-hover:text-accent transition-colors font-heading">{dictionary.companyName}</span>
          </Link>
          <p className="text-sm order-last sm:order-none">
            &copy; {currentYear} {dictionary.copyright}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href={`/${currentLocale}/privacy-policy`} className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {dictionary.privacyPolicy}
            </Link>
            <Link href={`/${currentLocale}/terms-of-service`} className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {dictionary.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
