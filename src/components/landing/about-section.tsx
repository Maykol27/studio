import Image from 'next/image';
import type { Dictionary } from '@/lib/get-dictionary';

interface AboutSectionProps {
  dictionary: Dictionary['aboutSection'];
}

export function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section id="about" className="py-10 sm:py-12 md:py-16 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
            <p className="text-lg text-foreground/90 font-semibold">
              {dictionary.subtitle}
            </p>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>{dictionary.paragraph1}</p>
              <p>{dictionary.paragraph2}</p>
              <p>{dictionary.paragraph3}</p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://placehold.co/550x400.png"
              alt={dictionary.title}
              width={550}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="equipo colaboracion oficina"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
