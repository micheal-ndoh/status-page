"use client";

import { TranslationKey } from '@/i18n';
import { useState, useEffect } from 'react';
import en from '@/i18n/en.json';

export function useTranslation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    // Get the translation from the JSON file
    const keys = key.split('.');
    let value: any = en;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params[param]?.toString() || match;
      });
    }

    return value || key;
  };

  const changeLanguage = async (language: string) => {
    // For now, we only support English
    // This can be extended later to support multiple languages
    return language === 'en';
  };

  return {
    t: translate,
    isLoading: !isClient,
    changeLanguage,
    currentLanguage: 'en',
  };
}