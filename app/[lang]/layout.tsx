import { notFound } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/app/components/Navbar";
import { I18nProvider } from "@/app/i18n";
import { isLocale, type Locale } from "@/app/i18n-config";

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <I18nProvider locale={lang as Locale}>
      <Navbar />
      {children}
      <Footer />
    </I18nProvider>
  );
}
