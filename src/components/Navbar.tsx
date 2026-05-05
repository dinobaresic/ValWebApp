"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("home"), href: "/" },
    { label: t("services"), href: "/#usluge" },
    { label: t("pricing"), href: "/cijene" },
    { label: t("about"), href: "/o-nama" },
    { label: t("contact"), href: "/kontakt" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  const LangToggle = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`flex items-center rounded-full overflow-hidden ${mobile ? "mt-2" : "ml-2"}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {(["en", "hr"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-200 ${
            locale === loc
              ? "text-[#030b1a] rounded-full"
              : "text-white/40 hover:text-white/70"
          }`}
          style={
            locale === loc
              ? { background: "#00b4d8" }
              : {}
          }
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                background: "rgba(3,11,26,0.85)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(0,180,216,0.12)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }
            : { background: "transparent" }
        }
      >
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer flex-shrink-0">
            <Image
              src="/images/logo-1.png"
              alt="VAL Rental Services"
              width={80}
              height={48}
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm transition-colors duration-200 group ${
                  isActive(link.href) ? "text-[#00b4d8]" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-1 left-4 right-4 h-px bg-[#00b4d8] transition-transform duration-200 origin-left ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <LangToggle />
            <Link
              href="/kontakt"
              className="ml-3 px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                background: "#00b4d8",
                color: "#030b1a",
                boxShadow: "0 0 18px rgba(0,180,216,0.4)",
              }}
            >
              {t("reserve")}
            </Link>
          </nav>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 hover:text-[#00b4d8] transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{
              background: "rgba(3,11,26,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-7 pt-16">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-2xl font-semibold transition-colors ${
                      isActive(link.href) ? "text-[#00b4d8]" : "text-white/75 hover:text-[#00b4d8]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.38 }}
                className="flex flex-col items-center gap-4"
              >
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-8 py-3.5 rounded-full text-base font-bold inline-block"
                  style={{ background: "#00b4d8", color: "#030b1a" }}
                >
                  {t("reserve")}
                </Link>
                <LangToggle mobile />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
