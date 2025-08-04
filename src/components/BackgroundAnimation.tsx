"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMemo } from "react";

const MotionBox = motion(Box);

export default function BackgroundAnimation() {
  const bgColor = useColorModeValue(
    "rgba(173, 216, 230, 0.1)",
    "rgba(173, 216, 230, 0.05)"
  );
  const secondaryColor = useColorModeValue(
    "rgba(255, 182, 193, 0.1)",
    "rgba(255, 182, 193, 0.05)"
  );
  const accentColor = useColorModeValue(
    "rgba(255, 255, 224, 0.1)",
    "rgba(255, 255, 224, 0.05)"
  );

  // Generate consistent random values to prevent hydration mismatches
  const particleData = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${20 + Math.random() * 30}px`,
      height: `${20 + Math.random() * 30}px`,
      scale: 0.9 + Math.random() * 0.2,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      pointerEvents="none"
      zIndex={-1}
      overflow="hidden"
    >
      {/* Large background gradient */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        w="120vw"
        h="120vh"
        borderRadius="full"
        bg={useColorModeValue(
          "radial-gradient(circle, rgba(173, 216, 230, 0.1) 0%, rgba(255, 182, 193, 0.05) 50%, transparent 100%)",
          "radial-gradient(circle, rgba(173, 216, 230, 0.05) 0%, rgba(255, 182, 193, 0.02) 50%, transparent 100%)"
        )}
        transform="translate(-50%, -50%)"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small floating particles with precise positioning */}
      {particleData.map((particle, i) => (
        <MotionBox
          key={i}
          position="absolute"
          top={particle.top}
          left={particle.left}
          w={particle.width}
          h={particle.height}
          borderRadius="full"
          bg={[bgColor, secondaryColor, accentColor][i % 3]}
          transform={`scale(${particle.scale}) translate(-50%, -50%)`}
          mixBlendMode={["multiply", "screen", "overlay"][i % 3]}
          animate={{
            scale: [particle.scale, 1.5, particle.scale],
            rotate: [0, 180, 360],
            x: [0, particle.x, 0],
            y: [0, particle.y, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
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
        bg={useColorModeValue(
          "rgba(168, 85, 247, 0.08)",
          "rgba(168, 85, 247, 0.03)"
        )}
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

      {/* Floating geometric elements */}
      <MotionBox
        position="absolute"
        top="calc(25% - 0.25rem)"
        left="calc(75% + 0.125rem)"
        w="60px"
        h="60px"
        bg={secondaryColor}
        borderRadius="12px"
        transform="scale(0.88) translate(-50%, -50%)"
        mixBlendMode="screen"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [0.88, 1.2, 0.88],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="calc(30% - 0.375rem)"
        right="calc(20% + 0.0625rem)"
        w="40px"
        h="40px"
        bg={accentColor}
        borderRadius="8px"
        transform="scale(0.9) translate(50%, 50%)"
        mixBlendMode="multiply"
        animate={{
          scale: [0.9, 1.4, 0.9],
          rotate: [0, -180, -360],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle background patterns */}
      <MotionBox
        position="absolute"
        top="calc(10% - 0.125rem)"
        left="calc(10% - 0.0625rem)"
        w="200px"
        h="200px"
        borderRadius="full"
        bg={useColorModeValue(
          "rgba(173, 216, 230, 0.03)",
          "rgba(173, 216, 230, 0.01)"
        )}
        transform="scale(0.8) translate(-50%, -50%)"
        mixBlendMode="overlay"
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="calc(10% - 0.125rem)"
        right="calc(10% - 0.0625rem)"
        w="150px"
        h="150px"
        borderRadius="full"
        bg={useColorModeValue(
          "rgba(255, 182, 193, 0.03)",
          "rgba(255, 182, 193, 0.01)"
        )}
        transform="scale(0.85) translate(50%, 50%)"
        mixBlendMode="screen"
        animate={{
          scale: [0.85, 1.15, 0.85],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
}
