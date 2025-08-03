"use client";

import { useEffect, useRef } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AnimatedHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system for background stars
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173, 216, 230, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <Box
      position="relative"
      w="100vw"
      h="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      overflow="hidden"
    >
      {/* Background Canvas for Stars */}
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

      {/* Central Content */}
      <VStack
        position="relative"
        zIndex={10}
        justify="center"
        align="center"
        h="100vh"
        spacing={8}
      >
        {/* Central Sphere and Rings */}
        <Box position="relative" w="400px" h="400px">
          {/* Rotating Rings */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "300px",
              height: "300px",
              marginTop: "-150px",
              marginLeft: "-150px",
              border: "2px solid rgba(173, 216, 230, 0.3)",
              borderRadius: "50%",
              borderStyle: "dashed",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "200px",
              height: "200px",
              marginTop: "-100px",
              marginLeft: "-100px",
              border: "2px solid rgba(173, 216, 230, 0.4)",
              borderRadius: "50%",
              borderStyle: "dashed",
            }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100px",
              height: "100px",
              marginTop: "-50px",
              marginLeft: "-50px",
              border: "2px solid rgba(173, 216, 230, 0.5)",
              borderRadius: "50%",
              borderStyle: "dashed",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Central Sphere */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "60px",
              height: "60px",
              marginTop: "-30px",
              marginLeft: "-30px",
              background: "radial-gradient(circle, #87CEEB 0%, #4682B4 100%)",
              borderRadius: "50%",
              boxShadow: "0 0 30px rgba(173, 216, 230, 0.8)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 30px rgba(173, 216, 230, 0.8)",
                "0 0 50px rgba(173, 216, 230, 1)",
                "0 0 30px rgba(173, 216, 230, 0.8)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Cone of Light */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "0",
              height: "0",
              marginTop: "30px",
              marginLeft: "-100px",
              borderLeft: "100px solid transparent",
              borderRight: "100px solid transparent",
              borderTop: "200px solid rgba(173, 216, 230, 0.1)",
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </Box>

        {/* Text Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Text
            fontSize={{ base: "2xl", md: "4xl", lg: "6xl" }}
            fontWeight="bold"
            color="white"
            textAlign="center"
            letterSpacing="wider"
            textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
          >
            MONITOR EVERYTHING
          </Text>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="rgba(255, 255, 255, 0.8)"
            textAlign="center"
            maxW="600px"
            px={4}
          >
            Real-time status monitoring for your services and infrastructure
          </Text>
        </motion.div>
      </VStack>
    </Box>
  );
};

export default AnimatedHero;
