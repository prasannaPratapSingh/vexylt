import { Mark, GitHub } from "./icons";

const REPO_URL = "https://github.com/vexylt";

const GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Runtime", href: "#runtime" },
      { label: "Features", href: "#features" },
      { label: "Quickstart", href: "#quickstart" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Waitlist", href: "#waitlist" },
      { label: "GitHub", href: REPO_URL, external: true },
      { label: "Docs — soon", href: "#quickstart" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          {/* brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 text-ink">
              <Mark className="text-violet" />
              <span className="font-display text-lg font-bold tracking-tight">
                vexylt
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Infrastructure for AI agents. A developer-first TypeScript SDK
              for the whole agent lifecycle.
            </p>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line-2 px-3 py-2 font-mono text-[0.78rem] text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <GitHub width={16} height={16} />
              Star on GitHub
            </a>
          </div>

          {/* links */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {GROUPS.map((g) => (
              <div key={g.title}>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-faint">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="font-mono text-[0.82rem] text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.75rem] text-faint">
            © 2026 Vexylt · early development
          </p>
          <p className="font-mono text-[0.75rem] text-faint">
            Made for developers building agents.
          </p>
        </div>
      </div>
    </footer>
  );
}
