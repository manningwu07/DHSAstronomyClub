import Link from "next/link"; 
import React from "react";
import { type DataStructure } from "~/utils/dataStructure";

const HeroSection = ({ title, subtitle, buttonText }: DataStructure["landing"]["hero"]) => {
  return (
    <div className="relative h-screen overflow-hidden bg-darkPurple">
      {/* Parallax Star Layers */}
      <div className={`parallax-stars parallax-layer absolute inset-0`}></div>
      <div
        className={`parallax-stars parallax-layer absolute inset-0`}
        style={{ opacity: 0.8 }}
      ></div>

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="px-4 text-5xl font-bold text-white lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 px-4 text-xl text-gold lg:text-2xl">
          {subtitle}
        </p>
        <Link href="https://forms.gle/4inuefrN1Nvyrw4z5" target="_blank">
          <button className="mt-8 transform rounded-lg bg-gold px-6 py-3 font-semibold text-darkPurple transition-transform duration-300 hover:scale-105">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
