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
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  EllipsisVerticalIcon,
  Cog6ToothIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, type ServiceFormData } from "@/lib/validations";

const MotionCard = motion(Card);

interface Service {
  id: string;
  name: string;
  description: string | null;
  status: string;
  url: string | null;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    fetchServices();
  }, []);

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

  const onSubmit = async (data: ServiceFormData) => {
    try {
      const url = editingService
        ? `/api/services/${editingService.id}`
        : "/api/services";

      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: editingService ? "Service updated" : "Service created",
          description: `The service has been ${
            editingService ? "updated" : "created"
          } successfully.`,
          status: "success",
        });
        onClose();
        reset();
        setEditingService(null);
        fetchServices();
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description:
            error.error ||
            `Failed to ${editingService ? "update" : "create"} service`,
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

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setValue("name", service.name);
    setValue("description", service.description || "");
    setValue("url", service.url || "");
    setValue("logo", service.logo || "");
    onOpen();
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Service deleted",
          description: "The service has been deleted successfully.",
          status: "success",
        });
        fetchServices();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete service",
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

  const openModal = () => {
    setEditingService(null);
    reset();
    onOpen();
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between">
        <Box>
          <Heading size="lg">Services</Heading>
          <Text color="gray.600">Manage your services and their status</Text>
        </Box>
        <Button
          leftIcon={<PlusIcon className="w-4 h-4" />}
          colorScheme="brand"
          onClick={openModal}
        >
          New Service
        </Button>
      </HStack>

      {/* Services Table */}
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
                <Th>Service</Th>
                <Th>Status</Th>
                <Th>URL</Th>
                <Th>Created</Th>
                <Th>Updated</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {services.map((service) => (
                <Tr key={service.id}>
                  <Td>
                    <HStack spacing={3}>
                      {service.logo && (
                        <Image
                          src={service.logo}
                          alt={service.name}
                          boxSize="32px"
                          borderRadius="md"
                          objectFit="cover"
                        />
                      )}
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold">{service.name}</Text>
                        {service.description && (
                          <Text fontSize="sm" color="gray.500" noOfLines={2}>
                            {service.description}
                          </Text>
                        )}
                      </VStack>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(service.status)}>
                      {service.status.replace("_", " ")}
                    </Badge>
                  </Td>
                  <Td>
                    {service.url ? (
                      <Text
                        fontSize="sm"
                        color="blue.500"
                        isTruncated
                        maxW="200px"
                      >
                        {service.url}
                      </Text>
                    ) : (
                      <Text fontSize="sm" color="gray.400">
                        No URL
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {new Date(service.createdAt).toLocaleDateString()}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="sm">
                      {new Date(service.updatedAt).toLocaleDateString()}
                    </Text>
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
                        <MenuItem
                          icon={<PencilIcon className="w-4 h-4" />}
                          onClick={() => handleEdit(service)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          icon={<TrashIcon className="w-4 h-4" />}
                          onClick={() => handleDelete(service.id)}
                          color="red.500"
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {services.length === 0 && (
            <Box textAlign="center" py={12}>
              <Cog6ToothIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <Text color="gray.500">No services found</Text>
              <Text fontSize="sm" color="gray.400">
                Create your first service to get started
              </Text>
            </Box>
          )}
        </CardBody>
      </MotionCard>

      {/* Service Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {editingService ? "Edit Service" : "Create New Service"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Service Name</FormLabel>
                  <Input
                    {...register("name")}
                    placeholder="Enter service name"
                  />
                  {errors.name && (
                    <Text color="red.500" fontSize="sm">
                      {errors.name.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...register("description")}
                    placeholder="Enter service description"
                    rows={3}
                  />
                  {errors.description && (
                    <Text color="red.500" fontSize="sm">
                      {errors.description.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.url}>
                  <FormLabel>Service URL</FormLabel>
                  <Input
                    {...register("url")}
                    placeholder="https://example.com"
                    type="url"
                  />
                  {errors.url && (
                    <Text color="red.500" fontSize="sm">
                      {errors.url.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.logo}>
                  <FormLabel>Logo URL</FormLabel>
                  <Input
                    {...register("logo")}
                    placeholder="https://example.com/logo.png"
                    type="url"
                  />
                  {errors.logo && (
                    <Text color="red.500" fontSize="sm">
                      {errors.logo.message}
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
                {editingService ? "Update Service" : "Create Service"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
