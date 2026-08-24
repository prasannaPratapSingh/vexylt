import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../lib/motion";
import { Mark } from "./icons";

/* ---- the scripted run (mirrors the SDK's real weather + CLI tools) ---- */
type Row =
  | { kind: "cmd"; text: string }
  | { kind: "meta"; text: string }
  | { kind: "agent"; value: string }
  | { kind: "kv"; label: string; value: string }
  | { kind: "tool"; call: string; ms: string }
  | { kind: "ret"; text: string }
  | { kind: "stream"; text: string }
  | { kind: "cont"; text: string }
  | { kind: "done"; text: string }
  | { kind: "gap" };

const SCRIPT: Row[] = [
  { kind: "cmd", text: "npx tsx agent.ts" },
  { kind: "meta", text: "@vexylt/agent v0.0.1 · node v22" },
  { kind: "gap" },
  { kind: "agent", value: "WeatherAgent · gpt-5" },
  { kind: "kv", label: "instructions", value: '"You are an expert weather agent."' },
  { kind: "gap" },
  { kind: "tool", call: 'fetchWeather("Kanpur")', ms: "41ms" },
  { kind: "ret", text: "Clear +21°C" },
  { kind: "tool", call: 'executeCLI("touch hello.html")', ms: "9ms" },
  { kind: "ret", text: "wrote hello.html" },
  { kind: "gap" },
  { kind: "stream", text: "Kanpur is clear, 21°C. Created hello.html" },
  { kind: "cont", text: 'with "hello Vexylt" inside.' },
  { kind: "gap" },
  { kind: "done", text: "done · 2 tools · 3 steps · 1.24s" },
];

const chip =
  "inline-block rounded px-1.5 py-px font-mono text-[0.68rem] font-medium uppercase tracking-wide align-middle";

function RowView({ row }: { row: Row }) {
  switch (row.kind) {
    case "cmd":
      return (
        <div>
          <span className="text-violet">$</span>{" "}
          <span className="text-ink">{row.text}</span>
        </div>
      );
    case "meta":
      return <div className="text-faint">{row.text}</div>;
    case "agent":
      return (
        <div className="flex items-center gap-2">
          <span className={`${chip} bg-violet-soft text-violet-ink`}>agent</span>
          <span className="text-ink">{row.value}</span>
        </div>
      );
    case "kv":
      return (
        <div className="pl-3">
          <span className="text-faint">{row.label} </span>
          <span className="text-ink-2">{row.value}</span>
        </div>
      );
    case "tool":
      return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={`${chip} bg-panel text-ink-2 ring-1 ring-line`}>
            tool
          </span>
          <span className="text-ink">{row.call}</span>
          <span className="text-ok">✓</span>
          <span className="text-faint">{row.ms}</span>
        </div>
      );
    case "ret":
      return (
        <div className="pl-3 text-muted">
          <span className="text-ok">↳ </span>
          {row.text}
        </div>
      );
    case "stream":
      return (
        <div className="flex items-start gap-2">
          <span className={`${chip} bg-coral-soft text-coral mt-px`}>stream</span>
          <span className="text-ink">{row.text}</span>
        </div>
      );
    case "cont":
      return <div className="pl-[3.7rem] text-ink">{row.text}</div>;
    case "done":
      return (
        <div className="font-medium text-ok">
          <span>✓ </span>
          {row.text}
        </div>
      );
    case "gap":
      return <div className="h-2" aria-hidden="true" />;
  }
}

export function AgentTerminal() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced ? SCRIPT.length : 0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) {
      setVisible(SCRIPT.length);
      return;
    }
    setVisible(0);
    let elapsed = 260;
    SCRIPT.forEach((row, i) => {
      const step = row.kind === "tool" ? 320 : row.kind === "gap" ? 90 : 165;
      elapsed += step;
      const id = window.setTimeout(() => setVisible(i + 1), elapsed);
      timers.current.push(id);
    });
    const snapshot = timers.current;
    return () => snapshot.forEach(clearTimeout);
  }, [reduced]);

  const running = visible < SCRIPT.length;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_28px_60px_-32px_rgba(23,24,28,0.4)]"
      role="img"
      aria-label="A Vexylt agent run: the WeatherAgent calls the fetchWeather and executeCLI tools, then streams a final answer and completes in 1.24 seconds."
    >
      {/* header */}
      <div className="flex items-center gap-2 border-b border-line bg-panel/60 px-4 py-3">
        <Mark className="h-4 w-4 text-violet" />
        <span className="font-mono text-[0.74rem] text-muted">agent.ts</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 font-mono text-[0.68rem] text-ok ring-1 ring-line">
          <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse-dot" />
          {running ? "running" : "done"}
        </span>
      </div>

      {/* body */}
      <div
        aria-hidden="true"
        className="min-h-[19rem] px-4 py-4 font-mono text-[0.82rem] leading-6 sm:text-[0.86rem]"
      >
        {SCRIPT.slice(0, visible).map((row, i) => (
          <div key={i} className={reduced ? "" : "term-line"}>
            <RowView row={row} />
          </div>
        ))}
        {running && (
          <span className="inline-block h-4 w-2 translate-y-0.5 bg-violet animate-blink" />
        )}
      </div>
    </div>
  );
}
