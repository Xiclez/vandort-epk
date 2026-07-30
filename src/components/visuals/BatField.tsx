import { useRef } from "react";
import {
  motion,
  useInView,
} from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { Bat } from "./Bat";

interface BatFieldProps {
  count?: number;

  /**
   * Makes the bats fly away from the scene.
   * Intended for the final Booking section.
   */
  disperse?: boolean;

  /**
   * splash:
   * Bats gather around the logo and moon.
   *
   * hero:
   * A small, slow-moving flock behind the content.
   *
   * section:
   * A flock crosses once when the section enters the viewport.
   *
   * ambient:
   * Continuous subtle movement.
   */
  mode?: "ambient" | "splash" | "hero" | "section";

  className?: string;
}

/**
 * Reusable bat choreography.
 *
 * The outer motion element controls the trajectory.
 * The inner motion element controls the wing movement.
 */
export function BatField({
  count = 5,
  disperse = false,
  mode = "ambient",
  className = "",
}: BatFieldProps) {
  const reduced = useReducedMotionPreference();
  const containerRef = useRef<HTMLDivElement>(null);

  const inView = useInView(containerRef, {
    amount: 0.18,
    once: mode === "section" || disperse,
  });

  const bats = Array.from({
    length: count,
  });

  const shouldAnimate =
    mode === "section" || disperse
      ? inView
      : true;

  return (
    <div
      ref={containerRef}
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {bats.map((_, i) => {
        const heroLeft =
          5 + ((i * 79) % 88);

        const heroTop =
          8 + ((i * 43) % 62);

        const splashLeft =
          26 + ((i * 17) % 50);

        const splashTop =
          15 + ((i * 29) % 55);

        const sectionLeft =
          i % 2 === 0
            ? -12 - i * 4
            : 86 + i * 3;

        const sectionTop =
          14 + ((i * 31) % 66);

        const left =
          mode === "splash"
            ? splashLeft
            : mode === "section"
              ? sectionLeft
              : heroLeft;

        const top =
          mode === "splash"
            ? splashTop
            : mode === "section"
              ? sectionTop
              : heroTop;

        const size =
          mode === "splash"
            ? 42 + ((i * 17) % 52)
            : mode === "hero"
              ? 32 + ((i * 13) % 42)
              : mode === "section"
                ? 30 + ((i * 11) % 36)
                : 26 + ((i * 13) % 32);

        const visibleOpacity =
          mode === "splash"
            ? 0.88
            : mode === "hero"
              ? 0.66
              : 0.72;

        const batColor =
          i % 3 === 0
            ? "rgba(238, 233, 225, 0.88)"
            : "rgba(194, 190, 184, 0.76)";

        const ambientX = [
          0,
          12 + (i % 3) * 4,
          4,
          -10 - (i % 2) * 5,
          0,
        ];

        const ambientY = [
          0,
          -12 - (i % 4) * 3,
          -4,
          10 + (i % 3) * 3,
          0,
        ];

        if (reduced) {
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                color: batColor,
                opacity: 0.58,
                filter:
                  "drop-shadow(0 2px 3px rgba(0,0,0,0.95))",
              }}
            >
              <Bat className="h-auto w-full" />
            </div>
          );
        }

        return (
          <motion.div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              color: batColor,
              filter:
                "drop-shadow(0 3px 5px rgba(0,0,0,0.95)) drop-shadow(0 0 7px rgba(238,233,225,0.14))",
            }}
            initial={
              mode === "hero"
                ? {
                    opacity: 0,
                    x:
                      i % 2
                        ? -130 - i * 14
                        : 130 + i * 14,
                    y: 35 + i * 8,
                    scale: 0.55,
                    rotate: i % 2 ? -8 : 8,
                  }
                : mode === "section"
                  ? {
                      opacity: 0,
                      x: 0,
                      y: 20,
                      scale: 0.65,
                      rotate: i % 2 ? -10 : 10,
                    }
                  : {
                      opacity: 0,
                      x: 0,
                      y: 12,
                      scale: 0.72,
                    }
            }
            animate={
              !shouldAnimate
                ? {
                    opacity: 0,
                  }
                : disperse
                  ? {
                      opacity: [
                        visibleOpacity,
                        visibleOpacity * 0.8,
                        0,
                      ],
                      y: [
                        0,
                        -70 - i * 18,
                        -170 - i * 24,
                      ],
                      x:
                        i % 2
                          ? [
                              0,
                              55 + i * 14,
                              150 + i * 24,
                            ]
                          : [
                              0,
                              -55 - i * 14,
                              -150 - i * 24,
                            ],
                      scale: [
                        1,
                        0.88,
                        0.42,
                      ],
                      rotate:
                        i % 2
                          ? [0, 8, 20]
                          : [0, -8, -20],
                    }
                  : mode === "splash"
                    ? {
                        opacity: [
                          0,
                          visibleOpacity,
                          visibleOpacity * 0.82,
                        ],
                        x:
                          i % 2
                            ? [0, -12, -34]
                            : [0, 12, 34],
                        y: [
                          18,
                          -7,
                          -28 - i * 4,
                        ],
                        scale: [
                          0.72,
                          1,
                          0.94,
                        ],
                        rotate:
                          i % 2
                            ? [6, -3, -9]
                            : [-6, 3, 9],
                      }
                    : mode === "section"
                      ? {
                          opacity: [
                            0,
                            visibleOpacity,
                            visibleOpacity,
                            0,
                          ],
                          x:
                            i % 2 === 0
                              ? [
                                  0,
                                  35,
                                  70,
                                  125,
                                ]
                              : [
                                  0,
                                  -35,
                                  -70,
                                  -125,
                                ],
                          y: [
                            18,
                            -8 - i * 2,
                            -18 + i * 2,
                            -35,
                          ],
                          scale: [
                            0.65,
                            1,
                            0.92,
                            0.68,
                          ],
                          rotate:
                            i % 2 === 0
                              ? [
                                  -10,
                                  3,
                                  8,
                                  14,
                                ]
                              : [
                                  10,
                                  -3,
                                  -8,
                                  -14,
                                ],
                        }
                      : {
                          opacity: [
                            0,
                            visibleOpacity,
                            visibleOpacity * 0.82,
                            visibleOpacity,
                          ],
                          x: ambientX,
                          y: ambientY,
                          scale: [
                            0.78,
                            1,
                            0.94,
                            1,
                          ],
                          rotate:
                            i % 2
                              ? [0, -5, 3, 0]
                              : [0, 5, -3, 0],
                        }
            }
            transition={
              disperse
                ? {
                    duration: 4.2 + i * 0.28,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.12,
                  }
                : mode === "splash"
                  ? {
                      duration: 2.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.12 + i * 0.08,
                    }
                  : mode === "section"
                    ? {
                        duration: 4.4 + i * 0.18,
                        ease: "easeInOut",
                        delay: i * 0.09,
                      }
                    : {
                        duration: 8.5 + (i % 4),
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay:
                          mode === "hero"
                            ? 0.18 + i * 0.12
                            : i * 0.26,
                      }
            }
          >
            <motion.div
              className="origin-center"
              animate={{
                scaleY: [
                  1,
                  0.48,
                  1,
                  0.62,
                  1,
                ],
                scaleX: [
                  1,
                  0.92,
                  1,
                  0.95,
                  1,
                ],
              }}
              transition={{
                duration:
                  0.34 + (i % 3) * 0.05,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.04,
              }}
            >
              <Bat className="h-auto w-full" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}