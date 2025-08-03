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
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: ChartBarIcon,
      title: t("homepage.features.monitorEverything.title"),
      description: t("homepage.features.monitorEverything.description"),
      color: "blue.500",
    },
    {
      icon: ShieldCheckIcon,
      title: t("homepage.features.fixIncidents.title"),
      description: t("homepage.features.fixIncidents.description"),
      color: "green.500",
    },
    {
      icon: GlobeAltIcon,
      title: t("homepage.features.publishStatus.title"),
      description: t("homepage.features.publishStatus.description"),
      color: "purple.500",
    },
    {
      icon: BellIcon,
      title: t("homepage.features.realTimeAlerts.title"),
      description: t("homepage.features.realTimeAlerts.description"),
      color: "orange.500",
    },
    {
      icon: CogIcon,
      title: t("homepage.features.easyIntegrations.title"),
      description: t("homepage.features.easyIntegrations.description"),
      color: "teal.500",
    },
    {
      icon: ClockIcon,
      title: t("homepage.features.continuousMonitoring.title"),
      description: t("homepage.features.continuousMonitoring.description"),
      color: "red.500",
    },
  ];

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
              {t("homepage.features.title")}
            </Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
              {t("homepage.features.subtitle")}
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
