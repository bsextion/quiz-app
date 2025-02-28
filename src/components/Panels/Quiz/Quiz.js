import React, { createContext, useEffect, useState } from "react";
import Results from "./Results";
import Alert from "@/common/Alert";
import { API_ENDPOINTS } from "@/constants/endpoints";
import constants from "../../../constants/constants.json";
import { useApiOnUpdate } from "@/hooks/useApiOnUpdate";
import { Button } from "react-bootstrap";
import StatusMessage from "@/components/StatusMessage";
import QuizPanel from "./QuizPanel";
import { transformQuizData } from "@/utility/quizUtils";
import Questions from "./Questions";
import { shuffle } from "@/utility/utils";

export const QuizContext = createContext();

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [triggerNewQuiz, setTriggerNewQuiz] = useState(0);

  const { error, data, isLoading } = useApiOnUpdate(
    API_ENDPOINTS.GET_QUESTIONS(),
    transformQuizData,
    [triggerNewQuiz]
  );

  useEffect(() => {
    if (data) {
      setQuizData(data);
    }
  }, [data]);

  const handleSelected = (selected) => {
    const currentQuestionData = quizData[currentQuestion];
    const updatedQuestionData = {
      ...currentQuestionData,
      [constants.key.selected_answer]:
        currentQuestionData[constants.key.selected_answer] === selected
          ? null
          : selected,
    };

    // update quiz data with current question
    setQuizData((prev) => {
      const newQuizData = [...prev];
      newQuizData[currentQuestion] = updatedQuestionData;
      return newQuizData;
    });
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const allQuestionsAnswered = quizData.every(
      (question) => question[constants.key.selected_answer] !== null
    );

    if (!allQuestionsAnswered && !showMessage) {
      setShowMessage(true);
      return;
    }
    setIsSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    const shuffledQuiz = shuffle(quizData);
    const shuffledQuizAnswers = shuffledQuiz.map((question) => {
      return {
        ...question,
        [constants.key.answers]: shuffle(question[constants.key.answers]),
        [constants.key.selected_answer]: null,
      };
    });
    setQuizData(shuffledQuizAnswers);
    setCurrentQuestion((prev) => 0);
    setShowMessage(false);
    setIsSubmitted(false);
  };

  const handleNewQuiz = () => {
    setCurrentQuestion((prev) => 0)
    setTriggerNewQuiz((prev) => prev + 1);
    setShowMessage(false);
    setIsSubmitted(false);
  };

  const handleCurrentQuestion = (index = 0) => {
    setCurrentQuestion((prev) => index);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        quizData,
      }}
    >
      {isLoading && (
        <StatusMessage
          message={constants.global.loading_message_questions}
          loader={true}
        />
      )}
      {error && (
        <StatusMessage
          message={constants.global.error_message_questions}
          loader={false}
        />
      )}
      {!error && isSubmitted && (
        <Results
          handleNewQuiz={handleNewQuiz}
          handleRetakeQuiz={handleRetakeQuiz}
        />
      )}
      {!error && !isSubmitted && !isLoading && quizData.length > 0 && (
        <div className="modal show d-block z-1" style={{position: "initial"}}>
          <QuizPanel
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
            handleCurrentQuestion={handleCurrentQuestion}
          >
            <Questions handleSelected={handleSelected} />
          </QuizPanel>
          <Alert
            title={constants.global.alert_warning_title_unanswered}
            body={constants.global.alert_warning_body_unanswered}
            show={showMessage}
          >
            <Button
              variant="secondary"
              onClick={() => {
                setShowMessage(false);
              }}
            >
              {constants.global.button_message_cancel}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {constants.global.button_message_ok}
            </Button>
          </Alert>
        </div>
      )}
    </QuizContext.Provider>
  );
}
