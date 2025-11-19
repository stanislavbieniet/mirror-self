"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const IdentityScrollSection = () => {
  // ─── SECTION 1: split-raw → split-personality ────────────────────────
  const firstRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: firstProgress } = useScroll({
    target: firstRef,
    // 0 = когда верх секции совпал с верхом экрана
    // 1 = когда низ секции совпал с низом экрана
    offset: ["start start", "end end"],
  });

  // 0–10%: blur raw, держим его полностью видимым
  const splitIntroBlur = useTransform(
    firstProgress,
    [0, 0.1],
    ["blur(12px)", "blur(0px)"]
  );

  // 0–20%: raw полностью виден
  // 20–80%: плавный фейд в ноль
  // 80–100%: 0
  const splitRawOpacity = useTransform(
    firstProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 0, 0]
  );

  // 0–20%: edited = 0
  // 20–80%: кроссфейд до 1
  // 80–100%: держим на 1
  const splitEditedOpacity = useTransform(
    firstProgress,
    [0.2, 0.8, 1],
    [0, 1, 1]
  );

  const meterX1 = useTransform(firstProgress, [0, 1], ["0%", "100%"]);

  // ─── SECTION 2: mirror-raw → mirror-self ─────────────────────────────
  const secondRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: secondProgress } = useScroll({
    target: secondRef,
    offset: ["start start", "end end"],
  });

  const mirrorIntroBlur = useTransform(
    secondProgress,
    [0, 0.1],
    ["blur(12px)", "blur(0px)"]
  );

  const mirrorRawOpacity = useTransform(
    secondProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 0, 0]
  );

  const mirrorEditedOpacity = useTransform(
    secondProgress,
    [0.2, 0.8, 1],
    [0, 1, 1]
  );

  const meterX2 = useTransform(secondProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="bg-slate-950 text-slate-50">
      {/* ───────────────────── SECTION 1 ───────────────────── */}
      <section ref={firstRef} className="relative min-h-[320vh]">
        {/* Hook-текст перед картинкой */}
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Hook 1 · Ideal self vs. real self
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
            Online we don&apos;t just show who we are – we show who we wish we
            were.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Research on online identity reconstruction shows that people
            selectively present an ideal version of themselves to gain approval,
            likes and social validation. The first image sequence visualises
            that move from a quiet, unedited reality to a brighter,
            carefully-constructed self.
          </p>
        </div>

        {/* Sticky-картинка + подписи */}
        <div className="sticky top-0 flex min-h-screen items-center justify-center px-6 lg:px-16">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* IMAGE SIDE */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
              {/* 1. split-raw */}
              <motion.div
                style={{ opacity: splitRawOpacity, filter: splitIntroBlur }}
                className="absolute inset-0"
              >
                <Image
                  src="/split-raw.jpg"
                  alt="Hastings beach – unedited self"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* 2. split-personality (edited) */}
              <motion.div
                style={{ opacity: splitEditedOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="/split-personality.jpg"
                  alt="Split Personality – edited version"
                  fill
                  className="object-cover"
                />
                {/* IG overlay только в финальной edited-версии */}
                <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 text-xs font-medium text-slate-100/85">
                  <span>♡ 1,248</span>
                  <span>💬 96</span>
                  <span>⤴︎ Share</span>
                </div>
              </motion.div>
            </div>

            {/* TEXT SIDE */}
            <div className="flex flex-col justify-center gap-8">
              <motion.div style={{ opacity: splitRawOpacity }}>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Phase 1 · Offline / Unedited
                </p>
                <h2 className="mt-3 text-xl font-semibold md:text-2xl">
                  The quiet version that never reaches the feed.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Here the image is almost documentary: flat colour, no obvious
                  polish. It stands for the everyday self that doesn&apos;t feel
                  special enough to post.
                </p>
              </motion.div>

              <motion.div style={{ opacity: splitEditedOpacity }}>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Phase 2 · Online / Edited
                </p>
                <h2 className="mt-3 text-xl font-semibold md:text-2xl">
                  The version I build for other people&apos;s eyes.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  As we scroll, the unedited beach slowly becomes{" "}
                  <span className="italic">Split Personality</span>: a staged,
                  doubled version of me. This is the &quot;hoped-for self&quot;
                  the research describes — a carefully constructed identity
                  designed to look effortlessly confident.
                </p>
              </motion.div>

              {/* Identity meter */}
              <div className="mt-2">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                  Identity slider
                </p>
                <div className="relative h-1 rounded-full bg-slate-700">
                  <motion.div
                    style={{ x: meterX1 }}
                    className="absolute -top-1 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_0_6px_rgba(56,189,248,0.35)]"
                  />
                </div>
                <div className="mt-1 flex justify-between text-[0.65rem] text-slate-400">
                  <span>Raw / offline self</span>
                  <span>Edited / split self</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── SECTION 2 ───────────────────── */}
      <section ref={secondRef} className="relative min-h-[320vh]">
        {/* Hook-текст перед второй картинкой */}
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Hook 2 · Mirror & self-presentation
          </p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            The mirror doesn&apos;t lie, but my edit does.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Scholars note that people often present a &quot;hoped-for possible
            self&quot; online – a slightly brighter, more confident version of
            who they are. The second sequence moves from a raw mirror portrait
            to the fully edited{" "}
            <span className="italic">Mirror Self</span>.
          </p>
        </div>

        {/* Sticky-картинка второй секции */}
        <div className="sticky top-0 flex min-h-screen items-center justify-center px-6 lg:px-16">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* IMAGE SIDE */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
              {/* 1. mirror-raw */}
              <motion.div
                style={{ opacity: mirrorRawOpacity, filter: mirrorIntroBlur }}
                className="absolute inset-0"
              >
                <Image
                  src="/mirror-raw.jpg"
                  alt="Mirror Self – raw source"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* 2. mirror-self edited */}
              <motion.div
                style={{ opacity: mirrorEditedOpacity }}
                className="absolute inset-0"
              >
                <Image
                  src="/mirror-self.JPG"
                  alt="Mirror Self – edited"
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-3 text-xs font-medium text-slate-100/85">
                  <span>♡ 1,248</span>
                  <span>💬 96</span>
                  <span>⤴︎ Share</span>
                </div>
              </motion.div>
            </div>

            {/* TEXT SIDE */}
            <div className="flex flex-col justify-center gap-8">
              <motion.div style={{ opacity: mirrorRawOpacity }}>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Phase 3 · Raw mirror
                </p>
                <h3 className="mt-3 text-xl font-semibold md:text-2xl">
                  The face I see before I start editing.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  The raw mirror image feels closer to how I actually am:
                  slightly tired, imperfect, a bit unsure. It represents the
                  backstage self that academic texts often call the &quot;real
                  self&quot;.
                </p>
              </motion.div>

              <motion.div style={{ opacity: mirrorEditedOpacity }}>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Phase 4 · Edited mirror
                </p>
                <h3 className="mt-3 text-xl font-semibold md:text-2xl">
                  The version that finally feels &quot;postable&quot;.
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  The final frame is the polished{" "}
                  <span className="italic">Mirror Self</span>: stronger light,
                  richer colour, and an Instagram-style overlay. It visualises
                  how my online self is not completely fake, but definitely
                  upgraded for public consumption.
                </p>
              </motion.div>

              {/* Identity meter 2 */}
              <div className="mt-2">
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                  Identity slider
                </p>
                <div className="relative h-1 rounded-full bg-slate-700">
                  <motion.div
                    style={{ x: meterX2 }}
                    className="absolute -top-1 h-3 w-3 rounded-full bg-fuchsia-400 shadow-[0_0_0_6px_rgba(244,114,182,0.35)]"
                  />
                </div>
                <div className="mt-1 flex justify-between text-[0.65rem] text-slate-400">
                  <span>Raw mirror self</span>
                  <span>Edited online self</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IdentityScrollSection;
