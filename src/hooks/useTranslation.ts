"use client";

import { useTranslate, useTolgee } from '@tolgee/react';
import { TranslationKey } from '@/i18n';
import { useEffect, useState } from 'react';

export function useTranslation() {
  const [isClient, setIsClient] = useState(false);
  const { t, isLoading } = useTranslate();
  const tolgee = useTolgee();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    if (!isClient) {
      // Return the key as fallback during SSR
      return key;
    }

    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  const changeLanguage = (language: string) => {
    if (isClient && tolgee) {
      tolgee.changeLanguage(language);
    }
  };

  const currentLanguage = isClient && tolgee ? tolgee.getLanguage() : 'en';

  return {
    t: translate,
    isLoading: !isClient || isLoading,
    changeLanguage,
    currentLanguage,
  };
} 