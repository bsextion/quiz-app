import React from "react";
import constants from "../../../constants/constants.json";
import { QuizContext } from "./Quiz";
import Panel from "@/common/Panel/Panel";
import { Button, Table } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import PanelFooter from "@/common/Panel/PanelFooter";

export default function Results({ handleNewQuiz, handleRetakeQuiz }) {
  const { quizData } = React.useContext(QuizContext);
  const headers = [
    constants.global.table_header_question,
    constants.global.table_header_response,
    constants.global.table_header_correct,
  ];

  const resultData = quizData.map((item) => ({
    question: item[constants.key.question],
    selected_answer: item[constants.key.selected_answer],
    correct_answer: item[constants.key.correct_answer],
  }));

  const objKeys = [
    constants.key.question,
    constants.key.selected_answer,
    constants.key.correct_answer,
  ];

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
  <Panel size="xl" centered>
    {/* Table title here  */}
    <Table striped bordered>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {resultData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {objKeys.map((objKey, keyIndex) =>
              objKey === "selected_answer" ? (
                row["selected_answer"] === row["correct_answer"] ? (
                  <td
                    className="font-weight-bold text-success"
                    key={`${rowIndex}-${keyIndex}`}
                  >
                    {row[objKey]}
                  </td>
                ) : (
                  <td
                    className="font-weight-bold text-danger"
                    key={`${rowIndex}-${keyIndex}`}
                  >
                    {!row["selected_answer"] && <FaX />}
                    {row[objKey]}
                  </td>
                )
              ) : (
                <td key={`${rowIndex}-${keyIndex}`}>{row[objKey]}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </Table>
    <PanelFooter className="d-flex justify-content-center">
      <Button onClick={handleRetakeQuiz}>
        {constants.global.button_message_retake}
      </Button>
      <Button onClick={handleNewQuiz}>
        {constants.global.button_message_new}
      </Button>
    </PanelFooter>
  </Panel>
  </div>
  )
}
