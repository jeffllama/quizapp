import react, {useState, useEffect} from 'react'

import axios from 'axios'


function Admin() {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useState(false)
    const [totals,setUserTotals] = useState([])

    useEffect(() => {
        fetchInfo()
    })

    const fetchInfo = async() => {

    };

    const userLogin = async() => {
        const res = await axios.post("https://comp4537-quiz-backend.herokuapp.com/API/v1/users/admin-login", {
            user,
            password
        })

        if (res.status == 200) {

            const response = await axios.get("https://comp4537-quiz-backend.herokuapp.com/API/v1/users/user-api-totals")

            const counts = []
            for(const key in response.data) {
                counts.push(`${key} : ${response.data[key]}`)
            }

            await setAuth(true)
            await setUserTotals(counts)
        }
    }

    if(!auth) {
        return(<div>
            <h1>Admin Panel Login</h1>


                <input type="text" name="Username" value={user} onChange={(event) => {setUser(event.target.value)}} />
                <input type="text" name="Password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                <input type="button"  value="Login" onClick={() => userLogin()}/>
            
        </div>)
    }
    else{ 
        return(<div>
            <h1>Admin Panel Information</h1>

            {totals && totals.map(item => {
                return(<h2>{item}</h2>)
            })}
        </div>)
    }
}

export default Admin
