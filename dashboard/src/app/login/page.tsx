"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { TextField, InputAdornment, IconButton, Checkbox } from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import EmailIcon from "@mui/icons-material/Email";

import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="container-fluid bg-white">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-lg-4 d-none d-lg-flex">
          <div className="">
            <Image
              src="/images/login.png"
              alt="Shopping Woman"
              width={734}
              height={834}
              className="img-fluid rounded-start-5"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="px-3 px-lg-5">
            <div className="text-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={160}
                height={48}
                className=""
                style={{ objectFit: "contain" }}
              />
              <h5 className="text-dark mt-1 mb-2 fw-normal">Welcome Back 👋</h5>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold mb-2 text-danger">
                  Sign in
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail color="error" />
                      </InputAdornment>
                    ),
                  }}
                  color="error"
                />
              </div>

              <div className="mb-3">
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock
                          style={{ color: "#d32f2f", fontSize: "1.2rem" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          style={{ padding: "1" }}
                        >
                          {showPassword ? (
                            <VisibilityOff
                              style={{ color: "#d32f2f", fontSize: "1.2rem" }}
                            />
                          ) : (
                            <Visibility
                              style={{ color: "#d32f2f", fontSize: "1.2rem" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: "8px",
                    },
                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d32f2f",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc",
                    },
                  }}
                  color="error"
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

                {/* Remember Me Checkbox */}
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
                    <p className="text-danger mt-1 mb-0">Customer Support</p>
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

                  <a href="https://twitter.com" className="nav-link text-black">
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
  );
};

export default Login;
