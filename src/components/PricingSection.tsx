"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
  ListIcon,
  Badge,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckIcon, StarIcon } from "@heroicons/react/24/outline";

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for small teams and projects",
    features: [
      "1 status page",
      "Basic monitoring",
      "Email notifications",
      "Up to 10 services",
      "Community support",
    ],
    popular: false,
    gradient: "linear(to-r, gray.100, gray.200)",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams and businesses",
    features: [
      "Unlimited status pages",
      "Advanced monitoring",
      "Slack & Teams integration",
      "Custom domains",
      "Priority support",
      "API access",
      "Incident management",
    ],
    popular: true,
    gradient: "linear(to-r, brand.500, purple.600)",
    buttonVariant: "gradient" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with specific needs",
    features: [
      "Everything in Pro",
      "SLA guarantees",
      "Dedicated support",
      "Custom integrations",
      "Advanced analytics",
      "White-label options",
      "On-premise deployment",
    ],
    popular: false,
    gradient: "linear(to-r, blue.500, blue.600)",
    buttonVariant: "outline" as const,
  },
];

export default function PricingSection() {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box id="pricing" py={20} bg={bgColor}>
      <Container maxW="container.xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <VStack spacing={12}>
            {/* Header */}
            <motion.div variants={itemVariants}>
              <VStack spacing={4} textAlign="center">
                <Heading size="2xl" fontWeight="bold">
                  Pricing
                </Heading>
                <Text fontSize="lg" color={textColor} maxW="2xl">
                  Choose the plan that fits your needs. All plans include our
                  core features.
                </Text>
              </VStack>
            </motion.div>

            {/* Pricing Cards */}
            <Box
              display="grid"
              gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={8}
              w="full"
            >
              {plans.map((plan, index) => (
                <MotionCard
                  key={plan.name}
                  variants={cardVariants}
                  whileHover="hover"
                  position="relative"
                  overflow="hidden"
                >
                  {plan.popular && (
                    <Badge
                      position="absolute"
                      top={4}
                      right={4}
                      colorScheme="brand"
                      size="lg"
                      px={3}
                      py={1}
                      zIndex={1}
                    >
                      <HStack spacing={1}>
                        <StarIcon className="w-4 h-4" />
                        <Text>Most Popular</Text>
                      </HStack>
                    </Badge>
                  )}

                  <CardHeader pb={4}>
                    <VStack spacing={3} align="start">
                      <Heading size="lg" fontWeight="bold">
                        {plan.name}
                      </Heading>
                      <VStack align="start" spacing={1}>
                        <HStack spacing={1}>
                          <Text fontSize="3xl" fontWeight="black">
                            {plan.price}
                          </Text>
                          <Text fontSize="lg" color="gray.500">
                            {plan.period}
                          </Text>
                        </HStack>
                        <Text color="gray.600" fontSize="sm">
                          {plan.description}
                        </Text>
                      </VStack>
                    </VStack>
                  </CardHeader>

                  <CardBody pt={0}>
                    <VStack spacing={6} align="stretch">
                      <List spacing={3}>
                        {plan.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex}>
                            <HStack spacing={3}>
                              <ListIcon
                                as={CheckIcon}
                                color="green.500"
                                w={5}
                                h={5}
                              />
                              <Text fontSize="sm">{feature}</Text>
                            </HStack>
                          </ListItem>
                        ))}
                      </List>

                      <Divider />

                      <MotionButton
                        variant={plan.buttonVariant}
                        size="lg"
                        w="full"
                        bgGradient={plan.gradient}
                        color={plan.popular ? "white" : "brand.600"}
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "lg",
                        }}
                        _active={{
                          transform: "translateY(0px)",
                        }}
                      >
                        {plan.name === "Enterprise"
                          ? "Contact Sales"
                          : "Get Started"}
                      </MotionButton>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </Box>

            {/* Footer */}
            <motion.div variants={itemVariants}>
              <VStack spacing={4} textAlign="center">
                <Text fontSize="sm" color={textColor}>
                  All plans include a 14-day free trial. No credit card
                  required.
                </Text>
                <Text fontSize="sm" color={textColor}>
                  Need help choosing?{" "}
                  <Text
                    as="span"
                    color="brand.600"
                    fontWeight="semibold"
                    cursor="pointer"
                  >
                    Contact Prism support
                  </Text>
                </Text>
              </VStack>
            </motion.div>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
}
