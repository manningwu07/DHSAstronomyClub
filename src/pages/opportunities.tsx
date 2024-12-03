"use client";
import React, { useEffect, useRef, useState } from "react";
import { set } from "zod";
import OpportunityCard from "~/components/cards/opportunityCard";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import JoinSection from "~/components/sections/JoinSection";
import { type PageProps, usePullContent } from "~/utils/pageUtils";

interface Opportunity {
  imageSrc: string;
  title: string;
  description: string;
}

const getMarginClass = (index: number) => {
  switch (index) {
    case 0:
      return "mt-0";
    case 1:
      return "md:mt-12";
    case 2:
      return "md:mt-24";
    case 3:
      return "md:mt-36";
    default:
      return "mt-0";
  }
};

export default function OpportunitiesPage({
  adminContent,
  adminError,
}: PageProps) {
  const pullContent = usePullContent(); // Unconditionally call the hook

  const content = adminContent ?? pullContent.content;
  const error = adminError ?? pullContent.error;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [featuredOpportunities, setFeaturedOpportunities] = useState<Opportunity[]>([]);
  const [otherOpportunities, setOtherOpportunities] = useState<Opportunity[]>([]);
  const [opportunities, setOpportunities] = useState<React.JSX.Element[]>([]);

  // Draw canvas in background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const numParticles = 100;
    const connectionDistance = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        ctx!.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i]!.update();
        particles[i]!.draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i]!.x - particles[j]!.x;
          const dy = particles[i]!.y - particles[j]!.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 215, 0, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i]!.x, particles[i]!.y);
            ctx.lineTo(particles[j]!.x, particles[j]!.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!otherOpportunities || !featuredOpportunities) return;
    const rows = Math.ceil(otherOpportunities.length / 3);
    const opportunityCards = [];

    for (let i = 0; i < rows; i++) {
      const cardsInRow = [];

      for (let j = 0; j < 3; j++) {
        const opportunityIndex = i * 3 + j;
        if (opportunityIndex >= otherOpportunities.length) break;

        // Non-null assertions because guard clause above
        cardsInRow.push(
          <OpportunityCard
            key={opportunityIndex}
            imageUrl={otherOpportunities[opportunityIndex]!.imageSrc}
            title={otherOpportunities[opportunityIndex]!.title}
            description={otherOpportunities[opportunityIndex]!.description}
            className={getMarginClass(3 - j)}
          />,
        );
      }

      opportunityCards.push(
        <div
          key={`row-${i}`}
          className="flex flex-col gap-8 py-4 md:flex-row md:items-start md:justify-center md:gap-10 lg:gap-12"
        >
          {cardsInRow}
        </div>,
      );
    }
    setOpportunities(opportunityCards);
  }, [otherOpportunities]);

  useEffect(() => {
    if (!content) return;
    const opportunities = content.global.opportunities;

    setFeaturedOpportunities(opportunities.featured.length === 3
      ? opportunities.featured
      : opportunities.featured.slice(0, 3));
    setOtherOpportunities(opportunities.other);
  }, [content]);

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
    <div className="relative min-h-screen overflow-hidden bg-darkPurple text-white">
      <Navbar />

      <canvas ref={canvasRef} className="absolute z-0" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <h1 className="mb-16 text-center text-4xl font-bold text-gold md:text-5xl lg:text-6xl">
          Astronomy Club Opportunities
        </h1>

        <div className="mb-8 md:mb-16">
          <h2 className="mb-8 flex justify-center text-3xl font-semibold text-white md:text-4xl">
            Featured Opportunities
          </h2>
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-center md:gap-10 lg:gap-12">
            {featuredOpportunities.map((opportunity, index) => (
              <OpportunityCard
                key={index}
                imageUrl={opportunity.imageSrc}
                title={opportunity.title}
                description={opportunity.description}
                className={getMarginClass(index)}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="flex justify-center text-3xl font-semibold text-white md:text-4xl">
            Other Opportunities
          </h2>
          {opportunities}
        </div>

        <div className="mt-16 text-center">
          <JoinSection />
        </div>

        <Footer />
      </div>
    </div>
  );
}
