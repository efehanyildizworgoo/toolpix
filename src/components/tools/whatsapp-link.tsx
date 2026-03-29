"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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

export function WhatsappLink({ dict }: Props) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone) return;
    const base = `https://wa.me/${cleanPhone}`;
    const url = message ? `${base}?text=${encodeURIComponent(message)}` : base;
    setLink(url);
  }

  function copyLink() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
          {t(dict, "tools.whatsappLink.phone")}
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+905551234567"
          className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">
          {t(dict, "tools.whatsappLink.message")}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Merhaba!"
          className="w-full rounded-xl bg-input-bg border border-input-border px-4 py-3 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
        />
      </div>

      <button
        onClick={generate}
        className="w-full h-11 rounded-xl bg-green text-[13px] font-semibold text-white transition-all hover:bg-green/90 flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4" />
        {t(dict, "tools.whatsappLink.generate")}
      </button>

      {link && (
        <div className="rounded-xl border border-green/20 bg-green/5 p-4 space-y-3">
          <p className="text-[12px] font-medium text-fg-muted">{t(dict, "tools.whatsappLink.generatedLink")}</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={link}
              className="flex-1 h-10 rounded-lg bg-input-bg border border-input-border px-3 text-[12px] text-fg font-mono truncate"
            />
            <button
              onClick={copyLink}
              className="h-10 px-3 rounded-lg border border-card-border text-fg-muted hover:text-accent hover:border-accent transition-colors"
              title="Copy"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3.5 h-3.5" />
            </button>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-green text-[12px] font-semibold text-white transition-all hover:bg-green/90"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
            {t(dict, "tools.whatsappLink.open")}
          </a>
        </div>
      )}
    </div>
  );
}
