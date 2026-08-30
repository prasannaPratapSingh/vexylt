import { useEffect, useRef } from "react";

/**
 * A classic dot + trailing ring cursor, in the site palette: an ink dot that
 * tracks the pointer exactly, and a ring that trails with a light ease and
 * grows into a soft lime target (with a white core) over anything clickable.
 *
 * Fine-pointer devices only — touch keeps the native behavior. The trailing
 * motion is dropped under prefers-reduced-motion (the ring tracks 1:1).
 */
export function CustomCursor() {
  const blockRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!fine.matches) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const root = document.documentElement;
    const block = blockRef.current;
    const frame = frameRef.current;
    if (!block || !frame) return;

    // Native cursor stays until the first move, then we take over seamlessly.
    root.classList.add("cursor-out");

    let mx = -100;
    let my = -100; // pointer
    let fx = -100;
    let fy = -100; // frame (eased)
    let raf = 0;
    let started = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        started = true;
        fx = mx;
        fy = my;
        root.classList.add("cursor-ready");
      }
      place(block, mx, my);
      if (reduce) place(frame, mx, my);
      root.classList.remove("cursor-out");
    };

    const tick = () => {
      fx += (mx - fx) * 0.2;
      fy += (my - fy) * 0.2;
      place(frame, fx, fy);
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    const INTERACTIVE =
      'a, button, [role="tab"], input, textarea, select, label[for], summary, .lift';
    const onOver = (e: MouseEvent) => {
      const on = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
      frame.classList.toggle("is-active", on);
      block.classList.toggle("is-active", on);
    };
    const onDown = () => frame.classList.add("is-press");
    const onUp = () => frame.classList.remove("is-press");
    const onLeave = () => root.classList.add("cursor-out");
    const onEnter = () => root.classList.remove("cursor-out");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      root.classList.remove("cursor-ready", "cursor-out");
    };
  }, []);

  return (
    <>
      <div ref={frameRef} className="cur cur-ring" aria-hidden="true" />
      <div ref={blockRef} className="cur cur-dot" aria-hidden="true" />
    </>
  );
}
