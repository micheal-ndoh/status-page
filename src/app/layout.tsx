"use client";

import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import theme from "@/theme";

const inter = Inter({ subsets: ["latin"] });

// Metadata is handled in the page components

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
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
      </body>
    </html>
  );
}
