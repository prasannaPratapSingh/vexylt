import { useState } from "react";
import { AgentTerminal } from "./AgentTerminal";
import { Annotation } from "./Annotation";
import { ArrowRight, Check } from "./icons";

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-2 font-mono text-[0.82rem] text-ink-2 transition-colors hover:border-line-2"
      aria-label={`Copy install command: ${text}`}
    >
      <span>
        <span className="text-violet">$</span> {text}
      </span>
      <span className="flex items-center gap-1 text-faint transition-colors group-hover:text-violet">
        {copied ? (
          <>
            <Check width={13} height={13} className="text-ok" />
            <span className="text-ok">copied</span>
          </>
        ) : (
          "copy"
        )}
      </span>
    </button>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-8 lg:pb-28">
        {/* left — the pitch */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-2 pr-3 font-mono text-[0.72rem] text-muted">
            <span className="h-2 w-2 rounded-full bg-lime-deep" aria-hidden="true" />
            v0.0.1 · now in early access
          </span>

          <h1 className="mt-6 text-display">
            Infrastructure
            <br className="hidden sm:block" /> for AI{" "}
            <span className="hl hl-lime">agents</span>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2">
            Vexylt is a developer-first TypeScript SDK for the whole agent
            lifecycle — tools, streaming, sessions, structured outputs and
            guardrails, in one clean API. You write what the agent does; Vexylt
            runs it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#waitlist"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-violet px-5 py-3 font-mono text-sm font-medium text-white transition-all hover:bg-violet-ink hover:shadow-[0_16px_30px_-14px_rgba(90,63,240,0.8)]"
            >
              Join the waitlist
              <ArrowRight
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#quickstart"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-2 bg-surface px-5 py-3 font-mono text-sm text-ink transition-colors hover:border-ink"
            >
              Read the quickstart
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <CopyLine text="npm i @vexylt/agent" />
            <span className="font-mono text-[0.72rem] text-faint">
              TypeScript · ESM · OpenAI
            </span>
          </div>
        </div>

        {/* right — the signature run */}
        <div className="relative lg:pl-2">
          <Annotation
            dir="down-left"
            tone="violet"
            className="absolute -top-8 right-2 z-10 hidden text-right lg:block"
          >
            // Vexylt drives the loop —
            <br />
            tools, retries &amp; streaming
          </Annotation>
          <AgentTerminal />
        </div>
      </div>
    </section>
  );
}
