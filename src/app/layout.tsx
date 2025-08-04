"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { TolgeeProvider } from "@/components/TolgeeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import theme from "@/theme";

// Metadata is handled in the page components

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/Gemini_Generated_Image_ir9gbrir9gbrir9g__1_-removebg-preview.png"
        />
        <title>Prism - Get ready for downtime</title>
      </head>
      <body>
        <ErrorBoundary>
          <TolgeeProvider>
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
          </TolgeeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
