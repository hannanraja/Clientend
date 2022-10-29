import axios from "axios";
import './component.css'
import {useState, useEffect} from 'react'
import deleteimg from './delete.png'
import editimg from './edit.png'
import FormPopUp from "./Formpopup"
import React from "react"
import jsPDF from "jspdf";
import "jspdf-autotable";
import fileDownload from 'js-file-download'
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

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "portrait";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Movie Flex table";
        const headers = [["Favorite movie", "Ratings" , "Username"]];
    
        const data1 = data.map(elt=> [elt.favmov, elt.rating, elt.username]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data1
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
      }



      function sortTable() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
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
                <div class="fullcol">
                    <div className="halfcol">
                        <input type="text" placeholder="Search Car name" onChange={search} id="searchbar"></input>
                    </div>
                    <div className="halfcol">
                        <button onClick={sortTable}>Sort</button>
                    </div>
                </div>
            { showpop && <div>< FormPopUp usernme={newdata.username} favmovie={newdata.favmov} rating={newdata.rating} newid={newdata.id}/></div> }
            <table id="myTable">
            <tr>
                <th>Car model</th>
                <th>Car type</th>
                <th>Car Name</th>
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
        <button onClick={exportPDF}> Download Table</button>
            </div>

            )
}

export default ShowData;