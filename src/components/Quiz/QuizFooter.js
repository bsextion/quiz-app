import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { QuizContext } from "./Quiz";
import Toast from 'react-bootstrap/Toast';

export default function QuizFooter() {
  const { handleNext, handlePrevious, handleSubmit, currentQuestion, totalQuestion, quizData } =
    React.useContext(QuizContext);

  const showNext = currentQuestion + 1 === totalQuestion;
  const showSubmit = !showNext;
  const showPrevious = currentQuestion === 0;
  const currentQuestionData = quizData[currentQuestion];
  const { selectedAnswer } = { currentQuestionData };

  return (
    <>
      <Modal.Footer>
      <Button variant="primary" onClick={handlePrevious} disabled={showPrevious}>
          Previous
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={showNext}>
          Next
        </Button>
        <Button variant="warning" onClick={handleSubmit} disabled={showSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}
