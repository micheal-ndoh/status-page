"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Text,
  Avatar,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

// Custom hook to safely use useDisclosure
function useSafeDisclosure() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen, onOpen, onClose };
}

const GlassmorphismNavbar = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useSafeDisclosure();

  const router = useRouter();
  const { data: session, status } = useSession();
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );
  const { colorMode, toggleColorMode } = useColorMode();

  const navItems = [
    { name: t("navigation.product"), href: "/product" },
    { name: t("navigation.customers"), href: "/customers" },
    { name: t("navigation.integrations"), href: "/integrations" },
    { name: t("navigation.pricing"), href: "/pricing" },
  ];

  const handleLogin = () => {
    router.push("/auth/signin");
  };

  const handleSignUp = () => {
    router.push("/auth/signin");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const NavLinks = () => (
    <HStack spacing={8}>
      {navItems.map((item) => (
        <Text
          key={item.name}
          color="white"
          fontSize="sm"
          fontWeight="medium"
          cursor="pointer"
          _hover={{ color: "rgba(173, 216, 230, 1)" }}
          transition="color 0.2s"
          onClick={() => handleNavClick(item.href)}
        >
          {item.name}
        </Text>
      ))}
    </HStack>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Flex
          justify="space-between"
          align="center"
          px={{ base: 4, md: 8, lg: 12 }}
          py={4}
          backdropFilter="blur(20px)"
          bg={bgColor}
          borderBottom="1px solid"
          borderColor={borderColor}
        >
          {/* Left - Logo */}
          <Box cursor="pointer" onClick={() => router.push("/")}>
            <Logo size="md" variant="white" />
          </Box>

          {/* Center - Navigation Links */}
          <Box
            display={{ base: "none", md: "block" }}
            px={6}
            py={2}
            borderRadius="full"
            backdropFilter="blur(20px)"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
          >
            <NavLinks />
          </Box>

          {/* Right - Auth Buttons */}
          <HStack spacing={4} display={{ base: "none", md: "flex" }}>
            <LanguageSwitcher />
            <ThemeToggle />
            {session ? (
              // User is logged in - show dashboard button
              <Button
                bg="rgba(173, 216, 230, 0.9)"
                color="gray.800"
                fontSize="sm"
                fontWeight="semibold"
                px={6}
                py={2}
                borderRadius="full"
                onClick={handleDashboard}
                _hover={{
                  bg: "rgba(173, 216, 230, 1)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(173, 216, 230, 0.3)",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.2s"
              >
                {t("navigation.dashboard")}
              </Button>
            ) : (
              // User is not logged in - show login/signup buttons
              <>
                <Text
                  color="white"
                  fontSize="sm"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ color: "rgba(173, 216, 230, 1)" }}
                  transition="color 0.2s"
                  onClick={handleLogin}
                >
                  {t("common.login")}
                </Text>
                <Button
                  bg="rgba(173, 216, 230, 0.9)"
                  color="gray.800"
                  fontSize="sm"
                  fontWeight="semibold"
                  px={6}
                  py={2}
                  borderRadius="full"
                  onClick={handleSignUp}
                  _hover={{
                    bg: "rgba(173, 216, 230, 1)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(173, 216, 230, 0.3)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  transition="all 0.2s"
                >
                  {t("common.signup")}
                </Button>
              </>
            )}
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            icon={<Bars3Icon className="w-6 h-6" />}
            onClick={onOpen}
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
          />
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg="rgba(0, 0, 0, 0.95)"
          backdropFilter="blur(20px)"
          borderBottom="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
        >
          <DrawerCloseButton color="white" />
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="rgba(255, 255, 255, 0.1)"
          >
            <Box
              cursor="pointer"
              onClick={() => {
                router.push("/");
                onClose();
              }}
            >
              <Logo size="md" variant="white" />
            </Box>
          </DrawerHeader>
          <DrawerBody py={8}>
            <VStack spacing={6} align="stretch">
              {/* Mobile Navigation Links */}
              <VStack spacing={4} align="stretch">
                {navItems.map((item) => (
                  <Text
                    key={item.name}
                    color="white"
                    fontSize="lg"
                    fontWeight="medium"
                    cursor="pointer"
                    _hover={{ color: "rgba(173, 216, 230, 1)" }}
                    transition="color 0.2s"
                    onClick={() => {
                      handleNavClick(item.href);
                      onClose();
                    }}
                  >
                    {item.name}
                  </Text>
                ))}
              </VStack>

              {/* Mobile Auth Buttons */}
              <VStack spacing={4} pt={4}>
                <LanguageSwitcher />
                <ThemeToggle />
                {session ? (
                  // User is logged in - show dashboard button
                  <Button
                    bg="rgba(173, 216, 230, 0.9)"
                    color="gray.800"
                    fontSize="lg"
                    fontWeight="semibold"
                    px={8}
                    py={3}
                    borderRadius="full"
                    w="full"
                    onClick={() => {
                      handleDashboard();
                      onClose();
                    }}
                    _hover={{
                      bg: "rgba(173, 216, 230, 1)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(173, 216, 230, 0.3)",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.2s"
                  >
                    {t("navigation.dashboard")}
                  </Button>
                ) : (
                  // User is not logged in - show login/signup buttons
                  <>
                    <Text
                      color="white"
                      fontSize="lg"
                      fontWeight="medium"
                      cursor="pointer"
                      _hover={{ color: "rgba(173, 216, 230, 1)" }}
                      transition="color 0.2s"
                      onClick={() => {
                        handleLogin();
                        onClose();
                      }}
                    >
                      {t("common.login")}
                    </Text>
                    <Button
                      bg="rgba(173, 216, 230, 0.9)"
                      color="gray.800"
                      fontSize="lg"
                      fontWeight="semibold"
                      px={8}
                      py={3}
                      borderRadius="full"
                      w="full"
                      onClick={() => {
                        handleSignUp();
                        onClose();
                      }}
                      _hover={{
                        bg: "rgba(173, 216, 230, 1)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(173, 216, 230, 0.3)",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      transition="all 0.2s"
                    >
                      {t("common.signup")}
                    </Button>
                  </>
                )}
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GlassmorphismNavbar;
