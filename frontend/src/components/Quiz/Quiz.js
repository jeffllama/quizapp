import React, {useState, useEffect} from 'react'

import axios from 'axios'

function Quiz() {

    const [questions, setQuestions] = useState([])

    const fetchInfo = (async () =>{
        const data = await axios.get('http://localhost:5000/API/v1/questions')
        console.log(data)
    })

    useEffect(() => {

        fetchInfo()

    },[])

    return(
        <div>
            <h1>FUCK</h1>
        </div>
    )
}

export default Quiz;