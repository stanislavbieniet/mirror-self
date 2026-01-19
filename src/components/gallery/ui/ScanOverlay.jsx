"use client";

import { motion } from "framer-motion";

export default function ScanOverlay({ opacityMotion, hover }) {
  return (
    <motion.div
      style={{ opacity: opacityMotion }}
      className="pointer-events-none absolute inset-0"
    >
      <motion.div
        initial={false}
        animate={{ opacity: hover ? 1 : 0.35 }}
        className="absolute inset-0"
      >
        {/* face box */}
        <div className="absolute left-[22%] top-[18%] h-[38%] w-[56%] rounded-xl border border-slate-100/40" />
        {/* eyes box */}
        <div className="absolute left-[30%] top-[27%] h-[10%] w-[40%] rounded-lg border border-slate-100/35" />
        {/* mouth box */}
        <div className="absolute left-[38%] top-[41%] h-[8%] w-[24%] rounded-lg border border-slate-100/30" />

        {/* corners */}
        <div className="absolute left-[21%] top-[17%] h-3 w-3 border-l border-t border-slate-100/60" />
        <div className="absolute right-[21%] top-[17%] h-3 w-3 border-r border-t border-slate-100/60" />
        <div className="absolute left-[21%] bottom-[43%] h-3 w-3 border-l border-b border-slate-100/60" />
        <div className="absolute right-[21%] bottom-[43%] h-3 w-3 border-r border-b border-slate-100/60" />

        {/* tiny status */}
        <div className="absolute bottom-4 right-4 rounded-md bg-slate-950/45 px-3 py-2 font-mono text-[0.7rem] text-slate-200/80">
          indexing identity...
        </div>
      </motion.div>
    </motion.div>
  );
}
