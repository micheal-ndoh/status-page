"use client";

import { Box, Container, VStack, HStack, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const MotionBox = motion(Box);

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Animated Background Particles */}
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        {[...Array(15)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            w="2px"
            h="2px"
            bg="rgba(173, 216, 230, 0.6)"
            borderRadius="full"
            initial={{
                      x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
        y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Box>

      <Container maxW="container.sm" textAlign="center">
        <VStack spacing={8}>
          {/* Logo */}
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Logo size="lg" variant="white" />
          </MotionBox>

          {/* 404 Content */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <VStack spacing={6}>
              <Text
                fontSize={{ base: "6xl", md: "8xl" }}
                fontWeight="bold"
                color="rgba(173, 216, 230, 1)"
                textShadow="0 0 30px rgba(173, 216, 230, 0.5)"
                fontFamily="mono"
              >
                404
              </Text>
              
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                color="white"
                textShadow="0 0 20px rgba(173, 216, 230, 0.3)"
              >
                Page Not Found
              </Text>
              
              <Text
                fontSize="lg"
                color="rgba(173, 216, 230, 0.8)"
                maxW="500px"
                lineHeight="tall"
              >
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track.
              </Text>

              <HStack spacing={4} pt={4}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    borderColor="rgba(173, 216, 230, 0.4)"
                    color="rgba(173, 216, 230, 0.8)"
                    fontSize="lg"
                    fontWeight="semibold"
                    px={8}
                    py={4}
                    borderRadius="full"
                    onClick={() => router.back()}
                    _hover={{
                      borderColor: "rgba(173, 216, 230, 0.8)",
                      color: "rgba(173, 216, 230, 1)",
                      bg: "rgba(173, 216, 230, 0.1)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <HStack spacing={2}>
                      <ArrowLeftIcon className="w-5 h-5" />
                      <Text>Go Back</Text>
                    </HStack>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    bg="rgba(173, 216, 230, 0.9)"
                    color="gray.800"
                    fontSize="lg"
                    fontWeight="semibold"
                    px={8}
                    py={4}
                    borderRadius="full"
                    onClick={() => router.push("/")}
                    _hover={{
                      bg: "rgba(173, 216, 230, 1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(173, 216, 230, 0.3)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.3s ease"
                  >
                    <HStack spacing={2}>
                      <HomeIcon className="w-5 h-5" />
                      <Text>Go Home</Text>
                    </HStack>
                  </Button>
                </motion.div>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
} 