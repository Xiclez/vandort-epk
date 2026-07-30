import type { Variants } from "framer-motion";

/**
 * Reusable, atmospheric motion variants.
 * Slow and controlled — never bouncy. Durations 0.3s–0.9s.
 * Components pass a `reduced` flag to collapse motion to a simple fade.
 */

export const EASE_RITUAL = [0.16, 1, 0.3, 1] as const;

export const fadeUp = (reduced = false): Variants => ({
  hidden: { opacity: 0, y: reduced ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.2 : 0.7, ease: EASE_RITUAL },
  },
});

export const clipReveal = (reduced = false): Variants => ({
  hidden: {
    opacity: 0,
    clipPath: reduced ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: reduced ? 0.2 : 0.85, ease: EASE_RITUAL },
  },
});

export const stagger = (reduced = false): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.05 },
  },
});

/** Standard viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, amount: 0.35 } as const;
