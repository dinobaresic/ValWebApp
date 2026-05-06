"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sun } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#030b1a]">
        {/* Local Background Video */}
        <div className="absolute inset-0 pointer-events-none w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/photo-1.jpg"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-30 mix-blend-screen"
            style={{ pointerEvents: 'none' }}
          >
            <source src="/videos/hero-bg.webm" type="video/webm" />
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(3,11,26,0.7) 0%, rgba(7,20,40,0.85) 55%, rgba(3,11,26,1) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 25% 45%, rgba(13,79,140,0.35) 0%, transparent 60%), radial-gradient(ellipse at 75% 25%, rgba(0,180,216,0.15) 0%, transparent 50%)",
          }}
        />
        <motion.div style={{ y: orbY }} className="absolute">
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.42, 0.25] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,180,216,0.12) 0%, transparent 70%)",
            }}
          />
        </motion.div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "linear", delay: i * 1.8 }}
            style={{
              position: "absolute",
              bottom: `${8 + i * 9}%`,
              left: 0,
              width: "200%",
              height: "1px",
              background: `linear-gradient(90deg, transparent 0%, rgba(0,180,216,${0.06 + i * 0.03}) 40%, rgba(0,180,216,${0.1 + i * 0.04}) 50%, rgba(0,180,216,${0.06 + i * 0.03}) 60%, transparent 100%)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full pt-16 md:pt-0"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2 md:mb-10 text-[10px] md:text-sm text-[#48cae4] font-medium"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(0,180,216,0.28)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#e9c46a", boxShadow: "0 0 8px #e9c46a", animation: "pulse 2s infinite" }}
          />
          {t("badge")}
        </motion.div>

        {/* Sun */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-2 md:mb-8"
        >
          <Sun
            className="w-8 h-8 md:w-16 md:h-16 text-[#e9c46a]"
            strokeWidth={1.5}
            style={{ filter: "drop-shadow(0 0 20px rgba(233, 196, 106, 0.4))" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight mb-3 md:mb-7"
        >
          <span className="text-white block">{t("title1")}</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #48cae4 0%, #e9c46a 50%, #00b4d8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("title2")}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="text-sm md:text-lg text-white/50 max-w-xl leading-relaxed mb-6 md:mb-11"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
        >
          <Link
            href="/cijene"
            className="px-8 md:px-9 py-3.5 md:py-4 rounded-full text-sm md:text-base font-bold cursor-pointer transition-all duration-300 hover:scale-105 inline-block"
            style={{ background: "#00b4d8", color: "#030b1a", boxShadow: "0 0 32px rgba(0,180,216,0.45)" }}
          >
            {t("cta_pricing")}
          </Link>
          <button
            onClick={() => scrollTo("#usluge")}
            className="px-8 md:px-9 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            {t("cta_services")}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.65 }}
          className="mt-10 md:mt-20 flex items-center gap-8 md:gap-16"
        >
          {[
            { value: t("stat_founded_value"), label: t("stat_founded_label") },
            { value: t("stat_reviews_value"), label: t("stat_reviews_label") },
            { value: t("stat_satisfaction_value"), label: t("stat_satisfaction_label") },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-xl md:text-3xl font-black" style={{ color: "#00b4d8" }}>
                {s.value}
              </span>
              <span className="text-[10px] text-white/35 font-medium tracking-wider">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("#usluge")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer transition-colors duration-200"
        style={{ color: "rgba(255,255,255,0.3)" }}
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ color: "#00b4d8" } as Record<string, string>}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">{t("scroll")}</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
