import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { TOOLS, t as tFn } from "@/lib/tools";
import { AdSlot } from "@/components/ad-slot";
import type { Metadata } from "next";

// Text Tools
import { FancyText } from "@/components/tools/fancy-text";
import { CaseConverter } from "@/components/tools/case-converter";
import { WhitespaceRemover } from "@/components/tools/whitespace-remover";
import { ReverseText } from "@/components/tools/reverse-text";
import { SeoMetaGenerator } from "@/components/tools/seo-meta-generator";
import { CharCounter } from "@/components/tools/char-counter";

// Calculators
import { PercentageCalculator } from "@/components/tools/percentage-calculator";
import { VatCalculator } from "@/components/tools/vat-calculator";
import { CryptoAverage } from "@/components/tools/crypto-average";
import { FreelancerRate } from "@/components/tools/freelancer-rate";
import { TipCalculator } from "@/components/tools/tip-calculator";
import { SalaryCalculator } from "@/components/tools/salary-calculator";

// Time Tools
import { DateDifference } from "@/components/tools/date-difference";
import { AgeCalculator } from "@/components/tools/age-calculator";
import { TimezoneConverter } from "@/components/tools/timezone-converter";
import { Pomodoro } from "@/components/tools/pomodoro";

// Dev Tools
import { PasswordGenerator } from "@/components/tools/password-generator";
import { QrCodeGenerator } from "@/components/tools/qr-code-generator";
import { WhatsappLink } from "@/components/tools/whatsapp-link";
import { ColorConverter } from "@/components/tools/color-converter";
import { Base64Tool } from "@/components/tools/base64-tool";
import { JsonFormatter } from "@/components/tools/json-formatter";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const tool of TOOLS) {
      params.push({ lang, slug: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: tFn(dict as unknown as Record<string, unknown>, tool.titleKey),
    description: tFn(dict as unknown as Record<string, unknown>, tool.descKey),
  };
}

const TOOL_COMPONENTS: Record<string, React.ComponentType<{ dict: Record<string, unknown>; lang: string }>> = {
  "fancy-text": FancyText,
  "case-converter": CaseConverter,
  "whitespace-remover": WhitespaceRemover,
  "reverse-text": ReverseText,
  "seo-meta-generator": SeoMetaGenerator,
  "character-counter": CharCounter,
  "percentage-calculator": PercentageCalculator,
  "vat-calculator": VatCalculator,
  "crypto-average": CryptoAverage,
  "freelancer-rate": FreelancerRate,
  "tip-calculator": TipCalculator,
  "salary-calculator": SalaryCalculator,
  "date-difference": DateDifference,
  "age-calculator": AgeCalculator,
  "timezone-converter": TimezoneConverter,
  "pomodoro": Pomodoro,
  "password-generator": PasswordGenerator,
  "qr-code-generator": QrCodeGenerator,
  "whatsapp-link": WhatsappLink,
  "color-converter": ColorConverter,
  "base64": Base64Tool,
  "json-formatter": JsonFormatter,
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-fg-muted">Tool not found.</p>
      </div>
    );
  }

  const ToolComponent = TOOL_COMPONENTS[slug];
  const title = tFn(dict as unknown as Record<string, unknown>, tool.titleKey);
  const desc = tFn(dict as unknown as Record<string, unknown>, tool.descKey);
  const article = tFn(dict as unknown as Record<string, unknown>, tool.articleKey);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted hover:text-accent transition-colors mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
        {dict.common.backHome}
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="flex items-center justify-center h-12 w-12 rounded-xl"
          style={{ background: `${tool.color}15`, color: tool.color }}
        >
          <FontAwesomeIcon icon={tool.icon} className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-fg">{title}</h1>
          <p className="text-[13px] text-fg-muted mt-0.5">{desc}</p>
        </div>
      </div>

      {/* Ad */}
      <AdSlot label={dict.common.ad} className="mb-6" />

      {/* Tool */}
      <div className="rounded-xl border border-card-border bg-card p-5 sm:p-6">
        {ToolComponent ? (
          <ToolComponent dict={dict as unknown as Record<string, unknown>} lang={lang} />
        ) : (
          <p className="text-fg-muted text-[14px] text-center py-8">Coming soon...</p>
        )}
      </div>

      {/* Mid Ad */}
      <div className="mt-8">
        <AdSlot label={dict.common.ad} />
      </div>

      {/* SEO Article Section */}
      {article && article !== tool.articleKey && (
        <article className="mt-8 rounded-xl border border-card-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-[15px] font-bold text-fg mb-4">
            <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4 text-accent" />
            {dict.common.seoArticle}
          </h2>
          <div
            className="prose prose-sm prose-invert max-w-none text-[13px] text-fg-muted leading-relaxed [&_h3]:text-fg [&_h3]:font-bold [&_h3]:text-[14px] [&_h3]:mt-5 [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:mb-3 [&_li]:mb-1 [&_strong]:text-fg"
            dangerouslySetInnerHTML={{ __html: article }}
          />
        </article>
      )}

      {/* Bottom Ad */}
      <div className="mt-8">
        <AdSlot label={dict.common.ad} />
      </div>
    </div>
  );
}
