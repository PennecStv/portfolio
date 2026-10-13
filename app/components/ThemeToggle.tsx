"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

function SunIcon() {
  return <Image src="/sun.svg" alt="Sun Light Mode" width={40} height={40} />;
}

function MoonIcon() {
  return <Image src="/moon.svg" alt="Moon Dark Mode" width={40} height={40} />;
}

const subscribe = () => () => {};

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known on the client, so render nothing theme-dependent on the server
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      onClick={toggle}
      disabled={!mounted}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-[transform,background-color] duration-150  active:scale-90"
    >
      {/* Moon is shown in light mode: click it to switch to dark */}
      <span
        className={`absolute transition-all duration-300 ${
          mounted && !isDark
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <MoonIcon />
      </span>
      {/* Sun is shown in dark mode: click it to switch to light */}
      <span
        className={`absolute transition-all duration-300 ${
          isDark
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <SunIcon />
      </span>
    </button>
  );
}
