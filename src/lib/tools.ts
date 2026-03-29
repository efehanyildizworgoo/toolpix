import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalculator,
  faCode,
  faFont,
  faList,
  faClock,
  faMoneyBillWave,
  faChartLine,
  faFileCode,
  faTextWidth,
  faWandMagicSparkles,
  faTextHeight,
  faEraser,
  faRotateLeft,
  faTags,
  faPercent,
  faReceipt,
  faHandHoldingDollar,
  faCalendarDays,
  faCakeCandles,
  faGlobe,
  faHourglass,
  faKey,
  faQrcode,
  faPalette,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export type ToolCategory = "calculators" | "devtools" | "texttools" | "time";

export interface Tool {
  slug: string;
  categorySlug: ToolCategory;
  icon: IconDefinition;
  color: string;
  titleKey: string;
  descKey: string;
  articleKey: string;
}

export interface Category {
  slug: ToolCategory;
  icon: IconDefinition;
  color: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "texttools",
    icon: faFont,
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    slug: "calculators",
    icon: faCalculator,
    color: "#22c55e",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    slug: "time",
    icon: faClock,
    color: "#ec4899",
    gradient: "from-pink-500/20 to-pink-600/5",
  },
  {
    slug: "devtools",
    icon: faCode,
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
];

export const TOOLS: Tool[] = [
  // ── Text Tools ──
  {
    slug: "fancy-text",
    categorySlug: "texttools",
    icon: faWandMagicSparkles,
    color: "#f59e0b",
    titleKey: "tools.fancyText.title",
    descKey: "tools.fancyText.desc",
    articleKey: "tools.fancyText.article",
  },
  {
    slug: "case-converter",
    categorySlug: "texttools",
    icon: faTextHeight,
    color: "#f59e0b",
    titleKey: "tools.caseConverter.title",
    descKey: "tools.caseConverter.desc",
    articleKey: "tools.caseConverter.article",
  },
  {
    slug: "whitespace-remover",
    categorySlug: "texttools",
    icon: faEraser,
    color: "#f59e0b",
    titleKey: "tools.whitespaceRemover.title",
    descKey: "tools.whitespaceRemover.desc",
    articleKey: "tools.whitespaceRemover.article",
  },
  {
    slug: "reverse-text",
    categorySlug: "texttools",
    icon: faRotateLeft,
    color: "#f59e0b",
    titleKey: "tools.reverseText.title",
    descKey: "tools.reverseText.desc",
    articleKey: "tools.reverseText.article",
  },
  {
    slug: "seo-meta-generator",
    categorySlug: "texttools",
    icon: faTags,
    color: "#f59e0b",
    titleKey: "tools.seoMeta.title",
    descKey: "tools.seoMeta.desc",
    articleKey: "tools.seoMeta.article",
  },
  {
    slug: "character-counter",
    categorySlug: "texttools",
    icon: faTextWidth,
    color: "#f59e0b",
    titleKey: "tools.charCounter.title",
    descKey: "tools.charCounter.desc",
    articleKey: "tools.charCounter.article",
  },
  // ── Calculators ──
  {
    slug: "percentage-calculator",
    categorySlug: "calculators",
    icon: faPercent,
    color: "#22c55e",
    titleKey: "tools.percentage.title",
    descKey: "tools.percentage.desc",
    articleKey: "tools.percentage.article",
  },
  {
    slug: "vat-calculator",
    categorySlug: "calculators",
    icon: faReceipt,
    color: "#22c55e",
    titleKey: "tools.vat.title",
    descKey: "tools.vat.desc",
    articleKey: "tools.vat.article",
  },
  {
    slug: "crypto-average",
    categorySlug: "calculators",
    icon: faChartLine,
    color: "#22c55e",
    titleKey: "tools.cryptoAvg.title",
    descKey: "tools.cryptoAvg.desc",
    articleKey: "tools.cryptoAvg.article",
  },
  {
    slug: "freelancer-rate",
    categorySlug: "calculators",
    icon: faMoneyBillWave,
    color: "#22c55e",
    titleKey: "tools.freelancerRate.title",
    descKey: "tools.freelancerRate.desc",
    articleKey: "tools.freelancerRate.article",
  },
  {
    slug: "tip-calculator",
    categorySlug: "calculators",
    icon: faHandHoldingDollar,
    color: "#22c55e",
    titleKey: "tools.tipCalc.title",
    descKey: "tools.tipCalc.desc",
    articleKey: "tools.tipCalc.article",
  },
  {
    slug: "salary-calculator",
    categorySlug: "calculators",
    icon: faMoneyBillWave,
    color: "#22c55e",
    titleKey: "tools.salary.title",
    descKey: "tools.salary.desc",
    articleKey: "tools.salary.article",
  },
  // ── Time Tools ──
  {
    slug: "date-difference",
    categorySlug: "time",
    icon: faCalendarDays,
    color: "#ec4899",
    titleKey: "tools.dateDiff.title",
    descKey: "tools.dateDiff.desc",
    articleKey: "tools.dateDiff.article",
  },
  {
    slug: "age-calculator",
    categorySlug: "time",
    icon: faCakeCandles,
    color: "#ec4899",
    titleKey: "tools.ageCalc.title",
    descKey: "tools.ageCalc.desc",
    articleKey: "tools.ageCalc.article",
  },
  {
    slug: "timezone-converter",
    categorySlug: "time",
    icon: faGlobe,
    color: "#ec4899",
    titleKey: "tools.timezone.title",
    descKey: "tools.timezone.desc",
    articleKey: "tools.timezone.article",
  },
  {
    slug: "pomodoro",
    categorySlug: "time",
    icon: faHourglass,
    color: "#ec4899",
    titleKey: "tools.pomodoro.title",
    descKey: "tools.pomodoro.desc",
    articleKey: "tools.pomodoro.article",
  },
  // ── Dev Tools ──
  {
    slug: "password-generator",
    categorySlug: "devtools",
    icon: faKey,
    color: "#3b82f6",
    titleKey: "tools.passwordGen.title",
    descKey: "tools.passwordGen.desc",
    articleKey: "tools.passwordGen.article",
  },
  {
    slug: "qr-code-generator",
    categorySlug: "devtools",
    icon: faQrcode,
    color: "#3b82f6",
    titleKey: "tools.qrCode.title",
    descKey: "tools.qrCode.desc",
    articleKey: "tools.qrCode.article",
  },
  {
    slug: "whatsapp-link",
    categorySlug: "devtools",
    icon: faWhatsapp,
    color: "#3b82f6",
    titleKey: "tools.whatsappLink.title",
    descKey: "tools.whatsappLink.desc",
    articleKey: "tools.whatsappLink.article",
  },
  {
    slug: "color-converter",
    categorySlug: "devtools",
    icon: faPalette,
    color: "#3b82f6",
    titleKey: "tools.colorConverter.title",
    descKey: "tools.colorConverter.desc",
    articleKey: "tools.colorConverter.article",
  },
  {
    slug: "base64",
    categorySlug: "devtools",
    icon: faLock,
    color: "#3b82f6",
    titleKey: "tools.base64.title",
    descKey: "tools.base64.desc",
    articleKey: "tools.base64.article",
  },
  {
    slug: "json-formatter",
    categorySlug: "devtools",
    icon: faFileCode,
    color: "#3b82f6",
    titleKey: "tools.jsonFormatter.title",
    descKey: "tools.jsonFormatter.desc",
    articleKey: "tools.jsonFormatter.article",
  },
];

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.categorySlug === category);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getCategoryBySlug(slug: ToolCategory): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

// Helper to resolve nested dict key like "tools.salary.title"
export function t(dict: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === "string" ? current : key;
}
