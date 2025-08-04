"use client";

import { TolgeeProvider as TolgeeProviderBase } from '@tolgee/react';
import { tolgee } from '@/lib/tolgee';
import { ReactNode, useEffect, useState } from 'react';

interface TolgeeProviderProps {
  children: ReactNode;
}

export function TolgeeProvider({ children }: TolgeeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Tolgee and load persisted language
    const initTolgee = async () => {
      try {
        await tolgee.load();
        const savedLanguage = localStorage.getItem('tolgee_language');
        if (savedLanguage && tolgee.getAvailableLanguages().includes(savedLanguage)) {
          await tolgee.changeLanguage(savedLanguage);
        } else {
          // Set default language if no saved language
          await tolgee.changeLanguage('en');
        }
      } catch (error) {
        console.error('Failed to initialize Tolgee:', error);
        // Fallback to default language on error
        try {
          await tolgee.changeLanguage('en');
        } catch (fallbackError) {
          console.error('Failed to set fallback language:', fallbackError);
        }
      }
    };

    initTolgee();
  }, []);

  // Don't render TolgeeProvider until client-side
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <TolgeeProviderBase tolgee={tolgee}>
      {children}
    </TolgeeProviderBase>
  );
} 