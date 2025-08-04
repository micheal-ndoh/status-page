"use client";

import { TolgeeProvider as TolgeeProviderBase } from '@tolgee/react';
import { tolgee } from '@/lib/tolgee';
import { ReactNode, useEffect, useState } from 'react';

interface TolgeeProviderProps {
  children: ReactNode;
}

export function TolgeeProvider({ children }: TolgeeProviderProps) {
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Tolgee on the client side
    const initTolgee = async () => {
      try {
        await tolgee.load();
        
        // Check if we're in a browser environment before accessing localStorage
        if (typeof window !== 'undefined') {
          const savedLanguage = localStorage.getItem('tolgee_language');
          if (savedLanguage && tolgee.getAvailableLanguages().includes(savedLanguage)) {
            await tolgee.changeLanguage(savedLanguage);
          } else {
            // Set default language if no saved language
            await tolgee.changeLanguage('en');
          }
        } else {
          // Server-side fallback
          await tolgee.changeLanguage('en');
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Tolgee:', error);
        // Fallback to default language on error
        try {
          await tolgee.changeLanguage('en');
          setIsInitialized(true);
        } catch (fallbackError) {
          console.error('Failed to set fallback language:', fallbackError);
          setIsInitialized(true); // Still mark as initialized to prevent infinite loading
        }
      }
    };

    initTolgee();
  }, []);

  // During SSR or before client hydration, render children without TolgeeProvider
  // This ensures consistent rendering between server and client
  if (!isClient || !isInitialized) {
    return <>{children}</>;
  }

  // Only render TolgeeProvider on the client side after initialization
  return (
    <TolgeeProviderBase tolgee={tolgee}>
      {children}
    </TolgeeProviderBase>
  );
} 