import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { ArtistLogo } from "../ui/ArtistLogo";
import { BatField } from "../visuals/BatField";
import {
  SPLASH_COMPLETE_EVENT,
  SPLASH_SESSION_KEY,
  hasSeenSplash,
} from "../../lib/experience";

const MIN_DURATION = 1550;
const MAX_DURATION = 2850;

/**
 * Cinematic splash / preloader.
 * It remains visible long enough to read, but never blocks the page beyond the
 * hard cap. The completion event starts the hero reveal beneath the curtain.
 */
export function SplashScreen() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();
  const [visible, setVisible] = useState(() => !hasSeenSplash());
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (!visible) return;

    const startedAt = performance.now();
    let pageReady = document.readyState === "complete";
    let finishTimer = 0;

    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      setProgress(100);
      window.sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
      window.dispatchEvent(new CustomEvent(SPLASH_COMPLETE_EVENT));
      setVisible(false);
    };

    const scheduleFinish = () => {
      pageReady = true;
      const elapsed = performance.now() - startedAt;
      finishTimer = window.setTimeout(finish, Math.max(0, MIN_DURATION - elapsed));
    };

    const onLoad = () => scheduleFinish();
    if (pageReady) scheduleFinish();
    else window.addEventListener("load", onLoad, { once: true });

    const hardStop = window.setTimeout(finish, MAX_DURATION);
    const tick = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const ceiling = pageReady ? 100 : 92;
      const calculated = Math.min(ceiling, Math.round((elapsed / MAX_DURATION) * 100));
      setProgress((current) => Math.max(current, calculated));
    }, 50);

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(hardStop);
      window.clearInterval(tick);
      window.removeEventListener("load", onLoad);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={{
            opacity: reduced ? 0 : 1,
            clipPath: reduced ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          }}
          transition={{ duration: reduced ? 0.35 : 0.95, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-live="polite"
          aria-label={t.splash.loading}
        >
          <div className="absolute inset-0 splash-vignette" aria-hidden="true" />

          <motion.div
  className="pointer-events-none absolute h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem]"
  initial={{
    opacity: 0,
    scale: reduced ? 1 : 0.72,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: reduced ? 0.3 : 1.15,
    ease: [0.16, 1, 0.3, 1],
  }}
  aria-hidden="true"
>
  <div
    className="absolute inset-[6%] rounded-full"
    style={{
      background:
        "radial-gradient(circle at 35% 30%, rgba(206,54,72,0.92) 0%, rgba(114,13,31,0.96) 37%, rgba(33,4,12,0.98) 72%, #050505 100%)",
      boxShadow:
        "inset -54px -42px 90px rgba(0,0,0,0.84), 0 0 70px 18px rgba(158,16,37,0.22)",
    }}
  />

  <div
    className="absolute inset-0 rounded-full opacity-60 blur-3xl"
    style={{
      background:
        "radial-gradient(circle, rgba(158,16,37,0.32), transparent 68%)",
    }}
  />
</motion.div>

          {!reduced && <BatField count={6} mode="splash" className="opacity-90" />}

          <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between md:inset-x-10 md:top-8">
            <span className="font-meta text-muted/70">VDRT — EPK</span>
            <span className="font-meta text-muted/70">RITUAL 00</span>
          </div>

          <motion.div
  className="relative z-10 flex w-full flex-col items-center px-6 text-center"
  initial={{
    opacity: 0,
    y: reduced ? 0 : 24,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: reduced ? 0.3 : 0.85,
    delay: 0.12,
  }}
>
  <span className="mb-7 h-10 w-px bg-gradient-to-b from-transparent via-blood-bright to-transparent" />

  <motion.div
    className="relative w-[min(76vw,42rem)]"
    initial={{
      opacity: 0,
      scale: reduced ? 1 : 0.88,
      filter: reduced ? "blur(0px)" : "blur(10px)",
    }}
    animate={{
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    }}
    transition={{
      duration: reduced ? 0.3 : 1,
      delay: reduced ? 0 : 0.2,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    <ArtistLogo
      priority
      decorative
      className="w-full"
      imageClassName="drop-shadow-[0_12px_38px_rgba(0,0,0,0.95)]"
    />

    <motion.span
      className="pointer-events-none absolute inset-y-0 left-0 w-[22%] -skew-x-12 bg-gradient-to-r from-transparent via-bone/25 to-transparent blur-sm"
      initial={{ x: "-180%", opacity: 0 }}
      animate={
        reduced
          ? { opacity: 0 }
          : {
              x: "560%",
              opacity: [0, 0.75, 0],
            }
      }
      transition={{
        duration: 1.1,
        delay: 0.65,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  </motion.div>

  <p className="font-gothic mt-7 max-w-lg text-2xl font-medium leading-none tracking-[0.01em] text-bone/75 md:text-3xl">
  {t.splash.tagline}
</p>
</motion.div>

          <div className="absolute bottom-8 left-1/2 z-10 flex w-[min(19rem,76vw)] -translate-x-1/2 flex-col gap-3 md:bottom-10">
            <div className="flex items-center justify-between">
              <span className="font-meta text-muted">{t.splash.loading}</span>
              <span className="font-meta text-bone/80">{progress.toString().padStart(2, "0")}%</span>
            </div>
            <div className="h-px overflow-hidden bg-line">
              <motion.div
                className="h-full origin-left bg-blood-bright shadow-[0_0_16px_rgba(208,24,50,0.8)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.18, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
