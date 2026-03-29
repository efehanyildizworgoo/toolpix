"use client";

import { useState, useMemo } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split(".");
  let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

const STYLES: { name: string; fn: (s: string) => string }[] = [
  { name: "𝔉𝔯𝔞𝔨𝔱𝔲𝔯", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; const base = c === c.toUpperCase() ? "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ" : "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷"; return [...base][i] ?? c; }).join("") },
  { name: "𝕯𝖔𝖚𝖇𝖑𝖊", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; const base = c === c.toUpperCase() ? "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅" : "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟"; return [...base][i] ?? c; }).join("") },
  { name: "𝒮𝒸𝓇𝒾𝓅𝓉", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; const base = c === c.toUpperCase() ? "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵" : "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"; return [...base][i] ?? c; }).join("") },
  { name: "🅱🅾🅻🅳", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; const base = c === c.toUpperCase() ? "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙" : "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳"; return [...base][i] ?? c; }).join("") },
  { name: "𝕕𝕠𝕦𝕓𝕝𝕖", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; const base = c === c.toUpperCase() ? "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ" : "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"; return [...base][i] ?? c; }).join("") },
  { name: "ⓒⓘⓡⓒⓛⓔⓓ", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; const base = c === c.toUpperCase() ? "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ" : "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ"; return [...base][i] ?? c; }).join("") },
  { name: "sᴍᴀʟʟ ᴄᴀᴘs", fn: (s) => [...s].map(c => { const i = "abcdefghijklmnopqrstuvwxyz".indexOf(c.toLowerCase()); if (i === -1) return c; return "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ"[i] ?? c; }).join("") },
  { name: "u̲n̲d̲e̲r̲l̲i̲n̲e̲", fn: (s) => [...s].map(c => c + "\u0332").join("") },
];

export function FancyText({ dict }: Props) {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const results = useMemo(() => STYLES.map(s => ({ name: s.name, text: s.fn(input) })), [input]);

  function copy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.fancyText.input")}</label>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Toolpix" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
      </div>
      {input && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-card-border bg-bg-secondary p-3">
              <span className="text-[14px] text-fg truncate flex-1">{r.text}</span>
              <button onClick={() => copy(r.text, i)} className="flex-shrink-0 text-[11px] font-medium text-accent hover:underline">
                {copied === i ? t(dict, "common.copied") : t(dict, "common.copy")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
