"use client";

import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );
  const iconColor = useColorModeValue(
    "rgba(0, 0, 0, 0.8)",
    "rgba(173, 216, 230, 1)"
  );

  return (
    <MotionIconButton
      aria-label="Toggle theme"
      icon={isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      onClick={toggleColorMode}
      size="md"
      borderRadius="full"
      backdropFilter="blur(20px)"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      color={iconColor}
      _hover={{
        bg: useColorModeValue("rgba(255, 255, 255, 0.2)", "rgba(0, 0, 0, 0.3)"),
        borderColor: useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(173, 216, 230, 0.6)"),
        transform: "scale(1.05)",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition="all 0.3s ease"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
    />
  );
};

export default ThemeToggle;
