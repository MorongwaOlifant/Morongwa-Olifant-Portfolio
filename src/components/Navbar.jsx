"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "education", "projects", "skills", "contact"];
      let current = "hero";

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Education", "Projects", "Skills", "Contact"];

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all ${
        scrolled ? "scale-95 shadow-lg" : "scale-100"
      }`}
    >
      <nav className="backdrop-blur-md bg-white/70 border border-white/20 shadow-lg rounded-full px-8 py-3 flex items-center justify-between w-[90vw] max-w-5xl">
        {/* Logo / Name */}
        <Link
          href="#hero"
          className="font-bold text-lg text-gray-900 hover:text-black transition"
        >
          Morongwa Olifant
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <Link
                key={id}
                href={`#${id}`}
                className={`px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-black to-gray-800 text-white"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-white/80 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-4 space-y-3 text-center">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;

            return (
              <Link
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-black to-gray-800 text-white"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-black hover:to-gray-800 hover:text-white"
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}