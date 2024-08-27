"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
);

const Star = ({ x, y, size }: { x: string; y: string; size: number }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  />
);

const BlackHole = () => (
  <motion.div
    className="absolute w-[800px] h-[800px]"
    style={{
      background: "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(64,0,0,0.5) 50%, rgba(0,0,0,0) 70%)",
      left: "calc(50% - 400px)",
      top: "calc(50% - 400px)",
    }}
    animate={{
      rotate: 360,
      scale: [1, 1.1, 1],
    }}
    transition={{
      rotate: {
        duration: 200,
        repeat: Infinity,
        ease: "linear",
      },
      scale: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }}
  />
);

const FireParticles = () => (
  <>
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-orange-500 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </>
);

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative">
      <GradientBackground />
      <div className="absolute inset-0 overflow-hidden">
        <BlackHole />
        <FireParticles />
        {[...Array(200)].map((_, i) => (
          <Star
            key={i}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
            size={Math.random() * 2 + 1}
          />
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
        <motion.h1
          className="text-3xl md:text-7xl font-bold text-white text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, yoyo: Infinity, ease: "easeInOut" }}
        >
          Rate My Professor <br /> with AI Precision
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 max-w-2xl text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Get instant, unbiased professor ratings powered by artificial intelligence
        </motion.p>
        <Link href="/chatbot" passHref>
          <motion.button
            className="px-8 py-4 text-lg font-semibold text-white bg-red-700 rounded-full transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
