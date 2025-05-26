import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon, DollarSignIcon, BarChart2Icon, SmileIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';

interface BenefitsSectionProps {
  dictionary: Dictionary['benefitsSection'];
}

interface Benefit {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  titleKey: keyof Dictionary['benefitsSection']; // Key to look up in dictionary
  descriptionKey: keyof Dictionary['benefitsSection']; // Key to look up in dictionary
}

const benefitsDataStructure: Omit<Benefit, 'title' | 'description'>[] = [
  {
    icon: TrendingUpIcon,
    titleKey: "benefit1Title",
    descriptionKey: "benefit1Description",
  },
  {
    icon: DollarSignIcon,
    titleKey: "benefit2Title",
    descriptionKey: "benefit2Description",
  },
  {
    icon: BarChart2Icon,
    titleKey: "benefit3Title",
    descriptionKey: "benefit3Description",
  },
  {
    icon: SmileIcon,
    titleKey: "benefit4Title",
    descriptionKey: "benefit4Description",
  },
];

export function BenefitsSection({ dictionary }: BenefitsSectionProps) {
  return (
    <section id="benefits" className="py-10 sm:py-12 md:py-16 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            {dictionary.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsDataStructure.map((benefit, index) => (
            <Card key={index} className="bg-card border-border rounded-xl card-hover">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                  <benefit.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground font-heading">
                  {dictionary[benefit.titleKey as keyof typeof dictionary] as string}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {dictionary[benefit.descriptionKey as keyof typeof dictionary] as string}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
