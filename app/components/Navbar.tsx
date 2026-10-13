"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import { useI18n } from "../i18n";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const { locale, t } = useI18n();

  return (
    <header className="border-b-4 border-b-foreground">
      <nav className="mx-auto flex items-center justify-between px-16 py-6">
        <div>
          <Link href="/" className="text-xl font-semibold">
            Johnny Joestar
          </Link>
        </div>
        <div className="items-center">
          <ul className="flex items-center gap-12">
            {links.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={`/${locale}${href === "/" ? "" : href}`}
                  className="text-m text-zinc-600 transition-colors hover:text-zinc-950 dark:text-foreground dark:hover:text-secondary"
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
