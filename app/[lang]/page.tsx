"use client";

import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import { useI18n } from "@/app/i18n";

export default function Home() {
  const { t } = useI18n();

  return (
    <>
      <LoadingScreen />
      <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-background sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt={t.home.nextLogo}
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
              {t.home.title}
            </h1>
            <p className="max-w-md text-lg leading-8 text-secondary">
              {t.home.description} {t.home.templates} {t.home.learning}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.home.deploy}
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.home.documentation}
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
