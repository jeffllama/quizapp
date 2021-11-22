import React, {useState, useEffect} from 'react'

import axios from 'axios'

function Login() {

    const [regUser,setRegUser] = useState("")
    const [regPass, setRegPass] = useState("")


    const registerUser = async () => {
        if (regUser.length == 0 || regPass.length == 0) {
            console.log("NO");
        }
        else {
            await axios.post("https://comp4537-quiz-backend.herokuapp.com/API/v1/users/signup", {
                user: regUser,
                password : regPass
            })
        }
    }

    return(
        <div id="container" >
            <div>
            <h1>Login Page</h1>
            <input name="Username" type="text" />
            <input name="Password" type="text" />
            </div>

            <div>
                <h1>Register User</h1>
                <div>
                    <h1>name : password</h1>
                    
                </div>
                <input name="Username" label="Username" type="text" value={regUser} onChange={(event) => {setRegUser(event.target.value)}}/>
                <input name="Password" label="Password" type="text" value={regPass} onChange={(event) =>{setRegPass(event.target.value)}}/>
                <input name="Submit" value="Submit" type="button" onClick={() =>registerUser()} />
            </div>



        </div>
    )
}

export default Login