import type { ReactNode } from "react";
import { Reveal } from "../lib/motion";
import {
  RuntimeIcon,
  ToolsIcon,
  StreamIcon,
  SessionIcon,
  StructuredIcon,
  ShieldIcon,
  AgentsIcon,
} from "./icons";

type Tone = "violet" | "coral" | "lime";

const TILE: Record<Tone, string> = {
  violet: "bg-violet-soft text-violet",
  coral: "bg-coral-soft text-coral",
  lime: "bg-lime/40 text-ink",
};
const API: Record<Tone, string> = {
  violet: "text-violet",
  coral: "text-coral",
  lime: "text-lime-deep",
};

type Feature = {
  icon: (p: { width?: number; height?: number }) => ReactNode;
  title: string;
  body: string;
  api: string;
  tone: Tone;
  span: string;
};

const FEATURES: Feature[] = [
  {
    icon: ToolsIcon,
    title: "Tools",
    body: "Give agents typed functions to call — an API, a calculator, a shell. The runtime decides when to invoke them and feeds results back into the loop.",
    api: "tool({ name, execute })",
    tone: "coral",
    span: "lg:col-span-2",
  },
  {
    icon: StreamIcon,
    title: "Streaming",
    body: "Stream tokens as they're generated so your UI reacts in real time.",
    api: "agent.stream(input)",
    tone: "lime",
    span: "",
  },
  {
    icon: SessionIcon,
    title: "Sessions & context",
    body: "Keep conversation state across turns, no manual message threading.",
    api: "agent.session()",
    tone: "violet",
    span: "",
  },
  {
    icon: StructuredIcon,
    title: "Structured outputs",
    body: "Ask for typed data instead of a wall of text. Every output is validated against your schema before it reaches you.",
    api: "run(input, { output })",
    tone: "coral",
    span: "lg:col-span-2",
  },
  {
    icon: ShieldIcon,
    title: "Guardrails",
    body: "Wrap inputs, outputs and tools in validation and safety checks.",
    api: "guardrails: [ ... ]",
    tone: "lime",
    span: "",
  },
  {
    icon: AgentsIcon,
    title: "Multi-agent",
    body: "Compose specialists and hand work between them for bigger tasks.",
    api: "handoff(researcher)",
    tone: "violet",
    span: "",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6 lg:py-32">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
            // one SDK, the whole lifecycle
          </p>
          <h2 className="mt-5 max-w-2xl text-h2">
            Everything the agent loop needs,{" "}
            <span className="hl hl-lime">already handled</span>.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(190px,auto)]">
            {/* anchor: the core runtime */}
            <article className="group lift flex flex-col justify-between rounded-2xl border border-violet/25 bg-violet-soft/60 p-6 sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                  <RuntimeIcon width={22} height={22} />
                </span>
                <h3 className="mt-5 text-h3 text-ink">Core agent runtime</h3>
                <p className="mt-2 max-w-md leading-relaxed text-ink-2">
                  Define an agent with a model, instructions and tools. Call{" "}
                  <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-violet">
                    run()
                  </code>{" "}
                  and the runtime drives the model, dispatches tools and returns
                  the result — retries, timeouts and cancellation handled for you.
                </p>
              </div>
              <pre className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface px-4 py-3.5 font-mono text-[0.78rem] leading-6 text-ink-2">
                <span className="text-syntax-kw">const</span> agent ={" "}
                <span className="text-ink">Agent</span>.
                <span className="text-syntax-fn">builder</span>(){"\n"}
                {"  "}.<span className="text-syntax-fn">tool</span>(weatherTool)
                {"\n"}
                {"  "}.<span className="text-syntax-fn">build</span>();{"\n"}
                <span className="text-syntax-kw">await</span> agent.
                <span className="text-syntax-fn">run</span>(
                <span className="text-syntax-str">"…"</span>);
              </pre>
            </article>

            {FEATURES.map((f) => (
              <article
                key={f.title}
                className={`group lift flex flex-col rounded-2xl border border-line bg-surface p-6 ${f.span}`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 ${TILE[f.tone]}`}
                >
                  <f.icon width={20} height={20} />
                </span>
                <h3 className="mt-4 text-h3 text-ink">{f.title}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {f.body}
                </p>
                <code className={`mt-4 block font-mono text-[0.76rem] ${API[f.tone]}`}>
                  {f.api}
                </code>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
