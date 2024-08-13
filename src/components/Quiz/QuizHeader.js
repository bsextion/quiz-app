import React from "react";
import Modal from "react-bootstrap/Modal";
import  {QuizContext}  from '../Quiz/Quiz';
import { Badge } from "react-bootstrap";

export default function QuizHeader () {
  const { currentQuestion, totalQuestion } = React.useContext(QuizContext);

  return (
    <>
      <Modal.Header>
        <Modal.Title>
          Question No.{currentQuestion + 1} of {totalQuestion}
        </Modal.Title>
      </Modal.Header>
    </>
  );
};
