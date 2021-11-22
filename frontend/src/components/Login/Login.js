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
            await axios.post("http://localhost:5000/API/v1/users/signup", {
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
                <input name="Username" type="text" value={regUser} onChange={(event) => {setRegUser(event.target.value)}}/>
                <input name="Password" type="text" value={regPass} onChange={(event) =>{setRegPass(event.target.value)}}/>
                <input name="Submit" type="button" onClick={() =>registerUser()} />
            </div>



        </div>
    )
}

export default Login