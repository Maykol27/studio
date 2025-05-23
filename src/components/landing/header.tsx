import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

// Texts are now hardcoded in English
const headerTexts = {
  companyName: "Aetheria Consulting",
  benefits: "Benefits",
  process: "Process",
  testimonials: "Testimonials",
  about: "About",
  contactUs: "Contact Us",
  toggleMenu: "Toggle menu"
};

export function Header() {
  const navItems = [
    { href: '#benefits', label: headerTexts.benefits },
    { href: '#process', label: headerTexts.process },
    { href: '#testimonials', label: headerTexts.testimonials },
    { href: '#about', label: headerTexts.about },
  ];

  return (
    <header className="py-6 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary-foreground font-heading">{headerTexts.companyName}</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary transition-colors" prefetch={false}>
              {item.label}
            </Link>
          ))}
          {/* LanguageSwitcher removed */}
          <Link href="#contact" prefetch={false}>
            <Button className="btn-yellow rounded-md px-6 py-3">
              {headerTexts.contactUs}
            </Button>
          </Link>
        </nav>
        <div className="md:hidden flex items-center">
           {/* LanguageSwitcher removed */}
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={headerTexts.toggleMenu}>
                <MenuIcon className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card text-card-foreground p-6">
              <div className="flex flex-col space-y-4">
                {navItems.map(item => (
                  <SheetClose key={item.href} asChild>
                    <Link href={item.href} className="text-lg font-medium hover:text-primary transition-colors" prefetch={false}>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="#contact" prefetch={false}>
                    <Button className="w-full btn-yellow rounded-md py-3 text-base">
                      {headerTexts.contactUs}
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
