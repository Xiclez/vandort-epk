import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { LANGUAGES, type Language } from "../../content/translations";

/** EN / ES toggle. Visible on desktop and mobile; animates subtly on change. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1 font-meta ${className}`}
      role="group"
      aria-label="Language / Idioma"
    >
      {LANGUAGES.map((code: Language, i) => {
        const isActive = code === lang;
        return (
          <div key={code} className="flex items-center">
            {i > 0 && <span className="px-1 text-muted/50">/</span>}
            <button
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={isActive}
              aria-label={code === "es" ? "Español" : "English"}
              className={`relative px-1 transition-colors duration-300 ${
                isActive ? "text-bone" : "text-muted hover:text-bone"
              }`}
            >
              {code.toUpperCase()}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="lang-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-blood-bright"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        );
      })}
    </div>
  );
}
