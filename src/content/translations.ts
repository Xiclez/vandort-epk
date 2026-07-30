/**
 * Centralized bilingual copy for the VANDORT press kit.
 * Every visible string in the UI must be sourced from here.
 * Structural / placeholder data (asset slots, links, mixes) lives in artistData.ts.
 */

export type Language = "en" | "es";
export const LANGUAGES: Language[] = ["es", "en"];
export const DEFAULT_LANGUAGE: Language = "es";

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    home: string;
    artist: string;
    sound: string;
    experience: string;
    mixes: string;
    gallery: string;
    appearances: string;
    rider: string;
    booking: string;
    bookingCta: string;
    openMenu: string;
    closeMenu: string;
    backToTop: string;
  };
  splash: { tagline: string; loading: string };
  hero: {
    eyebrow: string;
    genreLine: string;
    statement: string;
    primaryCta: string;
    secondaryCta: string;
    scrollLabel: string;
    ritualLabel: string;
    rangeLabel: string;
    epkLabel: string;
  };
  about: {
    title: string;
    bio: string;
    principles: string[];
    quote: string;
  };
  sound: {
    title: string;
    intro: string;
    groups: { heading: string; items: string[] }[];
  };
  live: {
    title: string;
    description: string;
    attributes: string[];
  };
  mixes: {
    title: string;
    durationLabel: string;
    platformLabel: string;
    playLabel: string;
    cta: string;
    devNote: string;
  };
  gallery: { title: string; intro: string; closeLabel: string };
  appearances: {
    title: string;
    intro: string;
    verifyNote: string;
    galleryButton: string;
    closeGallery: string;
    enableSound: string;
    disableSound: string;
    noMedia: string;
  };
  rider: {
    title: string;
    intro: string;
    groups: { heading: string; items: string[] }[];
    downloadCta: string;
    note: string;
  };
  booking: {
    title: string;
    intro: string;
    managerLabel: string;
    emailLabel: string;
    whatsappLabel: string;
    cityLabel: string;
    instagramLabel: string;
    soundcloudLabel: string;
    youtubeLabel: string;
    primaryCta: string;
    secondaryCta: string;
    closing: string;
  };
  footer: { tagline: string; rights: string };
  common: { section: string; placeholderNote: string };
}

const es: Dictionary = {
  meta: {
    title: "VANDORT — Press Kit Oficial",
    description:
      "Press kit oficial de VANDORT, DJ y selector de darkwave, post-punk, electrónica, techno y open format.",
  },
  nav: {
    home: "Inicio",
    artist: "Artista",
    sound: "Sonido",
    experience: "Experiencia",
    mixes: "Sesiones",
    gallery: "Galería",
    appearances: "Trayectoria",
    rider: "Rider",
    booking: "Booking",
    bookingCta: "Solicitar booking",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backToTop: "Volver arriba",
  },
  splash: {
    tagline: "Después de la oscuridad, la señal despierta.",
    loading: "Cargando",
  },
  hero: {
    eyebrow: "DJ · SELECTOR · ARTISTA",
    genreLine: "DARKWAVE · POST-PUNK · ELECTRÓNICA · TECHNO · OPEN FORMAT",
    statement:
      "Atmósferas oscuras, emoción y energía para noches inolvidables.",
    primaryCta: "Escuchar sesiones",
    secondaryCta: "Solicitar booking",
    scrollLabel: "Desciende al ritual",
    ritualLabel: "Rituales nocturnos",
    rangeLabel: "Rango sonoro",
    epkLabel: "Press kit electrónico",
  },
  about: {
    title: "Acerca de VANDORT",
    bio: "VANDORT es un proyecto de música electrónica enfocado en construir experiencias inmersivas donde la oscuridad, la emoción y el ritmo se encuentran. Su propuesta transita entre distintos géneros sin perder una identidad propia, adaptándose a la pista, al espacio y al momento.",
    principles: ["Atmósfera", "Curaduría", "Emoción", "Versatilidad"],
    quote: "Cada set es un viaje. Cada noche, un ritual.",
  },
  sound: {
    title: "Universo sonoro",
    intro:
      "VANDORT no es exclusivamente un artista de techno: su universo abarca un espectro oscuro y versátil.",
    groups: [
      {
        heading: "Identidad central",
        items: [
          "Darkwave",
          "Post-punk",
          "Goth club",
          "Electrónica underground",
        ],
      },
      {
        heading: "Rango de pista",
        items: [
          "Indie dance",
          "Techno",
          "Tensión minimal y melódica",
          "Club edits",
          "Curaduría open format",
        ],
      },
      {
        heading: "Contextos ideales",
        items: [
          "Noches góticas",
          "Clubes alternativos",
          "Afterhours",
          "Eventos temáticos",
          "Eventos híbridos",
          "Club nights de formato abierto",
        ],
      },
    ],
  },
  live: {
    title: "Experiencia en vivo",
    description:
      "Cada presentación se construye según el contexto de la noche. VANDORT adapta la energía, la progresión y la selección sin abandonar su identidad.",
    attributes: [
      "Atmósfera inmersiva",
      "Lectura de pista",
      "Progresión curada",
      "Coherencia visual",
      "Adaptabilidad",
    ],
  },
  mixes: {
    title: "Sesiones destacadas",
    durationLabel: "Duración",
    platformLabel: "Plataforma",
    playLabel: "Reproducir",
    cta: "Ver todas las sesiones",
    devNote: "Enlace pendiente de reemplazar",
  },
  gallery: {
    title: "Presencia visual",
    intro:
      "Archivo editorial de la presencia escénica y visual de VANDORT.",
    closeLabel: "Cerrar",
  },
  appearances: {
    title: "Presentaciones seleccionadas",
    intro: "Una muestra de contextos y espacios recientes.",
    verifyNote:
      "Fechas, espacios y ciudades son de referencia y deben verificarse antes de producción.",
    galleryButton: "Ver galería",
    closeGallery: "Cerrar galería",
    enableSound: "Activar sonido",
    disableSound: "Silenciar video",
    noMedia:
      "La galería de esta presentación todavía no contiene archivos.",
  },
  rider: {
    title: "Rider técnico",
    intro: "Requerimientos base, fáciles de escanear para promotores.",
    groups: [
      {
        heading: "Setup",
        items: [
          "Pioneer DJ / AlphaTheta compatible",
          "CDJ-2000 / CDJ-3000",
          "Serie XDJ",
          "DJM-900 / DJM-V10",
          "Compatible con Rekordbox",
          "Setup estándar de club",
        ],
      },
      {
        heading: "Monitoreo",
        items: [
          "Monitores de cabina",
          "Cue de audífonos",
          "Suministro eléctrico estable",
        ],
      },
      {
        heading: "Adicional",
        items: [
          "Mesa de DJ estable",
          "Iluminación de cabina preferible",
          "Adaptable a las condiciones del venue",
        ],
      },
    ],
    downloadCta: "Descargar rider completo",
    note: "Los requerimientos técnicos son provisionales y deben confirmarse con el artista.",
  },
  booking: {
    title: "Booking y contacto",
    intro: "Disponible para clubes, colectivos y promotores.",
    managerLabel: "Manager de booking",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    cityLabel: "Ciudad base",
    instagramLabel: "Instagram",
    soundcloudLabel: "SoundCloud",
    youtubeLabel: "YouTube",
    primaryCta: "Consultar disponibilidad",
    secondaryCta: "Descargar recursos de prensa",
    closing: "Construyamos el próximo ritual.",
  },
  footer: {
    tagline: "Sonido · Atmósfera · Emoción",
    rights: "Todos los derechos reservados.",
  },
  common: {
    section: "Sección",
    placeholderNote: "Contenido de referencia",
  },
};

const en: Dictionary = {
  meta: {
    title: "VANDORT — Official Press Kit",
    description:
      "Official press kit for VANDORT, a DJ and selector spanning darkwave, post-punk, electronic music, techno, and open format.",
  },
  nav: {
    home: "Home",
    artist: "Artist",
    sound: "Sound",
    experience: "Experience",
    mixes: "Mixes",
    gallery: "Gallery",
    appearances: "Appearances",
    rider: "Rider",
    booking: "Booking",
    bookingCta: "Request booking",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
  },
  splash: {
    tagline: "After dark, the signal awakens.",
    loading: "Loading",
  },
  hero: {
    eyebrow: "DJ · SELECTOR · ARTIST",
    genreLine: "DARKWAVE · POST-PUNK · ELECTRONIC · TECHNO · OPEN FORMAT",
    statement: "Dark atmospheres, emotion, and energy for unforgettable nights.",
    primaryCta: "Listen to mixes",
    secondaryCta: "Request booking",
    scrollLabel: "Descend into the ritual",
    ritualLabel: "Rituals after dark",
    rangeLabel: "Sound range",
    epkLabel: "Electronic press kit",
  },
  about: {
    title: "About VANDORT",
    bio: "VANDORT is an electronic music project focused on building immersive experiences where darkness, emotion, and rhythm meet. His sound moves across different genres without losing its identity, adapting to the dancefloor, the space, and the moment.",
    principles: ["Atmosphere", "Curation", "Emotion", "Versatility"],
    quote: "Every set is a journey. Every night, a ritual.",
  },
  sound: {
    title: "Sound universe",
    intro:
      "VANDORT is not exclusively a techno artist — the sound spans a dark, versatile spectrum.",
    groups: [
      {
        heading: "Core identity",
        items: ["Darkwave", "Post-punk", "Goth club", "Underground electronic"],
      },
      {
        heading: "Dancefloor range",
        items: [
          "Indie dance",
          "Techno",
          "Minimal and melodic tension",
          "Club edits",
          "Open-format curation",
        ],
      },
      {
        heading: "Best fit",
        items: [
          "Goth nights",
          "Alternative clubs",
          "Afterhours",
          "Themed events",
          "Hybrid events",
          "Open-format club nights",
        ],
      },
    ],
  },
  live: {
    title: "Live experience",
    description:
      "Each performance is built around the context of the night. VANDORT adapts the energy, pacing, and selection without abandoning his identity.",
    attributes: [
      "Immersive atmosphere",
      "Dancefloor awareness",
      "Curated pacing",
      "Visual coherence",
      "Adaptability",
    ],
  },
  mixes: {
    title: "Featured mixes",
    durationLabel: "Duration",
    platformLabel: "Platform",
    playLabel: "Play",
    cta: "View all mixes",
    devNote: "Link pending replacement",
  },
  gallery: {
    title: "Visual presence",
    intro: "An editorial archive of VANDORT's stage and visual presence.",
    closeLabel: "Close",
  },
  appearances: {
    title: "Selected appearances",
    intro: "A sample of recent contexts and spaces.",
    verifyNote:
      "Dates, venues, and cities are for reference and must be verified before production.",
    galleryButton: "View gallery",
    closeGallery: "Close gallery",
    enableSound: "Enable sound",
    disableSound: "Mute video",
    noMedia:
      "The gallery for this appearance does not contain any files yet.",
  },
  rider: {
    title: "Technical rider",
    intro: "Base requirements, easy for promoters to scan.",
    groups: [
      {
        heading: "Setup",
        items: [
          "Pioneer DJ / AlphaTheta compatible",
          "CDJ-2000 / CDJ-3000",
          "XDJ series",
          "DJM-900 / DJM-V10",
          "Rekordbox-ready",
          "Standard club setup",
        ],
      },
      {
        heading: "Monitoring",
        items: ["Booth monitors", "Headphone cue", "Stable power supply"],
      },
      {
        heading: "Additional",
        items: [
          "Stable DJ table",
          "Booth lighting preferred",
          "Adaptable to venue conditions",
        ],
      },
    ],
    downloadCta: "Download full rider",
    note: "Technical requirements are placeholders and must be confirmed with the artist.",
  },
  booking: {
    title: "Booking and contact",
    intro: "Available for clubs, collectives, and promoters.",
    managerLabel: "Booking manager",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    cityLabel: "Base city",
    instagramLabel: "Instagram",
    soundcloudLabel: "SoundCloud",
    youtubeLabel: "YouTube",
    primaryCta: "Request availability",
    secondaryCta: "Download press assets",
    closing: "Let's create the next ritual.",
  },
  footer: {
    tagline: "Sound · Atmosphere · Emotion",
    rights: "All rights reserved.",
  },
  common: {
    section: "Section",
    placeholderNote: "Reference content",
  },
};

export const translations: Record<Language, Dictionary> = { es, en };
