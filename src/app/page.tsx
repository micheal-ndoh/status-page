"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  useColorModeValue,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import StatusLoading from "@/components/StatusLoading";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

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
      return "green";
    case "degraded":
      return "orange";
    case "outage":
      return "red";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const bgGradient = useColorModeValue(
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)"
  );

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <StatusLoading variant="status" message="Checking system status..." />
    );
  }

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.800", "white")}
    >
      {/* Animated Background */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        bgGradient={bgGradient}
        opacity={0.1}
        animate={{
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header with Theme Toggle and Login Button */}
      <Box position="fixed" top={4} right={4} zIndex={1000}>
        <HStack spacing={3}>
          <MotionButton
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            colorScheme="brand"
            size="md"
            onClick={() => router.push("/auth/signin")}
            rightIcon={<ArrowRightIcon />}
          >
            Login
          </MotionButton>
          <ThemeToggle />
        </HStack>
      </Box>

      <Container maxW="container.xl" py={12}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Stack spacing={8}>
            {/* Header */}
            <MotionBox variants={itemVariants} textAlign="center">
              <Heading
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight="extrabold"
                bgGradient="linear(to-r, brand.500, brand.600)"
                bgClip="text"
                mb={4}
              >
                Service Status
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.600", "gray.400")}
                maxW="2xl"
                mx="auto"
                mb={6}
              >
                Real-time status of our services and infrastructure
              </Text>

              {/* Call to Action */}
              <MotionBox variants={buttonVariants}>
                <VStack spacing={4}>
                  <Text
                    fontSize="md"
                    color={useColorModeValue("gray.500", "gray.500")}
                  >
                    Need to manage incidents?
                  </Text>
                  <MotionButton
                    size="lg"
                    colorScheme="brand"
                    onClick={() => router.push("/auth/signin")}
                    rightIcon={<ArrowRightIcon />}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    Access Dashboard
                  </MotionButton>
                </VStack>
              </MotionBox>
            </MotionBox>

            {/* Overall Status */}
            <MotionCard variants={cardVariants}>
              <CardBody textAlign="center" py={8}>
                <VStack spacing={4}>
                  <MotionBox
                    w={16}
                    h={16}
                    borderRadius="full"
                    bg={`${overallStatusColor}.500`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon as={OverallStatusIcon} w={8} h={8} color="white" />
                  </MotionBox>
                  <Heading size="2xl" fontWeight="bold">
                    {overallStatus === "operational" &&
                      "All Systems Operational"}
                    {overallStatus === "degraded" && "Degraded Performance"}
                    {overallStatus === "outage" && "Major Outage"}
                  </Heading>
                  <Text color={useColorModeValue("gray.600", "gray.400")}>
                    Last updated: {new Date().toLocaleString()}
                  </Text>
                </VStack>
              </CardBody>
            </MotionCard>

            {/* Services */}
            <MotionBox variants={itemVariants}>
              <Heading size="2xl" fontWeight="bold" mb={6}>
                Services
              </Heading>
              <Box display="flex" flexWrap="wrap" gap={4}>
                {services.map((service, index) => {
                  const StatusIcon = getStatusIcon(service.status);
                  return (
                    <MotionCard
                      key={service.id}
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                      cursor="pointer"
                    >
                      <CardBody>
                        <HStack spacing={3}>
                          <Icon
                            as={StatusIcon}
                            w={6}
                            h={6}
                            color={`${getStatusColor(service.status)}.500`}
                          />
                          <VStack align="start" spacing={1} flex={1}>
                            <Text fontWeight="semibold">{service.name}</Text>
                            <Badge colorScheme={getStatusColor(service.status)}>
                              {service.status}
                            </Badge>
                          </VStack>
                        </HStack>
                      </CardBody>
                    </MotionCard>
                  );
                })}
              </Box>
            </MotionBox>

            {/* Recent Incidents */}
            {incidents.length > 0 && (
              <MotionBox variants={itemVariants}>
                <Heading size="2xl" fontWeight="bold" mb={6}>
                  Recent Incidents
                </Heading>
                <VStack spacing={4} align="stretch">
                  {incidents.slice(0, 5).map((incident, index) => (
                    <MotionCard
                      key={incident.id}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, x: 8 }}
                    >
                      <CardBody>
                        <VStack align="start" spacing={3}>
                          <HStack justify="space-between" w="full">
                            <Heading size="md">{incident.title}</Heading>
                            <Badge
                              colorScheme={getStatusColor(incident.status)}
                            >
                              {incident.status}
                            </Badge>
                          </HStack>
                          <Text
                            color={useColorModeValue("gray.600", "gray.400")}
                          >
                            {incident.description}
                          </Text>
                          <Text
                            fontSize="sm"
                            color={useColorModeValue("gray.500", "gray.500")}
                          >
                            {new Date(incident.createdAt).toLocaleDateString()}
                          </Text>
                        </VStack>
                      </CardBody>
                    </MotionCard>
                  ))}
                </VStack>
              </MotionBox>
            )}
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
