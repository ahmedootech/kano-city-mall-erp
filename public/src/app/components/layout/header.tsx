"use client";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
const Header = () => {
  return (
    <Navbar
      expand="lg"
      bg="white"
      className="bg-body-white mt-3 mx-1 mx-lg-4 rounded-3"
      fixed="top"
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fw-semibold gap-3">
            <Link href="#home" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="#about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
            <Link href="#services" passHref legacyBehavior>
              <Nav.Link>Services</Nav.Link>
            </Link>
            <Link href="#shops" passHref legacyBehavior>
              <Nav.Link>Shops</Nav.Link>
            </Link>
            <Link href="#businesses" passHref legacyBehavior>
              <Nav.Link>Businesses</Nav.Link>
            </Link>
            <Link href="#blog" passHref legacyBehavior>
              <Nav.Link>Blog</Nav.Link>
            </Link>
            <Link href="#contact" passHref legacyBehavior>
              <Nav.Link>Contact Us</Nav.Link>
            </Link>
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
