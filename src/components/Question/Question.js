import React from "react";
import Modal from "react-bootstrap/Modal";
import QuestionCard from "./QuestionCard";
import { QuizContext } from "../Quiz/Quiz";

export default function Question() {
  const { quizData, currentQuestion, onUpdateAnswer } =
    React.useContext(QuizContext);
  const questionData = quizData[currentQuestion];

  return (
    <Modal.Body>
      <QuestionCard
        questionData={questionData}
        onUpdateAnswer={onUpdateAnswer}
        currentQuestion={currentQuestion}
      >
      </QuestionCard>
    </Modal.Body>
    
  );
}
