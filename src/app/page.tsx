"use client";

import { Box } from "@chakra-ui/react";
import AnimatedHero from "@/components/AnimatedHero";
import GlassmorphismNavbar from "@/components/GlassmorphismNavbar";
import FeaturesSection from "@/components/FeaturesSection";
import GamePreviewSection from "@/components/GamePreviewSection";

// Force dynamic rendering to avoid SSR issues with translations
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <Box>
      <GlassmorphismNavbar />
      <AnimatedHero />
      <FeaturesSection />
      <GamePreviewSection />
    </Box>
  );
}
