import React from 'react'

import {Route, Navigate} from 'react-router-dom'

import { isLogin } from "../../utils/utils"

const PrivateRoute = ({children}) => {
    
    const auth = isLogin()

    return auth ? children : <Navigate to="/login" />
}
export default PrivateRoute;