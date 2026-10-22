import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

const STEP_ICONS = [
  { icon: "proc-1.svg", w: 18.792, h: 18.333 },
  { icon: "proc-2.svg", w: 10.083, h: 16.5 },
  { icon: "proc-3.svg", w: 18.333, h: 11 },
  { icon: "proc-4.svg", w: 18.376, h: 18.398 },
  { icon: "proc-5.svg", w: 18.333, h: 19.25 },
];

export default function Process({ dict }: { dict: Dictionary["process"] }) {
  return (
    <section id="process" className="bg-canvas py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-20 px-6 lg:px-12">
        <div className="flex max-w-3xl flex-col items-center gap-3 pt-1.5 text-center">
          <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
            {dict.title}
          </h2>
          <p className="pt-1 text-lg leading-[30px] tracking-[-0.09px] text-muted">{dict.intro}</p>
        </div>

        <ol className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {dict.steps.map((s, i) => (
            <li
              key={s.title}
              className="flex flex-col justify-between rounded-2xl bg-card p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[32px] font-bold leading-10 tracking-[-0.64px] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={STEP_ICONS[i].icon} width={STEP_ICONS[i].w} height={STEP_ICONS[i].h} />
                </div>
                <h3 className="pt-2 font-display text-xl font-bold leading-7 tracking-[-0.2px] text-ink">{s.title}</h3>
                <p className="text-sm leading-[22px] text-muted">{s.body}</p>
              </div>
              <div className="flex flex-col gap-2.5 pt-10">
                {s.foot.map((f) => (
                  <p key={f} className="text-xs font-bold leading-4 tracking-[0.72px] text-primary">
                    {f}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
