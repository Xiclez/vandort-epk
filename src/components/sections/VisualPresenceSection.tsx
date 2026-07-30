import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { gallerySlots } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { fadeUp, viewportOnce } from "../../lib/motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function VisualPresenceSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();
  const [openSlot, setOpenSlot] = useState<string | null>(null);

  useEffect(() => {
    if (!openSlot) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenSlot(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSlot]);

  return (
    <Section id="gallery" ariaLabel={t.gallery.title} sideLabel={t.nav.gallery}>
      <SectionHeading index={5} title={t.gallery.title} intro={t.gallery.intro} />

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {gallerySlots.map((slot, i) => {
          const imageName = `vp${i + 1}`;
          
          return (
            <motion.button
              key={slot.assetSlot}
              type="button"
              onClick={() => setOpenSlot(imageName)}
              className="mb-4 block w-full break-inside-avoid text-left"
              aria-label={`${t.gallery.title}: ${imageName}`}
              variants={fadeUp(reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: (i % 3) * 0.06 }}
            >
              <img
                src={`/images/visual-presence/${imageName}.webp`}
                alt={imageName}
                className="w-full h-auto object-cover"
              />
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {openSlot && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/95 p-6 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={openSlot}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenSlot(null)}
          >
            <button
              type="button"
              onClick={() => setOpenSlot(null)}
              aria-label={t.gallery.closeLabel}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-line text-bone"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <div
              className="w-full max-w-5xl flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/images/visual-presence/${openSlot}.webp`}
                alt={openSlot}
                className="w-full max-h-[85vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}