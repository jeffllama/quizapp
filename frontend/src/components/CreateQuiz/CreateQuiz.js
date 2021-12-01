import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const defaultAnswers = { 0: "", 1: "", 2: "", 3: ""}
    const navigate = useNavigate();
    const [questionValues, setQuestionValues] = useState("")
    const [answerValues, setAnswerValues] = useState(["", "", "", ""])
    const [correctAnswer, setCorrectAnswer] = useState()

    const [questions, setQuestions] = useState({0: "", 1: "", 2: "", 3: "", 4: ""})

    // Amount of questions and answers to be added for a quiz
    const answers = [0,1,2,3]
    const questionAmount = [0, 1, 2, 3, 4]

    const handleQuestionChange = (event) => {
        const question = event.target.value;
        setQuestionValues(question)

        let id = event.target.id;
        setQuestions({...questions, [id]: question})
        console.log("Current questions:", questions)
    }

    const handleAnswerChange = (event) => {
        const id = event.target.id;
        const answer = event.target.value;

    }

    const handleCorrectAnswerChange = (qNumber) => {
        // console.log("event", event.target)
        console.log(qNumber)

    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Create quiz object and send to back end
    }

    const check = () => {
        console.log(questionValues)
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
                                        <input id={qNumber} type="text" name="questionText" placeholder="Enter a question..." onChange={handleQuestionChange}></input>
                                    </td>

                                    {answers.map((answer) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <input id={answer} type="text" name={`answer${qNumber}`} placeholder="Enter an answer" onChange={handleAnswerChange} ></input><div/>
                                                </td>
                                                <td>
                                                    <input id={answer} type="radio" name={`isAnswer${qNumber}`} onChange={handleCorrectAnswerChange(qNumber)}></input>
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
                
                {/* <form onSubmit={handleSubmit}>
                    <input type="text" name="nnText" placeholder="Enter your question..."></input><div/>
                    <input type="text" name="answerText1" placeholder="Enter an answer"></input><div/>
                    <input type="text" name="answerText2" placeholder="Enter an answer"></input><div/>
                    <input type="text" name="answerText3" placeholder="Enter an answer"></input><div/>
                    <input type="text" name="answerText4" placeholder="Enter an answer"></input><div/>
                    <input type="submit" />
                </form> */}
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