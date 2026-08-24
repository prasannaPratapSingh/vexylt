const STACK = ["OpenAI", "TypeScript", "Node.js", "Streaming / SSE", "Structured I/O"];

export function TechStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-6 sm:px-6 md:flex-row md:justify-between">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-faint">
          Speaks the stack you already use
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {STACK.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-mono text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
