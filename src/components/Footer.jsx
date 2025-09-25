"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-400 mt-20">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />

      <div className="section py-10 flex flex-col items-center gap-6">
        {/* Social Links */}
        <div className="flex gap-8 text-3xl"> {/* Bigger logos + wider gap */}
          <a
            href="https://github.com/MorongwaOlifant"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/morongwa-olifant-0782371a4"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Morongwa Olifant. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}