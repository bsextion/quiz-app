import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function Message({ title = "", body = "", show = false, handleCancel = () => {}, handleSubmit = () => {} }) {
  return (
    <>
      {show && (
        <>
          <div
            style={{
              display: "block",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1060, // Ensure it's below the second modal
            }}
          ></div>
          <div
            className="modal show"
            style={{ display: "block", position: "fixed", zIndex: 1070 }} // zIndex is higher than the overlay to ensure it appears on top
          >
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {body}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Ok</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </>
      )}
    </>
  );
}
