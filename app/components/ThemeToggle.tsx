"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function SunIcon() {
  return <Image src="/sun.svg" alt="Sun Light Mode" width={40} height={40} />;
}

function MoonIcon() {
  return <Image src="/moon.svg" alt="Moon Dark Mode" width={40} height={40} />;
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return stored === "dark" || (!stored && prefersDark);
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-[transform,background-color] duration-150  active:scale-90"
    >
      <span
        className={`absolute transition-all duration-300 ${
          isDark
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <MoonIcon />
      </span>
      <span
        className={`absolute transition-all duration-300 ${
          isDark
            ? "opacity-0 scale-75 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <SunIcon />
      </span>
    </button>
  );
}
