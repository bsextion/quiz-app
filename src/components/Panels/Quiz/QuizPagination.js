import Pagination from "@/common/Pagination";
import React from "react";


export default function QuizPagination({ data = {}, renderColor, renderActive, handleCurrentQuestion }) {
  
  return (
    <Pagination>
      {data.map((item, index) => (
        <Pagination.Dot
          key={index}
          onClick={() => handleCurrentQuestion(index)}
          color={renderColor(item.selected_answer)}
          active={renderActive(index)}
        />
      ))}
    </Pagination>
  );
}
