"use client";

import Link from "next/link";
import { LOCALE_COOKIE, locales, type Locale } from "@/app/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

type Props = { lang: Locale; dict: Dictionary["header"] };

const NAV = [
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "projects", href: "#projects" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
] as const;

function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export default function Header({ lang, dict }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-card/85 shadow-[0px_4px_24px_-4px_rgba(15,17,26,0.06)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-4 px-6 lg:px-12">
        <a href="#" className="flex items-center gap-3">
          <span className="font-display text-2xl font-bold leading-8 tracking-[-0.6px] text-primary">
            Sitora
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full bg-surface/70 p-1.5 shadow-[0px_1px_4px_0px_rgba(15,17,26,0.03)] lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold leading-5 tracking-[0.14px] text-muted transition-colors hover:bg-card hover:text-primary"
            >
              {dict.nav[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center rounded-full bg-surface p-1" role="group" aria-label={dict.language}>
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                scroll={false}
                hrefLang={l}
                lang={l}
                onClick={() => rememberLocale(l)}
                aria-current={lang === l ? "true" : undefined}
                className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase leading-4 tracking-[0.72px] ${
                  lang === l
                    ? "bg-card text-primary drop-shadow-[0px_1px_2px_rgba(15,17,26,0.06)]"
                    : "text-muted hover:text-primary"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <ThemeToggle label={dict.theme} />
          <a
            href="#contact"
            className="hidden rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold leading-5 tracking-[0.14px] text-accent-ink drop-shadow-[0px_4px_8px_rgba(255,190,76,0.35)] md:block"
          >
            {dict.cta}
          </a>
          <a
            href="#contact"
            aria-label={dict.account}
            className="hidden size-8 items-center justify-center rounded-full bg-primary sm:flex"
          >
            <Icon name="header-user.svg" width={12} />
          </a>
        </div>
      </div>
    </header>
  );
}
