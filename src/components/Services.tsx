"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Waves, Anchor, Ship, Droplets, Umbrella, BedDouble } from "lucide-react";

function ServiceCard({
  Icon,
  title,
  description,
  features,
  accent,
  index,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  accent: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col items-center text-center rounded-2xl p-7 overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 65%)`,
          borderRadius: "inherit",
        }}
      />
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} strokeWidth={1.8} />
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1">{description}</p>
      <ul className="space-y-2 mt-auto">
        {features.map((f) => (
          <li key={f} className="flex items-center justify-center gap-2.5 text-sm">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: accent }} />
            <span className="text-white/60">{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const services = [
    {
      Icon: Waves,
      title: t("sup_title"),
      description: t("sup_desc"),
      features: [t("sup_f1"), t("sup_f2"), t("sup_f3")],
      accent: "#00b4d8",
    },
    {
      Icon: Anchor,
      title: t("kajak_title"),
      description: t("kajak_desc"),
      features: [t("kajak_f1"), t("kajak_f2"), t("kajak_f3")],
      accent: "#1a7fc2",
    },
    {
      Icon: Ship,
      title: t("pedala_title"),
      description: t("pedala_desc"),
      features: [t("pedala_f1"), t("pedala_f2"), t("pedala_f3")],
      accent: "#0d4f8c",
    },
    {
      Icon: Droplets,
      title: t("aquapark_title"),
      description: t("aquapark_desc"),
      features: [t("aquapark_f1"), t("aquapark_f2"), t("aquapark_f3")],
      accent: "#48cae4",
    },
    {
      Icon: Umbrella,
      title: t("suncobran_title"),
      description: t("suncobran_desc"),
      features: [t("suncobran_f1"), t("suncobran_f2"), t("suncobran_f3")],
      accent: "#90e0ef",
    },
    {
      Icon: BedDouble,
      title: t("lezaljka_title"),
      description: t("lezaljka_desc"),
      features: [t("lezaljka_f1"), t("lezaljka_f2"), t("lezaljka_f3")],
      accent: "#caf0f8",
    },
  ];

  return (
    <section id="usluge" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #030b1a 0%, #071428 40%, #071428 60%, #030b1a 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(0,180,216,0.06) 0%, transparent 60%)",
        }}
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-[20%] right-[8%] w-[450px] h-[450px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full opacity-[0.04] blur-[100px]" style={{ background: "#00b4d8" }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16" ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="text-[#00b4d8] text-xs font-bold tracking-[0.2em] uppercase mb-4"
          >
            {t("badge")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-5xl font-black text-white mb-5"
          >
            {t("title")} <span className="gradient-text">{t("title_accent")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-white/45 text-base max-w-lg mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/cijene"
            className="px-8 py-3.5 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 inline-block"
            style={{ background: "#00b4d8", color: "#030b1a", boxShadow: "0 0 24px rgba(0,180,216,0.35)" }}
          >
            {t("cta_pricing")}
          </Link>
          <Link
            href="/o-nama"
            className="px-8 py-3.5 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 inline-block"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            {t("cta_about")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
