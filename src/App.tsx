import { lazy, Suspense } from "react";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { SplashScreen } from "./components/sections/SplashScreen";
import { HeroSection } from "./components/sections/HeroSection";
import { ScrollProgress } from "./components/visuals/ScrollProgress";
import { GrainOverlay } from "./components/visuals/GrainOverlay";
import { MoonJourney } from "./components/visuals/MoonJourney";
import { SectionTransition } from "./components/visuals/SectionTransition";
import { useLanguage } from "./context/LanguageContext";
import { PageShader } from "./components/visuals/PageShader";


/* Below-the-fold sections are code-split to keep the initial payload light. */
const AboutSection = lazy(() =>
  import("./components/sections/AboutSection").then((m) => ({ default: m.AboutSection }))
);
const SoundUniverseSection = lazy(() =>
  import("./components/sections/SoundUniverseSection").then((m) => ({ default: m.SoundUniverseSection }))
);
const LiveExperienceSection = lazy(() =>
  import("./components/sections/LiveExperienceSection").then((m) => ({ default: m.LiveExperienceSection }))
);
const FeaturedMixesSection = lazy(() =>
  import("./components/sections/FeaturedMixesSection").then((m) => ({ default: m.FeaturedMixesSection }))
);
const VisualPresenceSection = lazy(() =>
  import("./components/sections/VisualPresenceSection").then((m) => ({ default: m.VisualPresenceSection }))
);
const AppearancesSection = lazy(() =>
  import("./components/sections/AppearancesSection").then((m) => ({ default: m.AppearancesSection }))
);
const TechnicalRiderSection = lazy(() =>
  import("./components/sections/TechnicalRiderSection").then((m) => ({ default: m.TechnicalRiderSection }))
);
const BookingSection = lazy(() =>
  import("./components/sections/BookingSection").then((m) => ({ default: m.BookingSection }))
);

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />;
}

export default function App() {
  const { t } = useLanguage();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.nav.home}
      </a>

      <SplashScreen />
      <ScrollProgress />
<PageShader />
<GrainOverlay />
<MoonJourney />
<Navigation />
      <main id="main">
        <HeroSection />
        <SectionTransition variant="eclipse" marker="01" />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
          <SoundUniverseSection />
          <SectionTransition variant="moonrise" marker="02" />
          <LiveExperienceSection />
          <FeaturedMixesSection />
          <VisualPresenceSection />
          <AppearancesSection />
          <TechnicalRiderSection />
          <SectionTransition variant="final" marker="03" />
          <BookingSection />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
