"use client";

import { useState } from "react";

interface Props {
  dict: Record<string, unknown>;
  lang: string;
}

function t(dict: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else return key;
  }
  return typeof current === "string" ? current : key;
}

export function FreelancerRate({ dict }: Props) {
  const [expenses, setExpenses] = useState("");
  const [profit, setProfit] = useState("");
  const [hours, setHours] = useState("40");
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    const e = parseFloat(expenses);
    const p = parseFloat(profit);
    const h = parseFloat(hours);
    if ([e, p, h].some((v) => isNaN(v) || v <= 0)) return;

    const monthlyTotal = e + p;
    const weeklyHours = h;
    const monthlyHours = weeklyHours * 4.33;
    const hourlyRate = monthlyTotal / monthlyHours;

    setResult(Math.round(hourlyRate * 100) / 100);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.freelancerRate.monthlyExpenses")}
          </label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            placeholder="15000"
            className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.freelancerRate.desiredProfit")}
          </label>
          <input
            type="number"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
            placeholder="10000"
            className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.freelancerRate.hoursPerWeek")}
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="40"
            className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full h-11 rounded-xl bg-accent text-[13px] font-semibold text-white transition-all hover:bg-accent-hover"
      >
        {t(dict, "common.calculate")}
      </button>

      {result !== null && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-center">
          <p className="text-[12px] text-fg-muted">{t(dict, "tools.freelancerRate.hourlyRate")}</p>
          <p className="text-[28px] font-extrabold text-accent mt-1">
            {result.toLocaleString()}
          </p>
          <p className="text-[11px] text-fg-muted mt-1">/ saat</p>
        </div>
      )}
    </div>
  );
}
