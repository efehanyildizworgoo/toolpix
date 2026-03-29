import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { CATEGORIES, TOOLS, t as tFn } from "@/lib/tools";
import { AdSlot } from "@/components/ad-slot";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 text-[12px] font-semibold text-accent mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {dict.hero.badge}
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fg leading-tight">
              {dict.hero.title}
            </h1>

            <p className="mt-4 text-[15px] text-fg-muted leading-relaxed max-w-lg mx-auto">
              {dict.hero.subtitle}
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href={`#tools`}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-accent text-[13px] font-semibold text-white transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
              >
                {dict.hero.cta}
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-8">
        <AdSlot label={dict.common.ad} />
      </div>

      {/* Categories */}
      <section id="tools" className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map((cat) => {
            const catDict = dict.categories[cat.slug];
            return (
              <Link
                key={cat.slug}
                href={`/${lang}/category/${cat.slug}`}
                className={`group relative rounded-xl border border-card-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-lg overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div
                    className="flex items-center justify-center h-10 w-10 rounded-xl mb-4"
                    style={{ background: `${cat.color}15`, color: cat.color }}
                  >
                    <FontAwesomeIcon icon={cat.icon} className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-[14px] font-bold text-fg">{catDict.title}</h3>
                  <p className="mt-1.5 text-[12px] text-fg-muted leading-relaxed">{catDict.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    {dict.hero.cta} <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All Tools Grid */}
        <h2 className="text-xl font-extrabold text-fg mb-6">{dict.nav.allTools}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${lang}/tool/${tool.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-card-border bg-card p-4 transition-all hover:border-accent/30 hover:shadow-md"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl"
                style={{ background: `${tool.color}15`, color: tool.color }}
              >
                <FontAwesomeIcon icon={tool.icon} className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] font-bold text-fg group-hover:text-accent transition-colors truncate">
                  {tFn(dict as unknown as Record<string, unknown>, tool.titleKey)}
                </h3>
                <p className="mt-0.5 text-[12px] text-fg-muted leading-relaxed line-clamp-2">
                  {tFn(dict as unknown as Record<string, unknown>, tool.descKey)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Ad */}
        <div className="mt-12">
          <AdSlot label={dict.common.ad} />
        </div>
      </section>
    </>
  );
}
