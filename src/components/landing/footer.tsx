import Link from 'next/link';
import { LayersIcon } from 'lucide-react';

// Hardcoded Spanish texts for the Footer
const texts = {
  companyName: "Aetheria Consulting",
  copyright: "Aetheria Consulting. Todos los derechos reservados.",
  privacyPolicy: "Política de Privacidad",
  termsOfService: "Términos de Servicio"
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 text-foreground/70">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
            <LayersIcon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
            <span className="text-lg font-semibold text-primary group-hover:text-accent transition-colors font-heading">{texts.companyName}</span>
          </Link>
          <p className="text-sm order-last sm:order-none">
            &copy; {currentYear} {texts.copyright}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* These links would ideally point to actual pages if they existed */}
            <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {texts.privacyPolicy}
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {texts.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
