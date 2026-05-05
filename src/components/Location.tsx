"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Clock, Navigation } from "lucide-react";

export default function Location() {
  const t = useTranslations("location");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const info = [
    {
      Icon: MapPin,
      label: t("address_label"),
      value: t("address_value"),
      sub: t("address_sub"),
    },
    {
      Icon: Clock,
      label: t("hours_label"),
      value: t("hours_value"),
      sub: t("hours_sub"),
    },
    {
      Icon: Navigation,
      label: t("where_label"),
      value: t("where_value"),
      sub: t("where_sub"),
    },
  ];

  return (
    <section id="lokacija" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #071428 0%, #030b1a 100%)" }}
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/4 right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full opacity-[0.06] blur-[80px]" style={{ background: "#00b4d8" }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16" ref={ref}>
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#00b4d8] text-xs font-bold tracking-[0.2em] uppercase mb-3"
          >
            {t("badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            {t("title")} <span className="gradient-text">{t("title_accent")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-white/40 text-sm max-w-md mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          {info.map(({ Icon, label, value, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)" }}
              >
                <Icon className="w-4 h-4 text-[#00b4d8]" strokeWidth={1.8} />
              </div>
              <p className="text-white/35 text-[10px] font-bold tracking-widest uppercase">{label}</p>
              <p className="text-white font-semibold text-sm">{value}</p>
              <p className="text-white/35 text-xs">{sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Video & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="w-full rounded-2xl overflow-hidden relative group"
            style={{ border: "1px solid rgba(255,255,255,0.08)", height: "400px" }}
          >
            <div className="absolute inset-0 bg-[#030b1a]/20 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
            <video
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            {/* Overlay Title */}
            <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#030b1a]/70 text-white backdrop-blur-md border border-white/10">
                Otkrijte našu plažu
              </span>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)", height: "400px" }}
          >
          <iframe
            src="https://maps.google.com/maps?q=Rent%20a%20SUP%20%26%20Boat%20-%20VAL%20Drage&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)",
              display: "block",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("map_title")}
          />
        </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8"
        >
          <a
            href="https://maps.app.goo.gl/5pFTZyXqiBSgSQpUA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ background: "#00b4d8", color: "#030b1a", boxShadow: "0 0 24px rgba(0,180,216,0.35)" }}
          >
            <Navigation className="w-4 h-4" strokeWidth={2.5} />
            {t("open_maps")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
