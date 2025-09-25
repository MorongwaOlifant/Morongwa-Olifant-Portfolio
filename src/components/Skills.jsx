"use client";

import Image from "next/image";

const skills = {
  core: [
    { name: "React.js", logo: "/logos/skills/react.svg" },
    { name: "Next.js", logo: "/logos/skills/nextjs.svg" },
    { name: "JavaScript", logo: "/logos/skills/javascript.svg" },
    { name: "HTML5", logo: "/logos/skills/html.svg" },
    { name: "CSS3", logo: "/logos/skills/css.svg" },
    { name: "Tailwind CSS", logo: "/logos/skills/tailwind.svg" },
  ],
  backend: [
    { name: "Node.js", logo: "/logos/skills/nodejs.svg" },
    { name: "Express.js", logo: "/logos/skills/express.svg" },
    { name: "C# / .NET", logo: "/logos/skills/csharp.svg" },
    { name: "Python", logo: "/logos/skills/python.svg" },
    { name: "R", logo: "/logos/skills/r.svg" },
    { name: "MongoDB", logo: "/logos/skills/mongodb.svg" },
    { name: "SQL (MySQL / PostgreSQL)", logo: "/logos/skills/sql.svg" },
  ],
  tools: [
    { name: "Git & GitHub", logo: "/logos/skills/git.svg" },
    { name: "VS Code", logo: "/logos/skills/vscode.svg" },
    { name: "Visual Studio", logo: "/logos/skills/visualstudio.svg" },
    { name: "JetBrains Rider", logo: "/logos/skills/rider.png" },
    { name: "Power BI", logo: "/logos/skills/powerbi.png" },
    { name: "Jupyter Notebook", logo: "/logos/skills/jupyter.svg" },
    { name: "RStudio", logo: "/logos/skills/rstudio.svg" },
    { name: "Azure", logo: "/logos/skills/azure.svg" },
    { name: "Docker", logo: "/logos/skills/docker.svg" },
    { name: "Postman", logo: "/logos/skills/postman.svg" },
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="section py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Skills & Technologies
      </h2>

      {/* Core Web Stack */}
      <h3 className="text-2xl font-extrabold text-center mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">
        Core Web Stack
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12">
        {skills.core.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-md hover:shadow-lg transition p-6 group"
          >
            <Image
              src={skill.logo}
              alt={skill.name}
              width={48}
              height={48}
              className="mb-3 group-hover:scale-110 transition-transform"
            />
            <p className="text-gray-700 font-medium text-center text-sm">
              {skill.name}
            </p>
          </div>
        ))}
      </div>

      {/* Backend & Data */}
      <h3 className="text-2xl font-extrabold text-center mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">
        Backend & Data
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-8 mb-12">
        {skills.backend.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-md hover:shadow-lg transition p-6 group"
          >
            <Image
              src={skill.logo}
              alt={skill.name}
              width={48}
              height={48}
              className="mb-3 group-hover:scale-110 transition-transform"
            />
            <p className="text-gray-700 font-medium text-center text-sm">
              {skill.name}
            </p>
          </div>
        ))}
      </div>

      {/* Tools & Platforms */}
      <h3 className="text-2xl font-extrabold text-center mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-500">
        Tools & Platforms
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {skills.tools.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-md hover:shadow-lg transition p-6 group"
          >
            <Image
              src={skill.logo}
              alt={skill.name}
              width={48}
              height={48}
              className="mb-3 group-hover:scale-110 transition-transform"
            />
            <p className="text-gray-700 font-medium text-center text-sm">
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}