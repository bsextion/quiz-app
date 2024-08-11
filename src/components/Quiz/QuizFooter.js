import React from "react";
import Modal from "react-bootstrap/Modal";
import  Button from "react-bootstrap/Button";
export const QuizFooter = () => {
  return (
    <>
      <Modal.Footer>
        <Button variant="primary">Next</Button>
        <Button variant="warning">Submit</Button>
      </Modal.Footer>
    </>
  );
};
