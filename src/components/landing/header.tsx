import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayersIcon, MenuIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { ThemeSwitcher } from '@/components/theme-switcher';

const headerTexts = {
  companyName: "Aetheria Consulting",
  benefits: "Beneficios",
  process: "Proceso",
  // testimonials: "Testimonios", // Eliminado
  about: "Nosotros",
  contactUs: "Contáctanos",
  toggleMenu: "Alternar menú"
};

export function Header() {
  const navItems = [
    { href: '#benefits', label: headerTexts.benefits },
    { href: '#process', label: headerTexts.process },
    // { href: '#testimonials', label: headerTexts.testimonials }, // Eliminado
    { href: '#about', label: headerTexts.about },
  ];

  return (
    <header className="py-4 px-4 md:px-8 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <LayersIcon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
          <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors font-heading">{headerTexts.companyName}</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center"> {/* Adjusted gap */}
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
          <ThemeSwitcher />
          <Link href="#contact" prefetch={false}>
            <Button className="btn-cta-primary rounded-md px-6 py-2.5 text-sm ml-2"> {/* Added ml-2 for spacing */}
              {headerTexts.contactUs}
            </Button>
          </Link>
        </nav>
        <div className="md:hidden flex items-center gap-2"> {/* Added gap for mobile */}
           <ThemeSwitcher />
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={headerTexts.toggleMenu}>
                <MenuIcon className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background text-foreground p-6">
              <div className="flex flex-col space-y-5 pt-6">
                {navItems.map(item => (
                  <SheetClose key={item.href} asChild>
                    <Link href={item.href} className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="#contact" prefetch={false} className="mt-4">
                    <Button className="w-full btn-cta-primary rounded-md py-3 text-base">
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
