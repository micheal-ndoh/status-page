"use client";

import { useColorMode, IconButton, IconButtonProps, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon, SparklesIcon } from "@heroicons/react/24/outline";

const MotionIconButton = motion(IconButton);

export function ThemeToggle(props: Omit<IconButtonProps, "aria-label">) {
  const { colorMode, toggleColorMode } = useColorMode();

  const getIcon = () => {
    if (colorMode === "light") {
      return MoonIcon;
    }
    return SunIcon;
  };

  const getBgGradient = () => {
    if (colorMode === "light") {
      return "linear(to-r, purple.400, blue.500)";
    }
    return "linear(to-r, yellow.400, orange.500)";
  };

  const getHoverBgGradient = () => {
    if (colorMode === "light") {
      return "linear(to-r, purple.500, blue.600)";
    }
    return "linear(to-r, yellow.500, orange.600)";
  };

  return (
    <MotionIconButton
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      icon={<Icon as={getIcon()} />}
      onClick={toggleColorMode}
      bgGradient={getBgGradient()}
      color="white"
      _hover={{
        bgGradient: getHoverBgGradient(),
        transform: "scale(1.1) rotate(180deg)",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      whileHover={{
        scale: 1.1,
        rotate: 180,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(168, 85, 247, 0.4)",
          "0 0 0 10px rgba(168, 85, 247, 0)",
          "0 0 0 0 rgba(168, 85, 247, 0)",
        ],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      {...props}
    />
  );
}
