"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function TipCalculator({ dict }: Props) {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState("15");
  const [people, setPeople] = useState("1");

  const billNum = parseFloat(bill) || 0;
  const tipNum = parseFloat(tipPct) || 0;
  const pplNum = Math.max(1, parseInt(people) || 1);

  const tipAmount = billNum * (tipNum / 100);
  const total = billNum + tipAmount;
  const perPerson = total / pplNum;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.tipCalc.billAmount")}</label>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="500" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.tipCalc.tipPercent")}</label>
          <div className="flex gap-2">
            {["10", "15", "20", "25"].map(p => (
              <button key={p} onClick={() => setTipPct(p)} className={`flex-1 h-11 rounded-xl text-[12px] font-semibold transition-all ${tipPct === p ? "bg-accent text-white" : "border border-card-border text-fg-muted hover:border-accent hover:text-accent"}`}>%{p}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.tipCalc.numPeople")}</label>
          <input type="number" value={people} onChange={e => setPeople(e.target.value)} min="1" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
      </div>
      {billNum > 0 && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-card border border-card-border p-3 text-center">
            <p className="text-[11px] text-fg-muted">{t(dict, "tools.tipCalc.tipAmount")}</p>
            <p className="text-[16px] font-bold text-fg mt-0.5">{tipAmount.toFixed(2)}</p>
          </div>
          <div className="rounded-lg bg-card border border-card-border p-3 text-center">
            <p className="text-[11px] text-fg-muted">{t(dict, "tools.tipCalc.totalAmount")}</p>
            <p className="text-[16px] font-extrabold text-accent mt-0.5">{total.toFixed(2)}</p>
          </div>
          <div className="rounded-lg bg-card border border-card-border p-3 text-center">
            <p className="text-[11px] text-fg-muted">{t(dict, "tools.tipCalc.perPerson")}</p>
            <p className="text-[16px] font-bold text-fg mt-0.5">{perPerson.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
