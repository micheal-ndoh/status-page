"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Badge,
  Card,
  CardBody,
  Heading,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { prisma } from "@/lib/prisma";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

interface Service {
  id: string;
  name: string;
  description: string | null;
  status:
    | "OPERATIONAL"
    | "DEGRADED_PERFORMANCE"
    | "PARTIAL_OUTAGE"
    | "MAJOR_OUTAGE"
    | "MAINTENANCE";
  url: string | null;
  logo: string | null;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: "INVESTIGATING" | "IDENTIFIED" | "MONITORING" | "RESOLVED";
  severity: "MINOR" | "MAJOR" | "CRITICAL";
  createdAt: Date;
  resolvedAt: Date | null;
}

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [overallStatus, setOverallStatus] = useState<
    "operational" | "degraded" | "outage"
  >("operational");

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    fetchServices();
    fetchIncidents();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);

      // Calculate overall status
      const hasOutage = data.some(
        (service: Service) =>
          service.status === "MAJOR_OUTAGE" ||
          service.status === "PARTIAL_OUTAGE"
      );
      const hasDegraded = data.some(
        (service: Service) => service.status === "DEGRADED_PERFORMANCE"
      );

      if (hasOutage) setOverallStatus("outage");
      else if (hasDegraded) setOverallStatus("degraded");
      else setOverallStatus("operational");
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchIncidents = async () => {
    try {
      const response = await fetch("/api/incidents");
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "OPERATIONAL":
        return "success";
      case "DEGRADED_PERFORMANCE":
        return "warning";
      case "PARTIAL_OUTAGE":
      case "MAJOR_OUTAGE":
        return "error";
      case "MAINTENANCE":
        return "blue";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status: Service["status"]) => {
    switch (status) {
      case "OPERATIONAL":
        return CheckCircleIcon;
      case "DEGRADED_PERFORMANCE":
      case "MAINTENANCE":
        return ExclamationTriangleIcon;
      case "PARTIAL_OUTAGE":
      case "MAJOR_OUTAGE":
        return XCircleIcon;
      default:
        return CheckCircleIcon;
    }
  };

  const getOverallStatusColor = () => {
    switch (overallStatus) {
      case "operational":
        return "success.500";
      case "degraded":
        return "warning.500";
      case "outage":
        return "error.500";
      default:
        return "gray.500";
    }
  };

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Animated Background */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        opacity={0.1}
        animate={{
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Heading
              size="2xl"
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
              fontWeight="extrabold"
              mb={4}
            >
              Service Status
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Real-time status of our services and infrastructure
            </Text>
          </MotionBox>

          {/* Overall Status */}
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            bg={cardBg}
            p={6}
            textAlign="center"
          >
            <VStack spacing={4}>
              <Box
                w={16}
                h={16}
                borderRadius="full"
                bg={getOverallStatusColor()}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={
                    overallStatus === "operational"
                      ? CheckCircleIcon
                      : XCircleIcon
                  }
                  w={8}
                  h={8}
                  color="white"
                />
              </Box>
              <Heading size="lg">
                {overallStatus === "operational" && "All Systems Operational"}
                {overallStatus === "degraded" && "Degraded Performance"}
                {overallStatus === "outage" && "Service Outage"}
              </Heading>
              <Text color="gray.600">
                Last updated: {new Date().toLocaleString()}
              </Text>
            </VStack>
          </MotionCard>

          {/* Services Grid */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Heading size="lg" mb={6}>
              Services
            </Heading>
            <Flex wrap="wrap" gap={4}>
              {services.map((service, index) => (
                <MotionCard
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  bg={cardBg}
                  flex="1"
                  minW="300px"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <HStack justify="space-between" w="full">
                        <Text fontWeight="semibold" fontSize="lg">
                          {service.name}
                        </Text>
                        <Badge colorScheme={getStatusColor(service.status)}>
                          {service.status.replace("_", " ")}
                        </Badge>
                      </HStack>
                      {service.description && (
                        <Text color="gray.600" fontSize="sm">
                          {service.description}
                        </Text>
                      )}
                      <HStack>
                        <Icon
                          as={getStatusIcon(service.status)}
                          color={`${getStatusColor(service.status)}.500`}
                          w={5}
                          h={5}
                        />
                        <Text fontSize="sm" color="gray.500">
                          {service.status === "OPERATIONAL"
                            ? "All good"
                            : "Issue detected"}
                        </Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </Flex>
          </MotionBox>

          {/* Recent Incidents */}
          {incidents.length > 0 && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Heading size="lg" mb={6}>
                Recent Incidents
              </Heading>
              <VStack spacing={4} align="stretch">
                {incidents.slice(0, 5).map((incident, index) => (
                  <MotionCard
                    key={incident.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    bg={cardBg}
                    whileHover={{ x: 5 }}
                  >
                    <CardBody>
                      <VStack align="start" spacing={3}>
                        <HStack justify="space-between" w="full">
                          <Heading size="md">{incident.title}</Heading>
                          <Badge
                            colorScheme={
                              incident.severity === "CRITICAL"
                                ? "red"
                                : incident.severity === "MAJOR"
                                ? "orange"
                                : "yellow"
                            }
                          >
                            {incident.severity}
                          </Badge>
                        </HStack>
                        <Text color="gray.600">{incident.description}</Text>
                        <HStack justify="space-between" w="full">
                          <Badge colorScheme="blue">{incident.status}</Badge>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(incident.createdAt).toLocaleDateString()}
                          </Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </MotionCard>
                ))}
              </VStack>
            </MotionBox>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
