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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const MotionCard = motion(Card);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
          title: "Check your email",
          description:
            "We sent you a sign-in link. Please check your email and click the link to continue.",
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
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
          shadow="xl"
        >
          <CardBody p={8}>
            <VStack spacing={6} align="stretch">
              {/* Header */}
              <VStack spacing={2} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  borderRadius="full"
                  bg="brand.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <EnvelopeIcon className="w-8 h-8 text-white" />
                </Box>
                <Heading size="lg">Sign in to your account</Heading>
                <Text color="gray.600">
                  Enter your email address and we'll send you a magic link to
                  sign in
                </Text>
              </VStack>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isInvalid={!!error}>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      size="lg"
                      isRequired
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    isLoading={isLoading}
                    isDisabled={!isEmailValid}
                  >
                    Send sign-in link
                  </Button>
                </VStack>
              </form>

              {/* Footer */}
              <Text fontSize="sm" color="gray.500" textAlign="center">
                By signing in, you agree to our terms of service and privacy
                policy
              </Text>
            </VStack>
          </CardBody>
        </MotionCard>
      </Container>
    </Box>
  );
}
