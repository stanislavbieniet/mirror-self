"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";
import ScanOverlay from "../ui/ScanOverlay";
import PuzzleAssemble from "../ui/PuzzleAssemble";
import ViewportCurtain from "../ui/ViewportCurtain";

export default function Image02_Mask() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const assembleOpacity = useTransform(scrollYProgress, [0.14, 0.55], [0, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.9, 0.55]);

  const overlayOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 0.85]);

  const meterLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const maskOnOpacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const maskOffOpacity = useTransform(scrollYProgress, [0.18, 0.32], [1, 0]);

  const [hover, setHover] = useState(false);

  return (
    <section ref={ref} className="relative isolate min-h-[260vh]" id="img-2">
      <ViewportCurtain progress={scrollYProgress} />

      <StickyFrame>
        {/* LEFT */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <motion.div style={{ opacity: rawOpacity }} className="absolute inset-0">
            <Image src="/mask.png" alt="Image 2 – Mask" fill className="object-cover" priority />
          </motion.div>

          <Caption
            label="Image 2 · The Mask"
            title="Constructed Calm"
            subtitle="A face assembled to feel safe."
          />

          <ScanOverlay opacityMotion={overlayOpacity} hover={hover} />

          <motion.div style={{ opacity: assembleOpacity }} className="absolute inset-0">
            <Image src="/mask2.png" alt="Mask assembled" fill className="object-cover" />
          </motion.div>

          <PuzzleAssemble
            progress={scrollYProgress}
            src="/mask2.png"
            cols={6}
            rows={8}
            inStart={0.14}
            inEnd={0.55}
            spread={160}
          />

          <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-slate-950/50 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-slate-200/80">
            Mask{" "}
            <span className="relative inline-block w-[3.2rem] align-middle">
              <motion.span style={{ opacity: maskOffOpacity }} className="absolute right-0 top-0 tabular-nums">
                OFF
              </motion.span>
              <motion.span style={{ opacity: maskOnOpacity }} className="absolute right-0 top-0 tabular-nums">
                ON
              </motion.span>
              <span className="invisible">OFF</span>
            </span>
          </div>

          <motion.div
            style={{ opacity: maskOnOpacity }}
            className="pointer-events-none absolute top-12 right-4 text-[0.6rem] tracking-[0.18em] text-slate-400/70"
          >
            protection mode
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Stage 2 · The mask forms
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              When I feel watched, I start building a face.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Not a fake identity — a protective one. The mask isn’t “lying”.
              It’s a survival strategy: control the image, reduce the anxiety.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Reading
            </p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">
              The mask is built from fear — and rewarded with relief.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              The “better” version isn’t about vanity. It’s about control.
              <br /><br />
              When authenticity feels risky, editing becomes emotional regulation:
              if I can manage the image, maybe I can manage the feeling.
              <br /><br />
              But the cost is subtle — I start trusting the mask more than my own mood.
            </p>
          </div>

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
              <span>Protected self</span>
            </div>
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}
