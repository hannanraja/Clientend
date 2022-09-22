import axios from "axios";
import './component.css'
import {useState, useEffect} from 'react'
import deleteimg from './delete.png'
import editimg from './edit.png'
import FormPopUp from "./Formpopup"
import React from "react"
function ShowData(){
   
       var indexnum= -1;
const [showpop , setpopup] = useState(false)


const [newdata, setnewdata] = useState({
    username :"" ,
    favmov : "",
    rating : ""
})
    function search(){
   
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById("searchbar");
                filter = input.value.toUpperCase();
                table = document.getElementById("myTable");
                tr = table.getElementsByTagName("tr");

                // Loop through all table rows, and hide those who don't match the search query
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[2];
                    if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                    }
                }
    }

    function Deletefunc(e){
    
                var delurl = "http://localhost:4300/operation/deletedata/"+ e.target.id;
                console.log(delurl)
                axios
                .delete(delurl)
                .then((res)=>{
                    if(res.statusText == "OK") {
                        document.getElementById("responsemsg").innerHTML = "Data deleted successfully"
                    setTimeout(()=>{
                    document.location.reload(true)
                    },500) 
                    }
                    })
                .catch((err)=>{
                console.log(err)
                })
    }
    
    function Editfunc(e){

        var indextr = e.target.id;
        var user_name = data[indextr].username
        var fav_mov = data[indextr].favmov
        var ratings = data[indextr].rating
        var idtoget = data[indextr]._id 
          setnewdata({
            username: user_name,
            favmov: fav_mov,
            rating : ratings,
            id: idtoget
          })     
          setpopup(!showpop)
          
    }   
    const [data, setdata] = useState([])

    useEffect(()=>{
                axios
                .get('http://localhost:4300/operation/datafromdb')
                .then(res=>{ setdata(res.data)
                })
                .catch(err=>{console.log("error in calling api")})
            },[])

        return(
            <div className="datashowmain">
            <input type="text" placeholder="Search by Username" onChange={search} id="searchbar"></input>
            { showpop && <div>< FormPopUp usernme={newdata.username} favmovie={newdata.favmov} rating={newdata.rating} newid={newdata.id}/></div> }
            <table id="myTable">
            <tr>
                <th>Favourite Movie</th>
                <th>Rating</th>
                <th>Username</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
                {
                data.map((mapdata)=>{
                 indexnum += 1;
                    return(
                        <tr key={mapdata._id}>
                            <td>
            {mapdata.favmov}
                            </td>
                            <td>
            {mapdata.rating}
                            </td>
                            <td>
            {mapdata.username}
                            </td>
                            <td>
                            <div className="imgedit">
                            <img src={editimg} id={indexnum} onClick={Editfunc}></img><span className="texttooltip">Edit entry</span>
                            </div>
                            </td>
                            <td>
                         
            <div className="imgdelete">
            <img src={deleteimg} id={mapdata._id} onClick={Deletefunc}></img><span className="texttooltip">Delete entry</span>
            </div>
                            </td>
                        </tr>
                      
                    )
               
             
                })
       
                }
            </table>
        <h3 id="responsemsg"></h3>
            </div>

            )
}

export default ShowData;