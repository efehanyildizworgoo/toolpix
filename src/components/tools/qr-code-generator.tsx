"use client";

import { useState, useRef, useEffect } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

function generateQRMatrix(data: string): boolean[][] {
  const size = 21;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  function setFinderPattern(row: number, col: number) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOn = (r === 0 || r === 6 || c === 0 || c === 6) || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        if (row + r < size && col + c < size) matrix[row + r][col + c] = isOn;
      }
    }
  }

  setFinderPattern(0, 0);
  setFinderPattern(0, size - 7);
  setFinderPattern(size - 7, 0);

  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  const bytes = new TextEncoder().encode(data);
  let bitIdx = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!matrix[r][c] && r > 8 && c > 8) {
        const byteIdx = Math.floor(bitIdx / 8);
        const bit = byteIdx < bytes.length ? (bytes[byteIdx] >> (7 - (bitIdx % 8))) & 1 : 0;
        matrix[r][c] = bit === 1;
        bitIdx++;
      }
    }
  }

  return matrix;
}

export function QrCodeGenerator({ dict }: Props) {
  const [input, setInput] = useState("");
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function generate() {
    if (!input.trim()) return;
    setGenerated(true);
  }

  useEffect(() => {
    if (!generated || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const matrix = generateQRMatrix(input);
    const cellSize = 10;
    const size = matrix.length * cellSize + 20;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#000000";
    matrix.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) ctx.fillRect(10 + c * cellSize, 10 + r * cellSize, cellSize, cellSize);
      });
    });
  }, [generated, input]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-[12px] font-medium text-fg-muted mb-1.5">{t(dict, "tools.qrCode.input")}</label>
        <input type="text" value={input} onChange={e => { setInput(e.target.value); setGenerated(false); }} placeholder="https://toolpix.com" className="w-full h-11 rounded-xl bg-input-bg border border-input-border px-4 text-[13px] text-fg placeholder:text-fg-muted focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all" />
      </div>

      <button onClick={generate} className="w-full h-11 rounded-xl bg-accent text-[13px] font-semibold text-white hover:bg-accent-hover transition-all">{t(dict, "tools.qrCode.generate")}</button>

      {generated && (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl border border-card-border bg-white p-4">
            <canvas ref={canvasRef} />
          </div>
          <button onClick={download} className="h-10 px-6 rounded-xl border border-accent text-[12px] font-semibold text-accent hover:bg-accent hover:text-white transition-all">{t(dict, "tools.qrCode.download")}</button>
        </div>
      )}
    </div>
  );
}
