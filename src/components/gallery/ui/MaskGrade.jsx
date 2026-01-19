"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";

export default function MaskGrade({ progress }) {
  const on = useTransform(progress, [0.18, 0.35], [0, 1]);
  const contrast = useTransform(on, [0, 1], [1, 1.18]);
  const sat = useTransform(on, [0, 1], [1, 0.82]);

  const filter = useMotionTemplate`contrast(${contrast}) saturate(${sat})`;

  return (
    <>
      {/* vignette */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: on,
          background:
            "radial-gradient(120% 120% at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* cold tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: on,
          background:
            "linear-gradient(180deg, rgba(56,189,248,0.10) 0%, rgba(99,102,241,0.10) 50%, rgba(15,23,42,0.25) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* film noise */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: on }}>
        <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:3px_3px]" />
      </motion.div>

      {/* filter */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: on, filter }}
      />
    </>
  );
}
