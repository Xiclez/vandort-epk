import { ArrowRight } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { MixRow } from "../ui/MixRow";
import { PlaceholderButton } from "../ui/PlaceholderButton";
import { mixes } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";

export function FeaturedMixesSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="mixes"
      ariaLabel={t.mixes.title}
      sideLabel={t.nav.mixes}
      className="bg-elevated"
    >
      <SectionHeading index={4} title={t.mixes.title} />

      <div>
        {mixes.map((mix, i) => (
          <MixRow key={mix.title} mix={mix} index={i} />
        ))}
      </div>

      <div className="mt-12">
        <PlaceholderButton
          variant="secondary"
          placeholder
          icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          {t.mixes.cta}
        </PlaceholderButton>
      </div>
    </Section>
  );
}
