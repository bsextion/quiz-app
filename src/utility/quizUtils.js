import { decode } from "html-entities";
import constants from "../constants/constants.json";
import { shuffle } from "./utils";

export const transformQuizData = (data) => {
  const transformedQuizData = data.results.map((item) => ({
    question: decode(item[constants.key.question]),
    correct_answer: decode(item[constants.key.correct_answer]),
    answers: shuffle(
      [
        ...item[constants.key.incorrect_answers],
        item[constants.key.correct_answer],
      ].map((answer) => decode(answer))
    ),
    selected_answer: null,
  }));
  return transformedQuizData;
};
