import type { Metadata } from "next";
import localFont from "next/font/local";
// import {} from "next/font/google"
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header";
import "swiper/css";
import "swiper/css/bundle";
// import "swiper/css/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
