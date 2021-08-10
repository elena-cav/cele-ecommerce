import "../styles/globals.css";

import type { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "../styles/theme";
import { Provider } from "next-auth/client";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={myNewTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
