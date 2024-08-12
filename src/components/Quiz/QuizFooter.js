import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { QuizContext } from "./Quiz";

export const QuizFooter = () => {
  const { onUpdateNext, currentQuestion, totalQuestion } =
    React.useContext(QuizContext);

  const showNext = currentQuestion + 1 === totalQuestion;
  const showSubmit = !showNext

  return (
    <>
      <Modal.Footer>
        <Button variant="primary" onClick={onUpdateNext} disabled={showNext}>
          Next
        </Button>
        <Button variant="warning" disabled={showSubmit}>Submit</Button>
      </Modal.Footer>
    </>
  );
};
