import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon, DollarSignIcon, BarChart2Icon, SmileIcon } from 'lucide-react'; // Changed BarChartIcon to BarChart2Icon
import type { LucideProps } from 'lucide-react';

// Hardcoded Spanish texts for the Benefits section
const texts = {
  title: "Beneficios Clave de la IA para Tu Negocio",
  description: "Descubre cómo la Inteligencia Artificial transforma tu negocio, optimizando recursos y maximizando tu ROI con una implementación simple y guiada.",
  benefit1Title: "Máxima Eficiencia y Productividad",
  benefit1Description: "Automatiza tareas tediosas, libera tiempo valioso para ti y tu equipo. Obtén resultados rápidos y medibles, para que puedas enfocarte en el crecimiento estratégico y en lo que te apasiona.",
  benefit2Title: "Reducción Inteligente de Costos",
  benefit2Description: "Optimiza recursos y elimina errores costosos con soluciones de IA que impactan directamente tu rentabilidad. Transforma gastos en inversiones inteligentes que te dan tranquilidad.",
  benefit3Title: "Decisiones Basadas en Datos",
  benefit3Description: "Toma decisiones más inteligentes y anticipa el futuro de tu negocio con el poder de la IA. Transforma datos complejos en una ventaja competitiva, con soporte experto y herramientas intuitivas que te dan confianza.",
  benefit4Title: "Experiencia del Cliente Optimizada",
  benefit4Description: "Mejora la lealtad y satisfacción del cliente con IA. Personaliza interacciones y ofrece soporte 24/7 fácilmente, liberando a tu equipo para relaciones de alto valor."
};

interface Benefit {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const benefitsData: Benefit[] = [
  {
    icon: TrendingUpIcon,
    title: texts.benefit1Title,
    description: texts.benefit1Description,
  },
  {
    icon: DollarSignIcon,
    title: texts.benefit2Title,
    description: texts.benefit2Description,
  },
  {
    icon: BarChart2Icon, // Changed from BarChartIcon
    title: texts.benefit3Title,
    description: texts.benefit3Description,
  },
  {
    icon: SmileIcon,
    title: texts.benefit4Title,
    description: texts.benefit4Description,
  },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-10 sm:py-12 md:py-16 bg-secondary/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            {texts.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitsData.map((benefit, index) => (
            <Card key={index} className="bg-card border-border rounded-xl card-hover">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
                  <benefit.icon className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground font-heading">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
