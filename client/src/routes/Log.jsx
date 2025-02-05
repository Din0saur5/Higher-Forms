import React, { useState } from 'react'
import Login from "../components/Login"
import SignUp from '../components/SignUp'

function Log() {
  const [login, setLogin] = useState(true)
  
  
    return (
  login ? (
    <Login setLogin ={setLogin} />
  ):(
    <SignUp setLogin ={setLogin} />
  )
        

  )
}

export default Log