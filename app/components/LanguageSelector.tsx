"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const languages = [
  { code: "fr", label: "FR", flag: "/fr.svg" },
  { code: "en", label: "EN", flag: "/en.svg" },
];

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function LanguageSelector() {
  const [selected, setSelected] = useState(languages[0]);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    setVisible(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  };

  const closeDropdown = () => {
    setOpen(false);
    setTimeout(() => setVisible(false), 200);
  };

  const toggle = () => (open ? closeDropdown() : openDropdown());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Image
          src={selected.flag}
          alt={selected.label}
          width={38}
          height={38}
        />
        <span className="font-medium">{selected.label}</span>
        <ChevronDownIcon open={open} />
      </button>

      {visible && (
        <ul
          role="listbox"
          className={`absolute right-0 top-full z-10 mt-1.5 min-w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-md transition-all duration-200 origin-top-right dark:border-zinc-700 dark:bg-zinc-900 ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-1"
          }`}
        >
          {languages.map((lang, i) => {
            const isSelected = lang.code === selected.code;
            return (
              <li
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`transition-all duration-200 ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-1"
                }`}
              >
                <button
                  onClick={() => {
                    setSelected(lang);
                    closeDropdown();
                  }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-zinc-50 font-semibold text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Image
                    src={lang.flag}
                    alt={lang.label}
                    width={20}
                    height={20}
                  />
                  <span>{lang.label}</span>
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto text-zinc-950 dark:text-zinc-50"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
