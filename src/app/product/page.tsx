"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Heading,
  Button,
  Grid,
  GridItem,
  Icon,
  Image,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EyeIcon,
  BoltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import GlassmorphismNavbar from "@/components/GlassmorphismNavbar";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

// Product features data
const features = [
  {
    icon: EyeIcon,
    title: "Real-time Monitoring",
    description:
      "Monitor your services with millisecond precision. Get instant visibility into your infrastructure health.",
    color: "rgba(173, 216, 230, 1)",
  },
  {
    icon: BoltIcon,
    title: "Intelligent Detection",
    description:
      "AI-powered anomaly detection that learns your system patterns and alerts you before issues occur.",
    color: "rgba(255, 193, 7, 1)",
  },
  {
    icon: ShieldCheckIcon,
    title: "Advanced Security",
    description:
      "Enterprise-grade security with end-to-end encryption and SOC 2 compliance.",
    color: "rgba(40, 167, 69, 1)",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics Dashboard",
    description:
      "Beautiful, customizable dashboards with real-time metrics and historical data visualization.",
    color: "rgba(220, 53, 69, 1)",
  },
  {
    icon: BellIcon,
    title: "Smart Notifications",
    description:
      "Intelligent alerting that reduces noise and ensures you never miss critical issues.",
    color: "rgba(111, 66, 193, 1)",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Monitoring",
    description:
      "Monitor from multiple global locations to ensure your services work everywhere.",
    color: "rgba(23, 162, 184, 1)",
  },
];

// Demo screenshots
const demoScreenshots = [
  {
    title: "Dashboard Overview",
    description: "Get a bird's eye view of all your services",
    image: "/api/placeholder/400/250/173,216,230/0a0a0a?text=Dashboard",
  },
  {
    title: "Service Details",
    description: "Deep dive into individual service metrics",
    image: "/api/placeholder/400/250/173,216,230/0a0a0a?text=Service+Details",
  },
  {
    title: "Incident Management",
    description: "Handle incidents with precision and speed",
    image:
      "/api/placeholder/400/250/173,216,230/0a0a0a?text=Incident+Management",
  },
];

const ProductPage = () => {
  const { t } = useTranslation();
  const [activeDemo, setActiveDemo] = useState(0);
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
        <VStack spacing={12} textAlign="center">
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
              {t("product.hero.title")}
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
              {t("product.hero.subtitle")}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <HStack spacing={4} justify="center">
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
                  {t("product.hero.primaryCta")}
                </Button>
              </motion.div>

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
                  _hover={{
                    borderColor: "rgba(173, 216, 230, 0.8)",
                    color: "rgba(173, 216, 230, 1)",
                    bg: "rgba(173, 216, 230, 0.1)",
                  }}
                  transition="all 0.3s ease"
                >
                  {t("product.hero.secondaryCta")}
                </Button>
              </motion.div>
            </HStack>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <HStack spacing={8} justify="center" wrap="wrap">
              <VStack spacing={1}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="rgba(173, 216, 230, 1)"
                >
                  99.9%
                </Text>
                <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
                  Uptime Guarantee
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="rgba(173, 216, 230, 1)"
                >
                  &lt;50ms
                </Text>
                <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
                  Response Time
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="rgba(173, 216, 230, 1)"
                >
                  24/7
                </Text>
                <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)">
                  Support
                </Text>
              </VStack>
            </HStack>
          </motion.div>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
              mb={4}
            >
              {t("product.features.title")}
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(173, 216, 230, 0.8)"
              maxW="600px"
            >
              Everything you need to monitor your infrastructure with confidence
            </Text>
          </motion.div>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {features.map((feature, index) => (
              <MotionGridItem
                key={feature.title}
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
                  _hover={{
                    borderColor: "rgba(173, 216, 230, 0.6)",
                    boxShadow: "0 12px 40px rgba(173, 216, 230, 0.2)",
                  }}
                  transition="all 0.3s ease"
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
                    <Box
                      w="60px"
                      h="60px"
                      borderRadius="lg"
                      bg="rgba(173, 216, 230, 0.1)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="2px solid"
                      borderColor="rgba(173, 216, 230, 0.3)"
                    >
                      <Icon
                        as={feature.icon}
                        w={8}
                        h={8}
                        color={feature.color}
                      />
                    </Box>

                    <VStack spacing={2} align="start">
                      <Heading fontSize="xl" fontWeight="bold" color="white">
                        {feature.title}
                      </Heading>
                      <Text
                        fontSize="sm"
                        color="rgba(255, 255, 255, 0.7)"
                        lineHeight="tall"
                      >
                        {feature.description}
                      </Text>
                    </VStack>
                  </VStack>
                </MotionBox>
              </MotionGridItem>
            ))}
          </Grid>
        </VStack>
      </Container>

      {/* Demo Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
              mb={4}
            >
              See It In Action
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(173, 216, 230, 0.8)"
              maxW="600px"
            >
              Explore our beautiful, intuitive interface designed for modern
              teams
            </Text>
          </motion.div>

          <Box w="full" maxW="800px">
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
                {/* Demo Navigation */}
                <HStack spacing={4} justify="center" wrap="wrap">
                  {demoScreenshots.map((demo, index) => (
                    <Button
                      key={demo.title}
                      size="sm"
                      variant={activeDemo === index ? "solid" : "outline"}
                      bg={
                        activeDemo === index
                          ? "rgba(173, 216, 230, 0.9)"
                          : "transparent"
                      }
                      color={
                        activeDemo === index
                          ? "gray.800"
                          : "rgba(173, 216, 230, 0.8)"
                      }
                      borderColor="rgba(173, 216, 230, 0.4)"
                      _hover={{
                        bg:
                          activeDemo === index
                            ? "rgba(173, 216, 230, 1)"
                            : "rgba(173, 216, 230, 0.1)",
                        borderColor: "rgba(173, 216, 230, 0.8)",
                      }}
                      onClick={() => setActiveDemo(index)}
                      transition="all 0.3s ease"
                    >
                      {demo.title}
                    </Button>
                  ))}
                </HStack>

                {/* Demo Image */}
                <AnimatePresence mode="wait">
                  <MotionBox
                    key={activeDemo}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      borderRadius="xl"
                      overflow="hidden"
                      boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
                      position="relative"
                    >
                      <Image
                        src={demoScreenshots[activeDemo].image}
                        alt={demoScreenshots[activeDemo].title}
                        w="full"
                        h="auto"
                      />
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="linear-gradient(transparent, rgba(0, 0, 0, 0.8))"
                        p={4}
                      >
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="white"
                          mb={1}
                        >
                          {demoScreenshots[activeDemo].title}
                        </Text>
                        <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                          {demoScreenshots[activeDemo].description}
                        </Text>
                      </Box>
                    </Box>
                  </MotionBox>
                </AnimatePresence>
              </VStack>
            </MotionBox>
          </Box>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Container maxW="container.xl" py={20}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box
            p={12}
            borderRadius="2xl"
            backdropFilter="blur(20px)"
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            textAlign="center"
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
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                color="white"
                textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
              >
                Ready to Get Started?
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="rgba(173, 216, 230, 0.8)"
                maxW="600px"
                lineHeight="tall"
              >
                Join thousands of teams who trust Prism to monitor their
                critical infrastructure. Start your free trial today.
              </Text>

              <HStack spacing={4} justify="center" wrap="wrap">
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
                    Start Free Trial
                  </Button>
                </motion.div>

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
                    _hover={{
                      borderColor: "rgba(173, 216, 230, 0.8)",
                      color: "rgba(173, 216, 230, 1)",
                      bg: "rgba(173, 216, 230, 0.1)",
                    }}
                    transition="all 0.3s ease"
                  >
                    Schedule Demo
                  </Button>
                </motion.div>
              </HStack>

              <HStack spacing={6} justify="center" wrap="wrap">
                <Badge
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg="rgba(173, 216, 230, 0.2)"
                  color="rgba(173, 216, 230, 1)"
                  fontSize="sm"
                >
                  No Credit Card Required
                </Badge>
                <Badge
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg="rgba(173, 216, 230, 0.2)"
                  color="rgba(173, 216, 230, 1)"
                  fontSize="sm"
                >
                  14-Day Free Trial
                </Badge>
                <Badge
                  px={3}
                  py={1}
                  borderRadius="full"
                  bg="rgba(173, 216, 230, 0.2)"
                  color="rgba(173, 216, 230, 1)"
                  fontSize="sm"
                >
                  Cancel Anytime
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProductPage;
