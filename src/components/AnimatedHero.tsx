"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const AnimatedHero = () => {
  const { t } = useTranslation();

  return (
    <Box
      position="relative"
      w="100vw"
      h="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      overflow="hidden"
    >
      <Box
        position="relative"
        zIndex={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
        px={4}
        pt={20}
      >
        <VStack spacing={12} textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Text
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 30px rgba(173, 216, 230, 0.5)"
              letterSpacing="wider"
              fontFamily="mono"
              mt={20}
            >
              {t("homepage.hero.title")}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              color="gray.300"
              maxW="600px"
              lineHeight="tall"
            >
              {t("homepage.hero.subtitle")}
            </Text>
          </motion.div>
        </VStack>
      </Box>
    </Box>
  );
};

export default AnimatedHero;
