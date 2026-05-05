import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("home_title"),
    description: t("home_desc"),
  };
}

export default function Home() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden bg-[#030b1a]">
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </main>
  );
}
