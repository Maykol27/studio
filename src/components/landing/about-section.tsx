
import Image from 'next/image';
import type { Dictionary } from '@/lib/get-dictionary';

interface AboutSectionProps {
  dictionary?: Partial<Dictionary['aboutSection']>;
}

// Default texts (Spanish fallbacks)
const defaultTexts: Dictionary['aboutSection'] = {
  title: "Sobre SIKAI Consulting",
  subtitle: "Tus aliados en la transformación digital impulsada por IA. Nos apasiona ayudar a las empresas a prosperar y escalar.",
  paragraph1: "SIKAI Consulting nació de la convicción de que la Inteligencia Artificial debe ser accesible y beneficiosa para empresas de todos los tamaños. Aportamos una profunda visión y experiencia en tecnología (IA, automatización), gestión de proyectos y mejora continua, adquirida en entornos complejos de grandes industrias. Ahora, llevamos ese conocimiento para crear soluciones simples y prácticas para profesionalizar y escalar tu empresa, sin importar su tamaño o capacidad económica.",
  paragraph2: "Nuestra misión es empoderar a negocios como el tuyo para que aprovechen el poder de la IA para optimizar procesos, reducir costos, mejorar la toma de decisiones y enriquecer la experiencia de sus clientes. Creemos en un enfoque colaborativo, trabajando de cerca contigo para entender tus desafíos e incluso descubrir oportunidades que podrías no ver, porque nos dedicamos a comprender a fondo tu negocio y tus procesos, para así encontrar juntos las mejores soluciones.",
  paragraph3: "Con un enfoque en resultados tangibles y un proceso de implementación ágil, te guiamos en cada paso del camino. Nuestro objetivo no es solo proveerte herramientas de IA, sino ser tu socio estratégico en el crecimiento de tu empresa, permitiéndote enfocarte en lo que te apasiona y lo que te llevó a construir tu negocio."
};

export function AboutSection({ dictionary }: AboutSectionProps) {
  const texts = { ...defaultTexts, ...(dictionary || {}) };
  const imageAltText = texts.title || "Equipo de SIKAI Consulting"; // Usar el título localizado como alt

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
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/sikai-equipo.jpg" // Actualizado para apuntar a una imagen local
              alt={imageAltText}
              width={550}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="equipo colaboracion oficina" // Puedes ajustar este hint si lo deseas
            />
          </div>
        </div>
      </div>
    </section>
  );
}
