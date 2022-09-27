import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)

    if (loading) {
        return <h1 className="container">Loading...</h1>
    }

    if (!isAuthenticated && !loading) {
        return <Navigate to="/"/>
    }

    return children
}

export default PrivateRoute