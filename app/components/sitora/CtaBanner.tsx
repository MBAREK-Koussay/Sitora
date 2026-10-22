import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

export default function CtaBanner({ dict }: { dict: Dictionary["cta"] }) {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center overflow-clip rounded-3xl bg-[linear-gradient(157deg,#2100bf_0%,#3b2fd9_50%,#373843_100%)] px-6 py-20 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] md:px-24 lg:px-52">
        <div className="pointer-events-none absolute -end-20 -top-20 size-80 rounded-full bg-[rgba(255,222,173,0.2)] blur-[32px]" />
        <div className="pointer-events-none absolute -bottom-20 -start-20 size-80 rounded-full bg-[rgba(226,223,255,0.2)] blur-[32px]" />

        <div className="relative flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase leading-4 tracking-[0.6px] text-white">
            {dict.badge}
          </span>
          <h2 className="mb-6 font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-white md:text-5xl md:leading-[56px]">
            {dict.title}
          </h2>
          <p className="mb-10 text-lg leading-[29.25px] tracking-[-0.09px] text-[#bebcff]">{dict.body}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-sm font-bold leading-5 tracking-[0.14px] text-accent-ink shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
            >
              {dict.primary}
              <Icon name="cta-arrow.svg" width={12} />
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center rounded-xl bg-white/10 px-8 py-4 text-sm font-semibold leading-5 tracking-[0.14px] text-white backdrop-blur-[6px]"
            >
              {dict.secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
