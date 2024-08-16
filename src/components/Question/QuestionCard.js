import React from "react";
import { Card, ListGroup, ProgressBar } from "react-bootstrap";
import constants from '../../constants/constants.json';

export default function ({ questionData, onUpdateAnswer, currentQuestion }) {
  const { question, answers, selected_answer } = questionData;
  const isAnswerSelected = selected_answer != null ? true : false;
  const selectedAnswerStyle = "bg-light text-primary border border-primary rp ";

  return (
    <Card>
      <Card.Body>
        <Card.Title>{currentQuestion + 1}. {question}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {constants.global.card_subtitle_question}
        </Card.Subtitle>
        <ListGroup className="list-group">
          {answers.map((answer, index) => (
            <ListGroup.Item
              className={`rounded ${
                selected_answer === answer ? selectedAnswerStyle : null
              }`}
              key={index}
              action
              onClick={() => onUpdateAnswer(answer)}
            >
              {answer}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
