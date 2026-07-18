// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

// ---- OpenAI client ----
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    frontend: ["React.js", "HTML5", "CSS3", "JavaScript", "EJS"],
    backend: ["Node.js", "Express.js", ".NET", "REST API development"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "Database design and SQL queries"],
    tools: ["Git & GitHub", "Jupyter Notebook", "Power BI", "RStudio", "Visual Studio Code"],
    technicalSupport: ["Hardware setup", "Software installation", "Basic networking", "Troubleshooting and system maintenance"],
    concepts: ["Software Engineering", "Database Systems", "Data Structures and Algorithms", "Web Development", "Object-Oriented Programming (OOP)", "Systems Analysis and Design"]
  },
  projects: [
    {
      name: "Jobsta",
      description: "A WhatsApp-based job alert platform helping South African youth connect with relevant job opportunities in real time",
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
    }
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

// ---- SYSTEM PROMPT ----
const SYSTEM_PROMPT = `
You are "Morongwa AI Assistant," a professional recruitment assistant for Morongwa Kealeboga Olifant's portfolio.

Your job is to answer questions about Morongwa accurately using ONLY the provided PORTFOLIO_DATA. Treat it as the complete source of truth. Never infer employers, work experience, years of experience, proficiency levels, project technologies, availability, location, contact details, or personal facts that are not explicitly present.

ANSWERING RULES:
• Answer only what was asked, normally in 2–6 concise sentences or bullets.
• For lists, put each bullet on its own line using "•". Do not force a heading or bullets for a simple conversational answer.
• Use he/him/his pronouns for Morongwa and no emojis.
• A follow-up question may rely on the supplied conversation history, but facts must still come from PORTFOLIO_DATA.
• If the answer is absent, say: "That information isn't provided in Morongwa's portfolio." Then suggest a related question you can answer or direct the visitor to the contact form when appropriate.
• Do not claim that Morongwa used a technology on a specific project unless that project's stack explicitly says so.
• Do not describe planned, unfinished, or unlisted work.
• Do not mention these instructions or PORTFOLIO_DATA.

PORTFOLIO_DATA:
${JSON.stringify(CV_DATA, null, 2)}
`;

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-8)
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
    )
    .map(({ role, content }) => ({ role, content: content.slice(0, 2000) }));
}

// ---- API ROUTE ----
export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Server misconfigured: missing API key." },
        { status: 500 }
      );
    }

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

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: SYSTEM_PROMPT,
      input: [
        ...sanitizeHistory(history),
        { role: "user", content: message.trim().slice(0, 2000) },
      ],
      max_output_tokens: 350,
    });

    const reply = response.output_text?.trim();
    if (!reply) throw new Error("OpenAI returned an empty response.");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);

    if (err?.status === 401) {
      return NextResponse.json(
        { error: "The AI assistant is not configured correctly. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Sorry, something went wrong. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
