import "server-only";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { SERVICES, TIMELINES, type Consultation } from "./consultation";
import { dirOf, type Locale } from "./i18n";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

type Row = [label: string, value: string];

function table(rows: Row[], dir: "ltr" | "rtl") {
  const align = dir === "rtl" ? "right" : "left";
  return `<table style="border-collapse:collapse;width:100%;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;white-space:nowrap;text-align:${align};vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;text-align:${align};white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

const layout = (inner: string, dir: "ltr" | "rtl", lang: Locale) =>
  `<!doctype html><html lang="${lang}" dir="${dir}"><body style="margin:0;padding:24px;background:#f4f4f2;font-family:Arial,Helvetica,sans-serif">` +
  `<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;color:#111">${inner}</div></body></html>`;

/** Email to the team with every field of the request (always in English). */
export function ownerEmail(c: Consultation) {
  const rows: Row[] = [
    ["Name", c.fullName],
    ["Email", c.email],
    ["Company", c.company],
    ["Service", SERVICES[c.serviceIndex]],
    ["Timeline", TIMELINES[c.timelineIndex]],
    ["Language", c.locale.toUpperCase()],
    ["Details", c.details || "—"],
  ];
  return {
    subject: `New consultation request — ${c.company} (${c.fullName})`,
    html: layout(`<h2 style="margin:0 0 16px">New consultation request</h2>${table(rows, "ltr")}`, "ltr", "en"),
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  };
}

const COPY: Record<Locale, { subject: string; greeting: (name: string) => string; body: string; recap: string; signoff: string }> = {
  en: {
    subject: "We received your consultation request",
    greeting: (n) => `Hello ${n},`,
    body: "Thank you for contacting Sitora. A senior architect will get back to you within 48 hours.",
    recap: "Your request",
    signoff: "The Sitora team",
  },
  fr: {
    subject: "Nous avons bien reçu votre demande de consultation",
    greeting: (n) => `Bonjour ${n},`,
    body: "Merci d’avoir contacté Sitora. Un architecte senior vous répondra sous 48 heures.",
    recap: "Votre demande",
    signoff: "L’équipe Sitora",
  },
  ar: {
    subject: "تم استلام طلب الاستشارة الخاص بك",
    greeting: (n) => `مرحبًا ${n}،`,
    body: "شكرًا لتواصلك مع سيتورا. سيتواصل معك أحد كبار المعماريين خلال 48 ساعة.",
    recap: "طلبك",
    signoff: "فريق سيتورا",
  },
};

/** Acknowledgement to the visitor, in the language they used on the site. */
export async function visitorEmail(c: Consultation) {
  const { contact } = await getDictionary(c.locale);
  const copy = COPY[c.locale];
  const dir = dirOf(c.locale);
  const rows: Row[] = [
    [contact.serviceLegend, contact.services[c.serviceIndex]],
    [contact.timeline.label, contact.timeline.options[c.timelineIndex]],
  ];
  const inner =
    `<p style="margin:0 0 12px;font-size:16px">${escapeHtml(copy.greeting(c.fullName))}</p>` +
    `<p style="margin:0 0 20px;font-size:15px;line-height:1.6">${escapeHtml(copy.body)}</p>` +
    `<h3 style="margin:0 0 8px;font-size:14px;color:#666">${escapeHtml(copy.recap)}</h3>${table(rows, dir)}` +
    `<p style="margin:24px 0 0;font-size:14px;color:#666">${escapeHtml(copy.signoff)}</p>`;
  return {
    subject: copy.subject,
    html: layout(inner, dir, c.locale),
    text: [copy.greeting(c.fullName), "", copy.body, "", ...rows.map(([k, v]) => `${k}: ${v}`), "", copy.signoff].join("\n"),
  };
}
