"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Jobsta",
    description:
      "A WhatsApp-based job alert platform helping South African youth connect with relevant job opportunities in real-time.",
    image: "/projects/jobsta.jpg",
    github: "https://github.com/MorongwaOlifant/jobsta",
    demo: "#",
  },
  {
    title: "PayTrckr",
    description:
      "A lay-by and payment tracking manager designed for small online sellers, with a future roadmap to evolve into a full payment gateway solution.",
    image: "/projects/paytrckr.jpg",
    github: "https://github.com/MorongwaOlifant/paytrckr",
    demo: "#",
  },
  {
    title: "Zazi (SOS System)",
    description:
      "An SOS emergency response system built to connect users to help quickly during crises, improving safety and response times.",
    image: "/projects/zazi.jpg",
    github: "https://github.com/MorongwaOlifant/zazi",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section py-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        Featured Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.title}
              className="object-cover transition-transform duration-500 group-hover:scale-105 absolute inset-0 w-full h-full"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>

            {/* Text Content */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-200">{project.description}</p>

              <div className="flex gap-3 mt-4">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-black to-gray-800 text-white text-sm font-medium shadow hover:scale-105 transition-transform duration-300"
                >
                  View Project
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/90 text-gray-900 text-sm font-medium shadow hover:bg-white hover:scale-105 transition-transform duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}