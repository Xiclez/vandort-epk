/** Pure-CSS smoke/haze layer. No image assets. */
export function SmokeLayer({ className = "" }: { className?: string }) {
  return <div className={`smoke-layer ${className}`} aria-hidden="true" />;
}
