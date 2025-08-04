"use client";

import { useTranslate, useTolgee } from '@tolgee/react';
import { TranslationKey } from '@/i18n';
import { useEffect, useState } from 'react';

// Create a wrapper hook that safely handles Tolgee
function useTolgeeSafe() {
  const [isClient, setIsClient] = useState(false);
  const [translateInstance, setTranslateInstance] = useState<any>(null);
  const [tolgeeInstance, setTolgeeInstance] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only call Tolgee hooks if we're on the client and haven't set them yet
  if (isClient && !translateInstance && !tolgeeInstance) {
    try {
      const translate = useTranslate();
      const tolgee = useTolgee();
      setTranslateInstance(translate);
      setTolgeeInstance(tolgee);
    } catch (error) {
      console.warn('Tolgee not available:', error);
    }
  }

  return {
    isClient,
    translateInstance,
    tolgeeInstance,
  };
}

export function useTranslation() {
  const { isClient, translateInstance, tolgeeInstance } = useTolgeeSafe();

  const translate = (key: TranslationKey, params?: Record<string, string | number>) => {
    if (!isClient || !translateInstance) {
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
        'dashboard.title': 'Dashboard',
        'dashboard.overview': 'Monitor your services and incidents',
        'dashboard.recentActivity': 'Recent Activity',
        'dashboard.noRecentActivity': 'No recent activity',
        'services.statusOperational': 'Operational',
        'services.statusDegraded': 'Degraded',
        'services.statusMajor': 'Major Outage',
        'teams.membersCount': 'members',
      };

      return fallbackTranslations[key] || key;
    }

    try {
      return translateInstance.t(key, params) || key;
    } catch (error) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  };

  const changeLanguage = async (language: string) => {
    if (isClient && tolgeeInstance) {
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

  const currentLanguage = isClient && tolgeeInstance ? tolgeeInstance.getLanguage() : 'en';

  return {
    t: translate,
    isLoading: !isClient || !translateInstance,
    changeLanguage,
    currentLanguage,
  };
} 