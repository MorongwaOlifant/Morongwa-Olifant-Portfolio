"use client";

import { motion } from "framer-motion";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";

const experience = {
  role: "Systems and Data Analytics HRD Intern",
  company: "Sandvik Mining",
  location: "Gauteng",
  period: "2 February 2026 – Present",
  responsibilities: [
    "Develop and maintain Power Apps and Power Automate solutions for HRD workflows.",
    "Create and manage SharePoint data structures and dashboards.",
    "Collect, clean, and validate HRD data, then develop Power BI dashboards and actionable reports.",
    "Support BBBEE and Skills Development reporting requirements.",
    "Administer eLearning through the LMS, monitor learner progress, and generate compliance reports.",
    "Identify HRD processes for automation and streamline eDocs and SharePoint structures.",
    "Analyze training trends and learner performance to prepare reports and recommendations.",
    "Support HRD users, coordinate technical troubleshooting with IT, and conduct training on Power Apps and dashboards.",
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
            <div className="rounded-2xl bg-gray-100 p-3">
              <BriefcaseIcon className="h-8 w-8 text-gray-900" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {experience.role}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-700">
                {experience.company}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPinIcon className="h-4 w-4" />
                {experience.location}
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
