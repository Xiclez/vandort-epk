import { motion } from "framer-motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { fadeUp, viewportOnce } from "../../lib/motion";

interface SectionHeadingProps {
  index: number;
  title: string;
  intro?: string;
}

/** Editorial section heading with monospaced section numbering. */
export function SectionHeading({
  index,
  title,
  intro,
}: SectionHeadingProps) {
  const reduced = useReducedMotionPreference();
  const num = String(index).padStart(2, "0");

  return (
    <motion.header
      className="mb-12 md:mb-16"
      variants={fadeUp(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <div className="mb-4 flex items-center gap-4">
        <span className="font-meta text-blood-bright">
          {num}
        </span>

        <span
          className="h-px w-16 bg-line"
          aria-hidden="true"
        />
      </div>

      <h2 className="font-gothic text-5xl font-semibold leading-[0.9] tracking-[-0.025em] text-bone md:text-7xl lg:text-8xl">
        {title}
      </h2>

      {intro && (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {intro}
        </p>
      )}
    </motion.header>
  );
}