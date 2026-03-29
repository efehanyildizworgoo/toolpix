"use client";

import { useState, useEffect } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorConverter({ dict }: Props) {
  const [hex, setHex] = useState("#22c55e");
  const [rgb, setRgb] = useState({ r: 34, g: 197, b: 94 });
  const [hsl, setHsl] = useState({ h: 145, s: 71, l: 45 });
  const [copied, setCopied] = useState("");

  function updateFromHex(h: string) {
    setHex(h);
    const c = hexToRgb(h);
    if (c) {
      setRgb({ r: c[0], g: c[1], b: c[2] });
      const [hh, ss, ll] = rgbToHsl(c[0], c[1], c[2]);
      setHsl({ h: hh, s: ss, l: ll });
    }
  }

  function updateFromRgb(r: number, g: number, b: number) {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    const [hh, ss, ll] = rgbToHsl(r, g, b);
    setHsl({ h: hh, s: ss, l: ll });
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="space-y-5">
      {/* Preview */}
      <div className="h-20 rounded-xl border border-card-border" style={{ background: hex }} />

      {/* Color Picker */}
      <input type="color" value={hex} onChange={e => updateFromHex(e.target.value)} className="w-full h-11 rounded-xl cursor-pointer" />

      {/* HEX */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.colorConverter.hex")}</label>
          <button onClick={() => copy(hex, "hex")} className="text-[11px] font-medium text-accent hover:underline">{copied === "hex" ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
        </div>
        <input type="text" value={hex} onChange={e => updateFromHex(e.target.value)} className="w-full h-10 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg font-mono focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
      </div>

      {/* RGB */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.colorConverter.rgb")}</label>
          <button onClick={() => copy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")} className="text-[11px] font-medium text-accent hover:underline">{copied === "rgb" ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input type="number" min={0} max={255} value={rgb.r} onChange={e => updateFromRgb(Number(e.target.value), rgb.g, rgb.b)} className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg text-center focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
          <input type="number" min={0} max={255} value={rgb.g} onChange={e => updateFromRgb(rgb.r, Number(e.target.value), rgb.b)} className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg text-center focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
          <input type="number" min={0} max={255} value={rgb.b} onChange={e => updateFromRgb(rgb.r, rgb.g, Number(e.target.value))} className="h-10 rounded-xl bg-input-bg border border-input-border px-3 text-[13px] text-fg text-center focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
        </div>
      </div>

      {/* HSL */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.colorConverter.hsl")}</label>
          <button onClick={() => copy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "hsl")} className="text-[11px] font-medium text-accent hover:underline">{copied === "hsl" ? t(dict, "common.copied") : t(dict, "common.copy")}</button>
        </div>
        <p className="text-[13px] font-mono text-fg bg-input-bg border border-input-border rounded-xl px-4 h-10 flex items-center">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
      </div>
    </div>
  );
}
