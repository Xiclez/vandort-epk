interface ArtistLogoProps {
    className?: string;
    imageClassName?: string;
    priority?: boolean;
    decorative?: boolean;
  }
  
  const ARTIST_LOGO_URL =
    "/images/vandort/vandort-logo.svg";
  
  export function ArtistLogo({
    className = "",
    imageClassName = "",
    priority = false,
    decorative = false,
  }: ArtistLogoProps) {
    return (
      <span
        className={`inline-flex items-center ${className}`}
      >
        <img
          src={ARTIST_LOGO_URL}
          alt={decorative ? "" : "VANDORT"}
          aria-hidden={decorative ? "true" : undefined}
          className={[
            "block h-auto w-full select-none",
            "mix-blend-screen",
            imageClassName,
          ].join(" ")}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      </span>
    );
  }