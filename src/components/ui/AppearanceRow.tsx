import { motion } from "framer-motion";
import {
  Images,
  MapPin,
} from "lucide-react";
import type { Appearance } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import {
  fadeUp,
  viewportOnce,
} from "../../lib/motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

interface AppearanceRowProps {
  item: Appearance;
  onOpenGallery: (
    appearance: Appearance,
  ) => void;
}

/** One entry in the vertical appearances timeline. */
export function AppearanceRow({
  item,
  onOpenGallery,
}: AppearanceRowProps) {
  const { lang, t } = useLanguage();
  const reduced =
    useReducedMotionPreference();

  return (
    <motion.li
      className="relative flex items-start gap-6 pb-12 pl-8"
      variants={fadeUp(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <span
        className="absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-blood bg-ink"
        aria-hidden="true"
      />

      <span
        className="absolute left-0 top-1 h-full w-px -translate-x-1/2 bg-line"
        aria-hidden="true"
      />

      <div className="min-w-0">
        <h3 className="text-xl text-bone md:text-2xl">
          {item.event}
        </h3>

        <p className="font-meta mt-1 flex flex-wrap items-center gap-2 text-muted">
          <span>{item.detail[lang]}</span>

          <span aria-hidden="true">
            ·
          </span>

          <MapPin
            className="h-3 w-3"
            aria-hidden="true"
          />

          <span>{item.city}</span>
        </p>

        <button
          type="button"
          onClick={() =>
            onOpenGallery(item)
          }
          className="font-meta mt-5 inline-flex min-h-10 items-center gap-2 border border-bone/20 bg-black/20 px-4 py-2 text-bone transition-colors hover:border-blood hover:bg-blood"
        >
          <Images
            className="h-4 w-4"
            aria-hidden="true"
          />

          {t.appearances.galleryButton}

          {item.media.length > 0 && (
            <span className="text-muted">
              ({item.media.length})
            </span>
          )}
        </button>
      </div>
    </motion.li>
  );
}