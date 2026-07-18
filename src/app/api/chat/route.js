// src/app/api/chat/route.js
import { NextResponse } from "next/server";

// ---- Simple in-memory rate limit per IP ----
const ipRateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 30;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipRateLimit.get(ip);

  if (!entry) {
    ipRateLimit.set(ip, { count: 1, start: now });
    return false;
  }

  const elapsed = now - entry.start;

  if (elapsed > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    ipRateLimit.set(ip, { count: 1, start: now });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS_PER_WINDOW) return true;

  ipRateLimit.set(ip, entry);
  return false;
}

// ---- Structured CV Data ----
const CV_DATA = {
  identity: {
    name: "Morongwa Olifant",
    role: "Software Developer",
    email: "Olifantmorongwa@gmail.com",
    phone: "079 305 3609",
    linkedin: "https://www.linkedin.com/in/morongwa-olifant-0782371a4/",
    github: "https://github.com/MorongwaOlifant",
  },
  education: {
    degree: "Bachelor of Information Technology — Specialisation: Software Development",
    institution: "Belgium Campus iTversity (2023–2025)",
    coursework: [
      "Programming (JavaScript, C#, Python, R)",
      "Software Engineering, Web Development",
      "Cloud-Native App Architecture",
      "Artificial Intelligence, Machine Learning, Data Analytics",
      "Database Development (SQL, MongoDB, ERDs)",
      "Project Management, Systems Analysis & Design",
      "Business Intelligence, User Experience Design"
    ]
  },
  summary: [
    "Detail-oriented Software Developer and IT graduate with a strong foundation in Object-Oriented Programming, Web Development, and Database Systems",
    "Experience building full-stack applications using React.js, Node.js, .NET, and MongoDB",
    "Comfortable with hardware setup, networking basics, and IT troubleshooting",
    "Known for clean, maintainable code, adaptability, teamwork, and continuous learning in fast-paced environments"
  ],
  skills: {
    languages: ["JavaScript", "C#", "Python", "R", "SQL"],
    frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "EJS"],
    backend: ["Node.js", "Express.js", ".NET", "REST API development"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "Database design and SQL queries"],
    tools: ["Git & GitHub", "Jupyter Notebook", "Power BI", "RStudio", "Visual Studio Code", "Visual Studio", "JetBrains Rider", "Azure", "Docker", "Postman"],
    technicalSupport: ["Hardware setup", "Software installation", "Basic networking", "Troubleshooting and system maintenance"],
    concepts: ["Software Engineering", "Database Systems", "Data Structures and Algorithms", "Web Development", "Object-Oriented Programming (OOP)", "Systems Analysis and Design"]
  },
  projects: [
    {
      name: "Jobsta",
      status: "in progress",
      stack: "React.js, Tailwind CSS, Node.js, Firebase",
      description: "A WhatsApp-based job alert platform helping South African youth connect with relevant job opportunities in real time",
      details: [
        "Focuses on helping unemployed youth in South Africa",
        "Uses a React-based interface and backend architecture to manage user data and job matches",
        "Includes a scalable notification system and database schema designed to improve job-delivery accuracy",
        "Twilio integration is planned",
      ],
      links: {
        github: "https://github.com/MorongwaOlifant/jobsta",
        demo: "https://jobsta-8n1hee1g1-morongwa-olifants-projects.vercel.app/"
      }
    },
    {
      name: "CityFix",
      stack: "React.js, Tailwind CSS, Node.js, MongoDB",
      description: "A full-stack city reporting platform where residents submit service issues with images and admins manage reports, users, status updates, and fulfilled cases",
      links: {
        github: "https://github.com/MorongwaOlifant/cityfix-web",
        demo: "https://cityfix-nu.vercel.app/"
      }
    },
    {
      name: "Personal Portfolio Website",
      stack: "Next.js, React.js, Tailwind CSS, Vercel",
      description: "Morongwa's responsive portfolio website showcasing his projects, skills, education, resume, and contact form",
      links: {
        github: "https://github.com/MorongwaOlifant/Morongwa-Olifant-Portfolio",
        demo: "https://www.morongwaolifant.com"
      }
    }
  ],
  certifications: [
    "Responsive Web Design — freeCodeCamp (2023)"
  ],
  strengths: [
    "Fast learner — Quickly adapts to new technologies and frameworks",
    "Clean code — Writes maintainable, scalable applications",
    "Consistent delivery — Reliable in meeting project deadlines",
    "Practical experience — Builds real-world applications",
    "Strong analytical thinking and problem-solving",
    "Teamwork and communication skills"
  ]
};

const bulletList = (items) => items.map((item) => `• ${item}`).join("\n");

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9+#.]+/g, " ").trim();
}

function compact(value) {
  return normalize(value).replace(/[^a-z0-9+#]/g, "");
}

function editDistance(left, right) {
  const rows = Array.from({ length: left.length + 1 }, () =>
    Array(right.length + 1).fill(0)
  );
  for (let row = 0; row <= left.length; row += 1) rows[row][0] = row;
  for (let column = 0; column <= right.length; column += 1) rows[0][column] = column;

  for (let row = 1; row <= left.length; row += 1) {
    for (let column = 1; column <= right.length; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      rows[row][column] = Math.min(
        rows[row - 1][column] + 1,
        rows[row][column - 1] + 1,
        rows[row - 1][column - 1] + cost
      );
    }
  }
  return rows[left.length][right.length];
}

function recentContext(history) {
  if (!Array.isArray(history)) return "";
  return history
    .slice(-4)
    .filter((item) => item && typeof item.content === "string")
    .map((item) => item.content)
    .join(" ");
}

function projectAnswer(project, question) {
  const asksForStack = /(stack|technolog|built with|build.*with|tools|framework|language)/.test(question);

  if (asksForStack) {
    return project.stack
      ? `${project.name} is built with ${project.stack}.`
      : `The technologies used for ${project.name} aren't specified in Morongwa's portfolio. Its verified description is: ${project.description}.`;
  }

  const status = project.status ? ` Its documented status is ${project.status}.` : "";
  const details = project.details ? `\n${bulletList(project.details)}` : "";
  return `${project.name} is ${project.description}.${status}${details}\n\n• Live project: ${project.links.demo}\n• GitHub: ${project.links.github}`;
}

function answerSkillQuestion(question) {
  const skillGroups = Object.values(CV_DATA.skills).flat();
  const aliases = {
    react: "React.js",
    reactjs: "React.js",
    next: "Next.js",
    nextjs: "Next.js",
    javascript: "JavaScript",
    js: "JavaScript",
    html: "HTML5",
    css: "CSS3",
    tailwind: "Tailwind CSS",
    node: "Node.js",
    nodejs: "Node.js",
    express: "Express.js",
    expressjs: "Express.js",
    dotnet: ".NET",
    "c sharp": "C#",
    csharp: "C#",
    postgres: "PostgreSQL",
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    mongodb: "MongoDB",
    github: "Git & GitHub",
    vscode: "Visual Studio Code",
    powerbi: "Power BI",
    "power bi": "Power BI",
    "business intelligence": "Power BI",
    pbix: "Power BI",
    jupyter: "Jupyter Notebook",
    rstudio: "RStudio",
  };
  const normalizedSkills = skillGroups.map((skill) => ({
    skill,
    normalized: normalize(skill),
  }));
  const compactQuestion = compact(question);
  const alias = Object.entries(aliases).find(([name]) =>
    compactQuestion.includes(compact(name))
  );
  const matched = normalizedSkills.find(({ normalized }) => {
    if (normalized.length === 1) return question.split(" ").includes(normalized);
    return ` ${question} `.includes(` ${normalized} `);
  });
  let skill = alias?.[1] || matched?.skill;

  if (!skill) {
    const words = question.split(" ").filter((word) => word.length >= 2);
    const phrases = words.flatMap((_, index) => [
      words[index],
      words.slice(index, index + 2).join(""),
      words.slice(index, index + 3).join(""),
    ]);
    const fuzzyAlias = Object.entries(aliases).find(([name]) => {
      const candidateValue = compact(name);
      if (candidateValue.length < 4) return false;
      const tolerance = candidateValue.length >= 6 ? 2 : 1;
      return phrases.some(
        (phrase) => editDistance(compact(phrase), candidateValue) <= tolerance
      );
    });
    skill = fuzzyAlias?.[1];

    const fuzzyMatch = normalizedSkills.find(({ skill: candidate }) => {
      const candidateValue = compact(candidate);
      return phrases.some((phrase) => {
        const wordValue = compact(phrase);
        const tolerance = candidateValue.length >= 6 ? 2 : 1;
        return editDistance(wordValue, candidateValue) <= tolerance;
      });
    });
    skill ||= fuzzyMatch?.skill;
  }

  if (!skill) return null;
  return `Yes. ${skill} is listed among Morongwa's skills and technologies. His portfolio does not assign proficiency levels, so I can't accurately rate his level beyond that.`;
}

function answerQuestion(message, history) {
  const question = normalize(message);
  const context = normalize(`${message} ${recentContext(history)}`);
  const cityFix = CV_DATA.projects.find((project) => project.name === "CityFix");
  const jobsta = CV_DATA.projects.find((project) => project.name === "Jobsta");

  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(question)) {
    return "Hi! I can answer questions about Morongwa's skills, projects, education, strengths, and technical background.";
  }
  if (/\b(thank|thanks)\b/.test(question)) {
    return "You're welcome. Feel free to ask another question about Morongwa's portfolio.";
  }
  if (/(contact|email|phone|reach|hire|interview)/.test(question)) {
    return `You can contact Morongwa using the website's “Let's Connect” form.\n\n• Email: ${CV_DATA.identity.email}\n• Phone: ${CV_DATA.identity.phone}\n• LinkedIn: ${CV_DATA.identity.linkedin}`;
  }
  if (/(resume|cv|curriculum vitae)/.test(question)) {
    return "Morongwa's resume is available from the “Download Resume” button in the contact section.";
  }
  if (question.includes("cityfix") || (/(it|that|project)/.test(question) && context.includes("cityfix"))) {
    return projectAnswer(cityFix, question);
  }
  if (question.includes("jobsta") || (/(it|that|project)/.test(question) && context.includes("jobsta"))) {
    return projectAnswer(jobsta, question);
  }
  if (/(certif|credential|freecodecamp|responsive web design)/.test(question)) {
    return `Morongwa's listed certification is:\n${bulletList(CV_DATA.certifications)}`;
  }
  if (/(project|portfolio|built|created|work sample)/.test(question)) {
    return `Morongwa's featured projects are:\n${bulletList(
      CV_DATA.projects.map((project) => `${project.name} — ${project.description}`)
    )}`;
  }
  if (/(education|degree|studied|study|university|college|qualification|graduate|school)/.test(question)) {
    return `${CV_DATA.education.degree} from ${CV_DATA.education.institution}.\n\nRelevant coursework includes:\n${bulletList(CV_DATA.education.coursework)}`;
  }
  if (/(programming language|languages|code in)/.test(question)) {
    return `Morongwa's listed programming languages are:\n${bulletList(CV_DATA.skills.languages)}`;
  }
  if (/(tools|platforms|software does|development environment)/.test(question)) {
    return `Morongwa works with:\n${bulletList(CV_DATA.skills.tools)}`;
  }
  if (/(database|data storage|sql)/.test(question)) {
    return `Morongwa's database skills include:\n${bulletList(CV_DATA.skills.databases)}`;
  }
  if (/(front end|frontend|ui technolog|web stack)/.test(question)) {
    return `Morongwa's frontend skills include:\n${bulletList(CV_DATA.skills.frontend)}`;
  }
  if (/(back end|backend|api|server side)/.test(question)) {
    return `Morongwa's backend skills include:\n${bulletList(CV_DATA.skills.backend)}`;
  }
  if (/(technical support|hardware|network|troubleshoot)/.test(question)) {
    return `Morongwa's technical-support skills include:\n${bulletList(CV_DATA.skills.technicalSupport)}`;
  }
  if (/(strength|soft skill|good at|why hire|team|problem.solv)/.test(question)) {
    return `Morongwa's documented strengths include:\n${bulletList(CV_DATA.strengths)}`;
  }
  if (/(skill|technolog|tech stack|know|experience with|familiar with|use )/.test(question)) {
    const skillAnswer = answerSkillQuestion(question);
    if (skillAnswer) return skillAnswer;
    return `Morongwa's core technical skills include:\n${bulletList([
      ...CV_DATA.skills.languages,
      ...CV_DATA.skills.frontend,
      ...CV_DATA.skills.backend,
      ...CV_DATA.skills.databases,
    ])}`;
  }
  if (/(about morongwa|who is|introduce|summary|profile|tell me about)/.test(question)) {
    return `${CV_DATA.identity.name} is a ${CV_DATA.identity.role}.\n${bulletList(CV_DATA.summary)}`;
  }
  if (/(years of experience|available|availability|where does he live|salary)/.test(question)) {
    return "That information isn't provided in Morongwa's portfolio. You can use the contact form to ask him directly.";
  }

  return "I couldn't match that question to verified portfolio information. Try asking about Morongwa's projects, skills, education, strengths, resume, or how to contact him.";
}

// ---- API ROUTE ----
export async function POST(req) {
  try {
    // ---- IP Rate limiting ----
    const ipHeader =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    const ip = ipHeader?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // ---- Parse request ----
    const body = await req.json();
    const { message, history = [] } = body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Missing 'message' in request body." },
        { status: 400 }
      );
    }

    const reply = answerQuestion(message.trim().slice(0, 500), history);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);

    return NextResponse.json(
      {
        error:
          "Sorry, something went wrong. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
