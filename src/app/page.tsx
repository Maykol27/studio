
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { AutomationAdvisorSection } from '@/components/landing/automation-advisor-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { MethodologySection } from '@/components/landing/methodology-section';
import { BlogSection } from '@/components/landing/blog-section'; // Re-added
import { AboutSection } from '@/components/landing/about-section';
import { ContactSection } from '@/components/landing/contact-section';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  // Textos hardcodeados o directamente en los componentes
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AutomationAdvisorSection />
        <BenefitsSection />
        <MethodologySection />
        <BlogSection /> {/* Re-added */}
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
