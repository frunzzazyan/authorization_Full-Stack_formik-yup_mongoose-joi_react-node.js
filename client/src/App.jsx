import React from 'react'
import Register from './components/Register'

import { Routes,Route } from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      
    </Routes>
  )
}

export default App