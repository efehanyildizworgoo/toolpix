"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function WhitespaceRemover({ dict }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const removeExtra = () => setOutput(input.replace(/  +/g, " ").trim());
  const removeLines = () => setOutput(input.replace(/\n+/g, " ").replace(/  +/g, " ").trim());
  const removeAll = () => setOutput(input.replace(/\s+/g, ""));

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.whitespaceRemover.input")}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button onClick={removeExtra} className="h-10 rounded-xl bg-accent text-[12px] font-semibold text-white hover:bg-accent-hover transition-all">{t(dict, "tools.whitespaceRemover.removeExtraSpaces")}</button>
        <button onClick={removeLines} className="h-10 rounded-xl border border-card-border text-[12px] font-semibold text-fg-muted hover:border-accent hover:text-accent transition-all">{t(dict, "tools.whitespaceRemover.removeLineBreaks")}</button>
        <button onClick={removeAll} className="h-10 rounded-xl border border-card-border text-[12px] font-semibold text-fg-muted hover:border-accent hover:text-accent transition-all">{t(dict, "tools.whitespaceRemover.removeAllSpaces")}</button>
      </div>
      {output && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-fg-muted">{t(dict, "common.result")}</span>
            <button onClick={copy} className="text-[11px] font-medium text-accent hover:underline">{copied ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
          </div>
          <p className="text-[13px] text-fg whitespace-pre-wrap break-all">{output}</p>
        </div>
      )}
    </div>
  );
}
