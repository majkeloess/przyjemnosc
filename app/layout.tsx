import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import { AuthProvider } from "@/lib/hooks/useAuth";

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
          <Header isMain={true} />
        </Link>
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
