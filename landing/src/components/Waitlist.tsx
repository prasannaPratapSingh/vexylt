import { useState } from "react";
import { Reveal } from "../lib/motion";
import { count, submit } from "../lib/waitlist";
import { ArrowRight, Check } from "./icons";

type Status = "idle" | "pending" | "joined" | "already" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [position, setPosition] = useState<number | null>(null);
  const [total, setTotal] = useState(() => count());

  const done = status === "joined" || status === "already";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");

    const result = await submit(email);
    if (result.status === "invalid") {
      setStatus("error");
      return;
    }
    setPosition(result.position);
    setTotal(count());
    setStatus(result.status === "already" ? "already" : "joined");
  }

  return (
    <section id="waitlist" className="scroll-mt-24">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-violet p-7 text-white sm:p-12">
            {/* soft lime accent, top-right */}
            <div
              className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-lime/25 blur-[90px]"
              aria-hidden="true"
            />
            {/* deep-violet counter-glow, bottom-left */}
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-ink/60 blur-[90px]"
              aria-hidden="true"
            />

            <div className="relative">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-lime">
                // join the waitlist
              </p>
              <h2 className="mt-4 text-h2 text-white">
                Build. Run. <span className="hl hl-lime">Ship AI agents</span>.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                Vexylt is in early development. Join the waitlist for early
                access, the first npm release, and updates as Vexylt ships.
              </p>

              {/* form / confirmation */}
              <div className="mt-8">
                {!done ? (
                  <form onSubmit={onSubmit} noValidate>
                    <label htmlFor="wl-email" className="sr-only">
                      Email address
                    </label>
                    <div
                      className={`flex flex-col gap-2 rounded-2xl border bg-surface p-2 transition-colors sm:flex-row sm:items-center ${
                        status === "error"
                          ? "border-coral"
                          : "border-transparent focus-within:ring-2 focus-within:ring-lime"
                      }`}
                    >
                      <div className="flex flex-1 items-center gap-2 px-3">
                        <span className="font-mono text-violet" aria-hidden="true">
                          ›
                        </span>
                        <input
                          id="wl-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === "error") setStatus("idle");
                          }}
                          placeholder="you@company.dev"
                          autoComplete="email"
                          aria-invalid={status === "error"}
                          aria-describedby="wl-help"
                          className="w-full bg-transparent py-2.5 font-mono text-sm text-ink placeholder:text-faint focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === "pending"}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-lime px-5 py-3 font-mono text-sm font-semibold text-ink transition-all hover:bg-lime-deep disabled:opacity-70"
                      >
                        {status === "pending" ? (
                          <>
                            joining
                            <span className="inline-block h-3.5 w-1.5 animate-blink bg-ink" />
                          </>
                        ) : (
                          <>
                            Join
                            <ArrowRight
                              width={15}
                              height={15}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <p
                      id="wl-help"
                      aria-live="polite"
                      className={`mt-3 flex items-center gap-2 font-mono text-[0.75rem] ${
                        status === "error" ? "text-white" : "text-white/60"
                      }`}
                    >
                      {status === "error" && (
                        <span
                          className="h-1.5 w-1.5 flex-none rounded-full bg-coral"
                          aria-hidden="true"
                        />
                      )}
                      {status === "error"
                        ? "Enter a valid email address to join."
                        : "No spam. One email when it's ready to install."}
                    </p>
                  </form>
                ) : (
                  <div
                    aria-live="polite"
                    className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-lime text-ink">
                        <Check width={16} height={16} />
                      </span>
                      <div>
                        <p className="font-semibold text-white">
                          {status === "already"
                            ? "You're already on the list."
                            : "You're in."}
                        </p>
                        <p className="font-mono text-[0.8rem] text-white/70">
                          Position{" "}
                          <span className="text-lime">
                            #{position?.toLocaleString()}
                          </span>{" "}
                          — we'll email {email.trim().toLowerCase()} when
                          Vexylt ships.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-6 flex items-center gap-2 font-mono text-[0.75rem] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
                <span className="font-medium text-white">
                  {total.toLocaleString()}
                </span>{" "}
                developers already in line
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
