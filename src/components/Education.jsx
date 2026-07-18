"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Education() {
  return (
    <section id="education" className="section py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Education
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-8"
      >
        {/* Institution logo */}
        <div className="flex h-20 w-44 flex-shrink-0 items-center justify-center p-3">
          <Image
            src="/logos/organizations/belgium-campus.svg"
            alt="Belgium Campus iTversity"
            width={160}
            height={50}
            className="h-auto w-full grayscale"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-semibold text-gray-800 lg:whitespace-nowrap">
            Bachelor of Information Technology (Software Development)
          </h3>
          <p className="text-gray-600 mt-1">
            Belgium Campus iTversity · Jan 2023 – Dec 2025
          </p>
        </div>
      </motion.div>
    </section>
  );
}
