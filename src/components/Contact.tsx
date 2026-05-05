"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Mail, Send, CheckCircle, Share2, Camera } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const contactItems = [
    { Icon: Phone, label: t("phone_label"), value: "+385 95 885 1563", href: "tel:+385958851563" },
    { Icon: Mail, label: t("email_label"), value: "dinobare3@gmail.com", href: "mailto:dinobare3@gmail.com" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t("email_subject")} ${form.name}`);
    const body = encodeURIComponent(`${t("name_label")}: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:dinobare3@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
  };
  const inputFocusStyle = {
    border: "1px solid rgba(0,180,216,0.45)",
    background: "rgba(0,180,216,0.04)",
  };

  return (
    <section id="kontakt" className="relative pt-28 pb-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(0,180,216,0.05) 0%, transparent 55%), linear-gradient(180deg, #030b1a 0%, #071428 100%)",
        }}
      />
      <motion.div
        style={{ y: parallaxY }}
        className="absolute bottom-1/4 left-[5%] w-[350px] h-[350px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full opacity-[0.05] blur-[80px]" style={{ background: "#e9c46a" }} />
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
            <span className="gradient-text">{t("title")}</span> {t("title_suffix")}
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

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left: contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-white font-bold text-lg mb-1 text-center">{t("direct_title")}</p>

            {contactItems.map(({ Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.08 }}
                className="group flex items-center gap-3.5 rounded-xl p-4 cursor-pointer transition-all duration-250"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)" }}
                >
                  <Icon className="w-4 h-4 text-[#00b4d8]" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-white/35 text-[10px] font-bold tracking-widest uppercase mb-0.5">{label}</p>
                  <p className="text-white font-semibold text-sm group-hover:text-[#48cae4] transition-colors">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/385958851563?text=${encodeURIComponent(t("whatsapp_message"))}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.42 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-sm mt-1 transition-all duration-250"
              style={{
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.35)",
                color: "#25d366",
                boxShadow: "0 0 18px rgba(37,211,102,0.12)",
              }}
            >
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.002 3C9.374 3 4 8.373 4 15.002c0 2.184.588 4.23 1.61 5.992L4 29l8.228-1.58A12.93 12.93 0 0016.002 28C22.628 28 28 22.628 28 16.002 28 9.374 22.628 3 16.002 3zm0 23.6a11.53 11.53 0 01-5.85-1.594l-.42-.25-4.883.938.975-4.757-.274-.436A11.538 11.538 0 014.4 15.002C4.4 8.596 9.596 3.4 16.002 3.4 22.406 3.4 27.6 8.596 27.6 15.002 27.6 21.406 22.406 26.6 16.002 26.6zm6.33-8.646c-.347-.174-2.055-1.013-2.374-1.13-.319-.115-.551-.173-.783.174-.232.347-.9 1.13-1.102 1.362-.203.232-.405.26-.752.087-.347-.174-1.464-.54-2.788-1.72-1.03-.92-1.727-2.055-1.929-2.402-.203-.347-.022-.535.152-.707.157-.156.347-.405.52-.608.174-.203.232-.347.347-.58.116-.231.058-.434-.028-.607-.087-.174-.783-1.888-1.073-2.586-.283-.678-.57-.586-.783-.597l-.666-.011c-.232 0-.608.087-.927.434-.319.347-1.218 1.19-1.218 2.902 0 1.711 1.247 3.365 1.42 3.598.174.232 2.453 3.745 5.945 5.251.831.358 1.48.572 1.985.732.834.264 1.594.227 2.194.138.669-.1 2.055-.84 2.345-1.652.29-.81.29-1.506.203-1.652-.086-.145-.318-.232-.666-.405z" />
              </svg>
              {t("whatsapp_btn")}
            </motion.a>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex gap-3 mt-1"
            >
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-250 hover:scale-[1.02]"
                style={{
                  background: "rgba(24,119,242,0.1)",
                  border: "1px solid rgba(24,119,242,0.22)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <Share2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                Facebook
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-250 hover:scale-[1.02]"
                style={{
                  background: "rgba(225,48,108,0.08)",
                  border: "1px solid rgba(225,48,108,0.2)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                <Camera className="w-3.5 h-3.5" strokeWidth={1.8} />
                Instagram
              </a>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28 }}
            className="flex flex-col gap-4 rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-white font-bold text-lg mb-1 text-center">{t("form_title")}</p>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/35 text-[10px] font-bold tracking-widest uppercase">
                {t("name_label")}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("name_placeholder")}
                className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none placeholder:text-white/20 transition-all duration-200"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/35 text-[10px] font-bold tracking-widest uppercase">
                {t("email_label2")}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t("email_placeholder")}
                className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none placeholder:text-white/20 transition-all duration-200"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-white/35 text-[10px] font-bold tracking-widest uppercase">
                {t("message_label")}
              </label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("message_placeholder")}
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl text-white text-sm outline-none resize-none placeholder:text-white/20 transition-all duration-200"
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.target.style, inputStyle)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-250 hover:scale-[1.02]"
              style={
                sent
                  ? { background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }
                  : { background: "#00b4d8", color: "#030b1a", boxShadow: "0 0 20px rgba(0,180,216,0.35)" }
              }
            >
              {sent ? (
                <>
                  <CheckCircle className="w-4 h-4" strokeWidth={2} />
                  {t("sent")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" strokeWidth={2} />
                  {t("submit")}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
