import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

type TransitionVariant = "eclipse" | "moonrise" | "final";

interface SectionTransitionProps {
  variant?: TransitionVariant;
  marker?: string;
}

/**
 * Decorative breathing space between narrative chapters.
 * The global MoonJourney passes through these moments while the horizon and
 * veil respond to scroll. No media assets and no additional WebGL scene.
 */
export function SectionTransition({
  variant = "eclipse",
  marker = "✦",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const veilY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? ["0%", "0%", "0%"] : ["30%", "0%", "-30%"]
  );
  const lineScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.08, 1, 0.08]);
  const markerOpacity = useTransform(scrollYProgress, [0.12, 0.5, 0.88], [0, 1, 0]);
  const markerRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);

  const backgrounds: Record<TransitionVariant, string> = {
    eclipse:
      "radial-gradient(45% 80% at 50% 100%, rgba(158,16,37,0.18), transparent 72%)",
    moonrise:
      "radial-gradient(55% 90% at 72% 100%, rgba(208,24,50,0.14), transparent 74%)",
    final:
      "radial-gradient(50% 90% at 50% 0%, rgba(158,16,37,0.2), transparent 76%)",
  };

  return (
    <div
      ref={ref}
      className="relative z-[2] h-[22svh] min-h-36 overflow-hidden md:h-[30vh]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-25%]"
        style={{ y: veilY, background: backgrounds[variant] }}
      />
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center gap-5 px-6">
        <motion.span
          className="h-px w-full max-w-md origin-right bg-gradient-to-r from-transparent via-blood/60 to-blood-bright"
          style={{ scaleX: lineScale }}
        />
        <motion.span
          className="font-meta flex h-9 w-9 flex-none items-center justify-center border border-blood/50 text-blood-bright"
          style={{ opacity: markerOpacity, rotate: markerRotate }}
        >
          {marker}
        </motion.span>
        <motion.span
          className="h-px w-full max-w-md origin-left bg-gradient-to-l from-transparent via-blood/60 to-blood-bright"
          style={{ scaleX: lineScale }}
        />
      </div>
    </div>
  );
}
