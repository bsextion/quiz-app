import React, { createContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import QuizFooter from "./QuizFooter";
import QuizHeader from "./QuizHeader";
import axios from "axios";
import _ from "lodash";
import Question from "../Question/Question";
import Results from "../Results/Results";
import { decode } from "html-entities";

export const QuizContext = createContext();

export default function Quiz() {
  //context created here - pass down current question and total question to quiz components and question components
  // useeffect to grab list of questions and corresponding answers (for now only grab 10)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  //update selected answer
  const onUpdateAnswer = (selected) => {
    const currentQuestionData = quizData[currentQuestion];

    //update selected answer in current question
    const updatedQuestionData = {
      ...currentQuestionData,
      selected_answer: selected,
    };

    // update quiz data with current question
    setQuizData((prev) => {
      const newQuizData = [...prev];
      newQuizData[currentQuestion] = updatedQuestionData;
      return newQuizData;
    });
    console.log("Selected: ", selected);
    console.log("Updated Question Data: ", updatedQuestionData);
  };

  //update selected answer to null
  const handleNext = () => {
    const currentQuestionData = quizData[currentQuestion];
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    const currentQuestionData = quizData[currentQuestion];
    setCurrentQuestion((prev) => prev - 1);
  };


  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log("Is submitted? ", isSubmitted);
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
        quizData,
      }}
    >
      {totalQuestion === 0 ? (
        <h1>Fetching Questions...</h1>
      ) : isSubmitted ? (
        <Results />
      ) : (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog size="xl" centered>
            <QuizHeader  />
            <Question />
            <QuizFooter />
          </Modal.Dialog>
        </div>
      )}
    </QuizContext.Provider>
  );
}
