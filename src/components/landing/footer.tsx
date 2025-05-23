import Link from 'next/link';
import { MountainIcon } from 'lucide-react';

interface FooterProps {
  dictionary: {
    companyName: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
  };
}

export function Footer({ dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 text-center text-foreground/70">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary-foreground font-heading">{dictionary.companyName}</span>
          </Link>
          <p className="text-sm">
            &copy; {currentYear} {dictionary.copyright}
          </p>
          <div className="flex gap-4">
            {/* These links should also be localized if the pages exist */}
            <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {dictionary.privacyPolicy}
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors" prefetch={false}>
              {dictionary.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
