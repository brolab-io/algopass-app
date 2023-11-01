import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { cairo } from "./fonts";

export const metadata: Metadata = {
  title: "AlgoPass",
  description: "AlgoPass - Create your own professional and creative bio page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cairo.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
