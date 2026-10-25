"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { ThemeToggle } from "@/components/settings/ThemeToggle";

const NAV = [
  { href: "/", label: "Collections", match: (path: string) => path === "/" },
  { href: "/sources/", label: "Sources", match: (path: string) => path.startsWith("/sources") },
];

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="site-header sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="Hadithly home">
          <BrandMark className="h-6 w-6" />
          <span className="display text-[1.35rem] leading-none tracking-tight">Hadithly</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-[0.8125rem] transition-colors ${
                    active
                      ? "text-ink after:absolute after:inset-x-3 after:-bottom-[1.05rem] after:h-px after:bg-accent"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
