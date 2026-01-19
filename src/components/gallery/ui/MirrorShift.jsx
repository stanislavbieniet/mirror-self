"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";
import Image from "next/image";

export default function MirrorShift(
  {progress,
  hover}
) {
  // как быстро появляется "двойник"
  const on = useTransform(progress, [0.12, 0.32], [0, 1]);

  // "скан" линиями — усиливаем на hover
  const scanOpacity = useTransform(progress, [0.18, 0.36], [0, 0.55]);
  const scanBoost = hover ? 1 : 0.65;

  // лёгкая дрожь/смещение отражения
  const shiftX = useTransform(progress, [0.12, 0.32, 0.6], ["0px", "6px", "0px"]);
  const shiftY = useTransform(progress, [0.12, 0.32, 0.6], ["0px", "-6px", "0px"]);
  const blur = useTransform(progress, [0.12, 0.32], ["blur(10px)", "blur(0px)"]);
  const sat = useTransform(progress, [0.12, 0.32], [0.85, 1.05]);
  const con = useTransform(progress, [0.12, 0.32], [0.95, 1.12]);

  const filter = useMotionTemplate`blur(0px) saturate(${sat}) contrast(${con})`;

  /**
   * IMPORTANT:
   * clip-path — примерная зона зеркала.
   * Подгони числа под твою фотку:
   * left/top/right/bottom в процентах.
   */
  const mirrorClip = "inset(8% 8% 20% 46% round 18px)";

  return (
    <>
      {/* Twin layer (only inside mirror area) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: on,
          x: shiftX,
          y: shiftY,
          filter,
          clipPath: mirrorClip ,
          WebkitClipPath: mirrorClip ,
        }}
      >
        <Image
          src="/bathroom2.png"
          alt="Mirror twin reveal"
          fill
          className="object-cover"
        />

        {/* subtle cold tint in mirror */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-indigo-500/8 to-slate-950/20 mix-blend-overlay" />

        {/* scan lines */}
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{ opacity: scanOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: scanBoost,
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 10px",
            }}
          />
        </motion.div>

        {/* soft reflection glare */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: useTransform(on, [0, 1], [0, 0.45]),
          }}
        >
          <div className="absolute -inset-10 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl" />
        </motion.div>
      </motion.div>

      {/* Edge blur to hide hard clip edges */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: on,
          filter: blur,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: mirrorClip,
            WebkitClipPath: mirrorClip,
            boxShadow: "0 0 0 2px rgba(255,255,255,0.05) inset",
          }}
        />
      </motion.div>
    </>
  );
}
