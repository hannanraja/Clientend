import logo from './logo.svg';
import './App.css';
import Inputform from './components/inputform';
import ShowData from './components/Showdata';
function App() {
  return (
    <div className="App">
      <h1>Welcome to my App. <br />Please fill the details for your favourite movie</h1>
      <div className="main">
     <div className="halfone">{<Inputform />} </div>
     <div className="halftwo"> {<ShowData />}</div>
     </div>
    </div>
  );
}

export default App;
