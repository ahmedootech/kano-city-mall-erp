import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import customLufga from "../../public/fonts/Lufga/custom-lufga-font";

export const metadata: Metadata = {
  title: "Dashboard Kano City Mall",
  description: "Experience the Ultimate Shopping Destination in Kano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${customLufga.className}`}>{children}</body>
    </html>
  );
}
