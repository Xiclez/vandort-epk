/**
 * Editable structural data for VANDORT.
 * ------------------------------------------------------------------
 * PLACEHOLDER MODE: when true, media placeholders show their asset-slot
 * labels and disabled links are flagged as needing replacement.
 * Set to false before production.
 */
export const SHOW_PLACEHOLDER_LABELS = true;

import type { Language } from "./translations";

/** A short label that differs per language. */
export type Localized = Record<Language, string>;

export const artist = {
  name: "VANDORT",
  /** Nav section ids, in scroll order. Copy for each label lives in translations.nav. */
  sections: [
    { id: "hero", key: "home" },
    { id: "about", key: "artist" },
    { id: "sound", key: "sound" },
    { id: "live", key: "experience" },
    { id: "mixes", key: "mixes" },
    { id: "gallery", key: "gallery" },
    { id: "appearances", key: "appearances" },
    { id: "rider", key: "rider" },
    { id: "booking", key: "booking" },
  ] as const,
};

/** Featured mixes. All URLs are placeholders — replace before production. */
export interface Mix {
  title: string;
  mood: Localized;
  duration: string; // placeholder timestamp
  platform: string;
  url: string; // placeholder
  assetSlot: string;
}

export const mixes: Mix[] = [
  {
    title: "Crystal Castles",
    mood: { es: "Darkwave · Goth club", en: "Darkwave · Goth club" },
    duration: "01:03:19",
    platform: "SoundCloud",
    url: "https://soundcloud.com/vandort-sadkronik/crystal-castles-set",
    assetSlot: "CRYSTAL-CASTLES-artwork", 
  },
  {
    title: "Tech House",
    mood: { es: "EDM · Electrónica", en: "EDM · Electronic" },
    duration: "47:32",
    platform: "SoundCloud",
    url: "https://soundcloud.com/vandort-sadkronik/techno1",
    assetSlot: "TECH HOUSE-artwork",
  },
  {
    title: "Neo Perreo",
    mood: { es: "Reggaeton", en: "Reggaeton" },
    duration: "53:31",
    platform: "SoundCloud",
    url: "https://soundcloud.com/vandort-sadkronik/neoperreo-1",
    assetSlot: "neoperreo-artwork",
  },
  {
    title: "Skins Party",
    mood: { es: "Varios", en: "Various" },
    duration: "01:52:17",
    platform: "SoundCloud",
    url: "https://soundcloud.com/vandort-sadkronik/skins-party-1",
    assetSlot: "SKINS PARTY-artwork",
  },
];

/**
 * Selected appearances.
 * NOTE: All venues, cities and (future) dates MUST be verified with the artist
 * before production. Do not add awards, attendance figures, or press quotes.
 */
export type AppearanceMediaType =
  | "image"
  | "video";

export interface AppearanceMedia {
  id: string;
  type: AppearanceMediaType;
  src: string;
  poster?: string;
  alt: Localized;

  /**
   * Optional ratio used to reserve video space before loading.
   * Examples: "16 / 9", "9 / 16", "4 / 5", "1 / 1".
   */
  aspectRatio?: string;
}

export interface Appearance {
  id: string;
  event: string;
  detail: Localized;
  city: string;
  media: AppearanceMedia[];
}

export const appearances: Appearance[] = [
  {
    id: "eter",
    event: "Éter",
    detail: {
      es: "23 Mayo 2026",
      en: "May 23rd 2026",
    },
    city: "Saltillo",
    media: [
      {
        id: "eter-photo-01",
        type: "image",
        src: "/media/appearances/eter/eter.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en Eter",
          en: "Photo of VANDORT performing at Eter",
        },
      },
      {
        id: "eter-vid-01",
        type: "video",
        src: "/media/appearances/eter/eter2.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en Eter",
          en: "Video of VANDORT performing at Eter",
        },
      },

      {
        id: "eter-photo-02",
        type: "image",
        src: "/media/appearances/eter/eter3.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en Eter",
          en: "Photo of VANDORT performing at Eter",
        },
      },

      {
        id: "eter-vid-02",
        type: "video",
        src: "/media/appearances/eter/eter4.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en Eter",
          en: "Video of VANDORT performing at Eter",
        },
      },
      {
        id: "eter-photo-03",
        type: "image",
        src: "/media/appearances/eter/eter5.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en Eter",
          en: "Photo of VANDORT performing at Eter",
        },
      },

    ],
  },
  {
    id: "vamp-noir",
    event: "Vamp Noir",
    detail: {
      es: "30 Mayo 2026",
      en: "May 30th 2026",
    },
    city: "Cancún",
    media: [

      {
        id: "wgd-video-01",
        type: "video",
        src: "/media/appearances/vampnoir/wgd2.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en WGD After Party",
          en: "Video of VANDORT performing at WGD After Party",
        },
      },
      {
        id: "wgd-video-02",
        type: "video",
        src: "/media/appearances/vampnoir/wgd3.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en WGD",
          en: "Video of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-02",
        type: "image",
        src: "/media/appearances/vampnoir/wgd4.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-video-03",
        type: "video",
        src: "/media/appearances/vampnoir/wgd5.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en WGD",
          en: "Video of VANDORT performing at WGD",
        },
      },
    ],
  },
  {
    id: "summerween",
    event: "Summerween",
    detail: {
      es: "30 Agosto 2025",
      en: "August 30th 2025",
    },
    city: "Monterrey",
    media: [{
      id: "sw-photo-01",
      type: "image",
      src: "/media/appearances/summerween/summerween.jpg",
      alt: {
        es: "Foto de VANDORT durante su presentación en Summerween",
        en: "Photo of VANDORT performing at Summerween",
      },
    },
    {
      id: "sw-vid-01",
      type: "video",
      src: "/media/appearances/summerween/summerween2.mp4",
      alt: {
        es: "Video de VANDORT durante su presentación en Summerween",
        en: "Video of VANDORT performing at Summerween",
      },
    },
    {
      id: "sw-vid-02",
      type: "video",
      src: "/media/appearances/summerween/summerween3.mp4",
      alt: {
        es: "Video de VANDORT durante su presentación en Summerween",
        en: "Video of VANDORT performing at Summerween",
      },
    },
    {
      id: "sw-vid-03",
      type: "video",
      src: "/media/appearances/summerween/summerween4.mp4",
      alt: {
        es: "Video de VANDORT durante su presentación en Summerween",
        en: "Video of VANDORT performing at Summerween",
      },
    },
    {
      id: "sw-vid-04",
      type: "video",
      src: "/media/appearances/summerween/summerween5.mp4",
      alt: {
        es: "Video de VANDORT durante su presentación en Summerween",
        en: "Video of VANDORT performing at Summerween",
      },
    },
  
  ],
  },
  {
    id: "last-dark-dance",
    event: "Last Dark Dance",
    detail: {
      es: "27 Diciembre 2025",
      en: "December 27th 2026",
    },
    city: "Monterrey",
    media: [
      {
        id: "tldd-vid-01",
        type: "video",
        src: "/media/appearances/tldd/tldd.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en The Last Dark Dance",
          en: "Video of VANDORT performing at The Last Dark Dance",
        },
      },
      {
        id: "tldd-photo-01",
        type: "image",
        src: "/media/appearances/tldd/tldd2.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en The Last Dark Dance",
          en: "Photo of VANDORT performing at The Last Dark Dance",
        },
      },
      {
        id: "tldd-vid-02",
        type: "video",
        src: "/media/appearances/tldd/tldd3.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en The Last Dark Dance",
          en: "Video of VANDORT performing at The Last Dark Dance",
        },
      },
      {
        id: "tldd-photo-02",
        type: "image",
        src: "/media/appearances/tldd/tldd4.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en The Last Dark Dance",
          en: "Photo of VANDORT performing at The Last Dark Dance",
        },
      },
      {
        id: "tldd-photo-03",
        type: "image",
        src: "/media/appearances/tldd/tldd5.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en The Last Dark Dance",
          en: "Photo of VANDORT performing at The Last Dark Dance",
        },
      },
    ],
  },
  {
    id: "world-goth-day",
    event: "World Goth Day",
    detail: {
      es: "30 Mayo 2026",
      en: "May 30th 2026",
    },
    city: "Cancún",
    media: [
      {
        id: "wgd-photo-01",
        type: "image",
        src: "/media/appearances/wgd/wgd.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-03",
        type: "image",
        src: "/media/appearances/wgd/wgd6.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-04",
        type: "image",
        src: "/media/appearances/wgd/wgd7.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-05",
        type: "image",
        src: "/media/appearances/wgd/wgd8.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-06",
        type: "image",
        src: "/media/appearances/wgd/wgd9.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-07",
        type: "image",
        src: "/media/appearances/wgd/wgd10.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-video-04",
        type: "video",
        src: "/media/appearances/wgd/wgd11.mp4",
        alt: {
          es: "Video de VANDORT durante su presentación en WGD",
          en: "Video of VANDORT performing at WGD",
        },
      },
      {
        id: "wgd-photo-08",
        type: "image",
        src: "/media/appearances/wgd/wgs12.jpg",
        alt: {
          es: "Foto de VANDORT durante su presentación en WGD",
          en: "Photo of VANDORT performing at WGD",
        },
      },
    ],
  },
  {
    id: "xmachinas",
    event: "Xmachinas",
    detail: {
      es: "20 Septiembre 2025",
      en: "September 20th 2025",
    },
    city: "Cancún",
    media: [{
      id: "xmac-video-04",
      type: "video",
      src: "/media/appearances/xmac/xmac.mp4",
      alt: {
        es: "Video de VANDORT durante su presentación en XMACHINAS",
        en: "Video of VANDORT performing at XMACHINAS",
      },
    },],
  },
];

/** Editorial gallery slots — no real images at this stage. */
export interface GallerySlot {
  assetSlot: string;
  aspect: "portrait" | "landscape" | "square";
}

export const gallerySlots: GallerySlot[] = [
  { assetSlot: "gallery-editorial-portrait", aspect: "portrait" },
  { assetSlot: "gallery-live-booth", aspect: "landscape" },
  { assetSlot: "gallery-crowd", aspect: "landscape" },
  { assetSlot: "gallery-detail", aspect: "square" },
  { assetSlot: "gallery-backstage", aspect: "portrait" },
  { assetSlot: "gallery-venue", aspect: "landscape" },
];

/**
 * Booking + contact. Safe placeholder values — replace before production.
 * Do not turn these into live links until real values are provided.
 */
export const booking = {
  email: "booking@dj-vandort.com",
  whatsapp: "+52 998 246 3686",
  city: "Monterrey, N.L, MX",
  social: {
    instagram: "https://www.instagram.com/sadkronik",
    soundcloud: "https://soundcloud.com/vandort-sadkronik",
  },
} as const;
