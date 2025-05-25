import Image from 'next/image';

// Texts are now hardcoded in Spanish
const texts = {
  title: "Sobre Aetheria Consulting",
  subtitle: "Tus aliados en la transformación digital impulsada por IA. Nos apasiona ayudar a las empresas a prosperar y escalar.",
  paragraph1: "Aetheria Consulting nació de la convicción de que la Inteligencia Artificial debe ser accesible y beneficiosa para empresas de todos los tamaños. Aportamos una profunda visión y experiencia en tecnología (IA, automatización), gestión de proyectos y mejora continua, adquirida en entornos complejos de grandes industrias. Ahora, llevamos ese conocimiento para crear soluciones simples y prácticas para profesionalizar y escalar tu empresa, sin importar su tamaño o capacidad económica.",
  paragraph2: "Nuestra misión es empoderar a negocios como el tuyo para que aprovechen el poder de la IA para optimizar procesos, reducir costos, mejorar la toma de decisiones y enriquecer la experiencia de sus clientes. Creemos en un enfoque colaborativo, trabajando de cerca contigo para entender tus desafíos e incluso descubrir oportunidades que podrías no ver, porque somos expertos en procesos y en entender tu negocio.",
  paragraph3: "Con un enfoque en resultados tangibles y un proceso de implementación ágil, te guiamos en cada paso del camino. Nuestro objetivo no es solo proveerte herramientas de IA, sino ser tu socio estratégico en el crecimiento de tu empresa, permitiéndote enfocarte en lo que te apasiona y lo que te llevó a construir tu negocio."
};

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-secondary/30">
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
          <div className="rounded-xl overflow-hidden shadow-custom">
            <Image
              src="https://placehold.co/550x400.png"
              alt={texts.title}
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
