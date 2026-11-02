"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { useRef, useState } from "react";
import type { Photo } from "@/lib/photos";
import { Lightbox } from "./Lightbox";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** Shown until real photos are added to /public/photos. Varied ratios keep the masonry rhythm. */
const PLACEHOLDERS = [
  { file: "01.jpg", ratio: "aspect-[4/5]" },
  { file: "02.jpg", ratio: "aspect-square" },
  { file: "03.jpg", ratio: "aspect-[3/4]" },
  { file: "04.jpg", ratio: "aspect-[4/3]" },
  { file: "05.jpg", ratio: "aspect-[4/5]" },
  { file: "06.jpg", ratio: "aspect-square" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const tile = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 32, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "0px 0px -8% 0px" },
    transition: { duration: 0.85, delay: (i % 3) * 0.08, ease },
  });

  return (
    <>
      <ul className="columns-2 gap-3 sm:gap-4 md:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
        {photos.length > 0
          ? photos.map((p, i) => (
              <motion.li key={p.src} {...tile(i)} className="break-inside-avoid">
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
                    sizes="(min-width: 768px) 33vw, 50vw"
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
            ))
          : PLACEHOLDERS.map((p, i) => (
              <motion.li key={p.file} {...tile(i)} className="break-inside-avoid">
                <PhotoPlaceholder file={p.file} compact className={`${p.ratio} w-full rounded-2xl sm:rounded-3xl`} />
              </motion.li>
            ))}
      </ul>

      <Lightbox photos={photos} index={open} onIndexChange={setOpen} returnFocusTo={trigger} />
    </>
  );
}
