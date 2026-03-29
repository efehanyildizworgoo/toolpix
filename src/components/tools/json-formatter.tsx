"use client";

import { useState } from "react";

interface Props {
  dict: Record<string, unknown>;
  lang: string;
}

function t(dict: Record<string, unknown>, key: string): string {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else return key;
  }
  return typeof current === "string" ? current : key;
}

export function JsonFormatter({ dict }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setError(t(dict, "tools.jsonFormatter.error"));
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch {
      setError(t(dict, "tools.jsonFormatter.error"));
      setOutput("");
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
          {t(dict, "tools.jsonFormatter.input")}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder='{"name": "test", "value": 123}'
          className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all font-mono resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={format}
          className="flex-1 h-10 rounded-xl bg-accent text-[13px] font-semibold text-white transition-all hover:bg-accent-hover"
        >
          {t(dict, "tools.jsonFormatter.format")}
        </button>
        <button
          onClick={minify}
          className="flex-1 h-10 rounded-xl border border-card-border text-[13px] font-semibold text-fg-muted transition-all hover:border-accent hover:text-accent"
        >
          {t(dict, "tools.jsonFormatter.minify")}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red/20 bg-red/5 p-3">
          <p className="text-[12px] text-red font-medium">{error}</p>
        </div>
      )}

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[12px] font-medium text-fg-muted">
              {t(dict, "tools.jsonFormatter.output")}
            </label>
            <button
              onClick={copyOutput}
              className="text-[11px] font-medium text-accent hover:underline"
            >
              {copied ? t(dict, "tools.jsonFormatter.copied") : t(dict, "tools.jsonFormatter.copy")}
            </button>
          </div>
          <pre className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[12px] text-fg font-mono overflow-x-auto max-h-80 overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
