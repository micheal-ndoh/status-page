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
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
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
    if (!confirm(t("services.deleteConfirm"))) return;

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: t("services.serviceDeleted"),
          description: t("services.serviceDeletedDesc"),
          status: "success",
        });
        fetchServices();
      } else {
        toast({
          title: t("services.error"),
          description: t("services.deleteError"),
          status: "error",
        });
      }
    } catch (error) {
      toast({
        title: t("services.error"),
        description: t("services.unexpectedError"),
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "OPERATIONAL":
        return t("services.statusOperational");
      case "DEGRADED_PERFORMANCE":
        return t("services.statusDegraded");
      case "PARTIAL_OUTAGE":
        return t("services.statusPartial");
      case "MAJOR_OUTAGE":
        return t("services.statusMajor");
      case "MAINTENANCE":
        return t("services.statusMaintenance");
      default:
        return status.replace("_", " ");
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
          <Heading size="lg">{t("services.title")}</Heading>
          <Text color="gray.600">{t("services.manageServices")}</Text>
        </Box>
        <Button
          leftIcon={<PlusIcon className="w-4 h-4" />}
          colorScheme="brand"
          onClick={openModal}
        >
          {t("services.addService")}
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
                <Th>{t("services.service")}</Th>
                <Th>{t("services.serviceStatus")}</Th>
                <Th>{t("services.serviceUrl")}</Th>
                <Th>{t("services.createdAt")}</Th>
                <Th>{t("services.updatedAt")}</Th>
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
                      {getStatusText(service.status)}
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
                        {t("services.noUrl")}
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
                          {t("services.editService")}
                        </MenuItem>
                        <MenuItem
                          icon={<TrashIcon className="w-4 h-4" />}
                          onClick={() => handleDelete(service.id)}
                          color="red.500"
                        >
                          {t("services.deleteService")}
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
              <Text color="gray.500">{t("services.noServices")}</Text>
              <Text fontSize="sm" color="gray.400">
                {t("services.getStarted")}
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
              {editingService
                ? t("services.editService")
                : t("services.createService")}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>{t("services.serviceName")}</FormLabel>
                  <Input
                    {...register("name")}
                    placeholder={t("services.serviceNamePlaceholder")}
                  />
                  {errors.name && (
                    <Text color="red.500" fontSize="sm">
                      {errors.name.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>{t("services.description")}</FormLabel>
                  <Textarea
                    {...register("description")}
                    placeholder={t("services.descriptionPlaceholder")}
                    rows={3}
                  />
                  {errors.description && (
                    <Text color="red.500" fontSize="sm">
                      {errors.description.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.url}>
                  <FormLabel>{t("services.serviceUrlLabel")}</FormLabel>
                  <Input
                    {...register("url")}
                    placeholder={t("services.serviceUrlPlaceholder")}
                    type="url"
                  />
                  {errors.url && (
                    <Text color="red.500" fontSize="sm">
                      {errors.url.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.logo}>
                  <FormLabel>{t("services.logoUrl")}</FormLabel>
                  <Input
                    {...register("logo")}
                    placeholder={t("services.logoUrlPlaceholder")}
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
                {t("services.cancel")}
              </Button>
              <Button
                colorScheme="brand"
                type="submit"
                isLoading={isSubmitting}
              >
                {editingService
                  ? t("services.updateService")
                  : t("services.addService")}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
