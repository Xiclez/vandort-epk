/** Simple reusable inline-SVG bat silhouette. No image files. Easily replaceable. */
export function Bat({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 40"
      className={className}
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path d="M50 8c-3 6-8 9-14 8 2 3 2 7 0 10 5-2 9-1 12 3 3-4 7-5 12-3-2-3-2-7 0-10-6 1-11-2-14-8 0 0-2 4-6 4-3 0-4-3-4-3zM50 8c1-3 4-6 8-7-2 3-2 5-1 7-2-1-5-1-7 0zM50 8c-1-3-4-6-8-7 2 3 2 5 1 7 2-1 5-1 7 0zM12 12c-4-2-9-2-12 1 4 0 6 2 8 5 1-3 2-5 4-6zM88 12c4-2 9-2 12 1-4 0-6 2-8 5-1-3-2-5-4-6z" />
    </svg>
  );
}
