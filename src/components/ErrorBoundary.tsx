"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, Button, VStack, Code } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.900"
          color="white"
          p={8}
        >
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Text fontSize="2xl" fontWeight="bold">
              Something went wrong
            </Text>
            <Text fontSize="lg" color="gray.300">
              {this.state.error?.message || 'An unexpected error occurred'}
            </Text>
            <Button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              colorScheme="blue"
              size="lg"
            >
              Reload Page
            </Button>
            <Box
              as="details"
              textAlign="left"
              maxW="600px"
              w="full"
              bg="gray.800"
              p={4}
              borderRadius="md"
            >
              <Text as="summary" cursor="pointer" mb={2}>
                Error Details
              </Text>
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" fontWeight="bold">Error Message:</Text>
                <Code fontSize="xs" whiteSpace="pre-wrap" w="full">
                  {this.state.error?.message}
                </Code>
                <Text fontSize="sm" fontWeight="bold">Error Stack:</Text>
                <Code fontSize="xs" whiteSpace="pre-wrap" w="full">
                  {this.state.error?.stack}
                </Code>
                {this.state.errorInfo && (
                  <>
                    <Text fontSize="sm" fontWeight="bold">Component Stack:</Text>
                    <Code fontSize="xs" whiteSpace="pre-wrap" w="full">
                      {this.state.errorInfo.componentStack}
                    </Code>
                  </>
                )}
              </VStack>
            </Box>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 