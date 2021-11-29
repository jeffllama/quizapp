import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {RadioGroup, Radio} from 'react-radio-group';


function Quiz() {
    const navigate = useNavigate();
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

    const handleSubmit = () => {
        // Get values

    }

    const handleChange = () => {
        
    }

    return(
        <div>
            <h1>FUCK</h1>
            <h2> Quizname: {quiz.name}</h2>

            <div id="questionsContainer">
                {!!questions && questions.map((question) => {
                    return (
                        <div id="questionContainer">
                            <h5>{question.description}</h5>
                            <div>
                                <form>
                                    {question.answers.map((answer) => {
                                        return (
                                            <div>
                                                    <input type="radio" name={question._id} value={answer.text} /> {answer.text}
                                            </div>
                                        )
                                    })}
                                </form>
                            </div>
                        </div>
                    )
                })}
                {/* {!!questions && questions.map((question) => {
                    return (
                        <div id="questionContainer">
                            <h5>{question.description}</h5>
                            <RadioGroup
                                name={question.name}
                                selectedValue={question}
                                onChange={handleChange} >
                                    {question.answers.map((answer) => {
                                        return (
                                            <div>
                                                <label>
                                                    <Radio value={answer} /> 
                                                    {answer.text}
                                                </label>
                                            </div>
                                        )
                                    })}

                            </RadioGroup>
                        </div>
                    )
                })} */}
            </div>

            {/* <div id="questionsContainer">
                    {!!questions && questions.map((question) => {

                        return (
                            <div id="questionContainer">
                                <h5>{question.description}</h5>
                                    <form>
                                    {question.answers.map((answer) => {
                                        return (
                                            <div>
                                                <label>
                                                    <input 
                                                        id="radioBtn"
                                                        type="radio" 
                                                        name={answer.text}
                                                        value={answer.text} 
                                                        onChange={() => handleChange}
                                                    />
                                                    {answer.text}
                                                </label>
                                            </div>
                                        )
                                    })}
                                    </form>
                            </div>
                        )
                    }) }
                    <input id="submitBtn" type="submit" onClick={handleSubmit()}/> */}

            {/* </div> */}
        </div>
    )
}

export default Quiz;