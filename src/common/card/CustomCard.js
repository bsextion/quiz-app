import React from "react";
import { Card } from "react-bootstrap";

export default function CustomCard({ title = "", subtitle = "", subtitleColor="", children, ...rest }) {
  
  return (
    <Card {...rest}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className={`mb-2 ${subtitleColor}`}>{subtitle}</Card.Subtitle>
        {children}
      </Card.Body>
    </Card>
  );
}
