import { extendTheme } from "@chakra-ui/react";
export const myNewTheme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    gray: "#EDF2F7",
    lightGray: "#faf9f8",
  },
  fonts: {
    body: "Nunito Sans",
    heading: "Nunito Sans",
  },
  styles: {
    global: {
      borderRadius: 0,

      "html, body": {
        color: "gray.600",
        lineHeight: "tall",
        bg: "#faf9f8",
        borderRadius: 0,
      },
    },

    a: {
      color: "teal.500",
    },
    button: {
      borderRadius: "none",
      rounded: "none",
    },
    input: {
      borderRadius: 0,
    },
    form: {
      borderRadius: 0,
    },
  },
});
