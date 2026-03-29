"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faGlobe,
  faChevronDown,
  faCalculator,
  faCode,
  faFont,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import type { Locale } from "@/lib/i18n";
import { locales, getLocaleName } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionary";

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

const NAV_CATEGORIES = [
  { key: "texttools" as const, icon: faFont },
  { key: "calculators" as const, icon: faCalculator },
  { key: "time" as const, icon: faClock },
  { key: "devtools" as const, icon: faCode },
];

export function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-card-border bg-nav-bg backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white text-xs font-extrabold">
              T
            </span>
            <span className="text-[15px] font-extrabold tracking-tight text-fg">
              Toolpix
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_CATEGORIES.map((cat) => {
              const href = `/${lang}/category/${cat.key}`;
              const isActive = pathname.includes(`/category/${cat.key}`);
              return (
                <Link
                  key={cat.key}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? "text-accent bg-accent-light"
                      : "text-fg-muted hover:text-fg hover:bg-accent-light"
                  }`}
                >
                  <FontAwesomeIcon icon={cat.icon} className="w-3 h-3" />
                  {dict.nav[cat.key]}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-card-border text-[12px] font-medium text-fg-muted hover:text-fg transition-colors"
              >
                <FontAwesomeIcon icon={faGlobe} className="w-3 h-3" />
                {lang.toUpperCase()}
                <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-card-border bg-card shadow-xl z-50 overflow-hidden">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={pathname.replace(`/${lang}`, `/${l}`)}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 text-[12px] transition-colors ${
                        l === lang
                          ? "bg-accent-light text-accent font-semibold"
                          : "text-fg-muted hover:text-fg hover:bg-accent-light"
                      }`}
                    >
                      {getLocaleName(l)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg border border-card-border text-fg-muted hover:bg-accent-light transition-colors"
              aria-label="Menu"
            >
              <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[60] flex flex-col bg-bg/95 backdrop-blur-2xl">
          <div className="flex-1 min-h-[10vh]" />
          <div className="mx-4 mb-4 flex flex-col gap-2">
            <div className="flex items-center justify-between px-4 py-3 rounded-xl border border-card-border bg-card">
              <span className="text-[15px] font-extrabold text-fg">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-card-border text-fg-muted hover:text-fg transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
              </button>
            </div>

            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`/${lang}/category/${cat.key}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-card-border bg-card text-[14px] font-medium text-fg transition-colors hover:border-accent/40"
              >
                <FontAwesomeIcon icon={cat.icon} className="w-4 h-4 text-fg-muted" />
                {dict.nav[cat.key]}
              </Link>
            ))}

            <Link
              href={`/${lang}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-accent/40 bg-accent/10 text-[14px] font-semibold text-accent transition-colors hover:bg-accent/15"
            >
              {dict.nav.allTools}
            </Link>
          </div>
          <div className="flex-shrink-0 h-8" />
        </div>
      )}
    </>
  );
}
