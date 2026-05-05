import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contact_title"),
    description: t("contact_desc"),
  };
}

export default function KontaktPage() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden bg-[#030b1a]">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}
