"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,

} from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import MessageIcon from "@mui/icons-material/Message";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

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
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 h-100">
        <div className="col-12 col-md-6 d-none d-md-flex justify-content-center">
          <Image
            src="/images/Login.png"
            alt="Shopping Woman"
            width={400}
            height={500}
            className="w-100 h-90 img-fluid rounded position-relative p-0 mt-4 mb-4"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-white px-4 px-md-5 py-5">
          <div className="text-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={153}
              height={40}
              className="mb-3"
            />
            <h3 className="text-dark fw-bold">Welcome Back 👋</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px" }}
          >
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
                      <Lock style={{ color: "#d32f2f", fontSize: "1.2rem" }} />
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

            <div className="mb-4">
              {/* Forgot Password Link */}
              <div className="d-flex justify-content-end mb-2">
                <a
                  href="#"
                  className="text-black fw-bold"
                  style={{
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  Forgot Password?
                </a>
              </div>

              {/* Remember Me Checkbox */}
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
            </div>

            <button type="submit" className="btn btn-danger w-100 py-2">
              Sign in
            </button>

            <p className="text-muted mt-4 text-center text-danger">
              <span className="text-danger">Sign In Secured by </span>{" "}
              <span className="fw-bold">AITS HUB</span>
            </p>
          </form>

          {/* Footer */}
          <div className="customer-support-section mt-5 ">
            <div className="d-flex justify-content-center">
              <SupportAgentIcon
                style={{
                  fontSize: "50px",
                  color: "black",
                }}
              />
            </div>
            <p className="text-danger fs-2 mb-2 text-center">
              Customer Support
            </p>

            <div className="d-flex flex-column  text-center">
              <span className="fw-bold fs-5 ">Call/Chat with us</span>
              <span className="text-danger fs-10  align-items-center mt-0">
                <MessageIcon
                  className="me-2 fs-5 "
                  style={{ color: "#77c42f", borderRadius: "2px" }}
                />{" "}
                Send Us Message Now
              </span>
            </div>
            <p className="text-muted text-center mb-0 d-flex align-items-center justify-content-center">
              <a
                href="tel:+2349114565121"
                className="text-black fw-bold me-2 d-flex align-items-center mt-2"
              >
                (+234) 911 456 5121
              </a>
              {/* <a href="">
                <FacebookRoundedIcon />
              </a> */}
              <a href="">
                <WhatsAppIcon style={{ color: "#25D366" }} />
              </a>
              <a href="">
                <TelegramIcon style={{ color: "#0088CC" }} />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
