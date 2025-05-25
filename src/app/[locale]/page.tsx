import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { AutomationAdvisorSection } from '@/components/landing/automation-advisor-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { MethodologySection } from '@/components/landing/methodology-section';
import { BlogSection } from '@/components/landing/blog-section';
import { AboutSection } from '@/components/landing/about-section';
import { ContactSection } from '@/components/landing/contact-section';
import { Footer } from '@/components/landing/footer';

export default async function LandingPage({ params: { locale } }: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header dictionary={dictionary.header} currentLocale={locale} />
      <main className="flex-grow">
        <HeroSection dictionary={dictionary.heroSection} />
        <AutomationAdvisorSection dictionary={dictionary.automationAdvisorSection} />
        <BenefitsSection dictionary={dictionary.benefitsSection} />
        <MethodologySection dictionary={dictionary.methodologySection} />
        <BlogSection dictionary={dictionary.blogSection} locale={locale} />
        <AboutSection dictionary={dictionary.aboutSection} />
        <ContactSection dictionary={dictionary.contactSection} />
      </main>
      <Footer dictionary={dictionary.footer} currentLocale={locale} />
    </div>
  );
}
