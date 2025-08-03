"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface DetectionDot {
  angle: number;
  radius: number;
  opacity: number;
  size: number;
  createdAt: number;
}

const AnimatedHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectionDots, setDetectionDots] = useState<DetectionDot[]>([]);
  const lastTimeRef = useRef(performance.now());
  const animationFrameIdRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    let lastDetectionTime = 0;
    const detectionInterval = 3000;

    const animate = (time: number) => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 100;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      const radarRadius = 80;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radarRadius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(64, 64, 64, 0.8)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX - 20, centerY - 20, radarRadius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(128, 128, 128, 0.6)";
      ctx.fill();

      // Use a single time-based rotation for all elements
      const rotationSpeed = 0.0005;
      const rotationAngle = time * rotationSpeed;

      const ringCount = 4;
      const baseRingRadius = 120;
      for (let i = 0; i < ringCount; i++) {
        const ringRadius = baseRingRadius + i * 60;
        const ringOpacity = 0.4 - i * 0.05;
        const segments = 16;
        for (let j = 0; j < segments; j++) {
          const angle = (j / segments) * Math.PI * 2 + rotationAngle;
          const nextAngle = ((j + 1) / segments) * Math.PI * 2 + rotationAngle;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, angle, nextAngle);
          ctx.strokeStyle = `rgba(173, 216, 230, ${ringOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      const radialLineCount = 8;
      const maxRadius = baseRingRadius + (ringCount - 1) * 60 + 20;
      for (let i = 0; i < radialLineCount; i++) {
        const angle = (i / radialLineCount) * Math.PI * 2 + rotationAngle;
        const endX = centerX + Math.cos(angle) * maxRadius;
        const endY = centerY + Math.sin(angle) * maxRadius;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(173, 216, 230, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      detectionDots.forEach((dot, index) => {
        const age = time - dot.createdAt;
        const fadeTime = 5000;
        const currentOpacity = Math.max(0, dot.opacity * (1 - age / fadeTime));
        if (currentOpacity > 0) {
          const dotX = centerX + Math.cos(dot.angle) * dot.radius;
          const dotY = centerY + Math.sin(dot.angle) * dot.radius;
          ctx.beginPath();
          ctx.arc(dotX, dotY, dot.size + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(173, 216, 230, ${currentOpacity * 0.3})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(dotX, dotY, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
        } else {
          setDetectionDots((prev) => prev.filter((_, i) => i !== index));
        }
      });

      // Sweeping radar beam with time-based rotation
      const sweepWidth = Math.PI / 4;
      const sweepRadius = baseRingRadius + (ringCount - 1) * 60 + 20;
      const sweepRotationSpeed = 0.0002;
      const sweepAngle = time * sweepRotationSpeed;

      const sweepGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        sweepRadius
      );
      sweepGradient.addColorStop(0, "rgba(208, 139, 128, 0.8)");
      sweepGradient.addColorStop(0.7, "rgba(173, 216, 230, 0.4)");
      sweepGradient.addColorStop(1, "rgba(173, 216, 230, 0)");

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        sweepRadius,
        sweepAngle - sweepWidth / 2,
        sweepAngle + sweepWidth / 2
      );
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Check for detection
      const detectionAngle = Math.PI / 2;
      const angleDiff = Math.abs((sweepAngle % (Math.PI * 2)) - detectionAngle);
      const normalizedAngleDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff);

      if (
        normalizedAngleDiff < sweepWidth / 2 &&
        time - lastDetectionTime > detectionInterval
      ) {
        lastDetectionTime = time;
        const newDot: DetectionDot = {
          angle: Math.random() * Math.PI * 2,
          radius: baseRingRadius + Math.random() * (ringCount * 60),
          opacity: 1,
          size: Math.random() * 3 + 2,
          createdAt: time,
        };
        setDetectionDots((prev) => [...prev, newDot]);
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [detectionDots]);

  return (
    <Box
      position="relative"
      w="100vw"
      h="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      overflow="hidden"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      <Box
        position="relative"
        zIndex={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        px={4}
        pt={20}
      >
        <VStack spacing={12} textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Text
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 30px rgba(173, 216, 230, 0.5)"
              letterSpacing="wider"
              fontFamily="mono"
              mt={20}
            >
              MONITOR EVERYTHING
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(173, 216, 230, 0.8)"
              maxW="600px"
              lineHeight="tall"
            >
              Real-time monitoring with intelligent detection and instant alerts
            </Text>
          </motion.div>
        </VStack>
      </Box>
      <motion.div
        style={{
          position: "absolute",
          top: "25%",
          left: "8%",
          zIndex: 1,
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Box
          w={2}
          h={2}
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.6)"
          boxShadow="0 0 10px rgba(255, 255, 255, 0.4)"
        />
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          top: "65%",
          right: "12%",
          zIndex: 1,
        }}
        animate={{
          y: [0, 12, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Box
          w={2.5}
          h={2.5}
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.5)"
          boxShadow="0 0 12px rgba(255, 255, 255, 0.3)"
        />
      </motion.div>
    </Box>
  );
};

export default AnimatedHero;
