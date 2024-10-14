'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "/opportunities", label: "Opportunities" },
    { href: "/about", label: "About Us" },
    { href: "/classes", label: "Classes" },
    { href: "https://discord.gg/tB99sbbxWA", label: "Join Our Discord", external: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-purple bg-darkPurple text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="AstroGaels"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold">AstroGaels</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-gold ${
                item.external
                  ? "px-1.5 py-0.5 rounded-md bg-gold text-darkPurple hover:bg-gold/90"
                  : ""
              }`}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-darkPurple bg-opacity-95 absolute top-full left-0 right-0 shadow-lg"
        >
          <div className="container mx-auto px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-gold transition-colors"
                onClick={toggleMenu}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
