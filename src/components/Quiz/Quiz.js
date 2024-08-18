import React, { createContext, useEffect, useState } from "react";
import QuizFooter from "./QuizFooter";
import QuizHeader from "./QuizHeader";
import Question from "../Question/Question";
import Results from "../Results/Results";
import { decode } from "html-entities";
import Alert from "@/common/Alert";
import constants from "../../constants/constants.json";
import { API_ENDPOINTS } from "@/constants/endpoints";
import { useApiOnUpdate } from "@/hooks/useApiOnUpdate";
import { Spinner, Modal } from "react-bootstrap";

export const QuizContext = createContext();

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [triggerNewQuiz, setTriggerNewQuiz] = useState(0);

  const shuffle = (array) => {
    // Create a copy of the array
    let arrayCopy = array.slice();
    let currentIndex = arrayCopy.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
        arrayCopy[randomIndex],
        arrayCopy[currentIndex],
      ];
    }

    return arrayCopy;
  };

  const retakeQuiz = () => { 
    const shuffledQuizData = shuffle(quizData);
    const quizDataShuffledAnswers = shuffledQuizData.map((question) => {
      return { ...question, answers: shuffle(question.answers), selected_answer: null };
    });
    setQuizData(quizDataShuffledAnswers);
    updateCurrentQuestion();
    setShowMessage(false);
    setIsSubmitted(false);

  };

  const takeNewQuiz = () => { 
    setTriggerNewQuiz((prev) => prev + 1);


  };

  const transformQuizData = (data) => {
    const transformedQuizData = data.results.map((item) => ({
      question: decode(item.question),
      correct_answer: decode(item.correct_answer),
      answers: shuffle(
        [...item.incorrect_answers, item.correct_answer].map((answer) =>
          decode(answer)
        )
      ),
      selected_answer: null,
    }));
    return transformedQuizData;
  };

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

  const updateSelectedAnswer = (selected) => {
    const currentQuestionData = quizData[currentQuestion];
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

  const updateCurrentQuestion = (index = 0) => {
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

  const handleRetake = () => {
    retakeQuiz();
  };

  const handleNewQuiz = () => {
    takeNewQuiz();
    setShowMessage(false)
    setIsSubmitted(false)
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        updateSelectedAnswer,
        handleNext,
        handlePrevious,
        handleSubmit,
        handleRetake,
        handleNewQuiz,
        setCurrentQuestion,
        updateCurrentQuestion,
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
      {!error && isSubmitted && <Results />}
      {!error && !isSubmitted && !isLoading && quizData.length > 0 && (
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
