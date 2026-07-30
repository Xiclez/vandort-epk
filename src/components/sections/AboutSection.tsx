import { motion } from "framer-motion";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function AboutSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();

  return (
    <Section id="about" ariaLabel={t.about.title} sideLabel={t.nav.artist}>
      <SectionHeading index={1} title={t.about.title} />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <motion.div
          variants={fadeUp(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <img 
            src="/images/vandort/about-portrait.webp" 
            alt="About Portrait" 
            className="w-full h-auto object-cover aspect-[3/4]" 
          />
        </motion.div>

        <div>
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-bone/85"
            variants={fadeUp(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {t.about.bio}
          </motion.p>

          <motion.ul
            className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4"
            variants={stagger(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {t.about.principles.map((p) => (
              <motion.li
                key={p}
                variants={fadeUp(reduced)}
                className="bg-elevated p-5 text-center"
              >
                <span className="font-display text-sm uppercase tracking-widest text-bone">
                  {p}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.blockquote
  className="font-gothic mt-12 max-w-4xl border-l-2 border-blood pl-6 text-4xl font-medium leading-[0.95] tracking-[-0.02em] text-bone md:text-6xl lg:text-7xl"
  variants={fadeUp(reduced)}
  initial="hidden"
  whileInView="visible"
  viewport={viewportOnce}
>
  “{t.about.quote}”
</motion.blockquote>
        </div>
      </div>
    </Section>
  );
}