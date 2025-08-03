"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  Progress,
  Badge,
  Icon,
  useToast,
  Grid,
  useTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionCard = motion(Card);

interface Service {
  id: string;
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: number;
}

const initialServices: Service[] = [
  { id: "1", name: "Web Server", status: "operational", uptime: 99.9 },
  { id: "2", name: "Database", status: "operational", uptime: 99.8 },
  { id: "3", name: "API Gateway", status: "operational", uptime: 99.7 },
  { id: "4", name: "CDN", status: "operational", uptime: 99.9 },
];

export default function StatusGame() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const toast = useToast();
  const theme = useTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !gameOver) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);

        // Randomly trigger incidents
        if (Math.random() < 0.02) {
          // 2% chance per second
          triggerRandomIncident();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  const triggerRandomIncident = () => {
    const randomService = services[Math.floor(Math.random() * services.length)];
    const incidentTypes = ["degraded", "outage"] as const;
    const incidentType =
      incidentTypes[Math.floor(Math.random() * incidentTypes.length)];

    setServices((prev) =>
      prev.map((service) =>
        service.id === randomService.id
          ? {
              ...service,
              status: incidentType,
              uptime: incidentType === "outage" ? 0 : 85,
            }
          : service
      )
    );

    toast({
      title: `🚨 Incident Detected!`,
      description: `${randomService.name} is experiencing ${incidentType} performance.`,
      status: incidentType === "outage" ? "error" : "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFixService = (serviceId: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, status: "operational", uptime: 99.9 }
          : service
      )
    );

    setScore((prev) => prev + 10);

    toast({
      title: "✅ Service Fixed!",
      description: "Great job! You've resolved the incident.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const startGame = () => {
    setServices(initialServices);
    setScore(0);
    setTime(0);
    setGameOver(false);
    setIsRunning(true);
  };

  const stopGame = () => {
    setIsRunning(false);
  };

  const resetGame = () => {
    setServices(initialServices);
    setScore(0);
    setTime(0);
    setGameOver(false);
    setIsRunning(false);
  };

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")} py={20}>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          {/* Game Header */}
          <VStack spacing={6} textAlign="center">
            <Logo size="lg" />
            <Heading
              size="2xl"
              fontWeight="bold"
              bgGradient="linear(to-r, brand.500, purple.600)"
              bgClip="text"
              fontFamily={theme.fonts.logo}
              letterSpacing="wider"
            >
              Status Game
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Monitor your services and fix incidents as they occur!
            </Text>
          </VStack>

          {/* Game Stats */}
          <HStack spacing={8} justify="center">
            <VStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Score
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="brand.600">
                {score}
              </Text>
            </VStack>
            <VStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Time
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="purple.600">
                {formatTime(time)}
              </Text>
            </VStack>
            <VStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Status
              </Text>
              <Badge colorScheme={isRunning ? "green" : "gray"} size="lg">
                {isRunning ? "Running" : "Stopped"}
              </Badge>
            </VStack>
          </HStack>

          {/* Game Controls */}
          <HStack spacing={4}>
            {!isRunning ? (
              <MotionButton
                colorScheme="brand"
                size="lg"
                leftIcon={<PlayIcon className="w-5 h-5" />}
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("game.startGame")}
              </MotionButton>
            ) : (
              <MotionButton
                colorScheme="orange"
                size="lg"
                leftIcon={<PauseIcon className="w-5 h-5" />}
                onClick={stopGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("game.pauseGame")}
              </MotionButton>
            )}
            <MotionButton
              variant="outline"
              size="lg"
              leftIcon={<ArrowPathIcon className="w-5 h-5" />}
              onClick={resetGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("game.reset")}
            </MotionButton>
          </HStack>

          {/* Services Grid */}
          <Box w="full">
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={6}
            >
              {services.map((service) => {
                const StatusIcon = getStatusIcon(service.status);
                return (
                  <MotionCard
                    key={service.id}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <HStack spacing={3}>
                            <Icon
                              as={StatusIcon}
                              w={6}
                              h={6}
                              color={`${getStatusColor(service.status)}.500`}
                            />
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold" fontSize="lg">
                                {service.name}
                              </Text>
                              <Text fontSize="sm" color="gray.500">
                                {t("game.uptime")}: {service.uptime}%
                              </Text>
                            </VStack>
                          </HStack>
                          <Badge
                            colorScheme={getStatusColor(service.status)}
                            size="lg"
                          >
                            {service.status}
                          </Badge>
                        </HStack>

                        <Progress
                          value={service.uptime}
                          colorScheme={getStatusColor(service.status)}
                          size="sm"
                          borderRadius="full"
                        />

                        {service.status !== "operational" && isRunning && (
                          <MotionButton
                            colorScheme="green"
                            size="sm"
                            onClick={() => handleFixService(service.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {t("game.fixService")}
                          </MotionButton>
                        )}
                      </VStack>
                    </CardBody>
                  </MotionCard>
                );
              })}
            </Grid>
          </Box>

          {/* Instructions */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="start">
                <Heading size="md">{t("game.howToPlay")}</Heading>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm">• {t("game.instruction1")}</Text>
                  <Text fontSize="sm">• {t("game.instruction2")}</Text>
                  <Text fontSize="sm">• {t("game.instruction3")}</Text>
                  <Text fontSize="sm">• {t("game.instruction4")}</Text>
                  <Text fontSize="sm">• {t("game.instruction5")}</Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}
