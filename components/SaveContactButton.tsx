"use client";

import { Check, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

type Props = {
  variant?: "card" | "compact";
};

/**
 * Plain link to the server-generated .vcf (no JS required, works in in-app browsers).
 * No `download` attribute on purpose: iOS Safari then opens its native
 * "Add contact" sheet; Android downloads via Content-Disposition and opens Contacts.
 */
export function SaveContactButton({ variant = "card" }: Props) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 4000);
    return () => clearTimeout(t);
  }, [done]);

  if (variant === "compact") {
    return (
      <a
        href={site.vcardPath}
        type="text/vcard"
        onClick={() => setDone(true)}
        className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2.5 text-sm font-semibold text-cream transition hover:border-orange hover:text-orange"
      >
        {done ? <Check className="size-4" aria-hidden="true" /> : <UserRoundPlus className="size-4" aria-hidden="true" />}
        {done ? "Contact téléchargé" : "Enregistrer le contact"}
      </a>
    );
  }

  return (
    <a
      href={site.vcardPath}
      type="text/vcard"
      onClick={() => setDone(true)}
      className="group relative flex items-center gap-4 rounded-2xl bg-burgundy px-5 py-4 text-cream shadow-[0_10px_30px_-12px_rgb(58_10_21/0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-burgundy-deep active:translate-y-0"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream/10 text-orange-bright ring-1 ring-cream/15 transition group-hover:bg-orange group-hover:text-cream">
        {done ? <Check className="size-5" aria-hidden="true" /> : <UserRoundPlus className="size-5" aria-hidden="true" />}
      </span>
      <span className="flex min-w-0 flex-col text-left">
        <span className="text-[1.02rem] font-bold">Enregistrer le contact</span>
        <span className="text-[0.8rem] text-cream/70" aria-live="polite">
          {done ? "Ouvrez le fichier pour l’ajouter à vos contacts" : "Ajoutez Bendenia Food à votre téléphone"}
        </span>
      </span>
    </a>
  );
}
