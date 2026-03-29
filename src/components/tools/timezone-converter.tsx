"use client";

import { useState, useMemo } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

const ZONES = [
  { label: "Istanbul (UTC+3)", offset: 3 },
  { label: "Berlin (UTC+1)", offset: 1 },
  { label: "London (UTC+0)", offset: 0 },
  { label: "New York (UTC-5)", offset: -5 },
  { label: "Los Angeles (UTC-8)", offset: -8 },
  { label: "Dubai (UTC+4)", offset: 4 },
  { label: "Tokyo (UTC+9)", offset: 9 },
  { label: "Sydney (UTC+11)", offset: 11 },
  { label: "Moscow (UTC+3)", offset: 3 },
  { label: "São Paulo (UTC-3)", offset: -3 },
];

export function TimezoneConverter({ dict }: Props) {
  const [time, setTime] = useState("12:00");
  const [sourceIdx, setSourceIdx] = useState(0);
  const [targetIdx, setTargetIdx] = useState(3);

  const converted = useMemo(() => {
    const [h, m] = time.split(":").map(Number);
    const diff = ZONES[targetIdx].offset - ZONES[sourceIdx].offset;
    let newH = ((h + diff) % 24 + 24) % 24;
    return `${String(newH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }, [time, sourceIdx, targetIdx]);

  const dayLabel = useMemo(() => {
    const [h] = time.split(":").map(Number);
    const diff = ZONES[targetIdx].offset - ZONES[sourceIdx].offset;
    const newH = h + diff;
    if (newH >= 24) return " (+1)";
    if (newH < 0) return " (-1)";
    return "";
  }, [time, sourceIdx, targetIdx]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.timezone.sourceTime")}</label>
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.timezone.sourceZone")}</label>
          <select value={sourceIdx} onChange={e => setSourceIdx(Number(e.target.value))} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all">
            {ZONES.map((z, i) => <option key={i} value={i}>{z.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.timezone.targetZone")}</label>
          <select value={targetIdx} onChange={e => setTargetIdx(Number(e.target.value))} className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all">
            {ZONES.map((z, i) => <option key={i} value={i}>{z.label}</option>)}
          </select>
        </div>
      </div>
      <div className="rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
        <p className="text-[12px] text-fg-muted mb-1">{t(dict, "tools.timezone.convertedTime")}</p>
        <p className="text-[36px] font-extrabold text-accent tracking-tight">{converted}<span className="text-[14px] text-fg-muted font-normal">{dayLabel}</span></p>
        <p className="text-[12px] text-fg-muted mt-1">{ZONES[targetIdx].label}</p>
      </div>
    </div>
  );
}
