"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  useToast,
  useColorModeValue,
  Divider,
  Badge,
  IconButton,
  Grid,
  GridItem,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CameraIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  BellIcon,
  Cog6ToothIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
      setAvatarUrl(session.user.image || null);
    }
  }, [session, setValue]);

  const handleProfileUpdate = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to update the user profile
      // For now, we'll just show a success message
      toast({
        title: t("notifications.success"),
        description: t("profile.profileUpdated"),
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      // Update the session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: data.name,
          email: data.email,
        },
      });
    } catch (error) {
      toast({
        title: t("notifications.error"),
        description: t("profile.uploadError"),
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: t("notifications.error"),
        description: t("profile.invalidImage"),
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t("notifications.error"),
        description: t("profile.imageTooLarge"),
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Here you would typically upload to your storage bucket
      // For now, we'll create a local URL
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);

      toast({
        title: t("notifications.success"),
        description: t("profile.profileUpdated"),
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: t("notifications.error"),
        description: t("profile.uploadError"),
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    toast({
      title: t("notifications.success"),
      description: t("profile.profileUpdated"),
      status: "success",
      position: "top-right",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!session?.user) {
    return (
      <Box textAlign="center" py={12}>
        <Text>{t("common.loading")}</Text>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Elements */}
      <MotionBox
        position="absolute"
        top="10%"
        right="15%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="rgba(173, 216, 230, 0.05)"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <MotionBox
        position="absolute"
        bottom="20%"
        left="10%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="rgba(173, 216, 230, 0.03)"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Box p={6}>
        <VStack spacing={8} align="stretch" maxW="1200px" mx="auto">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <VStack spacing={2} textAlign="center">
              <Heading
                size="2xl"
                fontWeight="bold"
                color="white"
                letterSpacing="wider"
                fontFamily="mono"
              >
                {t("profile.title")}
              </Heading>
              <Text fontSize="lg" color="rgba(173, 216, 230, 0.8)" maxW="600px">
                {t("profile.personalInfo")}
              </Text>
            </VStack>
          </MotionBox>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 2fr" }} gap={8}>
            {/* Avatar Section */}
            <MotionCard
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(173, 216, 230, 0.2)"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
            >
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="1px"
                bg="linear-gradient(90deg, transparent, rgba(173, 216, 230, 0.5), transparent)"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <CardBody p={8}>
                <VStack spacing={6} align="center">
                  <Box position="relative">
                    <MotionBox
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(173, 216, 230, 0.3)",
                          "0 0 40px rgba(173, 216, 230, 0.6)",
                          "0 0 20px rgba(173, 216, 230, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Avatar
                        size="2xl"
                        name={session.user.name || ""}
                        src={avatarUrl || undefined}
                        bg="rgba(173, 216, 230, 0.1)"
                        border="3px solid"
                        borderColor="rgba(173, 216, 230, 0.3)"
                      />
                    </MotionBox>
                    <IconButton
                      aria-label={t("profile.changeAvatar")}
                      icon={<CameraIcon className="w-4 h-4" />}
                      size="sm"
                      colorScheme="cyan"
                      borderRadius="full"
                      position="absolute"
                      bottom={2}
                      right={2}
                      bg="rgba(173, 216, 230, 0.9)"
                      color="gray.800"
                      _hover={{
                        bg: "rgba(173, 216, 230, 1)",
                        transform: "scale(1.1)",
                      }}
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                    />
                  </Box>

                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    style={{ display: "none" }}
                  />

                  <VStack spacing={3} align="center">
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="white"
                      textAlign="center"
                    >
                      {session.user.name || t("profile.name")}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="rgba(173, 216, 230, 0.8)"
                      textAlign="center"
                    >
                      {session.user.email}
                    </Text>
                    <Badge
                      colorScheme="cyan"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {session.user.role || "USER"}
                    </Badge>
                  </VStack>

                  <VStack spacing={3} w="full">
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="rgba(173, 216, 230, 0.4)"
                      color="rgba(173, 216, 230, 0.8)"
                      _hover={{
                        borderColor: "rgba(173, 216, 230, 0.8)",
                        color: "rgba(173, 216, 230, 1)",
                        bg: "rgba(173, 216, 230, 0.1)",
                      }}
                      onClick={() =>
                        document.getElementById("avatar-upload")?.click()
                      }
                      w="full"
                    >
                      {t("profile.changeAvatar")}
                    </Button>
                    {avatarUrl && (
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={handleRemoveAvatar}
                        w="full"
                        _hover={{
                          bg: "rgba(239, 68, 68, 0.1)",
                        }}
                      >
                        {t("profile.removeAvatar")}
                      </Button>
                    )}
                  </VStack>
                </VStack>
              </CardBody>
            </MotionCard>

            {/* Profile Form */}
            <MotionCard
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(20px)"
              border="1px solid"
              borderColor="rgba(173, 216, 230, 0.2)"
              borderRadius="2xl"
              overflow="hidden"
            >
              <CardBody p={8}>
                <form onSubmit={handleSubmit(handleProfileUpdate)}>
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading size="md" color="white" mb={2} fontFamily="mono">
                        {t("profile.personalInfo")}
                      </Heading>
                      <Divider borderColor="rgba(173, 216, 230, 0.3)" />
                    </Box>

                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel color="rgba(173, 216, 230, 0.8)">
                        {t("profile.name")}
                      </FormLabel>
                      <Input
                        {...register("name")}
                        placeholder={t("profile.name")}
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="rgba(173, 216, 230, 0.2)"
                        color="white"
                        _placeholder={{
                          color: "rgba(173, 216, 230, 0.5)",
                        }}
                        _focus={{
                          borderColor: "rgba(173, 216, 230, 0.8)",
                          boxShadow: "0 0 0 1px rgba(173, 216, 230, 0.2)",
                        }}
                        _hover={{
                          borderColor: "rgba(173, 216, 230, 0.4)",
                        }}
                      />
                      {errors.name && (
                        <Text color="red.400" fontSize="sm" mt={1}>
                          {errors.name.message}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel color="rgba(173, 216, 230, 0.8)">
                        {t("profile.email")}
                      </FormLabel>
                      <Input
                        {...register("email")}
                        placeholder={t("profile.email")}
                        type="email"
                        bg="rgba(255, 255, 255, 0.05)"
                        border="1px solid"
                        borderColor="rgba(173, 216, 230, 0.2)"
                        color="white"
                        _placeholder={{
                          color: "rgba(173, 216, 230, 0.5)",
                        }}
                        _focus={{
                          borderColor: "rgba(173, 216, 230, 0.8)",
                          boxShadow: "0 0 0 1px rgba(173, 216, 230, 0.2)",
                        }}
                        _hover={{
                          borderColor: "rgba(173, 216, 230, 0.4)",
                        }}
                      />
                      {errors.email && (
                        <Text color="red.400" fontSize="sm" mt={1}>
                          {errors.email.message}
                        </Text>
                      )}
                    </FormControl>

                    <HStack spacing={4} justify="flex-end" pt={4}>
                      <Button
                        variant="ghost"
                        color="rgba(173, 216, 230, 0.8)"
                        _hover={{
                          bg: "rgba(173, 216, 230, 0.1)",
                          color: "rgba(173, 216, 230, 1)",
                        }}
                      >
                        {t("profile.cancel")}
                      </Button>
                      <Button
                        bg="linear-gradient(135deg, rgba(173, 216, 230, 0.9), rgba(100, 149, 237, 0.9))"
                        color="gray.800"
                        fontWeight="bold"
                        type="submit"
                        isLoading={isSubmitting}
                        _hover={{
                          bg: "linear-gradient(135deg, rgba(173, 216, 230, 1), rgba(100, 149, 237, 1))",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(173, 216, 230, 0.3)",
                        }}
                        _active={{
                          transform: "translateY(0)",
                        }}
                        transition="all 0.3s ease"
                      >
                        {t("profile.saveChanges")}
                      </Button>
                    </HStack>
                  </VStack>
                </form>
              </CardBody>
            </MotionCard>
          </Grid>

          {/* Account Settings Section */}
          <MotionCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor="rgba(173, 216, 230, 0.2)"
            borderRadius="2xl"
            overflow="hidden"
          >
            <CardBody p={8}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="md" color="white" mb={2} fontFamily="mono">
                    {t("profile.accountSettings")}
                  </Heading>
                  <Divider borderColor="rgba(173, 216, 230, 0.3)" />
                </Box>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <MotionBox
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HStack
                      justify="space-between"
                      p={6}
                      bg="rgba(173, 216, 230, 0.05)"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="rgba(173, 216, 230, 0.2)"
                      _hover={{
                        borderColor: "rgba(173, 216, 230, 0.4)",
                        bg: "rgba(173, 216, 230, 0.08)",
                      }}
                      transition="all 0.3s ease"
                    >
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          bg="rgba(173, 216, 230, 0.1)"
                          borderRadius="lg"
                        >
                          <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text
                            fontWeight="semibold"
                            color="white"
                            fontSize="lg"
                          >
                            {t("profile.security")}
                          </Text>
                          <Text fontSize="sm" color="rgba(173, 216, 230, 0.7)">
                            {t("profile.security")}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="rgba(173, 216, 230, 0.4)"
                        color="rgba(173, 216, 230, 0.8)"
                        _hover={{
                          borderColor: "rgba(173, 216, 230, 0.8)",
                          color: "rgba(173, 216, 230, 1)",
                          bg: "rgba(173, 216, 230, 0.1)",
                        }}
                      >
                        {t("common.edit")}
                      </Button>
                    </HStack>
                  </MotionBox>

                  <MotionBox
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HStack
                      justify="space-between"
                      p={6}
                      bg="rgba(173, 216, 230, 0.05)"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="rgba(173, 216, 230, 0.2)"
                      _hover={{
                        borderColor: "rgba(173, 216, 230, 0.4)",
                        bg: "rgba(173, 216, 230, 0.08)",
                      }}
                      transition="all 0.3s ease"
                    >
                      <HStack spacing={4}>
                        <Box
                          p={3}
                          bg="rgba(173, 216, 230, 0.1)"
                          borderRadius="lg"
                        >
                          <BellIcon className="w-6 h-6 text-cyan-400" />
                        </Box>
                        <VStack align="start" spacing={1}>
                          <Text
                            fontWeight="semibold"
                            color="white"
                            fontSize="lg"
                          >
                            {t("profile.notifications")}
                          </Text>
                          <Text fontSize="sm" color="rgba(173, 216, 230, 0.7)">
                            {t("profile.notifications")}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button
                        size="sm"
                        variant="outline"
                        borderColor="rgba(173, 216, 230, 0.4)"
                        color="rgba(173, 216, 230, 0.8)"
                        _hover={{
                          borderColor: "rgba(173, 216, 230, 0.8)",
                          color: "rgba(173, 216, 230, 1)",
                          bg: "rgba(173, 216, 230, 0.1)",
                        }}
                      >
                        {t("common.edit")}
                      </Button>
                    </HStack>
                  </MotionBox>
                </Grid>
              </VStack>
            </CardBody>
          </MotionCard>
        </VStack>
      </Box>
    </Box>
  );
}
