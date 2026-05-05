"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
}

export default function PageHeader({ badge, title, titleAccent, subtitle }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #030b1a 0%, #071428 60%, #030b1a 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,180,216,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Animated wave lines */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            bottom: `${15 + i * 12}%`,
            left: 0,
            width: "200%",
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, rgba(0,180,216,${0.05 + i * 0.03}) 40%, rgba(0,180,216,${0.08 + i * 0.04}) 50%, rgba(0,180,216,${0.05 + i * 0.03}) 60%, transparent 100%)`,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#00b4d8] text-xs font-bold tracking-[0.2em] uppercase mb-4"
        >
          {badge}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
        >
          {title} <span className="gradient-text">{titleAccent}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-white/45 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Wave separator at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <path
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z"
            fill="#030b1a"
          />
        </svg>
      </div>
    </section>
  );
}
