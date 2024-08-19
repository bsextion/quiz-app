import React from "react";
import { Spinner } from "react-bootstrap";

export default function StatusMessage({ message, loader }) {
  return (
    <div className="text-center">
      <h1>{message}</h1>
      {loader && <Spinner animation="border" />}
    </div>
  );
}
