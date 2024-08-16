import React from "react";

export default function Alert({
  title = "",
  body = "",
  show = false,
  children,
}) {
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
            <Alert.Content title={title} body={body}>
              {children}
            </Alert.Content>
          </div>
        </>
      )}
    </>
  );
}
