import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'


function Results() {
    const location = useLocation();
    const navigate = useNavigate();


    return (
        <div id="container">
            <h1>Results</h1>
            <h3>You scored 5 / 5</h3>

            <div id="homeBtn">
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        </div>
    )
}

export default Results;