"use client";

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

  return {
    t: translate,
    isLoading,
    error,
  };
} 