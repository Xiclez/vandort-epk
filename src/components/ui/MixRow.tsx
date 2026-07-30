import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Mix } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { fadeUp, viewportOnce } from "../../lib/motion";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

export function MixRow({ mix, index }: { mix: Mix; index: number }) {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotionPreference();

  const bars = Array.from({ length: 40 }, (_, i) =>
    30 + ((i * 37 + index * 11) % 70)
  );

  return (
    <motion.article
      className="group grid grid-cols-[auto_auto_1fr] items-center gap-4 border-b border-line py-6 md:grid-cols-[3rem_auto_1.4fr_1fr_auto] md:gap-8"
      variants={fadeUp(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      <span className="font-meta text-blood-bright md:text-center">
        {String(index + 1).padStart(2, "0")}
      </span>

      <img
        src={`/images/artwork/${mix.assetSlot}.webp`}
        alt={`${mix.title} artwork`}
        className="h-12 w-12 flex-none object-cover rounded-sm border border-line"
      />

      <div className="min-w-0">
        <h3 className="truncate text-xl text-bone md:text-2xl">{mix.title}</h3>
        <p className="font-meta mt-1 text-muted">{mix.mood[lang]}</p>
      </div>

      <div className="col-span-3 md:col-span-1">
        <div className="waveform" aria-hidden="true">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="transition-colors duration-500 group-hover:bg-blood/60"
            />
          ))}
        </div>
        <div className="font-meta mt-2 flex gap-4 text-muted">
          <span>
            {t.mixes.durationLabel}: {mix.duration}
          </span>
          <span>
            {t.mixes.platformLabel}: {mix.platform}
          </span>
        </div>
      </div>

      <div className="col-span-3 flex items-center justify-start md:col-span-1 md:justify-end">
        <a
          href={mix.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.mixes.playLabel}: ${mix.title}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-blood hover:text-bone"
        >
          <Play className="h-4 w-4 flex-none" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}