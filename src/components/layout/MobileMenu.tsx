import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { artist } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { LanguageToggle } from "../ui/LanguageToggle";
import { ArtistLogo } from "../ui/ArtistLogo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string;
}

/** Full-screen accessible mobile navigation overlay. */
export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.openMenu}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/98 backdrop-blur-md md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <a
  href="#hero"
  onClick={onClose}
  aria-label={`${artist.name} — ${t.nav.home}`}
  className="flex items-center"
>
  <ArtistLogo
    decorative
    className="w-[8.5rem]"
  />
</a>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="flex h-10 w-10 items-center justify-center text-bone"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {artist.sections.map((s, i) => {
              const label = t.nav[s.key as keyof typeof t.nav];
              const active = activeId === s.id;
              return (
                <motion.a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={onClose}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-baseline gap-4 py-2 text-3xl uppercase ${
                    active ? "text-bone" : "text-muted"
                  }`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4 }}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="font-meta text-sm text-blood-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center justify-between border-t border-line px-6 py-6">
            <LanguageToggle className="text-base" />
            <a
              href="#booking"
              onClick={onClose}
              className="font-meta bg-blood px-5 py-3 text-bone"
            >
              {t.nav.bookingCta}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
