# Tolgee Internationalization (i18n) Integration

This document describes the Tolgee integration for internationalization in the Prism Status Page application.

## Overview

The application now uses **Tolgee** for internationalization with the following features:

- **Local JSON files** as the primary translation source
- **Tolgee server** as a fallback for missing translations
- **English (en)** as the default language
- **5 supported languages**: English, French, German, Chinese, Spanish
- **Dynamic language switching** with persistence
- **Type-safe translation keys**

## Setup

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Tolgee Configuration
NEXT_PUBLIC_TOLGEE_API_URL=https://app.tolgee.io
NEXT_PUBLIC_TOLGEE_API_KEY=your_tolgee_api_key_here
```

### 2. Dependencies

The following packages are installed:

```bash
npm install @tolgee/react @tolgee/web
```

## Architecture

### File Structure

```
src/
├── lib/
│   └── tolgee.ts              # Tolgee configuration
├── components/
│   ├── TolgeeProvider.tsx     # Tolgee provider wrapper
│   └── LanguageSwitcher.tsx   # Language switcher component
├── hooks/
│   └── useTranslation.ts      # Custom translation hook
└── i18n/
    ├── en.json               # English translations
    ├── fr.json               # French translations (to be added)
    ├── de.json               # German translations (to be added)
    ├── zh.json               # Chinese translations (to be added)
    ├── es.json               # Spanish translations (to be added)
    └── index.ts              # Translation utilities
```

### Key Components

#### 1. Tolgee Configuration (`src/lib/tolgee.ts`)

```typescript
import { Tolgee } from '@tolgee/web';
import en from '@/i18n/en.json';

export const tolgee = Tolgee()
  .init({
    defaultLanguage: 'en',
    availableLanguages: ['en', 'fr', 'de', 'zh', 'es'],
    staticData: {
      en,
      fr: {},
      de: {},
      zh: {},
      es: {},
    },
    apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
    apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
    fallbackLanguage: 'en',
  });
```

#### 2. Tolgee Provider (`src/components/TolgeeProvider.tsx`)

Wraps the application with Tolgee context:

```typescript
import { TolgeeProvider as TolgeeProviderBase } from '@tolgee/react';
import { tolgee } from '@/lib/tolgee';

export function TolgeeProvider({ children }) {
  return (
    <TolgeeProviderBase tolgee={tolgee}>
      {children}
    </TolgeeProviderBase>
  );
}
```

#### 3. Custom Translation Hook (`src/hooks/useTranslation.ts`)

Provides a simplified interface for translations:

```typescript
import { useTranslate } from '@tolgee/react';
import { TranslationKey } from '@/i18n';

export function useTranslation() {
  const { t, isLoading, error } = useTranslate();

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  return { t: translate, isLoading, error };
}
```

#### 4. Language Switcher (`src/components/LanguageSwitcher.tsx`)

Provides a dropdown for language selection with flags and names.

## Usage

### 1. Using Translations in Components

```typescript
import { useTranslation } from '@/hooks/useTranslation';

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('homepage.hero.title')}</h1>
      <p>{t('homepage.hero.subtitle')}</p>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### 2. Translation Keys Structure

Translation keys follow a hierarchical structure:

```json
{
  "common": {
    "loading": "Loading...",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "homepage": {
    "hero": {
      "title": "MONITOR EVERYTHING",
      "subtitle": "Real-time monitoring with intelligent detection and instant alerts"
    }
  },
  "auth": {
    "signin": {
      "title": "Welcome to Prism! ✨",
      "subtitle": "Sign in to access your dashboard and manage your services",
      "emailPlaceholder": "Enter your email address"
    }
  }
}
```

### 3. Adding New Languages

1. Create a new JSON file in `src/i18n/` (e.g., `fr.json`)
2. Add the language to the `availableLanguages` array in `src/lib/tolgee.ts`
3. Add the language data to the `staticData` object
4. Update the `TranslationKey` type in `src/i18n/index.ts`

### 4. Adding New Translation Keys

1. Add the key to `src/i18n/en.json`
2. Update the `TranslationKey` type in `src/i18n/index.ts`
3. Add translations for other languages

## Features

### ✅ Implemented

- [x] Local JSON file support (prioritized)
- [x] Tolgee server fallback
- [x] Language switcher component
- [x] Type-safe translation keys
- [x] Dynamic language switching
- [x] Loading states
- [x] Error handling
- [x] Integration with existing components
- [x] Demo page (`/i18n-demo`)

### 🔄 In Progress

- [ ] French translations (`fr.json`)
- [ ] German translations (`de.json`)
- [ ] Chinese translations (`zh.json`)
- [ ] Spanish translations (`es.json`)

### 📋 Planned

- [ ] Translation management interface
- [ ] Over-the-air updates
- [ ] Translation memory
- [ ] Pluralization support
- [ ] Date/time localization
- [ ] Number formatting

## Demo

Visit `/i18n-demo` to see the internationalization features in action:

- Language switching
- Translation examples
- Real-time updates
- Type-safe key usage

## Troubleshooting

### Common Issues

1. **Translation key not found**: Check if the key exists in `en.json` and is properly typed
2. **Language not switching**: Ensure the language is added to `availableLanguages`
3. **Tolgee server errors**: Check API key and URL configuration

### Debug Mode

Enable debug mode by setting:

```typescript
// In src/lib/tolgee.ts
observerOptions: {
  observerType: 'text',
},
```

## Next Steps

1. **Add missing language files**: Create `fr.json`, `de.json`, `zh.json`, `es.json`
2. **Translate content**: Populate all language files with translations
3. **Test thoroughly**: Verify translations work across all components
4. **Deploy**: Ensure environment variables are set in production

## Resources

- [Tolgee Documentation](https://tolgee.io/docs)
- [Tolgee React Integration](https://tolgee.io/docs/web/using_with_react)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing) 