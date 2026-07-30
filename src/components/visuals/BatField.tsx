import { motion } from "framer-motion";
import { Bat } from "./Bat";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

interface BatFieldProps {
  count?: number;
  /** Bats drift away (used in the booking ending). */
  disperse?: boolean;
  /** Choreography tuned for the splash-to-hero handoff. */
  mode?: "ambient" | "splash" | "hero";
  className?: string;
}

/**
 * Restrained, deterministic bat choreography.
 * Splash and hero share related positions so the transition feels continuous,
 * without keeping a second animation layer alive after the intro.
 */
export function BatField({
  count = 5,
  disperse = false,
  mode = "ambient",
  className = "",
}: BatFieldProps) {
  const reduced = useReducedMotionPreference();
  const bats = Array.from({ length: count });

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {bats.map((_, i) => {
        const heroLeft = 8 + ((i * 83) % 84);
        const heroTop = 8 + ((i * 43) % 55);
        const splashLeft = 33 + ((i * 17) % 38);
        const splashTop = 22 + ((i * 29) % 42);
        const left = mode === "splash" ? splashLeft : heroLeft;
        const top = mode === "splash" ? splashTop : heroTop;
        const size = 18 + ((i * 13) % 24);

        if (reduced) {
          return (
            <div
              key={i}
              className="absolute text-black/65"
              style={{ left: `${left}%`, top: `${top}%`, width: size }}
            >
              <Bat className="w-full" />
            </div>
          );
        }

        const ambientX = [0, 5 + (i % 3), 0, -4 - (i % 2), 0];
        const ambientY = [0, -7 - (i % 4), 0, 5 + (i % 3), 0];

        return (
          <motion.div
            key={i}
            className="absolute text-black/75"
            style={{ left: `${left}%`, top: `${top}%`, width: size }}
            initial={
              mode === "hero"
                ? {
                    opacity: 0,
                    x: i % 2 ? -90 - i * 10 : 90 + i * 10,
                    y: 24 + i * 7,
                    scale: 0.6,
                  }
                : { opacity: 0, x: 0, y: 10, scale: 0.75 }
            }
            animate={
              disperse
                ? {
                    opacity: [0.75, 0.65, 0],
                    y: -90 - i * 22,
                    x: i % 2 ? 70 + i * 12 : -70 - i * 12,
                    scale: [1, 0.9, 0.6],
                  }
                : mode === "splash"
                  ? {
                      opacity: [0, 0.85, 0.7],
                      x: i % 2 ? [0, -6, -18] : [0, 6, 18],
                      y: [10, -5, -18 - i * 3],
                      scale: [0.75, 1, 0.95],
                    }
                  : {
                      opacity: [0, 0.82, 0.62],
                      x: ambientX,
                      y: ambientY,
                      scale: 1,
                    }
            }
            transition={
              disperse
                ? { duration: 4.8 + i * 0.35, ease: "easeInOut", delay: i * 0.16 }
                : mode === "splash"
                  ? { duration: 2.3, ease: "easeOut", delay: 0.18 + i * 0.09 }
                  : {
                      duration: 8 + (i % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: mode === "hero" ? 0.15 + i * 0.12 : i * 0.3,
                    }
            }
          >
            <Bat className="w-full" />
          </motion.div>
        );
      })}
    </div>
  );
}
