"use client";

import { motion, useTransform } from "framer-motion";

/**
 * ViewportCurtain
 * Fixed top/bottom blur + fade that hides neighbouring sections while a sticky section is active.
 * IMPORTANT: does NOT use overflow on ancestors (sticky stays alive).
 */
export default function ViewportCurtain({
  progress,
  inStart = 0.06,
  inEnd = 0.18,
  outStart = 0.82,
  outEnd = 0.94,
}) {
  // Active while section is in focus
  const active = useTransform(
    progress,
    [0, inStart, inEnd, outStart, outEnd, 1],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity: active }}
    >
      {/* TOP curtain */}
      <div className="absolute top-0 left-0 right-0 h-[18vh]">
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      {/* BOTTOM curtain */}
      <div className="absolute bottom-0 left-0 right-0 h-[22vh]">
        <div className="absolute inset-0 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      {/* subtle vignette (optional, makes focus feel "locked") */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,rgba(15,23,42,0)_0%,rgba(2,6,23,0.55)_70%,rgba(2,6,23,0.85)_100%)]" />
    </motion.div>
  );
}
