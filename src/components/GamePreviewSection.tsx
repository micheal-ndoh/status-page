"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Card,
  CardBody,
  Badge,
  Progress,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlayIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

// Mock game data for preview
const mockServices = [
  { id: "1", name: "Web Server", status: "operational", uptime: 99.9 },
  { id: "2", name: "Database", status: "operational", uptime: 99.8 },
  { id: "3", name: "API Gateway", status: "degraded", uptime: 85.2 },
  { id: "4", name: "CDN", status: "operational", uptime: 99.9 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return "success";
    case "degraded":
      return "warning";
    case "outage":
      return "error";
    default:
      return "gray";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational":
      return CheckCircleIcon;
    case "degraded":
      return ExclamationTriangleIcon;
    case "outage":
      return XCircleIcon;
    default:
      return CheckCircleIcon;
  }
};

const GamePreviewSection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

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
    <Box py={20} bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW="container.xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <MotionBox variants={itemVariants} textAlign="center" mb={16}>
            <Heading
              size="2xl"
              fontWeight="bold"
              mb={4}
              bgGradient="linear(to-r, brand.500, purple.600)"
              bgClip="text"
            >
              {t("game.preview.title")}
            </Heading>
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")} maxW="2xl" mx="auto">
              {t("game.preview.subtitle")}
            </Text>
          </MotionBox>

          {/* Game Preview */}
          <MotionBox variants={itemVariants}>
            <Card
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
            >
              <CardBody p={8}>
                <VStack spacing={8} align="stretch">
                  {/* Game Header */}
                  <HStack justify="space-between" align="center">
                    <VStack align="start" spacing={2}>
                      <Heading size="lg" color={useColorModeValue("gray.800", "white")}>
                        {t("game.preview.gameTitle")}
                      </Heading>
                      <Text color={useColorModeValue("gray.600", "gray.400")}>
                        {t("game.preview.gameDescription")}
                      </Text>
                    </VStack>
                    <Badge
                      colorScheme="green"
                      size="lg"
                      px={4}
                      py={2}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {t("game.preview.live")}
                    </Badge>
                  </HStack>

                  {/* Services Grid */}
                  <Box>
                    <Text
                      fontWeight="semibold"
                      mb={4}
                      color={useColorModeValue("gray.700", "gray.300")}
                    >
                      {t("game.preview.services")}
                    </Text>
                    <VStack spacing={4}>
                      {mockServices.map((service) => {
                        const StatusIcon = getStatusIcon(service.status);
                        return (
                          <MotionCard
                            key={service.id}
                            whileHover={{ y: -2, scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            bg={useColorModeValue("gray.50", "gray.700")}
                            border="1px"
                            borderColor={useColorModeValue("gray.200", "gray.600")}
                          >
                            <CardBody p={4}>
                              <HStack justify="space-between" align="center">
                                <HStack spacing={3}>
                                  <Icon
                                    as={StatusIcon}
                                    w={5}
                                    h={5}
                                    color={`${getStatusColor(service.status)}.500`}
                                  />
                                  <VStack align="start" spacing={0}>
                                    <Text fontWeight="semibold" fontSize="sm">
                                      {service.name}
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                      {t("game.uptime")}: {service.uptime}%
                                    </Text>
                                  </VStack>
                                </HStack>
                                <Badge
                                  colorScheme={getStatusColor(service.status)}
                                  size="sm"
                                  variant="subtle"
                                >
                                  {service.status}
                                </Badge>
                              </HStack>
                              <Progress
                                value={service.uptime}
                                colorScheme={getStatusColor(service.status)}
                                size="sm"
                                mt={3}
                                borderRadius="full"
                              />
                            </CardBody>
                          </MotionCard>
                        );
                      })}
                    </VStack>
                  </Box>

                  {/* Game Stats */}
                  <HStack justify="space-between" p={4} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="xl">
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.500">
                        {t("game.preview.score")}
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">
                        1,250
                      </Text>
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.500">
                        {t("game.preview.time")}
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">
                        05:32
                      </Text>
                    </VStack>
                    <VStack align="start" spacing={1}>
                      <Text fontSize="sm" color="gray.500">
                        {t("game.preview.incidents")}
                      </Text>
                      <Text fontWeight="bold" fontSize="lg">
                        3
                      </Text>
                    </VStack>
                  </HStack>

                  {/* CTA */}
                  <VStack spacing={4}>
                    <MotionButton
                      size="lg"
                      colorScheme="brand"
                      leftIcon={<PlayIcon className="w-5 h-5" />}
                      rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                      onClick={() => router.push("/game")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      px={8}
                      py={4}
                      borderRadius="xl"
                    >
                      {t("game.preview.playNow")}
                    </MotionButton>
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      {t("game.preview.freeToPlay")}
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default GamePreviewSection; 