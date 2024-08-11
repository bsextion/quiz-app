import React from "react";
import Modal from "react-bootstrap/Modal";
import { QuizContext } from "./Quiz";

export const QuizHeader = () => {
  const { currentQuestion, totalQuestion } = React.useContext(QuizContext);

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          Question No.{currentQuestion} of {totalQuestion}
        </Modal.Title>
      </Modal.Header>
    </>
  );
};
