"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";
import ScanOverlay from "../ui/ScanOverlay";
import PuzzleReveal from "../ui/PuzzleReveal";
import ViewportCurtain from "../ui/ViewportCurtain";

export default function Image01_Unindexed() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.75]);
  const meterLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const audienceOnOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);
  const audienceOffOpacity = useTransform(scrollYProgress, [0.12, 0.28], [1, 0]);

  const [hover, setHover] = useState(false);

  return (
    <section ref={ref} className="relative isolate min-h-[320vh]" id="img-1">
      {/* ✅ hides neighbours during this section focus */}
      <ViewportCurtain progress={scrollYProgress} />

      <StickyFrame>
        {/* LEFT: IMAGE */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <motion.div style={{ opacity: rawOpacity }} className="absolute inset-0">
            <Image
              src="/img1-raw.png"
              alt="Image 1 raw portrait – Unindexed Self"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <Caption
            label="Image 1 · Before the Upload"
            title="Unindexed Self"
            subtitle="The self before it is measured, labelled, or interpreted."
          />

          <ScanOverlay opacityMotion={overlayOpacity} hover={hover} />
          <PuzzleReveal progress={scrollYProgress} cols={6} rows={8} />

          <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-slate-950/50 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-slate-200/80">
            Audience{" "}
            <span className="relative inline-block w-[3.2rem] align-middle">
              <motion.span
                style={{ opacity: audienceOffOpacity }}
                className="absolute right-0 top-0 tabular-nums"
              >
                OFF
              </motion.span>
              <motion.span
                style={{ opacity: audienceOnOpacity }}
                className="absolute right-0 top-0 tabular-nums"
              >
                ON
              </motion.span>
              <span className="invisible">OFF</span>
            </span>
          </div>

          <motion.div
            style={{ opacity: audienceOnOpacity }}
            className="pointer-events-none absolute top-12 right-4 text-[0.6rem] tracking-[0.18em] text-slate-400/70"
          >
            awareness begins
          </motion.div>
        </div>

        {/* RIGHT: TEXT (✅ hook moved here) */}
        <div className="flex flex-col justify-center gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Stage 1 · Before the upload
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              Authenticity exists before the audience arrives.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              This is a moment without visibility — before validation, before comparison,
              before the image becomes something to manage.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Reading
            </p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">
              The image doesn’t change. The pressure does.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Nothing about the portrait itself is altered. What changes is the
              context in which it is seen.
              <br /><br />
              As the viewer scrolls, the image becomes scanned, framed, and
              interpreted — not by filters, but by expectations.
              <br /><br />
              This marks the first psychological shift: from simply being, to
              being observed.
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
              <span>Private self</span>
              <span>Assessed self</span>
            </div>
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}
