"use client";

import { Box, Circle } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);
const MotionCircle = motion(Circle);

interface Signal {
  id: string;
  x: number;
  y: number;
  color: string;
  shape: "square" | "triangle";
  size: number;
  detected: boolean;
}

const signalTypes = [
  { color: "red.500", shape: "square" as const },
  { color: "red.500", shape: "triangle" as const },
  { color: "orange.500", shape: "triangle" as const },
  { color: "green.500", shape: "triangle" as const },
  { color: "green.500", shape: "square" as const },
  { color: "orange.500", shape: "square" as const },
];

export default function RadarScanner() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [scanAngle, setScanAngle] = useState(0);
  const [scanRadius, setScanRadius] = useState(0);
  
  const radarColor = useColorModeValue("brand.500", "brand.400");
  const gridColor = useColorModeValue("gray.300", "gray.600");
  const bgColor = useColorModeValue("rgba(168, 85, 247, 0.1)", "rgba(168, 85, 247, 0.05)");

  // Generate random signals
  useEffect(() => {
    const generateSignal = () => {
      const signalType = signalTypes[Math.floor(Math.random() * signalTypes.length)];
      const angle = Math.random() * 360;
      const distance = 50 + Math.random() * 200; // Between 50px and 250px from center
      const x = Math.cos((angle * Math.PI) / 180) * distance;
      const y = Math.sin((angle * Math.PI) / 180) * distance;
      
      return {
        id: `signal-${Date.now()}-${Math.random()}`,
        x,
        y,
        color: signalType.color,
        shape: signalType.shape,
        size: 8 + Math.random() * 12, // 8-20px
        detected: false,
      };
    };

    // Generate initial signals
    const initialSignals = Array.from({ length: 6 }, generateSignal);
    setSignals(initialSignals);

    // Add new signals periodically
    const interval = setInterval(() => {
      setSignals(prev => [...prev, generateSignal()]);
    }, 8000); // New signal every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Radar scanning animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanAngle(prev => (prev + 2) % 360);
      setScanRadius(prev => {
        if (prev >= 300) return 0;
        return prev + 3;
      });
    }, 50); // 50ms for smooth scanning

    return () => clearInterval(scanInterval);
  }, []);

  // Check for signal detection
  useEffect(() => {
    const checkDetection = () => {
      setSignals(prev => prev.map(signal => {
        const signalAngle = Math.atan2(signal.y, signal.x) * (180 / Math.PI);
        const signalDistance = Math.sqrt(signal.x * signal.x + signal.y * signal.y);
        
        // Check if radar beam hits the signal
        const angleDiff = Math.abs(((signalAngle - scanAngle + 180) % 360) - 180);
        const isInBeam = angleDiff < 15; // 30-degree beam width
        const isInRange = Math.abs(signalDistance - scanRadius) < 20;
        
        if (isInBeam && isInRange && !signal.detected) {
          return { ...signal, detected: true };
        }
        return signal;
      }));
    };

    const detectionInterval = setInterval(checkDetection, 100);
    return () => clearInterval(detectionInterval);
  }, [scanAngle, scanRadius]);

  const renderShape = (signal: Signal) => {
    const commonProps = {
      position: "absolute" as const,
      left: `calc(50% + ${signal.x}px)`,
      top: `calc(50% + ${signal.y}px)`,
      transform: "translate(-50%, -50%)",
      size: `${signal.size}px`,
      bg: signal.color,
      opacity: signal.detected ? 1 : 0.3,
      transition: "all 0.3s ease",
    };

    if (signal.shape === "square") {
      return (
        <MotionBox
          key={signal.id}
          {...commonProps}
          w={`${signal.size}px`}
          h={`${signal.size}px`}
          borderRadius="sm"
          animate={signal.detected ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.8],
          } : {}}
          transition={{
            scale: { duration: 0.5, repeat: signal.detected ? Infinity : 0 },
            opacity: { duration: 0.3 },
          }}
        />
      );
    } else {
      return (
        <MotionBox
          key={signal.id}
          {...commonProps}
          w="0"
          h="0"
          borderStyle="solid"
          borderWidth={`0 ${signal.size / 2}px ${signal.size}px ${signal.size / 2}px`}
          borderColor={`transparent transparent ${signal.color} transparent`}
          bg="transparent"
          animate={signal.detected ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 1, 0.8],
          } : {}}
          transition={{
            scale: { duration: 0.5, repeat: signal.detected ? Infinity : 0 },
            opacity: { duration: 0.3 },
          }}
        />
      );
    }
  };

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden" zIndex={-1}>
      {/* Radar base */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="600px"
        h="600px"
        borderRadius="full"
        bg={bgColor}
        border="2px solid"
        borderColor={gridColor}
        opacity={0.3}
      />

      {/* Radar grid circles */}
      {[1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={`${i * 100}px`}
          h={`${i * 100}px`}
          borderRadius="full"
          border="1px solid"
          borderColor={gridColor}
          opacity={0.2}
        />
      ))}

      {/* Radar crosshairs */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="600px"
        h="2px"
        bg={gridColor}
        opacity={0.3}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="2px"
        h="600px"
        bg={gridColor}
        opacity={0.3}
      />

      {/* Radar scanning beam */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        w="300px"
        h="300px"
        borderRadius="full"
        bgGradient={`conic(from ${scanAngle}deg, ${radarColor}40 0deg, transparent 30deg, transparent 360deg)`}
        transform="translate(-50%, -50%)"
        opacity={0.6}
        animate={{
          rotate: scanAngle,
        }}
        transition={{
          rotate: { duration: 0.05, ease: "linear" },
        }}
      />

      {/* Scanning radius indicator */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        w={`${scanRadius * 2}px`}
        h={`${scanRadius * 2}px`}
        borderRadius="full"
        border="2px solid"
        borderColor={radarColor}
        transform="translate(-50%, -50%)"
        opacity={0.8}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Center radar dot */}
      <Circle
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        size="8px"
        bg={radarColor}
        opacity={0.8}
      />

      {/* Signals */}
      {signals.map(renderShape)}

      {/* Radar pulse effect */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        w="20px"
        h="20px"
        borderRadius="full"
        bg={radarColor}
        transform="translate(-50%, -50%)"
        animate={{
          scale: [0, 3],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      {/* Additional scanning lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <MotionBox
          key={angle}
          position="absolute"
          top="50%"
          left="50%"
          w="300px"
          h="1px"
          bg={gridColor}
          opacity={0.1}
          transform={`translate(-50%, -50%) rotate(${angle}deg)`}
        />
      ))}
    </Box>
  );
} 