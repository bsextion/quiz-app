import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { QuizContext } from "./Quiz";
import Pagination from "@/common/Pagination";
import constants from '../../constants/constants.json';

export default function QuizFooter() {
  const {
    handleNext,
    handlePrevious,
    handleSubmit,
    currentQuestion,
    quizData,
    updateCurrentQuestion,
  } = React.useContext(QuizContext);

  //if on last question and selected answers are all answered
  const showNext = currentQuestion + 1 === quizData.length;
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
              onClick={() => updateCurrentQuestion(index)}
            />
          ))}
        </Pagination>
        <Button
          variant="primary"
          onClick={handlePrevious}
          disabled={showPrevious}
        >
          {constants.global.button_message_previous}
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={showNext}>
        {constants.global.button_message_next}
        </Button>
        <Button variant="warning" onClick={handleSubmit} >
        {constants.global.button_message_submit}
        </Button>
      </Modal.Footer>
    </>
  );
}
