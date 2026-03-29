"use client";

import { useState, useMemo } from "react";

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

export function CharCounter({ dict }: Props) {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\n+/).filter((s) => s.trim()).length : 0;
    return { chars, words, sentences, paragraphs };
  }, [text]);

  const statItems = [
    { label: t(dict, "tools.charCounter.chars"), value: stats.chars, color: "#22c55e" },
    { label: t(dict, "tools.charCounter.words"), value: stats.words, color: "#3b82f6" },
    { label: t(dict, "tools.charCounter.sentences"), value: stats.sentences, color: "#f59e0b" },
    { label: t(dict, "tools.charCounter.paragraphs"), value: stats.paragraphs, color: "#a855f7" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-card-border bg-card p-3 text-center"
          >
            <p className="text-[24px] font-extrabold" style={{ color: item.color }}>
              {item.value.toLocaleString()}
            </p>
            <p className="text-[11px] text-fg-muted font-medium mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder={t(dict, "tools.charCounter.placeholder")}
        className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
      />

      {text && (
        <button
          onClick={() => setText("")}
          className="text-[12px] text-fg-muted hover:text-red font-medium transition-colors"
        >
          {t(dict, "common.clear")}
        </button>
      )}
    </div>
  );
}
