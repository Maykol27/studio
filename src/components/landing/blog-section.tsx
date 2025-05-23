import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface BlogPostData {
  id: string;
  title: string;
  summary: string;
  slug: string;
}

// Texts are now hardcoded in Spanish
const texts = {
  title: "Nuestro Blog",
  description: "Mantente al día con las últimas tendencias en IA y automatización empresarial. Ideas, consejos e historias de éxito para inspirar tu negocio.",
  readMore: "Leer Más",
  posts: [
    {
      id: "1",
      title: "El Futuro de la IA en las Pequeñas Empresas",
      summary: "Aprende cómo la IA ya no es solo para grandes corporaciones y cómo tu PyME puede beneficiarse hoy.",
      slug: "future-of-ai-smb"
    },
    {
      id: "2",
      title: "5 Maneras de Automatizar tu Marketing con IA",
      summary: "Descubre herramientas y estrategias prácticas de IA para optimizar tus esfuerzos de marketing e impulsar el engagement.",
      slug: "automate-marketing-ai"
    },
    {
      id: "3",
      title: "Entendiendo el Procesamiento del Lenguaje Natural (PLN)",
      summary: "Una guía amigable para principiantes sobre el PLN y sus aplicaciones para mejorar las interacciones con los clientes.",
      slug: "understanding-nlp"
    }
  ]
};

const blogPostAssets = [
  { imageUrl: 'https://placehold.co/600x400.png', imageHint: 'tecnologia futurista' },
  { imageUrl: 'https://placehold.co/600x400.png', imageHint: 'automatizacion marketing' },
  { imageUrl: 'https://placehold.co/600x400.png', imageHint: 'procesamiento lenguaje' },
];


export function BlogSection() {
  return (
    <section id="blog" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">{texts.title}</h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            {texts.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts.posts.map((post, index) => (
            <Card key={post.id} className="bg-card border-border rounded-xl card-hover overflow-hidden flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={blogPostAssets[index % blogPostAssets.length].imageUrl}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover"
                  data-ai-hint={blogPostAssets[index % blogPostAssets.length].imageHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold text-primary-foreground font-heading mb-2">{post.title}</CardTitle>
                <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3">{post.summary}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/blog/${post.slug}`} passHref> 
                  <Button variant="link" className="text-primary p-0 hover:text-accent group">
                    {texts.readMore}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
