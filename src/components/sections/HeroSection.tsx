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

  const portraitY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : 38],
  );
  
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduced ? 1 : 1.03],
  );
  
  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : -20],
  );
  
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : -14],
  );
  
  const shadeOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [0.34, 0.5],
  );
  return (
    <section
    ref={ref}
    id="hero"
    aria-label={t.nav.home}
    className="relative min-h-[92svh] overflow-hidden bg-[#050505] md:min-h-[84svh]"
  >
  <motion.div
    className="absolute inset-0 z-0 overflow-hidden"
    style={{ y: portraitY, scale: portraitScale }}
    initial={{ opacity: 0, x: reduced ? 0 : 28 }}
    animate={
      introReady
        ? { opacity: 0.78, x: 0 }
        : { opacity: 0, x: reduced ? 0 : 28 }
    }
    transition={{
      duration: reduced ? 0.35 : 1.05,
      ease: EASE_RITUAL,
    }}
    aria-hidden="true"
  >
    <img
      src="/images/vandort/hero-portrait2.webp"
      alt=""
      className="h-full w-full select-none object-cover object-[center_18%] md:object-[center_20%]"
      loading="eager"
      decoding="async"
      draggable={false}
    />

    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.97) 16%, rgba(5,5,5,0.78) 30%, rgba(5,5,5,0.38) 50%, rgba(5,5,5,0.12) 68%, rgba(5,5,5,0.18) 100%), linear-gradient(0deg, #050505 0%, rgba(5,5,5,0.24) 26%, rgba(5,5,5,0.08) 58%, rgba(5,5,5,0.26) 100%)",
      }}
    />

    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 76% 38%, rgba(255,255,255,0.05), transparent 18%), radial-gradient(circle at 80% 44%, rgba(5,5,5,0), rgba(5,5,5,0.18) 42%, rgba(5,5,5,0.54) 72%)",
      }}
    />
  </motion.div>

  <SmokeLayer className="z-0 opacity-45" />

  <motion.div
    className="absolute inset-0 z-0 bg-ink"
    style={{ opacity: shadeOpacity }}
    aria-hidden="true"
  />

{introReady && !reduced && (
  <BatField
    count={4}
    mode="hero"
    className="z-10"
  />
)}
      <div className="section-shell relative z-10 flex min-h-[108svh] flex-col pb-24 pt-28 md:pb-28 md:pt-32">        <motion.div
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
  className="relative z-20 mt-10 w-[min(58vw,13rem)] md:mt-8 md:w-[min(19vw,14rem)]"
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
    duration: reduced ? 0.35 : 0.95,
    ease: EASE_RITUAL,
    delay: reduced ? 0 : 0.08,
  }}
>
  <h1 className="sr-only">{artist.name}</h1>

  <ArtistLogo
    priority
    decorative
    className="w-full"
    imageClassName="drop-shadow-[0_4px_20px_rgba(0,0,0,0.86)]"
  />

  <motion.span
    className="font-meta absolute -bottom-7 left-1 text-blood-bright md:left-2"
    initial={{ opacity: 0, width: 0 }}
    animate={
      introReady
        ? { opacity: 1, width: "auto" }
        : { opacity: 0, width: 0 }
    }
    transition={{
      duration: 0.7,
      delay: 0.48,
    }}
  >
    {t.hero.ritualLabel}
  </motion.span>
</motion.div>

<motion.div
  className="mt-12 grid max-w-5xl grid-cols-1 items-end gap-6 pt-10 md:mt-auto md:grid-cols-[1fr_1.1fr] md:gap-12 md:pt-16"
  style={{ y: contentY }}
  initial={{ opacity: 0, y: reduced ? 0 : 18 }}
  animate={
    introReady
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: reduced ? 0 : 18 }
  }
  transition={{
    duration: 0.75,
    ease: EASE_RITUAL,
    delay: reduced ? 0 : 0.42,
  }}
>
          <div>
          <p className="font-gothic max-w-[16ch] text-[2rem] leading-[0.96] tracking-[-0.02em] text-bone/[0.96] md:max-w-[18ch] md:text-[3.3rem]">
  {t.hero.statement}
</p>
<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
  <a
    href="#mixes"
    className="font-meta inline-flex min-h-12 items-center justify-center gap-2 bg-blood px-5 py-3 text-bone transition-colors hover:bg-blood-bright"
  >
    <Headphones className="h-4 w-4" aria-hidden="true" />
    {t.hero.primaryCta}
  </a>

  <a
    href="#booking"
    className="font-meta inline-flex min-h-12 items-center justify-center gap-2 border border-bone/30 bg-ink/44 px-5 py-3 text-bone backdrop-blur-sm transition-colors hover:border-blood hover:bg-ink/64"
  >
    <CalendarClock className="h-4 w-4" aria-hidden="true" />
    {t.hero.secondaryCta}
  </a>
</div>
          </div>

          <div className="border-l border-blood/40 pl-4 md:justify-self-end md:max-w-sm">
  <span className="font-meta text-blood-bright">
    {t.hero.rangeLabel}
  </span>

  <p className="font-meta mt-3 max-w-[28rem] leading-6 text-bone/66">
    {t.hero.genreLine}
  </p>
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
  className="font-meta absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
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
