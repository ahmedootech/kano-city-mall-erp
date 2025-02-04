"use client";
import TopBar from "./components/layouts/top-bar";
import SideBar from "./components/layouts/navigation/sidebar";
import Footer from "./components/layouts/footer";
import { authActions } from "@/store/features/auth";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../components/logo";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

const isInitial = true;
const ModulesLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth.main);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isInitial)
      dispatch(authActions.main.initializeUser())
        .unwrap()
        .catch((err) => {
          console.log("errr", err);
          router.replace("/auth/login");
        });
  }, [dispatch, router]);
  return (
    <>
      {auth.loading ? (
        <div className="min-vh-100 d-flex mw-100 align-items-center justify-content-center gap-3">
          <Logo />
          <CircularProgress className="text-danger" />
        </div>
      ) : (
        <div className="d-block d-lg-flex min-vh-100 mw-100">
          <SideBar />
          <div className="flex-grow-1 d-flex flex-column min-vh-100">
            <TopBar />
            <div className="flex-grow-1 mt-2 p-3">{children}</div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default ModulesLayout;
