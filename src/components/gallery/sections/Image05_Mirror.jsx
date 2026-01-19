
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";
import ViewportCurtain from "../ui/ViewportCurtain";

export default function Image05_Mirror() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // overlay (self) заезжает сверху вниз и перекрывает ВСЕ фото
  const editY = useTransform(scrollYProgress, [0.18, 0.55], ["-100%", "0%"]);
  const editOpacity = useTransform(scrollYProgress, [0.18, 0.22], [0, 1]); // можно убрать, если хочешь без фейда

  // toggle text
  const rawOff = useTransform(scrollYProgress, [0.18, 0.28], [1, 0]);
  const editOn = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);

  return (
    <section ref={ref} className="relative isolate min-h-[260vh]" id="img-3">
      <ViewportCurtain progress={scrollYProgress} />

      <StickyFrame>
        {/* LEFT: IMAGE */}
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* BASE RAW (полное фото) */}
          <div className="absolute inset-0">
            <Image
              src="/mirror-raw.jpg"
              alt="Image 5 – Mirror (raw)"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* SELF OVERLAY (полное фото) */}
          <motion.div
            className="absolute inset-0"
            style={{ y: editY, opacity: editOpacity }}
          >
            <Image
              src="/mirror-self.jpg"
              alt="Image 5 – Mirror (edited)"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <Caption
            label="Image 5 · The Mirror"
            title="Borrowed Authenticity"
            subtitle="When the edit becomes the reflection."
          />

          {/* Toggle badge */}
          <div className="pointer-events-none absolute top-4 right-4 rounded-full bg-slate-950/50 px-3 py-1 text-[0.7rem] tracking-[0.18em] text-slate-200/80">
            Edit{" "}
            <span className="relative inline-block w-[3.2rem] align-middle">
              <motion.span
                style={{ opacity: rawOff }}
                className="absolute right-0 top-0 tabular-nums"
              >
                OFF
              </motion.span>
              <motion.span
                style={{ opacity: editOn }}
                className="absolute right-0 top-0 tabular-nums"
              >
                ON
              </motion.span>
              <span className="invisible">OFF</span>
            </span>
          </div>

          <motion.div
            style={{ opacity: editOn }}
            className="pointer-events-none absolute top-12 right-4 text-[0.6rem] tracking-[0.18em] text-slate-400/70"
          >
            performance mode
          </motion.div>

          <motion.div
            className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-slate-950/40 px-3 py-1 text-[0.65rem] text-slate-200/70 backdrop-blur"
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            scroll → edit replaces reality
          </motion.div>
        </div>

         {/* RIGHT: TEXT — НЕ ТРОГАЕМ */}
        <div className="flex flex-col justify-center gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Stage 5 · The edit
            </p>

            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              I’m not fixing the photo.
              <br />
              I’m fixing myself for the photo.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              The unedited version is real — but it rarely feels “enough”.
              <br /><br />
              So I erase the context. I polish the edges. I remove the human parts.
              And I call it authenticity.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              Reading
            </p>

            <h3 className="mt-3 text-xl font-semibold md:text-2xl">
              The sacrifice is invisible — until it becomes a habit.
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              To meet a standard that never existed, I trade time, calm, and self-trust.
              <br /><br />
              And the loop feeds itself: the more “perfect” I post, the more pressure I create —
              for everyone… including me.
            </p>
          </div>

          <div className="mt-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
              Cost meter
            </p>
            <div className="relative h-1 rounded-full bg-slate-700">
              <motion.div
                style={{ left: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                className="absolute -top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.35)]"
              />
            </div>
            <div className="mt-1 flex justify-between text-[0.65rem] text-slate-400">
              <span>Real</span>
              <span>Performing</span>
            </div>
          </div>
        </div>
      </StickyFrame>
    </section>
  );
}

