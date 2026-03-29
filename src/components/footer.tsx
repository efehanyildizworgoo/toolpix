import type { Dictionary } from "@/lib/dictionary";

interface FooterProps {
  dict: Dictionary;
}

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="border-t border-card-border py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <p className="text-[13px] text-fg-muted">{dict.common.footer}</p>
        <p className="mt-2 text-[11px] text-fg-muted/60">
          © {new Date().getFullYear()} Toolpix. {dict.common.madeWith}
        </p>
      </div>
    </footer>
  );
}
