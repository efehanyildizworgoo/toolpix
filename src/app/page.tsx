"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-fg-muted text-sm">Redirecting...</p>
    </div>
  );
}
