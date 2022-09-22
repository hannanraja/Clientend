import './component.css'
import {useState} from 'react'
import axios from "axios";
function Inputform(){
   const[inputs, changedatafunction]= useState({
username : "",
favmov: "",
rating: ''
   })
   const handleSubmit = (e) => {
    e.preventDefault();
   axios
   .post('http://localhost:4300/operation/datafromuser',inputs)
   .then((response)=>{
if (response.statusText=="OK"){
    document.getElementById("successmsg").innerHTML = "Data sent successfully"
    setTimeout(() => {
        document.location.reload(true);
    }, 500);
}
else{
    document.getElementById("successmsg").innerHTML = "Error sending data. Please try again Later"
}
   })
   .catch((err)=>{
    console.log(err)
   })
  }
  const updateusername = (event) => {
    changedatafunction(previousState => {
      return { ...previousState, username: event.target.value}
    });
  }
  const updatefavmov = (event) => {
    changedatafunction(previousState => {
      return { ...previousState, favmov: event.target.value}
    });
  }
  const updaterating = (event) => {
    changedatafunction(previousState => {
      return { ...previousState, rating: event.target.value}
    });
  }

return(
    <div className="userform">
   <h2>Please fill the details for your favourite movie</h2>
   <form onSubmit={handleSubmit}>
<input 
    placeholder="username" 
    id="username" 
    value={inputs.username || ""}   
    onChange={updateusername} 
    name="username" 
    type="text">
        </input> <br />
<input 
    placeholder="Favourite movie" 
    id="fav_movie" name="fav_movie" 
    value={inputs.favmov|| ""} 
    onChange={updatefavmov} 
    type="text">
        </input><br />
        <select value={inputs.rating} onChange={updaterating}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>

      </select>
<br />
<button type="submit">Submit</button><br />
   </form>
   <h3 id ="successmsg"></h3>
   </div>
)
}

export default Inputform;
