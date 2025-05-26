import { Card } from '@/components/ui/card';
import { SearchIcon, DraftingCompassIcon, RocketIcon, HandshakeIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// Hardcoded Spanish texts for the Methodology section
const texts = {
  title: "IA a tu Medida: Nuestro Proceso Hacia Tu Éxito",
  description: "No solo implementamos tecnología; creamos soluciones de IA personalizadas que entienden tus desafíos, optimizan tus operaciones e impulsan tu crecimiento real, liberándote para enfocarte en lo que más importa.",
  step1Title: "1. Diagnóstico Profundo y Estratégico",
  step1Description: "Vamos más allá de lo superficial. Escuchamos tu historia, entendemos a fondo tus desafíos y metas únicas (incluso aquellas que no has identificado claramente), e identificamos con precisión las oportunidades de automatización e IA que generarán el mayor impacto en tu negocio y tranquilidad. Es el mapa hacia tu éxito.",
  step2Title: "2. Diseño de Soluciones a Medida",
  step2Description: "Sin soluciones genéricas. Desarrollamos una estrategia de IA personalizada y robusta que se alinea perfectamente con tu presupuesto, capacidades y, sobre todo, tus objetivos de negocio. Diseñamos el camino que necesitas.",
  step3Title: "3. Implementación Ágil y con Propósito",
  step3Description: "Convertimos el plan en acción. Gestionamos la implementación de manera eficiente y con mínima interrupción, asegurando que la IA se integre sin problemas. Brindamos orientación clara y soporte constante para que tu equipo adopte la nueva tecnología con confianza.",
  step4Title: "4. Optimización Continua y Crecimiento Sostenible",
  step4Description: "Nuestra asociación no termina con la implementación. Ofrecemos soporte post-implementación, monitoreo de rendimiento y ajustes proactivos para asegurar que tu inversión en IA continúe evolucionando, maximizando tu retorno y adaptándose a tus necesidades futuras, actuando como tu socio estratégico en la mejora continua."
};

interface ProcessStep {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    icon: SearchIcon,
    title: texts.step1Title,
    description: texts.step1Description,
  },
  {
    icon: DraftingCompassIcon,
    title: texts.step2Title,
    description: texts.step2Description,
  },
  {
    icon: RocketIcon,
    title: texts.step3Title,
    description: texts.step3Description,
  },
  {
    icon: HandshakeIcon,
    title: texts.step4Title,
    description: texts.step4Description,
  },
];

export function MethodologySection() {
  return (
    <section id="process" className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            {texts.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {processSteps.map((step, index) => (
            <Card key={index} className="bg-card border-border rounded-xl card-hover p-6 flex flex-col sm:flex-row items-start gap-6">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                 <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground font-heading">{step.title}</h3>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
