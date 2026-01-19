"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * InterludeFocus
 * - Pinned (sticky) for a scroll duration (min-h)
 * - Shows "ghost" previews of previous/next photos (top/bottom)
 *   that blur + fly away as you scroll through the interlude
 *
 * Props:
 *  prevSrc, nextSrc (string) - image paths in /public
 *  kicker, title, body, stat, note - text
 */
export default function InterludeFocus({
  prevSrc = "/img1-raw.png",
  nextSrc = "/mask2.png",
  kicker = "INTERLUDE",
  title = "Authenticity isn’t a personality trait. It’s a nervous system state.",
  body = "When the world feels unsafe, the self becomes a strategy. Sometimes what looks like confidence is just protection.",
  stat = "1 in 4 people will experience a mental health problem each year (UK).",
  note = "Replace with your verified stat + source later.",
  height = "240vh", // how long it "stops" (more = longer focus)
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Focus timing inside this pinned chapter
  // 0..1 across entire section height
  const focusOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const focusScale = useTransform(scrollYProgress, [0.15, 0.35], [0.98, 1]);

  // TOP ghost (previous image) flies UP and fades
  const topY = useTransform(scrollYProgress, [0.0, 0.35], ["0px", "-140px"]);
  const topOpacity = useTransform(scrollYProgress, [0.0, 0.25, 0.45], [1, 0.55, 0]);
  const topBlur = useTransform(scrollYProgress, [0.0, 0.45], ["blur(6px)", "blur(22px)"]);
  const topRot = useTransform(scrollYProgress, [0.0, 0.45], ["0deg", "-6deg"]);

  // BOTTOM ghost (next image) flies DOWN and fades
  const botY = useTransform(scrollYProgress, [0.0, 0.35], ["0px", "140px"]);
  const botOpacity = useTransform(scrollYProgress, [0.0, 0.25, 0.45], [1, 0.55, 0]);
  const botBlur = useTransform(scrollYProgress, [0.0, 0.45], ["blur(6px)", "blur(22px)"]);
  const botRot = useTransform(scrollYProgress, [0.0, 0.45], ["0deg", "6deg"]);

  // Background glow motion
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.8], [0, 1, 0.2]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["18px", "-18px"]);

  return (
    <section
      ref={ref}
      className="relative isolate"
      style={{ minHeight: height }}
      id="interlude-focus"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-slate-950">
        {/* Hard backdrop (so nothing real from other sections leaks) */}
        <div className="absolute inset-0 bg-slate-950" />

        {/* Animated glow + grid */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ opacity: glowOpacity }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ y: glowY }}
          >
            <div className="h-full w-full rounded-full bg-gradient-to-br from-sky-500/18 via-indigo-500/14 to-fuchsia-500/10" />
          </motion.div>

          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/55 to-slate-950" />
        </motion.div>

        {/* TOP ghost preview (previous photo) */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[-8%] w-[min(820px,92vw)] -translate-x-1/2"
          style={{
            y: topY,
            opacity: topOpacity,
            rotate: topRot,
            filter: topBlur,
          }}
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 shadow-2xl">
            <Image src={prevSrc} alt="" fill className="object-cover opacity-[0.65]" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-transparent" />
          </div>
        </motion.div>

        {/* BOTTOM ghost preview (next photo) */}
        <motion.div
          className="pointer-events-none absolute left-1/2 bottom-[-8%] w-[min(820px,92vw)] -translate-x-1/2"
          style={{
            y: botY,
            opacity: botOpacity,
            rotate: botRot,
            filter: botBlur,
          }}
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/40 shadow-2xl">
            <Image src={nextSrc} alt="" fill className="object-cover opacity-[0.65]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent" />
          </div>
        </motion.div>

        {/* Center content (the focus) */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.div
            className="w-full max-w-5xl"
            style={{ opacity: focusOpacity, scale: focusScale }}
          >
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/55 p-10 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                {kicker}
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-slate-100 md:text-3xl">
                {title}
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">
                {body}
              </p>

              <div className="mt-8 flex items-start gap-4">
                <motion.span
                  className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-sky-400"
                  animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div>
                  <p className="text-sm font-medium text-slate-100">{stat}</p>
                  <p className="mt-1 text-[0.75rem] tracking-[0.12em] text-slate-500">
                    {note}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Edge fades (so nothing looks harsh) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>
    </section>
  );
}
