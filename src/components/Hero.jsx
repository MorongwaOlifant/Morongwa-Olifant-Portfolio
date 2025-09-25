"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center relative"
      style={{
        background:
          "radial-gradient(circle at center, rgba(200,200,200,0.6) 0%, rgba(240,240,240,0.8) 40%, rgba(255,255,255,1) 100%)",
      }}
    >
      {/* Animated Name */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-6xl font-bold text-gray-900"
      >
        Morongwa Olifant
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-4 text-lg sm:text-xl text-gray-600"
      >
        Software Developer
      </motion.p>

      {/* Call to action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 flex gap-4"
      >
        <a
          href="#projects"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-black to-gray-800 text-white font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-full bg-white text-gray-800 font-medium shadow-md border border-gray-300 hover:bg-gray-100 hover:scale-105 transition-all duration-300"
        >
          Contact Me
        </a>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6"
      >
        <a href="#projects">
          <ChevronDownIcon className="w-8 h-8 text-gray-500 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}