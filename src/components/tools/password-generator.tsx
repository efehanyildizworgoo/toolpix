"use client";

import { useState, useCallback } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function PasswordGenerator({ dict }: Props) {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, v => chars[v % chars.length]).join(""));
  }, [length, upper, lower, numbers, symbols]);

  function copy() { navigator.clipboard.writeText(password); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.passwordGen.length")}: {length}</label>
        <input type="range" min={8} max={64} value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-accent" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t(dict, "tools.passwordGen.uppercase"), val: upper, set: setUpper },
          { label: t(dict, "tools.passwordGen.lowercase"), val: lower, set: setLower },
          { label: t(dict, "tools.passwordGen.numbers"), val: numbers, set: setNumbers },
          { label: t(dict, "tools.passwordGen.symbols"), val: symbols, set: setSymbols },
        ].map(opt => (
          <label key={opt.label} className="flex items-center gap-2 rounded-lg border border-card-border p-3 cursor-pointer hover:border-accent/30 transition-colors">
            <input type="checkbox" checked={opt.val} onChange={() => opt.set(!opt.val)} className="accent-accent" />
            <span className="text-[12px] font-medium text-fg">{opt.label}</span>
          </label>
        ))}
      </div>

      <button onClick={generate} className="w-full h-11 rounded-xl bg-accent text-[13px] font-semibold text-white hover:bg-accent-hover transition-all">{t(dict, "tools.passwordGen.generate")}</button>

      {password && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-fg-muted">{t(dict, "common.result")}</span>
            <button onClick={copy} className="text-[11px] font-medium text-accent hover:underline">{copied ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
          </div>
          <p className="text-[15px] font-mono font-bold text-fg break-all select-all">{password}</p>
        </div>
      )}
    </div>
  );
}
