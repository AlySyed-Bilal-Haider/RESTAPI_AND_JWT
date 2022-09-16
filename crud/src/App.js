import React from 'react'
import GoalForm from './Pages/Goalform';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './Navbar';
function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route exact path='/' element={<GoalForm/>}/>
          <Route  path='/sinup' element={<Signup/>}/>
          <Route  path='/login' element={<Login/>}/>
        </Routes>
    </>
 
  )
}

export default App