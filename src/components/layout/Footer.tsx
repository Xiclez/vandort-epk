import {
  ArrowUp,
  Instagram,
  Music2,
  Youtube,
} from "lucide-react";
import { artist } from "../../content/artistData";
import { artistLinks } from "../../content/artistLinks";
import { useLanguage } from "../../context/LanguageContext";
import { ArtistLogo } from "../ui/ArtistLogo";
import { LanguageToggle } from "../ui/LanguageToggle";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: Instagram,
      label: t.booking.instagramLabel,
      href: artistLinks.instagram,
    },
    {
      icon: Music2,
      label: t.booking.soundcloudLabel,
      href: artistLinks.soundcloud,
    },
    {
      icon: Youtube,
      label: t.booking.youtubeLabel,
      href: artistLinks.youtube,
    },
  ];

  return (
    <footer className="relative z-20 border-t border-line bg-elevated">
      <div className="section-shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href="#hero"
            className="inline-flex items-center"
            aria-label={`${artist.name} — ${t.nav.backToTop}`}
          >
            <ArtistLogo
              decorative
              className="w-[6.25rem] md:w-[7.5rem]"
              imageClassName="opacity-90 transition-opacity hover:opacity-100"
            />
          </a>

          <p className="font-meta mt-4 max-w-sm text-muted">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(
            ({
              icon: Icon,
              label,
              href,
            }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-colors hover:border-blood hover:bg-blood hover:text-bone"
                aria-label={`${label} de ${artist.name}`}
                title={label}
              >
                <Icon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            ),
          )}

          <a
            href="#hero"
            className="flex h-11 w-11 items-center justify-center border border-line text-bone transition-colors hover:border-blood hover:bg-blood"
            aria-label={t.nav.backToTop}
            title={t.nav.backToTop}
          >
            <ArrowUp
              className="h-4 w-4"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div className="section-shell flex flex-col gap-4 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
        <p className="font-meta text-muted">
          © {year} {artist.name}.{" "}
          {t.footer.rights}
        </p>

        <LanguageToggle />
      </div>
    </footer>
  );
}