"use client";

import { useTranslate, useTolgee } from '@tolgee/react';
import { TranslationKey } from '@/i18n';
import { useEffect, useState } from 'react';

export function useTranslation() {
  const [isClient, setIsClient] = useState(false);
  const [isTolgeeAvailable, setIsTolgeeAvailable] = useState(false);

  // Try to use Tolgee, but provide fallbacks if it's not available
  let translateInstance: any = null;
  let tolgeeInstance: any = null;

  try {
    translateInstance = useTranslate();
    tolgeeInstance = useTolgee();
    if (isClient && tolgeeInstance) {
      setIsTolgeeAvailable(true);
    }
  } catch (error) {
    // Tolgee is not available (likely during SSR)
    console.warn('Tolgee not available during SSR:', error);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    if (!isClient || !isTolgeeAvailable) {
      // Return fallback translations during SSR
      const fallbackTranslations: Record<string, string> = {
        'homepage.hero.title': 'Prism - Get ready for downtime',
        'homepage.hero.subtitle': 'Intelligent monitoring for modern infrastructure',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.error': 'An error occurred',
        'navigation.product': 'Product',
        'navigation.customers': 'Customers',
        'navigation.pricing': 'Pricing',
        'navigation.dashboard': 'Dashboard',
        'auth.signin.emailSent': 'Email sent successfully',
      };

      return fallbackTranslations[key] || key;
    }

    try {
      return translateInstance?.t(key, params) || key;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  const changeLanguage = async (language: string) => {
    if (isClient && isTolgeeAvailable && tolgeeInstance) {
      try {
        await tolgeeInstance.changeLanguage(language);
        return true;
      } catch (error) {
        console.warn('Failed to change language:', error);
        return false;
      }
    }
    return false;
  };

  const currentLanguage = isClient && isTolgeeAvailable && tolgeeInstance ? tolgeeInstance.getLanguage() : 'en';

  return {
    t: translate,
    isLoading: !isClient || !isTolgeeAvailable,
    changeLanguage,
    currentLanguage,
  };
} 