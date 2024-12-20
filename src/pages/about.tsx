"use client";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
// Import the icons you need from lucide-react here
// Link to lucide-react: https://lucide.dev/icons/
import { Telescope, Users, GraduationCap, Calendar } from "lucide-react";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import TheTeam from "~/components/sections/TheTeam";
import Link from "next/link";
import { type PageProps, usePullContent } from "~/utils/pageUtils";

interface FeatureProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const Features: React.FC<FeatureProps> = ({ Icon, title, description }) => {
  return (
    <Card className="border-gold bg-darkPurple transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
      <CardContent className="flex flex-col items-center p-6 text-center">
        {/* Make sure you import the icon you need from lucide-react */}
        <Icon className="mb-4 h-12 w-12 text-gold" />
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function AboutUsPage({ adminContent, adminError }: PageProps) {
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
    <div className="relative min-h-screen overflow-hidden bg-purple text-white">
      <Navbar />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <h1 className="mb-16 text-center text-4xl font-bold text-gold md:text-5xl lg:text-6xl">
          {content.about.heading}
        </h1>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <Image
              src="/placeholder.svg"
              alt="Students stargazing"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="mb-4 text-3xl font-semibold text-white">
              {content.about.mission.heading}
            </h2>
            <p className="mb-6 text-lg text-gray-300">
              {content.about.mission.description}
            </p>
            <Link
              href="https://forms.gle/4inuefrN1Nvyrw4z5"
              target="_blank"
              className="rounded-2xl bg-gold px-5 py-1.5 text-darkPurple hover:bg-gold/80"
            >
              Join Us
            </Link>
          </div>
        </div>

        <TheTeam teamMembers = {content.global.theTeam}/>

        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Features
            Icon={Telescope}
            title="Stargazing Sessions"
            description="Regular nighttime observations of celestial objects"
          />
          <Features
            Icon={Users}
            title="Community"
            description="A supportive network of astronomy enthusiasts"
          />
          <Features
            Icon={GraduationCap}
            title="Education"
            description="Workshops, lectures, and hands-on learning experiences"
          />
          <Features
            Icon={Calendar}
            title="Events"
            description="Exciting astronomy-related events throughout the year"
          />
        </div>

        <div className="mb-16 px-4 md:px-10 lg:px-16 2xl:px-24">
          <h2 className="mb-8 text-center text-3xl font-semibold text-white">
            {content.about.history.heading}
          </h2>
          <p className="mx-auto text-center text-lg text-gray-300">
            {content.about.history.description}
          </p>
        </div>

        <div className="px-4 text-center md:px-10 lg:px-16 2xl:px-24">
          <h2 className="mb-8 text-3xl font-semibold text-white">
            {content.about.join.heading}
          </h2>
          <p className="mx-auto mb-8 text-lg text-gray-300">
            {content.about.join.description}
          </p>
          <Link href={content.about.join.buttonLink} target="_blank">
            <Button className="bg-gold px-8 py-3 text-lg text-darkPurple hover:bg-gold/80">
              {content.about.join.buttonText}
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
