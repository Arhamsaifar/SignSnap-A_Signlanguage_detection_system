"use client";
import React, { useRef } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 120"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <motion.linearGradient
          id="animatedGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          animate={{
            x1: ["-100%", "200%"],
            x2: ["0%", "300%"],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#eab308" />
          <stop offset="35%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="65%" stopColor="#06b6d4" />
          <stop offset="80%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ffffff" />
        </motion.linearGradient>

        <linearGradient
          id="baseGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>

      {/* Animated gradient text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="url(#animatedGradient)"
        className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {text}
      </text>
    </svg>
  );
};