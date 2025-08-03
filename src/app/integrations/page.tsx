"use client";

import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Heading,
  Grid,
  GridItem,
  Image,
  Input,
  Select,
  Button,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PlusIcon, BoltIcon } from "@heroicons/react/24/outline";
import GlassmorphismNavbar from "@/components/GlassmorphismNavbar";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

// Integrations data
const integrations = [
  {
    name: "Slack",
    description: "Get instant notifications in your Slack channels",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#4A154B" />
        <path
          d="M18 28C18 26.3431 19.3431 25 21 25C22.6569 25 24 26.3431 24 28V32C24 33.6569 22.6569 35 21 35C19.3431 35 18 33.6569 18 32V28Z"
          fill="white"
        />
        <path
          d="M28 22C28 20.3431 29.3431 19 31 19C32.6569 19 34 20.3431 34 22V38C34 39.6569 32.6569 41 31 41C29.3431 41 28 39.6569 28 38V22Z"
          fill="white"
        />
        <path
          d="M38 28C38 26.3431 39.3431 25 41 25C42.6569 25 44 26.3431 44 28V32C44 33.6569 42.6569 35 41 35C39.3431 35 38 33.6569 38 32V28Z"
          fill="white"
        />
        <path
          d="M28 18C28 16.3431 29.3431 15 31 15C32.6569 15 34 16.3431 34 18V22C34 23.6569 32.6569 25 31 25C29.3431 25 28 23.6569 28 22V18Z"
          fill="white"
        />
        <path
          d="M28 38C28 36.3431 29.3431 35 31 35C32.6569 35 34 36.3431 34 38V42C34 43.6569 32.6569 45 31 45C29.3431 45 28 43.6569 28 42V38Z"
          fill="white"
        />
      </svg>
    ),
    color: "#4A154B",
  },
  {
    name: "Discord",
    description: "Send alerts directly to Discord webhooks",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#5865F2" />
        <path
          d="M20 18C20 16.8954 20.8954 16 22 16H38C39.1046 16 40 16.8954 40 18V42C40 43.1046 39.1046 44 38 44H22C20.8954 44 20 43.1046 20 42V18Z"
          fill="white"
        />
        <path
          d="M25 22C25 20.8954 25.8954 20 27 20H33C34.1046 20 35 20.8954 35 22V38C35 39.1046 34.1046 40 33 40H27C25.8954 40 25 39.1046 25 38V22Z"
          fill="#5865F2"
        />
        <circle cx="30" cy="31" r="3" fill="white" />
        <path
          d="M28 28L32 32M32 28L28 32"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#5865F2",
  },
  {
    name: "PagerDuty",
    description: "Integrate with PagerDuty for incident management",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#06AD56" />
        <path d="M20 20H40V40H20V20Z" fill="white" />
        <path d="M25 25H35V35H25V25Z" fill="#06AD56" />
        <path d="M27 27H33V33H27V27Z" fill="white" />
      </svg>
    ),
    color: "#06AD56",
  },
  {
    name: "Microsoft Teams",
    description: "Post updates to Microsoft Teams channels",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#6264A7" />
        <path d="M20 20H40V40H20V20Z" fill="white" />
        <path d="M25 25H35V35H25V25Z" fill="#6264A7" />
        <circle cx="30" cy="30" r="3" fill="white" />
        <path
          d="M28 28L32 32M32 28L28 32"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#6264A7",
  },
  {
    name: "Email",
    description: "Send email notifications to your team",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#EA4335" />
        <path
          d="M15 20L30 30L45 20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="15"
          y="20"
          width="30"
          height="20"
          rx="2"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    ),
    color: "#EA4335",
  },
  {
    name: "Webhook",
    description: "Custom webhook integration for any service",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#173,216,230" />
        <path
          d="M20 20L40 40M40 20L20 40"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    ),
    color: "#173,216,230",
  },
  {
    name: "SMS",
    description: "Send SMS alerts via Twilio integration",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#F22F46" />
        <rect x="18" y="15" width="24" height="30" rx="3" fill="white" />
        <rect x="20" y="17" width="20" height="26" rx="1" fill="#F22F46" />
        <circle cx="30" cy="45" r="2" fill="white" />
      </svg>
    ),
    color: "#F22F46",
  },
  {
    name: "Telegram",
    description: "Get notifications in Telegram channels",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#0088CC" />
        <path
          d="M15 25L25 35L45 15"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 25L25 15L45 35"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="30" r="2" fill="white" />
      </svg>
    ),
    color: "#0088CC",
  },
  {
    name: "GitHub",
    description: "Connect with GitHub for repository monitoring",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#181717" />
        <path
          d="M30 15C21.716 15 15 21.716 15 30C15 36.084 19.584 41.184 25.5 42.9C26.2 43.05 26.4 42.6 26.4 42.2C26.4 41.85 26.38 40.8 26.38 39.6C23 40.2 22.2 38.4 21.8 37.5C21.6 37.1 20.8 36.2 20.2 35.8C19.7 35.5 19.1 35.1 20.1 35.1C21.1 35.1 21.8 36 22.1 36.4C23.2 38.2 24.9 37.8 26.5 37.2C26.7 36.4 27.1 35.9 27.5 35.6C24.5 35.3 21.4 34.2 21.4 30.6C21.4 29.1 21.9 27.9 22.2 27.3C22.1 27 21.6 25.4 22.4 23.4C22.4 23.4 23.6 23 26.4 25.2C27.2 25 28 24.9 28.8 24.9C29.6 24.9 30.4 25 31.2 25.2C34 23 35.2 23.4 35.2 23.4C36 25.4 35.5 27 35.4 27.3C35.7 27.9 36.2 29.1 36.2 30.6C36.2 34.2 33.1 35.3 30.1 35.6C30.6 36 31 36.6 31.2 37.5C31.8 38.1 32.4 39.2 32.4 40.8C32.4 42.6 32.4 44.1 32.4 44.2C32.4 44.6 32.6 45.05 33.3 44.9C39.216 43.184 43.8 38.084 43.8 32C43.8 21.716 37.084 15 30 15Z"
          fill="white"
        />
      </svg>
    ),
    color: "#181717",
  },
  {
    name: "Jira",
    description: "Create and track issues in Jira",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#0052CC" />
        <path d="M20 20H40V40H20V20Z" fill="white" />
        <path d="M25 25H35V35H25V25Z" fill="#0052CC" />
        <circle cx="30" cy="30" r="3" fill="white" />
        <path
          d="M28 28L32 32M32 28L28 32"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#0052CC",
  },
  {
    name: "Zapier",
    description: "Automate workflows with Zapier",
    logo: (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" rx="12" fill="#FF4A00" />
        <path
          d="M20 20L40 40M40 20L20 40"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <circle cx="30" cy="30" r="3" fill="white" />
      </svg>
    ),
    color: "#FF4A00",
  },
];

const IntegrationsPage = () => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
    >
      <GlassmorphismNavbar />

      {/* Hero Section */}
      <Container maxW="container.xl" pt={32} pb={20}>
        <VStack spacing={8} textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 30px rgba(173, 216, 230, 0.5)"
              letterSpacing="wider"
              fontFamily="mono"
            >
              Instant Integrations
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(173, 216, 230, 0.8)"
              maxW="600px"
              lineHeight="tall"
            >
              Connect with your favorite tools and services. Seamless
              integration with Slack, Discord, PagerDuty, and more.
            </Text>
          </motion.div>
        </VStack>
      </Container>

      {/* Integrations Grid */}
      <Container maxW="container.xl" py={20}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {/* Integration Cards */}
          {integrations.map((integration, index) => (
            <MotionGridItem
              key={integration.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <MotionBox
                p={6}
                borderRadius="xl"
                backdropFilter="blur(20px)"
                bg={bgColor}
                border="1px solid"
                borderColor={borderColor}
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                position="relative"
                overflow="hidden"
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(173, 216, 230, 0.2)",
                    "0 0 30px rgba(173, 216, 230, 0.4)",
                    "0 0 20px rgba(173, 216, 230, 0.2)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                _hover={{
                  borderColor: "rgba(173, 216, 230, 0.6)",
                  boxShadow: "0 12px 40px rgba(173, 216, 230, 0.3)",
                }}
                cursor="pointer"
              >
                {/* Glowing border effect */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="rgba(173, 216, 230, 0.3)"
                  boxShadow="0 0 20px rgba(173, 216, 230, 0.2)"
                  pointerEvents="none"
                />

                <VStack spacing={4} align="stretch">
                  <HStack spacing={4}>
                    <Box
                      w="60px"
                      h="60px"
                      borderRadius="lg"
                      overflow="hidden"
                      bg={integration.color}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                    >
                      {integration.logo}
                    </Box>
                    <VStack spacing={1} align="start" flex={1}>
                      <Text fontSize="lg" fontWeight="semibold" color="white">
                        {integration.name}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="rgba(255, 255, 255, 0.7)"
                        lineHeight="tall"
                      >
                        {integration.description}
                      </Text>
                    </VStack>
                  </HStack>

                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="rgba(173, 216, 230, 0.4)"
                    color="rgba(173, 216, 230, 0.8)"
                    _hover={{
                      borderColor: "rgba(173, 216, 230, 0.8)",
                      color: "rgba(173, 216, 230, 1)",
                      bg: "rgba(173, 216, 230, 0.1)",
                    }}
                    transition="all 0.3s ease"
                  >
                    Configure
                  </Button>
                </VStack>
              </MotionBox>
            </MotionGridItem>
          ))}

          {/* Create New Incident Card - Special Animation */}
          <MotionGridItem
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: integrations.length * 0.1,
            }}
          >
            <MotionBox
              p={6}
              borderRadius="xl"
              backdropFilter="blur(20px)"
              bg="rgba(173, 216, 230, 0.1)"
              border="2px solid"
              borderColor="rgba(173, 216, 230, 0.5)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              position="relative"
              overflow="hidden"
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              animate={{
                boxShadow: [
                  "0 0 30px rgba(173, 216, 230, 0.3)",
                  "0 0 50px rgba(173, 216, 230, 0.6)",
                  "0 0 30px rgba(173, 216, 230, 0.3)",
                ],
                scale: [1, 1.02, 1],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              _hover={{
                borderColor: "rgba(173, 216, 230, 0.8)",
                boxShadow: "0 12px 40px rgba(173, 216, 230, 0.4)",
              }}
            >
              {/* Enhanced glowing border effect */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                borderRadius="xl"
                border="2px solid"
                borderColor="rgba(173, 216, 230, 0.5)"
                boxShadow="0 0 30px rgba(173, 216, 230, 0.3)"
                pointerEvents="none"
              />

              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Box
                    w="60px"
                    h="60px"
                    borderRadius="lg"
                    bg="rgba(173, 216, 230, 0.2)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="2px solid"
                    borderColor="rgba(173, 216, 230, 0.4)"
                  >
                    <BoltIcon
                      className="w-8 h-8"
                      style={{ color: "rgba(173, 216, 230, 1)" }}
                    />
                  </Box>
                  <VStack spacing={1} align="start" flex={1}>
                    <Text fontSize="lg" fontWeight="semibold" color="white">
                      Create New Incident
                    </Text>
                    <Text
                      fontSize="sm"
                      color="rgba(255, 255, 255, 0.7)"
                      lineHeight="tall"
                    >
                      Manually create and manage incidents
                    </Text>
                  </VStack>
                </HStack>

                {/* Form Elements */}
                <VStack spacing={3} align="stretch">
                  <Input
                    placeholder="Incident Title"
                    bg="rgba(255, 255, 255, 0.1)"
                    border="1px solid"
                    borderColor="rgba(173, 216, 230, 0.3)"
                    color="white"
                    _placeholder={{ color: "rgba(255, 255, 255, 0.5)" }}
                    _focus={{
                      borderColor: "rgba(173, 216, 230, 0.6)",
                      boxShadow: "0 0 0 1px rgba(173, 216, 230, 0.2)",
                    }}
                  />

                  <Select
                    placeholder="Select Status"
                    bg="rgba(255, 255, 255, 0.1)"
                    border="1px solid"
                    borderColor="rgba(173, 216, 230, 0.3)"
                    color="white"
                    _focus={{
                      borderColor: "rgba(173, 216, 230, 0.6)",
                      boxShadow: "0 0 0 1px rgba(173, 216, 230, 0.2)",
                    }}
                  >
                    <option
                      value="investigating"
                      style={{ background: "#0a0a0a", color: "white" }}
                    >
                      Investigating
                    </option>
                    <option
                      value="identified"
                      style={{ background: "#0a0a0a", color: "white" }}
                    >
                      Identified
                    </option>
                    <option
                      value="monitoring"
                      style={{ background: "#0a0a0a", color: "white" }}
                    >
                      Monitoring
                    </option>
                    <option
                      value="resolved"
                      style={{ background: "#0a0a0a", color: "white" }}
                    >
                      Resolved
                    </option>
                  </Select>

                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      bg="rgba(173, 216, 230, 0.9)"
                      color="gray.800"
                      _hover={{
                        bg: "rgba(173, 216, 230, 1)",
                        transform: "translateY(-1px)",
                      }}
                      transition="all 0.3s ease"
                      flex={1}
                    >
                      Create Incident
                    </Button>
                    <IconButton
                      size="sm"
                      aria-label="Add component"
                      icon={<PlusIcon className="w-4 h-4" />}
                      bg="rgba(173, 216, 230, 0.2)"
                      border="1px solid"
                      borderColor="rgba(173, 216, 230, 0.4)"
                      color="rgba(173, 216, 230, 0.8)"
                      _hover={{
                        bg: "rgba(173, 216, 230, 0.3)",
                        borderColor: "rgba(173, 216, 230, 0.6)",
                      }}
                      transition="all 0.3s ease"
                    />
                  </HStack>
                </VStack>
              </VStack>
            </MotionBox>
          </MotionGridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default IntegrationsPage;
