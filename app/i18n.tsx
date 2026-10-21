"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLocale, type Locale } from "./i18n-config";
import { translations } from "./translations";

export { isLocale } from "./i18n-config";
export type { Locale } from "./i18n-config";

type I18nContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (typeof translations)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale: initialLocale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const routeLocale = pathname.split("/")[1];
  const locale =
    routeLocale && isLocale(routeLocale) ? routeLocale : initialLocale;

  useEffect(() => {
    document.documentElement.lang =
      routeLocale && isLocale(routeLocale) ? routeLocale : initialLocale;
  }, [initialLocale, pathname, routeLocale]);

  const setLocale = (nextLocale: Locale) => {
    const segments = pathname.split("/");
    if (isLocale(segments[1] ?? "")) segments[1] = nextLocale;
    else segments.splice(1, 0, nextLocale);
    router.push(segments.join("/") || `/${nextLocale}`);
  };

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t: translations[locale] }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
