"use client";
import Image from "next/image";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { MdOutlineMail } from "react-icons/md";
import * as yup from "yup";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import EmailIcon from "@mui/icons-material/Email";
import { IoMdLock } from "react-icons/io";

import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import InputWithIcon from "../../components/form-controls/input-with-icon/input-with-icon";

import { toast } from "react-toastify";
import { LoginCredentials } from "@/store/features/auth/types";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/features/auth";
import { AppDispatch } from "@/store";
import { useRouter } from "next/navigation";

const defaultValues = {
  email: "",
  password: "",
};
const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email address is required"),
    password: yup.string().required("Password is required"),
  });

  const methods = useForm<FieldValues | any>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const handleSubmit = async (data: LoginCredentials) => {
    try {
      await dispatch(
        authActions.main.login({ email: data.email, password: data.password })
      ).unwrap();

      toast.success("Login successful!");
      router.replace("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid bg-white">
      <div className="row justify-content-center min-vh-100 align-items-center justify-content-center ">
        <div className="col-lg-9 shadow ps-0 rounded-start-5 rounded-end-5">
          <div className="row ">
            <div className="col-lg-6 d-none d-lg-flex ">
              <Image
                src="/images/login1.png"
                alt="Shopping Woman"
                width={734}
                height={834}
                className="img-fluid rounded-start-5"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-lg-6">
              <div className="px-3 px-lg-4 py-5">
                <div className="text-center d-flex flex-column align-items-center">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={160}
                    height={48}
                    className=""
                    style={{ objectFit: "contain" }}
                  />
                  <h4 className="text-dark mt-1 mb-2 fw-normal">
                    Welcome Back 👋
                  </h4>
                </div>

                <form onSubmit={methods.handleSubmit(handleSubmit)}>
                  <div className="mb-3">
                    <label className="form-label fw-bold mb-2 text-danger">
                      Sign in
                    </label>
                    <InputWithIcon
                      name="email"
                      type="email"
                      LeftIcon={MdOutlineMail}
                      label="Email"
                      control={methods.control}
                    />
                    <InputWithIcon
                      name="password"
                      type="password"
                      LeftIcon={IoMdLock}
                      label="Password"
                      control={methods.control}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          color="error"
                          style={{ padding: "0" }}
                        />
                        <span
                          style={{
                            marginLeft: "5px",
                            fontSize: "0.9rem",
                            color: "#616161",
                          }}
                        >
                          Remember me
                        </span>
                      </div>
                      <a
                        href="#"
                        className="text-black"
                        style={{
                          textDecoration: "none",
                          fontSize: "0.9rem",
                        }}
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger w-100 py-2">
                    Sign in
                  </button>
                </form>

                {/* Footer */}
                <div className="customer-support-section mt-2 ">
                  <p className="text-center">
                    <span className="text-danger">Sign In Secured by</span>{" "}
                    <span className="">AITS HUB</span>
                  </p>
                  <div className="mt-1 text-center">
                    <div className="d-flex flex-column align-items-center">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <SupportAgentIcon />
                        <p className="text-danger mt-1 mb-0 fw-semibold">
                          Customer Support
                        </p>
                      </div>
                      <p className="form-text fw-semibold mb-3">
                        Call/Chat with us or send an email
                      </p>
                    </div>
                    <div className="d-flex justify-content-center gap-3 text-danger">
                      <a href="#" className="nav-link nav-link">
                        <FacebookRoundedIcon />
                      </a>
                      <a href="#" className="nav-link">
                        <WhatsAppIcon />
                      </a>
                      <a href="https://www.instagram.com" className="nav-link">
                        <InstagramIcon />
                      </a>

                      <a
                        href="https://twitter.com"
                        className="nav-link text-black"
                      >
                        <XIcon />
                      </a>
                      <a href="mailto:support@example.com" className="nav-link">
                        <EmailIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
