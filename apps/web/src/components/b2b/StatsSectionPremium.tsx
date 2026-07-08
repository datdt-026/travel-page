"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface Stat {
  number?: string;
  label?: string;
  description?: string;
}

interface StatsSectionPremiumProps {
  eyebrow?: string;
  title?: string;
  stats?: Stat[];
  variant?: "light" | "dark";
  backgroundImage?: string;
}

// Animated counter component
function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix from the value
    const numericMatch = value.match(/^([\d,.]+)/);
    const numericPart = numericMatch
      ? parseFloat(numericMatch[1].replace(/,/g, ""))
      : 0;
    const valueSuffix = value.replace(/^[\d,.]+/, "");

    if (numericPart === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const currentValue = Math.round(numericPart * easeProgress);

      setDisplayValue(currentValue.toLocaleString() + valueSuffix);

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsSectionPremium({
  eyebrow = "Our Impact",
  title,
  stats = [],
  variant = "light",
  backgroundImage,
}: StatsSectionPremiumProps) {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const defaultStats: Stat[] = [
    {
      number: "15+",
      label: "Years of Experience",
      description: "Established in 2009",
    },
    {
      number: "100+",
      label: "B2B Partners",
      description: "Across 30+ countries",
    },
    {
      number: "50,000+",
      label: "Travelers Annually",
      description: "FIT & Group programs",
    },
    {
      number: "6",
      label: "Destinations",
      description: "Southeast Asian countries",
    },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;
  const isDark = variant === "dark";

  return (
    <section
      className={`relative py-24 md:py-32 overflow-hidden ${isDark ? "bg-[#1C1C1C]" : "bg-white"}`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-b from-black/40 via-black/55 to-black/65"
                : "bg-gradient-to-b from-white/60 via-white/80 to-white/90"
            }`}
          />
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-0 right-0 w-1/3 h-full ${
            isDark
              ? "bg-gradient-to-l from-[#C4A35A]/3"
              : "bg-gradient-to-l from-[#C4A35A]/6"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-1/4 h-1/2 ${
            isDark
              ? "bg-gradient-to-tr from-[#C4A35A]/3"
              : "bg-gradient-to-tr from-[#C4A35A]/6"
          }`}
        />
        {/* Decorative circles */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl ${
            isDark ? "bg-[#C4A35A]/4" : "bg-[#C4A35A]/8"
          }`}
        />
      </div>

      <div className="container-wide relative z-10">
        {/* Section Header */}
        {(eyebrow || title) && (
          <div className="mb-16 md:mb-20 text-center">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block text-[#C4A35A] text-xs tracking-[0.3em] uppercase font-light mb-6"
              >
                {eyebrow}
              </motion.span>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`font-serif text-3xl md:text-4xl font-light tracking-tight ${isDark ? "text-white" : "text-[#2C2C2C]"}`}
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}

        {/* Stats Grid - Enhanced with interactions */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden ${
            isDark ? "bg-white/5" : "bg-[#E8E8E4]/20"
          }`}
        >
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              className={`relative p-8 md:p-12 text-center cursor-default transition-all duration-500
  ${isDark ? "bg-white/5 backdrop-blur-md border border-white/5" : "bg-white"}
  ${hoveredStat === index ? (isDark ? "bg-white/8 border-[#C4A35A]/30" : "bg-[#FAFAFA]") : ""}`}
            >
              {/* Accent top border on hover */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredStat === index ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 left-0 right-0 h-1 bg-[#C4A35A] origin-center"
              />

              {/* Icon indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: hoveredStat === index ? 1 : 0,
                  scale: hoveredStat === index ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#C4A35A]/20 flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 text-[#C4A35A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </motion.div>

              {/* Number with scale animation */}
              <motion.div
                animate={{
                  scale: hoveredStat === index ? 1.1 : 1,
                  y: hoveredStat === index ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4 
                          ${hoveredStat === index ? "text-[#C4A35A]" : isDark ? "text-white" : "text-[#2C2C2C]"}
                          transition-colors duration-300`}
              >
                <AnimatedNumber value={stat.number || "0"} />
              </motion.div>

              {/* Label */}
              {stat.label && (
                <motion.p
                  animate={{ y: hoveredStat === index ? 2 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-sm tracking-wide font-light mb-2 transition-colors duration-300
                            ${hoveredStat === index ? "text-[#C4A35A]" : isDark ? "text-white/80" : "text-[#4A4A4A]"}`}
                >
                  {stat.label}
                </motion.p>
              )}

              {/* Description - reveals on hover */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredStat === index ? 1 : 0,
                  height: hoveredStat === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {stat.description && (
                  <p
                    className={`text-xs ${isDark ? "text-white/50" : "text-[#8A8A8A]"}`}
                  >
                    {stat.description}
                  </p>
                )}
              </motion.div>

              {/* Decorative corner */}
              <motion.div
                animate={{ opacity: hoveredStat === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-3 left-3 w-6 h-6"
              >
                <svg
                  className="w-full h-full text-[#C4A35A]/30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M3 12v9h9M21 12v9h-9" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
