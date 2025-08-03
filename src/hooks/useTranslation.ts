"use client";

import { useTranslate, useTolgee } from '@tolgee/react';
import { TranslationKey } from '@/i18n';

export function useTranslation() {
  const { t, isLoading } = useTranslate();
  const tolgee = useTolgee();

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    try {
      return t(key, params);
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  const changeLanguage = (language: string) => {
    tolgee.changeLanguage(language);
  };

  const currentLanguage = tolgee.getLanguage();

  return {
    t: translate,
    isLoading,
    changeLanguage,
    currentLanguage,
  };
} 