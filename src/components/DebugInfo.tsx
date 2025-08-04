"use client";

import { useEffect, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

export default function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
      hasLocalStorage: typeof localStorage !== 'undefined',
      hasSessionStorage: typeof sessionStorage !== 'undefined',
      envVars: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
        NEXT_PUBLIC_TOLGEE_API_URL: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
        NEXT_PUBLIC_TOLGEE_API_KEY: process.env.NEXT_PUBLIC_TOLGEE_API_KEY ? 'SET' : 'NOT SET',
      },
      timestamp: new Date().toISOString(),
    };

    setDebugInfo(info);
    console.log('Debug Info:', info);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      bg="black"
      color="white"
      p={4}
      borderRadius="md"
      fontSize="xs"
      maxW="300px"
      zIndex={9999}
    >
      <VStack align="start" spacing={2}>
        <Text fontWeight="bold">Debug Info</Text>
        <Text>Window: {debugInfo.windowSize}</Text>
        <Text>LocalStorage: {debugInfo.hasLocalStorage ? 'Yes' : 'No'}</Text>
        <Text>NEXTAUTH_URL: {debugInfo.envVars?.NEXTAUTH_URL || 'NOT SET'}</Text>
        <Text>NEXTAUTH_SECRET: {debugInfo.envVars?.NEXTAUTH_SECRET}</Text>
        <Text>TOLGEE_API_URL: {debugInfo.envVars?.NEXT_PUBLIC_TOLGEE_API_URL || 'NOT SET'}</Text>
        <Text>TOLGEE_API_KEY: {debugInfo.envVars?.NEXT_PUBLIC_TOLGEE_API_KEY}</Text>
      </VStack>
    </Box>
  );
} 