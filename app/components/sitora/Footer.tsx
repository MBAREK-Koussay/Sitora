import type { CSSProperties } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

const SOCIAL = [
  { name: "LinkedIn", icon: "footer-linkedin.svg", w: 15, h: 16.667 },
  { name: "X / Twitter", icon: "footer-x.svg", w: 16.667, h: 16.667 },
  { name: "GitHub", icon: "footer-github.svg", w: 16.667, h: 13.333 },
  { name: "Dribbble", icon: "footer-dribbble.svg", w: 16.667, h: 16.667 },
];

// Plain text (not links): these entries have no destination pages yet.
const itemClass = "text-sm leading-[22px] text-muted";

export default function Footer({ dict }: { dict: Dictionary["footer"] }) {
  // Link columns (the dictionary's columns + Legal) share the width left of the brand block equally,
  // so the footer stays balanced whatever number of columns the dictionaries define.
  const linkColumns = dict.columns.length + 1;
  const linksGrid = { "--footer-cols": `repeat(${linkColumns}, minmax(0, 1fr))` } as CSSProperties;

  return (
    <footer className="bg-surface">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-6 pb-12 pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <Icon name="logo.png" width={32} height={32} />
              <span className="font-display text-2xl font-bold leading-8 tracking-[-0.6px] text-ink">Sitora</span>
            </div>
            <p className="max-w-sm text-base leading-[26px] text-muted">{dict.tagline}</p>
            <a href="mailto:hello@sitora.digital" className="flex items-center gap-2 text-sm font-semibold leading-5 tracking-[0.14px] text-primary">
              <Icon name="footer-mail.svg" width={11.667} height={9.333} />
              hello@sitora.digital
            </a>
            {/* <div className="flex flex-wrap items-center gap-2 pt-2">
              {dict.cities.map((c) => (
                <span key={c} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-bold uppercase leading-4 tracking-[0.6px] text-ink">
                  {c}
                </span>
              ))}
            </div> */}
          </div>

          <div style={linksGrid} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-(--footer-cols) lg:col-span-8">
            {dict.columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
                <h4 className="font-display text-xl font-bold leading-7 tracking-[-0.2px] text-ink">{col.title}</h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <span className={itemClass}>{l}</span>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label={dict.legal.title} className="flex flex-col gap-3">
              <h4 className="font-display text-xl font-bold leading-7 tracking-[-0.2px] text-ink">{dict.legal.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {dict.legal.links.map((l) => (
                  <li key={l}>
                    <span className={itemClass}>{l}</span>
                  </li>
                ))}
                <li className="flex items-center gap-1.5 text-sm font-semibold leading-[22px] text-gold">
                  <Icon name="footer-iso.svg" width={9.333} height={11.667} />
                  {dict.legal.iso}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-footer-bar px-6 py-6 md:flex-row">
          <p className="text-center text-sm leading-[22px] text-muted">{dict.copyright}</p>
          {/* <p className="flex items-center gap-1 text-xs font-bold leading-4 tracking-[0.72px] text-muted">
            <Icon name="footer-globe.svg" width={12.892} height={11.667} />
            {dict.languages}
          </p> */}
          {/* <ul className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href="#" aria-label={s.name}>
                  <Icon name={s.icon} width={s.w} height={s.h} />
                </a>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </footer>
  );
}
