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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const MotionCard = motion(Card);

export default function VerifyRequestPage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
            <VStack spacing={6} align="stretch" textAlign="center">
              {/* Icon */}
              <Box
                w={20}
                h={20}
                borderRadius="full"
                bg="success.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
              >
                <EnvelopeIcon className="w-10 h-10 text-white" />
              </Box>

              {/* Content */}
              <VStack spacing={4}>
                <Heading size="lg">Check your email</Heading>
                <Text color="gray.600" fontSize="lg">
                  We sent you a sign-in link to your email address.
                </Text>
                <Text color="gray.500">
                  Click the link in the email to sign in to your account. The
                  link will expire in 24 hours.
                </Text>
              </VStack>

              {/* Actions */}
              <VStack spacing={3}>
                <Button
                  as={Link}
                  href="/auth/signin"
                  leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                  variant="outline"
                  w="full"
                >
                  Back to sign in
                </Button>

                <Text fontSize="sm" color="gray.500">
                  Didn't receive the email? Check your spam folder or{" "}
                  <Button
                    variant="link"
                    color="brand.500"
                    size="sm"
                    onClick={() => window.location.reload()}
                  >
                    try again
                  </Button>
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </MotionCard>
      </Container>
    </Box>
  );
}
