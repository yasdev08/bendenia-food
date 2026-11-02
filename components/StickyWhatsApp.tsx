"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { whatsappOrderUrl } from "@/config/site";
import { WhatsAppIcon } from "./icons/BrandIcons";

/**
 * Mobile-only floating order bar. Appears once the hero CTA has scrolled away,
 * hides again when the footer (which has its own actions) comes into view.
 */
export function StickyWhatsApp() {
  const [heroGone, setHeroGone] = useState(false);
  const [footerIn, setFooterIn] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const footer = document.getElementById("site-footer");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
        if (e.target === footer) setFooterIn(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (footer) io.observe(footer);
    return () => io.disconnect();
  }, []);

  const show = heroGone && !footerIn;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <a
            href={whatsappOrderUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-shine relative mx-auto flex max-w-md items-center justify-center gap-3 overflow-hidden rounded-full bg-orange px-6 py-4 font-bold text-white shadow-[0_18px_40px_-12px_rgb(58_10_21/0.6)] ring-1 ring-white/20 active:scale-[0.98]"
          >
            <WhatsAppIcon className="size-5" />
            Commander sur WhatsApp
            <span className="sr-only"> (ouvre WhatsApp)</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
