import React from "react";
import { Box, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

// Animation variants for framer-motion
const pulseVariants = {
  animate: {
    opacity: [0.3, 1, 0.3],
    scale: [0.8, 1.1, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface StatusLoadingProps {
  message?: string;
  variant?: "status" | "dashboard" | "auth";
}

export default function StatusLoading({
  message = "Checking system status...",
  variant = "status",
}: StatusLoadingProps) {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const iconColor = useColorModeValue("brand.500", "brand.400");

  const getStatusIcons = () => {
    const icons = [
      { Icon: CheckCircleIcon, color: "green.500", delay: 0 },
      { Icon: ExclamationTriangleIcon, color: "orange.500", delay: 0.2 },
      { Icon: XCircleIcon, color: "red.500", delay: 0.4 },
      { Icon: ClockIcon, color: "blue.500", delay: 0.6 },
    ];

    return icons.map(({ Icon, color, delay }, index) => (
      <MotionBox
        key={index}
        as={Icon}
        className="w-8 h-8"
        color={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.1, 0.8],
          rotate: variant === "status" ? [0, 360] : [0, 0],
        }}
        transition={{
          duration: 2,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ));
  };

  const getLoadingMessage = () => {
    switch (variant) {
      case "dashboard":
        return "Loading dashboard...";
      case "auth":
        return "Authenticating...";
      default:
        return message;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box
      minH="100vh"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        textAlign="center"
      >
        <VStack spacing={6}>
          {/* Animated Status Icons */}
          <MotionBox
            variants={itemVariants}
            display="flex"
            gap={4}
            justifyContent="center"
            alignItems="center"
          >
            {getStatusIcons()}
          </MotionBox>

          {/* Loading Message */}
          <MotionBox variants={itemVariants}>
            <Text fontSize="xl" fontWeight="medium" color={textColor}>
              {getLoadingMessage()}
            </Text>
          </MotionBox>

          {/* Animated Dots */}
          <MotionBox
            variants={itemVariants}
            display="flex"
            gap={2}
            justifyContent="center"
          >
            {[0, 1, 2].map((index) => (
              <MotionBox
                key={index}
                w={2}
                h={2}
                borderRadius="full"
                bg={iconColor}
                variants={pulseVariants}
                animate="animate"
                transition={{
                  delay: index * 0.2,
                }}
              />
            ))}
          </MotionBox>

          {/* Contextual Subtitle */}
          <MotionBox variants={itemVariants}>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.500")}
              maxW="md"
              textAlign="center"
            >
              {variant === "status" && "Monitoring services and incidents..."}
              {variant === "dashboard" &&
                "Preparing your dashboard overview..."}
              {variant === "auth" && "Verifying your credentials..."}
            </Text>
          </MotionBox>
        </VStack>
      </MotionBox>
    </Box>
  );
}
