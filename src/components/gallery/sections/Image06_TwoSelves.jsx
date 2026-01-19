"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";
import ViewportCurtain from "../ui/ViewportCurtain";

export default function Image06_TwoSelves() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

    const seam = useTransform(scrollYProgress, [0.18, 0.78], ["12%", "88%"]);


  const clipPath = useTransform(seam, (x) =>
  `polygon(0 0, ${x} 0, ${x} 100%, 0 100%)`
);

  // Twin reveal timing
  const twinOn = useTransform(scrollYProgress, [0.14, 0.34], [0, 1]);
  const baseDim = useTransform(scrollYProgress, [0.14, 0.34], [1, 0.78]);

  // Reveal seam moves left -> right

  // Meter
  const meterLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [hover, setHover] = useState(false);

  // Hover gives a tiny “glitch” feel (subtle)
  const twinBlur = hover ? "blur(0px)" : "blur(0.4px)";

  return (
    <section ref={ref} className="relative isolate min-h-[320vh]" id="img-6">
      <ViewportCurtain progress={scrollYProgress} />

      <StickyFrame>
        {/* LEFT: IMAGE */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Base (raw) */}
          <motion.div className="absolute inset-0" style={{ opacity: baseDim }}>
            <Image
              src="/twosides_raw.jpg"
              alt="Image 6 raw – Two Selves"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Twin (edited) revealed via clip-path */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: twinOn,
              filter: twinBlur,
              clipPath: clipPath,
            }}
          >
            <Image
              src="/twosides_edited.jpg"
              alt="Image 6 edited – Two Selves (overlay)"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Seam highlight */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-white/20"
            style={{
              left: seam,
              opacity: twinOn,
              boxShadow: "0 0 0 10px rgba(15,23,42,0.18)",
            }}
          />

          <Caption
            label="Image 6 · Split Self"
            title="Two Selves"
            subtitle="When identity becomes a switch, not a feeling."
          />

          {/* Toggle pill */}
          <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-slate-950/50 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-slate-200/80">
            Self{" "}
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
            switching mode
          </motion.div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="flex flex-col justify-center gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Stage 6 · Split self
            </p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              I don’t become “better”. I become two.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              One version is lived. The other is optimised.
              <br /><br />
              The more I rely on the edited one, the more the real one starts to feel
              like a risk — something to hide, not inhabit.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Reading
            </p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">
              The split is subtle — until it becomes automatic.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              At first it’s just “a better angle”.
              <br /><br />
              Then it becomes a reflex: adjust the face, adjust the mood, adjust the story.
              <br /><br />
              And the cost is quiet: I stop asking who I am — and start asking what works.
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
              <span>Lived self</span>
              <span>Optimised self</span>
            </div>
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}
