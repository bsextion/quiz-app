import { Modal } from "react-bootstrap";
import React from "react";
import Alert from "./Alert";

export default function AlertContent({ title, body, children }) {
  return (
    <>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Alert.ButtonGroup>{children}</Alert.ButtonGroup>
      </Modal.Dialog>
    </>
  );
}
