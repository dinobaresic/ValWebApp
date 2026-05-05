import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("pricing_title"),
    description: t("pricing_desc"),
  };
}

export default function CijenePage() {
  return (
    <main className="w-full flex flex-col overflow-x-hidden bg-[#030b1a]">
      <Navbar />
      <Pricing />
      <Footer />
    </main>
  );
}
