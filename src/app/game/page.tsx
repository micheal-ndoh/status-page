"use client";

import { Box } from "@chakra-ui/react";
import Navigation from "@/components/Navigation";
import StatusGame from "@/components/StatusGame";

export default function GamePage() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation variant="status" />
      <StatusGame />
    </Box>
  );
} 