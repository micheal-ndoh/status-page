import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: true,
    },
    colors: {
        brand: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
        },
        accent: {
            50: '#fdf4ff',
            100: '#fae8ff',
            200: '#f5d0fe',
            300: '#f0abfc',
            400: '#e879f9',
            500: '#d946ef',
            600: '#c026d3',
            700: '#a21caf',
            800: '#86198f',
            900: '#701a75',
        },
    },
    fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'semibold',
                borderRadius: 'lg',
            },
            variants: {
                solid: {
                    bg: 'brand.500',
                    color: 'white',
                    _hover: {
                        bg: 'brand.600',
                    },
                },
            },
        },
    },
})

export default theme 