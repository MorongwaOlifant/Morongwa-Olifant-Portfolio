"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const experience = {
  role: "Systems and Data Analytics HRD Intern",
  company: "Sandvik Mining",
  period: "2 February 2026 – Present",
  responsibilities: [
    "Build Power Apps and Power Automate workflows for HRD processes.",
    "Manage SharePoint structures, eLearning data, and compliance reporting.",
    "Clean and analyze HRD data and develop Power BI dashboards.",
    "Support HRD users, reporting, automation, and systems troubleshooting.",
  ],
};

export default function Experience() {
  return (
    <section id="experience" className="section py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Work Experience
      </h2>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-lg"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-36 flex-none items-center justify-center rounded-2xl bg-gray-50 p-3">
              <Image
                src="/logos/organizations/sandvik.svg"
                alt="Sandvik"
                width={132}
                height={24}
                className="h-auto w-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {experience.role}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-700">
                {experience.company}
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            {experience.period}
          </span>
        </div>

        <ul className="mt-8 grid gap-4 text-gray-700 md:grid-cols-2">
          {experience.responsibilities.map((responsibility) => (
            <li key={responsibility} className="flex gap-3 leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-black" />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </section>
  );
}
