"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = { dir: "ltr" | "rtl"; dict: Dictionary["hero"] };

const LOG_ICONS = [
  { icon: "hero-log1.svg", w: 13.333, h: 15.333 },
  { icon: "hero-log2.svg", w: 13.333, h: 14 },
  { icon: "hero-log3.svg", w: 10.667, h: 15.333 },
];

const cardShadow = "drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]";
const floatShadow = "drop-shadow-[0px_12px_16px_rgba(15,17,26,0.08)]";

/** Inlined (not an <img>) so it uses the palette variables. */
function HeroChart({ className }: { className?: string }) {
  return (
    <svg className={className} preserveAspectRatio="none" overflow="visible" viewBox="0 0 478.253 176" fill="none" aria-hidden>
      <defs>
        <linearGradient id="hero-chart-fill" x1="1.533" y1="22" x2="1.533" y2="176" gradientUnits="userSpaceOnUse">
          <stop style={{ stopColor: "var(--c-primary)", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "var(--c-primary)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path
        d="M1.53341 143C58.1734 121 95.9334 154 152.573 93.5C209.213 33 246.973 104.5 303.613 55C360.253 5.5 398.013 44 473.533 22V176H1.53341V143"
        fill="url(#hero-chart-fill)"
      />
      <path
        d="M1.53341 143C58.1734 121 95.9334 154 152.573 93.5C209.213 33 246.973 104.5 303.613 55C360.253 5.5 398.013 44 473.533 22"
        strokeWidth="3.066"
        strokeLinecap="round"
        style={{ stroke: "var(--c-primary)" }}
      />
      <ellipse cx="152.573" cy="93.5" rx="3.776" ry="4.4" style={{ fill: "var(--c-accent)" }} />
      <ellipse cx="303.613" cy="55" rx="3.776" ry="4.4" style={{ fill: "var(--c-accent)" }} />
      <ellipse cx="473.533" cy="22" rx="4.72" ry="5.5" style={{ fill: "var(--c-primary)" }} />
    </svg>
  );
}

export default function Hero({ dir, dict }: Props) {
  const root = useRef<HTMLElement>(null);
  const rtl = dir === "rtl";
  const words = dict.titleStart.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-hero=word]", { yPercent: 110, autoAlpha: 0, duration: 0.8, stagger: 0.06 })
          .from("[data-hero=gradient]", { yPercent: 110, autoAlpha: 0, duration: 0.8 }, "-=0.5")
          .from("[data-hero=lead]", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.5")
          .from("[data-hero=cta]", { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .from("[data-hero=mockup]", { y: 80, scale: 0.94, autoAlpha: 0, duration: 1.1, ease: "power4.out" }, "-=0.3")
          .from("[data-hero=stat]", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, "-=0.6")
          .from(
            "[data-hero=bar]",
            { scaleX: 0, transformOrigin: rtl ? "right center" : "left center", duration: 1, ease: "power2.out" },
            "<",
          )
          // The chart is always drawn left-to-right (time axis), so it wipes in from the left in every language.
          .from("[data-hero=chart]", { clipPath: "inset(0 100% 0 0)", duration: 1.2, ease: "power2.inOut" }, "<")
          .from("[data-hero=log]", { x: rtl ? -24 : 24, autoAlpha: 0, duration: 0.5, stagger: 0.12 }, "-=0.8")
          .from(
            "[data-hero=float]",
            { scale: 0.7, y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.7)" },
            "-=0.4",
          );

        // Ambient float on the badges once they have landed.
        gsap.utils.toArray<HTMLElement>("[data-hero=float]").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 10 : -10,
            duration: 2.4 + i * 0.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 3 + i * 0.2,
          });
        });

        // Parallax on the glow blobs and a subtle lift on the mockup as the page scrolls.
        gsap.utils.toArray<HTMLElement>("[data-hero=blob]").forEach((el, i) => {
          gsap.to(el, {
            yPercent: i ? -30 : 30,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
        });
        gsap.to("[data-hero=mockup]", {
          yPercent: -4,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero=mockup]", start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    // Runs once: on a language switch the page soft-navigates, so the intro must not replay.
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative overflow-x-clip pb-24 pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] max-w-[1280px] opacity-70">
        <div data-hero="blob" className="absolute start-[320px] top-[-128px] size-[500px] rounded-full bg-[rgba(226,223,255,0.5)] blur-[65px]" />
        <div data-hero="blob" className="absolute end-[320px] top-[-80px] size-[420px] rounded-full bg-[rgba(255,222,173,0.4)] blur-[60px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 lg:px-12">
        <h1 className="mb-8 max-w-5xl text-center font-display text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[72px] lg:leading-[80px] lg:tracking-[-2.16px]">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className="inline-block overflow-clip align-bottom">
              <span data-hero="word" className="inline-block">
                {word}
              </span>
              &nbsp;
            </span>
          ))}
          <span className="inline-block overflow-clip align-bottom">
            <span
              data-hero="gradient"
              className="inline-block bg-linear-to-r from-primary via-brand-mid to-gold bg-clip-text text-transparent rtl:bg-linear-to-l"
            >
              {dict.titleHighlight}
            </span>
          </span>
        </h1>

        <p data-hero="lead" className="mb-10 max-w-3xl text-center text-lg leading-[29.25px] tracking-[-0.09px] text-muted">
          {dict.lead}
        </p>

        <div className="mb-20 flex flex-col items-center gap-4 sm:flex-row">
          <a
            data-hero="cta"
            href="#contact"
            className="flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-sm font-semibold leading-5 tracking-[0.14px] text-accent-ink drop-shadow-[0px_8px_12px_rgba(255,190,76,0.35)]"
          >
            {dict.ctaPrimary}
            <Icon name="hero-arrow-right.svg" width={12} />
          </a>
          <a
            data-hero="cta"
            href="#projects"
            className={`flex items-center justify-center gap-2 rounded-xl bg-card px-8 py-4 text-sm font-semibold leading-5 tracking-[0.14px] text-ink ${cardShadow}`}
          >
            {dict.ctaSecondary}
            <Icon name="hero-arrow-down.svg" width={10.5} height={15} />
          </a>
        </div>

        {/* Multi-device mockup */}
        <div data-hero="mockup" className="relative w-full max-w-6xl pt-4">
          <div className="relative rounded-3xl bg-[#2f3130] p-3 shadow-[0px_24px_64px_-12px_rgba(15,17,26,0.2)] sm:p-5">
            <div className="overflow-clip rounded-2xl bg-card shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <div className="flex h-10 items-center justify-between bg-surface px-4">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-[#ffdad6]" />
                  <span className="size-3 rounded-full bg-accent-soft" />
                  <span className="size-3 rounded-full bg-primary-soft" />
                </div>
                <div dir="ltr" className="flex min-w-0 items-center gap-2 rounded-md bg-card px-4 py-1">
                  <Icon name="hero-lock.svg" width={8.667} height={11.375} />
                  <span className="truncate font-mono text-xs leading-4 text-muted">
                    portal.sitora-enterprise.internal/executive/analytics
                  </span>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <Icon name="hero-bell.svg" width={10.667} height={13.333} />
                  <Icon name="hero-expand.svg" width={12} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 bg-surface/40 p-4 sm:p-8 lg:grid-cols-12">
                <div className="flex flex-col gap-4 self-start lg:col-span-3">
                  <div data-hero="stat" className={`flex flex-col gap-1 rounded-xl bg-card p-4 ${cardShadow}`}>
                    <p className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-muted">{dict.revenue.label}</p>
                    <p dir="ltr" className="font-display text-2xl font-bold leading-8 tracking-[-0.36px] text-ink rtl:text-end">$1,428,950</p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <Icon name="hero-trend.svg" width={8.667} />
                      <p className="text-xs font-bold leading-4 tracking-[0.72px] text-primary">{dict.revenue.trend}</p>
                    </div>
                  </div>
                  <div data-hero="stat" className={`flex flex-col gap-3 rounded-xl bg-card p-4 ${cardShadow}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase leading-4 tracking-[0.72px] text-muted">{dict.pipeline.label}</p>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold leading-4 tracking-[0.72px] text-primary">
                        {dict.pipeline.status}
                      </span>
                    </div>
                    <div className="h-2 overflow-clip rounded-full bg-track">
                      <div data-hero="bar" className="h-2 w-[84%] rounded-full bg-primary" />
                    </div>
                    <p className="text-sm leading-[22px] text-muted">{dict.pipeline.text}</p>
                  </div>
                </div>

                <div className={`flex flex-col justify-between self-start rounded-xl bg-card p-5 lg:col-span-6 ${cardShadow}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
                    <div>
                      <h2 className="font-display text-xl font-bold leading-7 tracking-[-0.2px] text-ink">{dict.chart.title}</h2>
                      <p className="text-sm leading-[22px] text-muted">{dict.chart.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold leading-4 tracking-[0.72px] text-ink">
                      {dict.chart.live}
                    </span>
                  </div>
                  <div data-hero="chart" dir="ltr" className="relative h-44 w-full">
                    <HeroChart className="absolute inset-y-0 -left-[0.32%] h-full w-[101.32%] max-w-none" />
                  </div>
                  <div className="flex items-start justify-center pt-3">
                    {dict.chart.points.map((p) => (
                      <div key={p.time} className="flex min-w-px flex-1 flex-col items-center gap-0.5 pt-0.5">
                        <span className="text-sm leading-[22px] text-muted">{p.time}</span>
                        <span className="text-xs font-bold leading-4 tracking-[0.72px] text-ink">{p.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 self-start lg:col-span-3">
                  <p className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-muted">{dict.logs.title}</p>
                  <div className="flex flex-col gap-2.5">
                    {dict.logs.items.map((log, i) => (
                      <div key={log.title} data-hero="log" className={`flex items-start gap-2.5 rounded-lg bg-card p-3 ${cardShadow}`}>
                        <Icon name={LOG_ICONS[i].icon} width={LOG_ICONS[i].w} height={LOG_ICONS[i].h} />
                        <div>
                          <p className="text-xs font-semibold leading-4 tracking-[0.72px] text-ink">{log.title}</p>
                          <p className="text-sm leading-[22px] text-muted">{log.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges (desktop only) */}
          <div data-hero="float" className={`absolute -top-8 -start-6 hidden items-center gap-3 rounded-2xl bg-card px-5 py-3.5 xl:flex ${floatShadow}`}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent/20">
              <Icon name="hero-badge-bolt.svg" width={13.333} height={16.667} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-ink">{dict.floats[0].title}</p>
              <p className="text-sm leading-[22px] text-muted">{dict.floats[0].subtitle}</p>
            </div>
          </div>
          <div data-hero="float" className={`absolute top-[33.33%] -end-8 hidden items-center gap-3 rounded-2xl bg-card px-5 py-3.5 xl:flex ${floatShadow}`}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft">
              <Icon name="hero-badge-trend.svg" width={16.667} height={10} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-primary">{dict.floats[1].title}</p>
              <p className="text-sm leading-[22px] text-muted">{dict.floats[1].subtitle}</p>
            </div>
          </div>
          <div data-hero="float" className={`absolute -bottom-6 start-12 hidden items-center gap-3 rounded-2xl bg-card px-5 py-3.5 xl:flex ${floatShadow}`}>
            <span className="flex size-9 items-center justify-center rounded-xl bg-surface-2">
              <Icon name="hero-badge-star.svg" width={16.667} height={15.833} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-ink">{dict.floats[2].title}</p>
              <p className="text-sm leading-[22px] text-muted">{dict.floats[2].subtitle}</p>
            </div>
          </div>
          <div data-hero="float" className="absolute -bottom-10 -end-6 hidden w-64 flex-col rounded-3xl bg-[#2f3130] p-2.5 drop-shadow-[0px_20px_24px_rgba(15,17,26,0.25)] xl:flex">
            <div className="flex flex-col gap-3 rounded-2xl bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold leading-4 tracking-[0.72px] text-ink">{dict.mobile.title}</p>
                <span className="size-2 rounded-full bg-accent" />
              </div>
              <div className="flex flex-col rounded-xl bg-surface p-3">
                <p className="text-sm leading-[22px] text-muted">{dict.mobile.request}</p>
                <p className="text-sm font-bold leading-5 tracking-[0.14px] text-ink">{dict.mobile.wire}</p>
                <div className="flex gap-2 pt-2">
                  <button type="button" className="rounded-lg bg-primary px-3 py-1 text-xs font-bold leading-4 tracking-[0.72px] text-on-brand">
                    {dict.mobile.approve}
                  </button>
                  <button type="button" className="rounded-lg bg-chip px-3 py-1 text-xs font-bold leading-4 tracking-[0.72px] text-ink">
                    {dict.mobile.review}
                  </button>
                </div>
              </div>
              <p className="text-center text-sm leading-[22px] text-muted">{dict.mobile.auth}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
