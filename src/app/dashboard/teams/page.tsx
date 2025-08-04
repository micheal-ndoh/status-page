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
  useToast,
  useColorModeValue,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Avatar,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { PlusIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "@/hooks/useTranslation";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  description: z.string().optional(),
});

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["OWNER", "ADMIN", "MEMBER"]).default("MEMBER"),
});

type TeamFormData = z.infer<typeof teamSchema>;
type InviteFormData = z.infer<typeof inviteSchema>;

interface Team {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  members: Array<{
    id: string;
    role: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
    };
  }>;
  _count: {
    services: number;
    incidents: number;
  };
}

export default function TeamsPage() {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isInviteOpen,
    onOpen: onInviteOpen,
    onClose: onInviteClose,
  } = useDisclosure();

  const toast = useToast();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const {
    register: registerTeam,
    handleSubmit: handleTeamSubmit,
    reset: resetTeam,
    formState: { errors: teamErrors, isSubmitting: isTeamSubmitting },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });

  const {
    register: registerInvite,
    handleSubmit: handleInviteSubmit,
    reset: resetInvite,
    formState: { errors: inviteErrors, isSubmitting: isInviteSubmitting },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
        if (data.length > 0 && !selectedTeam) {
          setSelectedTeam(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const onCreateTeam = async (data: TeamFormData) => {
    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create team");
      }

      toast({
        title: t("notifications.success"),
        description: "Team created successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      onCreateClose();
      resetTeam();
      fetchTeams();
    } catch (error) {
      console.error("Error creating team:", error);
      toast({
        title: t("notifications.error"),
        description:
          error instanceof Error ? error.message : "Failed to create team",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSendInvite = async (data: InviteFormData) => {
    if (!selectedTeam) return;

    try {
      const response = await fetch(`/api/teams/${selectedTeam.id}/invites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send invite");
      }

      toast({
        title: t("notifications.success"),
        description: "Invitation sent successfully",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      onInviteClose();
      resetInvite();
    } catch (error) {
      console.error("Error sending invite:", error);
      toast({
        title: t("notifications.error"),
        description:
          error instanceof Error ? error.message : "Failed to send invite",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
    >
      <Box p={6}>
        <VStack spacing={8} align="stretch" maxW="1400px" mx="auto">
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HStack justify="space-between" align="center">
              <VStack align="start" spacing={2}>
                <Heading size="lg" color="white" fontFamily="mono">
                  Team Management
                </Heading>
                <Text color="rgba(173, 216, 230, 0.8)" fontSize="lg">
                  Manage your teams and collaborate with members
                </Text>
              </VStack>
              <MotionButton
                leftIcon={<PlusIcon />}
                colorScheme="blue"
                variant="solid"
                onClick={onCreateOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Team
              </MotionButton>
            </HStack>
          </MotionBox>

          <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={6}>
            {/* Team Sidebar */}
            <MotionCard
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              backdropFilter="blur(10px)"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Heading size="md" color="white" fontFamily="mono">
                    Your Teams
                  </Heading>
                  <VStack spacing={3} align="stretch">
                    {teams.map((team) => (
                      <MotionBox
                        key={team.id}
                        p={3}
                        borderRadius="lg"
                        bg={
                          selectedTeam?.id === team.id
                            ? "rgba(59, 130, 246, 0.2)"
                            : "transparent"
                        }
                        border="1px solid"
                        borderColor={
                          selectedTeam?.id === team.id
                            ? "blue.400"
                            : "transparent"
                        }
                        cursor="pointer"
                        onClick={() => setSelectedTeam(team)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold" color="white">
                            {team.name}
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            {team._count.services} services •{" "}
                            {team._count.incidents} incidents
                          </Text>
                          <HStack spacing={1}>
                            <Badge size="sm" colorScheme="blue">
                              {team.members.length} members
                            </Badge>
                          </HStack>
                        </VStack>
                      </MotionBox>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </MotionCard>

            {/* Team Content */}
            {selectedTeam && (
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <VStack spacing={6} align="stretch">
                  {/* Team Header */}
                  <MotionCard
                    bg={cardBg}
                    border="1px solid"
                    borderColor={borderColor}
                    backdropFilter="blur(10px)"
                  >
                    <CardBody>
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={2}>
                          <Heading size="lg" color="white" fontFamily="mono">
                            {selectedTeam.name}
                          </Heading>
                          <Text color="rgba(173, 216, 230, 0.8)">
                            {selectedTeam.description ||
                              "No description provided"}
                          </Text>
                          <Badge colorScheme="blue">{selectedTeam.slug}</Badge>
                        </VStack>
                        <MotionButton
                          leftIcon={<UserPlusIcon />}
                          colorScheme="green"
                          variant="outline"
                          onClick={onInviteOpen}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Invite Member
                        </MotionButton>
                      </HStack>
                    </CardBody>
                  </MotionCard>

                  {/* Team Members */}
                  <MotionCard
                    bg={cardBg}
                    border="1px solid"
                    borderColor={borderColor}
                    backdropFilter="blur(10px)"
                  >
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between">
                          <Heading size="md" color="white" fontFamily="mono">
                            Team Members
                          </Heading>
                          <Text color="gray.400">
                            {selectedTeam.members.length} members
                          </Text>
                        </HStack>
                        <VStack spacing={3} align="stretch">
                          {selectedTeam.members.map((member) => (
                            <HStack
                              key={member.id}
                              justify="space-between"
                              p={3}
                              borderRadius="lg"
                              bg="rgba(255, 255, 255, 0.05)"
                            >
                              <HStack spacing={3}>
                                <Avatar
                                  size="sm"
                                  src={member.user.image || undefined}
                                  name={member.user.name}
                                />
                                <VStack align="start" spacing={0}>
                                  <Text fontWeight="semibold" color="white">
                                    {member.user.name}
                                  </Text>
                                  <Text fontSize="sm" color="gray.400">
                                    {member.user.email}
                                  </Text>
                                </VStack>
                              </HStack>
                              <Badge
                                colorScheme={
                                  member.role === "OWNER"
                                    ? "purple"
                                    : member.role === "ADMIN"
                                    ? "blue"
                                    : "green"
                                }
                              >
                                {member.role}
                              </Badge>
                            </HStack>
                          ))}
                        </VStack>
                      </VStack>
                    </CardBody>
                  </MotionCard>
                </VStack>
              </MotionBox>
            )}
          </Grid>
        </VStack>
      </Box>

      {/* Create Team Modal */}
      <Modal isOpen={isCreateOpen} onClose={onCreateClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" border="1px solid" borderColor="gray.700">
          <ModalHeader color="white" fontFamily="mono">
            Create New Team
          </ModalHeader>
          <ModalCloseButton color="white" />
          <form onSubmit={handleTeamSubmit(onCreateTeam)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!teamErrors.name}>
                  <FormLabel color="white">Team Name</FormLabel>
                  <Input
                    {...registerTeam("name")}
                    placeholder="Enter team name"
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Description</FormLabel>
                  <Textarea
                    {...registerTeam("description")}
                    placeholder="Enter team description"
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={onCreateClose}
                color="white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isTeamSubmitting}
                loadingText="Creating..."
              >
                Create Team
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Invite Member Modal */}
      <Modal isOpen={isInviteOpen} onClose={onInviteClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="gray.800" border="1px solid" borderColor="gray.700">
          <ModalHeader color="white" fontFamily="mono">
            Invite Team Member
          </ModalHeader>
          <ModalCloseButton color="white" />
          <form onSubmit={handleInviteSubmit(onSendInvite)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!inviteErrors.email}>
                  <FormLabel color="white">Email Address</FormLabel>
                  <Input
                    {...registerInvite("email")}
                    placeholder="Enter email address"
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="white">Role</FormLabel>
                  <Select
                    {...registerInvite("role")}
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="ADMIN">Admin</option>
                    <option value="OWNER">Owner</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                mr={3}
                onClick={onInviteClose}
                color="white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isInviteSubmitting}
                loadingText="Sending..."
              >
                Send Invite
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
