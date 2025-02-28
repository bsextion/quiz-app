import React from "react";
import { Card } from "react-bootstrap";

export default function Tile({ title = "", subtitle = "", children }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        {children}
      </Card.Body>
    </Card>
  );
}
