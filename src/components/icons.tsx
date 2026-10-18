import React from "react";

/* Line-art category icons, drawn to echo the reference's thin elegant strokes. */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconCouch({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} {...stroke}>
      <path d="M8 14v-4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v4" />
      <path d="M4 20a3 3 0 0 1 3-3c1.7 0 3 1.3 3 3v3h28v-3a3 3 0 0 1 6 0v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
      <path d="M13 17h22M10 28v3M38 28v3" />
      <path d="M17 6v9M24 6v9M31 6v9" opacity="0.5" />
    </svg>
  );
}

export function IconArmchair({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" className={className} {...stroke}>
      <path d="M12 18v-6a8 8 0 0 1 16 0v6" />
      <path d="M12 18c-3 0-5 2-5 5s2 5 5 5M28 18c3 0 5 2 5 5s-2 5-5 5" />
      <path d="M8 28v8a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-8M12 38v4M28 38v4" />
      <path d="M14 14h12" opacity="0.5" />
    </svg>
  );
}

export function IconChair({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 44" className={className} {...stroke}>
      <path d="M11 4h14v14H11z" />
      <path d="M11 18h14M9 30h18" />
      <path d="M9 30v10M27 30v10M11 24h14" />
    </svg>
  );
}

export function IconTable({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 30" className={className} {...stroke}>
      <path d="M6 10h40l-4 3H10z" />
      <path d="M12 13v12M40 13v12M14 25h8M34 25h6" />
      <path d="M18 6h16v4H18z" opacity="0.5" />
    </svg>
  );
}

export function IconLamp({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 44" className={className} {...stroke}>
      <path d="M16 4l7 10H9z" />
      <path d="M16 14v22M10 40h12" />
      <circle cx="16" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconStorage({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 44" className={className} {...stroke}>
      <rect x="8" y="6" width="20" height="32" rx="1.5" />
      <path d="M8 20h20M22 12h2M22 26h2" />
    </svg>
  );
}

/* UI icons */
export function IconSearch({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" />
    </svg>
  );
}

export function IconHeart({
  className = "h-5 w-5",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      {...stroke}
      strokeWidth={1.7}
      fill={filled ? "currentColor" : "none"}
    >
      <path d="M12 20.5s-7.5-4.7-7.5-10A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9c0 5.3-7.5 10-7.5 10z" />
    </svg>
  );
}

export function IconCart({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <path d="M6 7h12l-1 12H7z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

export function IconUser({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-3.5 3.5-5 7-5s6 1.5 7 5" />
    </svg>
  );
}

export function IconMenu({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function IconClose({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconChevron({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.7}>
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

export function IconCheck({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={2}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconMinus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconPlus({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} strokeWidth={1.8}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
