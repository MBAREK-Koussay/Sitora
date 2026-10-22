import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

const PILLARS = [
  { iconBg: "bg-primary-soft", icon: "why-1.svg", w: 18.25, h: 15 },
  { iconBg: "bg-accent-soft", icon: "why-2.svg", w: 15, h: 15 },
  { iconBg: "bg-primary-soft", icon: "why-3.svg", w: 18.417, h: 16.667 },
  { iconBg: "bg-accent-soft", icon: "why-4.svg", w: 13.333, h: 16.667 },
];

const TEAM = [
  { initials: "NK", name: "Nadia K.", avatar: "bg-primary text-on-brand", statusColor: "text-primary" },
  { initials: "KB", name: "Karim B.", avatar: "bg-gold text-on-brand", statusColor: "text-gold" },
  { initials: "MD", name: "Marc D.", avatar: "bg-[#373843] text-white", statusColor: "text-muted" },
];

export default function WhySitora({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section id="about" className="bg-surface px-6 py-28 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <div className="flex flex-col gap-3 pt-1.5">
            <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
            <h2 className="font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
              {dict.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {dict.pillars.map((p, i) => (
              <div
                key={p.title}
                className="flex flex-col gap-2 self-start rounded-2xl bg-card p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <span className={`flex size-10 items-center justify-center rounded-xl ${PILLARS[i].iconBg}`}>
                  <Icon name={PILLARS[i].icon} width={PILLARS[i].w} height={PILLARS[i].h} />
                </span>
                <h3 className="pt-1 font-display text-xl font-bold leading-7 tracking-[-0.2px] text-ink">{p.title}</h3>
                <p className="text-sm leading-[22px] text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-3xl bg-card p-6 drop-shadow-[0px_20px_25px_rgba(15,17,26,0.08)] lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-accent" />
              <p className="text-xs font-bold uppercase leading-4 tracking-[0.72px] text-ink">{dict.sprint}</p>
            </div>
            <span dir="ltr" className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs leading-4 text-muted">v3.4.1</span>
          </div>

          <ul className="flex flex-col gap-3">
            {dict.team.map((m, i) => (
              <li key={TEAM[i].name} className="flex items-center justify-between gap-2 rounded-xl bg-surface p-3.5">
                <div className="flex items-center gap-3">
                  <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold leading-5 ${TEAM[i].avatar}`}>
                    {TEAM[i].initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold leading-5 tracking-[0.14px] text-ink">{TEAM[i].name}</p>
                    <p className="text-sm leading-[22px] text-muted">{m.role}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full bg-card px-2.5 py-1 text-xs font-bold leading-4 tracking-[0.72px] ${TEAM[i].statusColor}`}>
                  {m.status}
                </span>
              </li>
            ))}
          </ul>

          <div className="relative h-48 overflow-clip rounded-2xl">
            <img
              src="/sitora/why-photo.png"
              alt={dict.photoAlt}
              className="absolute left-0 top-[-9.22%] h-[118.45%] w-full max-w-none object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-linear-to-t from-[rgba(47,49,48,0.8)] via-[rgba(47,49,48,0)] via-50% to-[rgba(47,49,48,0)] p-4">
              <p className="text-xs font-bold leading-4 tracking-[0.72px] text-[#f1f1ef]">{dict.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
