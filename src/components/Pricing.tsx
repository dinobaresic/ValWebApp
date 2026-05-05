"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Waves, Anchor, Ship, Droplets, Umbrella, BedDouble } from "lucide-react";

const columns = ["1/2h", "1h", "2h", "3h", "4h", "1d"] as const;

export default function Pricing() {
  const t = useTranslations("pricing");
  const ref = useRef(null);
  const [selectedIdx, setSelectedIdx] = useState(1); // Default to 1h
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const items = [
    { name: t("pedalina"), Icon: Ship, prices: [10, 15, 25, 35, 45, 60] },
    { name: t("sup"), Icon: Waves, prices: [7, 10, 18, 25, 30, 40] },
    { name: t("kajak"), Icon: Anchor, prices: [7, 10, 18, 25, 30, 40] },
    { name: t("aquapark"), Icon: Droplets, prices: [7, 10, null, null, null, 30] },
    { name: t("suncobran"), Icon: Umbrella, prices: [null, null, null, null, null, 7] },
    { name: t("lezaljka"), Icon: BedDouble, prices: [null, null, null, null, null, 7] },
  ];

  return (
    <section id="cijene" className="relative pt-28 pb-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,180,216,0.07) 0%, transparent 55%), linear-gradient(180deg, #071428 0%, #030b1a 100%)",
        }}
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/3 left-[8%] w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full opacity-[0.05] blur-[90px]" style={{ background: "#00b4d8" }} />
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
            className="text-4xl md:text-5xl font-black text-white mb-5"
          >
            {t("title")} <span className="gradient-text">{t("title_accent")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16 }}
            className="text-white/45 text-base max-w-lg mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Mobile: Selector UI */}
        <div className="md:hidden space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            {columns.map((col, idx) => (
              <button
                key={col}
                onClick={() => setSelectedIdx(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                  selectedIdx === idx
                    ? "bg-[#00b4d8] text-[#030b1a] border-[#00b4d8] shadow-[0_0_15px_rgba(0,180,216,0.3)]"
                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                }`}
              >
                {col}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {items.map((item) => {
              const price = item.prices[selectedIdx];
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)" }}
                    >
                      <item.Icon className="w-5 h-5 text-[#00b4d8]" />
                    </div>
                    <span className="text-white font-bold text-sm">{item.name}</span>
                  </div>
                  <div className="text-right">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-white">{price}</span>
                        <span className="text-[#00b4d8] font-bold text-xs">€</span>
                      </div>
                    ) : (
                      <span className="text-white/20 font-light">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Desktop: Table UI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.24 }}
          className="hidden md:block w-full"
        >
          <div
            className="mx-auto rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div className="grid grid-cols-[minmax(160px,2fr)_repeat(6,1fr)] border-b border-white/10 bg-white/[0.03] p-5 text-white/50 text-sm font-semibold tracking-wider text-center items-center">
              <div className="text-center">{t("col_service")}</div>
              {columns.map((col) => (
                <div key={col}>{col}</div>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col">
              {items.map((item, index) => (
                <div
                  key={item.name}
                  className={`grid grid-cols-[minmax(160px,2fr)_repeat(6,1fr)] items-center p-4 text-center transition-colors hover:bg-white/[0.03] ${
                    index !== items.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)" }}
                    >
                      <item.Icon className="w-5 h-5 text-[#00b4d8]" />
                    </div>
                    <span className="text-white font-bold text-base whitespace-nowrap">{item.name}</span>
                  </div>
                  {item.prices.map((price, i) => (
                    <div key={i} className="flex justify-center">
                      {price !== null ? (
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-2xl font-black text-white">{price}</span>
                          <span className="text-[#00b4d8] font-bold text-xs">€</span>
                        </div>
                      ) : (
                        <span className="text-white/20 font-light text-xl">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          {t("footer_note")}
        </motion.p>
      </div>
    </section>
  );
}
