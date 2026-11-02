import { ImagePlus } from "lucide-react";

type Props = {
  /** File name expected in /public/photos, shown so the slot is easy to identify. */
  file: string;
  className?: string;
  /** Extra classes for the inner label block (e.g. to move it away from overlaid text). */
  contentClassName?: string;
  compact?: boolean;
};

/**
 * Clearly-identifiable stand-in for a food photograph.
 * Drop the matching file into /public/photos and rebuild — it is replaced automatically.
 */
export function PhotoPlaceholder({ file, className = "", contentClassName = "justify-center", compact = false }: Props) {
  return (
    <div
      role="img"
      aria-label={`Emplacement photo : ${file}`}
      className={`grain relative isolate overflow-hidden bg-burgundy ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_20%_10%,#a8322b_0%,transparent_55%),radial-gradient(90%_70%_at_90%_100%,#ea7a2c_0%,transparent_60%),linear-gradient(160deg,#5c1424,#3a0a15)]"
      />
      <div
        className={`absolute inset-3 flex flex-col items-center gap-2 rounded-[inherit] border border-dashed border-cream/35 p-3 text-center text-cream/85 ${contentClassName}`}
      >
        <ImagePlus className={compact ? "size-5" : "size-7"} strokeWidth={1.5} aria-hidden="true" />
        {!compact && <span className="text-xs font-semibold tracking-wide">Photo à ajouter</span>}
        <code className="rounded-full bg-black/25 px-2.5 py-1 font-mono text-[0.65rem] text-cream/80">
          photos/{file}
        </code>
      </div>
    </div>
  );
}
