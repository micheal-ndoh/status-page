import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import StatusLoading from "./StatusLoading";

export default function LoadingDemo() {
  const [currentVariant, setCurrentVariant] = useState<
    "status" | "dashboard" | "auth" | null
  >(null);
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const variants = [
    {
      key: "status" as const,
      label: "Status Page Loading",
      message: "Checking system status...",
    },
    {
      key: "dashboard" as const,
      label: "Dashboard Loading",
      message: "Loading dashboard...",
    },
    {
      key: "auth" as const,
      label: "Authentication Loading",
      message: "Authenticating...",
    },
  ];

  if (currentVariant) {
    return (
      <StatusLoading
        variant={currentVariant}
        message={variants.find((v) => v.key === currentVariant)?.message}
      />
    );
  }

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8} maxW="md" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Status Loading Component Demo
        </Text>
        <Text color="gray.600">
          Click on any button to see the different loading variants in action
        </Text>
        <VStack spacing={4} w="full">
          {variants.map((variant) => (
            <Button
              key={variant.key}
              size="lg"
              colorScheme="brand"
              w="full"
              onClick={() => setCurrentVariant(variant.key)}
            >
              {variant.label}
            </Button>
          ))}
        </VStack>
        <Text fontSize="sm" color="gray.500">
          Each variant shows different contextual messages and animations
        </Text>
      </VStack>
    </Box>
  );
}
