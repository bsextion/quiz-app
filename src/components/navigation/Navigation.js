import React from "react";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { PiStudentDuotone    } from "react-icons/pi";
import constants from "../../constants/constants.json";
import { useTheme } from "@/components/theme/ThemeProvider";
import { IoSunny } from "react-icons/io5";
import { MdNightlightRound } from "react-icons/md";
import { lightTheme } from "@/constants/styles/lightTheme";

export default function Navigation({}) {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === lightTheme;
  return (
    <Container fluid  className={`${theme.background}`}>
      <Row className="p-2" >
        <Navbar className={`rounded m-2 ${theme.nav.background}`}>
          <Col xs={9}>
          <Navbar.Brand className={`fw-bold ${theme.nav.text}`}>
            <PiStudentDuotone size={30} className=" m-1 icon-color"/>
            {constants.global.app_title}
          </Navbar.Brand>
          </Col>
          <Col>

          <Button onClick={toggleTheme} className={theme.button.primary}>
            {isLightTheme ? (
              <IoSunny size={25} className="" />
            ) : (
              <MdNightlightRound size={25} />
            )}
          </Button>
          </Col>
        </Navbar>
      </Row>
    </Container>
  );
}
