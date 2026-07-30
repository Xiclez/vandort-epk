import { ImageOff } from "lucide-react";
import { SHOW_PLACEHOLDER_LABELS } from "../../content/artistData";

type AspectRatio = "portrait" | "landscape" | "square" | "wide";

const ASPECT: Record<AspectRatio, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

interface MediaPlaceholderProps {
  label: string;
  assetSlot: string;
  aspectRatio?: AspectRatio;
  className?: string;
}

/**
 * Reusable dark placeholder for every future media position.
 * No real images are ever loaded here — swap this element for an <img>
 * (or video) later, keyed by `assetSlot`.
 */
export function MediaPlaceholder({
  label,
  assetSlot,
  aspectRatio = "portrait",
  className = "",
}: MediaPlaceholderProps) {
  return (
    <div
      className={`group relative overflow-hidden border border-line bg-elevated ${ASPECT[aspectRatio]} ${className}`}
      role="img"
      aria-label={label}
      data-asset-slot={assetSlot}
    >
      {/* dark visual treatment */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(158,16,37,0.10), transparent 60%), repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 10px)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
        <ImageOff className="h-6 w-6 text-muted" aria-hidden="true" />
        {SHOW_PLACEHOLDER_LABELS && (
          <>
            <span className="font-display text-sm uppercase tracking-widest text-bone/80">
              {label}
            </span>
            <span className="font-meta text-muted">{assetSlot}</span>
          </>
        )}
      </div>
      <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition group-hover:ring-blood/40" />
    </div>
  );
}
