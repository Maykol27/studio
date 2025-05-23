import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-heading">About Aetheria Consulting</h2>
            <p className="text-lg text-foreground/90 font-semibold">
              Your allies in AI-driven digital transformation. We are passionate about helping businesses thrive and scale.
            </p>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Aetheria Consulting was born from the conviction that Artificial Intelligence should be accessible and beneficial for businesses of all sizes. We bring deep insight and experience in technology (AI, automation), project management, and continuous improvement, acquired in complex environments of large industries. Now, we bring that knowledge to create simple and practical solutions to professionalize and scale your company, regardless of its size or economic capacity.
              </p>
              <p>
                Our mission is to empower businesses like yours to leverage the power of AI to optimize processes, reduce costs, improve decision-making, and enrich their customers' experience. We believe in a collaborative approach, working closely with you to understand your challenges and even discover opportunities you might not see, because we are experts in processes and in understanding your business.
              </p>
              <p>
                With a focus on tangible results and an agile implementation process, we guide you every step of the way. Our goal is not just to provide you with AI tools, but to be your strategic partner in your company's growth, allowing you to focus on what you're passionate about and what led you to build your business.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-custom">
            <Image
              src="https://placehold.co/550x400.png"
              alt="Aetheria Consulting Team or Concept"
              width={550}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="team collaboration office"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
