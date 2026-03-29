import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../globals.css";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.meta.title,
      template: `%s | Toolpix`,
    },
    description: dict.meta.description,
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: lang === "tr" ? "tr_TR" : lang === "de" ? "de_DE" : "en_US",
      siteName: "Toolpix",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="dark h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <Navbar lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
