"use client";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const handleNavLinkClick = (link: string) => {
    setActiveLink(link);
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      bg="white"
      className="bg-body-white mt-3 mx-1 mx-lg-4 rounded-3"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand href="#home">
          <Image
            src={"/images/logo.png"}
            alt=""
            width={153}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </Navbar.Brand>
        <Nav className="ms-auto me-5 d-block d-lg-none">
          <Nav.Link>
            <SearchIcon />
          </Nav.Link>
        </Nav>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto fw-semibold gap-3">
            {[
              { href: "#home", label: "Home" },
              { href: "#about", label: "About" },
              { href: "#services", label: "Services" },
              { href: "#halls-booking", label: "Halls & Booking" },
              { href: "#shops-businesses", label: "Shops & Businesses" },
              { href: "#blog", label: "Blog" },
              { href: "#contact", label: "Contact Us" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} passHref legacyBehavior>
                <Nav.Link
                  onClick={() => handleNavLinkClick(href)}
                  className={`${
                    activeLink === href
                      ? "border-2 border-bottom border-warning"
                      : ""
                  }`}
                >
                  {label}
                </Nav.Link>
              </Link>
            ))}
          </Nav>
          <Nav className="d-none d-lg-block">
            <Nav.Link>
              <SearchIcon />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
