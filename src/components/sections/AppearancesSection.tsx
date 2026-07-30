import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { AppearanceRow } from "../ui/AppearanceRow";
import { AppearanceMediaModal } from "../ui/AppearanceMediaModal";
import {
  appearances,
  type Appearance,
} from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";

export function AppearancesSection() {
  const { t } = useLanguage();

  const [
    selectedAppearance,
    setSelectedAppearance,
  ] = useState<Appearance | null>(null);

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
            <AppearanceRow
              key={item.id}
              item={item}
              onOpenGallery={
                setSelectedAppearance
              }
            />
          ))}
        </ol>
      </div>

      <AppearanceMediaModal
        appearance={selectedAppearance}
        open={selectedAppearance !== null}
        onClose={() =>
          setSelectedAppearance(null)
        }
      />
    </Section>
  );
}