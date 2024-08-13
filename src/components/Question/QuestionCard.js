import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import  {QuizContext}  from '../Quiz/Quiz';

export default function({ questionData, onUpdateAnswer }) {
  const { question, answers } = questionData;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{question}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Please choose from one of the following:
        </Card.Subtitle>
        <ListGroup className="list-group" numbered>
          {answers.map((answer, index) => (
            <ListGroup.Item key={index} action onClick={() => onUpdateAnswer(answer)}>{answer}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
