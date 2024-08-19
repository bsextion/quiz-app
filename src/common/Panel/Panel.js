import React from "react";
import { Modal } from "react-bootstrap";

export default function Panel({ children, ...rest }) {
  return (
    <Modal.Dialog {...rest}>
      {children}
    </Modal.Dialog>
  );
}
