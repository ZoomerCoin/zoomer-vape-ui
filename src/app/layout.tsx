import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

export const metadata = {
  title: "/TAKE_THE_HIT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
