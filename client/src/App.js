import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/actions/auth/loadUser'

import './App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Navbar/>
      <Alert/>
      <Routes>
        <Route exact path='/' element={<Landing />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </Provider>
  )
}

export default App