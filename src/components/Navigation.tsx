"use client";

import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Button,
  Link,
  IconButton,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./Logo";

const MotionButton = motion(Button);

interface NavigationProps {
  onSignUp?: () => void;
  onLogin?: () => void;
  variant?: "landing" | "status";
}

const navItems = [
  { label: "Product", href: "#features" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navigation({
  onSignUp,
  onLogin,
  variant = "landing",
}: NavigationProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg={useColorModeValue("white", "gray.800")}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.100", "gray.700")}
        backdropFilter="blur(10px)"
        bg={useColorModeValue(
          "rgba(255, 255, 255, 0.9)",
          "rgba(26, 32, 44, 0.9)"
        )}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" py={2}>
            <HStack spacing={8}>
              <Logo size="sm" />

              {/* Desktop Navigation */}
              {variant === "landing" && (
                <HStack spacing={6} display={{ base: "none", md: "flex" }}>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      color={useColorModeValue("gray.600", "gray.300")}
                      _hover={{ color: "brand.600" }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </HStack>
              )}
            </HStack>

            <HStack spacing={4}>
              {/* Desktop Buttons */}
              <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                {variant === "landing" ? (
                  <>
                    <MotionButton
                      variant="ghost"
                      onClick={onLogin}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </MotionButton>
                    <MotionButton
                      colorScheme="brand"
                      onClick={onSignUp}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign up
                    </MotionButton>
                  </>
                ) : (
                  <>
                    <Link
                      href="/"
                      color={useColorModeValue("gray.600", "gray.300")}
                      _hover={{ color: "brand.600" }}
                    >
                      Home
                    </Link>
                    <Link
                      href="/auth/signin"
                      color={useColorModeValue("gray.600", "gray.300")}
                      _hover={{ color: "brand.600" }}
                    >
                      Login
                    </Link>
                  </>
                )}
                <ThemeToggle />
              </HStack>

              {/* Mobile Menu Button */}
              <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                icon={<Bars3Icon className="w-6 h-6" />}
                aria-label="Open menu"
                variant="ghost"
                size="md"
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Logo size="sm" />
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch" pt={6}>
              {variant === "landing" && (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      color={useColorModeValue("gray.600", "gray.300")}
                      fontSize="lg"
                      fontWeight="medium"
                      _hover={{ color: "brand.600" }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Divider />
                </>
              )}

              <VStack spacing={4} align="stretch">
                {variant === "landing" ? (
                  <>
                    <Button
                      variant="ghost"
                      size="lg"
                      justifyContent="flex-start"
                      onClick={onLogin}
                    >
                      Login
                    </Button>
                    <Button colorScheme="brand" size="lg" onClick={onSignUp}>
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/"
                      color={useColorModeValue("gray.600", "gray.300")}
                      fontSize="lg"
                      fontWeight="medium"
                    >
                      Home
                    </Link>
                    <Link
                      href="/auth/signin"
                      color={useColorModeValue("gray.600", "gray.300")}
                      fontSize="lg"
                      fontWeight="medium"
                    >
                      Login
                    </Link>
                  </>
                )}
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
