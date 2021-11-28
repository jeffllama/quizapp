import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

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
  const email = document.getElementById("typeEmailX").value;
  const password = document.getElementById("typePasswordX").value;
  if (validateEmail(email)) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User account created and signed in.");
      // Uncomment line below and input URL you want to go to after logging in
      // window.location.replace("Enter Redirect URL Here");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log("Error signing in");
    });
  }
}

function loginHandler() {
  const email = document.getElementById("typeEmailX").value;
  const password = document.getElementById("typePasswordX").value;
  if (validateEmail(email)) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User signed in");
      // Uncomment line below and input URL you want to go to after logging in
      // window.location.replace("Enter Redirect URL Here");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log("Error signing in");
    });
  }
}

loginBtn.onclick = loginHandler;
signupBtn.onclick = signupHandler;