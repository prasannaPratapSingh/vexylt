import { useEffect, useState } from "react";
import { Mark, GitHub, ArrowRight } from "./icons";

const LINKS = [
  { label: "Runtime", href: "#runtime" },
  { label: "Features", href: "#features" },
  { label: "Quickstart", href: "#quickstart" },
  { label: "Roadmap", href: "#roadmap" },
];

// Placeholder — point this at the real repo once it's public.
const REPO_URL = "https://github.com/prasannaPratapSingh/vexylt";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-ink"
            aria-label="Vexylt — home"
          >
            <Mark className="text-violet transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-display text-xl font-bold tracking-tight">
              vexylt
            </span>
          </a>

          <div className="hidden items-center gap-0.5 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="navlink rounded-md px-3 py-2 font-mono text-[0.8rem] text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-panel hover:text-ink sm:flex"
              aria-label="Vexylt on GitHub"
            >
              <GitHub width={18} height={18} />
            </a>
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-mono text-[0.8rem] font-medium text-paper transition-all hover:bg-violet active:translate-y-px"
            >
              Join waitlist
              <ArrowRight
                width={15}
                height={15}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
