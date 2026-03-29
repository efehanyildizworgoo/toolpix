import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { TOOLS, t as tFn } from "@/lib/tools";
import { AdSlot } from "@/components/ad-slot";
import { SalaryCalculator } from "@/components/tools/salary-calculator";
import { CryptoAverage } from "@/components/tools/crypto-average";
import { FreelancerRate } from "@/components/tools/freelancer-rate";
import { JsonFormatter } from "@/components/tools/json-formatter";
import { WhatsappLink } from "@/components/tools/whatsapp-link";
import { CharCounter } from "@/components/tools/char-counter";
import type { Metadata } from "next";

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
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: tFn(dict as unknown as Record<string, unknown>, tool.titleKey),
    description: tFn(dict as unknown as Record<string, unknown>, tool.descKey),
  };
}

const TOOL_COMPONENTS: Record<string, React.ComponentType<{ dict: Record<string, unknown>; lang: string }>> = {
  "salary-calculator": SalaryCalculator,
  "crypto-average": CryptoAverage,
  "freelancer-rate": FreelancerRate,
  "json-formatter": JsonFormatter,
  "whatsapp-link": WhatsappLink,
  "character-counter": CharCounter,
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
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

      {/* Bottom Ad */}
      <div className="mt-8">
        <AdSlot label={dict.common.ad} />
      </div>
    </div>
  );
}
