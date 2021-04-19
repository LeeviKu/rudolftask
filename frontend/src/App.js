import './App.css';
import React, { useState } from 'react';
import Todos from "./components/Todos.js"
import Login from "./components/Login.js"

function App() {
  const [token, setToken] = useState()

  if (!token) {
    return <Login setToken={setToken}/>
  }
  return (
    <div className="wrapper">
      <Todos token={token}></Todos>
    </div>
  )
}

export default App;
