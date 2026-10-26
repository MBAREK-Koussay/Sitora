import { defaultLocale, hasLocale, type Locale } from "./i18n";

// Canonical (English) option values. The form posts the option *index*, so what is stored and emailed to us
// is the same whatever language the visitor used.
export const TIMELINES = ["Immediate (within 30 days)", "1 – 3 months", "3 – 6 months", "Flexible"] as const;
export const SERVICES = ["Custom Website", "ERP / CRM Tool", "Workflow Automation", "Full Transformation"] as const;

export type Consultation = {
  locale: Locale;
  fullName: string;
  email: string;
  company: string;
  timelineIndex: number;
  serviceIndex: number;
  details: string;
};

export type ConsultationState = { status: "idle" | "success" | "invalid" | "error" };

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

function index(data: FormData, key: string, length: number): number | null {
  const n = Number(data.get(key));
  return Number.isInteger(n) && n >= 0 && n < length ? n : null;
}

/** Validates the posted form. Returns null when anything is missing or out of range. */
export function parseConsultation(data: FormData): Consultation | null {
  const lang = String(data.get("lang") ?? "");
  const fullName = text(data, "name", 200);
  const email = text(data, "email", 320);
  const company = text(data, "company", 200);
  const timelineIndex = index(data, "timeline", TIMELINES.length);
  const serviceIndex = index(data, "service", SERVICES.length);

  if (!fullName || !company || !EMAIL_RE.test(email)) return null;
  if (timelineIndex === null || serviceIndex === null) return null;

  return {
    locale: hasLocale(lang) ? lang : defaultLocale,
    fullName,
    email,
    company,
    timelineIndex,
    serviceIndex,
    details: text(data, "details", 5000),
  };
}
