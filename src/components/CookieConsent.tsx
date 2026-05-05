"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Cookie, X, ShieldCheck, ChevronRight, Settings } from "lucide-react";

type CookieSettings = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const t = useTranslations("cookies");
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("val-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (updatedSettings: CookieSettings) => {
    localStorage.setItem("val-cookie-consent", JSON.stringify(updatedSettings));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allOn = { essential: true, analytics: true, marketing: true };
    setSettings(allOn);
    saveConsent(allOn);
  };

  const handleDeclineAll = () => {
    const minRequired = { essential: true, analytics: false, marketing: false };
    setSettings(minRequired);
    saveConsent(minRequired);
  };

  const handleSaveSettings = () => {
    saveConsent(settings);
  };

  const Toggle = ({ 
    enabled, 
    onChange, 
    disabled = false 
  }: { 
    enabled: boolean; 
    onChange: (val: boolean) => void; 
    disabled?: boolean;
  }) => (
    <button
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#00b4d8]" : "bg-white/10"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? "translate-x-4.5" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-lg z-[100]"
        >
          <div
            className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative"
            style={{
              background: "rgba(3,11,26,0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,180,216,0.1)",
            }}
          >
            <div className="p-6 md:p-8">
              {!showDetails ? (
                /* Summary View */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#00b4d8]/10 border border-[#00b4d8]/20 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-[#00b4d8]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-2">{t("title")}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {t("description")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 px-6 py-4 rounded-full bg-[#00b4d8] text-[#030b1a] font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_rgba(0,180,216,0.3)]"
                    >
                      {t("accept")}
                    </button>
                    <button
                      onClick={() => setShowDetails(true)}
                      className="flex-1 px-6 py-4 rounded-full bg-white/5 text-white/80 font-bold text-sm border border-white/10 transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {t("settings")}
                    </button>
                  </div>
                  
                  <button
                    onClick={handleDeclineAll}
                    className="w-full text-white/30 text-xs hover:text-white/60 transition-colors py-1"
                  >
                    {t("decline")}
                  </button>
                </motion.div>
              ) : (
                /* Detailed View */
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <button 
                      onClick={() => setShowDetails(false)}
                      className="p-2 -ml-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-white font-bold text-lg">{t("settings")}</h3>
                  </div>

                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Essential */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <ShieldCheck className="w-4 h-4 text-[#00b4d8]" />
                          <span className="text-white font-bold text-sm">{t("essential_title")}</span>
                        </div>
                        <p className="text-white/40 text-[11px] leading-relaxed">
                          {t("essential_desc")}
                        </p>
                      </div>
                      <Toggle enabled={true} onChange={() => {}} disabled />
                    </div>

                    {/* Analytics */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                      <div className="flex-1">
                        <span className="text-white font-bold text-sm block mb-1">{t("analytics_title")}</span>
                        <p className="text-white/40 text-[11px] leading-relaxed">
                          {t("analytics_desc")}
                        </p>
                      </div>
                      <Toggle 
                        enabled={settings.analytics} 
                        onChange={(val) => setSettings({...settings, analytics: val})} 
                      />
                    </div>

                    {/* Marketing */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                      <div className="flex-1">
                        <span className="text-white font-bold text-sm block mb-1">{t("marketing_title")}</span>
                        <p className="text-white/40 text-[11px] leading-relaxed">
                          {t("marketing_desc")}
                        </p>
                      </div>
                      <Toggle 
                        enabled={settings.marketing} 
                        onChange={(val) => setSettings({...settings, marketing: val})} 
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="w-full px-6 py-4 rounded-full bg-[#00b4d8] text-[#030b1a] font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_20px_rgba(0,180,216,0.3)]"
                  >
                    {t("save")}
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
