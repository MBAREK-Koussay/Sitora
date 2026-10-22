import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

const ICONS = [
  { icon: "ind-1.svg", w: 20, h: 18 },
  { icon: "ind-2.svg", w: 15, h: 20 },
  { icon: "ind-3.svg", w: 20, h: 20 },
  { icon: "ind-4.svg", w: 22, h: 18 },
  { icon: "ind-5.svg", w: 20, h: 18 },
  { icon: "ind-6.svg", w: 19, h: 18 },
  { icon: "ind-7.svg", w: 18.032, h: 18.506 },
];

export default function Industries({ dict }: { dict: Dictionary["industries"] }) {
  return (
    <section className="bg-canvas py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 pt-1.5 lg:px-12">
        <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
        <h2 className="text-center font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
          {dict.title}
        </h2>
        <ul className="mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-6">
          {dict.items.map((label, i) => (
            <li key={label} className="flex items-center gap-3 rounded-2xl bg-surface px-6 py-4">
              <Icon name={ICONS[i].icon} width={ICONS[i].w} height={ICONS[i].h} />
              <span className="font-display text-xl font-medium leading-7 tracking-[-0.2px] text-ink">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
