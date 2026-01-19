"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";

export default function Image08_Through() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // position of the "through" beam
  const beamX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

  // raw visibility only inside beam
  const rawOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  // subtle grid fade
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[260vh]"
      id="img-8"
    >
      <StickyFrame>
        {/* LEFT: IMAGE */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-950 shadow-xl">

          {/* Edited base */}
          <Image
            src="/face-edited.png"
            alt="Edited portrait"
            fill
            className="object-cover"
            priority
          />

          {/* Raw layer */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: rawOpacity }}
          >
            <Image
              src="/face-raw.png"
              alt="Raw portrait"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* THROUGH beam */}
          <motion.div
            className="pointer-events-none absolute top-0 h-full w-[22%]"
            style={{ left: beamX }}
          >
            {/* light */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl" />

            {/* pixel dissolve */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:10px_10px] opacity-40 mix-blend-screen" />
          </motion.div>

          {/* grid overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ opacity: gridOpacity }}
          >
            <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
          </motion.div>

          <Caption
            label="Stage 8 · Through"
            title="No version selected"
            subtitle="The image didn’t change. The way of looking did."
          />
        </div>

        {/* RIGHT: TEXT */}
        <div className="flex flex-col justify-center gap-8 max-w-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Final
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              We didn’t come here to match.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Some of us were born softer.
              <br />
              Some sharper.
              <br />
              Some louder.
              <br />
              Some quieter.
              <br /><br />
              Difference was never the problem.
              <br />
              The lens was.
            </p>
          </div>

          <div className="text-sm font-medium text-slate-200">
            Learn to look <span className="text-sky-400">through</span> — not at.
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}
