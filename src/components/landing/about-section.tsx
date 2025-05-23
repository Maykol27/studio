import Image from 'next/image';

interface AboutSectionProps {
  dictionary: {
    title: string;
    subtitle: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
}

export function AboutSection({ dictionary }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30">
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
          <div className="rounded-xl overflow-hidden shadow-custom">
            <Image
              src="https://placehold.co/550x400.png"
              alt={dictionary.title} // Using section title for alt
              width={550}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="team collaboration office"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
