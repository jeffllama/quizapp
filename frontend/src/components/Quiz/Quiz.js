import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import axios from 'axios'

function Quiz() {
    const location = useLocation();
    const [questions, setQuestions] = useState([])
    const [quiz, setQuiz] = useState(location.state.quiz)

    const getQuestions = (async () => {
        const data = await axios.get(`http://localhost:5000/API/v1/quizzes/${quiz._id}/questions`)
        console.log("Retrieved questions", data)
        setQuestions(data.data.questions)
        console.log("questions", questions)
    })

    useEffect(() => {
        getQuestions();
    },[])

    const submitForm = () => {

    }

    return(
        <div>
            <h1>FUCK</h1>
            <h3>Questions:</h3>
            <div id="questionsContainer">
                <form onSubmit={submitForm()}>
                    {!!questions && questions.map((question) => {
                        return (
                            <div id="questionContainer">
                                <h5>{question.description}</h5>
                                {question.answers.map((answer) => {
                                    return (
                                        <div>
                                            <label>
                                                <input 
                                                    id="radioBtn"
                                                    type="radio" 
                                                    name="radioAnswer"
                                                    value={answer.text} 
                                                    onChange={() => console.log("Selected", answer.text)}
                                                />
                                                {answer.text}
                                            </label>
                                        </div>
                                    )
                                })}
                                
                            </div>
                        )
                    }) }

                </form>
            </div>
        </div>
    )
}

export default Quiz;