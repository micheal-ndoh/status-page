"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Heading,
  Badge,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const MotionCard = motion(Card);

interface DashboardStats {
  totalServices: number;
  operationalServices: number;
  degradedServices: number;
  outageServices: number;
  totalIncidents: number;
  activeIncidents: number;
  resolvedIncidents: number;
  uptimePercentage: number;
}

interface RecentActivity {
  id: string;
  type: "incident" | "service_update";
  title: string;
  description: string;
  timestamp: string;
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    operationalServices: 0,
    degradedServices: 0,
    outageServices: 0,
    totalIncidents: 0,
    activeIncidents: 0,
    resolvedIncidents: 0,
    uptimePercentage: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch("/api/dashboard/stats"),
        fetch("/api/dashboard/activity"),
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
      case "resolved":
        return "success";
      case "degraded":
      case "investigating":
        return "warning";
      case "outage":
      case "critical":
        return "error";
      default:
        return "gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "operational":
      case "resolved":
        return CheckCircleIcon;
      case "degraded":
      case "investigating":
        return ExclamationTriangleIcon;
      case "outage":
      case "critical":
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>
          Dashboard Overview
        </Heading>
        <Text color="gray.600">
          Monitor your services and track incidents in real-time
        </Text>
      </Box>

      {/* Stats Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Total Services</StatLabel>
              <StatNumber>{stats.totalServices}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Operational</StatLabel>
              <StatNumber color="success.500">
                {stats.operationalServices}
              </StatNumber>
              <StatHelpText>
                {stats.totalServices > 0
                  ? Math.round(
                      (stats.operationalServices / stats.totalServices) * 100
                    )
                  : 0}
                % of services
              </StatHelpText>
            </Stat>
          </CardBody>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Active Incidents</StatLabel>
              <StatNumber color="warning.500">
                {stats.activeIncidents}
              </StatNumber>
              <StatHelpText>
                {stats.totalIncidents > 0
                  ? Math.round(
                      (stats.activeIncidents / stats.totalIncidents) * 100
                    )
                  : 0}
                % of total
              </StatHelpText>
            </Stat>
          </CardBody>
        </MotionCard>

        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Stat>
              <StatLabel>Uptime</StatLabel>
              <StatNumber color="success.500">
                {stats.uptimePercentage}%
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                99.9% target
              </StatHelpText>
            </Stat>
          </CardBody>
        </MotionCard>
      </Grid>

      {/* Service Status Overview */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Service Status Overview</Heading>

            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text>Operational Services</Text>
                <HStack spacing={2}>
                  <Text fontWeight="semibold">{stats.operationalServices}</Text>
                  <Progress
                    value={
                      stats.totalServices > 0
                        ? (stats.operationalServices / stats.totalServices) *
                          100
                        : 0
                    }
                    colorScheme="success"
                    size="sm"
                    w="100px"
                  />
                </HStack>
              </HStack>

              <HStack justify="space-between">
                <Text>Degraded Services</Text>
                <HStack spacing={2}>
                  <Text fontWeight="semibold">{stats.degradedServices}</Text>
                  <Progress
                    value={
                      stats.totalServices > 0
                        ? (stats.degradedServices / stats.totalServices) * 100
                        : 0
                    }
                    colorScheme="warning"
                    size="sm"
                    w="100px"
                  />
                </HStack>
              </HStack>

              <HStack justify="space-between">
                <Text>Outage Services</Text>
                <HStack spacing={2}>
                  <Text fontWeight="semibold">{stats.outageServices}</Text>
                  <Progress
                    value={
                      stats.totalServices > 0
                        ? (stats.outageServices / stats.totalServices) * 100
                        : 0
                    }
                    colorScheme="error"
                    size="sm"
                    w="100px"
                  />
                </HStack>
              </HStack>
            </VStack>
          </VStack>
        </CardBody>
      </MotionCard>

      {/* Recent Activity */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md">Recent Activity</Heading>

            <VStack spacing={3} align="stretch">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <HStack
                    key={activity.id}
                    p={3}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    borderRadius="md"
                    spacing={3}
                  >
                    <Box
                      p={2}
                      borderRadius="full"
                      bg={`${getStatusColor(activity.status)}.100`}
                    >
                      <activity.icon className="w-4 h-4" />
                    </Box>
                    <VStack align="start" spacing={1} flex={1}>
                      <Text fontWeight="semibold">{activity.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {activity.description}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </Text>
                    </VStack>
                    <Badge colorScheme={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </HStack>
                ))
              ) : (
                <Text color="gray.500" textAlign="center" py={8}>
                  No recent activity
                </Text>
              )}
            </VStack>
          </VStack>
        </CardBody>
      </MotionCard>
    </VStack>
  );
}
