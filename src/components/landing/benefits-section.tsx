import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon, DollarSignIcon, BarChart2Icon, SmileIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { Dictionary } from '@/lib/get-dictionary';

interface BenefitsSectionProps {
  // Make dictionary optional or its properties optional for fallback
  dictionary?: Partial<Dictionary['benefitsSection']>;
}

interface BenefitItem {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  titleKey: keyof Dictionary['benefitsSection'];
  descriptionKey: keyof Dictionary['benefitsSection'];
  defaultTitle: string;
  defaultDescription: string;
}

// Define default texts directly in the structure for clarity
const benefitsDataStructure: BenefitItem[] = [
  {
    icon: TrendingUpIcon,
    titleKey: "benefit1Title",
    descriptionKey: "benefit1Description",
    defaultTitle: "Máxima Eficiencia y Productividad",
    defaultDescription: "Automatiza tareas tediosas, libera tiempo valioso para ti y tu equipo. Obtén resultados rápidos y medibles, para que puedas enfocarte en el crecimiento estratégico y en lo que te apasiona.",
  },
  {
    icon: DollarSignIcon,
    titleKey: "benefit2Title",
    descriptionKey: "benefit2Description",
    defaultTitle: "Reducción Inteligente de Costos",
    defaultDescription: "Optimiza recursos y elimina errores costosos con soluciones de IA que impactan directamente tu rentabilidad. Transforma gastos en inversiones inteligentes que te dan tranquilidad.",
  },
  {
    icon: BarChart2Icon, // Corrected icon name
    titleKey: "benefit3Title",
    descriptionKey: "benefit3Description",
    defaultTitle: "Decisiones Basadas en Datos",
    defaultDescription: "Toma decisiones más inteligentes y anticipa el futuro de tu negocio con el poder de la IA. Transforma datos complejos en una ventaja competitiva, con soporte experto y herramientas intuitivas que te dan confianza.",
  },
  {
    icon: SmileIcon,
    titleKey: "benefit4Title",
    descriptionKey: "benefit4Description",
    defaultTitle: "Experiencia del Cliente Optimizada",
    defaultDescription: "Mejora la lealtad y satisfacción del cliente con IA. Personaliza interacciones y ofrece soporte 24/7 fácilmente, liberando a tu equipo para relaciones de alto valor."
  },
];

export function BenefitsSection({ dictionary }: BenefitsSectionProps) {
  // Provide default top-level texts if dictionary or its properties are missing
  const sectionTitle = dictionary?.title || "Beneficios Clave de la IA para Tu Negocio";
  const sectionDescription = dictionary?.description || "Descubre cómo la Inteligencia Artificial transforma tu negocio, optimizando recursos y maximizando tu ROI con una implementación simple y guiada.";

  return (
    <section id="benefits" className="py-10 sm:py-12 md:py-16 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{sectionTitle}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsDataStructure.map((benefit, index) => {
            const title = dictionary?.[benefit.titleKey as keyof typeof dictionary] as string || benefit.defaultTitle;
            const description = dictionary?.[benefit.descriptionKey as keyof typeof dictionary] as string || benefit.defaultDescription;
            return (
              <Card key={index} className="bg-card border-border rounded-xl card-hover">
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                    <benefit.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground font-heading">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}