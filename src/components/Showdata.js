import axios from "axios";
import './component.css'
import {useState, useEffect} from 'react'
import deleteimg from './delete.png'
import editimg from './edit.png'
import FormPopUp from "./Formpopup";

function ShowData(){
const [showpop , setpopup] = useState(true)
const handlepopup = (e)=>{
setpopup (!showpop)
}
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
        handlepopup(e);
{showpop && <div className="popups"><FormPopUp /></div>}
console.log(showpop)
            
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
                            <div className="imgdelete">
                            <img src={editimg} id={mapdata._id} onClick={Editfunc}></img><span className="texttooltip">Edit entry</span>
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
            <span id="popups"></span>
            <h3 id="responsemsg"></h3>
            </div>

            )
}

export default ShowData;