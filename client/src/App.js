import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'

import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './App.css'

const App = () => (
  <Provider store={store}>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Landing />}/>
    </Routes>
    <section className='container'>
      <Alert/>
      <Routes>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </section>
  </Provider>
)

export default App