import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Menu() {
    const [quizzes, setQuizzes] = useState([])
    const navigate = useNavigate();

    const fetchQuizzes = (async () =>{
        const data = await axios.get('http://localhost:5000/API/v1/quizzes')
        setQuizzes(data.data)
    })

    
    useEffect(() => {
        fetchQuizzes()
    }, [])


    const submitQuiz = async () => {

    }

    return(
        <div id="container" >
            <h1>MENU BABY</h1> {/* Don't delete this line or the app will not work */}
            <div id="quizContainer">
                <h2>Select a Quiz</h2>
                {console.log(quizzes)}
                {!!quizzes && quizzes.map((quiz) => {
                    return (
                        <div>
                            <input id="quizBtn" name="QuizButton" value={quiz.name} type="button" onClick={() =>navigate('/quiz', {state: {quiz: quiz}})} />
                        </div>
                    )
                })}
            </div>
            <input name="CreateQuiz" value="Create Quiz" label="Create Quiz" type="button" onClick={() => navigate('/createQuiz')}/>
        </div>
    )
}

export default Menu