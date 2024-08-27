"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LightStreak = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute h-0.5 w-32 bg-white opacity-50"
    initial={{ opacity: 0, width: 0, left: "100%", top: `${Math.random() * 100}%` }}
    animate={{
      opacity: [0, 1, 0],
      width: ["0%", "70%", "0%"],
      left: ["100%", "-10%", "-10%"],
    }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: Math.random() * 5 }}
  />
);

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-black relative">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <LightStreak key={i} delay={i * 0.2} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 min-h-screen"
      >
        <h1 className="text-3xl md:text-7xl font-bold text-white text-center">
          Rate My Professor <br /> with AI Precision
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl text-center mb-12">
          Get instant, unbiased professor ratings powered by artificial intelligence
        </p>
        <Link href="/chatbot">
          <button className="px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-all duration-300">
            Start Rating
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
