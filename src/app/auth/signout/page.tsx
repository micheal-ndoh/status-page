"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
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
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Logo from "@/components/Logo";

// Force dynamic rendering to avoid SSR issues with translations
export const dynamic = "force-dynamic";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const SignOutContent = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSignedOut, setIsSignedOut] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setShowConfirmation(true);

    // Simulate a brief delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      await signOut({ redirect: false });
      setIsSignedOut(true);

      // Redirect to homepage after a brief moment
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Sign out error:", error);
      setIsSigningOut(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    router.back();
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
        {[...Array(20)].map((_, i) => (
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
            {!showConfirmation ? (
              <MotionVStack
                key="signout-prompt"
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
                        <ExclamationTriangleIcon
                          className="w-10 h-10"
                          style={{ color: "rgba(173, 216, 230, 1)" }}
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
                        Sign Out
                      </Text>
                      <Text
                        fontSize="lg"
                        color="rgba(173, 216, 230, 0.8)"
                        maxW="400px"
                        lineHeight="tall"
                      >
                        Are you sure you want to sign out? You'll need to sign
                        in again to access your dashboard.
                      </Text>
                    </VStack>

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
                          onClick={handleCancel}
                          _hover={{
                            borderColor: "rgba(173, 216, 230, 0.8)",
                            color: "rgba(173, 216, 230, 1)",
                            bg: "rgba(173, 216, 230, 0.1)",
                          }}
                          transition="all 0.3s ease"
                        >
                          <HStack spacing={2}>
                            <ArrowLeftIcon className="w-5 h-5" />
                            <Text>Cancel</Text>
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
                          onClick={handleSignOut}
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
                          Sign Out
                        </Button>
                      </motion.div>
                    </HStack>
                  </VStack>
                </MotionBox>
              </MotionVStack>
            ) : (
              <MotionVStack
                key="signing-out"
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
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: isSigningOut ? Infinity : 0,
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
                        {isSignedOut ? (
                          <CheckCircleIcon
                            className="w-10 h-10"
                            style={{ color: "rgba(40, 167, 69, 1)" }}
                          />
                        ) : (
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
                        )}
                      </Box>
                    </MotionBox>

                    <VStack spacing={4}>
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight="bold"
                        color="white"
                        textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
                      >
                        {isSignedOut
                          ? "Signed Out Successfully!"
                          : "Signing Out..."}
                      </Text>
                      <Text
                        fontSize="lg"
                        color="rgba(173, 216, 230, 0.8)"
                        maxW="400px"
                        lineHeight="tall"
                      >
                        {isSignedOut
                          ? "You have been successfully signed out. Redirecting to homepage..."
                          : "Please wait while we sign you out securely."}
                      </Text>
                    </VStack>

                    {isSignedOut && (
                      <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
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
                          Go to Homepage
                        </Button>
                      </MotionBox>
                    )}
                  </VStack>
                </MotionBox>
              </MotionVStack>
            )}
          </AnimatePresence>
        </VStack>
      </Container>
    </Box>
  );
};

const SignOutPage = () => {
  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="lg">
            Loading...
          </Text>
        </Box>
      }
    >
      <SignOutContent />
    </Suspense>
  );
};

export default SignOutPage;
