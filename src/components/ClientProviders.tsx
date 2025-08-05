"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { TranslationProvider } from "@/contexts/TranslationContext";
import theme from "@/theme";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <TranslationProvider>
      <SessionProvider
        refetchInterval={0}
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
      >
        <ChakraProvider theme={theme}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            }}
          />
        </ChakraProvider>
      </SessionProvider>
    </TranslationProvider>
  );
}