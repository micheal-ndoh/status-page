import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { TolgeeProvider } from "@/components/TolgeeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import theme from "@/theme";
import ClientProviders from "@/components/ClientProviders";

// Metadata is handled in the page components
// Force deployment to pick up hydration fixes

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
          <ClientProviders>
            {children}
          </ClientProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
