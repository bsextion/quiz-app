import React from "react";
import { FaX } from "react-icons/fa6";

export default function TableRows({ data, objKeys }) {
  return (
    <>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {objKeys.map((objKey, keyIndex) =>
            objKey === "selected_answer" ? (
              row["selected_answer"] === row["correct_answer"] ? (
                <td
                  className="font-weight-bold text-success"
                  key={`${rowIndex}-${keyIndex}`}
                >
                  {row[objKey]}
                </td>
              ) : (
                <td
                  className="font-weight-bold text-danger"
                  key={`${rowIndex}-${keyIndex}`}
                >
                  {!row["selected_answer"] && <FaX/>}
                  {row[objKey]}
                </td>
              )
            ) : (
              <td key={`${rowIndex}-${keyIndex}`}>{row[objKey]}</td>
            )
          )}
        </tr>
      ))}
    </>
  );
}
