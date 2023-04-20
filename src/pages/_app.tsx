import type { AppProps } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Chirp</title>
        <meta name="description" content="🦩" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position={"bottom-center"} />
      <Component {...pageProps} />
      <Analytics />
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
