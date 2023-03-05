import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MainLayout } from "@/ui";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}
