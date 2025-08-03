"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Card,
  CardBody,
  Badge,
  VStack,
  HStack,
  Icon,
  Button,
  Flex,
  Grid,
  Divider,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

interface Service {
  id: string;
  name: string;
  status: "operational" | "degraded" | "outage";
  description: string;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "low" | "medium" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
}

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
      return ClockIcon;
  }
};

const getOverallStatus = (services: Service[]) => {
  if (services.some((s) => s.status === "outage")) return "outage";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  return "operational";
};

export default function StatusPage() {
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, incidentsRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/incidents"),
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }

        if (incidentsRes.ok) {
          const incidentsData = await incidentsRes.json();
          setIncidents(incidentsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const overallStatus = getOverallStatus(services);
  const overallStatusColor = getStatusColor(overallStatus);
  const OverallStatusIcon = getStatusIcon(overallStatus);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Box
            w={8}
            h={8}
            borderRadius="full"
            border="2px solid"
            borderColor="brand.500"
            borderTopColor="transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <Text color="gray.600">Loading status...</Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("white", "gray.900")}
      color={useColorModeValue("gray.900", "white")}
    >
      {/* Header */}
      <Navigation variant="status" />

      <Container maxW="container.xl" py={12}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Stack spacing={8}>
            {/* Overall Status */}
            <MotionBox variants={itemVariants} textAlign="center">
              <VStack spacing={6}>
                <MotionBox
                  w={20}
                  h={20}
                  borderRadius="full"
                  bg={`${overallStatusColor}.500`}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon as={OverallStatusIcon} w={10} h={10} color="white" />
                </MotionBox>
                <VStack spacing={2}>
                  <Heading size="2xl" fontWeight="bold">
                    {overallStatus === "operational" &&
                      t("status.allSystemsOperational")}
                    {overallStatus === "degraded" && t("status.degradedPerformance")}
                    {overallStatus === "outage" && t("status.majorOutage")}
                  </Heading>
                  <Text
                    color={useColorModeValue("gray.600", "gray.400")}
                    fontSize="lg"
                  >
                    {t("status.lastUpdated")}: {new Date().toLocaleString()}
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>

            {/* Services */}
            <MotionBox variants={itemVariants}>
              <VStack spacing={6} align="stretch">
                <Heading size="xl" fontWeight="bold">
                  {t("status.services")}
                </Heading>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    md: "repeat(auto-fit, minmax(300px, 1fr))",
                  }}
                  gap={4}
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
                          <HStack spacing={4}>
                            <Icon
                              as={StatusIcon}
                              w={6}
                              h={6}
                              color={`${getStatusColor(service.status)}.500`}
                            />
                            <VStack align="start" spacing={1} flex={1}>
                              <Text fontWeight="semibold" fontSize="lg">
                                {service.name}
                              </Text>
                              <Text color="gray.600" fontSize="sm">
                                {service.description}
                              </Text>
                            </VStack>
                            <Badge
                              colorScheme={getStatusColor(service.status)}
                              size="lg"
                              px={3}
                              py={1}
                            >
                              {service.status}
                            </Badge>
                          </HStack>
                        </CardBody>
                      </MotionCard>
                    );
                  })}
                </Grid>
              </VStack>
            </MotionBox>

            {/* Recent Incidents */}
            {incidents.length > 0 && (
              <MotionBox variants={itemVariants}>
                <VStack spacing={6} align="stretch">
                                  <Heading size="xl" fontWeight="bold">
                  {t("status.recentIncidents")}
                </Heading>
                  <VStack spacing={4} align="stretch">
                    {incidents.slice(0, 5).map((incident) => (
                      <MotionCard
                        key={incident.id}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CardBody>
                          <VStack align="start" spacing={3}>
                            <HStack justify="space-between" w="full">
                              <Heading size="md">{incident.title}</Heading>
                              <Badge
                                colorScheme={getStatusColor(incident.status)}
                                size="lg"
                              >
                                {incident.status}
                              </Badge>
                            </HStack>
                            <Text color="gray.600">{incident.description}</Text>
                            <HStack spacing={4} color="gray.500" fontSize="sm">
                              <Text>
                                Created:{" "}
                                {new Date(
                                  incident.createdAt
                                ).toLocaleDateString()}
                              </Text>
                              <Text>
                                Updated:{" "}
                                {new Date(
                                  incident.updatedAt
                                ).toLocaleDateString()}
                              </Text>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </MotionCard>
                    ))}
                  </VStack>
                </VStack>
              </MotionBox>
            )}

            {/* Footer */}
            <MotionBox variants={itemVariants}>
              <Divider />
              <VStack spacing={4} py={8}>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize="sm"
                >
                  Need to manage incidents?{" "}
                  <Link
                    href="/auth/signin"
                    color="brand.600"
                    fontWeight="semibold"
                  >
                    Access Dashboard
                  </Link>
                </Text>
                <Text color="gray.400" fontSize="xs">
                  © 2024 Prism. All rights reserved.
                </Text>
              </VStack>
            </MotionBox>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
