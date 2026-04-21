import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto flex items-center justify-between px-16 py-6">
        <div>
          <Link href="/" className="text-xl font-semibold">
            Johnny Joestar
          </Link>
        </div>
        <div className="items-center">
          <ul className="flex items-center gap-12">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-m text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {label}
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
