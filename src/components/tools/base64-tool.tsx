"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function Base64Tool({ dict }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function encode() {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { setOutput("Error"); }
  }

  function decode() {
    try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput("Error: Invalid Base64"); }
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.base64.input")}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} placeholder="Hello World" className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg font-mono placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={encode} className="h-10 rounded-xl bg-accent text-[12px] font-semibold text-white hover:bg-accent-hover transition-all">{t(dict, "tools.base64.encode")}</button>
        <button onClick={decode} className="h-10 rounded-xl border border-card-border text-[12px] font-semibold text-fg-muted hover:border-accent hover:text-accent transition-all">{t(dict, "tools.base64.decode")}</button>
      </div>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.base64.output")}</label>
            <button onClick={copy} className="text-[11px] font-medium text-accent hover:underline">{copied ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
          </div>
          <pre className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[12px] text-fg font-mono overflow-x-auto whitespace-pre-wrap break-all">{output}</pre>
        </div>
      )}
    </div>
  );
}
