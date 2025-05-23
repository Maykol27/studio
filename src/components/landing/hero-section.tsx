import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircleIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  dictionary: {
    titlePart1: string;
    titlePart2: string;
    titlePart3: string;
    description: string;
    ctaButton: string;
    videoCaption: string;
  };
}

export function HeroSection({ dictionary }: HeroSectionProps) {
  return (
    <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-secondary/30 min-h-screen flex items-center pt-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground font-heading leading-tight">
              {dictionary.titlePart1}<br /> <span className="text-primary">{dictionary.titlePart2}</span>{dictionary.titlePart3}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {dictionary.description}
            </p>
            <Link href="#automation-advisor" passHref>
              <Button size="lg" className="btn-yellow rounded-md px-8 py-6 text-lg group">
                {dictionary.ctaButton}
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="relative group rounded-xl overflow-hidden shadow-custom aspect-video">
            <Image
              src="https://placehold.co/600x400.png"
              alt={dictionary.videoCaption} // Alt text can be localized too
              width={600}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="professional portrait"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircleIcon className="h-20 w-20 text-white/80" />
            </div>
            <div className="absolute bottom-4 left-4 bg-background/70 backdrop-blur-sm p-2 rounded-md">
              <p className="text-sm text-foreground">{dictionary.videoCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
