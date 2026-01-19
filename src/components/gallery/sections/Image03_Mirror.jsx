"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";
import MirrorShift from "../ui/MirrorShift";

export default function Image03_Mirror() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // "двойник" появляется и закрепляется
  const twinOn = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

  // лёгкое затемнение базы, когда появляется двойник (чтобы выглядело глубже)
  const baseDim = useTransform(scrollYProgress, [0.12, 0.35], [1, 0.72]);

  // meter
  const meterLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [hover, setHover] = useState(false);

  return (
    <section ref={ref} className="relative isolate min-h-[280vh]" id="img-3">
      {/* hook */}

      <StickyFrame>
        {/* LEFT: IMAGE */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Base photo (alone) */}
          <motion.div className="absolute inset-0" style={{ opacity: baseDim }}>
            <Image
              src="/bathroom.png"
              alt="Image 3 – Mirror (base)"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Twin reveal only in mirror area */}
          <MirrorShift progress={scrollYProgress} hover={hover} />

          <Caption
            label="Image 3 · The Mirror"
            title="Split Reflection"
            subtitle="When identity becomes a comparison, not a feeling."
          />

          {/* Toggle pill */}
          <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-slate-950/50 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-slate-200/80">
            Mirror{" "}
            <span className="relative inline-block w-[3.6rem] align-middle">
              <motion.span
                style={{ opacity: useTransform(twinOn, [0, 1], [1, 0]) }}
                className="absolute right-0 top-0 tabular-nums"
              >
                ONE
              </motion.span>
              <motion.span
                style={{ opacity: twinOn }}
                className="absolute right-0 top-0 tabular-nums"
              >
                TWO
              </motion.span>
              <span className="invisible">TWO</span>
            </span>
          </div>

          <motion.div
            style={{ opacity: twinOn }}
            className="pointer-events-none absolute top-12 right-4 text-[0.6rem] tracking-[0.18em] text-slate-400/70"
          >
            comparison mode
          </motion.div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="flex flex-col justify-center gap-8">
             <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
           Stage 3 · The mirror splits
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
          The mirror shows two versions — and the nervous system chooses one.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
        One is present. The other is “performable”. The more I chase the polished one,
        the more my mind learns that the real one isn’t safe.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Reading
            </p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">
              The “polished” self is not confidence — it’s a coping mechanism.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              The mirror is neutral. But my brain isn’t.
              <br /><br />
              When I’m anxious, I start negotiating with my reflection: “Be better, be safer, be liked.”
              <br /><br />
              And that’s the trap: the more I perform, the less I feel real — and the more fragile my mood becomes.
            </p>
          </div>

          {/* meter */}
          <div className="mt-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
              Identity meter
            </p>
            <div className="relative h-1 rounded-full bg-slate-700">
              <motion.div
                style={{ left: meterLeft }}
                className="absolute -top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.35)]"
              />
            </div>
            <div className="mt-1 flex justify-between text-[0.65rem] text-slate-400">
              <span>Felt self</span>
              <span>Performed self</span>
            </div>
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}
