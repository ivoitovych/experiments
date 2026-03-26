/**
 * i18n configuration
 *
 * react-i18next is initialized here and imported once in main.tsx.
 * Components consume translations via the useTranslation() hook:
 *
 *   const { t } = useTranslation();
 *   <Typography>{t('landing.hero.title')}</Typography>
 *
 * Translation files live in public/locales/{lang}/translation.json.
 * The i18next-http-backend plugin loads them lazily at runtime,
 * which means each language file is only fetched when needed.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

void i18n
  // Load translation files from the /locales directory via HTTP
  .use(HttpBackend)
  // Detect user language from browser or localStorage
  .use(LanguageDetector)
  // Pass the i18n instance into react-i18next
  .use(initReactI18next)
  .init({
    // Fallback language when user's language is not available
    fallbackLng: 'en',
    // Default namespace (matches the filename: translation.json)
    defaultNS: 'translation',
    // Warn about missing keys during development
    debug: import.meta.env.DEV,
    interpolation: {
      // React already escapes values — disable i18next escaping to prevent double-escaping
      escapeValue: false,
    },
    backend: {
      // Translation files live in public/locales/{lang}/translation.json.
      // Vite serves the public/ directory as static assets (both in dev and prod).
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      // Order of language detection strategies
      order: ['localStorage', 'navigator'],
      // Key used to store the selected language in localStorage
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
