"use client";

import { motion, useTransform } from "framer-motion";

/**
 * PuzzleAssemble
 * - Разрезает src на tiles (background-position)
 * - Tiles "слетаются" в картинку по мере скролла
 */
export default function PuzzleAssemble({
  progress,
  src,
  cols = 6,
  rows = 8,
  inStart = 0.14,
  inEnd = 0.55,
  spread = 160,
}) {
  const total = cols * rows;
  const tiles = [];

  for (let i = 0; i < total; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;

    // немного рандомизируем направление, но детерминированно
    const dx = (c - (cols - 1) / 2) / ((cols - 1) / 2 || 1);
    const dy = (r - (rows - 1) / 2) / ((rows - 1) / 2 || 1);

    const x = useTransform(progress, [inStart, inEnd], [`${dx * spread}px`, "0px"]);
    const y = useTransform(progress, [inStart, inEnd], [`${dy * spread}px`, "0px"]);
    const rot = useTransform(progress, [inStart, inEnd], [`${(dx - dy) * 10}deg`, "0deg"]);
    const opacity = useTransform(progress, [inStart, inEnd], [0, 1]);
    const blur = useTransform(progress, [inStart, inEnd], ["blur(8px)", "blur(0px)"]);

    const w = 100 / cols;
    const h = 100 / rows;

    tiles.push(
      <motion.div
        key={i}
        className="absolute"
        style={{
          width: `${w}%`,
          height: `${h}%`,
          left: `${c * w}%`,
          top: `${r * h}%`,

          x,
          y,
          rotate: rot,
          opacity,
          filter: blur,

          backgroundImage: `url(${src})`,
          backgroundSize: `${cols * 100}% ${rows * 100}%`,
          backgroundPosition: `${(c * 100) / (cols - 1 || 1)}% ${(r * 100) / (rows - 1 || 1)}%`,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset",
        }}
      />
    );
  }

  return <div className="pointer-events-none absolute inset-0">{tiles}</div>;
}
