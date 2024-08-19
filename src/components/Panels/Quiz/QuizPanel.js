import PanelFooter from "@/common/Panel/PanelFooter";
import PanelHeader from "@/common/Panel/PanelHeader";
import React from "react";
import QuizPagination from "./QuizPagination";
import constants from "../../../constants/constants.json";
import { QuizContext } from "./Quiz";
import Panel from "@/common/Panel/Panel";
import { Button } from "react-bootstrap";

export default function QuizPanel({
  handleCurrentQuestion,
  handleNext,
  handlePrevious,
  handleSubmit,
  children,
}) {
  const { currentQuestion, quizData } = React.useContext(QuizContext);
  const showNext = currentQuestion + 1 === quizData.length;
  const showPrevious = currentQuestion === 0;
  return (
    <>
      <Panel size="xl" centered>
        <PanelHeader></PanelHeader>
        {children}
        <PanelFooter>
          <QuizPagination
            data={quizData}
            renderColor={(propExists) => (propExists ? "primary" : "secondary")}
            handleCurrentQuestion={handleCurrentQuestion}
            renderActive={(indexValue) =>
              currentQuestion == indexValue ? "active" : ""
            }
          />
          <Button
            variant="primary"
            onClick={handlePrevious}
            disabled={showPrevious}
          >
            {constants.global.button_message_previous}
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={showNext}>
            {constants.global.button_message_next}
          </Button>
          <Button variant="warning" onClick={handleSubmit}>
            {constants.global.button_message_submit}
          </Button>
        </PanelFooter>
      </Panel>
    </>
  );
}
