import PanelBody from "@/common/Panel/PanelBody";
import Tile from "@/common/Tile/Tile";
import React from "react";
import { QuizContext } from "./Quiz";
import constants from "../../../constants/constants.json";
import { ListGroup } from "react-bootstrap";

export default function Questions({ handleSelected }) {
  const { currentQuestion, quizData } = React.useContext(QuizContext);
  const { question, answers, selected_answer } = quizData[currentQuestion];
  const selectedAnswerStyle = "bg-light text-primary border border-primary rp ";
  return (
    <PanelBody>
      <Tile title={`${currentQuestion + 1}. ${question}`} subtitle={constants.global.card_subtitle_question}h>
        <ListGroup className="list-group">
          {answers.map((answer, index) => (
            <ListGroup.Item
              className={`rounded ${
                selected_answer === answer ? selectedAnswerStyle : null
              }`}
              key={index}
              action
              onClick={() => handleSelected(answer)}
            >
              {answer}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Tile>
    </PanelBody>
  );
}
