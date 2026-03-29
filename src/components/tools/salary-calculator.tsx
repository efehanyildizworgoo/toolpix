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
    } else {
      return key;
    }
  }
  return typeof current === "string" ? current : key;
}

export function SalaryCalculator({ dict }: Props) {
  const [gross, setGross] = useState("");
  const [result, setResult] = useState<{
    net: number;
    tax: number;
    sgk: number;
    stamp: number;
  } | null>(null);

  function calculate() {
    const g = parseFloat(gross);
    if (isNaN(g) || g <= 0) return;

    const sgkWorker = g * 0.14;
    const unemployment = g * 0.01;
    const taxBase = g - sgkWorker - unemployment;
    const incomeTax = taxBase * 0.15;
    const stampTax = g * 0.00759;
    const net = g - sgkWorker - unemployment - incomeTax - stampTax;

    setResult({
      net: Math.round(net * 100) / 100,
      tax: Math.round(incomeTax * 100) / 100,
      sgk: Math.round(sgkWorker * 100) / 100,
      stamp: Math.round(stampTax * 100) / 100,
    });
  }

  const currency = dict.tools && (dict.tools as Record<string, unknown>).salary
    ? ""
    : "₺";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
          {t(dict, "tools.salary.gross")}
        </label>
        <input
          type="number"
          value={gross}
          onChange={(e) => setGross(e.target.value)}
          placeholder="30000"
          className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full h-11 rounded-xl bg-accent text-[13px] font-semibold text-white transition-all hover:bg-accent-hover"
      >
        {t(dict, "tools.salary.calculate")}
      </button>

      {result && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 space-y-3">
          <h3 className="text-[13px] font-bold text-fg">{t(dict, "tools.salary.result")}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.salary.net")}</p>
              <p className="text-[18px] font-extrabold text-accent mt-0.5">
                {result.net.toLocaleString()} {currency}
              </p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.salary.tax")}</p>
              <p className="text-[15px] font-bold text-fg mt-0.5">
                {result.tax.toLocaleString()} {currency}
              </p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.salary.sgk")}</p>
              <p className="text-[15px] font-bold text-fg mt-0.5">
                {result.sgk.toLocaleString()} {currency}
              </p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.salary.stamp")}</p>
              <p className="text-[15px] font-bold text-fg mt-0.5">
                {result.stamp.toLocaleString()} {currency}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
