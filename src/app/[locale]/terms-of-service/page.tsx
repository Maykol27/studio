
import type { Metadata } from 'next';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

interface TermsOfServicePageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: TermsOfServicePageProps): Promise<Metadata> {
  const dictionary = await getDictionary(locale);
  const pageTitle = dictionary.termsOfServicePage?.title || (locale === 'pt' ? 'Termos de Uso' : 'Términos de Uso');
  const siteName = dictionary.metadata?.title || 'SIKAI Consulting';
  const metaDescription = dictionary.termsOfServicePage?.metaDescription || `Detalles sobre los términos de uso de ${siteName}.`;
  return {
    title: `${pageTitle} | ${siteName}`,
    description: metaDescription,
    openGraph: {
      title: `${pageTitle} | ${siteName}`,
      description: metaDescription,
    },
    twitter: {
      title: `${pageTitle} | ${siteName}`,
      description: metaDescription,
    },
  };
}

export default async function TermsOfServicePage({ params: { locale } }: TermsOfServicePageProps) {
  const dictionary = await getDictionary(locale);
  const texts = dictionary.termsOfServicePage || {};
  const headerTexts = dictionary.header || {};
  const langSwitcherTexts = dictionary.languageSwitcher || {};
  const footerTexts = dictionary.footer || {};

  // Default placeholder content if not in dictionary
  const defaultContent = {
    title: locale === 'pt' ? 'Termos de Uso' : 'Términos de Uso',
    lastUpdated: locale === 'pt' ? 'Última atualização: 1 de Agosto de 2024' : 'Última actualización: 1 de Agosto de 2024',
    introduction: locale === 'pt' ? 'Bem-vindo aos nossos Termos de Uso...' : 'Bienvenido a nuestros Términos de Uso...',
    sections: [
      {
        heading: locale === 'pt' ? '1. Aceitação dos Termos' : '1. Aceptación de los Términos',
        paragraphs: [
          locale === 'pt' ? 'Parágrafo de exemplo 1.1...' : 'Párrafo de ejemplo 1.1...',
        ],
      },
      {
        heading: locale === 'pt' ? '2. Uso do Serviço' : '2. Uso del Servicio',
        paragraphs: [
          locale === 'pt' ? 'Parágrafo de exemplo 2.1...' : 'Párrafo de ejemplo 2.1...',
        ],
      },
    ],
    contactUs: locale === 'pt' ? 'Contate-Nos' : 'Contáctanos',
    contactDetails: locale === 'pt' ? 'Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco em [seu email de contato].' : 'Si tienes alguna pregunta sobre estos Términos de Uso, por favor contáctanos en [tu email de contacto].',
  };

   const pageContent = {
    title: texts.title || defaultContent.title,
    lastUpdated: texts.lastUpdated || defaultContent.lastUpdated,
    introduction: texts.introduction || defaultContent.introduction,
    sections: texts.sections && texts.sections.length > 0 ? texts.sections : defaultContent.sections,
    contactUs: texts.contactUs || defaultContent.contactUs,
    contactDetails: texts.contactDetails || defaultContent.contactDetails,
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header
        headerDictionary={headerTexts}
        languageSwitcherDictionary={langSwitcherTexts}
        currentLocale={locale}
      />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <article className="prose dark:prose-invert max-w-none text-foreground/90 leading-relaxed space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary font-heading mb-4">
              {pageContent.title}
            </h1>
            <p className="text-sm text-muted-foreground italic">{pageContent.lastUpdated}</p>
            
            <p>{pageContent.introduction}</p>

            {pageContent.sections.map((section, index) => (
              <section key={index} className="space-y-3">
                <h2 className="text-2xl font-semibold text-primary font-heading mt-6 mb-2">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </section>
            ))}

            <h2 className="text-2xl font-semibold text-primary font-heading mt-8 mb-2">
              {pageContent.contactUs}
            </h2>
            <p>{pageContent.contactDetails}</p>

          </article>
        </div>
      </main>
      <Footer dictionary={footerTexts} currentLocale={locale} />
    </div>
  );
}
