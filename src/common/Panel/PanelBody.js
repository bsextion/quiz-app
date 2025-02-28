import React from "react";
import { Modal } from 'react-bootstrap'

export default function PanelBody({ children }) {
  return <Modal.Body>{children}</Modal.Body>;
}
