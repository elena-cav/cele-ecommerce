import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react";
import { myNewTheme } from "../styles/theme";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={myNewTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
