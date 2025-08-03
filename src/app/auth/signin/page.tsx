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
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  useColorModeValue,
  Flex,
  Icon,
  Divider,
  Link,
  useTheme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionInput = motion(Input);

export default function SignInPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email,
        callbackUrl: "/dashboard",
        redirect: true,
      });

      // The redirect will be handled by NextAuth
      // If we reach here, there was an error
      if (result?.error) {
        setError(t("auth.signin.emailSent"));
        setIsLoading(false);
      }
    } catch (error) {
      setError(t("common.error"));
      setIsLoading(false);
    }
  };

  const isEmailValid = email.includes("@") && email.includes(".");

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
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
        bg="rgba(173, 216, 230, 0.1)"
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
        bg="rgba(173, 216, 230, 0.05)"
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
      <MotionBox
        position="absolute"
        top="60%"
        right="20%"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="rgba(173, 216, 230, 0.08)"
        animate={{
          scale: [0.98, 1.1, 0.98],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="lg" py={12}>
        <Flex
          direction="column"
          justify="center"
          align="center"
          minH="100vh"
          position="relative"
          zIndex={10}
        >
          {/* Main Form Container */}
          <MotionBox
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            w="full"
            maxW="400px"
          >
            <VStack spacing={8} align="stretch">
              {/* Logo and Header */}
              <VStack spacing={6} textAlign="center">
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Logo size="lg" variant="white" />
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="white"
                    letterSpacing="wider"
                  >
                    {t("auth.signin.title")}
                  </Text>
                </MotionBox>

                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Text fontSize="lg" color="rgba(255, 255, 255, 0.8)">
                    {t("auth.signin.subtitle")}
                  </Text>
                </MotionBox>
              </VStack>

              {/* Glassmorphism Form Container */}
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                p={8}
                borderRadius="2xl"
                backdropFilter="blur(20px)"
                bg="rgba(255, 255, 255, 0.1)"
                border="1px solid"
                borderColor="rgba(173, 216, 230, 0.3)"
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
                _hover={{
                  borderColor: "rgba(173, 216, 230, 0.5)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                }}
                transition="all 0.3s ease"
              >
                <form onSubmit={handleSubmit}>
                  <VStack spacing={6}>
                    {/* Email Input */}
                    <FormControl isInvalid={!!error}>
                      <FormLabel
                        fontSize="lg"
                        fontWeight="semibold"
                        color="white"
                        mb={3}
                      >
                        {t("common.email")}
                      </FormLabel>
                      <MotionInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("auth.signin.emailPlaceholder")}
                        size="lg"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="rgba(173, 216, 230, 0.3)"
                        bg="rgba(255, 255, 255, 0.05)"
                        color="white"
                        _placeholder={{
                          color: "rgba(255, 255, 255, 0.5)",
                        }}
                        _focus={{
                          borderColor: "rgba(173, 216, 230, 0.8)",
                          boxShadow: "0 0 0 3px rgba(173, 216, 230, 0.2)",
                          bg: "rgba(255, 255, 255, 0.1)",
                        }}
                        _hover={{
                          borderColor: "rgba(173, 216, 230, 0.5)",
                          bg: "rgba(255, 255, 255, 0.08)",
                        }}
                        transition="all 0.2s"
                      />
                      {error && (
                        <FormErrorMessage color="red.300" fontSize="sm">
                          {error}
                        </FormErrorMessage>
                      )}
                    </FormControl>

                    {/* Sign In Button */}
                    <MotionButton
                      type="submit"
                      size="lg"
                      w="full"
                      bg="rgba(173, 216, 230, 0.9)"
                      color="gray.800"
                      fontSize="lg"
                      fontWeight="semibold"
                      borderRadius="xl"
                      py={4}
                      isLoading={isLoading}
                      loadingText={t("auth.signin.emailSent")}
                      rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                      _hover={{
                        bg: "rgba(173, 216, 230, 1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(173, 216, 230, 0.4)",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      _disabled={{
                        bg: "rgba(173, 216, 230, 0.5)",
                        cursor: "not-allowed",
                      }}
                      transition="all 0.2s"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t("auth.signin.submitButton")}
                    </MotionButton>

                    {/* Instructions */}
                    <Text
                      fontSize="sm"
                      color="rgba(255, 255, 255, 0.6)"
                      textAlign="center"
                      lineHeight="tall"
                    >
                      {t("auth.signin.emailSentMessage")}
                    </Text>
                  </VStack>
                </form>
              </MotionBox>

              {/* Features */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <VStack spacing={3}>
                  <HStack spacing={3} color="rgba(255, 255, 255, 0.7)">
                    <Icon as={ShieldCheckIcon} w={4} h={4} color="green.400" />
                    <Text fontSize="sm">{t("auth.signin.secureAuth")}</Text>
                  </HStack>
                  <HStack spacing={3} color="rgba(255, 255, 255, 0.7)">
                    <Icon as={BoltIcon} w={4} h={4} color="blue.400" />
                    <Text fontSize="sm">{t("auth.signin.instantAccess")}</Text>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Back to Home */}
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                textAlign="center"
              >
                <Link
                  href="/"
                  color="rgba(173, 216, 230, 0.8)"
                  fontSize="sm"
                  _hover={{
                    color: "rgba(173, 216, 230, 1)",
                    textDecoration: "underline",
                  }}
                  transition="color 0.2s"
                >
                  ← {t("common.backToHome")}
                </Link>
              </MotionBox>
            </VStack>
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}
