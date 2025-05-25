
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data'; // No necesitamos LocaleBlogPost aquí ya que el contenido está centralizado
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CalendarDaysIcon, UserIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
      description: 'El artículo de blog que buscas no existe.',
    };
  }

  return {
    title: `${post.title} | Aetheria Consulting`,
    description: post.summary,
    openGraph: {
        title: post.title,
        description: post.summary,
        images: [
            {
                url: post.imageUrl,
                width: 800,
                height: 450,
                alt: post.title,
            },
        ],
        type: 'article',
        publishedTime: new Date(post.date).toISOString(), // Usar la fecha real del post si está disponible y es parseable
        authors: [post.author],
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: [post.imageUrl],
    }
  };
}

// Función auxiliar para parsear texto con **bold**
const parseTextForBold = (text: string): ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g); // Divide por **texto** manteniendo los delimitadores
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`bold-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow pt-24 md:pt-28">
        <article className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-3xl">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary font-heading mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDaysIcon className="h-4 w-4" />
                {/* Idealmente, la fecha del post debería ser un objeto Date o un string ISO para formateo */}
                <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
              </div>
            </div>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg mb-8">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
                data-ai-hint={post.imageHint}
              />
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-6">
            {post.fullContent.map((paragraph, index) => {
              // Manejo de listas
              if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('  * ') || paragraph.trim().startsWith('    * ')) {
                const items = paragraph.split('\n').map(item => item.trim().replace(/^\*\s*/, ''));
                return (
                  <ul key={`list-${index}`} className="list-disc space-y-1 pl-6">
                    {items.map((item, itemIndex) => (
                      <li key={`list-item-${index}-${itemIndex}`}>{parseTextForBold(item)}</li>
                    ))}
                  </ul>
                );
              }
              // Manejo de encabezados (si un párrafo completo está entre **)
              if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**') && !paragraph.includes(' ', 2) && !paragraph.slice(2,-2).includes('**') ) {
                 // Esta condición verifica si el texto entre ** no contiene más ** (para evitar doble parseo)
                 // y si no es solo una palabra en negrita dentro de un párrafo más largo
                const headingText = paragraph.slice(2, -2); // Remueve los ** de los extremos
                return <h3 key={`heading-${index}`} className="text-xl font-semibold text-primary font-heading mt-6 mb-3">{headingText}</h3>;
              }
              // Párrafos normales con posible texto en negrita
              return <p key={`p-${index}`}>{parseTextForBold(paragraph)}</p>;
            })}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
