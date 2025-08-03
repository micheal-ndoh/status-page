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
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CheckIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import GlassmorphismNavbar from "@/components/GlassmorphismNavbar";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

// Pricing data
const pricingData = {
  monthly: {
    starter: { price: 0, features: ["5 Monitors", "1 Check", "Basic Alerts", "Email Support"] },
    pro: { price: 29, features: ["25 Monitors", "5 Checks", "Advanced Alerts", "Priority Support", "Custom Domains", "API Access"] },
    business: { price: 99, features: ["Unlimited Monitors", "Unlimited Checks", "All Alerts", "24/7 Support", "Custom Domains", "API Access", "SSO", "Advanced Analytics"] },
  },
  yearly: {
    starter: { price: 0, features: ["5 Monitors", "1 Check", "Basic Alerts", "Email Support"] },
    pro: { price: 22, features: ["25 Monitors", "5 Checks", "Advanced Alerts", "Priority Support", "Custom Domains", "API Access"] },
    business: { price: 74, features: ["Unlimited Monitors", "Unlimited Checks", "All Alerts", "24/7 Support", "Custom Domains", "API Access", "SSO", "Advanced Analytics"] },
  },
};

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );

  const currentPricing = isYearly ? pricingData.yearly : pricingData.monthly;

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
              Pricing
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
              Choose the perfect plan for your monitoring needs. Start free and scale as you grow.
            </Text>
          </motion.div>

          {/* Pricing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <HStack spacing={6} justify="center">
              <Text
                color={!isYearly ? "white" : "rgba(255, 255, 255, 0.6)"}
                fontSize="lg"
                fontWeight="medium"
                transition="color 0.3s ease"
              >
                Monthly
              </Text>
              
              <MotionBox
                w="60px"
                h="32px"
                borderRadius="full"
                bg={isYearly ? "rgba(173, 216, 230, 0.9)" : "rgba(255, 255, 255, 0.2)"}
                position="relative"
                cursor="pointer"
                onClick={() => setIsYearly(!isYearly)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                boxShadow={isYearly ? "0 0 20px rgba(173, 216, 230, 0.4)" : "none"}
                transition="all 0.3s ease"
              >
                <MotionBox
                  w="24px"
                  h="24px"
                  borderRadius="full"
                  bg="white"
                  position="absolute"
                  top="4px"
                  left={isYearly ? "32px" : "4px"}
                  transition="left 0.3s ease"
                  boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
                />
              </MotionBox>
              
              <HStack spacing={2}>
                <Text
                  color={isYearly ? "white" : "rgba(255, 255, 255, 0.6)"}
                  fontSize="lg"
                  fontWeight="medium"
                  transition="color 0.3s ease"
                >
                  Yearly
                </Text>
                <Box
                  px={2}
                  py={1}
                  borderRadius="full"
                  bg="rgba(173, 216, 230, 0.2)"
                  border="1px solid"
                  borderColor="rgba(173, 216, 230, 0.4)"
                >
                  <Text
                    fontSize="xs"
                    color="rgba(173, 216, 230, 1)"
                    fontWeight="bold"
                  >
                    25% OFF
                  </Text>
                </Box>
              </HStack>
            </HStack>
          </motion.div>
        </VStack>
      </Container>

      {/* Pricing Table */}
      <Container maxW="container.xl" py={20}>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Box
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

            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(3, 1fr)",
              }}
              gap={8}
            >
              {/* Starter Plan */}
              <MotionGridItem
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <VStack spacing={6} align="stretch">
                  <VStack spacing={2}>
                    <Heading
                      fontSize="2xl"
                      fontWeight="bold"
                      color="white"
                    >
                      Starter
                    </Heading>
                    <HStack spacing={1} align="baseline">
                      <Text
                        fontSize="4xl"
                        fontWeight="bold"
                        color="rgba(173, 216, 230, 1)"
                      >
                        ${currentPricing.starter.price}
                      </Text>
                      <Text
                        fontSize="lg"
                        color="rgba(255, 255, 255, 0.6)"
                      >
                        /{isYearly ? "year" : "month"}
                      </Text>
                    </HStack>
                  </VStack>

                  <VStack spacing={3} align="stretch">
                    {currentPricing.starter.features.map((feature, index) => (
                      <HStack key={index} spacing={3}>
                        <Icon
                          as={CheckIcon}
                          w={5}
                          h={5}
                          color="rgba(173, 216, 230, 1)"
                        />
                        <Text
                          fontSize="sm"
                          color="rgba(255, 255, 255, 0.8)"
                        >
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      w="full"
                      bg="rgba(173, 216, 230, 0.9)"
                      color="gray.800"
                      fontSize="md"
                      fontWeight="semibold"
                      py={3}
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
                      Start Free
                    </Button>
                  </motion.div>
                </VStack>
              </MotionGridItem>

              {/* Pro Plan - Highlighted */}
              <MotionGridItem
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  backdropFilter="blur(20px)"
                  bg="rgba(173, 216, 230, 0.1)"
                  border="2px solid"
                  borderColor="rgba(173, 216, 230, 0.5)"
                  boxShadow="0 0 30px rgba(173, 216, 230, 0.3)"
                  position="relative"
                  transform="scale(1.05)"
                >
                  {/* Recommended badge */}
                  <Box
                    position="absolute"
                    top="-12px"
                    left="50%"
                    transform="translateX(-50%)"
                    px={4}
                    py={1}
                    borderRadius="full"
                    bg="rgba(173, 216, 230, 0.9)"
                    border="1px solid"
                    borderColor="rgba(173, 216, 230, 1)"
                  >
                    <Text
                      fontSize="xs"
                      color="gray.800"
                      fontWeight="bold"
                    >
                      RECOMMENDED
                    </Text>
                  </Box>

                  <VStack spacing={6} align="stretch">
                    <VStack spacing={2}>
                      <Heading
                        fontSize="2xl"
                        fontWeight="bold"
                        color="white"
                      >
                        Pro
                      </Heading>
                      <HStack spacing={1} align="baseline">
                        <Text
                          fontSize="4xl"
                          fontWeight="bold"
                          color="rgba(173, 216, 230, 1)"
                        >
                          ${currentPricing.pro.price}
                        </Text>
                        <Text
                          fontSize="lg"
                          color="rgba(255, 255, 255, 0.6)"
                        >
                          /{isYearly ? "year" : "month"}
                        </Text>
                      </HStack>
                    </VStack>

                    <VStack spacing={3} align="stretch">
                      {currentPricing.pro.features.map((feature, index) => (
                        <HStack key={index} spacing={3}>
                          <Icon
                            as={CheckIcon}
                            w={5}
                            h={5}
                            color="rgba(173, 216, 230, 1)"
                          />
                          <Text
                            fontSize="sm"
                            color="rgba(255, 255, 255, 0.8)"
                          >
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        w="full"
                        bg="rgba(173, 216, 230, 0.9)"
                        color="gray.800"
                        fontSize="md"
                        fontWeight="semibold"
                        py={3}
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
                        Start Trial
                      </Button>
                    </motion.div>
                  </VStack>
                </Box>
              </MotionGridItem>

              {/* Business Plan */}
              <MotionGridItem
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <VStack spacing={6} align="stretch">
                  <VStack spacing={2}>
                    <Heading
                      fontSize="2xl"
                      fontWeight="bold"
                      color="white"
                    >
                      Business
                    </Heading>
                    <HStack spacing={1} align="baseline">
                      <Text
                        fontSize="4xl"
                        fontWeight="bold"
                        color="rgba(173, 216, 230, 1)"
                      >
                        ${currentPricing.business.price}
                      </Text>
                      <Text
                        fontSize="lg"
                        color="rgba(255, 255, 255, 0.6)"
                      >
                        /{isYearly ? "year" : "month"}
                      </Text>
                    </HStack>
                  </VStack>

                  <VStack spacing={3} align="stretch">
                    {currentPricing.business.features.map((feature, index) => (
                      <HStack key={index} spacing={3}>
                        <Icon
                          as={CheckIcon}
                          w={5}
                          h={5}
                          color="rgba(173, 216, 230, 1)"
                        />
                        <Text
                          fontSize="sm"
                          color="rgba(255, 255, 255, 0.8)"
                        >
                          {feature}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      w="full"
                      bg="rgba(173, 216, 230, 0.9)"
                      color="gray.800"
                      fontSize="md"
                      fontWeight="semibold"
                      py={3}
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
                      Start Trial
                    </Button>
                  </motion.div>
                </VStack>
              </MotionGridItem>
            </Grid>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default PricingPage;
