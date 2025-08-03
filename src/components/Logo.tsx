"use client";

import { Box, Image, Heading, HStack, useTheme } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "default" | "white";
}

export default function Logo({
  size = "md",
  showText = true,
  variant = "default",
}: LogoProps) {
  const theme = useTheme();
  const getLogoSize = () => {
    switch (size) {
      case "sm":
        return "90px";
      case "lg":
        return "120px";
      default:
        return "100px";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "sm":
        return "lg";
      case "lg":
        return "3xl";
      default:
        return "2xl";
    }
  };

  return (
    <HStack spacing={4}>
      <MotionBox
        w={getLogoSize()}
        h={getLogoSize()}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src="/Gemini_Generated_Image_ir9gbrir9gbrir9g__1_-removebg-preview.png"
          alt="Prism Logo"
          w="full"
          h="full"
          objectFit="contain"
        />
      </MotionBox>
      {showText && (
        <Heading
          size={getTextSize()}
          color={variant === "white" ? "white" : "brand.600"}
          fontWeight="black"
          fontFamily={theme.fonts.logo}
          letterSpacing="wider"
          textShadow={
            variant === "white"
              ? "2px 2px 4px rgba(0,0,0,0.3)"
              : "1px 1px 2px rgba(0,0,0,0.1)"
          }
        >
          Prism
        </Heading>
      )}
    </HStack>
  );
}
