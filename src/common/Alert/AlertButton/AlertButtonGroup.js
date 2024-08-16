import { Modal } from "react-bootstrap";
import React from "react";

export default function AlertButtonGroup({ children }) {
  return <Modal.Footer>{children}</Modal.Footer>;
}
