import type { ReactNode } from "react";
import { SHOW_PLACEHOLDER_LABELS } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";

interface PlaceholderButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  /** Marks the control as an intentional dev placeholder (disabled + hint). */
  placeholder?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const BASE =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-meta transition-colors duration-300 disabled:cursor-not-allowed";

const VARIANTS = {
  primary:
    "bg-blood text-bone hover:bg-blood-bright disabled:bg-blood/40 disabled:text-bone/50",
  secondary:
    "border border-line text-bone hover:border-blood hover:text-bone disabled:opacity-50",
  ghost: "text-muted hover:text-bone disabled:opacity-50",
} as const;

/**
 * Buttons that will eventually link/submit. While in placeholder mode they
 * are disabled and clearly labelled, so nothing broken is ever triggered.
 */
export function PlaceholderButton({
  children,
  variant = "primary",
  icon,
  placeholder = false,
  onClick,
  ariaLabel,
}: PlaceholderButtonProps) {
  const { lang } = useLanguage();
  const disabled = placeholder;
  const hint = lang === "es" ? "en desarrollo" : "in development";

  return (
    <button
      type="button"
      className={`${BASE} ${VARIANTS[variant]}`}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      title={disabled && SHOW_PLACEHOLDER_LABELS ? hint : undefined}
      onClick={disabled ? undefined : onClick}
    >
      {icon}
      <span>{children}</span>
      {disabled && SHOW_PLACEHOLDER_LABELS && (
        <span className="ml-1 text-[0.6rem] opacity-60">· {hint}</span>
      )}
    </button>
  );
}
