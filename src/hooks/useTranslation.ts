"use client";

import { TranslationKey, Locale, translations, defaultLocale } from '@/i18n';
import { useState, useEffect } from 'react';

export function useTranslation() {
  const [isClient, setIsClient] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('tolgee_language') as Locale;
      if (savedLanguage && savedLanguage in translations) {
        setCurrentLanguage(savedLanguage);
      }
    }
  }, []);

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    const translationData = translations[currentLanguage] || translations[defaultLocale];
    const keys = key.split('.');
    let value: any = translationData;

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

  const changeLanguage = async (language: Locale) => {
    if (language in translations) {
      setCurrentLanguage(language);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('tolgee_language', language);
      }
      
      return true;
    }
    
    return false;
  };

  return {
    t: translate,
    isLoading: !isClient,
    changeLanguage,
    currentLanguage,
  };
}