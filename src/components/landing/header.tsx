import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon } from 'lucide-react'; // Or a custom logo icon

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary-foreground font-heading">Aetheria Consulting</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#benefits" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Benefits
          </Link>
          <Link href="#process" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Process
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            Testimonials
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
            About
          </Link>
          <Link href="#contact" prefetch={false}>
            <Button className="btn-yellow rounded-md px-6 py-3">
              Contact Us
            </Button>
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          {/* TODO: Add mobile menu */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  );
}
