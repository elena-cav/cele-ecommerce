import "../styles/globals.css";
import "fontsource-nunito-sans";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Spinner } from "@chakra-ui/spinner";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "../styles/theme";
import Router from "next/router";
import { UserProvider } from "@auth0/nextjs-auth0";
import NavBar from "../components/Header";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  Router.events.on("routeChangeError", () => {
    setLoading(false);
  });

  return (
    <ChakraProvider theme={myNewTheme}>
      {/* <Provider session={pageProps.session}> */}
      <UserProvider>
        <CSSReset />

        <NavBar />
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {!loading && <Component {...pageProps} />}
        <Footer />
      </UserProvider>
      {/* </Provider> */}
    </ChakraProvider>
  );
}
export default MyApp;
