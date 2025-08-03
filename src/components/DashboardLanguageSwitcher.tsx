"use client";

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const DashboardLanguageSwitcher = () => {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <Box>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          variant="ghost"
          size="sm"
          px={3}
          py={2}
          borderRadius="lg"
          _hover={{
            bg: hoverBg,
          }}
          _active={{
            bg: hoverBg,
          }}
        >
          <HStack spacing={2}>
            <GlobeAltIcon className="w-4 h-4" />
            <Text fontSize="sm" fontWeight="medium">
              {currentLang.flag} {currentLang.name}
            </Text>
          </HStack>
        </MenuButton>
        <MenuList
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="lg"
          boxShadow="lg"
          py={2}
        >
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              bg={language.code === currentLanguage ? hoverBg : "transparent"}
              _hover={{
                bg: hoverBg,
              }}
              borderRadius="md"
              mx={2}
              mb={1}
            >
              <HStack spacing={3} w="full">
                <Text fontSize="lg">{language.flag}</Text>
                <Text fontSize="sm" fontWeight="medium">
                  {language.name}
                </Text>
                {language.code === currentLanguage && (
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg="brand.500"
                    ml="auto"
                  />
                )}
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default DashboardLanguageSwitcher; 