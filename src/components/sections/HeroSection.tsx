import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Headphones, CalendarClock } from "lucide-react";
import { artist } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { BatField } from "../visuals/BatField";
import { SmokeLayer } from "../visuals/SmokeLayer";
import { EASE_RITUAL } from "../../lib/motion";
import { SPLASH_COMPLETE_EVENT, hasSeenSplash } from "../../lib/experience";
import { ArtistLogo } from "../ui/ArtistLogo";

export function HeroSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();
  const ref = useRef<HTMLElement>(null);
  const [introReady, setIntroReady] = useState(() => hasSeenSplash());

  useEffect(() => {
    const reveal = () => setIntroReady(true);
    window.addEventListener(SPLASH_COMPLETE_EVENT, reveal);
    return () => window.removeEventListener(SPLASH_COMPLETE_EVENT, reveal);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 110]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1.02, reduced ? 1.02 : 1.1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -54]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -28]);
  const shadeOpacity = useTransform(scrollYProgress, [0, 0.75], [0.18, 0.68]);

  return (
    <section
      ref={ref}
      id="hero"
      aria-label={t.nav.home}
      className="relative min-h-[108svh] overflow-hidden bg-transparent"
    >
      <SmokeLayer className="z-[2]" />

      <motion.div
        className="absolute inset-0 z-[2] bg-ink"
        style={{ opacity: shadeOpacity }}
        aria-hidden="true"
      />

      {/* Full-bleed media slot: intentionally oversized to create an editorial hero. */}
      <motion.div
        className="absolute inset-y-0 right-0 z-[3] w-full md:w-[64%]"
        style={{ y: portraitY, scale: portraitScale }}
        initial={{ opacity: 0, x: reduced ? 0 : 70 }}
        animate={introReady ? { opacity: 0.9, x: 0 } : { opacity: 0, x: reduced ? 0 : 70 }}
        transition={{ duration: reduced ? 0.35 : 1.1, ease: EASE_RITUAL }}
      >
        <div className="relative h-full w-full overflow-hidden">
        <img
  src="/images/vandort/hero-portrait.webp"
  alt="VANDORT"
  className="h-full w-full select-none object-cover object-[center_20%]"
  loading="eager"
  decoding="async"
  draggable={false}
/>

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent"
  />

  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
  />
</div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.93) 12%, rgba(5,5,5,0.4) 43%, rgba(5,5,5,0.08) 72%), linear-gradient(0deg, #050505 0%, transparent 28%, rgba(5,5,5,0.18) 100%)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {introReady && !reduced && <BatField count={5} mode="hero" className="z-[5] opacity-[0.85]" />}

      <div className="section-shell relative z-10 flex min-h-[108svh] flex-col pb-24 pt-28 md:pb-28 md:pt-32">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: reduced ? 0 : 14 }}
          animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 14 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.12 }}
        >
          <span className="font-meta text-blood-bright">01</span>
          <span className="h-px w-12 bg-blood/70" aria-hidden="true" />
          <p className="font-meta text-bone/70">{t.hero.eyebrow}</p>
        </motion.div>

        <motion.div
  className="relative z-20 mt-[10svh] w-[min(94vw,78rem)] md:mt-[7svh]"
  style={{ y: titleY }}
  initial={{
    opacity: 0,
    clipPath: reduced
      ? undefined
      : "inset(0 0 100% 0)",
  }}
  animate={
    introReady
      ? {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
        }
      : {
          opacity: 0,
          clipPath: reduced
            ? undefined
            : "inset(0 0 100% 0)",
        }
  }
  transition={{
    duration: reduced ? 0.35 : 1.05,
    ease: EASE_RITUAL,
    delay: reduced ? 0 : 0.08,
  }}
>
  <h1 className="sr-only">{artist.name}</h1>

  <ArtistLogo
    priority
    decorative
    className="w-full"
    imageClassName="drop-shadow-[0_14px_48px_rgba(0,0,0,0.95)]"
  />

  <motion.span
    className="font-meta absolute -bottom-8 left-1 text-blood-bright md:left-2"
    initial={{
      opacity: 0,
      width: 0,
    }}
    animate={
      introReady
        ? {
            opacity: 1,
            width: "auto",
          }
        : {
            opacity: 0,
            width: 0,
          }
    }
    transition={{
      duration: 0.75,
      delay: 0.55,
    }}
  >
    {t.hero.ritualLabel}
  </motion.span>
</motion.div>

        <motion.div
          className="mt-auto grid max-w-5xl grid-cols-1 items-end gap-8 pt-28 md:grid-cols-[1fr_1.1fr] md:gap-16 md:pt-20"
          style={{ y: contentY }}
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 22 }}
          transition={{ duration: 0.75, ease: EASE_RITUAL, delay: reduced ? 0 : 0.48 }}
        >
          <div>
          <p className="font-gothic max-w-2xl text-3xl font-medium leading-[0.98] tracking-[-0.015em] text-bone/85 md:text-5xl">
  {t.hero.statement}
</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#mixes"
                className="font-meta inline-flex min-h-12 items-center gap-2 bg-blood px-5 py-3 text-bone transition-colors hover:bg-blood-bright"
              >
                <Headphones className="h-4 w-4" aria-hidden="true" />
                {t.hero.primaryCta}
              </a>
              <a
                href="#booking"
                className="font-meta inline-flex min-h-12 items-center gap-2 border border-bone/30 bg-ink/30 px-5 py-3 text-bone backdrop-blur-sm transition-colors hover:border-blood hover:bg-ink/60"
              >
                <CalendarClock className="h-4 w-4" aria-hidden="true" />
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="border-l border-blood/50 pl-5 md:justify-self-end md:max-w-md">
            <span className="font-meta text-blood-bright">{t.hero.rangeLabel}</span>
            <p className="font-meta mt-3 leading-6 text-bone/70">{t.hero.genreLine}</p>
          </div>
        </motion.div>

        <div
          className="font-meta pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 rotate-90 items-center gap-3 text-muted/50 lg:flex"
          aria-hidden="true"
        >
          <span>VANDORT / {t.hero.epkLabel}</span>
          <span className="h-px w-12 bg-muted/40" />
          <span>2026</span>
        </div>
      </div>

      <motion.a
        href="#about"
        className="font-meta absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={introReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: reduced ? 0 : 1, duration: 0.6 }}
      >
        <span>{t.hero.scrollLabel}</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
