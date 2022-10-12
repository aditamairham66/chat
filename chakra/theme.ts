import { extendTheme, type ThemeConfig } from "@chakra-ui/react"

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        100: '#3D84F7',
    },
}

const fonts = {
    body: `'Open Sans', sans-serif`,
}

const styles = {
    global: () => ({
        body: {
            bg: "whiteAlpha.200",
        },
    }),
}

const components = {
    
}

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
}
const option = {
    colors: colors,
    fonts: fonts,
    styles: styles,
    components: components,
}
export const theme = extendTheme({
    config
}, option)