"use client";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchIcon from "@mui/icons-material/Search";
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fw-semibold gap-3">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <Nav.Link href="#link">Services</Nav.Link>
            <Nav.Link href="#link">Shops</Nav.Link>
            <Nav.Link href="#link">Businesses</Nav.Link>
            <Nav.Link href="#link">Blog</Nav.Link>
            <Nav.Link href="#link">Contact Us</Nav.Link>
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
