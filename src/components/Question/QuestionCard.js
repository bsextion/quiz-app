import React from "react";
import { Card, ListGroup, ProgressBar } from "react-bootstrap";

export default function ({ questionData, onUpdateAnswer, currentQuestion }) {
  const { question, answers, selected_answer } = questionData;
  const isAnswerSelected = selected_answer != null ? true : false;
  const selectedAnswerStyle = "bg-light text-primary border border-primary rp ";

  return (
    <Card>
      <Card.Body>
        <Card.Title>{currentQuestion + 1}. {question}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Please choose from one of the following:
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
