"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useI18n } from "../i18n";

function SunIcon() {
  return <Image src="/sun.svg" alt="Sun Light Mode" width={40} height={40} />;
}

function MoonIcon() {
  return <Image src="/moon.svg" alt="Moon Dark Mode" width={40} height={40} />;
}

const subscribe = () => () => {};

// Keep in sync with the .theme-transition duration in globals.css
const THEME_TRANSITION_MS = 300;
let transitionTimeout: number | undefined;

export default function ThemeToggle() {
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known on the client, so render nothing theme-dependent on the server
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!reduceMotion) {
      // Give every element the same color transition while the theme switches
      const root = document.documentElement;
      root.classList.add("theme-transition");
      window.clearTimeout(transitionTimeout);
      transitionTimeout = window.setTimeout(
        () => root.classList.remove("theme-transition"),
        THEME_TRANSITION_MS,
      );
    }

    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      disabled={!mounted}
      aria-label={isDark ? t.nav.themeSwitch.light : t.nav.themeSwitch.dark }
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
