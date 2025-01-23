import React from "react";
import QuizPagination from "./QuizPagination";
import constants from "@/constants/constants.json";
import { QuizContext } from "./Quiz";
import { Button } from "react-bootstrap";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Modal } from "react-bootstrap";

export default function QuizModal({
  handleCurrentQuestion,
  handleNext,
  handlePrevious,
  handleSubmit,
  children,
}) {
  const { theme } = useTheme();
  const { currentQuestion, quizData } = React.useContext(QuizContext);
  const showNext = currentQuestion + 1 === quizData.length;
  const showPrevious = currentQuestion === 0;
  return (
    <>
      <Modal.Dialog size="xl" centered>
        <Modal.Header className={`p-2 ${theme.panel.background} ${theme.panel.header}`}>
        <Modal.Title className="w-100 mx-4"></Modal.Title>
        </Modal.Header>
        <Modal.Body className={theme.panel.background}>{children}</Modal.Body>
        <Modal.Footer className={theme.panel.background}>
        <QuizPagination
            data={quizData}
            renderColor={(propExists) => (propExists ? theme.pagination.selected : theme.pagination.unselected)}
            handleCurrentQuestion={handleCurrentQuestion}
            renderActive={(indexValue) =>
              currentQuestion == indexValue ? "active" : ""
            }
          />
          <Button
            className={theme.button.primary}
            onClick={handlePrevious}
            disabled={showPrevious}
          >
            {constants.global.button_message_previous}
          </Button>
          <Button
            className={theme.button.primary}
            onClick={handleNext}
            disabled={showNext}
          >
            {constants.global.button_message_next}
          </Button>
          <Button className={theme.button.warning} onClick={handleSubmit}>
            {constants.global.button_message_submit}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
}
