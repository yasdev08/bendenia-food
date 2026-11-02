"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Photo } from "@/lib/photos";
import { Lightbox } from "./Lightbox";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** Shown until real photos are added to /public/photos. */
const PLACEHOLDERS = [
  { file: "01.jpg", ratio: 5 / 4, cls: "aspect-[4/5]" },
  { file: "02.jpg", ratio: 1, cls: "aspect-square" },
  { file: "03.jpg", ratio: 4 / 3, cls: "aspect-[3/4]" },
  { file: "04.jpg", ratio: 3 / 4, cls: "aspect-[4/3]" },
  { file: "05.jpg", ratio: 5 / 4, cls: "aspect-[4/5]" },
  { file: "06.jpg", ratio: 1, cls: "aspect-square" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ---- column count: 2 on phones, 3 from 768px (server renders 2) ---- */
const MQ = "(min-width: 768px)";
function subscribe(cb: () => void) {
  const m = window.matchMedia(MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
function useColumnCount() {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(MQ).matches ? 3 : 2),
    () => 2,
  );
}

/**
 * Balanced masonry: each item goes into the currently shortest column, using its
 * real aspect ratio. Keeps natural proportions (no crop) and a left-to-right
 * reading order, so the strongest photos (01, 02, …) open the grid side by side.
 */
function balance<T>(items: T[], ratioOf: (t: T) => number, cols: number) {
  const columns: { item: T; index: number }[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  items.forEach((item, index) => {
    const c = heights.indexOf(Math.min(...heights));
    columns[c].push({ item, index });
    heights[c] += ratioOf(item) + 0.05; // + gap allowance
  });
  return columns;
}

export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const cols = useColumnCount();

  const tile = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 32, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: 0.85, delay: (i % cols) * 0.08, ease },
  });

  const photoCols = useMemo(() => balance(photos, (p) => p.height / p.width, cols), [photos, cols]);
  const placeholderCols = useMemo(() => balance(PLACEHOLDERS, (p) => p.ratio, cols), [cols]);

  return (
    <>
      <div className="flex items-start gap-3 sm:gap-4">
        {photos.length > 0
          ? photoCols.map((column, c) => (
              <ul key={c} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
                {column.map(({ item: p, index: i }) => (
                  <motion.li key={p.src} {...tile(i)}>
                    <button
                      type="button"
                      onClick={(e) => {
                        trigger.current = e.currentTarget;
                        setOpen(i);
                      }}
                      className="group relative block w-full overflow-hidden rounded-2xl bg-cream-deep shadow-[0_18px_40px_-28px_rgb(58_10_21/0.7)] sm:rounded-3xl"
                      aria-label={`Agrandir : ${p.alt}`}
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={p.width}
                        height={p.height}
                        sizes="(min-width: 1024px) 330px, (min-width: 768px) 33vw, 50vw"
                        className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.045]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/60 via-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-3 bottom-3 grid size-9 translate-y-2 place-items-center rounded-full bg-cream/90 text-burgundy opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        <Expand className="size-4" />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            ))
          : placeholderCols.map((column, c) => (
              <ul key={c} className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
                {column.map(({ item: p, index: i }) => (
                  <motion.li key={p.file} {...tile(i)}>
                    <PhotoPlaceholder file={p.file} compact className={`${p.cls} w-full rounded-2xl sm:rounded-3xl`} />
                  </motion.li>
                ))}
              </ul>
            ))}
      </div>

      <Lightbox photos={photos} index={open} onIndexChange={setOpen} returnFocusTo={trigger} />
    </>
  );
}
