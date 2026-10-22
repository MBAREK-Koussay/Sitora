type IconProps = {
  name: string;
  width: number;
  height?: number;
  className?: string;
};

// The Figma SVGs are single-colour. Rendering them as a CSS mask lets each one take a palette text colour
// (and flip in RTL) instead of keeping its baked-in fill.
const TONE: Record<string, string> = {};
const tones: [string, string[]][] = [
  ["text-primary", [
    "contact-pin", "contact-whatsapp", "footer-mail", "hero-badge-trend", "hero-lock", "hero-log1", "hero-log3",
    "hero-trend", "ind-1", "ind-2", "ind-3", "ind-4", "ind-5", "ind-6", "ind-7", "project-arrow", "svc-1-icon",
    "svc-1-li1", "svc-1-li2", "svc-1-li3", "svc-1-li4", "svc-3-li1", "svc-3-li2", "svc-3-li3", "svc-3-li4",
    "svc-arrow", "trust-1", "trust-2", "trust-3", "trust-4", "trust-5", "trust-6", "verified", "why-1", "why-3",
  ]],
  ["text-gold", [
    "contact-shield", "footer-iso", "hero-badge-bolt", "hero-badge-star", "hero-log2", "star", "svc-2-icon",
    "svc-2-li1", "svc-2-li2", "svc-2-li3", "svc-2-li4", "trust-badge-1", "trust-badge-2", "trust-badge-3",
    "why-2", "why-4",
  ]],
  ["text-ink", ["hero-arrow-down", "svc-3-icon"]],
  ["text-muted", [
    "footer-dribbble", "footer-github", "footer-globe", "footer-linkedin", "footer-x", "hero-bell", "hero-expand",
    "proc-1", "proc-2", "proc-3", "proc-4", "proc-5",
  ]],
  // Sit on the (fixed) yellow accent button, so they stay dark.
  ["text-accent-ink", ["contact-arrow", "cta-arrow", "hero-arrow-right"]],
  ["text-on-brand", ["header-user"]],
];
for (const [cls, names] of tones) for (const n of names) TONE[n] = cls;

const isArrow = (base: string) => /arrow(-right)?$/.test(base) && base !== "hero-arrow-down";

/** Static Figma asset from /public/sitora, rendered at the design's exact size. */
export default function Icon({ name, width, height = width, className = "" }: IconProps) {
  const src = `/sitora/${name}`;

  if (!name.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" width={width} height={height} className={`block max-w-none shrink-0 ${className}`} />
    );
  }

  const base = name.slice(0, -4);
  const mask = `url(${src}) center / 100% 100% no-repeat`;

  return (
    <span
      aria-hidden
      className={`block shrink-0 bg-current ${TONE[base] ?? "text-ink"} ${isArrow(base) ? "rtl:-scale-x-100" : ""} ${className}`}
      style={{ width, height, mask, WebkitMask: mask }}
    />
  );
}
