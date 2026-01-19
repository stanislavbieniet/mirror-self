"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";
import ViewportCurtain from "../ui/ViewportCurtain";

function AlignmentGuides({ opacity }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
    >
      {/* soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/35" />

      {/* rule-of-thirds grid */}
      <div className="absolute inset-0 opacity-[0.22]">
        <div className="absolute left-1/3 top-0 h-full w-px bg-white/20" />
        <div className="absolute left-2/3 top-0 h-full w-px bg-white/20" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-white/20" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-white/20" />
      </div>

      {/* center line */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-sky-300/30" />

      {/* “tools” text */}
      <div className="absolute left-4 bottom-4 rounded-xl border border-slate-800/70 bg-slate-950/55 px-3 py-2 backdrop-blur">
        <p className="text-[0.65rem] tracking-[0.18em] text-slate-300/90">
          AUTO ALIGN · STRAIGHTEN · FIX
        </p>
      </div>
    </motion.div>
  );
}

export default function Image07_PostureDebt() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // subtle “body drift” (the cost)
  const driftY = useTransform(scrollYProgress, [0.05, 0.9], ["0px", "14px"]);
  const driftSkew = useTransform(scrollYProgress, [0.05, 0.9], ["0deg", "-1.2deg"]);
  const driftScaleY = useTransform(scrollYProgress, [0.05, 0.9], [1, 0.985]);
  const driftOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.92]);

  // guides appear as “correction”
  const guidesOpacity = useTransform(scrollYProgress, [0.18, 0.34, 0.78], [0, 1, 0.75]);

  // meter
  const meterLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [hover, setHover] = useState(false);
  const hoverBoost = hover ? 1 : 0;

  // tiny hover “focus squeeze” (feels like editing attention)
  const hoverScale = useTransform(scrollYProgress, (v) => 1 + hoverBoost * 0.004 * Math.sin(v * Math.PI));

  return (
    <section ref={ref} className="relative isolate min-h-[320vh]" id="img-7">
      <ViewportCurtain progress={scrollYProgress} />

      <StickyFrame>
        {/* LEFT: IMAGE */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: driftOpacity,
              y: driftY,
              skewY: driftSkew,
              scaleY: driftScaleY,
              scale: hoverScale,
              transformOrigin: "50% 20%",
            }}
          >
            <Image
              src="/edit2.png"
              alt="Image 7 – Posture Debt"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <Caption
            label="Image 7 · The Body"
            title="Posture Debt"
            subtitle="When the body pays for visual alignment."
          />

          <AlignmentGuides opacity={guidesOpacity} />

          {/* Toggle pill */}
          <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-slate-950/50 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-slate-200/80">
            Align{" "}
            <span className="relative inline-block w-[3.6rem] align-middle">
              <motion.span
                style={{ opacity: useTransform(guidesOpacity, [0, 1], [1, 0]) }}
                className="absolute right-0 top-0 tabular-nums"
              >
                OFF
              </motion.span>
              <motion.span
                style={{ opacity: guidesOpacity }}
                className="absolute right-0 top-0 tabular-nums"
              >
                ON
              </motion.span>
              <span className="invisible">OFF</span>
            </span>
          </div>

          <motion.div
            style={{ opacity: guidesOpacity }}
            className="pointer-events-none absolute top-12 right-4 text-[0.6rem] tracking-[0.18em] text-slate-400/70"
          >
            correction tools
          </motion.div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="flex flex-col justify-center gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Stage 7 · The body
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              I ruin my posture to fix it later.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Hours at the desk. Head forward. Shoulders collapsed. Breath shallow.
              <br /><br />
              I tell myself it’s temporary.
              I’ll straighten it in post — align the proportions, clean the lines.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Reading
            </p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">
              The body absorbs what the image denies.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              I compress myself to chase symmetry.
              <br /><br />
              The correction doesn’t happen in the body — it happens on a screen.
              <br /><br />
              The photo looks aligned.
              The body keeps the record.
            </p>
          </div>

          {/* meter */}
          <div className="mt-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
              Body cost meter
            </p>
            <div className="relative h-1 rounded-full bg-slate-700">
              <motion.div
                style={{ left: meterLeft }}
                className="absolute -top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.35)]"
              />
            </div>
            <div className="mt-1 flex justify-between text-[0.65rem] text-slate-400">
              <span>Embodied</span>
              <span>Adjusted</span>
            </div>
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}
