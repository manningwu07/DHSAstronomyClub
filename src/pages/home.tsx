import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import HeroSection from "~/components/sections/HeroSectionX";
import JoinSection from "~/components/sections/JoinSection";
import OpportunitiesSection from "~/components/sections/OpportunitiesSection";
import Testimonials from "~/components/sections/TestimonialsSection";
import TheTeam from "~/components/sections/TheTeam";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-purple text-white">
      <Navbar />

      <main>
        <section className="bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center text-center">
          <HeroSection />
        </section>

        <section className="relative bg-gradient-to-b from-darkPurple to-purple py-20">
          <OpportunitiesSection />
        </section>

        <section>
          <Testimonials />
        </section>

        <section className="bg-purple pb-16">
          <TheTeam />
        </section>

        <section className="bg-gradient-to-b from-purple to-darkPurple py-16">
          <JoinSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
