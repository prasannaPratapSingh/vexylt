import { Reveal } from "../lib/motion";
import { Check } from "./icons";

const WITHOUT = [
  "Hand-write model call loops",
  "Wire up tool dispatch by hand",
  "Track conversation state yourself",
  "Bolt on streaming, retries, timeouts",
  "Parse and validate every output",
];

const WITH = [
  "Declare the agent and its tools",
  "Call agent.run() — or .stream()",
  "Get typed, validated results back",
];

export function Problem() {
  return (
    <section id="runtime" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-32">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
            // why vexylt
          </p>
          <h2 className="mt-5 text-h2">
            You don't need more <span className="strike strike-draw">model plumbing</span>.
            <br className="hidden sm:block" /> You need a{" "}
            <span className="hl hl-violet">runtime</span>.
          </h2>
          <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed text-ink-2">
            <p>
              Building an agent shouldn't mean hand-wiring model calls, tool
              execution, conversation state, streaming, validation and error
              handling. That's not a system — it's a pile of glue code that
              breaks the moment requirements change.
            </p>
            <p>
              Vexylt is the layer that runs it for you. You declare the agent
              and its tools; the runtime handles execution, retries, timeouts
              and cancellation — and emits a clean event stream you can build
              tracing, replay and evals on top of.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col justify-center gap-4">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-faint">
              Without a runtime
            </p>
            <ul className="mt-4 space-y-2.5">
              {WITHOUT.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[0.95rem]">
                  <span
                    className="grid h-4 w-4 flex-none place-items-center rounded-full border border-line-2 text-[0.7rem] text-faint"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span className="text-faint line-through decoration-line-2">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-violet/30 bg-violet-soft p-5">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-violet-ink">
              With Vexylt
            </p>
            <ul className="mt-4 space-y-2.5">
              {WITH.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[0.95rem]">
                  <span
                    className="grid h-4 w-4 flex-none place-items-center rounded-full bg-violet text-white"
                    aria-hidden="true"
                  >
                    <Check width={11} height={11} />
                  </span>
                  <span className="font-medium text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
