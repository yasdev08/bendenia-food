"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  index: number | null;
  onIndexChange: (i: number | null) => void;
  /** Element that opened the lightbox; focus returns to it on close. */
  returnFocusTo: RefObject<HTMLElement | null>;
};

export function Lightbox({ photos, index, onIndexChange, returnFocusTo }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null && photos[index] !== undefined;
  const count = photos.length;

  const close = useCallback(() => onIndexChange(null), [onIndexChange]);
  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Focus management, scroll lock, keyboard.
  useEffect(() => {
    if (!isOpen) return;
    const opener = returnFocusTo.current;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "Tab") {
        // Simple focus trap among the dialog's buttons.
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-lightbox] button"),
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, [isOpen, close, returnFocusTo]);

  // Arrow navigation lives in its own effect so it always sees the current index.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const photo = isOpen ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label="Galerie photo"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-deep/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 grid size-11 place-items-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 transition hover:bg-cream/20"
            aria-label="Fermer"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={photo.src}
              className="relative h-[78svh] w-[92vw] max-w-5xl touch-pan-y"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={photo.src} alt={photo.alt} fill sizes="92vw" className="pointer-events-none object-contain" />
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 transition hover:bg-cream/20 sm:grid"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/20 transition hover:bg-cream/20 sm:grid"
                aria-label="Photo suivante"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
              <p className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold tabular-nums text-cream/85" aria-live="polite">
                {(index ?? 0) + 1} / {count}
              </p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
