import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
    const defaultAnswers = { 0: "", 1: "", 2: "", 3: ""}
    const navigate = useNavigate();
    const [questionValue, setQuestionValue] = useState("")
    const [answerValues, setAnswerValues] = useState(["", "", "", ""])
    const answers = [0,1,2,3]
    const [correctAnswer, setCorrectAnswer] = useState()

    const handleQuestionChange = (event) => {
        const question = event.target.value;
        setQuestionValue(question)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Create quiz object and send to back end
    }

    const handleAnswerChange = (event) => {
        console.log("event", event.target)
        console.log("event", event.target.id)
        const { id, value } = event.target

        console.log(answerValues)

        setAnswerValues()

        console.log(answerValues)


    }

    const handleCorrectAnswerChange = (event) => {

    }

    const check = () => {
        console.log(questionValue)
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
                            <tr>
                                <td>
                                    <input type="text" name="questionText" placeholder="Enter a question..." onChange={handleQuestionChange}></input>
                                </td>
                            </tr>

                            {answers.map((answer) => {
                                return (
                                    <tr>
                                        <td>
                                            <input id={answer} type="text" name="answer" placeholder="Enter an answer" onChange={handleAnswerChange} ></input><div/>
                                        </td>
                                        <td>
                                            <input id={answer} type="radio" name="isAnswer" onChange={handleAnswerChange}></input>
                                        </td>
                                    </tr>
                                )
                            })}
                            <button onClick={check}>check</button>


                    </tbody>
                </table>
                {/* <form onSubmit={handleSubmit}>
                    <input type="text" name="questionText" placeholder="Enter your question..."></input><div/>
                    <input type="text" name="answerText1" placeholder="Enter an answer"></input><div/>
                    <input type="text" name="answerText2" placeholder="Enter an answer"></input><div/>
                    <input type="text" name="answerText3" placeholder="Enter an answer"></input><div/>
                    <input type="text" name="answerText4" placeholder="Enter an answer"></input><div/>
                    <input type="submit" />
                </form> */}
            </div>

            <div id="homeBtn">
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        </div>
    )
}

export default CreateQuiz;