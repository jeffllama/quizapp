import React from 'react'

import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import PublicRoute from "../components/PublicRoute/PublicRoute"
import PrivateRoute from "../components/PrivateRoute/PrivateRoute"

import Login from "../components/Login/Login"
import Menu from "../components/Menu/Menu"
import Quiz from "../components/Quiz/Quiz"
import Admin from "../components/Admin/Admin"
import CreateQuiz from "../components/CreateQuiz/CreateQuiz"
import Results from "../components/Results/Results"

/**
 * Handles application routing
 */

const Router = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/"  element={<Menu />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/createQuiz" element={<CreateQuiz />} />
            <Route path="/results" element={<Results/>} />
            {/* <Route path="/" element={<Menu />} /> */}
            <Route path="/quiz" element={<Quiz />} />
        </Routes>
        </BrowserRouter>
    )
}

export default Router