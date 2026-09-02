interface BatProps {
  className?: string;
  title?: string;
}

/**
 * Reusable inline SVG bat.
 *
 * Uses currentColor so its appearance can be controlled
 * from BatField without creating additional assets.
 */
export function Bat({
  className = "",
  title,
}: BatProps) {
  return (
    <svg
      viewBox="0 0 120 56"
      className={className}
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      {title ? <title>{title}</title> : null}

      <path
  d="
    M58 17
    C52 16 48 13 43 10
    C34 5 23 4 10 8
    C16 13 17 18 12 25
    C22 22 30 24 37 31
    C40 34 43 38 45 43
    C49 38 53 35 57 34
    L60 42
    L63 34
    C67 35 71 38 75 43
    C77 38 80 34 83 31
    C90 24 98 22 108 25
    C103 18 104 13 110 8
    C97 4 86 5 77 10
    C72 13 68 16 62 17
    C61 13 63 9 67 4
    C63 5 60 8 60 11
    C60 8 57 5 53 4
    C57 9 59 13 58 17
    Z
  "
  stroke="rgba(255, 255, 255, 0.12)"
  strokeWidth="1.3"
  strokeLinejoin="round"
  paintOrder="stroke fill"
  vectorEffect="non-scaling-stroke"
/>

<path
  d="
    M60 13
    C55 13 52 19 53 25
    C54 31 56 36 60 42
    C64 36 66 31 67 25
    C68 19 65 13 60 13
    Z
  "
  fill="currentColor"
  stroke="rgba(255, 255, 255, 0.1)"
  strokeWidth="1.1"
  paintOrder="stroke fill"
  vectorEffect="non-scaling-stroke"
/>
    </svg>
  );
}