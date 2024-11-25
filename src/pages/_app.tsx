import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { ShoppingCartProvider } from "~/modules/shopping/application/ShoppingCartProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartProvider>
      <Component {...pageProps} />
    </ShoppingCartProvider>
  );
}
