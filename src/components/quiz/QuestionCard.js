import constants from "@/constants/constants.json";
import { ListGroup } from "react-bootstrap";
import { useTheme } from "@/components/theme/ThemeProvider";
import { QuizContext } from "./Quiz";
import React from "react";
import CustomCard from "@/common/card/CustomCard";

export default function QuestionCard({ handleSelected }) {
  const { currentQuestion, quizData } = React.useContext(QuizContext);
  const { question, answers, selected_answer } = quizData[currentQuestion];
  const { theme } = useTheme();
  const selectedStyle = `bg-light text-violet-100 border border-primary rp`;
  const nonSelectedStyle = `${theme.tile.background}`
  return (
    <CustomCard
      title={`${currentQuestion + 1}. ${question}`}
      subtitle={constants.global.card_subtitle_question}
      subtitleColor={theme.tile.subText}
      className={`${theme.tile.background} ${theme.tile.text}`}
    >
      <ListGroup
        className={`list-group ${theme.tile.background} ${theme.tile.text}`}
      >
        {answers.map((answer, index) => (
          <ListGroup.Item
            className={`${selected_answer === answer ? theme.list.selected : theme.list.unselected }`}
            key={index}
            action
            onClick={() => handleSelected(answer)}
          >
            {answer}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </CustomCard>
  );
}
