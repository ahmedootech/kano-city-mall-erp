"use client";
import ContactCard from "../../contacts/contact-card";
import { contactList } from "./data";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="pt-5 py-lg-5">
      <div className="container-fluid gx-0">
        <div id="contact" className="row gy-3 mb-5 px-3 px-lg-5">
          <div className="col-lg-7 order-2 order-lg-1">
            <div className="">
              <h3 className="mb-3 d-none d-lg-block">Contact Us</h3>
              <form action="">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Type your name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <input
                        type="email"
                        placeholder="Type your email"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Message Us
                      </label>
                      <textarea
                        name=""
                        id=""
                        rows={5}
                        className="form-control"
                        placeholder="Type something"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Send message"
                  className="btn btn-dark px-3 py-2 rounded-5"
                />
              </form>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2">
            <div className="">
              <h3 className="mb-3 d-lg-none mb-4 text-center">Contact Us</h3>
              {contactList.map((contact, i) => (
                <ContactCard
                  key={i}
                  Icon={contact.icon}
                  title={contact.title}
                  description={contact.description}
                />
              ))}
            </div>
          </div>
        </div>

        <section className="container-fluid bg-dark py-5 px-3 px-lg-5 text-white rounded-bottom-4">
          <div className="row py-4 border-warning border-top border-bottom g-3 gy-5 my-3">
            <div className="col-lg-7">
              <Image
                src={"/images/logo.png"}
                alt=""
                width={153}
                height={40}
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
              <p className="py-3 pb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                dicta. Blanditiis earum veniam, a excepturi omnis, hic quod
                maiores culpa, ipsam impedit praesentium numquam neque
                consequuntur cum sapiente similique quis iusto! Quas doloribus
                incidunt deleniti aspernatur dolorem ad temporibus, facilis
                iste, est iusto accusamus necessitatibus voluptatem alias
                consequatur explicabo. Hic?
              </p>
              <div className="d-flex text-warning gap-3">
                <a href="">
                  <FacebookRoundedIcon />
                </a>
                <a href="">
                  <WhatsAppIcon />
                </a>
                <a href="">
                  <XIcon />
                </a>
                <a href="">
                  <InstagramIcon />
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div className="col-6">
                  <h5 className="mb-3 text-warning">Navigation</h5>
                  <div className="d-flex flex-column gap-3">
                    <Link href={"/"} className="nav-link">
                      Home
                    </Link>
                    <Link href={"/"} className="nav-link">
                      About
                    </Link>
                    <Link href={"/"} className="nav-link">
                      Services
                    </Link>
                    <Link href={"/"} className="nav-link">
                      Shop & Businesses
                    </Link>
                    <Link href={"/"} className="nav-link">
                      Blog
                    </Link>
                    <Link href={"/"} className="nav-link">
                      Contact Us
                    </Link>
                  </div>
                </div>
                <div className="col-6">
                  <h5 className="mb-3 text-warning">Contact</h5>
                  <div className="d-flex flex-column gap-3">
                    <a href="#" className="nav-link ">
                      +234 708899945
                    </a>
                    <a href="#" className="nav-link ">
                      kanocitymal@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-lg-row justify-content-lg-between  ">
            <p className="order-2 order-lg-1">
              Copyright© 2024 AITS HUBl. All Rights Reserved.
            </p>
            <p className="order-1 order-lg-2">
              User Terms & Conditions | Privacy Policy
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
