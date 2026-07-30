import type {
  MouseEventHandler,
  ReactNode,
} from "react";

interface PlaceholderButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";

  /**
   * Mantener en true solamente para acciones
   * que todavía no estén disponibles.
   */
  placeholder?: boolean;

  href?: string;
  external?: boolean;
  download?: boolean | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const SHOW_PLACEHOLDER_LABELS = true;

export function PlaceholderButton({
  children,
  icon,
  variant = "primary",
  placeholder = false,
  href,
  external = false,
  download,
  className = "",
  onClick,
  type = "button",
}: PlaceholderButtonProps) {
  const baseClass = [
    "font-meta inline-flex min-h-12 items-center justify-center gap-2",
    "px-5 py-3 text-center transition-colors",
    "focus-visible:outline focus-visible:outline-2",
    "focus-visible:outline-offset-4 focus-visible:outline-blood-bright",
    variant === "primary"
      ? "bg-blood text-bone hover:bg-blood-bright"
      : "border border-bone/25 bg-black/20 text-bone hover:border-blood hover:bg-blood/20",
    placeholder
      ? "cursor-not-allowed opacity-55"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && (
        <span
          className="shrink-0"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span>{children}</span>

      {placeholder &&
        SHOW_PLACEHOLDER_LABELS && (
          <span className="hidden text-[0.6rem] opacity-60 md:inline">
            · En desarrollo
          </span>
        )}
    </>
  );

  if (href && !placeholder) {
    return (
      <a
        href={href}
        className={baseClass}
        target={external ? "_blank" : undefined}
        rel={
          external
            ? "noopener noreferrer"
            : undefined
        }
        download={download}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClass}
      disabled={placeholder}
      onClick={onClick}
    >
      {content}
    </button>
  );
}