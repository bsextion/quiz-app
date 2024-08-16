import React from "react";
import constants from '../../../constants/constants.json';

export default function TableTitle() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center position-relative"
      >
        <h2 className="flex-grow-1 text-center">{constants.global.table_header_results}</h2>
        <h2 className="position-absolute" style={{ right: "5%" }}>
          {/* <GradeView/> */}
        </h2>
      </div>
    </>
  );
}
