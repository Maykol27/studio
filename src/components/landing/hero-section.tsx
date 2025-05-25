import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircleIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

const heroTexts = {
  titlePart1: "IA a tu Medida: ",
  titlePart2: "Nuestro Proceso",
  titlePart3: " Hacia Tu Éxito.",
  description: "¿Buscas llevar tu negocio al siguiente nivel? En Aetheria Consulting, transformamos la complejidad de la automatización e IA en soluciones prácticas y accesibles para tu negocio.",
  ctaButton: "¡Diagnostico gratuito ahora mismo!",
  videoCaption: "Conoce al CEO de Aetheria"
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-100"> {/* Changed opacity from 70/50 to 100 */}
        <div
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/10 rounded-full animate-bubble-1" // Changed from bg-primary/5
        />
        <div
          className="absolute top-[20%] right-[10%] w-80 h-80 bg-accent/10 rounded-full animate-bubble-2" // Changed from bg-accent/5
        />
        <div
          className="absolute bottom-[15%] left-[20%] w-72 h-72 bg-secondary/10 rounded-full animate-bubble-3 hidden md:block" // Changed from bg-secondary/5
        />
         <div
          className="absolute bottom-[5%] right-[5%] w-56 h-56 bg-primary/10 rounded-full animate-bubble-1 animation-delay-10000 hidden lg:block" // Changed from bg-primary/5
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10"> {/* Ensure content is above animation */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center md:text-left animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground font-heading leading-tight">
              {heroTexts.titlePart1}<br className="hidden md:block" /> <span className="text-primary">{heroTexts.titlePart2}</span>{heroTexts.titlePart3}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
              {heroTexts.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#automation-advisor" passHref>
                <Button size="lg" className="btn-cta-primary rounded-md px-8 py-3.5 text-base sm:text-lg group w-full sm:w-auto shadow-lg hover:shadow-xl">
                  {heroTexts.ctaButton}
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative group rounded-xl overflow-hidden shadow-xl aspect-video mt-6 md:mt-0 animate-fade-in-up animation-delay-300">
            <Image
              src="https://placehold.co/600x400.png"
              alt={heroTexts.videoCaption}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint="tecnologia abstracta innovacion"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <PlayCircleIcon className="h-20 w-20 text-white/90 transform group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/50 backdrop-blur-sm p-2 rounded-md">
              <p className="text-xs sm:text-sm text-white/90">{heroTexts.videoCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
