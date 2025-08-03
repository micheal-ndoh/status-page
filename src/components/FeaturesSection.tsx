"use client";

import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BellIcon,
  CogIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const MotionBox = motion(Box);

const features = [
  {
    icon: ChartBarIcon,
    title: "Monitor everything",
    description:
      "Check all your services and track availability and performance with real-time alerts across all channels.",
    color: "blue.500",
  },
  {
    icon: ShieldCheckIcon,
    title: "Fix incidents with your team",
    description:
      "Integrate with tools you already use and collaborate on incidents with your team from Slack & Teams.",
    color: "green.500",
  },
  {
    icon: GlobeAltIcon,
    title: "Publish to Status Page",
    description:
      "Make it yours, make it private, or share to the world! Publish updates to your custom status page.",
    color: "purple.500",
  },
  {
    icon: BellIcon,
    title: "Real-time alerts",
    description:
      "Get instant notifications when issues arise. Never miss a critical incident with our smart alerting system.",
    color: "orange.500",
  },
  {
    icon: CogIcon,
    title: "Easy integrations",
    description:
      "Connect with your existing tools and workflows. We integrate with all major platforms and services.",
    color: "teal.500",
  },
  {
    icon: ClockIcon,
    title: "24/7 monitoring",
    description:
      "Continuous monitoring ensures you catch issues before they impact your users. Always be one step ahead.",
    color: "red.500",
  },
];

const FeaturesSection = () => {
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box py={20} bg={bgColor}>
      <Container maxW="container.xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          textAlign="center"
          mb={16}
        >
          <MotionBox variants={itemVariants}>
            <Heading
              size="2xl"
              fontWeight="bold"
              mb={4}
              bgGradient="linear(to-r, brand.500, purple.600)"
              bgClip="text"
            >
              Monitor everything
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
              Houston, we have a problem. But with Prism, you'll always know
              about it first.
            </Text>
          </MotionBox>
        </MotionBox>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
        >
          {features.map((feature, index) => (
            <MotionBox
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <VStack
                spacing={4}
                align="start"
                p={6}
                borderRadius="xl"
                bg={useColorModeValue("gray.50", "gray.800")}
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                h="full"
                _hover={{
                  borderColor: feature.color,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
                transition="all 0.3s"
              >
                <Box
                  w={12}
                  h={12}
                  borderRadius="lg"
                  bg={`${feature.color}20`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={feature.icon} w={6} h={6} color={feature.color} />
                </Box>
                <Heading size="md" fontWeight="bold">
                  {feature.title}
                </Heading>
                <Text color={textColor} lineHeight="tall">
                  {feature.description}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
