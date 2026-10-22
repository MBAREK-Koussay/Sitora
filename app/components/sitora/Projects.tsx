import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

// img: object position taken from the Figma crop of each screenshot (height % / top %)
const IMAGES = [
  { img: "project-1.png", h: "122.61%", top: "-11.3%" },
  { img: "project-2.png", h: "125.68%", top: "-12.84%" },
  { img: "project-3.png", h: "122.61%", top: "-11.3%" },
  { img: "project-4.png", h: "122.61%", top: "-11.3%" },
];

export default function Projects({ dict }: { dict: Dictionary["projects"] }) {
  return (
    <section id="projects" className="bg-surface/50 py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-3 pt-1.5">
            <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
            <h2 className="font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
              {dict.title}
            </h2>
          </div>
          <a href="#contact" className="flex items-center gap-2 text-sm font-semibold leading-5 tracking-[0.14px] text-primary">
            {dict.cta}
            <Icon name="project-arrow.svg" width={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {dict.items.map((p, i) => (
            <article
              key={p.title}
              className="flex flex-col overflow-clip rounded-3xl bg-card shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
            >
              <div className="relative h-64 overflow-clip">
                <img
                  src={`/sitora/${IMAGES[i].img}`}
                  alt={p.alt}
                  className="absolute left-0 w-full max-w-none object-cover"
                  style={{ height: IMAGES[i].h, top: IMAGES[i].top }}
                />
                <div className="absolute start-4 top-4 flex items-start gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold leading-4 tracking-[0.72px] text-[#2100bf] backdrop-blur-[6px]">
                    {p.tag}
                  </span>
                  <span className="rounded-full bg-[rgba(47,49,48,0.8)] px-3 py-1 text-xs font-bold leading-4 tracking-[0.72px] text-[#f1f1ef] backdrop-blur-[6px]">
                    {p.place}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-8">
                <div className="flex flex-col gap-2 pb-6">
                  <h3 className="font-display text-2xl font-bold leading-8 tracking-[-0.36px] text-ink">{p.title}</h3>
                  <p className="text-base leading-[26px] text-muted">{p.body}</p>
                </div>
                <dl className="flex gap-4 rounded-2xl bg-surface/50 p-4">
                  {p.stats.map(({ value, label }, s) => (
                    <div key={label} className="flex min-w-px flex-1 flex-col-reverse gap-0.5 pb-0.5">
                      <dd className="text-sm leading-[22px] text-muted">{label}</dd>
                      <dt className={`font-display text-xl font-bold leading-7 tracking-[-0.2px] ${s === 0 ? "text-primary" : "text-gold"}`}>
                        {value}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
