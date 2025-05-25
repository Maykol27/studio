import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircleIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

// Texts are now hardcoded in Spanish
const heroTexts = {
  titlePart1: "IA a tu Medida: ",
  titlePart2: "Nuestro Proceso",
  titlePart3: " Hacia Tu Éxito.",
  description: "¿Buscas llevar tu negocio al siguiente nivel? En Aetheria Consulting, transformamos la complejidad de la automatización e IA en soluciones prácticas y accesibles para tu PyME. Te ayudamos a profesionalizarte y escalar, desbloqueando tu potencial y maximizando tu enfoque en lo que más te apasiona y te llevó a construir tu empresa.",
  ctaButton: "¡Impulsa tu Negocio con IA: Diagnóstico Gratuito!",
  videoCaption: "Conoce al CEO de Aetheria"
};

export function HeroSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/30 min-h-screen flex items-center pt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground font-heading leading-tight">
              {heroTexts.titlePart1}<br /> <span className="text-primary">{heroTexts.titlePart2}</span>{heroTexts.titlePart3}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {heroTexts.description}
            </p>
            <Link href="#automation-advisor" passHref>
              <Button size="lg" className="btn-yellow rounded-md px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg group">
                {heroTexts.ctaButton}
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="relative group rounded-xl overflow-hidden shadow-custom aspect-video">
            <Image
              src="https://placehold.co/600x400.png"
              alt={heroTexts.videoCaption}
              width={600}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="retrato profesional"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircleIcon className="h-20 w-20 text-white/80" />
            </div>
            <div className="absolute bottom-4 left-4 bg-background/70 backdrop-blur-sm p-2 rounded-md">
              <p className="text-sm text-foreground">{heroTexts.videoCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
