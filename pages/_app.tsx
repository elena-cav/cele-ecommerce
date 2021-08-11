import "../styles/globals.css";

import type { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "../styles/theme";
import { Provider } from "next-auth/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import NavBar from "../components/Header";
import Footer from "../components/footer";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={myNewTheme}>
      {/* <Provider session={pageProps.session}> */}
      <UserProvider>
        <CSSReset />
        <NavBar />

        <Component {...pageProps} />
        <Footer />
      </UserProvider>
      {/* </Provider> */}
    </ChakraProvider>
  );
}
export default MyApp;
