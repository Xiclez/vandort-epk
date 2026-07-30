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
export interface Appearance {
  event: string;
  detail: Localized;
  city: string;
}

export const appearances: Appearance[] = [
  { event: "Éter", detail: { es: "DJ Set", en: "DJ Set" }, city: "Saltillo" },
  { event: "Vamp Noir", detail: { es: "DJ Set", en: "DJ Set" }, city: "Monterrey" },
  { event: "Summerween", detail: { es: "DJ Set", en: "DJ Set" }, city: "Cancún" },
  { event: "Last Dark Dance", detail: { es: "DJ Set", en: "DJ Set" }, city: "CDMX" },
  { event: "World Goth Day", detail: { es: "DJ Set", en: "DJ Set" }, city: "Cancún" },
  { event: "Xmachinas", detail: { es: "DJ Set", en: "DJ Set" }, city: "Cancún" },
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
  manager: "[BOOKING MANAGER]",
  email: "[BOOKING EMAIL]",
  whatsapp: "[WHATSAPP NUMBER]",
  city: "[BASE CITY]",
  social: {
    instagram: "[INSTAGRAM URL]",
    soundcloud: "[SOUNDCLOUD URL]",
    youtube: "[YOUTUBE URL]",
  },
} as const;
