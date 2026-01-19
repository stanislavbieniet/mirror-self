"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useTransform,

} from "framer-motion";



export default function MirrorPeel(
  progress,
  baseSrc,
  polishedSrc,
  mirrorLeft = "6%",
  mirrorTop = "6%",
  mirrorWidth = "88%",
  mirrorHeight = "88%",
  mirrorRadius = "22px",
) {
  // timeline for peel
  const t0 = 0.18;
  const t1 = 0.52;

  // base dims a touch while peel happens
  const baseOpacity = useTransform(progress, [t0, t1], [1, 0.94]);
  const baseBlur = useTransform(progress, [t0, t1], [0, 1.5]);
  const baseFilter = useMotionTemplate`blur(${baseBlur}px)`;

  // reveal amount (0..1)
  const r = useTransform(progress, [t0, t1], [0, 1]);

  // polished look
  const polishedOpacity = useTransform(progress, [t0, t1], [0, 1]);
  const polishedBlur = useTransform(progress, [t0, t1], [10, 0]);
  const polishedFilter = useMotionTemplate`blur(${polishedBlur}px) saturate(1.05) contrast(1.06)`;

  // Wipe edge position in %
  const wipeY = useTransform(r, [0, 1], [0, 100]); // from top to bottom
  const wipeYPct = useMotionTemplate`${wipeY}%`;

  // Glass highlight: thin band that follows the wipe edge
  const highlightOpacity = useTransform(progress, [t0, (t0 + t1) / 2, t1], [0, 0.8, 0]);
  const highlightBlur = useTransform(progress, [t0, t1], [6, 2]);
  const highlightFilter = useMotionTemplate`blur(${highlightBlur}px)`;

  // subtle noise / scan (only during transition)
  const noiseOpacity = useTransform(progress, [t0, (t0 + t1) / 2, t1], [0, 0.18, 0]);

  return (
    <div className="absolute inset-0">
      {/* BASE */}
      <motion.div className="absolute inset-0" style={{ opacity: baseOpacity, filter: baseFilter }}>
        <Image src={baseSrc} alt="mirror base" fill className="object-cover" priority />
      </motion.div>

      {/* MIRROR MASK AREA */}
      <div
        className="absolute"
        style={{
          left: mirrorLeft,
          top: mirrorTop,
          width: mirrorWidth,
          height: mirrorHeight,
          borderRadius: mirrorRadius,
          overflow: "hidden",
        }}
      >
        {/* POLISHED (under the wipe, inside mirror only) */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: polishedOpacity, filter: polishedFilter }}
        >
          <Image src={polishedSrc} alt="mirror polished" fill className="object-cover" />
        </motion.div>

        {/* WIPE COVER (covers bottom part, so polished is only shown above edge) */}
        {/* We cover from wipeY..100% with a "frosted glass" version of the base */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: useMotionTemplate`polygon(0 ${wipeYPct}, 100% ${wipeYPct}, 100% 100%, 0 100%)`,
          }}
        >
          {/* frosted glass layer = base photo inside mirror */}
          <div className="absolute inset-0">
            <Image src={baseSrc} alt="mirror frosted base" fill className="object-cover" />
          </div>

          {/* frost tint + blur */}
          <div className="absolute inset-0 backdrop-blur-xl bg-slate-950/10" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_20%,rgba(255,255,255,0.08)_0%,rgba(2,6,23,0)_55%,rgba(2,6,23,0.25)_100%)]" />

          {/* subtle grid/noise texture */}
          <motion.div className="absolute inset-0" style={{ opacity: noiseOpacity }}>
            <div className="absolute inset-0 opacity-[0.7] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:3px_3px]" />
          </motion.div>
        </motion.div>

        {/* GLASS HIGHLIGHT band at the wipe edge */}
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-10"
          style={{
            top: useMotionTemplate`calc(${wipeYPct} - 18px)`,
            opacity: highlightOpacity,
            filter: highlightFilter,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 45%, rgba(56,189,248,0.12) 55%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />

        {/* inner rim to sell “glass” */}
        <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/10" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_40%,rgba(0,0,0,0.18))]" />
      </div>
    </div>
  );
}
