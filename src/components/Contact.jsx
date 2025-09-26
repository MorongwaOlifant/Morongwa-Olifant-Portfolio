"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_r603taj",
        "template_e7t4jkm",
        e.target,
        "pYyawR8zdc-6RNqsK"
      )
      .then(
        () => {
          toast.success("Message sent successfully");
          setLoading(false);
          e.target.reset();
        },
        (error) => {
          toast.error("Oops! Something went wrong");
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="section py-20">
      {/* Toast container */}
      <Toaster position="top-right" />

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Let’s Connect
      </h2>
      <p className="text-center text-gray-600 mb-12">
        Have a project in mind? Let’s create something amazing together.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto space-y-6 bg-white p-8 rounded-3xl shadow-lg"
      >
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          required
          className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          required
          className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:outline-none"
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Message"
          required
          className="w-full p-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-full bg-gradient-to-r from-black to-gray-800 text-white font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Resume + Social Links */}
      <div className="flex flex-col items-center mt-10 space-y-6">
        <a
          href="/Morongwa-Olifant-Resume.pdf"
          download
          className="flex items-center gap-2 px-5 py-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition"
        >
          <HiOutlineDocumentDownload className="text-xl" />
          Download Resume
        </a>
      </div>
    </section>
  );
}