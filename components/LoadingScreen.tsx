"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Phase = "hidden" | "visible" | "exit-image" | "exit-screen" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("visible"), 50);
    const t1 = setTimeout(() => setPhase("exit-image"), 1400);
    const t2 = setTimeout(() => setPhase("exit-screen"), 2100);
    const t3 = setTimeout(() => setPhase("done"), 2900);
    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-700 ${
        phase === "exit-screen" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* TODO: Remplace /next.svg */}
      <div
        className={`transition-opacity duration-700 ${
          phase === "visible" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/next.svg"
          alt="Logo"
          width={120}
          height={40}
          className="dark:invert"
          priority
        />
      </div>
    </div>
  );
}
