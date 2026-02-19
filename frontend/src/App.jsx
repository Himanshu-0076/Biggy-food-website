import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import ForgotPassword from './Pages/forgotPassword'


export const serverUrl = "http://localhost:8000"

function App() {

  return (
   <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
   </Routes>
  )
}

export default App
