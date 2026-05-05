"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("val-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("val-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("val-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]"
        >
          <div
            className="p-6 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              background: "rgba(3,11,26,0.85)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 20px rgba(0,180,216,0.1)",
            }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/20 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-[#00b4d8]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">{t("title")}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t("description")}
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 px-6 py-3 rounded-full bg-[#00b4d8] text-[#030b1a] font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{ boxShadow: "0 4px 15px rgba(0,180,216,0.3)" }}
              >
                {t("accept")}
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 px-6 py-3 rounded-full bg-white/5 text-white/60 font-semibold text-sm border border-white/10 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
