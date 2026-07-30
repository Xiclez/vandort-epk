import { AlertTriangle } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { AppearanceRow } from "../ui/AppearanceRow";
import { appearances } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";

export function AppearancesSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="appearances"
      ariaLabel={t.appearances.title}
      sideLabel={t.nav.appearances}
      className="overflow-hidden bg-elevated"
    >
      <div className="relative z-10">
        <SectionHeading
          index={6}
          title={t.appearances.title}
          intro={t.appearances.intro}
        />

        <ol className="mt-4 max-w-2xl">
          {appearances.map((item) => (
            <AppearanceRow key={`${item.event}-${item.city}`} item={item} />
          ))}
        </ol>

        <p className="font-meta mt-6 flex items-start gap-2 text-muted/80">
          <AlertTriangle className="mt-0.5 h-3 w-3 flex-none" aria-hidden="true" />
          {t.appearances.verifyNote}
        </p>
      </div>
    </Section>
  );
}
