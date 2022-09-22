import './component.css'
import {useState} from 'react'
import React from 'react'

function FormPopUp(){

    const [newvalue,setnewvalue] = useState({
        username: "",
        favmov :"" ,
        rating : ""
    })

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
    function insertvalues(){
        console.log("added values")
    }
    return (
        <div id="pop-up" className="popup"> 
        <span className="closebutton">X</span>  
<form onSubmit={insertvalues}>
        <input 
            placeholder="username" 
            id="username" 
            value={newvalue.username || ""}   
            onChange={updateusername} 
            name="username" 
            type="text">
                </input> <br />
        <input 
            placeholder="Favourite movie" 
            id="fav_movie" name="fav_movie" 
            value={newvalue.favmov|| ""} 
            onChange={updatefavmov} 
            type="text">
                </input><br />
        <select value={newvalue.rating} onChange={updaterating}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>

            </select>
        <br />
        <button type="submit">Submit</button><br />
</form>
        </div>
    )

}
export default FormPopUp;