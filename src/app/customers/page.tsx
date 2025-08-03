"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  IconButton,
  useColorModeValue,
  Image,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import GlassmorphismNavbar from "@/components/GlassmorphismNavbar";

const MotionBox = motion(Box);
const MotionGridItem = motion(GridItem);

// Customer logos data
const customerLogos = [
  { name: "TechCorp", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=TechCorp" },
  { name: "DataFlow", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=DataFlow" },
  { name: "CloudSync", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=CloudSync" },
  { name: "SecureNet", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=SecureNet" },
  { name: "InnovateLab", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=InnovateLab" },
  { name: "FutureTech", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=FutureTech" },
  { name: "DigitalCore", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=DigitalCore" },
  { name: "SmartScale", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=SmartScale" },
  { name: "CyberFlow", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=CyberFlow" },
  { name: "QuantumSoft", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=QuantumSoft" },
  { name: "NeuralNet", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=NeuralNet" },
  { name: "AICore", logo: "/api/placeholder/120/60/173,216,230/0a0a0a?text=AICore" },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CTO at TechCorp",
    company: "TechCorp",
    avatar: "/api/placeholder/80/80/173,216,230/0a0a0a?text=SC",
    quote: "Prism has revolutionized how we monitor our infrastructure. The real-time alerts and beautiful dashboard have made our operations team 10x more efficient.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "DevOps Lead",
    company: "DataFlow",
    avatar: "/api/placeholder/80/80/173,216,230/0a0a0a?text=MR",
    quote: "The intelligent detection system caught issues before they became problems. Prism's monitoring capabilities are simply unmatched in the industry.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "VP of Engineering",
    company: "CloudSync",
    avatar: "/api/placeholder/80/80/173,216,230/0a0a0a?text=EW",
    quote: "We've tried every monitoring solution out there. Prism's ease of use combined with its powerful features makes it our go-to choice for all our services.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Site Reliability Engineer",
    company: "SecureNet",
    avatar: "/api/placeholder/80/80/173,216,230/0a0a0a?text=DK",
    quote: "The glassmorphism design and smooth animations make monitoring actually enjoyable. Our team loves the intuitive interface and reliable performance.",
    rating: 5,
  },
];

const CustomersPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Parallax effect for logo grid
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.2)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.2)",
    "rgba(173, 216, 230, 0.3)"
  );

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      position="relative"
      overflow="hidden"
    >
      <GlassmorphismNavbar />

      {/* Hero Section */}
      <Container maxW="container.xl" pt={32} pb={20}>
        <VStack spacing={8} textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 30px rgba(173, 216, 230, 0.5)"
              letterSpacing="wider"
              fontFamily="mono"
            >
              Trusted by Industry Leaders
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(173, 216, 230, 0.8)"
              maxW="600px"
              lineHeight="tall"
            >
              Join thousands of companies worldwide who trust Prism to monitor their critical infrastructure with precision and style.
            </Text>
          </motion.div>
        </VStack>
      </Container>

      {/* Customer Logo Grid */}
      <Container maxW="container.xl" py={20}>
        <motion.div
          style={{
            transform: `translateY(${parallaxOffset}px)`,
          }}
        >
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={8}
          >
            {customerLogos.map((customer, index) => (
              <MotionGridItem
                key={customer.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <MotionBox
                  p={8}
                  borderRadius="xl"
                  backdropFilter="blur(20px)"
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                  _hover={{
                    borderColor: "rgba(173, 216, 230, 0.6)",
                    boxShadow: "0 12px 40px rgba(173, 216, 230, 0.2)",
                  }}
                  transition="all 0.3s ease"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minH="120px"
                >
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    maxW="120px"
                    maxH="60px"
                    objectFit="contain"
                    filter="brightness(0) invert(1)"
                    opacity={0.8}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.3s ease"
                  />
                </MotionBox>
              </MotionGridItem>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Testimonials Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="white"
              textAlign="center"
              textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
            >
              What Our Customers Say
            </Heading>
          </motion.div>

          <Box position="relative" w="full" maxW="800px">
            <AnimatePresence mode="wait">
              <MotionBox
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  p={8}
                  borderRadius="xl"
                  backdropFilter="blur(20px)"
                  bg={bgColor}
                  border="1px solid"
                  borderColor={borderColor}
                  boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Glowing border effect */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="rgba(173, 216, 230, 0.3)"
                    boxShadow="0 0 20px rgba(173, 216, 230, 0.2)"
                    pointerEvents="none"
                  />

                  <VStack spacing={6} align="stretch">
                    {/* Rating */}
                    <HStack spacing={1} justify="center">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="w-5 h-5"
                          style={{ color: "rgba(173, 216, 230, 1)" }}
                        />
                      ))}
                    </HStack>

                    {/* Quote */}
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      color="rgba(255, 255, 255, 0.9)"
                      textAlign="center"
                      lineHeight="tall"
                      fontStyle="italic"
                    >
                      "{testimonials[currentTestimonial].quote}"
                    </Text>

                    {/* Customer Info */}
                    <HStack spacing={4} justify="center">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        w="60px"
                        h="60px"
                        borderRadius="full"
                        border="2px solid"
                        borderColor="rgba(173, 216, 230, 0.3)"
                      />
                      <VStack spacing={1} align="start">
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="white"
                        >
                          {testimonials[currentTestimonial].name}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="rgba(173, 216, 230, 0.8)"
                        >
                          {testimonials[currentTestimonial].title}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="rgba(173, 216, 230, 0.6)"
                        >
                          {testimonials[currentTestimonial].company}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </MotionBox>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <IconButton
              aria-label="Previous testimonial"
              icon={<ChevronLeftIcon className="w-6 h-6" />}
              position="absolute"
              left="-60px"
              top="50%"
              transform="translateY(-50%)"
              borderRadius="full"
              backdropFilter="blur(20px)"
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              color="white"
              _hover={{
                borderColor: "rgba(173, 216, 230, 0.6)",
                bg: "rgba(173, 216, 230, 0.1)",
              }}
              onClick={() =>
                setCurrentTestimonial(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              display={{ base: "none", lg: "flex" }}
            />

            <IconButton
              aria-label="Next testimonial"
              icon={<ChevronRightIcon className="w-6 h-6" />}
              position="absolute"
              right="-60px"
              top="50%"
              transform="translateY(-50%)"
              borderRadius="full"
              backdropFilter="blur(20px)"
              bg={bgColor}
              border="1px solid"
              borderColor={borderColor}
              color="white"
              _hover={{
                borderColor: "rgba(173, 216, 230, 0.6)",
                bg: "rgba(173, 216, 230, 0.1)",
              }}
              onClick={() =>
                setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
              }
              display={{ base: "none", lg: "flex" }}
            />

            {/* Dots Indicator */}
            <HStack spacing={2} justify="center" mt={6}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  w={3}
                  h={3}
                  borderRadius="full"
                  bg={
                    index === currentTestimonial
                      ? "rgba(173, 216, 230, 1)"
                      : "rgba(173, 216, 230, 0.3)"
                  }
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{ bg: "rgba(173, 216, 230, 0.6)" }}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>

      {/* Call to Action */}
      <Container maxW="container.xl" py={20}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box
            p={12}
            borderRadius="2xl"
            backdropFilter="blur(20px)"
            bg={bgColor}
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            {/* Glowing border effect */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              borderRadius="2xl"
              border="1px solid"
              borderColor="rgba(173, 216, 230, 0.3)"
              boxShadow="0 0 30px rgba(173, 216, 230, 0.2)"
              pointerEvents="none"
            />

            <VStack spacing={6}>
              <Heading
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                color="white"
                textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
              >
                Join Our Growing List of Customers
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="rgba(173, 216, 230, 0.8)"
                maxW="600px"
                lineHeight="tall"
              >
                Experience the power of intelligent monitoring with Prism. Start your free trial today and see why industry leaders choose us.
              </Text>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  bg="rgba(173, 216, 230, 0.9)"
                  color="gray.800"
                  fontSize="lg"
                  fontWeight="semibold"
                  px={8}
                  py={4}
                  borderRadius="full"
                  _hover={{
                    bg: "rgba(173, 216, 230, 1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(173, 216, 230, 0.3)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                  transition="all 0.3s ease"
                >
                  Start Free Trial
                </Button>
              </motion.div>
            </VStack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CustomersPage; 