import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/header";
import "swiper/css";
import "swiper/css/bundle";
import customLufga from "../../public/fonts/Lufga/custom-lufga-font";
import Footer from "./components/layout/footer/footer";

export const metadata: Metadata = {
  title: "Kano City Mall",
  description: "Experience the Ultimate Shopping Destination in Kano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${customLufga.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
