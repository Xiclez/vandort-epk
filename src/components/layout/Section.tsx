import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  ariaLabel: string;
  children: ReactNode;
  /** Optional vertical side label (editorial detail). */
  sideLabel?: string;
  className?: string;
}

/** Semantic section wrapper with consistent vertical rhythm + shell width. */
export function Section({
  id,
  ariaLabel,
  children,
  sideLabel,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative scroll-mt-24 py-24 md:py-32 ${className}`}
    >
      {sideLabel && (
        <span
          className="font-meta pointer-events-none absolute left-2 top-1/2 hidden -translate-y-1/2 -rotate-90 text-muted/50 md:block"
          aria-hidden="true"
        >
          {sideLabel}
        </span>
      )}
      <div className="section-shell">{children}</div>
    </section>
  );
}
