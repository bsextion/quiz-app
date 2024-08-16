import React from "react";
import Modal from "react-bootstrap/Modal";
import { QuizContext } from "../Quiz/Quiz";

export default function QuizHeader() {
  const { currentQuestion, totalQuestion, quizData } =
    React.useContext(QuizContext);


  return (
    <>
      <Modal.Header className="p-2">
        <Modal.Title className="w-100 mx-4 "></Modal.Title>
      </Modal.Header>
    </>
  );
}
