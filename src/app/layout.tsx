import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Gent Ascend Collective",
  description: "Digital infrastructure for ambitious local businesses.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#080a0d",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
