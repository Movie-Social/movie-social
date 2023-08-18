import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "normalize.css/normalize.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";
// import "@/styles/globals.css";
// import "normalize.css/normalize.css";

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />;
//     </SessionProvider>
//   );
// }
