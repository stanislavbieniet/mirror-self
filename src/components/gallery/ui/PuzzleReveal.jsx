"use client";

import { motion, useTransform } from "framer-motion";

/**
 * PuzzleReveal (MASK VERSION)
 * - Does NOT re-render the image per tile (avoids aspect ratio distortion)
 * - Instead overlays tiles that fade/move away, revealing the image underneath
 */
export default function PuzzleReveal({
  progress,
  cols = 6,
  rows = 8,
  tileColor = "rgba(2, 6, 23, 0.55)", // slate-950 with opacity
}) {
  const tiles = [];
  const total = cols * rows;

  for (let i = 0; i < total; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;

    const start = (i / total) * 0.35;
    const end = start + 0.55;

    const tileOpacity = useTransform(progress, [start, end], [1, 0]);
    const x = useTransform(progress, [start, end], ["0px", `${(c - cols / 2) * 16}px`]);
    const y = useTransform(progress, [start, end], ["0px", `${(r - rows / 2) * 16}px`]);
    const rotate = useTransform(progress, [start, end], ["0deg", `${(c - r) * 1.8}deg`]);
    const blur = useTransform(progress, [start, end], ["blur(0px)", "blur(2px)"]);

    tiles.push(
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: `${100 / cols}%`,
          height: `${100 / rows}%`,
          left: `${(c * 100) / cols}%`,
          top: `${(r * 100) / rows}%`,
          opacity: tileOpacity,
          x,
          y,
          rotate,
          filter: blur,
          backgroundColor: tileColor,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset",
        }}
      />
    );
  }

  return <div className="pointer-events-none absolute inset-0">{tiles}</div>;
}
