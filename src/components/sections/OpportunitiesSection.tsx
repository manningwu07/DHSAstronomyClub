import React, { useEffect, useRef } from "react";

import opportunitiesJSON from "~/controlContentHere/landingPage/opportunities.json";
import OpportunityCard from "../cards/opportunityCard";
 
interface Opportunity {
  imageUrl?: string;
  title: string;
  description: string;
}

const opportunities: Opportunity[] = opportunitiesJSON.featured_opportunities;

const OpportunitiesSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <>
      <h2 className="mb-12 text-center text-4xl font-bold text-white">
        Hot Opportunities
      </h2>

      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <svg
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Constellation lines connecting the opportunity cards */}
        <path
          d="M500,200 L250,600 L750,600 Z"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          strokeDasharray="10,5"
          filter="url(#glow)"
        />

        {/* Small stars along the lines */}
        <g fill="#ffd700" filter="url(#glow)">
          <circle cx="500" cy="200" r="3" /> {/* Top star */}
          <circle cx="250" cy="600" r="3" /> {/* Bottom-left star */}
          <circle cx="750" cy="600" r="3" /> {/* Bottom-right star */}
        </g>

        {/* Larger stars at vertices */}
        <g fill="#ffd700" filter="url(#glow)">
          <path d="M500,200 l2.5,7.5h7.5l-6,4.5 2.5,7.5-6-4.5-6,4.5 2.5-7.5-6-4.5h7.5z" />
          <path d="M250,600 l2.5,7.5h7.5l-6,4.5 2.5,7.5-6-4.5-6,4.5 2.5-7.5-6-4.5h7.5z" />
          <path d="M750,600 l2.5,7.5h7.5l-6,4.5 2.5,7.5-6-4.5-6,4.5 2.5-7.5-6-4.5h7.5z" />
        </g>

        {/* Gradient for lines */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffd700" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#ffd700" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffd700" stopOpacity="0.3" />
        </linearGradient>
      </svg>

      <div className="relative flex flex-col items-center justify-center gap-12 md:flex-row md:items-start md:gap-2 md:px-5 lg:gap-5 lg:px-10">
        <OpportunityCard
          imageUrl="/placeholder.svg"
          title={opportunities[0]!.title}
          description={opportunities[0]!.description}
          className="md:mt-96 lg:mt-[500px] 2xl:mt-[650px]"
        />
        <OpportunityCard
          imageUrl="/placeholder.svg"
          title={opportunities[1]!.title}
          description={opportunities[1]!.description}
          className="z-10"
        />
        <OpportunityCard
          imageUrl="/placeholder.svg"
          title={opportunities[2]!.title}
          description={opportunities[2]!.description}
          className="md:mt-96 lg:mt-[500px] 2xl:mt-[650px]"
        />
      </div>
    </>
  );
};

export default OpportunitiesSection;
