import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import customLufga from "../../public/fonts/Lufga/custom-lufga-font";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/providers/redux-provider";

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
      <body className={`${customLufga.className}`}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
