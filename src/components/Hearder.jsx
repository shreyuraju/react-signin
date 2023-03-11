import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home from "./Home";
//NAvigation Bar
export default function Hearder() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">React-Form</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" element={<Home />}>
              Home
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
