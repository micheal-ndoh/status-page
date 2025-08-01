"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import StatusLoading from "@/components/StatusLoading";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  HomeIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const MotionBox = motion(Box);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const sidebarBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <StatusLoading variant="dashboard" />;
  }

  if (!session) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    {
      name: "Incidents",
      href: "/dashboard/incidents",
      icon: ExclamationTriangleIcon,
    },
    { name: "Services", href: "/dashboard/services", icon: Cog6ToothIcon },
  ];

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            Status Dashboard
          </DrawerHeader>
          <DrawerBody p={0}>
            <VStack spacing={0} align="stretch">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={onClose}>
                  <Button
                    variant="ghost"
                    justifyContent="start"
                    w="full"
                    h={12}
                    px={4}
                    borderRadius={0}
                    _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                  >
                    <HStack spacing={3}>
                      <item.icon className="w-5 h-5" />
                      <Text>{item.name}</Text>
                    </HStack>
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Flex>
        {/* Desktop Sidebar */}
        <Box
          display={{ base: "none", md: "block" }}
          w={64}
          bg={sidebarBg}
          borderRight="1px"
          borderColor={borderColor}
          position="fixed"
          h="100vh"
          overflowY="auto"
        >
          <VStack spacing={0} align="stretch" h="full">
            {/* Header */}
            <Box p={6} borderBottom="1px" borderColor={borderColor}>
              <Text fontSize="xl" fontWeight="bold" color="brand.500">
                Status Dashboard
              </Text>
            </Box>

            {/* Navigation */}
            <VStack spacing={0} align="stretch" flex={1} py={4}>
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    justifyContent="start"
                    w="full"
                    h={12}
                    px={6}
                    borderRadius={0}
                    _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                  >
                    <HStack spacing={3}>
                      <item.icon className="w-5 h-5" />
                      <Text>{item.name}</Text>
                    </HStack>
                  </Button>
                </Link>
              ))}
            </VStack>

            {/* User Menu */}
            <Box p={4} borderTop="1px" borderColor={borderColor}>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  w="full"
                  justifyContent="start"
                  h="auto"
                  p={3}
                >
                  <HStack spacing={3}>
                    <Avatar size="sm" name={session.user?.name || ""} />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text fontSize="sm" fontWeight="medium">
                        {session.user?.name || "User"}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {session.user?.email}
                      </Text>
                    </VStack>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<UserIcon className="w-4 h-4" />}>
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    icon={<ArrowRightOnRectangleIcon className="w-4 h-4" />}
                    onClick={() => router.push("/api/auth/signout")}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box ml={{ base: 0, md: 64 }} flex={1} minH="100vh">
          {/* Top Bar */}
          <Box
            bg={sidebarBg}
            borderBottom="1px"
            borderColor={borderColor}
            px={6}
            py={4}
            position="sticky"
            top={0}
            zIndex={10}
          >
            <Flex justify="space-between" align="center">
              <HStack spacing={4}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  icon={<Bars3Icon className="w-5 h-5" />}
                  onClick={onOpen}
                  variant="ghost"
                />
                <Text fontSize="lg" fontWeight="semibold">
                  Dashboard
                </Text>
              </HStack>

              <HStack spacing={2}>
                <IconButton
                  aria-label="Toggle color mode"
                  icon={
                    colorMode === "light" ? (
                      <MoonIcon className="w-5 h-5" />
                    ) : (
                      <SunIcon className="w-5 h-5" />
                    )
                  }
                  onClick={toggleColorMode}
                  variant="ghost"
                />
              </HStack>
            </Flex>
          </Box>

          {/* Page Content */}
          <Box p={6}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </MotionBox>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
