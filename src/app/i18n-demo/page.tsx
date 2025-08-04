"use client";

import { Box, Container, VStack, HStack, Text, Button, Heading } from "@chakra-ui/react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTolgee } from "@tolgee/react";

export default function I18nDemoPage() {
  const { t } = useTranslation();
  const { getLanguage, changeLanguage } = useTolgee();
  const currentLanguage = getLanguage();

  const handleLanguageChange = async (lang: string) => {
    try {
      await changeLanguage(lang);
      // Force a re-render by updating localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tolgee_language', lang);
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"
      py={20}
    >
      <Container maxW="container.lg">
        <VStack spacing={12} textAlign="center">
          {/* Header */}
          <VStack spacing={6}>
            <Heading
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
              color="white"
              textShadow="0 0 20px rgba(173, 216, 230, 0.5)"
            >
              {t('homepage.hero.title')}
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="rgba(173, 216, 230, 0.8)"
              maxW="600px"
            >
              {t('homepage.hero.subtitle')}
            </Text>
          </VStack>

          {/* Language Switcher */}
          <VStack spacing={4}>
            <Text color="white" fontSize="lg" fontWeight="semibold">
              Current Language: {currentLanguage.toUpperCase()}
            </Text>
            <LanguageSwitcher />
          </VStack>

          {/* Translation Examples */}
          <VStack spacing={8} w="full">
            <Box
              p={8}
              borderRadius="xl"
              backdropFilter="blur(20px)"
              bg="rgba(255, 255, 255, 0.1)"
              border="1px solid"
              borderColor="rgba(173, 216, 230, 0.3)"
              w="full"
            >
              <VStack spacing={6}>
                <Heading size="lg" color="white">
                  Translation Examples
                </Heading>
                
                <VStack spacing={4} align="start" w="full">
                  <Text color="rgba(173, 216, 230, 0.8)" fontWeight="semibold">
                    Common Actions:
                  </Text>
                  <HStack spacing={4} flexWrap="wrap">
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('common.save')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('common.cancel')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('common.delete')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('common.edit')}
                    </Button>
                  </HStack>

                  <Text color="rgba(173, 216, 230, 0.8)" fontWeight="semibold" mt={4}>
                    Navigation:
                  </Text>
                  <HStack spacing={4} flexWrap="wrap">
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('navigation.product')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('navigation.customers')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('navigation.pricing')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('navigation.dashboard')}
                    </Button>
                  </HStack>

                  <Text color="rgba(173, 216, 230, 0.8)" fontWeight="semibold" mt={4}>
                    Auth:
                  </Text>
                  <HStack spacing={4} flexWrap="wrap">
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('auth.signin.title')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('auth.signin.subtitle')}
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="blue">
                      {t('common.signout')}
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </VStack>

          {/* Quick Language Buttons */}
          <VStack spacing={4}>
            <Text color="white" fontSize="lg" fontWeight="semibold">
              Quick Language Switch:
            </Text>
            <HStack spacing={3} flexWrap="wrap" justify="center">
              {['en', 'fr', 'de', 'zh', 'es'].map((lang) => (
                <Button
                  key={lang}
                  size="sm"
                  variant={currentLanguage === lang ? "solid" : "outline"}
                  colorScheme="blue"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
} 