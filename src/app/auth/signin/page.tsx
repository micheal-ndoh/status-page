"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Card,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  useColorModeValue,
  Flex,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionInput = motion(Input);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
      });

      if (result?.error) {
        setError("Failed to send sign-in email. Please try again.");
      } else {
        toast({
          title: "Magic link sent! ✨",
          description: "Check your email for the sign-in link.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/verify-request");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = email.includes("@") && email.includes(".");

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
        top="10%"
        left="10%"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.1)"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <MotionBox
        position="absolute"
        top="60%"
        right="15%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.05)"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <MotionBox
        position="absolute"
        bottom="20%"
        left="20%"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.08)"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
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
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
                Welcome Back! ✨
              </Heading>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <Text fontSize="lg" color="white" opacity={0.9}>
                Sign in to access your dashboard and manage your services
              </Text>
            </MotionBox>
          </MotionBox>

          {/* Sign In Card */}
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
              <VStack spacing={6} align="stretch">
                {/* Features */}
                <MotionBox variants={itemVariants}>
                  <VStack spacing={3} mb={6}>
                    <HStack
                      spacing={3}
                      color={useColorModeValue("gray.600", "gray.400")}
                    >
                      <Icon
                        as={ShieldCheckIcon}
                        w={5}
                        h={5}
                        color="green.500"
                      />
                      <Text fontSize="sm">
                        Secure email-based authentication
                      </Text>
                    </HStack>
                    <HStack
                      spacing={3}
                      color={useColorModeValue("gray.600", "gray.400")}
                    >
                      <Icon as={BoltIcon} w={5} h={5} color="blue.500" />
                      <Text fontSize="sm">
                        Instant access to your dashboard
                      </Text>
                    </HStack>
                  </VStack>
                </MotionBox>

                <Divider />

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6}>
                    <MotionBox variants={itemVariants} w="full">
                      <FormControl isInvalid={!!error}>
                        <FormLabel
                          fontSize="lg"
                          fontWeight="semibold"
                          color={useColorModeValue("gray.700", "gray.300")}
                        >
                          Email Address
                        </FormLabel>
                        <MotionInput
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          size="lg"
                          borderRadius="lg"
                          border="2px solid"
                          borderColor={useColorModeValue(
                            "gray.200",
                            "gray.600"
                          )}
                          _focus={{
                            borderColor: "brand.500",
                            boxShadow:
                              "0 0 0 1px var(--chakra-colors-brand-500)",
                          }}
                          _hover={{
                            borderColor: "brand.400",
                          }}
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        />
                        {error && <FormErrorMessage>{error}</FormErrorMessage>}
                      </FormControl>
                    </MotionBox>

                    <MotionButton
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      type="submit"
                      size="lg"
                      colorScheme="brand"
                      isLoading={isLoading}
                      loadingText="Sending magic link..."
                      rightIcon={<ArrowRightIcon />}
                      w="full"
                      h="12"
                      fontSize="lg"
                      fontWeight="semibold"
                      borderRadius="lg"
                      bgGradient="linear(to-r, brand.500, brand.600)"
                      _hover={{
                        bgGradient: "linear(to-r, brand.600, brand.700)",
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      _active={{
                        transform: "translateY(0px)",
                      }}
                    >
                      Send Magic Link ✨
                    </MotionButton>
                  </VStack>
                </form>

                {/* Footer */}
                <MotionBox variants={itemVariants}>
                  <VStack spacing={3}>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={useColorModeValue("gray.500", "gray.500")}
                      textAlign="center"
                    >
                      No password required • Secure and instant
                    </Text>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push("/")}
                      color={useColorModeValue("gray.600", "gray.400")}
                      _hover={{
                        color: "brand.500",
                        bg: useColorModeValue("gray.50", "gray.700"),
                      }}
                    >
                      ← Back to Status Page
                    </Button>
                  </VStack>
                </MotionBox>
              </VStack>
            </CardBody>
          </MotionCard>
        </VStack>
      </Container>
    </Box>
  );
}
