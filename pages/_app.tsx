import "../styles/globals.css";

import type { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "../styles/theme";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={myNewTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
