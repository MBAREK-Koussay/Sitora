"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import Icon from "./Icon";

const label = "text-sm font-semibold leading-5 tracking-[0.14px] text-ink";
const field =
  "w-full rounded-xl bg-surface px-4 text-base text-ink placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-primary/40";

export default function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const [service, setService] = useState(0);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to a backend / email endpoint. For now just confirm to the visitor.
    setSent(true);
  }

  return (
    <section id="contact" className="bg-canvas py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-16 px-6 lg:px-12">
        <div className="flex max-w-3xl flex-col items-center gap-3 pt-1.5 text-center">
          <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-primary">{dict.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold leading-[1.17] tracking-[-1.2px] text-ink md:text-5xl md:leading-[56px]">
            {dict.title}
          </h2>
          <p className="pt-1 text-lg leading-[30px] tracking-[-0.09px] text-muted">{dict.intro}</p>
        </div>

        <div className="grid w-full grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="rounded-3xl bg-card p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-10 lg:col-span-7">
            {sent ? (
              <div role="status" className="flex flex-col items-center gap-3 py-24 text-center">
                <h3 className="font-display text-2xl font-semibold leading-8 text-ink">{dict.success.title}</h3>
                <p className="text-muted">{dict.success.body}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className={label}>{dict.name.label}</label>
                    <input id="name" name="name" required placeholder={dict.name.placeholder} className={`${field} h-12`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className={label}>{dict.email.label}</label>
                    <input id="email" name="email" type="email" dir="ltr" required placeholder={dict.email.placeholder} className={`${field} h-12 rtl:text-end`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className={label}>{dict.company.label}</label>
                    <input id="company" name="company" required placeholder={dict.company.placeholder} className={`${field} h-12`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="timeline" className={label}>{dict.timeline.label}</label>
                    <select id="timeline" name="timeline" className={`${field} h-12 ps-5`}>
                      {dict.timeline.options.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <fieldset className="flex flex-col gap-2">
                  <legend className={`${label} mb-2`}>{dict.serviceLegend}</legend>
                  <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {dict.services.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={service === i}
                        onClick={() => setService(i)}
                        className={`rounded-xl px-4 py-2 text-xs font-semibold leading-4 tracking-[0.72px] ${
                          service === i ? "bg-primary text-on-brand" : "bg-surface text-ink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className={label}>{dict.budget.label}</label>
                  <select id="budget" name="budget" defaultValue={dict.budget.options[1]} className={`${field} h-12 ps-5`}>
                    {dict.budget.options.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="details" className={label}>{dict.details.label}</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    placeholder={dict.details.placeholder}
                    className={`${field} resize-y py-4 leading-[26px]`}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent py-4 text-sm font-bold leading-5 tracking-[0.14px] text-accent-ink drop-shadow-[0px_8px_12px_rgba(255,190,76,0.35)]"
                >
                  {dict.submit}
                  <Icon name="contact-arrow.svg" width={12} />
                </button>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-6 rounded-3xl bg-card p-8 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] lg:col-span-5">
            <div className="flex flex-col gap-2 pt-1.5">
              <p className="text-xs font-bold uppercase leading-4 tracking-[1.2px] text-gold">{dict.aside.eyebrow}</p>
              <h3 className="font-display text-2xl font-semibold leading-8 tracking-[-0.36px] text-ink">{dict.aside.title}</h3>
              <p className="text-sm leading-[22px] text-muted">{dict.aside.body}</p>
            </div>
            <a
              href="https://wa.me/33189204410"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-surface-2 px-6 py-3.5 text-sm font-semibold leading-5 tracking-[0.14px] text-ink"
            >
              <Icon name="contact-whatsapp.svg" width={20} />
              {dict.aside.whatsapp}
            </a>

            <div className="flex items-center gap-3 rounded-xl bg-surface p-4">
              <Icon name="contact-shield.svg" width={16} height={20} />
              <p className="text-sm leading-[22px] text-ink">{dict.aside.nda}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
