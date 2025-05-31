
import Image from 'next/image';
import Link from 'next/link'; // Import Link, though for external <a> is fine
import type { Dictionary } from '@/lib/get-dictionary';

interface AboutSectionProps {
  dictionary: Dictionary['aboutSection'];
}

export function AboutSection({ dictionary }: AboutSectionProps) {
  const texts = dictionary; // No need for defaultTexts if dictionary is guaranteed by getDictionary

  return (
    <section id="about" className="py-10 sm:py-12 md:py-16 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
            <p className="text-lg text-foreground/90 font-semibold">
              {texts.subtitle}
            </p>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>{texts.paragraph1}</p>
              <p>{texts.paragraph2}</p>
              <p>{texts.paragraph3}</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-xl mx-auto mb-4">
              <Image
                src="/images/sikai-equipo.jpg"
                alt={texts.imageAltCEO}
                fill
                className="object-cover"
                data-ai-hint="CEO retrato corporativo"
              />
            </div>
            <a
              href="https://www.linkedin.com/in/maykol-sicard"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block"
            >
              <p className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors font-heading">{texts.ceoName}</p>
              <p className="text-md text-primary group-hover:text-accent transition-colors">{texts.ceoTitle}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
