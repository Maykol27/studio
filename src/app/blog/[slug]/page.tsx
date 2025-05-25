
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts, type BlogPost } from '@/lib/blog-data';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CalendarDaysIcon, UserIcon } from 'lucide-react';

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
        publishedTime: new Date().toISOString(), // Placeholder, ideally use actual post date
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
                <time dateTime={new Date().toISOString()}>{post.date}</time> {/* Placeholder date */}
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
              // Simple check for list items - could be more robust
              if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('  * ') || paragraph.trim().startsWith('    * ')) {
                const items = paragraph.split('\n').map(item => item.trim().replace(/^\*\s*/, ''));
                return (
                  <ul key={index} className="list-disc space-y-1 pl-6">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                );
              }
              // Simple check for headings
              if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                return <h3 key={index} className="text-xl font-semibold text-primary font-heading mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
