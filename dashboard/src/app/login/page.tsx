"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";
import { Mail, Lock, Facebook, Phone, MessageCircle } from "react-feather";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <div className="mb-3">
              <label className="form-label fw-bold mb-2 text-danger">
                Sign in
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white text-danger ">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control border border-danger"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text bg-white text-danger">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control border border-danger"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="ms-2 text-secondary">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-danger">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn btn-danger w-100 py-2">
              Sign in
            </button>
          </form>

          {/* Footer */}
          <p className="text-muted mt-4 text-center">
            Sign In Secured by <span className="fw-bold">AITS HUB</span>
          </p>
          <p className="text-muted text-center mb-0 d-flex align-items-center justify-content-center">
            Customer Support:&nbsp;
            <a
              href="tel:+2349114565121"
              className="text-dark me-2 d-flex align-items-center"
            >
              <Phone size={16} className="me-1" /> +234 911 456 5121
            </a>
            <a
              href="https://wa.me/+2349114565121"
              className="text-success me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="https://facebook.com/"
              className="text-primary me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={16} />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
