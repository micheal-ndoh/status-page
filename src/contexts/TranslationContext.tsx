"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TranslationKey, Locale, translations, defaultLocale } from '@/i18n';

interface TranslationContextType {
  currentLanguage: Locale;
  changeLanguage: (language: Locale) => Promise<boolean>;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setIsClient(true);
    
    // Load saved language from localStorage
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
        console.warn(`Translation key not found: ${key} for language: ${currentLanguage}`);
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

  const contextValue: TranslationContextType = {
    currentLanguage,
    changeLanguage,
    t: translate,
    isLoading: !isClient,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}