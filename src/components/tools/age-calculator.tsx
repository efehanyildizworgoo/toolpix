"use client";

import { useState, useEffect } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function AgeCalculator({ dict }: Props) {
  const [birth, setBirth] = useState("");
  const [age, setAge] = useState<{ years: number; months: number; days: number; hours: number } | null>(null);

  useEffect(() => {
    if (!birth) { setAge(null); return; }
    function calc() {
      const b = new Date(birth);
      const now = new Date();
      let years = now.getFullYear() - b.getFullYear();
      let months = now.getMonth() - b.getMonth();
      let days = now.getDate() - b.getDate();
      if (days < 0) { months--; const prev = new Date(now.getFullYear(), now.getMonth(), 0); days += prev.getDate(); }
      if (months < 0) { years--; months += 12; }
      const diffMs = now.getTime() - b.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      setAge({ years, months, days, hours });
    }
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [birth]);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.ageCalc.birthDate")}</label>
        <input type="date" value={birth} onChange={e => setBirth(e.target.value)} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
      </div>
      {age && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
          <p className="text-[13px] font-bold text-fg mb-4">{t(dict, "tools.ageCalc.yourAge")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg bg-card border border-card-border p-4 text-center">
              <p className="text-[28px] font-extrabold text-accent">{age.years}</p>
              <p className="text-[11px] text-fg-muted font-medium">{t(dict, "tools.ageCalc.years")}</p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-4 text-center">
              <p className="text-[28px] font-extrabold text-fg">{age.months}</p>
              <p className="text-[11px] text-fg-muted font-medium">{t(dict, "tools.ageCalc.months")}</p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-4 text-center">
              <p className="text-[28px] font-extrabold text-fg">{age.days}</p>
              <p className="text-[11px] text-fg-muted font-medium">{t(dict, "tools.ageCalc.days")}</p>
            </div>
            <div className="rounded-lg bg-card border border-card-border p-4 text-center">
              <p className="text-[28px] font-extrabold text-fg">{age.hours.toLocaleString()}</p>
              <p className="text-[11px] text-fg-muted font-medium">{t(dict, "tools.ageCalc.hours")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
