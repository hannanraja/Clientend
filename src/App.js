import logo from './logo.svg';
import './App.css';
import Inputform from './components/inputform';
import ShowData from './components/Showdata';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Userform from './pages/signuppage'
function App() {
  const [loggedin , setloggedin] = useState(true)
  return (
    <div className="App">
      {loggedin ? <button className='flty'>Login</button> : <button className='flty'>Logout</button>}
      <h1>Welcome to my App. <br />Please fill the details for your car registration</h1>
      <div className="main">
     <div className="halfone">{<Inputform />} </div>
     <div className="halftwo">{<ShowData />}</div>
     </div>
    </div>
  );
}
export default App;