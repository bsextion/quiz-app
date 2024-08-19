import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { PiStudentBold } from "react-icons/pi";

export default function Navigation({}) {
  return (
    <Navbar className="bg-dark">
      <Container className="ms-4">
        <Navbar.Brand className="text-white">
          <PiStudentBold />
          Quiz Blitz
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
