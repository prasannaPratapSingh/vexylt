import type { SVGProps } from "react";

/* Compact 24px stroke icons. Inherit color via currentColor. */

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Brand mark — the violet runtime diamond. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 4 L28 16 L16 28 L4 16 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M16 10.5 L21.5 16 L16 21.5 L10.5 16 Z" fill="currentColor" />
    </svg>
  );
}

export const RuntimeIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
  </svg>
);

export const ToolsIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.5 5.5a3.5 3.5 0 0 0-4.9 4.4L4 15.5 8.5 20l5.6-5.6a3.5 3.5 0 0 0 4.4-4.9l-2.5 2.5-2-2 2.5-2.5Z" />
  </svg>
);

export const StreamIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 12c2 0 2-5 4-5s2 10 4 10 2-5 4-5 2 5 4 5" />
  </svg>
);

export const SessionIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 8v4l3 2" />
    <path d="M3.5 12a8.5 8.5 0 1 1 2.6 6.1" />
    <path d="M3.5 19v-3.5H7" />
  </svg>
);

export const StructuredIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 4c-2 0-2 3-2 4s0 2-2 2c2 0 2 1 2 2s0 4 2 4" />
    <path d="M16 4c2 0 2 3 2 4s0 2 2 2c-2 0-2 1-2 2s0 4-2 4" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.4 3 8 7 10 4-2 7-5.6 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const AgentsIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="18" r="2.2" />
    <circle cx="19" cy="18" r="2.2" />
    <path d="M12 7.2 6.5 16M12 7.2 17.5 16M7 18h10" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <path d="m4 12 5 5L20 6" />
  </svg>
);

export const GitHub = (p: P) => (
  <svg {...base} {...p} strokeWidth={0} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
