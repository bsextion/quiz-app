import { Quiz } from "@/components/Quiz/Quiz";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PiStudentBold } from "react-icons/pi";

export default function Home() {
  return (
    <>
      <Container fluid style={{backgroundColor: "black"}}>
        <Row>
          <Col style={{margin: "2px auto", color: "white"}}>
            <PiStudentBold />
            Quiz App
          </Col>
        </Row>
      </Container>
      <Quiz />
    </>
  );
}
