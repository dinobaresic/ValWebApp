import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import dynamic from "next/dynamic";
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VAL — Rent a SUP & Boat | Drage",
  description:
    "Iznajmljivanje SUP dasaka, kajaka, pedala, ležaljki i suncobrana u uvali Dolaška Draga. Vrhunska oprema za nezaboravno iskustvo na moru.",
  keywords:
    "SUP, kajak, pedala, iznajmljivanje, Drage, plaža, more, nautički sport",
  openGraph: {
    title: "VAL — Rent a SUP & Boat | Drage",
    description: "Premium iznajmljivanje opreme za vodene sportove u Dragama",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geist.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="antialiased min-h-screen bg-[#020611] flex flex-col items-center">
        <div className="w-full max-w-[1920px] flex flex-col relative mx-auto shadow-2xl bg-[#030b1a] overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] pointer-events-none rounded-full opacity-[0.03] blur-[120px]"
            style={{ background: "#f5e6c8" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[800px] h-[800px] pointer-events-none rounded-full opacity-[0.04] blur-[120px]"
            style={{ background: "#00b4d8" }}
          />
          <NextIntlClientProvider messages={messages}>
            {children}
            <CookieConsent />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
