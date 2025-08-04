"use client";

import { useTolgee } from '@tolgee/react';
import { useEffect, useState } from 'react';

export function useTolgeeSafe() {
  const [isClient, setIsClient] = useState(false);
  const [isTolgeeAvailable, setIsTolgeeAvailable] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Try to use Tolgee, but provide fallbacks if it's not available
  let tolgeeInstance;
  try {
    tolgeeInstance = useTolgee();
    if (isClient && tolgeeInstance) {
      setIsTolgeeAvailable(true);
    }
  } catch (error) {
    // Tolgee is not available (likely during SSR)
    console.warn('Tolgee not available during SSR:', error);
  }

  // Create a safe wrapper for the t function
  const t = (key: string, params?: any) => {
    if (isTolgeeAvailable && tolgeeInstance?.t) {
      try {
        return tolgeeInstance.t(key, params);
      } catch (error) {
        console.warn(`Failed to translate key: ${key}`, error);
      }
    }
    
    // Fallback: return the key itself or a simple translation
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
  };

  // Create a safe wrapper for the getLanguage function
  const getLanguage = () => {
    if (isTolgeeAvailable && tolgeeInstance?.getLanguage) {
      try {
        return tolgeeInstance.getLanguage();
      } catch (error) {
        console.warn('Failed to get language:', error);
      }
    }
    return 'en'; // Default fallback
  };

  // Create a safe wrapper for the changeLanguage function
  const changeLanguage = async (language: string) => {
    if (isTolgeeAvailable && tolgeeInstance?.changeLanguage) {
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

  return {
    t,
    getLanguage,
    changeLanguage,
    isTolgeeAvailable,
    isClient,
  };
} 