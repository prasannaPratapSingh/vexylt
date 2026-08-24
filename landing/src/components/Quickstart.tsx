import { useState } from "react";
import { Reveal } from "../lib/motion";

type Snippet = { id: string; label: string; lines: CodeLine[] };
type Tok = { t: string; c?: string };
type CodeLine = Tok[];

// tiny hand-tokenized code so highlighting stays dependency-free
const k = (t: string): Tok => ({ t, c: "text-syntax-kw" }); // keyword
const s = (t: string): Tok => ({ t, c: "text-syntax-str" }); // string
const f = (t: string): Tok => ({ t, c: "text-syntax-fn" }); // fn / call
const p = (t: string): Tok => ({ t, c: "text-ink" }); // plain ident
const d = (t: string): Tok => ({ t, c: "text-syntax-com" }); // comment
const x = (t: string): Tok => ({ t, c: "text-muted" }); // punctuation

const SNIPPETS: Snippet[] = [
  {
    id: "agent",
    label: "agent.ts",
    lines: [
      [k("import"), x(" { "), p("Agent"), x(" } "), k("from"), x(" "), s('"@vexylt/agent"'), x(";")],
      [],
      [k("const"), x(" "), p("agent"), x(" = "), p("Agent"), x("."), f("builder"), x("()")],
      [x("  ."), f("setInstructions"), x("("), s('"You are a helpful research assistant."'), x(")")],
      [x("  ."), f("tool"), x("("), p("weatherTool"), x(")")],
      [x("  ."), f("build"), x("();")],
      [],
      [k("const"), x(" "), p("res"), x(" = "), k("await"), x(" "), p("agent"), x("."), f("run"), x("("), s('"Weather in Kanpur?"'), x(");")],
      [p("console"), x("."), f("log"), x("("), p("res"), x("."), p("output"), x(");")],
    ],
  },
  {
    id: "tool",
    label: "tool.ts",
    lines: [
      [k("import"), x(" { "), p("tool"), x(" } "), k("from"), x(" "), s('"@vexylt/agent"'), x(";")],
      [],
      [k("const"), x(" "), p("weatherTool"), x(" = "), f("tool"), x("({")],
      [x("  "), p("name"), x(": "), s('"fetchWeather"'), x(",")],
      [x("  "), p("description"), x(": "), s('"Get current weather"'), x(",")],
      [x("  "), p("parameters"), x(": { "), p("city"), x(": "), s('"string"'), x(" },")],
      [x("  "), k("async"), x(" "), f("execute"), x("({ "), p("city"), x(" }) {")],
      [x("    "), k("return"), x(" "), k("await"), x(" "), f("getWeather"), x("("), p("city"), x(");")],
      [x("  },")],
      [x("});")],
    ],
  },
  {
    id: "stream",
    label: "stream.ts",
    lines: [
      [d("// tokens arrive as they're generated")],
      [k("const"), x(" "), p("stream"), x(" = "), k("await"), x(" "), p("agent"), x("."), f("stream"), x("("), s('"Explain agents."'), x(");")],
      [],
      [k("for"), x(" "), k("await"), x(" ("), k("const"), x(" "), p("chunk"), x(" "), k("of"), x(" "), p("stream"), x(") {")],
      [x("  "), p("process"), x("."), p("stdout"), x("."), f("write"), x("("), p("chunk"), x(");")],
      [x("}")],
    ],
  },
];

export function Quickstart() {
  const [active, setActive] = useState(SNIPPETS[0].id);
  const snippet = SNIPPETS.find((sn) => sn.id === active) ?? SNIPPETS[0];

  return (
    <section id="quickstart" className="scroll-mt-24 border-b border-line bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-24 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:py-32">
        <Reveal>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-violet">
            // quickstart
          </p>
          <h2 className="mt-5 text-h2">
            The common case is <span className="hl hl-coral">a few lines</span>.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-2">
            Install the package, declare an agent, give it a tool, and run it.
            The same object streams, holds a session, and returns structured
            output when you ask for it — no new framework to learn each time.
          </p>

          <ol className="mt-8 space-y-5">
            {[
              ["Install", "npm i @vexylt/agent"],
              ["Set your key", "OPENAI_API_KEY=sk-…"],
              ["Run the agent", "npx tsx agent.ts"],
            ].map(([label, cmd], i) => (
              <li key={label} className="flex items-start gap-4">
                <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-lg bg-violet-soft font-mono text-[0.78rem] font-medium text-violet">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{label}</p>
                  <code className="font-mono text-[0.8rem] text-muted">{cmd}</code>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_28px_60px_-36px_rgba(23,24,28,0.45)]">
            {/* tabs */}
            <div
              className="flex items-center gap-1 border-b border-line bg-panel px-2"
              role="tablist"
              aria-label="Code examples"
            >
              {SNIPPETS.map((sn) => {
                const on = sn.id === active;
                return (
                  <button
                    key={sn.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(sn.id)}
                    className={`relative px-3.5 py-2.5 font-mono text-[0.78rem] transition-colors ${
                      on ? "text-violet" : "text-faint hover:text-ink"
                    }`}
                  >
                    {sn.label}
                    {on && (
                      <span className="absolute inset-x-2.5 -bottom-px h-0.5 rounded-full bg-violet" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* code */}
            <pre className="overflow-x-auto bg-surface px-5 py-5 font-mono text-[0.82rem] leading-[1.75]">
              <code>
                {snippet.lines.map((line, li) => (
                  <div key={li} className="table-row">
                    <span className="table-cell select-none pr-5 text-right text-faint/60">
                      {li + 1}
                    </span>
                    <span className="table-cell">
                      {line.length === 0
                        ? " "
                        : line.map((tok, ti) => (
                            <span key={ti} className={tok.c}>
                              {tok.t}
                            </span>
                          ))}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
