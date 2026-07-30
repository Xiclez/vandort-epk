import { motion, useScroll, useTransform } from "framer-motion";
import { BloodMoon } from "./BloodMoon";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

/**
 * One persistent moon for the complete page journey.
 * It moves between key sections instead of mounting multiple WebGL canvases.
 *
 * FUTURE SPLINE HOOK:
 * Replace <BloodMoon /> with the future Spline scene while preserving this
 * fixed wrapper and its scroll-driven motion values.
 */
export function MoonJourney() {
  const reduced = useReducedMotionPreference();
  const { scrollYProgress } = useScroll();

  const points = [
    0,
    0.08,
    0.18,
    0.3,
    0.48,
    0.6,
    0.69,
    0.8,
    0.88,
    0.94,
    1,
  ];
  const x = useTransform(
    scrollYProgress,
    points,
    reduced
      ? [
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
          "22vw",
        ]
      : [
          "31vw",
          "24vw",
          "-28vw",
          "-35vw",
          "22vw",
          "35vw",
          "-18vw",
          "-34vw",
          "0vw",
          "18vw",
          "22vw",
        ],
  );
  const y = useTransform(
    scrollYProgress,
    points,
    reduced
      ? [
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
          "-2vh",
        ]
      : [
          "-4vh",
          "10vh",
          "35vh",
          "-12vh",
          "38vh",
          "-18vh",
          "16vh",
          "42vh",
          "-10vh",
          "4vh",
          "-1vh",
        ],
  );
  const scale = useTransform(
    scrollYProgress,
    points,
    reduced
      ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      : [
          1.18,
          1.02,
          0.78,
          0.72,
          0.86,
          0.7,
          1.1,
          0.76,
          1.08,
          0.86,
          0.76,
        ],
  );
  const opacity = useTransform(
    scrollYProgress,
    points,
    reduced
      ? [
          0.36,
          0.36,
          0.16,
          0.08,
          0.1,
          0.08,
          0.18,
          0.08,
          0.24,
          0.26,
          0.2,
        ]
      : [
          0.86,
          0.5,
          0.16,
          0,
          0.14,
          0,
          0.58,
          0.05,
          0.62,
          0.54,
          0.42,
        ],
  );
  const rotate = useTransform(
    scrollYProgress,
    [
      0,
      0.8,
      0.88,
      0.94,
      1,
    ],
    reduced
      ? [0, 0, 0, 0, 0]
      : [0, 12, 20, 28, 34],
  );
  
  const ambientOpacity = useTransform(
    scrollYProgress,
    [
      0,
      0.12,
      0.3,
      0.62,
      0.78,
      0.88,
      0.94,
      1,
    ],
    reduced
      ? [
          0.16,
          0.1,
          0.02,
          0.06,
          0.02,
          0.14,
          0.16,
          0.1,
        ]
      : [
          0.22,
          0.1,
          0.02,
          0.08,
          0.02,
          0.16,
          0.2,
          0.12,
        ],
  );
  
  return (
    <>
      <motion.div
  className="pointer-events-none fixed left-1/2 top-1/2 z-[1] h-[clamp(16rem,38vw,38rem)] w-[clamp(16rem,38vw,38rem)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
  style={{ x, y, scale, opacity, rotate }}
  aria-hidden="true"
>
        <BloodMoon className="h-full w-full" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          opacity: ambientOpacity,
          background:
            "radial-gradient(55% 46% at 62% 48%, rgba(158,16,37,0.34), transparent 72%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
