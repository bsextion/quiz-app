import React, { createContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { QuizFooter } from "./QuizFooter";
import { QuizHeader } from "./QuizHeader";
import axios from "axios";
import _ from "lodash";
import { Question } from "../Question/Question";

export const QuizContext = createContext();

export const Quiz = () => {
  //context created here - pass down current question and total question to quiz components and question components
  // useeffect to grab list of questions and corresponding answers (for now only grab 10)
  //Add timer

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [quizData, setQuizData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState();

  useEffect(() => {
     axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => {
        const transformedData = res.data.results.map((item) => ({
          question: item.question,
          correct_answer: item.correct_answer,
          answers: _.shuffle([...item.incorrect_answers, item.correct_answer]),
          selectedAnswer,
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
        selectedAnswer,
        setSelectedAnswer,
        currentQuestion,
        setCurrentQuestion,
        totalQuestion,
        quizData,
      }}
    >
      {totalQuestion === 0 ? (
        <h1>Fetching Quiz Data...</h1>
      ) : (
        <div
          className="modal show"
          style={{ display: "block", position: "initial", width: "80%" }}
        >
          <Modal.Dialog size="lg">
            <QuizHeader />
            <Question />
            <QuizFooter />
          </Modal.Dialog>
        </div>
      )}
    </QuizContext.Provider>
  );
};
