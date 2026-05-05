import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("about_title"),
    description: t("about_desc"),
  };
}

export default function ONamaPage() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden bg-[#030b1a]">
      <Navbar />
      <About />
      <Location />
      <Footer />
    </main>
  );
}
