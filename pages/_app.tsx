import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../src/app/globals.css"; // Make sure to adjust the path based on your project structure

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
