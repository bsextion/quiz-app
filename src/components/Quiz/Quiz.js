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
import constants from '../../constants/constants.json';

export const QuizContext = createContext();

export default function Quiz() {
  //context created here - pass down current question and total question to quiz components and question components
  // useeffect to grab list of questions and corresponding answers (for now only grab 10)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

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

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => {
        const transformedData = res.data.results.map((item) => ({
          question: decode(item.question),
          correct_answer: decode(item.correct_answer),
          answers: _.shuffle(
            decode([...item.incorrect_answers, item.correct_answer])
          ),
          selected_answer: null,
        }));
        setQuizData(transformedData);
        setTotalQuestion(transformedData.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
      {totalQuestion === 0 ? (
        <h1>{constants.global.loading_message_questions}</h1>
      ) : isSubmitted ? (
        <Results />
      ) : (
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
            <Alert.Button variant="secondary" onClick={() => {setShowMessage(false)}}>
              {constants.global.button_message_cancel}
            </Alert.Button>
            <Alert.Button variant="primary" onClick={handleSubmit}>
              {constants.global.button_message_ok}
            </Alert.Button>
          </Alert>
        </div>
      )}
    </QuizContext.Provider>
  );
}
