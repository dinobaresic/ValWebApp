"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heart, ShieldCheck, Star, Users } from "lucide-react";

export default function About() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const values = [
    { Icon: Heart, title: t("v1_title"), desc: t("v1_desc") },
    { Icon: ShieldCheck, title: t("v2_title"), desc: t("v2_desc") },
    { Icon: Star, title: t("v3_title"), desc: t("v3_desc") },
    { Icon: Users, title: t("v4_title"), desc: t("v4_desc") },
  ];

  return (
    <section id="o-nama" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 40%, rgba(0,180,216,0.05) 0%, transparent 55%), linear-gradient(180deg, #030b1a 0%, #071428 50%, #030b1a 100%)",
        }}
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full opacity-[0.04] blur-[100px]" style={{ background: "#e9c46a" }} />
      </motion.div>
      <motion.div
        style={{ y: parallaxY2 }}
        className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full opacity-[0.05] blur-[80px]" style={{ background: "#00b4d8" }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16" ref={ref}>
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[#00b4d8] text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            {t("badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight"
          >
            {t("title1")}<br />{t("title2")} <span className="gradient-text">{t("title_accent")}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="space-y-5 text-white/55 leading-relaxed text-base max-w-3xl mx-auto"
          >
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="my-10 h-px w-full max-w-md mx-auto"
            style={{
              background: "linear-gradient(90deg, rgba(0,180,216,0), rgba(0,180,216,0.4), rgba(0,180,216,0))",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38 }}
            className="flex items-center justify-center gap-4"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black text-[#030b1a] flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00b4d8 0%, #1a7fc2 100%)" }}
            >
              D
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-base">Dino Barešić</p>
              <p className="text-white/40 text-sm">{t("owner_title")}</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {values.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.09 }}
              className="group rounded-2xl p-6 flex flex-col items-center text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.3s ease, background 0.3s ease, transform 0.3s ease",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)" }}
              >
                <Icon className="w-5 h-5 text-[#00b4d8]" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative h-80 md:h-[500px] w-full rounded-3xl overflow-hidden group"
          style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Image
            src={`/images/photo-3.jpg`}
            alt={`${t("photo_alt")} 1`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1152px"
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#030b1a]/10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
