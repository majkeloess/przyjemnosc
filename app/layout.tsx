import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import NavMain from "@/components/main-page/NavMain";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Przyjemność",
  description: "Twoja ulubiona restauracja dziś i jutro!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <Link href="/">
          <Header />
        </Link>
        <NavMain />
        {children}
      </body>
    </html>
  );
}
