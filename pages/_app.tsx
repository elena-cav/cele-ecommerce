import "../styles/globals.css";

import type { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "../styles/theme";
import { Provider } from "next-auth/client";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={myNewTheme}>
      {/* <Provider session={pageProps.session}> */}
      <UserProvider>
        <CSSReset />
        <Component {...pageProps} />
      </UserProvider>
      {/* </Provider> */}
    </ChakraProvider>
  );
}
export default MyApp;
