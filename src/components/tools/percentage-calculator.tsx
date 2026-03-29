"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function PercentageCalculator({ dict }: Props) {
  const [a1, setA1] = useState(""); const [b1, setB1] = useState("");
  const [a2, setA2] = useState(""); const [b2, setB2] = useState("");
  const [a3, setA3] = useState(""); const [b3, setB3] = useState("");

  const r1 = a1 && b1 ? (parseFloat(a1) * parseFloat(b1) / 100).toFixed(2) : null;
  const r2 = a2 && b2 ? ((parseFloat(a2) / parseFloat(b2)) * 100).toFixed(2) : null;
  const r3 = a3 && b3 ? (((parseFloat(b3) - parseFloat(a3)) / parseFloat(a3)) * 100).toFixed(2) : null;

  return (
    <div className="space-y-6">
      {/* What is B% of A */}
      <div className="rounded-xl border border-card-border p-4 space-y-3">
        <h3 className="text-[13px] font-bold text-fg">{t(dict, "tools.percentage.whatPercent")}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={a1} onChange={e => setA1(e.target.value)} placeholder="200" className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
          <input type="number" value={b1} onChange={e => setB1(e.target.value)} placeholder="15" className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        {r1 && <p className="text-[15px] font-extrabold text-accent">{t(dict, "tools.percentage.result")}: {r1}</p>}
      </div>

      {/* A is what % of B */}
      <div className="rounded-xl border border-card-border p-4 space-y-3">
        <h3 className="text-[13px] font-bold text-fg">{t(dict, "tools.percentage.percentOf")}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={a2} onChange={e => setA2(e.target.value)} placeholder="30" className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
          <input type="number" value={b2} onChange={e => setB2(e.target.value)} placeholder="200" className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        {r2 && <p className="text-[15px] font-extrabold text-accent">{t(dict, "tools.percentage.result")}: %{r2}</p>}
      </div>

      {/* % change from A to B */}
      <div className="rounded-xl border border-card-border p-4 space-y-3">
        <h3 className="text-[13px] font-bold text-fg">{t(dict, "tools.percentage.percentChange")}</h3>
        <div className="grid grid-cols-2 gap-3">
          <input type="number" value={a3} onChange={e => setA3(e.target.value)} placeholder="100" className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
          <input type="number" value={b3} onChange={e => setB3(e.target.value)} placeholder="150" className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        {r3 && <p className="text-[15px] font-extrabold text-accent">{t(dict, "tools.percentage.result")}: %{r3}</p>}
      </div>
    </div>
  );
}
