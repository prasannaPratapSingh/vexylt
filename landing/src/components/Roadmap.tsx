import { Reveal } from "../lib/motion";
import { Check } from "./icons";

// The lifecycle vision from the project's own roadmap.
const LIFECYCLE = [
  { label: "Build", done: true },
  { label: "Run", done: true },
  { label: "Trace", done: false },
  { label: "Debug", done: false },
  { label: "Replay", done: false },
  { label: "Evaluate", done: false },
  { label: "Optimize", done: false },
];

const SHIPPING = [
  "Agent + OpenAI integration",
  "Runner & tool system",
  "Streaming",
  "Sessions / context",
  "Structured outputs",
  "Guardrails",
  "Multi-agent basics",
];

const PLANNED = [
  "Agent tracing",
  "Replay & time-travel",
  "Evaluation harness",
  "Cost optimization",
  "Prompt versioning",
  "Vexylt Cloud & Console",
];

export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
            // roadmap
          </p>
          <h2 className="mt-5 max-w-2xl text-h2">
            Built to make agents{" "}
            <span className="hl hl-violet">debuggable</span>, not just runnable.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            The core SDK is the start. The event system underneath is designed
            so tracing, replay and evaluation can be built on top — the full
            path from writing an agent to understanding exactly what it did.
          </p>
        </Reveal>

        {/* lifecycle stepper */}
        <Reveal delay={80}>
          <div className="mt-12 overflow-x-auto pb-2">
            <ol className="flex min-w-max items-center">
              {LIFECYCLE.map((step, i) => (
                <li key={step.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-2 px-1">
                    <span
                      className={`grid h-9 w-9 place-items-center rounded-full border font-mono text-[0.72rem] ${
                        step.done
                          ? "border-transparent bg-violet text-white"
                          : "border-line-2 bg-surface text-faint"
                      }`}
                    >
                      {step.done ? <Check width={14} height={14} /> : i + 1}
                    </span>
                    <span
                      className={`font-mono text-[0.78rem] ${
                        step.done ? "font-medium text-ink" : "text-faint"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < LIFECYCLE.length - 1 && (
                    <span
                      className={`h-0.5 w-10 sm:w-16 ${
                        step.done && LIFECYCLE[i + 1].done
                          ? "bg-violet"
                          : "bg-line-2"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-4 font-mono text-[0.72rem] text-muted">
            <span className="text-violet">▲ you are here</span> —{" "}
            <span className="font-medium text-ink">Build · Run</span> shipping in
            v0.0.1
          </p>
        </Reveal>

        {/* shipping vs planned */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-violet/25 bg-violet-soft/50 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-h3 text-ink">Shipping — v0.0.1 core</h3>
                <span className="rounded-full bg-ok/12 px-2.5 py-0.5 font-mono text-[0.7rem] text-ok">
                  in progress
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {SHIPPING.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[0.95rem] text-ink">
                    <span className="grid h-4 w-4 flex-none place-items-center rounded-full bg-violet text-white">
                      <Check width={11} height={11} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-line bg-panel p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-h3 text-ink-2">On the roadmap</h3>
                <span className="rounded-full border border-line-2 px-2.5 py-0.5 font-mono text-[0.7rem] text-faint">
                  planned
                </span>
              </div>
              <ul className="mt-5 space-y-3">
                {PLANNED.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[0.95rem] text-muted">
                    <span
                      className="h-4 w-4 flex-none rounded-full border border-line-2"
                      aria-hidden="true"
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
