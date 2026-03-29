"use client";

import { useState } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function SeoMetaGenerator({ dict }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    if (!title) return;
    const lines = [
      `<title>${title}</title>`,
      `<meta name="description" content="${desc}" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${desc}" />`,
      url ? `<meta property="og:url" content="${url}" />` : "",
      `<meta property="og:type" content="website" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${desc}" />`,
    ].filter(Boolean).join("\n");
    setOutput(lines);
  }

  function copy() { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.seoMeta.siteTitle")}</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Site" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        <p className="text-[11px] text-fg-muted mt-1">{title.length}/60</p>
      </div>
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.seoMeta.siteDesc")}</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="A brief description of the page..." className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none" />
        <p className="text-[11px] text-fg-muted mt-1">{desc.length}/160</p>
      </div>
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.seoMeta.siteUrl")}</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
      </div>
      <button onClick={generate} className="w-full h-11 rounded-xl bg-accent text-[13px] font-semibold text-white hover:bg-accent-hover transition-all">{t(dict, "tools.seoMeta.generate")}</button>
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.seoMeta.output")}</label>
            <button onClick={copy} className="text-[11px] font-medium text-accent hover:underline">{copied ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
          </div>
          <pre className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[12px] text-fg font-mono overflow-x-auto whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
