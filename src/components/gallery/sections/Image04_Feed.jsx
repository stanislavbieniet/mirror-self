"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import StickyFrame from "../ui/StickyFrame";
import Caption from "../ui/Caption";

export default function Image04_Feed() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // zoom into phone (your base photo)
  const scale = useTransform(scrollYProgress, [0, 0.45], [1, 1.35]);
  const imageDim = useTransform(scrollYProgress, [0.4, 1], [1, 0.72]);

  // overlay appears
  const feedOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);

  // how much the feed moves up (fake "scroll")
  const feedY = useTransform(scrollYProgress, [0.52, 1], ["0%", "-62%"]);

  const posts = useMemo(
    () => [
      {
        id: "p1",
        user: "perfect.morning",
        location: "5:12 AM · Routine",
        avatar: "/avatars/a1.png", // you can add later (or keep placeholder)
        image: "/feed/perfectbody.jpg",
        likes: "1,284,332",
        caption:
          "Discipline is the new personality. No excuses. #5amclub #grind",
      },
      {
        id: "p2",
        user: "body.standard",
        location: "Day 3 · Cut",
        avatar: "/avatars/a2.png",
        image: "/feed/f2.png",
        likes: "892,110",
        caption:
          "If you don’t look like this, are you even trying? #summerbody",
      },
      {
        id: "p3",
        user: "success.template",
        location: "Founder · 21",
        avatar: "/avatars/a3.png",
        image: "/feed/f3.png",
        likes: "2,041,908",
        caption:
          "Quit your job. Buy freedom. Repeat. #hustle #entrepreneur",
      },
      {
        id: "p4",
        user: "always.happy",
        location: "No Bad Days",
        avatar: "/avatars/a4.png",
        image: "/feed/f4.png",
        likes: "664,501",
        caption:
          "Positive vibes only. If you’re sad, you’re doing it wrong.",
      },
    ],
    []
  );

  return (
    <section ref={ref} className="relative min-h-[300vh]" id="img-4">
      <StickyFrame>
        {/* LEFT: BASE PHOTO + OVERLAY PHONE */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
          <motion.div
            className="absolute inset-0 origin-center"
            style={{ scale, opacity: imageDim }}
          >
            <Image
              src="/scrolling2.png"
              alt="Image 4 – Scrolling"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <Caption
            label="Image 4 · The Feed"
            title="Borrowed Standards"
            subtitle="When comparison replaces perception."
          />

          {/* PHONE OVERLAY */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ opacity: feedOpacity }}
          >
            <PhoneFrame>
              {/* fake scroll container */}
              <motion.div
                className="px-3 pb-10 pt-2"
                style={{ y: feedY }}
              >
                {/* Stories row */}
                <StoriesRow />

                {/* Posts */}
                <div className="mt-3 space-y-4">
                  {posts.map((p) => (
                    <InstaPost key={p.id} post={p} />
                  ))}
                </div>

                {/* a bit of extra tail so scroll feels natural */}
                <div className="h-24" />
              </motion.div>
            </PhoneFrame>
          </motion.div>
        </div>

        {/* RIGHT: TEXT */}
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Stage 4 · Comparison
          </p>

          <h2 className="text-2xl font-semibold md:text-3xl">
            I wasn’t looking for a reason to hate myself.
            <br />
            I was just scrolling.
          </h2>

          <p className="text-sm leading-relaxed text-slate-300 max-w-xl">
            The feed turns edited lives into a baseline.
            <br />
            And suddenly, normal starts to feel like failure.
            <br /><br />
            Not because I changed —
            <br />
            but because the standard did.
          </p>
        </div>
      </StickyFrame>
    </section>
  );
}

/* -------------------- UI pieces -------------------- */

function PhoneFrame({ children }) {
  return (
    <div className="relative h-[80%] w-[48%] max-w-[360px] rounded-[2.2rem] border border-slate-800/80 bg-slate-950/75 shadow-2xl backdrop-blur overflow-hidden">
      {/* top notch / speaker */}
      <div className="pointer-events-none absolute left-1/2 top-2 h-6 w-32 -translate-x-1/2 rounded-full bg-slate-900/70 border border-slate-800/60" />

      {/* status bar */}
      <div className="flex items-center justify-between px-5 pt-4 text-[0.7rem] text-slate-300/80">
        <span className="tabular-nums">22:18</span>
        <div className="flex items-center gap-2">
          <span className="opacity-80">5G</span>
          <span className="opacity-80">▮▮▮</span>
          <span className="opacity-80">92%</span>
        </div>
      </div>

      {/* IG-like header */}
      <div className="mt-2 flex items-center justify-between px-5 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            for you
          </span>
          <span className="text-[0.7rem] text-slate-400">▼</span>
        </div>
        <div className="flex items-center gap-3 text-slate-200/80">
          <span className="text-sm">＋</span>
          <span className="text-sm">♡</span>
          <span className="text-sm">✉︎</span>
        </div>
      </div>

      {/* separator */}
      <div className="h-px bg-slate-800/70" />

      {/* content */}
      <div className="relative h-full">
        {children}

        {/* bottom nav */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-6 pb-4 text-slate-200/70">
          <span>⌂</span>
          <span>⌕</span>
          <span>▢</span>
          <span>▶︎</span>
          <span>◯</span>
        </div>
      </div>
    </div>
  );
}

function StoriesRow() {
  const items = ["you", "fit", "glow", "rich", "perfect", "trend"];
  return (
    <div className="flex gap-3 overflow-hidden px-1 pt-2">
      {items.map((t) => (
        <div key={t} className="flex flex-col items-center gap-1">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500/40 via-indigo-500/35 to-fuchsia-500/30 p-[2px]">
            <div className="h-full w-full rounded-full bg-slate-900/70 border border-slate-800/60" />
          </div>
          <span className="text-[0.6rem] text-slate-400">{t}</span>
        </div>
      ))}
    </div>
  );
}

function InstaPost({ post }) {
  return (
    <div className="rounded-2xl border border-slate-800/70 bg-slate-950/35 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-800/60 border border-slate-700/60 overflow-hidden relative">
            {/* optional avatar (safe even if you don't have file yet) */}
            <Image
              src={post.avatar}
              alt=""
              fill
              className="object-cover opacity-90"
            />
          </div>
          <div className="leading-tight">
            <p className="text-[0.78rem] font-semibold text-slate-100">
              {post.user}
            </p>
            <p className="text-[0.65rem] text-slate-400">{post.location}</p>
          </div>
        </div>
        <span className="text-slate-300/70">⋯</span>
      </div>

      {/* image */}
      <div className="relative aspect-[4/5] bg-slate-900">
        <Image src={post.image} alt="" fill className="object-cover" />
      </div>

      {/* actions */}
      <div className="flex items-center justify-between px-3 pt-3 text-slate-200/75">
        <div className="flex items-center gap-3">
          <span>♡</span>
          <span>💬</span>
          <span>↗</span>
        </div>
        <span>⟡</span>
      </div>

      {/* meta */}
      <div className="px-3 pb-3 pt-2">
        <p className="text-[0.72rem] font-semibold text-slate-100">
          {post.likes} likes
        </p>
        <p className="mt-1 text-[0.72rem] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-100">{post.user}</span>{" "}
          {post.caption}
        </p>
        <p className="mt-2 text-[0.68rem] text-slate-500">View all comments</p>
      </div>
    </div>
  );
}
