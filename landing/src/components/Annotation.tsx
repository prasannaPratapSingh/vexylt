type Dir = "down-right" | "down-left" | "up-right" | "up-left" | "right";

const ARROWS: Record<Dir, string> = {
  "down-right": "M6 5 C 12 26, 30 34, 52 40 M44 33 L54 41 L42 44",
  "down-left": "M54 5 C 48 26, 30 34, 8 40 M16 33 L6 41 L18 44",
  "up-right": "M6 44 C 12 22, 30 14, 52 8 M44 15 L54 7 L42 4",
  "up-left": "M54 44 C 48 22, 30 14, 8 8 M16 15 L6 7 L18 4",
  right: "M4 12 C 20 6, 38 6, 54 12 M46 5 L56 12 L45 18",
};

type Props = {
  children: React.ReactNode;
  dir?: Dir;
  className?: string;
  /** accent color of the note + arrow */
  tone?: "violet" | "coral" | "muted";
};

const TONE = {
  violet: "text-violet",
  coral: "text-coral",
  muted: "text-faint",
} as const;

/** A margin note with a hand-drawn connector — like a comment in code. */
export function Annotation({
  children,
  dir = "down-right",
  className = "",
  tone = "muted",
}: Props) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <p className={`anno ${TONE[tone]} max-w-[15rem]`}>{children}</p>
      <svg
        className={`mt-1 ${TONE[tone]}`}
        width="60"
        height="48"
        viewBox="0 0 60 48"
        fill="none"
      >
        <path
          d={ARROWS[dir]}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
