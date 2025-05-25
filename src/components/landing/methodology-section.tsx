import { Card } from '@/components/ui/card';
import { SearchIcon, DraftingCompassIcon, RocketIcon, HandshakeIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';

interface MethodologySectionProps {
  dictionary: Dictionary['methodologySection'];
}

interface ProcessStepData {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  titleKey: keyof Dictionary['methodologySection'];
  descriptionKey: keyof Dictionary['methodologySection'];
}

export function MethodologySection({ dictionary }: MethodologySectionProps) {
  const processSteps: ProcessStepData[] = [
    {
      icon: SearchIcon,
      titleKey: "step1Title",
      descriptionKey: "step1Description",
    },
    {
      icon: DraftingCompassIcon,
      titleKey: "step2Title",
      descriptionKey: "step2Description",
    },
    {
      icon: RocketIcon,
      titleKey: "step3Title",
      descriptionKey: "step3Description",
    },
    {
      icon: HandshakeIcon,
      titleKey: "step4Title",
      descriptionKey: "step4Description",
    },
  ];

  return (
    <section id="process" className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="bg-card border-border rounded-xl card-hover p-6 flex flex-col sm:flex-row items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                 <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground font-heading">
                  {dictionary[step.titleKey]}
                </h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {dictionary[step.descriptionKey]}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
