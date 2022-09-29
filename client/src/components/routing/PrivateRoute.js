import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'

const PrivateRoute = ({ children }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return <Spinner/>
    }

    if (!isAuthenticated && !loading) {
        return <Navigate to="/"/>
    }

    return children
}

export default PrivateRoute