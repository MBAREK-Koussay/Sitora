import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

const PEOPLE = [
  { initials: "SB", name: "Sarah Benali", avatar: "bg-primary-soft text-primary" },
  { initials: "TA", name: "Tariq Al-Mansoor", avatar: "bg-accent-soft text-badge-ink" },
  { initials: "CD", name: "Claire Dupont", avatar: "bg-lilac text-primary" },
];

export default function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  return (
    <section className="bg-surface py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-16 px-6 lg:px-12">
        <div className="flex max-w-2xl flex-col items-center gap-3 pt-1.5 text-center">
          <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
            {dict.title}
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
          {dict.items.map((q, i) => (
            <figure
              key={PEOPLE[i].name}
              className="flex flex-col justify-between rounded-3xl bg-card p-8 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            >
              <div className="flex flex-col gap-6 pb-8">
                <div className="flex items-center gap-1" role="img" aria-label={dict.stars}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star.svg" width={15} height={14.25} />
                  ))}
                </div>
                <blockquote className="text-base italic leading-[26px] text-ink">“{q.quote}”</blockquote>
              </div>
              <figcaption className="flex items-center gap-3 pt-6">
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-full text-base font-bold leading-[26px] ${PEOPLE[i].avatar}`}>
                  {PEOPLE[i].initials}
                </span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold leading-5 tracking-[0.14px] text-ink">{PEOPLE[i].name}</span>
                    <Icon name="verified.svg" width={14.667} height={14} />
                  </div>
                  <p className="text-sm leading-[22px] text-muted">{q.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
