import React from "react";
import TableView from "./Tables/TableView";
import { QuizContext } from "../Quiz/Quiz";
import Modal from "react-bootstrap/Modal";

export default function Results() {
  const { quizData } = React.useContext(QuizContext);
  const headers = ["Question", "Response", "Correct Answer"];

  const customData = quizData.map((item) => ({
    question: item.question,
    selected_answer: item.selected_answer,
    correct_answer: item.correct_answer,
  }));

  const objKeys = ['question', 'selected_answer', 'correct_answer'];
 

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog size="xl" centered>
      <h2 className="text-center">Quiz Results</h2>
        <TableView headers={headers} data={customData} objKeys={objKeys} striped bordered />
      </Modal.Dialog>
    </div>
  );
}
