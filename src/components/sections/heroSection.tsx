import React from 'react';
import heroJSON from "~/controlContentHere/landingPage/frontPage.json";

interface Hero {
  title: string;
  subtitle: string;
  buttonText: string;
}

const hero: Hero = heroJSON.frontpage;

const HeroSection = () => {

  return (
    <div className="relative h-screen bg-darkPurple overflow-hidden">
      {/* Parallax Star Layers */}
      <div
        className={`absolute inset-0 parallax-stars parallax-layer`}
      ></div>
      <div
        className={`absolute inset-0 parallax-stars parallax-layer`}
        style={{ opacity: 0.8 }}
      ></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-white text-5xl lg:text-6xl font-bold px-4">
          {hero.title}
        </h1>
        <p className="text-gold mt-4 text-xl lg:text-2xl px-4">
          {hero.subtitle}
        </p>
        <button className="mt-8 bg-gold text-darkPurple py-3 px-6 font-semibold rounded-lg transition-transform duration-300 transform hover:scale-105">
          {hero.buttonText}
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
