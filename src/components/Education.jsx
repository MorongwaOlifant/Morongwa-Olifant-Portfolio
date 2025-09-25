"use client";

import { motion } from "framer-motion";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

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
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 flex items-start gap-6"
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          <AcademicCapIcon className="h-12 w-12 text-black" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
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