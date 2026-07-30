import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function SoundUniverseSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();

  return (
    <Section
      id="sound"
      ariaLabel={t.sound.title}
      sideLabel={t.nav.sound}
      className="bg-elevated"
    >
      <SectionHeading index={2} title={t.sound.title} intro={t.sound.intro} />

      <motion.div
        className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3"
        variants={stagger(reduced)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {t.sound.groups.map((group, i) => (
          <motion.div
            key={group.heading}
            variants={fadeUp(reduced)}
            className="group bg-ink p-8 transition-colors duration-500 hover:bg-surface"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="font-meta text-blood-bright">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl text-bone">{group.heading}</h3>
            </div>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-muted transition-colors group-hover:text-bone/90"
                >
                  <span
                    className="h-1 w-1 flex-none bg-blood"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
