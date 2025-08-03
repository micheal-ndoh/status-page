"use client";

import { Box } from "@chakra-ui/react";
import AnimatedHero from "@/components/AnimatedHero";
import GlassmorphismNavbar from "@/components/GlassmorphismNavbar";
import FeaturesSection from "@/components/FeaturesSection";

export default function HomePage() {
  return (
    <Box>
      <GlassmorphismNavbar />
      <AnimatedHero />
      <FeaturesSection />
    </Box>
  );
}
