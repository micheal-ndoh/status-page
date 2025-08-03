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
    logo: "/logo/slack.png",
    color: "#4A154B",
  },
  {
    name: "Discord",
    description: "Send alerts directly to Discord webhooks",
    logo: "/logo/discord-02.png",
    color: "#5865F2",
  },
  {
    name: "PagerDuty",
    description: "Integrate with PagerDuty for incident management",
    logo: "/logo/PagerDuty_Logo-700x144.png",
    color: "black",
  },
  {
    name: "Microsoft Teams",
    description: "Post updates to Microsoft Teams channels",
    logo: "/logo/Microsoft_Teams-Logo.wine.svg",
    color: "#6264A7",
  },
  {
    name: "Email",
    description: "Send email notifications to your team",
    logo: "/logo/email-png-png-image-pngimg-10.png",
    color: "grey",
  },
  {
    name: "Webhook",
    description: "Custom webhook integration for any service",
    logo: "/logo/webhooks-logo-png-transparent.png",
    color: "#173,216,230",
  },
  {
    name: "SMS",
    description: "Send SMS alerts via Twilio integration",
    logo: "/logo/sms-png-13.png",
    color: "white",
  },
  {
    name: "Telegram",
    description: "Get notifications in Telegram channels",
    logo: "/logo/telegram-logo-7.png",
    color: "#0088CC",
  },
  {
    name: "GitHub",
    description: "Connect with GitHub for repository monitoring",
    logo: "/logo/github-logo-png_seeklogo-480450.png",
    color: "#181717",
  },
  {
    name: "Jira",
    description: "Create and track issues in Jira",
    logo: "/logo/jira.png",
    color: "#0052CC",
  },
  {
    name: "Zapier",
    description: "Automate workflows with Zapier",
    logo: "/logo/zapier-logo-png-transparent.png",
    color: "white",
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
                      <Image
                        src={integration.logo}
                        alt={integration.name}
                        w="40px"
                        h="40px"
                        objectFit="contain"
                      />
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
