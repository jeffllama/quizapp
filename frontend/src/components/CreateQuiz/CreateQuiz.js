import axios from 'axios';
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const defaultAnswers = { 0: "", 1: "", 2: "", 3: ""}
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([
        {question: "", answers: ["", "", "", ""], isCorrect: 0},
        {question: "", answers: ["", "", "", ""], isCorrect: 0},
        {question: "", answers: ["", "", "", ""], isCorrect: 0},
        {question: "", answers: ["", "", "", ""], isCorrect: 0},
        {question: "", answers: ["", "", "", ""], isCorrect: 0}
    ])

    // Amount of questions and answers to be added for a quiz
    const answers = [0,1,2,3]
    const questionAmount = [0, 1, 2, 3, 4]

    const handleQuestionChange = (qNumber, event) => {
        const q = questions;
        q[qNumber].question = event.target.value;
        setQuestions(q);

    }

    const handleAnswerChange = (qNumber, e, index) => {
        console.log("handle answer change",qNumber, e.target.value, index)
        let q = questions;
        q[qNumber].answers[index] = e.target.value;
        
        setQuestions(q)
    }

    const handleCorrectAnswerChange = (qNumber, e, index) => {
        const q = questions;
        q[qNumber].isCorrect = index;
        setQuestions(q);

        console.log("Answer change", qNumber, index)
        console.log(questions)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post('https://comp4537-quiz-backend.herokuapp.com/API/v1/quizzes/new-quiz', {
            name: "New Quiz 1", 
            questions: questions
        }); 
        if (res.status == 200) {
            navigate('/')
        }

    }


    return (
        <div id="container">
            <h1>Create Quiz</h1>
            <div id="createQuizContainer">
                <table id="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Is Answer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAmount.map((qNumber) => {
                            return (
                            <div>
                                <tr>
                                    <td>
                                        <input id={qNumber} type="text" name="questionText" placeholder="Enter a question..." onChange={(e) => handleQuestionChange(qNumber, e)}></input>
                                    </td>

                                    {answers.map((answer, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <input id={answer} type="text" name={`answer${qNumber}`} placeholder="Enter an answer" onChange={(e) => handleAnswerChange(qNumber, e, index)} ></input><div/>
                                                </td>
                                                <td>
                                                    <input id={answer} type="radio" name={`isAnswer${qNumber}`} onChange={(e) => handleCorrectAnswerChange(qNumber, e, index)}></input>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tr>
                                <tr></tr>
                            </div>

                            )
                        })}


                    </tbody>
                </table>
                
            </div> 

            <div id="submitContainer">
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div id="homeBtn">
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        </div>
    )
}

export default CreateQuiz;