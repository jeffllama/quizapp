import React, {useState, useEffect} from 'react'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC7MSN28tKN9UJVXo5p_eEsbYtYBG_XO8",
  authDomain: "quizzapp-62655.firebaseapp.com",
  projectId: "quizzapp-62655",
  storageBucket: "quizzapp-62655.appspot.com",
  messagingSenderId: "390081408625",
  appId: "1:390081408625:web:9b5af44519f0f6643735d0",
  measurementId: "G-H9HGT729SS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();



function Login() {

    let navigate = useNavigate()

    const [regUser,setUser] = useState("")
    const [regPass, setPass] = useState("")

    function validateEmail(email) {
        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(validRegex)) {
          return true;
        } else {
          alert("Invalid email address!");
          return false;
        }
      }

      function signupHandler() {
        const email = regUser;
        const password = regPass;
        if (validateEmail(email)) {
          createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User account created and signed in.");
            // Uncomment line below and input URL you want to go to after logging in
            navigate("/")
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            console.log("Error signing in");
          });
        }
      }

      function loginHandler() {
        const email = regUser;
        const password = regPass
        if (validateEmail(email)) {
          signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User signed in");
            // Uncomment line below and input URL you want to go to after logging in
            navigate("/admin")
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            console.log("Error signing in");
          });
        }
      }




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
            <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card bg-dark text-white" >
                    <div className="card-body p-5 text-center">
                      <div className="mb-md-5 mt-md-4 pb-5">
                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Please enter your login and password!</p>
                        <div className="form-outline form-white mb-4">
                          <input type="email" id="typeEmailX" className="form-control form-control-lg bg-dark text-white" onChange={(e) => {setUser(e.target.value)}} />
                          <label className="form-label" for="typeEmailX">Email</label>
                        </div>
                        <div className="form-outline form-white mb-4">
                          <input type="password" id="typePasswordX" className="form-control form-control-lg bg-dark text-white" onChange={(e) => {setPass(e.target.value)}}/>
                          <label className="form-label" for="typePasswordX">Password</label>
                        </div>
                        <button className="btn btn-outline-light btn-lg px-5" type="submit" id="loginBtn" onClick={() => loginHandler()}>Login</button>
                      </div>
                      <div>
                        <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold" id="signupBtn" onClick={() => signupHandler()}>Sign Up</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
    )
}

export default Login