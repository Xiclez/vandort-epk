import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  translations,
  type Dictionary,
  type Language,
} from "../content/translations";

const STORAGE_KEY = "vandort:lang";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "es") return saved;
  // Only fall back to browser language when there is no saved preference.
  const browser = window.navigator.language?.toLowerCase() ?? "";
  return browser.startsWith("en") ? "en" : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(detectInitialLanguage);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable — ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  // Keep document language + metadata in sync (no page reload).
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", translations[lang].meta.description);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: translations[lang] }),
    [lang, setLang, toggle]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
