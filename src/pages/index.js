import { Quiz } from "@/components/Quiz/Quiz";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PiStudentBold } from "react-icons/pi";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function Home() {
  return (
    <>
     <Navbar className="bg-dark">
        <Container className="ms-4">
          <Navbar.Brand className="text-white">
          <PiStudentBold />
            Quiz App
          </Navbar.Brand>
        </Container>
      </Navbar>
    <Quiz/>
    </>
  );
}
