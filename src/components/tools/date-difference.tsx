"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function DateDifference({ dict }: Props) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  let diff: { days: number; months: number; years: number } | null = null;

  if (start && end) {
    const s = new Date(start);
    const e = new Date(end);
    const diffMs = Math.abs(e.getTime() - s.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();
    let days = e.getDate() - s.getDate();

    if (days < 0) { months--; const prev = new Date(e.getFullYear(), e.getMonth(), 0); days += prev.getDate(); }
    if (months < 0) { years--; months += 12; }

    diff = { days: totalDays, months: Math.abs(years * 12 + months), years: Math.abs(years) };
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.dateDiff.startDate")}</label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.dateDiff.endDate")}</label>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
      </div>
      {diff && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-card border border-card-border p-4 text-center">
            <p className="text-[28px] font-extrabold text-accent">{diff.days}</p>
            <p className="text-[11px] text-fg-muted font-medium mt-0.5">{t(dict, "tools.dateDiff.days")}</p>
          </div>
          <div className="rounded-lg bg-card border border-card-border p-4 text-center">
            <p className="text-[28px] font-extrabold text-fg">{diff.months}</p>
            <p className="text-[11px] text-fg-muted font-medium mt-0.5">{t(dict, "tools.dateDiff.months")}</p>
          </div>
          <div className="rounded-lg bg-card border border-card-border p-4 text-center">
            <p className="text-[28px] font-extrabold text-fg">{diff.years}</p>
            <p className="text-[11px] text-fg-muted font-medium mt-0.5">{t(dict, "tools.dateDiff.years")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
