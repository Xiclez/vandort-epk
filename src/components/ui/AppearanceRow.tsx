import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Appearance } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { fadeUp, viewportOnce } from "../../lib/motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

/** One entry in the vertical appearances timeline. */
export function AppearanceRow({ item }: { item: Appearance }) {
  const { lang } = useLanguage();
  const reduced = useReducedMotionPreference();

  return (
    <motion.li
      className="relative flex items-start gap-6 pb-10 pl-8"
      variants={fadeUp(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* timeline node + line */}
      <span
        className="absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-blood bg-ink"
        aria-hidden="true"
      />
      <span
        className="absolute left-0 top-1 h-full w-px -translate-x-1/2 bg-line"
        aria-hidden="true"
      />
      <div>
        <h3 className="text-xl text-bone md:text-2xl">{item.event}</h3>
        <p className="font-meta mt-1 flex items-center gap-2 text-muted">
          <span>{item.detail[lang]}</span>
          <span aria-hidden="true">·</span>
          <MapPin className="h-3 w-3" aria-hidden="true" />
          <span>{item.city}</span>
        </p>
      </div>
    </motion.li>
  );
}
