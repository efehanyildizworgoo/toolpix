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

export function CryptoAverage({ dict }: Props) {
  const [currentPrice, setCurrentPrice] = useState("");
  const [currentQty, setCurrentQty] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQty, setNewQty] = useState("");
  const [result, setResult] = useState<{ avg: number; totalQty: number; totalCost: number } | null>(null);

  function calculate() {
    const cp = parseFloat(currentPrice);
    const cq = parseFloat(currentQty);
    const np = parseFloat(newPrice);
    const nq = parseFloat(newQty);
    if ([cp, cq, np, nq].some((v) => isNaN(v) || v <= 0)) return;

    const totalCost = cp * cq + np * nq;
    const totalQty = cq + nq;
    const avg = totalCost / totalQty;

    setResult({
      avg: Math.round(avg * 10000) / 10000,
      totalQty: Math.round(totalQty * 10000) / 10000,
      totalCost: Math.round(totalCost * 100) / 100,
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.cryptoAvg.currentPrice")}
          </label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            placeholder="50000"
            className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.cryptoAvg.currentQty")}
          </label>
          <input
            type="number"
            value={currentQty}
            onChange={(e) => setCurrentQty(e.target.value)}
            placeholder="0.5"
            className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.cryptoAvg.newPrice")}
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="40000"
            className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
            {t(dict, "tools.cryptoAvg.newQty")}
          </label>
          <input
            type="number"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
            placeholder="0.5"
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

      {result && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 space-y-3">
          <h3 className="text-[13px] font-bold text-fg">{t(dict, "common.result")}</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.cryptoAvg.avgPrice")}</p>
              <p className="text-[16px] font-extrabold text-accent mt-0.5">{result.avg.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.cryptoAvg.totalQty")}</p>
              <p className="text-[15px] font-bold text-fg mt-0.5">{result.totalQty.toLocaleString()}</p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-3">
              <p className="text-[11px] text-fg-muted">{t(dict, "tools.cryptoAvg.totalCost")}</p>
              <p className="text-[15px] font-bold text-fg mt-0.5">{result.totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
