"use server";

import { createClient } from "@supabase/supabase-js";
import { parseConsultation, SERVICES, TIMELINES, type Consultation, type ConsultationState } from "@/app/lib/consultation";
import { ownerEmail, visitorEmail } from "@/app/lib/consultation-emails";

type Mail = { to: string; subject: string; html: string; text: string; replyTo?: string };

/** Sends through Resend's REST API. Throws on a non-2xx answer so callers can log the failure. */
async function sendMail({ to, subject, html, text, replyTo }: Mail) {
  const from = process.env.CONSULTATION_FROM;
  const key = process.env.RESEND_API_KEY;
  if (!from || !key) throw new Error("RESEND_API_KEY / CONSULTATION_FROM not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST", 
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function saveRequest(c: Consultation) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SECRET_KEY not set");

  // Server-only client with the secret (service role) key: it bypasses RLS, and the table has no public policies.
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.from("consultation_requests").insert({
    locale: c.locale,
    full_name: c.fullName,
    email: c.email,
    company: c.company,
    timeline: TIMELINES[c.timelineIndex],
    service: SERVICES[c.serviceIndex],
    details: c.details || null,
  });
  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
}

export async function submitConsultation(_prev: ConsultationState, formData: FormData): Promise<ConsultationState> {
  // Honeypot: real visitors never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("website") ?? "").trim()) return { status: "success" };

  const consultation = parseConsultation(formData);
  if (!consultation) return { status: "invalid" };

  const owner = ownerEmail(consultation);
  const notifyTo = process.env.CONSULTATION_TO;

  // Store and notify in parallel. The request counts as received if at least one of them worked.
  const [saved, notified] = await Promise.allSettled([
    saveRequest(consultation),
    notifyTo ? sendMail({ ...owner, to: notifyTo, replyTo: consultation.email }) : Promise.reject(new Error("CONSULTATION_TO not set")),
  ]);
  if (saved.status === "rejected") console.error("[consultation] could not save request:", saved.reason);
  if (notified.status === "rejected") console.error("[consultation] could not email the team:", notified.reason);
  if (saved.status === "rejected" && notified.status === "rejected") return { status: "error" };

  // Best effort: a failed acknowledgement must not turn a received request into an error.
  try {
    await sendMail({ ...(await visitorEmail(consultation)), to: consultation.email });
  } catch (err) {
    console.error("[consultation] could not email the visitor:", err);
  }

  return { status: "success" };
}
