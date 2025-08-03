"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

export default function VerifyRequestPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );

  useEffect(() => {
    // Simulate email sending process
    const timer = setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => setShowSuccess(true), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackToSignIn = () => {
    router.push("/auth/signin");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    setShowSuccess(false);
    setTimeout(() => {
      setEmailSent(true);
      setTimeout(() => setShowSuccess(true), 500);
    }, 1000);
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Particles */}
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        {[...Array(25)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            w="2px"
            h="2px"
            bg="rgba(173, 216, 230, 0.6)"
            borderRadius="full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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

      {/* Floating Email Icons */}
      <MotionBox
        position="absolute"
        top="20%"
        left="15%"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Box
          w="60px"
          h="60px"
          borderRadius="full"
          bg="rgba(173, 216, 230, 0.1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="rgba(173, 216, 230, 0.3)"
        >
          <EnvelopeIcon
            className="w-8 h-8"
            style={{ color: "rgba(173, 216, 230, 0.8)" }}
          />
        </Box>
      </MotionBox>

      <MotionBox
        position="absolute"
        top="60%"
        right="20%"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Box
          w="50px"
          h="50px"
          borderRadius="full"
          bg="rgba(173, 216, 230, 0.1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="rgba(173, 216, 230, 0.3)"
        >
          <ShieldCheckIcon
            className="w-6 h-6"
            style={{ color: "rgba(173, 216, 230, 0.8)" }}
          />
        </Box>
      </MotionBox>

      <Container maxW="container.sm" pt={32} pb={20}>
        <VStack spacing={12} textAlign="center">
          {/* Logo */}
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Logo size="lg" variant="white" />
          </MotionBox>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {!emailSent ? (
              <MotionVStack
                key="sending"
                spacing={8}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <MotionBox
                  p={8}
                  borderRadius="2xl"
                  backdropFilter="blur(20px)"
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                  position="relative"
                  overflow="hidden"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Glowing border effect */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="rgba(173, 216, 230, 0.3)"
                    boxShadow="0 0 30px rgba(173, 216, 230, 0.2)"
                    pointerEvents="none"
                  />

                  <VStack spacing={6}>
                    <MotionBox
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Box
                        w="80px"
                        h="80px"
                        borderRadius="full"
                        bg="rgba(173, 216, 230, 0.1)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                        borderColor="rgba(173, 216, 230, 0.3)"
                      >
                        <MotionBox
                          w="40px"
                          h="40px"
                          borderRadius="full"
                          border="3px solid"
                          borderColor="rgba(173, 216, 230, 0.3)"
                          borderTopColor="rgba(173, 216, 230, 1)"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </Box>
                    </MotionBox>

                    <VStack spacing={4}>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        color="white"
                        textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
                      >
                        Sending Magic Link...
                      </Text>
                      <Text
                        fontSize="lg"
                        color="rgba(173, 216, 230, 0.8)"
                        maxW="400px"
                        lineHeight="tall"
                      >
                        Preparing your secure authentication link. This will
                        only take a moment.
                      </Text>
                    </VStack>
                  </VStack>
                </MotionBox>
              </MotionVStack>
            ) : (
              <MotionVStack
                key="sent"
                spacing={8}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <MotionBox
                  p={8}
                  borderRadius="2xl"
                  backdropFilter="blur(20px)"
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Glowing border effect */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor="rgba(173, 216, 230, 0.3)"
                    boxShadow="0 0 30px rgba(173, 216, 230, 0.2)"
                    pointerEvents="none"
                  />

                  <VStack spacing={6}>
                    <MotionBox
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Box
                        w="80px"
                        h="80px"
                        borderRadius="full"
                        bg="rgba(173, 216, 230, 0.1)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        border="2px solid"
                        borderColor="rgba(173, 216, 230, 0.3)"
                      >
                        <AnimatePresence mode="wait">
                          {showSuccess ? (
                            <MotionBox
                              key="success"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ duration: 0.5, type: "spring" }}
                            >
                              <CheckCircleIcon
                                className="w-10 h-10"
                                style={{ color: "rgba(40, 167, 69, 1)" }}
                              />
                            </MotionBox>
                          ) : (
                            <MotionBox
                              key="sending"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <EnvelopeIcon
                                className="w-10 h-10"
                                style={{ color: "rgba(173, 216, 230, 1)" }}
                              />
                            </MotionBox>
                          )}
                        </AnimatePresence>
                      </Box>
                    </MotionBox>

                    <VStack spacing={4}>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        color="white"
                        textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
                      >
                        Magic Link Sent! ✨
                      </Text>
                      <Text
                        fontSize="lg"
                        color="rgba(173, 216, 230, 0.8)"
                        maxW="400px"
                        lineHeight="tall"
                      >
                        We've sent a secure magic link to your email address.
                        Click the link to instantly sign in to your Prism
                        dashboard.
                      </Text>
                    </VStack>

                    {/* Security Features */}
                    <VStack spacing={3} pt={4}>
                      <HStack spacing={3} color="rgba(173, 216, 230, 0.8)">
                        <ShieldCheckIcon className="w-5 h-5" />
                        <Text fontSize="sm">No password required</Text>
                      </HStack>
                      <HStack spacing={3} color="rgba(173, 216, 230, 0.8)">
                        <ClockIcon className="w-5 h-5" />
                        <Text fontSize="sm">Link expires in 24 hours</Text>
                      </HStack>
                      <HStack spacing={3} color="rgba(173, 216, 230, 0.8)">
                        <SparklesIcon className="w-5 h-5" />
                        <Text fontSize="sm">Instant access to dashboard</Text>
                      </HStack>
                    </VStack>

                    {/* Action Buttons */}
                    <VStack spacing={4} pt={4}>
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
                          onClick={handleBackToSignIn}
                          _hover={{
                            borderColor: "rgba(173, 216, 230, 0.8)",
                            color: "rgba(173, 216, 230, 1)",
                            bg: "rgba(173, 216, 230, 0.1)",
                          }}
                          transition="all 0.3s ease"
                        >
                          <HStack spacing={2}>
                            <ArrowLeftIcon className="w-5 h-5" />
                            <Text>Back to Sign In</Text>
                          </HStack>
                        </Button>
                      </motion.div>

                      <VStack spacing={2}>
                        <Text fontSize="sm" color="rgba(173, 216, 230, 0.6)">
                          Didn't receive the email?
                        </Text>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            color="rgba(173, 216, 230, 0.8)"
                            onClick={handleResendEmail}
                            _hover={{
                              color: "rgba(173, 216, 230, 1)",
                              bg: "rgba(173, 216, 230, 0.1)",
                            }}
                            transition="all 0.3s ease"
                          >
                            Resend Email
                          </Button>
                        </motion.div>
                      </VStack>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBackToHome}
                          color="rgba(173, 216, 230, 0.6)"
                          _hover={{
                            color: "rgba(173, 216, 230, 1)",
                            bg: "rgba(173, 216, 230, 0.1)",
                          }}
                          transition="all 0.3s ease"
                        >
                          ← Back to Homepage
                        </Button>
                      </motion.div>
                    </VStack>
                  </VStack>
                </MotionBox>
              </MotionVStack>
            )}
          </AnimatePresence>
        </VStack>
      </Container>
    </Box>
  );
}
