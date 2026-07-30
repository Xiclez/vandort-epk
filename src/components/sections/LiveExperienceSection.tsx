import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function LiveExperienceSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();

  return (
    <Section id="live" ariaLabel={t.live.title} sideLabel={t.nav.experience}>
      <SectionHeading index={3} title={t.live.title} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          variants={fadeUp(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          whileHover={reduced ? undefined : { scale: 1.01 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/images/vandort/live-performance-main.webp"
            alt="Live Performance — Main"
            className="w-full h-auto object-cover aspect-video"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:grid-rows-3">
          {["live-performance-detail-01", "live-performance-detail-02", "live-performance-detail-03"].map(
            (slot, i) => (
              <motion.div
                key={slot}
                variants={fadeUp(reduced)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: i * 0.08 }}
                className={i === 2 ? "col-span-2 lg:col-span-1" : ""}
              >
                <img
                  src={`/images/vandort/${slot}.webp`}
                  alt={`Live Detail 0${i + 1}`}
                  className="w-full h-auto object-cover aspect-video"
                />
              </motion.div>
            )
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr]">
        <motion.p
          className="text-lg leading-relaxed text-bone/85"
          variants={fadeUp(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.live.description}
        </motion.p>

        <motion.ul
          className="flex flex-wrap content-start gap-3"
          variants={stagger(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.live.attributes.map((attr) => (
            <motion.li
              key={attr}
              variants={fadeUp(reduced)}
              className="font-meta border border-line px-4 py-2 text-muted"
            >
              {attr}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}