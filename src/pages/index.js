
import Container from "react-bootstrap/Container";
import { PiStudentBold } from "react-icons/pi";
import { Navbar } from "react-bootstrap";
import Quiz from "@/components/Quiz/Quiz";

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
