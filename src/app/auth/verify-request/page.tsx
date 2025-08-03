"use client";

import {
  Box,
  Container,
  VStack,
  Text,
  Card,
  CardBody,
  Heading,
  Button,
  useColorModeValue,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function VerifyRequestPage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Elements */}
      <MotionBox
        position="absolute"
        top="15%"
        right="10%"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.1)"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <MotionBox
        position="absolute"
        bottom="30%"
        left="10%"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.05)"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="lg" py={12}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            textAlign="center"
          >
            <MotionBox variants={itemVariants}>
              <Box
                w={20}
                h={20}
                borderRadius="full"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb={6}
                boxShadow="xl"
              >
                <SparklesIcon className="w-10 h-10 text-purple-600" />
              </Box>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Heading
                size="2xl"
                fontWeight="extrabold"
                color="white"
                mb={4}
                bgGradient="linear(to-r, white, purple.100)"
                bgClip="text"
              >
                Magic Link Sent! ✨
              </Heading>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Text fontSize="lg" color="white" opacity={0.9}>
                Check your email for the secure sign-in link
              </Text>
            </MotionBox>
          </MotionBox>

          {/* Main Card */}
          <MotionCard
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            bg={cardBg}
            border="1px"
            borderColor={borderColor}
            shadow="2xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <CardBody p={8}>
              <VStack spacing={6} align="stretch" textAlign="center">
                {/* Success Icon */}
                <MotionBox
                  variants={iconVariants}
                  w={24}
                  h={24}
                  borderRadius="full"
                  bg="success.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mx="auto"
                >
                  <CheckCircleIcon className="w-12 h-12 text-white" />
                </MotionBox>

                {/* Content */}
                <VStack spacing={4}>
                  <MotionBox variants={itemVariants}>
                    <Heading
                      size="lg"
                      color={useColorModeValue("gray.800", "white")}
                    >
                      Check your email 📧
                    </Heading>
                  </MotionBox>
                  <MotionBox variants={itemVariants}>
                    <Text
                      color={useColorModeValue("gray.600", "gray.400")}
                      fontSize="lg"
                    >
                      We've sent a secure magic link to your email address.
                    </Text>
                  </MotionBox>
                  <MotionBox variants={itemVariants}>
                    <Text color={useColorModeValue("gray.500", "gray.500")}>
                      Click the link in the email to instantly sign in to your
                      account. The link will expire in 24 hours for security.
                    </Text>
                  </MotionBox>
                </VStack>

                {/* Features */}
                <MotionBox variants={itemVariants}>
                  <VStack spacing={3} mt={4}>
                    <HStack
                      spacing={3}
                      color={useColorModeValue("gray.600", "gray.400")}
                    >
                      <Icon
                        as={CheckCircleIcon}
                        w={5}
                        h={5}
                        color="green.500"
                      />
                      <Text fontSize="sm">No password required</Text>
                    </HStack>
                    <HStack
                      spacing={3}
                      color={useColorModeValue("gray.600", "gray.400")}
                    >
                      <Icon
                        as={CheckCircleIcon}
                        w={5}
                        h={5}
                        color="green.500"
                      />
                      <Text fontSize="sm">Secure and encrypted</Text>
                    </HStack>
                    <HStack
                      spacing={3}
                      color={useColorModeValue("gray.600", "gray.400")}
                    >
                      <Icon
                        as={CheckCircleIcon}
                        w={5}
                        h={5}
                        color="green.500"
                      />
                      <Text fontSize="sm">Instant access to dashboard</Text>
                    </HStack>
                  </VStack>
                </MotionBox>

                {/* Actions */}
                <VStack spacing={4}>
                  <MotionBox variants={itemVariants} w="full">
                    <Button
                      as={Link}
                      href="/auth/signin"
                      leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                      variant="outline"
                      w="full"
                      size="lg"
                      borderRadius="lg"
                      _hover={{
                        bg: useColorModeValue("gray.50", "gray.700"),
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      Back to Sign In
                    </Button>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <VStack spacing={2}>
                      <Text
                        fontSize="sm"
                        color={useColorModeValue("gray.500", "gray.500")}
                      >
                        Didn't receive the email?
                      </Text>
                      <Button
                        variant="ghost"
                        size="sm"
                        color="brand.500"
                        onClick={() => window.location.reload()}
                        _hover={{
                          bg: useColorModeValue("brand.50", "brand.900"),
                          textDecoration: "underline",
                        }}
                      >
                        Try again
                      </Button>
                    </VStack>
                  </MotionBox>

                  <MotionBox variants={itemVariants}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => (window.location.href = "/")}
                      color={useColorModeValue("gray.600", "gray.400")}
                      _hover={{
                        color: "brand.500",
                        bg: useColorModeValue("gray.50", "gray.700"),
                      }}
                    >
                      ← Back to Status Page
                    </Button>
                  </MotionBox>
                </VStack>
              </VStack>
            </CardBody>
          </MotionCard>
        </VStack>
      </Container>
    </Box>
  );
}
