"use client";

import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

export function ThemeToggle(props: Omit<IconButtonProps, "aria-label">) {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <MotionIconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      bg={useColorModeValue("white", "gray.800")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      color={useColorModeValue("gray.800", "white")}
      _hover={{
        bg: useColorModeValue("gray.50", "gray.700"),
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      {...props}
    />
  );
}
