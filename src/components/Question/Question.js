import React from "react";
import Modal from "react-bootstrap/Modal";
import QuestionCard from "./QuestionCard";
import { QuizContext } from "../Quiz/Quiz";

export default function Question() {
  const { quizData, currentQuestion, updateSelectedAnswer } =
    React.useContext(QuizContext);
  const questionData = quizData[currentQuestion];

  return (
    <Modal.Body>
      <QuestionCard
        questionData={questionData}
        onUpdateAnswer={updateSelectedAnswer}
        currentQuestion={currentQuestion}
      >
      </QuestionCard>
    </Modal.Body>
    
  );
}
