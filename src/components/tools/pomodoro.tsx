"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Props { dict: Record<string, unknown>; lang: string; }

function t(d: Record<string, unknown>, k: string): string {
  const p = k.split("."); let c: unknown = d;
  for (const s of p) { if (c && typeof c === "object" && s in (c as Record<string, unknown>)) c = (c as Record<string, unknown>)[s]; else return k; }
  return typeof c === "string" ? c : k;
}

export function Pomodoro({ dict }: Props) {
  const WORK = 25 * 60;
  const BREAK = 5 * 60;

  const [seconds, setSeconds] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [round, setRound] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => setRunning(r => !r), []);

  const reset = useCallback(() => {
    setRunning(false);
    setIsBreak(false);
    setSeconds(WORK);
    setRound(1);
  }, [WORK]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          try { audioRef.current?.play(); } catch {}
          if (isBreak) {
            setIsBreak(false);
            setRound(r => r + 1);
            return WORK;
          } else {
            setIsBreak(true);
            return BREAK;
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, isBreak, WORK, BREAK]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = isBreak ? (1 - seconds / BREAK) * 100 : (1 - seconds / WORK) * 100;

  return (
    <div className="space-y-6 text-center">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgipGRfWBQT3KIkY+Af2xqcX+MkI2DenJwdX+KkI6Ffm9tc4CLkY6GfW5sdICLkY6GfW5sdICLkI2EfG9udYGMkY+HgHRxd4OOk5KLh4J9e3+EiYyNjY2Mioh/" preload="auto" />
      
      <div className="relative inline-flex items-center justify-center w-48 h-48">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--card-border)" strokeWidth="6" />
          <circle cx="100" cy="100" r="90" fill="none" stroke={isBreak ? "#3b82f6" : "#22c55e"} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 90}`} strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`} className="transition-all duration-1000" />
        </svg>
        <div>
          <p className="text-[11px] font-medium text-fg-muted uppercase tracking-wider mb-1">
            {isBreak ? t(dict, "tools.pomodoro.break") : t(dict, "tools.pomodoro.work")}
          </p>
          <p className="text-[40px] font-extrabold text-fg tabular-nums tracking-tight">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </p>
          <p className="text-[11px] text-fg-muted mt-0.5">
            {t(dict, "tools.pomodoro.round")} {round}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button onClick={toggle} className={`h-11 px-8 rounded-xl text-[13px] font-semibold text-white transition-all ${running ? "bg-amber" : "bg-accent hover:bg-accent-hover"}`}>
          {running ? t(dict, "tools.pomodoro.pause") : t(dict, "tools.pomodoro.start")}
        </button>
        <button onClick={reset} className="h-11 px-6 rounded-xl border border-card-border text-[13px] font-semibold text-fg-muted hover:border-accent hover:text-accent transition-all">
          {t(dict, "tools.pomodoro.reset")}
        </button>
      </div>
    </div>
  );
}
