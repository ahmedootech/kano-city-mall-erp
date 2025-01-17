"use client";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "./components/logo";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return (
    <div className="min-vh-100 d-flex mw-100 align-items-center justify-content-center gap-3">
     <Logo />
     <CircularProgress className="text-danger" />
    </div>
  );
}
