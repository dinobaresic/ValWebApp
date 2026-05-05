"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  const links = [
    { label: t("services"), href: "/#usluge" },
    { label: t("pricing"), href: "/cijene" },
    { label: t("about"), href: "/o-nama" },
    { label: t("contact"), href: "/kontakt" },
  ];

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="absolute inset-0 bg-[#030b1a]" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,180,216,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-1.png"
              alt="VAL Rental Services"
              width={64}
              height={38}
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          <nav className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-[#00b4d8] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#00b4d8] text-sm transition-colors cursor-pointer"
            >
              Facebook
            </a>
            <span className="text-white/20">·</span>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#00b4d8] text-sm transition-colors cursor-pointer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-white/25 text-sm">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <span>{t("oib")}</span>
            <span>·</span>
            <span>{t("address")}</span>
            <span>·</span>
            <button 
              onClick={() => window.dispatchEvent(new Event("val-open-cookie-settings"))}
              className="hover:text-[#00b4d8] transition-colors cursor-pointer"
            >
              {t("cookie_settings")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
