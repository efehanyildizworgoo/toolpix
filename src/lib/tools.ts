import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCalculator,
  faCode,
  faFont,
  faList,
  faMoneyBillWave,
  faChartLine,
  faClock,
  faFileCode,
  faLink,
  faTextWidth,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export type ToolCategory = "calculators" | "devtools" | "texttools" | "directories";

export interface Tool {
  slug: string;
  categorySlug: ToolCategory;
  icon: IconDefinition;
  color: string;
  titleKey: string;
  descKey: string;
}

export interface Category {
  slug: ToolCategory;
  icon: IconDefinition;
  color: string;
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "calculators",
    icon: faCalculator,
    color: "#22c55e",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    slug: "devtools",
    icon: faCode,
    color: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    slug: "texttools",
    icon: faFont,
    color: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    slug: "directories",
    icon: faList,
    color: "#a855f7",
    gradient: "from-purple-500/20 to-purple-600/5",
  },
];

export const TOOLS: Tool[] = [
  {
    slug: "salary-calculator",
    categorySlug: "calculators",
    icon: faMoneyBillWave,
    color: "#22c55e",
    titleKey: "tools.salary.title",
    descKey: "tools.salary.desc",
  },
  {
    slug: "crypto-average",
    categorySlug: "calculators",
    icon: faChartLine,
    color: "#22c55e",
    titleKey: "tools.cryptoAvg.title",
    descKey: "tools.cryptoAvg.desc",
  },
  {
    slug: "freelancer-rate",
    categorySlug: "calculators",
    icon: faClock,
    color: "#22c55e",
    titleKey: "tools.freelancerRate.title",
    descKey: "tools.freelancerRate.desc",
  },
  {
    slug: "json-formatter",
    categorySlug: "devtools",
    icon: faFileCode,
    color: "#3b82f6",
    titleKey: "tools.jsonFormatter.title",
    descKey: "tools.jsonFormatter.desc",
  },
  {
    slug: "whatsapp-link",
    categorySlug: "texttools",
    icon: faWhatsapp,
    color: "#f59e0b",
    titleKey: "tools.whatsappLink.title",
    descKey: "tools.whatsappLink.desc",
  },
  {
    slug: "character-counter",
    categorySlug: "texttools",
    icon: faTextWidth,
    color: "#f59e0b",
    titleKey: "tools.charCounter.title",
    descKey: "tools.charCounter.desc",
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
