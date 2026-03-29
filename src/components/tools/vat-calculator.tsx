"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function VatCalculator({ dict }: Props) {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("20");
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [result, setResult] = useState<{ net: number; vat: number; gross: number } | null>(null);

  function calculate() {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(a) || isNaN(r)) return;

    if (mode === "add") {
      const vatAmt = a * (r / 100);
      setResult({ net: a, vat: Math.round(vatAmt * 100) / 100, gross: Math.round((a + vatAmt) * 100) / 100 });
    } else {
      const net = a / (1 + r / 100);
      const vatAmt = a - net;
      setResult({ net: Math.round(net * 100) / 100, vat: Math.round(vatAmt * 100) / 100, gross: a });
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.vat.amount")}</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="1000" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.vat.vatRate")}</label>
          <select value={rate} onChange={e => setRate(e.target.value)} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all">
            <option value="1">%1</option>
            <option value="10">%10</option>
            <option value="20">%20</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => { setMode("add"); calculate(); }} className={`h-10 rounded-xl text-[12px] font-semibold transition-all ${mode === "add" ? "bg-accent text-white" : "border border-card-border text-fg-muted hover:border-accent hover:text-accent"}`}>{t(dict, "tools.vat.addVat")}</button>
        <button onClick={() => { setMode("remove"); calculate(); }} className={`h-10 rounded-xl text-[12px] font-semibold transition-all ${mode === "remove" ? "bg-accent text-white" : "border border-card-border text-fg-muted hover:border-accent hover:text-accent"}`}>{t(dict, "tools.vat.removeVat")}</button>
      </div>
      <button onClick={calculate} className="w-full h-11 rounded-xl bg-accent text-[13px] font-semibold text-white hover:bg-accent-hover transition-all">{t(dict, "common.calculate")}</button>
      {result && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-card border border-card-border p-3 text-center">
            <p className="text-[11px] text-fg-muted">{t(dict, "tools.vat.netAmount")}</p>
            <p className="text-[15px] font-bold text-fg mt-0.5">{result.net.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-card border border-card-border p-3 text-center">
            <p className="text-[11px] text-fg-muted">{t(dict, "tools.vat.vatAmount")}</p>
            <p className="text-[15px] font-bold text-accent mt-0.5">{result.vat.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-card border border-card-border p-3 text-center">
            <p className="text-[11px] text-fg-muted">{t(dict, "tools.vat.grossAmount")}</p>
            <p className="text-[15px] font-bold text-fg mt-0.5">{result.gross.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
