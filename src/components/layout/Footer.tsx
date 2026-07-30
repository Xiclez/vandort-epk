import { ArrowUp, Instagram, Youtube, Music2 } from "lucide-react";
import { artist, booking } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { LanguageToggle } from "../ui/LanguageToggle";

/** Fixed reference year — no non-deterministic Date usage at module scope. */
export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Instagram, label: t.booking.instagramLabel, href: booking.social.instagram },
    { icon: Music2, label: t.booking.soundcloudLabel, href: booking.social.soundcloud },
    { icon: Youtube, label: t.booking.youtubeLabel, href: booking.social.youtube },
  ];

  return (
    <footer className="border-t border-line bg-elevated">
      <div className="section-shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display text-2xl tracking-ritual text-bone">
            {artist.name}
          </span>
          <p className="font-meta mt-2 text-muted">{t.footer.tagline}</p>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, label }) => (
            <span
              key={label}
              // Placeholder social — not a live link until real URLs are set.
              className="flex h-10 w-10 items-center justify-center border border-line text-muted"
              aria-label={`${label} (placeholder)`}
              title={label}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          ))}
          <a
            href="#hero"
            className="flex h-10 w-10 items-center justify-center border border-line text-bone transition-colors hover:border-blood"
            aria-label={t.nav.backToTop}
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="section-shell flex flex-col gap-3 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-meta text-muted">
          © {year} {artist.name}. {t.footer.rights}
        </p>
        <LanguageToggle />
      </div>
    </footer>
  );
}
