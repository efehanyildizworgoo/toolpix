import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { CATEGORIES, getToolsByCategory, t as tFn, type ToolCategory } from "@/lib/tools";
import { AdSlot } from "@/components/ad-slot";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const cat of CATEGORIES) {
      params.push({ lang, slug: cat.slug });
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
  const catDict = dict.categories[slug as ToolCategory];
  return {
    title: catDict?.title || slug,
    description: catDict?.desc || "",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const tools = getToolsByCategory(slug as ToolCategory);
  const catDict = dict.categories[slug as ToolCategory];

  if (!category || !catDict) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-fg-muted">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1.5 text-[12px] font-medium text-fg-muted hover:text-accent transition-colors mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
        {dict.common.backHome}
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex items-center justify-center h-12 w-12 rounded-xl"
          style={{ background: `${category.color}15`, color: category.color }}
        >
          <FontAwesomeIcon icon={category.icon} className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-fg">
            {catDict.title}
          </h1>
          <p className="text-[13px] text-fg-muted mt-0.5">{catDict.desc}</p>
        </div>
      </div>

      {/* Ad */}
      <AdSlot label={dict.common.ad} className="mb-8" />

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${lang}/tool/${tool.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-card-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-md"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl"
                style={{ background: `${tool.color}15`, color: tool.color }}
              >
                <FontAwesomeIcon icon={tool.icon} className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-bold text-fg group-hover:text-accent transition-colors">
                  {tFn(dict as unknown as Record<string, unknown>, tool.titleKey)}
                </h3>
                <p className="mt-1 text-[12px] text-fg-muted leading-relaxed">
                  {tFn(dict as unknown as Record<string, unknown>, tool.descKey)}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                  {dict.hero.cta} <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-card-border bg-card">
          <p className="text-fg-muted text-[14px]">Coming soon...</p>
        </div>
      )}

      {/* Bottom Ad */}
      <div className="mt-12">
        <AdSlot label={dict.common.ad} />
      </div>
    </div>
  );
}
