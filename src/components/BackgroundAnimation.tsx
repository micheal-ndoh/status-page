"use client";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";

const MotionBox = motion(Box);

export default function BackgroundAnimation() {
  const bgColor = useColorModeValue("rgba(168, 85, 247, 0.1)", "rgba(168, 85, 247, 0.05)");
  const secondaryColor = useColorModeValue("rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.05)");
  const accentColor = useColorModeValue("rgba(236, 72, 153, 0.1)", "rgba(236, 72, 153, 0.05)");
  const blendColor = useColorModeValue("rgba(168, 85, 247, 0.15)", "rgba(168, 85, 247, 0.08)");

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden" zIndex={-1}>
      {/* Instatus-style centered blend element */}
      <MotionBox
        position="absolute"
        top="calc(50% + 0.25rem)"
        left="calc(50% - 0.07rem)"
        w="full"
        h="full"
        opacity={0.42}
        mixBlendMode="color-dodge"
        transform="scale(0.97) translate(-50%, -50%)"
        bg={blendColor}
        borderRadius="full"
        animate={{
          scale: [0.97, 1.1, 0.97],
          opacity: [0.42, 0.6, 0.42],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large floating circles with precise positioning */}
      <MotionBox
        position="absolute"
        top="calc(10% + 0.5rem)"
        left="calc(10% - 0.25rem)"
        w="300px"
        h="300px"
        borderRadius="full"
        bg={bgColor}
        transform="scale(0.95) translate(-50%, -50%)"
        animate={{
          scale: [0.95, 1.2, 0.95],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        top="calc(60% + 0.75rem)"
        right="calc(15% - 0.5rem)"
        w="400px"
        h="400px"
        borderRadius="full"
        bg={secondaryColor}
        transform="scale(0.92) translate(50%, -50%)"
        animate={{
          scale: [0.92, 1.3, 0.92],
          rotate: [360, 180, 0],
          x: [0, -40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="calc(20% + 0.25rem)"
        left="calc(20% - 0.125rem)"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={accentColor}
        transform="scale(0.98) translate(-50%, 50%)"
        animate={{
          scale: [0.98, 1.1, 0.98],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium floating shapes with blend effects */}
      <MotionBox
        position="absolute"
        top="calc(30% + 0.375rem)"
        right="calc(30% - 0.25rem)"
        w="150px"
        h="150px"
        borderRadius="full"
        bg={bgColor}
        transform="scale(0.96) translate(50%, -50%)"
        mixBlendMode="multiply"
        animate={{
          scale: [0.96, 1.4, 0.96],
          rotate: [0, 360],
          x: [0, -20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="calc(40% + 0.5rem)"
        right="calc(10% - 0.125rem)"
        w="120px"
        h="120px"
        borderRadius="full"
        bg={secondaryColor}
        transform="scale(0.94) translate(50%, 50%)"
        mixBlendMode="screen"
        animate={{
          scale: [0.94, 1.2, 0.94],
          rotate: [360, 0],
          x: [0, 25, 0],
          y: [0, -35, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small floating particles with precise positioning */}
      {[...Array(8)].map((_, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top={`calc(${Math.random() * 100}% + ${Math.random() * 0.5}rem)`}
          left={`calc(${Math.random() * 100}% - ${Math.random() * 0.25}rem)`}
          w={`${20 + Math.random() * 30}px`}
          h={`${20 + Math.random() * 30}px`}
          borderRadius="full"
          bg={[bgColor, secondaryColor, accentColor][i % 3]}
          transform={`scale(${0.9 + Math.random() * 0.2}) translate(-50%, -50%)`}
          mixBlendMode={["multiply", "screen", "overlay"][i % 3]}
          animate={{
            scale: [0.9 + Math.random() * 0.2, 1.5, 0.9 + Math.random() * 0.2],
            rotate: [0, 180, 360],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Geometric shapes with blend modes */}
      <MotionBox
        position="absolute"
        top="calc(15% + 0.125rem)"
        right="calc(5% - 0.0625rem)"
        w="100px"
        h="100px"
        bg={accentColor}
        borderRadius="20px"
        transform="scale(0.93) translate(50%, -50%)"
        mixBlendMode="color-dodge"
        animate={{
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          scale: [0.93, 1.1, 0.93],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="calc(15% + 0.125rem)"
        left="calc(5% - 0.0625rem)"
        w="80px"
        h="80px"
        bg={bgColor}
        borderRadius="50%"
        transform="scale(0.91) translate(-50%, 50%)"
        mixBlendMode="multiply"
        animate={{
          scale: [0.91, 1.3, 0.91],
          rotate: [0, 360],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional blend elements for depth */}
      <MotionBox
        position="absolute"
        top="calc(50% - 0.5rem)"
        left="calc(50% + 0.25rem)"
        w="600px"
        h="600px"
        borderRadius="full"
        bg={useColorModeValue("rgba(168, 85, 247, 0.08)", "rgba(168, 85, 247, 0.03)")}
        transform="scale(0.85) translate(-50%, -50%)"
        mixBlendMode="overlay"
        animate={{
          scale: [0.85, 1.05, 0.85],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient overlay for depth with blend modes */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="radial(circle at 20% 80%, transparent 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%)"
        mixBlendMode="soft-light"
        pointerEvents="none"
      />

      {/* Additional radial gradient for enhanced depth */}
      <Box
        position="absolute"
        top="calc(50% - 0.25rem)"
        left="calc(50% + 0.125rem)"
        w="800px"
        h="800px"
        borderRadius="full"
        bgGradient="radial(circle, transparent 30%, rgba(168, 85, 247, 0.02) 70%, transparent 100%)"
        transform="scale(0.9) translate(-50%, -50%)"
        mixBlendMode="color-burn"
        pointerEvents="none"
      />
    </Box>
  );
} 