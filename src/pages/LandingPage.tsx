import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import HeroSection from "~/components/sections/HeroSection";
import JoinSection from "~/components/sections/JoinSection";
import OpportunitiesSection from "~/components/sections/OpportunitiesSection";
import Testimonials from "~/components/sections/TestimonialsSection";
import TheTeam from "~/components/sections/TheTeam";
import { type PageProps, usePullContent } from "~/utils/pageUtils";

export default function LandingPage({ adminContent, adminError }: PageProps) {
  const pullContent = usePullContent(); // Unconditionally call the hook

  const content = adminContent ?? pullContent.content;
  const error = adminError ?? pullContent.error;

  if (error) {
    // Display a fallback error message if Firestore fetch fails
    return (
      <div className="error-container">
        <h1>Service Unavailable</h1>
        <p>
          We&apos;re experiencing issues retrieving content. Please try again
          later.
        </p>
      </div>
    );
  }

  if (!content) {
    // Loading indicator while content is being fetched
    return (
      <div className="flex items-center justify-center text-3xl">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-purple text-white">
      <Navbar />

      <main>
        <section className="bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center text-center">
          <HeroSection {...content.landing.hero}/>
        </section>

        <section className="relative bg-gradient-to-b from-darkPurple to-purple py-20">
          <OpportunitiesSection opportunities={content.global.opportunities.featured}/>
        </section>

        <section>
          <Testimonials testimonials= {content.landing.testimonials}/>
        </section>

        <section className="bg-purple pb-16">
          <TheTeam teamMembers={content.global.theTeam}/>
        </section>

        <section className="bg-gradient-to-b from-purple to-darkPurple py-16">
          <JoinSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
