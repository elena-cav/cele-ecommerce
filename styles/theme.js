import { extendTheme } from "@chakra-ui/react"
export const myNewTheme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray:"#EDF2F7",
    lightGray: "#faf9f8"
  },
  styles: {
    global: {
      "html, body": {
        color: "gray.600",
        lineHeight: "tall",
        bg: '#faf9f8'
      },
      a: {
        color: "teal.500",
      },
      button: {
        borderRadius:"none",

      }
    },
  },



}) 