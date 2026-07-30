import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { artist } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { useActiveSection } from "../../hooks/useActiveSection";
import { LanguageToggle } from "../ui/LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { ArtistLogo } from "../ui/ArtistLogo";

const SECTION_IDS = artist.sections.map((s) => s.id);

/** Floating dark navigation. Becomes more visible after leaving the hero. */
export function Navigation() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > window.innerHeight * 0.6);
  });

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <nav
          className="section-shell flex h-16 items-center justify-between md:h-20"
          aria-label="Primary"
        >
          <a
  href="#hero"
  className="flex shrink-0 items-center"
  aria-label={`${artist.name} — ${t.nav.home}`}
>
  <ArtistLogo
    decorative
    className="w-[7.8rem] md:w-[9.5rem]"
    imageClassName="transition-[filter,opacity] duration-300 hover:opacity-80"
  />
</a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {artist.sections.slice(1, -1).map((s) => {
              const active = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`font-meta transition-colors duration-300 ${
                      active ? "text-bone" : "text-muted hover:text-bone"
                    }`}
                  >
                    {t.nav[s.key as keyof typeof t.nav]}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 md:gap-6">
            <LanguageToggle />
            <a
              href="#booking"
              className="font-meta hidden border border-blood px-4 py-2 text-bone transition-colors hover:bg-blood md:inline-block"
            >
              {t.nav.bookingCta}
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-bone md:hidden"
              aria-label={t.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}
