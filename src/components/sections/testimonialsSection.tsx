import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import ShootingStarTrail from "../ui/shootingStarTrail";
import TestimonialCard from "../cards/testimonialCard";
import testimonialsJSON from "~/controlContentHere/landingPage/testimonials.json";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = testimonialsJSON.testimonials; 

const generateQuadraticKeyframes = (steps: number): string[] => {
  const keyframes = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = 150 * (t * t);
    keyframes.push(`${y}%`);
  }
  return keyframes;
};

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] =
    useState<Testimonial | null>(null);
  const [starIsAnimating, setStarIsAnimating] = useState(false);
  const [fromLeft, setFromLeft] = useState(true);

  useEffect(() => {
    const animateNextTestimonial = () => {
      setStarIsAnimating(true);
      setTimeout(() => {
        setStarIsAnimating(false);
        const nextTestimonial =
          testimonials[Math.floor(Math.random() * testimonials.length)];
        setCurrentTestimonial(nextTestimonial!);
        setFromLeft((prevFromLeft) => !prevFromLeft);
      }, 2000); // Adjust testimonial exposure duration as needed
    };

    const interval = setInterval(animateNextTestimonial, 5500); // Adjust cycle duration as needed
    return () => clearInterval(interval);
  }, []);

  const steps = 20;
  const yKeyframes = generateQuadraticKeyframes(steps);

  return (
    <div className="min-h-96 bg-purple">
      <h2 className="py-16 text-center text-4xl font-bold text-white">
        Our Club Member&apos;s Opinions
      </h2>
      {/* Star trail animation */}
      <AnimatePresence>
        {starIsAnimating && (
          <div className="relative mt-10 flex w-screen items-center justify-center">
            <motion.div
              key="shooting-star"
              className="absolute"
              initial={{
                x: fromLeft ? "-100vw" : "100vw",
                y: "0%",
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                x: fromLeft ? "-5vw" : "5vw",
                y: yKeyframes,
                opacity: [0, 1],
                scale: [0.5, 0.5, 1, 1.5, 2],
              }}
              transition={{
                duration: 2,
                y: {
                  duration: 2,
                  ease: "easeInOut",
                  times: Array.from(
                    { length: steps },
                    (_, i) => i / (steps - 1),
                  ),
                },
                opacity: {
                  duration: 2,
                  times: [0, 1],
                },
                scale: {
                  duration: 2, // Scale over the entire duration
                  ease: "easeInOut",
                  times: [0, 0.25, 0.5, 0.75, 1], // Time intervals for each scale value
                },
              }}
            >
              <div className="flex items-center">
                {fromLeft && <ShootingStarTrail fromLeft={fromLeft} />}
                <Star
                  className="h-8 w-8 text-white"
                  fill="white"
                  stroke="none"
                  style={{
                    marginLeft: fromLeft ? "-28px" : "auto",
                    marginRight: fromLeft ? "auto" : "-28px",
                    zIndex: 10,
                  }}
                />
                {!fromLeft && <ShootingStarTrail fromLeft={fromLeft} />}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Testominal card */}
      <AnimatePresence>
        {currentTestimonial && !starIsAnimating && (
          <motion.div
            key={currentTestimonial.id}
            className="mx-auto max-w-md rounded-lg border border-gold p-6 shadow-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "fade", duration: 0.5 }}
          >
            {/* Inner white box that fades out */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <TestimonialCard
              testimonial={currentTestimonial.quote}
              author={currentTestimonial.author}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
