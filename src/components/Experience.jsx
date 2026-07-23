"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Experience() {
  return (
    <section id="experience" className="section py-20">
      <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
        Experience
      </h2>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-5xl flex-col items-start gap-8 rounded-3xl bg-white p-8 shadow-lg sm:flex-row sm:items-center"
      >
        <div className="flex h-20 w-44 flex-shrink-0 items-center justify-center p-3">
          <Image
            src="/logos/organizations/sandvik.svg"
            alt="Sandvik"
            width={160}
            height={30}
            className="h-auto w-full"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Systems and Data Analyst
          </h3>
          <p className="mt-1 text-gray-600">Sandvik · Internship</p>
          <p className="mt-1 text-gray-500">Feb 2026 – Present</p>
        </div>
      </motion.article>
    </section>
  );
}
