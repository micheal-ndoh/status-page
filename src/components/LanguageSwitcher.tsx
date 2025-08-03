"use client";

import { useTolgee } from '@tolgee/react';
import { Box, Select, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const { getLanguage, changeLanguage } = useTolgee();
  const currentLanguage = getLanguage();
  
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.2)');
  const borderColor = useColorModeValue('rgba(255, 255, 255, 0.2)', 'rgba(173, 216, 230, 0.3)');

  const handleLanguageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    try {
      await changeLanguage(newLanguage);
      // Force a re-render by updating localStorage
      localStorage.setItem('tolgee_language', newLanguage);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <Box
      position="relative"
      display="inline-block"
    >
      <Select
        value={currentLanguage}
        onChange={handleLanguageChange}
        size="sm"
        variant="filled"
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="full"
        color="white"
        _hover={{
          bg: useColorModeValue('rgba(255, 255, 255, 0.15)', 'rgba(0, 0, 0, 0.3)'),
          borderColor: useColorModeValue('rgba(255, 255, 255, 0.3)', 'rgba(173, 216, 230, 0.5)'),
        }}
        _focus={{
          bg: useColorModeValue('rgba(255, 255, 255, 0.15)', 'rgba(0, 0, 0, 0.3)'),
          borderColor: useColorModeValue('rgba(255, 255, 255, 0.4)', 'rgba(173, 216, 230, 0.6)'),
          boxShadow: 'none',
        }}
        sx={{
          '& option': {
            backgroundColor: '#1a1a2e',
            color: 'white',
          },
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </Select>
    </Box>
  );
} 