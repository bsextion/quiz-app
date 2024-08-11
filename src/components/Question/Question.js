import React from 'react'
import Modal from "react-bootstrap/Modal";
import { QuestionCard } from './QuestionCard'
import { QuizContext } from '../Quiz/Quiz';


export const Question = () => {
    const {quizData, currentQuestion, setSelectedAnswer} = React.useContext(QuizContext)
    const questionData = quizData[currentQuestion]


    //context will grab currentQuestion
    //keep track of selected response
    //onSelect  function to select answer
    console.log('Quiz data: ', quizData)
    return (
        <Modal.Body>
        <QuestionCard questionData={questionData}/>
        </Modal.Body>
    )
}
