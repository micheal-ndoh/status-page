import { Tolgee } from '@tolgee/web';
import en from '@/i18n/en.json';
import fr from '@/i18n/fr.json';
import de from '@/i18n/de.json';
import zh from '@/i18n/zh.json';
import es from '@/i18n/es.json';

// Create Tolgee instance
export const tolgee = Tolgee()
    .init({
        // Default language
        defaultLanguage: 'en',

        // Available languages
        availableLanguages: ['en', 'fr', 'de', 'zh', 'es'],

        // Local translations (prioritized)
        staticData: {
            en,
            fr,
            de,
            zh,
            es,
        },

        // Tolgee server configuration (fallback)
        apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'https://app.tolgee.io',
        apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,

        // Fallback to server if key not found locally
        fallbackLanguage: 'en',

        // Language persistence - only use localStorage in browser environment
        persistence: typeof window !== 'undefined' ? {
            type: 'localStorage',
            key: 'tolgee_language',
        } : undefined,

        // Language detection
        observerOptions: {
            observerType: 'text',
        },

        // Cache settings
        cache: {
            enabled: true,
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
    });

// Export the Tolgee instance
export default tolgee; 