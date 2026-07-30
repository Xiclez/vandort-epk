import { motion } from "framer-motion";
import { Download, Info } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { PlaceholderButton } from "../ui/PlaceholderButton";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";
import { artistLinks } from "../../content/artistLinks";
/*
 * CONTENT NOTE: Technical requirements are placeholders and must be
 * confirmed with the artist before production.
 */
export function TechnicalRiderSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();

  return (
    <Section id="rider" ariaLabel={t.rider.title} sideLabel={t.nav.rider}>
      <SectionHeading index={7} title={t.rider.title} intro={t.rider.intro} />

      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
        variants={stagger(reduced)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {t.rider.groups.map((group) => (
          <motion.div
            key={group.heading}
            variants={fadeUp(reduced)}
            className="border border-line p-6"
          >
            <h3 className="font-meta mb-4 text-blood-bright">{group.heading}</h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-bone/85">
                  <span
                    className="mt-2 h-1 w-1 flex-none bg-blood"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
      <PlaceholderButton
  variant="primary"
  href={artistLinks.riderPdf}
  download="vandort-technical-rider.pdf"
  icon={
    <Download
      className="h-4 w-4"
      aria-hidden="true"
    />
  }
>
  {t.rider.downloadCta}
</PlaceholderButton>
      </div>
    </Section>
  );
}
