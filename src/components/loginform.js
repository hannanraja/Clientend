import './component.css'
import {useState} from 'react'
import axios from "axios";
function Inputform(){
   const[inputs, changedatafunction]= useState({
username : "",
password: ''
   })
   const handleSubmit = (e) => {
    
   axios
   .post('http://localhost:4300/useroperations/newentry',inputs)
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
   e.preventDefault();
  }
  const updateusername = (event) => {
    changedatafunction(previousState => {
      return { ...previousState, username: event.target.value}
    });
  }

  const updateimgaddress = (event) => {
    changedatafunction(previousState => {
      return { ...previousState, password: event.target.value}
    });
  }
  }
  
return(
    <div className="userform">
   <h2>To login enter the</h2>
   <form onSubmit={handleSubmit}>
<input 
    placeholder="Car name" 
    id="username" 
    value={inputs.username || ""}   
    onChange={updateusername} 
    name="username" 
    type="text">
        </input> <br />
<br />
       
<br />
<button type="submit">Submit</button><br />
   </form>
   <h3 id ="successmsg"></h3>
   </div>
)
}
export default Inputform;
