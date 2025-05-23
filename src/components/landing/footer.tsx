import Link from 'next/link';
import { MountainIcon } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 text-center text-foreground/70">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-primary-foreground font-heading">Aetheria Consulting</span>
          </Link>
          <p className="text-sm">
            &copy; {currentYear} Aetheria Consulting. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm hover:text-primary transition-colors" prefetch={false}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
