"use client";

import { useState, useMemo } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function ReverseText({ dict }: Props) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const reversed = useMemo(() => [...input].reverse().join(""), [input]);

  function copy() { navigator.clipboard.writeText(reversed); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.reverseText.input")}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} placeholder="Merhaba Dünya" className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none" />
      </div>
      {input && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.reverseText.reversed")}</span>
            <button onClick={copy} className="text-[11px] font-medium text-accent hover:underline">{copied ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
          </div>
          <p className="text-[15px] font-semibold text-fg">{reversed}</p>
        </div>
      )}
    </div>
  );
}
