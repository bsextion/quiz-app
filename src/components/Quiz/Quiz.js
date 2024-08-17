import React, { createContext, use, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import QuizFooter from "./QuizFooter";
import QuizHeader from "./QuizHeader";
import axios from "axios";
import _ from "lodash";
import Question from "../Question/Question";
import Results from "../Results/Results";
import { decode } from "html-entities";
import Alert from "@/common/Alert";
import constants from "../../constants/constants.json";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/endpoints";
import { useApiOnUpdate } from "@/hooks/useApiOnUpdate";
import { Spinner } from "react-bootstrap";

export const QuizContext = createContext();

export default function Quiz() {
  //context created here - pass down current question and total question to quiz components and question components
  // useeffect to grab list of questions and corresponding answers (for now only grab 10)

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const transformQuizData = (data) => {
    console.log("In the transform Data:", data.results);
    const transformedQuizData = data.results.map((item) => ({
      question: decode(item.question),
      correct_answer: decode(item.correct_answer),
      answers: _.shuffle(
        decode([...item.incorrect_answers, item.correct_answer])
      ),
      selected_answer: null,
    }));

    console.log("Transformed the data:", transformedQuizData);
    return transformedQuizData;
  };

  const { error, data, isLoading } = useApiOnUpdate(
    API_ENDPOINTS.GET_QUESTIONS(),
    transformQuizData
  );

  useEffect(() => {
    if (data) {
      setQuizData(data);
      setTotalQuestion(data.length);
    }
  }, [data]);

  //update selected answer
  const onUpdateAnswer = (selected) => {
    const currentQuestionData = quizData[currentQuestion];

    //answer is already selected, we want to deselect

    //update selected answer in current question
    const updatedQuestionData = {
      ...currentQuestionData,
      selected_answer:
        currentQuestionData.selected_answer === selected ? null : selected,
    };

    // update quiz data with current question
    setQuizData((prev) => {
      const newQuizData = [...prev];
      newQuizData[currentQuestion] = updatedQuestionData;
      return newQuizData;
    });
  };

  const onUpdateCurrentQuestion = (index) => {
    setCurrentQuestion((prev) => index);
  };

  const handleNext = () => {
    const currentQuestionData = quizData[currentQuestion];
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    const currentQuestionData = quizData[currentQuestion];
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const allQuestionsAnswered = quizData.every(
      (question) => question.selected_answer !== null
    );

    if (!allQuestionsAnswered && !showMessage) {
      setShowMessage(true);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        totalQuestion,
        onUpdateAnswer,
        handleNext,
        handlePrevious,
        handleSubmit,
        setCurrentQuestion,
        onUpdateCurrentQuestion,
        quizData,
      }}
    >
      {isLoading && (
        <div className="text-center">
          <h1>{constants.global.loading_message_questions}</h1>
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <div className="text-center">
          <h1>{constants.global.error_message_questions}</h1>
        </div>
      )}
      {!error && totalQuestion > 0 && isSubmitted && <Results />}
      {!error && totalQuestion > 0 && !isSubmitted && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial", zIndex: 1050 }}
        >
          <Modal.Dialog size="xl" centered>
            <QuizHeader />
            <Question />
            <QuizFooter />
          </Modal.Dialog>

          <Alert
            title={constants.global.alert_warning_title_unanswered}
            body={constants.global.alert_warning_body_unanswered}
            show={showMessage}
          >
            <Alert.Button
              variant="secondary"
              onClick={() => {
                setShowMessage(false);
              }}
            >
              {constants.global.button_message_cancel}
            </Alert.Button>
            <Alert.Button variant="primary" onClick={handleSubmit}>
              {constants.global.button_message_ok}
            </Alert.Button>
          </Alert>
        </div>
      )}
      {}
    </QuizContext.Provider>
  );
}
