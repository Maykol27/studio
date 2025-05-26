import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { CalendarDaysIcon, UserIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { es, pt } from 'date-fns/locale';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface BlogPostPageProps {
  params: { slug: string; locale: Locale };
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: Locale }}) {
  return blogPosts.map(post => ({
    slug: post.slug,
    locale: locale, // Aunque el slug no depende del locale, Next.js necesita esto aquí.
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    return {
      title: dictionary.blogPostPage.notFoundTitle,
      description: dictionary.blogPostPage.notFoundDescription,
    };
  }
  const publishedDate = parseISO(post.date);

  return {
    title: `${post.title} | Aetheria Consulting`, // El título del post viene de blog-data.ts (actualmente solo español)
    description: post.summary, // El resumen viene de blog-data.ts (actualmente solo español)
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
        publishedTime: publishedDate.toISOString(),
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

const parseTextForFormatting = (text: string): ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      if (boldText && !boldText.includes('**') && !boldText.includes(' ')) { 
         return <strong key={`bold-heading-${index}`}>{boldText}</strong>;
      }
      return <strong key={`bold-${index}`}>{boldText}</strong>;
    }
    return part;
  });
};


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const dictionary = await getDictionary(params.locale);
  const post = blogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const parsedDate = parseISO(post.date);
  const dateLocale = params.locale === 'pt' ? pt : es;
  const displayDate = format(parsedDate, "dd 'de' MMMM, yyyy", { locale: dateLocale });


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        headerDictionary={dictionary.header}
        languageSwitcherDictionary={dictionary.languageSwitcher}
        currentLocale={params.locale}
      />
      <main className="flex-grow pt-24 md:pt-28">
        <article className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-3xl">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary font-heading mb-4">
              {post.title} {/* Título del post de blog-data.ts (español) */}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CalendarDaysIcon className="h-4 w-4" />
                <time dateTime={parsedDate.toISOString()}>{displayDate}</time>
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
              if (paragraph.trim().startsWith('* ') || paragraph.trim().startsWith('  * ') || paragraph.trim().startsWith('    * ')) {
                const items = paragraph.split('\\n').map(item => item.trim().replace(/^\\*\\s*/, ''));
                return (
                  <ul key={`list-${index}`} className="list-disc space-y-1 pl-6">
                    {items.map((item, itemIndex) => (
                      <li key={`list-item-${index}-${itemIndex}`}>{parseTextForFormatting(item)}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**') && !paragraph.slice(2, -2).includes('**') && !paragraph.slice(2,-2).includes(' ')) {
                const headingText = paragraph.slice(2, -2);
                return <h3 key={`heading-${index}`} className="text-xl font-semibold text-primary font-heading mt-6 mb-3">{headingText}</h3>;
              }
              return <p key={`p-${index}`}>{parseTextForFormatting(paragraph)}</p>;
            })}
          </div>
        </article>
      </main>
      <Footer dictionary={dictionary.footer} currentLocale={params.locale} />
    </div>
  );
}
