import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { QuizContext } from "./Quiz";
import Toast from "react-bootstrap/Toast";
import Pagination from "@/common/Pagination";

export default function QuizFooter() {
  const {
    handleNext,
    handlePrevious,
    handleSubmit,
    currentQuestion,
    totalQuestion,
    quizData,
    onUpdateCurrentQuestion,
  } = React.useContext(QuizContext);

  //if on last question and selected answers are all answered
  const showNext = currentQuestion + 1 === totalQuestion;
  const showPrevious = currentQuestion === 0;

  return (
    <>
      <Modal.Footer>
        <Pagination>
          {quizData.map((question, index) => (
            <Pagination.Dot
              key={index}
              color={question.selected_answer ? "primary" : "secondary"}
              active={currentQuestion == index ? "active" : ""}
              onClick={() => onUpdateCurrentQuestion(index)}
            />
          ))}
        </Pagination>
        <Button
          variant="primary"
          onClick={handlePrevious}
          disabled={showPrevious}
        >
          Previous
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={showNext}>
          Next
        </Button>
        <Button variant="warning" onClick={handleSubmit} >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}
