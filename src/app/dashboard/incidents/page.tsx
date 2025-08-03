"use client";

import { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  useToast,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { incidentSchema, type IncidentFormData } from "@/lib/validations";
import { useTranslation } from "@/hooks/useTranslation";

const MotionCard = motion(Card);

interface Service {
  id: string;
  name: string;
  status: string;
}

interface Incident {
  id: string;
  title: string;
  description: string;
  status: string;
  severity: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
  services: Array<{
    id: string;
    name: string;
  }>;
}

export default function IncidentsPage() {
  const { t } = useTranslation();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
  });

  useEffect(() => {
    fetchIncidents();
    fetchServices();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch("/api/incidents");
      if (response.ok) {
        const data = await response.json();
        setIncidents(data);
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const onSubmit = async (data: IncidentFormData) => {
    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Incident created",
          description: "The incident has been created successfully.",
          status: "success",
        });
        onClose();
        reset();
        fetchIncidents();
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create incident",
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return "success";
      case "INVESTIGATING":
      case "IDENTIFIED":
      case "MONITORING":
        return "warning";
      default:
        return "gray";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "red";
      case "MAJOR":
        return "orange";
      case "MINOR":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between">
        <Box>
                  <Heading size="lg">{t("incidents.title")}</Heading>
        <Text color="gray.600">{t("incidents.manageIncidents")}</Text>
        </Box>
        <Button
          leftIcon={<PlusIcon className="w-4 h-4" />}
          colorScheme="brand"
          onClick={onOpen}
        >
          New Incident
        </Button>
      </HStack>

      {/* Incidents Table */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        bg={cardBg}
        border="1px"
        borderColor={borderColor}
      >
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th>Severity</Th>
                <Th>Services</Th>
                <Th>Created</Th>
                <Th>Author</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {incidents.map((incident) => (
                <Tr key={incident.id}>
                  <Td>
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="semibold">{incident.title}</Text>
                      <Text fontSize="sm" color="gray.500" noOfLines={2}>
                        {incident.description}
                      </Text>
                    </VStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge colorScheme={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={1}>
                      {incident.services.map((service) => (
                        <Text key={service.id} fontSize="sm">
                          {service.name}
                        </Text>
                      ))}
                    </VStack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {new Date(incident.createdAt).toLocaleDateString()}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{incident.author.name}</Text>
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<EllipsisVerticalIcon className="w-4 h-4" />}
                        variant="ghost"
                        size="sm"
                      />
                      <MenuList>
                        <MenuItem>View Details</MenuItem>
                        <MenuItem>Update Status</MenuItem>
                        <MenuItem>Add Update</MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {incidents.length === 0 && (
            <Box textAlign="center" py={12}>
              <ExclamationTriangleIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <Text color="gray.500">{t("incidents.noIncidents")}</Text>
              <Text fontSize="sm" color="gray.400">
                Create your first incident to get started
              </Text>
            </Box>
          )}
        </CardBody>
      </MotionCard>

      {/* New Incident Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create New Incident</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    {...register("title")}
                    placeholder="Brief description of the incident"
                  />
                  {errors.title && (
                    <Text color="red.500" fontSize="sm">
                      {errors.title.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...register("description")}
                    placeholder="Detailed description of the incident"
                    rows={4}
                  />
                  {errors.description && (
                    <Text color="red.500" fontSize="sm">
                      {errors.description.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.severity}>
                  <FormLabel>Severity</FormLabel>
                  <Select {...register("severity")}>
                    <option value="MINOR">Minor</option>
                    <option value="MAJOR">Major</option>
                    <option value="CRITICAL">Critical</option>
                  </Select>
                  {errors.severity && (
                    <Text color="red.500" fontSize="sm">
                      {errors.severity.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.serviceIds}>
                  <FormLabel>Affected Services</FormLabel>
                  <CheckboxGroup>
                    <VStack align="start" spacing={2}>
                      {services.map((service) => (
                        <Checkbox
                          key={service.id}
                          value={service.id}
                          {...register("serviceIds")}
                        >
                          {service.name}
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                  {errors.serviceIds && (
                    <Text color="red.500" fontSize="sm">
                      {errors.serviceIds.message}
                    </Text>
                  )}
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="brand"
                type="submit"
                isLoading={isSubmitting}
              >
                Create Incident
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
