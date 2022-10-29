import './component.css'
import {useState} from 'react'
import React from 'react'
import axios from 'axios'

function FormPopUp(props){

    const [newvalue,setnewvalue] = useState({
        username: props.usernme,
        favmov :props.favmovie,
        rating : props.rating,
        id: props.newid
    })
console.log(newvalue.myid)
    const updateusername = (event) => {
        setnewvalue(previousState => {
          return { ...previousState, username: event.target.value}
        });
      }
    const updatefavmov = (event) => {
        setnewvalue(previousState => {
          return { ...previousState, favmov: event.target.value}
        });
      }
    const updaterating = (event) => {
        setnewvalue(previousState => {
          return { ...previousState, rating: event.target.value}
        });
      }
    function insertvalues (e){
       var url = "http://localhost:4300/operation/updatedataindb/" + newvalue.id
       axios
       .patch(url, newvalue)
       .then((res)=>{
        console.log(res.statusText)
       })
       .catch(err=> console.log(err))
       document.location.reload(true);
       e.preventDefault();
    }

    return (
        <div id="pop-up" className="popup"> 
        <span className="closebutton">X</span>  
<form id="newform" onSubmit={insertvalues}>
        <input 
            placeholder="Car name" 
            id="username" 
            value={newvalue.username || ""}   
            onChange={updateusername} 
            name="username" 
            type="text">
                </input> <br />
        <input 
            placeholder="car model" 
            id="fav_movie" name="fav_movie" 
            value={newvalue.favmov|| ""} 
            onChange={updatefavmov} 
            type="text">
                </input><br />
        <select value={newvalue.rating} onChange={updaterating}>
                <option value="Sedan">Sedan</option>
                <option value="Bus">Bus</option>
                <option value="Car">Car</option>
                <option value="Car">Hatchback</option>
                <option value="Truck">Truck</option>

            </select>
        <br />
        <button type="submit">Submit</button><br />
</form>
        </div>
    )

}
export default FormPopUp;