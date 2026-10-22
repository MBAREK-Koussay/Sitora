import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

type Item = { icon: string; w: number; h: number };

const CARDS: { iconBg: string; icon: string; iconW: number; iconH: number; items: Item[] }[] = [
  {
    iconBg: "bg-primary-soft",
    icon: "svc-1-icon.svg",
    iconW: 25,
    iconH: 25,
    items: [
      { icon: "svc-1-li1.svg", w: 15.001, h: 12 },
      { icon: "svc-1-li2.svg", w: 13.5, h: 13.5 },
      { icon: "svc-1-li3.svg", w: 13.5, h: 12 },
      { icon: "svc-1-li4.svg", w: 15, h: 15 },
    ],
  },
  {
    iconBg: "bg-accent/20",
    icon: "svc-2-icon.svg",
    iconW: 30,
    iconH: 28.75,
    items: [
      { icon: "svc-2-li1.svg", w: 15, h: 15 },
      { icon: "svc-2-li2.svg", w: 13.5, h: 15.75 },
      { icon: "svc-2-li3.svg", w: 15, h: 15 },
      { icon: "svc-2-li4.svg", w: 16.5, h: 12.75 },
    ],
  },
  {
    iconBg: "bg-surface-2",
    icon: "svc-3-icon.svg",
    iconW: 27.438,
    iconH: 27.438,
    items: [
      { icon: "svc-3-li1.svg", w: 13.5, h: 13.5 },
      { icon: "svc-3-li2.svg", w: 15, h: 14.25 },
      { icon: "svc-3-li3.svg", w: 12, h: 15 },
      { icon: "svc-3-li4.svg", w: 15, h: 12 },
    ],
  },
];

export default function Services({ dict }: { dict: Dictionary["services"] }) {
  return (
    <section id="services" className="bg-canvas py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-4 pt-1.5">
            <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
            <h2 className="max-w-[640px] font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
              {dict.title}
            </h2>
          </div>
          <p className="max-w-md text-lg leading-[30px] tracking-[-0.09px] text-muted">{dict.intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {dict.cards.map((text, c) => {
            const card = CARDS[c];
            return (
              <article
                key={text.title}
                className="flex flex-col justify-between gap-[18px] rounded-3xl bg-card p-8 drop-shadow-[0px_4px_12px_rgba(15,17,26,0.04)]"
              >
                <div className="flex flex-col">
                  <span className={`flex size-14 items-center justify-center rounded-2xl ${card.iconBg}`}>
                    <Icon name={card.icon} width={card.iconW} height={card.iconH} />
                  </span>
                  <span className="mt-[27px] inline-flex w-fit items-center rounded-full bg-accent-soft/40 px-3 py-1 text-xs font-bold leading-4 tracking-[0.72px] text-badge-ink">
                    {text.badge}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-8 tracking-[-0.36px] text-ink">
                    {text.title}
                  </h3>
                  <p className="mt-5 min-h-[130px] text-base leading-[26px] text-muted">{text.body}</p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {text.items.map((item, i) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <Icon name={card.items[i].icon} width={card.items[i].w} height={card.items[i].h} />
                        <span className="text-sm leading-[22px] text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#contact" className="mt-6 flex items-center gap-2 text-sm font-bold leading-5 tracking-[0.14px] text-primary">
                  {text.cta}
                  <Icon name="svc-arrow.svg" width={12} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
