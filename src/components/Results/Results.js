import React from "react";
import TableView from "./Tables/TableView";
import { QuizContext } from "../Quiz/Quiz";
import Modal from "react-bootstrap/Modal";
import constants from '../../constants/constants.json';

export default function Results() {
  const { quizData } = React.useContext(QuizContext);
  const headers = [constants.global.table_headers_question, constants.global.table_headers_response, constants.global.table_headers_correct];

  const customData = quizData.map((item) => ({
    question: item[constants.keys.question],
    selected_answer: item[constants.keys.selected_answer],
    correct_answer: item[constants.keys.correct_answer],
  }));

  const objKeys = [constants.keys.question, constants.keys.selected_answer, constants.keys.correct_answer];
 

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog size="xl" centered>
        <TableView headers={headers} data={customData} objKeys={objKeys} striped bordered />
      </Modal.Dialog>
    </div>
  );
}
